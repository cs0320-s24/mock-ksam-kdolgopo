import "../styles/main.css";

interface REPLHistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  // CHANGED
  history: string[];
  mode: string;
}
interface HistoryItem {
  content: string;
  type: "text" | "html"; // Add more types as needed
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
          const parts = isVerboseFormat ? item.split("\n") : [null, item];
          return (
            <div key={index}>
              <strong aria-label="command">{parts[0]}</strong>
              <br aria-label="output" />
              {parts[1]}
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
