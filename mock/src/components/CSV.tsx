import React, { useState } from "react";
import {
  computers,
  dol_ri_earnings_disparity,
  ri_town_city_income,
} from "../../data/dataFiles";

import { CSVProps } from "../../src/components/REPLInput";

/**
 * Interface defining the structure of a REPL function.
 * @param args An array of strings representing the arguments passed to the function.
 * @returns A string or a 2D string array, depending on the function's operation.
 */
export interface REPLFunction {
  (args: Array<string>): string | string[][];
}

// Initialize a map to hold the file names and their corresponding data arrays.
let files = new Map<string, string[][]>([
  ["computers", computers],
  ["dol_ri_earnings_disparity", dol_ri_earnings_disparity],
  ["ri_town_city_income", ri_town_city_income],
]);

let resultString = "";

/**
 * Loads a CSV file based on the provided file name.
 * @param loadedFile The name of the file to load.
 * @returns A string indicating whether the file was successfully loaded or not.
 */
function loadCSV(loadedFile: string): string {
  console.log(loadedFile);
  if (files.has(loadedFile)) {
    return "Loaded file: " + loadedFile;
  } else {
    return "Failed to load file data for " + loadedFile;
  }
}

/**
 * Generates an HTML string representing a table of the CSV data for a loaded file.
 * @param loadedFile The name of the loaded file.
 * @returns A string containing HTML markup for the data table if the file exists, otherwise an error message.
 */
function viewCSV(loadedFile: string): string {
  if (!files.has(loadedFile)) {
    return "Failed to retrieve data for the file";
  }
  const data = files.get(loadedFile);
  if (!data || data.length === 0) {
    return `Failed to retrieve data for the file ${loadedFile}.`;
  }

  // Start the table HTML with adjusted styles and headers directly from the first row of data
  let tableHtml = `<table className='table' style='border-collapse: collapse; width: 80%; margin: auto; border-radius: 10px; overflow: hidden;'><thead><tr style='background-color: #503c3c; color: white;'>`;
  data[0].forEach((header) => {
    // Use the first row of your data array for headers
    tableHtml += `<th style='border: 1px solid white; padding: 8px;'>${header}</th>`;
  });
  tableHtml += "</tr></thead><tbody>";

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
  let tableHtml = "<table className='table' style='border-collapse: collapse; width: 100%;'><thead><tr>";

  // Use the headers from the original file data
  fileData[0].forEach((header) => {
    tableHtml += `<th>${header}</th>`;
  });
  tableHtml += "</tr></thead><tbody>";

  // Add matching rows to the table
  matchingRows.forEach((row) => {
    tableHtml += "<tr>";
    row.forEach((cell) => {
      tableHtml += `<td style='border: 1px solid #ddd; padding: 8px;'>${cell}</td>`;
    });
    tableHtml += "</tr>";
  });
  tableHtml += "</tbody></table>";

  return tableHtml;
}

// Export the functions to be used in other parts of the application.
export default { viewCSV, loadCSV, searchCSV };

