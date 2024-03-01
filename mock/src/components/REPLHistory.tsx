import "../styles/main.css";

interface REPLHistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  // CHANGED
  history: string[];
  mode: string;
}
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history" aria-label="repl-history">
      {props.history.map((item, index) => {
        if (item.includes("<table")) {
          // If the item contains "<table", render it as HTML
          return <div key={index} dangerouslySetInnerHTML={{ __html: item }} />;
        } else if (props.mode === "verbose") {
          // For verbose mode, parse the item and display it accordingly
          const isVerboseFormat = item.startsWith("Command:");
          let parts;
          if (isVerboseFormat) {
            parts = item.split("\n");
          } else {
            parts = [item, item];
          }
          return (
<<<<<<< Updated upstream
            <div key={index}>
              <strong>{parts[0]}</strong>
              <br />
              {parts[1]}
=======
            <div className="output styling" key={index}>
              <strong aria-label="command">{parts[0]}</strong>
              <br aria-label="output" />
              Output: {parts[1]}
>>>>>>> Stashed changes
            </div>
          );
        } else {
          const output = item.includes("\n") ? item.split("\n")[1] : item;
          return <p key={index}> Output: {output}</p>;
        }
      })}
    </div>
  );
}
