import { Dispatch, SetStateAction, useState } from "react";
import "../styles/main.css";
import { ControlledInput } from "./ControlledInput";

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
  const [commandString, setCommandString] = useState<string>("");
  // TODO WITH TA : add a count state
  const [count, setCount] = useState<number>(0);

  // This function is triggered when the button is clicked.
  function handleSubmit(commandString: string) {
    setCount(count + 1);
    // CHANGED
    if (commandString == "mode") {
      props.toggleMode();
      const newMode = props.mode === "brief" ? "verbose" : "brief";

      // Prepare and format the history entry based on the mode BEFORE the toggle.
      const formattedEntry =
        props.mode === "brief"
          ? `Switched to verbose mode`
          : `Switched to brief mode`;

      // Update the history with the new entry
      props.setHistory([...props.history, formattedEntry]);
    } else {
      // Handle other commands here. For now, let's just add the commandString to the history.
      // In a real application, you might have more complex logic to process commands and produce output.
      const output = `None`; // Placeholder for actual command output
      const formattedEntry =
        props.mode === "verbose"
          ? `Command: ${commandString}\n ${output}`
          : output;

      props.setHistory([...props.history, formattedEntry]);
    }

    // Clear the command input
    setCommandString("");
  }

  function changeFormat() {
    if (props.mode == "brief") {
      props.mode = "verbose";
    } else {
      props.mode = "brief";
    }
  }

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
      <button onClick={() => handleSubmit(commandString)}>
        Submitted {count} times
      </button>
    </div>
  );
}
