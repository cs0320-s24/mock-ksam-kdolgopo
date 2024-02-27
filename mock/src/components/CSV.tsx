import React, { useEffect, useState } from "react";
import Papa from "papaparse";

interface CSVRow {
  [key: string]: string;
}

let globalCSVData: Map<string, CSVRow[]> = new Map<string, CSVRow[]>();

function loadCSV(filePath: string): Promise<CSVRow[] | null> {
  if (!filePath) return Promise.resolve(null); // Immediately resolve to null if filePath is not provided

  return fetch(`/data/${filePath}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
      }
      return response.text();
    })
    .then((csvText) => {
      return new Promise<CSVRow[]>((resolve, reject) => {
        globalCSVData.clear();
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            console.log(`Dataset from ${filePath} loaded.`);
            // TODO: Need to make it so this is not typeCasting
            const transformedData = results.data
              .map((rawRow) => transformToCSVRow(rawRow))
              .filter((row) => row !== null) as CSVRow[];
            globalCSVData.set(filePath, results.data as CSVRow[]);
            const csvData = globalCSVData.get(filePath);
            if (csvData !== undefined) {
              resolve(csvData);
            } 
          },
          error: (error: Error) => {
            console.error("Error parsing the CSV file: ", error);
            reject(error);
          },
        });
      });
    })
    .catch((error) => {
      console.error("Error loading the CSV file: ", error);
      return null;
    });
}

//Helper function to transform a row into a CSV Row
//TODO: Going to change this to not take in any at some point

function transformToCSVRow(rawRow: any): CSVRow | null {
  return rawRow as CSVRow;
}

// Function to display the CSV data as an HTML table
function viewCSV(filePath: string) {
  // Check if a file has been successfully loaded before attempting to display
  if (!globalCSVData.has(filePath)) {
    console.error(
      "No CSV data available for this file. Please load the file first."
    );
    return;
  }

  const data = globalCSVData.get(filePath);
  if (!data) {
    console.error("Failed to retrieve data for the file.");
    return;
  }

  // Start building the HTML table
  let tableHtml = "<table border='1'><thead><tr>";

  // Assuming all rows have the same columns, use the first row to create headers
  if (data.length > 0) {
    Object.keys(data[0]).forEach((header) => {
      tableHtml += `<th>${header}</th>`;
    });
  }
  tableHtml += "</tr></thead><tbody>";

  // Add data rows
  globalCSVData.forEach((row) => {
    tableHtml += "<tr>";
    Object.values(row).forEach((value) => {
      tableHtml += `<td>${value}</td>`;
    });
    tableHtml += "</tr>";
  });

  tableHtml += "</tbody></table>";

  // Assuming you have a div with an id of 'csvDisplay' for the table
  //document.getElementById("csvDisplay").innerHTML = tableHtml;
}

export default { viewCSV, loadCSV };
