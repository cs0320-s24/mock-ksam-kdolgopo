import { useState } from 'react';
import { REPLInput, REPLFunction } from './REPLInput';
import { exampleCSV1 } from '../../data/mockedJson'; // Importing mocked CSV data
import React from 'react';
import { expect, test } from "@playwright/test";


test('mock', () => {

    // Map between fake file paths and mocked data
    const mockedFiles: Record<string, string[][]> = {
      'example.csv': exampleCSV1,

    };

    // Mock useState to track setCurrentFilePath calls
    //setCurrentFilePathMock = jest.fn();
    React.useState = jest.fn().mockReturnValue(['', {}]);

    // Mock CSVLoader component
    const CSVLoaderMock = (props: { filePath: string }) => {
      const filePath = props.filePath;
      const data = mockedFiles[filePath] || []; // Get mocked data based on file path
      return JSON.stringify(data); // Return mocked data as a string
    };
    


    
});


// We currently have REPLFunctions in our REPLInput calling corresponding mocked 
// functions in a mocked csvActions.ts file (e.g., csvActions.ts has a mockedViewCSV 
// function that interacts with our mocked data -- mocked data is typescript 2D 
// arrays like the "Definitions and Suggestions" example from the handout).

// Your TypeScript 2D arrays that represent mocked data should be stored and exported 
// from a TypeScript file called mockedJson.ts. Think about how you can give REPLInput access to all of these mocked datasets.

// By full JSON response, do you mean {"response_type" : "success", "data": {...}}? 
// If so, no. You just need to mock CSV in their list of list of strings format. 

// make a map between fake filepaths and mocked data




const testFunction = () => {
  return `Test function`;
};

const { registerCommand } = REPLInput({}).props;

registerCommand("test", testFunction);

expect(setCommandRegistryMock).toHaveBeenCalledWith({
  test: testFunction,