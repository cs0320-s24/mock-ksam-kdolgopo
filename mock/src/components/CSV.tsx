import React, { useEffect, useState } from "react";
import Papa from "papaparse";

interface CSVRow {
  [key: string]: string | number;
}

interface Props {
  filePath: string;
}

const CSVLoader: React.FC<Props> = ({ filePath }) => {
  const [currentDataset, setCurrentDataset] = useState<CSVRow[]>([]);

  useEffect(() => {
    if (!filePath) return; // Don't proceed if filePath is empty

    // Assuming your CSV files are stored in a directory named `csv` in your public folder
    // Adjust the path according to where your CSV files are actually located
    const fetchAndParseCSV = async () => {
      try {
        const response = await fetch(`/data/${filePath}`);
        if (!response.ok) {
          throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
        }
        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const dataset = results.data as CSVRow[];
            setCurrentDataset(dataset);
            console.log(`Dataset from ${filePath} loaded.`);
          },
        });
      } catch (error) {
        console.error("Error loading the CSV file: ", error);
      }
    };

    fetchAndParseCSV();
  }, [filePath]); // This effect runs whenever filePath changes

  // This component doesn't render anything, or you could render the currentDataset if needed
  return null;
};

export default CSVLoader;
