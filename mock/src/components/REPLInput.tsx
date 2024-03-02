import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "../styles/main.css";
import { ControlledInput } from "./ControlledInput";
import CSV from "./CSV";

/**
 * Interface defining the structure of a REPL function.
 * @param args An array of strings representing the arguments passed to the function.
 * @returns A string or a 2D string array, depending on the function's operation.
 */
export interface REPLFunction {
  (args: Array<string>): string | string[][];
}

/**
 * Interface extending CSVProps to include properties specific to REPLInput component.
 */
export interface REPLInputProps extends CSVProps {
  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>;
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
}

/**
 * Interface defining the structure for CSV-related properties.
 */
export interface CSVProps {
  loadedFileData: string[][];
  setLoadedFileData: Dispatch<SetStateAction<string[][]>>;
}

// Placeholder for loaded file name
let loadedFile: string;
let mode: string;

// Placeholder for CSV properties
let properties: CSVProps = {
  loadedFileData: [],
  setLoadedFileData: () => {}, // Empty function as a placeholder
};

/**
 * The REPLInput function component handles the input part of the REPL (Read-Eval-Print Loop) interface.
 * It allows users to enter commands to be executed and displays the results.
 *
 * @param props The props passed to the REPLInput component, including history, mode, and functions to manage state.
 * @param properties CSV-related properties, including loaded data and a setter for that data.
 */
export function REPLInput(props: REPLInputProps, properties: CSVProps) {
  // State to manage the registry of commands and the current command string
  const [commandRegistry, setCommandRegistry] = useState<{
    [key: string]: REPLFunction;
  }>({});
  const [commandString, setCommandString] = useState<string>("");

  // Effect hook to register commands when the component mounts
  useEffect(() => {
    registerCommand("mode", changeMode);
    registerCommand("load", loadFile);
    registerCommand("view", viewFile);
    registerCommand("search", searchFile);
    mode = "brief";
  }, []);

  /**
   * Registers a new command in the command registry.
   *
   * @param commandName The name of the command to register.
   * @param commandFunction The function to execute when the command is called.
   */
  function registerCommand(commandName: string, commandFunction: REPLFunction) {
    setCommandRegistry((prevState) => ({
      ...prevState,
      [commandName]: commandFunction,
    }));
  }

  /**
   * Handles the submission of a command by the user.
   *
   * @param commandString The command string entered by the user.
   */
  function handleSubmit(commandString: string) {
    const [command, ...args] = commandString.trim().split(" ");
    console.log("props mode ajah");
    console.log(props.mode);
    console.log("mode ajkdaf");
    console.log(mode);
    if (commandRegistry.hasOwnProperty(command)) {
      const output = commandRegistry[command](args);
      const formattedEntry = `Command: ${commandString}\n${output.toString()}`;
      props.setHistory([...props.history, formattedEntry]);
    } else {
      const formattedEntry =
        props.mode === "verbose"
          ? `Command: ${commandString}\n${"Command not found"}`
          : "Command not found";
      props.setHistory([...props.history, formattedEntry]);
    }
    setCommandString("");
  }

  // Definition of REPL function for searching within a loaded file
  let searchFile: REPLFunction = function (args: Array<string>) {
    if (args[0] !== loadedFile) {
      return "Please load file before searching";
    }
    return CSV.searchCSV(loadedFile, args);
  };

  // Definition of REPL function for loading a file
  let loadFile: REPLFunction = function (args: Array<string>) {
    loadedFile = args[0];
    return CSV.loadCSV(loadedFile);
  };

  // Definition of REPL function for changing the display mode
  let changeMode: REPLFunction = function (args: Array<string>) {
    // Determine the new mode before toggling
    console.log("Beginning of changeMode");
    console.log(mode);
    var newMode = "";
    if (mode === "brief") {
      newMode = "verbose";
    } else if (mode === "verbose") {
      newMode = "brief";
    }
    mode = newMode;

    props.setMode(mode);

    // Create a formatted entry based on the new mode
    const formattedEntry = `Switched to ${mode} mode`;

    console.log(formattedEntry);

    // Update the history with this new entry
    props.setHistory([...props.history, formattedEntry]);

    // Return the formatted entry to indicate which mode it has been switched to
    return formattedEntry;
  };

  // Definition of REPL function for viewing a loaded file
  let viewFile: REPLFunction = function (args: Array<string>) {
    if (loadedFile == args[0]) {
      return CSV.viewCSV(loadedFile);
    }
    return "Please load file before attempting to view.";
  };

  return (
    <div className="repl-input">
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <button className="button" onClick={() => handleSubmit(commandString)}>
        Submit
      </button>
    </div>
  );
}

