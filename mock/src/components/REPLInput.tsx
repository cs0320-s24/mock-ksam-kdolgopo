import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "../styles/main.css";
import { ControlledInput } from "./ControlledInput";
import CSV from "./CSV";

export interface REPLFunction {
  (args: Array<string>): string | string[][];
}

interface REPLInputProps {
  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>;
  mode: "brief" | "verbose";
  toggleMode: () => void;
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandRegistry, setCommandRegistry] = useState<{
    [key: string]: REPLFunction;
  }>({});
  const [commandString, setCommandString] = useState<string>("");
  const [currentFilePath, setCurrentFilePath] = useState("");

  useEffect(() => {
    // Register commands when component is mounted (the program is ready to be executed)
    registerCommand("load_file", load_file);
    registerCommand("mode", changeMode);
  }, []);

  // Registering new commands:
  function registerCommand(commandName: string, commandFunction: REPLFunction) {
    setCommandRegistry((prevState) => ({
      // creates a new state by expandin the previous state (adding a new KV pair to it):
      ...prevState,
      [commandName]: commandFunction,
    }));
  }

  // This function is triggered when the button is clicked.
  function handleSubmit(commandString: string) {
    const [command, ...args] = commandString.trim().split(" ");
    // Check if the command is in map
    if (commandRegistry.hasOwnProperty(command)) {
      const output = commandRegistry[command](args);
      const outputNone = `None`; // Placeholder for actual command output
      const formattedEntry =
        props.mode === "verbose"
          ? `Command: ${commandString}\n ${output.toString()}`
          : output.toString();

      props.setHistory([...props.history, formattedEntry]);
    } else {
      props.setHistory([...props.history, `Command not found: ${command}`]);
    }
    setCommandString("");
  }

  let load_file: REPLFunction;
  load_file = function (args: Array<string>) {
    const filePath = args[0];
    setCurrentFilePath(filePath);
    // Possibile implementation:
    return loadHelper(filePath);
  };

  function loadHelper(filePath: string) {
    try {
      CSV.loadCSV(filePath);
      // <CSVLoader filePath={filePath}></CSVLoader>;
    } catch (error) {
      console.error(error);
      return "Could not load file";
    }
    console.log(`Loaded dataset from ${filePath}`);
    return "File load was successful";
  }

  let changeMode: REPLFunction;
  changeMode = function (args: Array<string>) {
    props.toggleMode();
    const newMode = props.mode === "brief" ? "verbose" : "brief";

    // Prepare and format the history entry based on the mode BEFORE the toggle.
    const formattedEntry =
      props.mode === "brief"
        ? `Switched to verbose mode`
        : `Switched to brief mode`;

    // Update the history with the new entry
    props.setHistory([...props.history, formattedEntry]);
    return ""; // TODO: change this
  };

  let viewFile: REPLFunction;
  viewFile = function (args: Array<string>) {
    const filePath = args[0];
    return viewHelper(filePath);
  };

  function viewHelper(filePath: string) {
    try {
      CSV.viewCSV(filePath);
    } catch (error) {
      console.error(error);
      return "Could not display file";
    }
    console.log(`Viewing dataset from ${filePath}`);
    return "View file was successful";
  }

  // function searchFile(fileName: string) {
  //   const [, column, value] = commandString.split(" ");
  //   // Check if the column is a valid number
  //   if (isNaN(parseInt(column))) {
  //     // If not a number, find the index of the column name
  //     let columnIndex = props.data[0].indexOf(column);
  //   } else {
  //     // If it's a number, parse it to an integer
  //     let columnIndex = parseInt(column);
  //   }
  //   const searchResults = props.data.filter((row) => {
  //     // Check if the value matches the search value
  //     return row[columnIndex] === value;
  //   });
  // }

  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */
  return (
    <div className="repl-input">
      {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      {/* TODO: Currently this button just counts up, can we make it push the contents of the input box to the history?*/}
      <button onClick={() => handleSubmit(commandString)}> Submit </button>
    </div>
  );
}
