import React, { useEffect, useState } from "react";
import Papa from "papaparse";

interface CSVRow {
  [key: string]: string;
}

let globalCSVData: CSVRow[] = [];

// Refactored as an async function
async function loadCSV(filePath: string): Promise<CSVRow[] | null> {
  if (!filePath) return null; // Exit if filePath is not provided

  try {
    const response = await fetch(`/data/${filePath}`);
    if (!response.ok) {
      throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
    }
    const csvText = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          console.log(`Dataset from ${filePath} loaded.`);
          // Update globalCSVData here with the parsed results
          globalCSVData = results.data as CSVRow[];
          console.log(globalCSVData);
          resolve(globalCSVData); // Resolve the promise with the updated globalCSVData
        },

        error: (error: any) => {
          console.error("Error parsing the CSV file: ", error);
          reject(error);
        },
      });
    });
  } catch (error) {
    console.error("Error loading the CSV file: ", error);
    return null;
  }
}

// Function to display the CSV data as an HTML table
function viewCSV() {
  if (!globalCSVData) {
    console.error("No CSV data available to display.");
    return;
  }

  // Start building the HTML table
  let tableHtml = "<table border='1'><thead><tr>";

  // Assuming all rows have the same columns, use the first row to create headers
  Object.keys(globalCSVData[0]).forEach((header) => {
    tableHtml += `<th>${header}</th>`;
  });
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

export default {viewCSV, loadCSV};