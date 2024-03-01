import React, { useState } from "react";
import {
  computers,
  dol_ri_earnings_disparity,
  ri_town_city_income,
} from "../../data/dataFiles";

import { CSVProps } from "../../src/components/REPLInput";

export interface REPLFunction {
  (args: Array<string>): string | string[][];
}

let files = new Map<string, string[][]>([
  ["computers", computers],
  ["dol_ri_earnings_disparity", dol_ri_earnings_disparity],
  ["ri_town_city_income", ri_town_city_income],
]);

let resultString = "";

function loadCSV(loadedFile: string): string {
  console.log(loadedFile);
  if (files.has(loadedFile)) {
    return "Loaded file: " + loadedFile;
  } else {
    return "Failed to load file data for " + loadedFile;
  }
}

// Function to display the CSV data as an HTML table

function viewCSV(loadedFile: string): string {
  // Check if there's a current file loaded

  if (!files.has(loadedFile)) {
    return "Failed to retrieve data for the file";
  }
  // Retrieve the data for the current file
  const data = files.get(loadedFile);
  if (!data || data.length === 0) {
    return `Failed to retrieve data for the file ${loadedFile}.`;
  }

  // Start building the HTML table with border and optional CSS classes for styling
  let tableHtml =
    "<table style='border-collapse: collapse; width: 100%;'><thead><tr>";

  // Assuming all rows have the same columns, use the first row to create headers
  Object.keys(data[0]).forEach((header) => {
    tableHtml += `<th>${header}</th>`;
  });

  tableHtml += "</tr></thead><tbody>";

  // Add data rows
  data.forEach((row) => {
    tableHtml += "<tr>";
    Object.values(row).forEach((value) => {
      tableHtml += `<td style='border: 1px solid #ddd; padding: 8px;'>${value}</td>`;
    });
    tableHtml += "</tr>";
  });

  tableHtml += "</tbody></table>";

  return tableHtml;
}

function searchCSV(fileName: string, args: string[]): string[][] | string {
  // Check if the file exists
  if (!files.has(fileName)) {
    return "Invalid file, please enter a different file name";
  }

  // Retrieve the file data
  const fileData: string[][] = files.get(fileName) as string[][];

  // Extract the search value and column identifier from args
  const searchValue = args[1];
  let columnIdentifier = args[2];

  // Initialize an array to hold the matching rows
  const matchingRows: string[][] = [];

  // Determine if the column identifier is a name or an index
  let columnIndex: number;
  if (isNaN(Number(columnIdentifier))) {
    // Column identifier is a name, find the index of the column
    columnIndex = fileData[0].indexOf(columnIdentifier);
    if (columnIndex === -1) {
      return `Column "${columnIdentifier}" not found in the file.`;
    }
  } else {
    // Column identifier is an index
    columnIndex = parseInt(columnIdentifier);
    // Validate the column index
    if (columnIndex < 0 || columnIndex >= fileData[0].length) {
      return `Column index ${columnIndex} is out of range.`;
    }
  }

  // Search for the value in the specified column
  fileData.forEach((row, index) => {
    if (index > 0) {
      // Assuming the first row contains headers
      const cellValue = row[columnIndex];
      if (cellValue.includes(searchValue)) {
        matchingRows.push(row);
      }
    }
  });

  return matchingRows.length > 0
    ? matchingRows
    : `No matches found for "${searchValue}" in column "${columnIdentifier}".`;
}

export default { viewCSV, loadCSV , searchCSV};
