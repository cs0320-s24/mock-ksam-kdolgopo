import "../styles/main.css";

interface REPLHistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  // CHANGED
  history: string[];
  mode: string;
}
export function REPLHistory(props: REPLHistoryProps) {
  if (props.mode === "verbose") {
    return (
      <div className="repl-history" aria-label="repl-history">
        {props.history.map((item, index) => {
          // Check if the item follows the verbose format
          const isVerboseFormat = item.startsWith("Command:");
          // Split the item into two parts only if it's in verbose format
          const parts = isVerboseFormat ? item.split("\n") : [null, item];
          return (
            <div key={index}>
              <strong>{parts[0]}</strong>
              <br />
              {parts[1]}
            </div>
          );
        })}
      </div>
    );
  } else {
    // Fallback for brief mode or any other mode
    return (
      <div className="repl-history" aria-label="repl-history">
        {props.history.map((item, index) => {
          // For brief mode, we only show the output. If the format is consistent,
          // we might need to extract the output part. If it's just output, then display as is.
          const output = item.includes("\n") ? item.split("\n")[1] : item;
          return <p key={index}> Output: {output}</p>;
        })}
      </div>
    );
  }
}
