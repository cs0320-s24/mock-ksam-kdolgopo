import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "../styles/main.css";
import { ControlledInput } from "./ControlledInput";
import CSV from "./CSV";

export interface REPLFunction {
  (args: Array<string>): string | string[][];
}

export interface REPLInputProps extends CSVProps {
  history: string[];
  setHistory: React.Dispatch<React.SetStateAction<string[]>>;
  mode: "brief" | "verbose";
  toggleMode: () => void;
}

export interface CSVProps {
  currentFile: string;
  setCurrentFile: React.Dispatch<React.SetStateAction<string>>;
  loadedFileData: string[][];
  setLoadedFileData: React.Dispatch<React.SetStateAction<string[][]>>;
}

// Assuming `properties` is supposed to have the structure of `CSVProps`
let properties: CSVProps = {
  currentFile: "", // Initial state
  setCurrentFile: () => {}, // Placeholder function
  loadedFileData: [],
  setLoadedFileData: () => {}, // Placeholder function
};

function csvFunctionalityComponent() {
  // const { loadCSV, viewCSV } = csvFunctionality();
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps, properties: CSVProps) {
  // Remember: let React manage state in your webapp.

  // Manages the contents of the input box
  const [commandRegistry, setCommandRegistry] = useState<{
    [key: string]: REPLFunction;
  }>({});
  const [commandString, setCommandString] = useState<string>("");

  useEffect(() => {
    // Register commands when component is mounted (the program is ready to be executed)
    //registerCommand("load_file", load_file);
    registerCommand("mode", changeMode);
    registerCommand("load", loadFile);
    registerCommand("view", viewFile);
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

  let loadFile: REPLFunction;
  loadFile = function (args: Array<string>) {
    properties.setCurrentFile(args[1]);

    return CSV.loadCSV(properties);
  };

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
    if ((properties.currentFile = args[0])) {
      return CSV.viewCSV(properties);
    }
    return "Please load file before attempting to view.";
  };

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
      <button onClick={() => handleSubmit(commandString)}> Submit </button>
    </div>
  );
}
