import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import * as fs from "fs";
// import {
//   computers,
//   dol_ri_earnings_disparity,
//   ri_town_city_income,
// } from "../../data/dataFiles";
import { REPLFunction } from "./REPLInput";


interface CSVRow {
  [key: string]: string;
}

const [currentFile, setFile] = useState("");

let globalCSVData: Map<string, CSVRow[]> = new Map<string, CSVRow[]>();

let files: Map<string, string[]>;

let resultString = "";

function loadFile(fileName: string): () => string {
  return (): string => {
    let resultString: string;
    if (files.has(fileName)) {
      setFile(fileName);
      resultString = "Loaded file: " + fileName; // Assuming you meant to concatenate fileName
    } else {
      resultString = "File not found";
    }

    return resultString;
  };
}

// Function to display the CSV data as an HTML table

function viewCSV(filePath: string): string {
  // Check if a file has been successfully loaded before attempting to display
  if (!globalCSVData.has(filePath)) {
    return "No CSV data available for this file. Please load the file first.";

  }

  const data = globalCSVData.get(filePath);
  if (!data) {
    return "Failed to retrieve data for the file.";
  }


  // Start building the HTML table with border and optional CSS classes for styling
  let tableHtml =
    "<table style='border-collapse: collapse; width: 100%;'><thead><tr>";

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

  return tableHtml;

  // Assuming you have a div with an id of 'csvDisplay' for the table
  //document.getElementById("csvDisplay").innerHTML = tableHtml;
}

export default {viewCSV, loadFile};
