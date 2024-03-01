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

// function searchCSV(
//   props: CSVProps,
//   value: string,
//   column: string
// ): string[][] {}

export default { viewCSV, loadCSV };
