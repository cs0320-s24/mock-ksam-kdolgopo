import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";

/**
 * The REPL component serves as the root component for the Read-Eval-Print Loop (REPL) application.
 * It manages the shared state for the application, including the history of commands submitted,
 * the mode of the REPL (brief or verbose), and the loaded file data for CSV operations.
 * This component orchestrates the interaction between the REPL input and history display components,
 * providing a cohesive user interface for executing and viewing the results of REPL commands.
 */
export default function REPL() {
  // State for maintaining the history of commands submitted by the user.
  const [history, setHistory] = useState<string[]>([]);

  // State for controlling the display mode of the REPL (either 'brief' or 'verbose').
  // This affects how command outputs are displayed in the REPL history.
  const [mode, setMode] = useState<string>("brief");

  // State for storing loaded CSV file data, which can be utilized by CSV-related commands.
  const [loadedFileData, setLoadedFileData] = useState<string[][]>([]);

  /**
   * Toggles the display mode of the REPL between 'brief' and 'verbose'.
   * This function is passed down to child components that may trigger a mode change.
   */
  const set = () => {
    setMode((mode) => (mode === "brief" ? "verbose" : "brief"));
  };

  return (
    <div className="repl">
      {/* The REPLHistory component is responsible for displaying the history of commands
          and their outputs. It receives the current history and mode as props. */}
      <REPLHistory history={history} mode={mode} />
      <hr></hr>
      {/* The REPLInput component handles the input of new commands by the user.
          It receives the current history, mode, and functions for updating these states,
          as well as the loaded file data and its setter function. */}
      <REPLInput
        history={history}
        setHistory={setHistory}
        mode={mode}
        setMode={set}
        loadedFileData={loadedFileData}
        setLoadedFileData={setLoadedFileData}
      />
    </div>
  );
}
