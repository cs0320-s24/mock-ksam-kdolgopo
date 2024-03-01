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
    return "Loaded file " + loadedFile;
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

<<<<<<< Updated upstream
  // Assuming all rows have the same columns, use the first row to create headers
  Object.keys(data[0]).forEach((header) => {
=======
  // Skip the first row when iterating over rows since it's used for headers
  data.slice(1).forEach((row) => {
    tableHtml += "<tr>";
    row.forEach((value) => {
      tableHtml += `<td style='border: 1px solid white; padding: 8px; color: white;'>${value}</td>`;
    });
    tableHtml += "</tr>";
  });
  tableHtml += "</tbody></table>";

  return tableHtml;
}

/**
 * Searches a loaded CSV file for rows that match a given value in a specified column and returns an HTML table of matching rows.
 * @param fileName The name of the file to search within.
 * @param args An array where the first element is the search value and the second element is the column identifier (name or index).
 * @returns A string containing HTML markup for a table of matching rows or an error message if no matches are found or an error occurs.
 */
function searchCSV(fileName: string, args: string[]): string {
  if (!files.has(fileName)) {
    return "Invalid file, please enter a different file name";
  }

  const fileData: string[][] = files.get(fileName) as string[][];
  const searchValue = args[1]; // Assuming first element is the search value
  let columnIdentifier = args[2]; // Assuming second element is the column identifier
  const matchingRows: string[][] = [];

  let columnIndex: number;
  if (isNaN(Number(columnIdentifier))) {
    columnIndex = fileData[0].indexOf(columnIdentifier);
    if (columnIndex === -1) {
      return `Column "${columnIdentifier}" not found in the file.`;
    }
  } else {
    columnIndex = parseInt(columnIdentifier);
    if (columnIndex < 0 || columnIndex >= fileData[0].length) {
      return `Column index ${columnIndex} is out of range.`;
    }
  }

  // Iterate over file data to find matching rows
  fileData.forEach((row, index) => {
    if (index > 0 && row[columnIndex].includes(searchValue)) {
      matchingRows.push(row);
    }
  });

  // If no matches found, return a message
  if (matchingRows.length === 0) {
    return `No matches found for "${searchValue}" in column "${columnIdentifier}".`;
  }

  // Start building the HTML table string for matching rows
  let tableHtml =
    "<table className='table' style='border-collapse: collapse; width: 100%;'><thead><tr>";

  // Use the headers from the original file data
  fileData[0].forEach((header) => {
>>>>>>> Stashed changes
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

// function searchCSV(
//   props: CSVProps,
//   value: string,
//   column: string
// ): string[][] {}

export default { viewCSV, loadCSV };
