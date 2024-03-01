import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";

/* 
  You'll want to expand this component (and others) for the sprints! Remember 
  that you can pass "props" as function arguments. If you need to handle state 
  at a higher level, just move up the hooks and pass the state/setter as a prop.
  
  This is a great top level component for the REPL. It's a good idea to have organize all components in a component folder.
  You don't need to do that for this gearup.
*/

export default function REPL() {
  // TODO: Add some kind of shared state that holds all the commands submitted.
  // CHANGED
  const [history, setHistory] = useState<string[]>([]);
  const [mode, setMode] = useState<"brief" | "verbose">("brief");
  const [loadedFileData, setLoadedFileData] = useState<string[][]>([]);

  const toggleMode = () => {
    setMode((currentMode) => (currentMode === "brief" ? "verbose" : "brief"));
  };

  return (
    <div className="repl">
      {/*This is where your REPLHistory might go... You also may choose to add it within your REPLInput 
      component or somewhere else depending on your component organization. What are the pros and cons of each? */}
      <REPLHistory history={history} mode={mode} />
      <hr></hr>
      {/* CHANGED */}
      <REPLInput
        history={history}
        setHistory={setHistory}
        mode={mode}
        toggleMode={toggleMode}
        loadedFileData={loadedFileData} // Assuming you have this state managed as well
        setLoadedFileData={setLoadedFileData} // And the setter function for loadedFileData
      />
    </div>
  );
}
