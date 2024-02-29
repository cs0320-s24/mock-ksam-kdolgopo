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

function loadCSV(props: CSVProps): string {
  if (files.has(props.currentFile)) {
    const fileData = files.get(props.currentFile); // fileData might be string[][] or undefined
    // Check if fileData is defined before setting it
    if (fileData) {
      props.setLoadedFileData(fileData); // Set the loaded file data only if it's not undefined
      return "Loaded file: " + props.currentFile;
    } else {
      return "Failed to load file data for " + props.currentFile;
    }
  } else {
    return "File not found";
  }
}

// Function to display the CSV data as an HTML table

function viewCSV(props: CSVProps): string {
  // Check if there's a current file loaded

  // Retrieve the data for the current file
  const data = files.get(props.currentFile);
  if (!data || data.length === 0) {
    return `Failed to retrieve data for the file ${props.currentFile}.`;
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
      tableHtml += `<td>${value}</td>`;
    });
    tableHtml += "</tr>";
  });

  tableHtml += "</tbody></table>";

  return tableHtml;
}

function searchCSV(
  props: CSVProps,
  value: string,
  column: string
): string[][] {
  
}

export default { viewCSV, loadCSV };
