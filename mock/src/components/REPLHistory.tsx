import "../styles/main.css";

/**
 * Interface to describe the properties received by the REPLHistory component.
 */
interface REPLHistoryProps {
  // Array of string entries representing the command history.
  history: string[];
  // Current mode of the REPL, affecting how history items are displayed.
  mode: string;
}

/**
 * Component to render the history of commands executed in the REPL.
 *
 * Depending on the mode (`verbose` or another), and the content of the history item
 * (plain text or HTML like a table), it renders the history items differently.
 *
 * @param props The properties passed to the component, including `history` and `mode`.
 * @returns A React element that displays the history of REPL commands.
 */
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history" aria-label="repl-history">
      {props.history.map((item, index) => {
        if (item.includes("<table")) {
          // Render item as HTML if it includes "<table".
          // This uses `dangerouslySetInnerHTML` to render raw HTML, which is necessary
          // for displaying tables but should be used with caution to avoid XSS vulnerabilities.
          return (
            <div
              className="output styling"
              key={index}
              dangerouslySetInnerHTML={{ __html: item }}
            />
          );
        } else if (props.mode === "verbose") {
          // In verbose mode, split the item into command and output parts if the format matches.
          const isVerboseFormat = item.startsWith("Command:");
          let parts;
          if (isVerboseFormat) {
            parts = item.split("\n");
          } else {
            parts = [item, item];
          }
          return (
            <div className="output styling" key={index}>
              <strong aria-label="command">{parts[0]}</strong>
              <br aria-label="output" />
              Output: {parts[1]}
            </div>
          );
        } else {
          // In other modes, primarily render the output part of the item,
          // which may require parsing if the item includes a newline character.
          const output = item.includes("\n") ? item.split("\n")[1] : item;
          return (
            <p aria-label="output" className="output styling" key={index}>
              Output: {output}
            </p>
          );
        }
      })}
    </div>
  );
}

