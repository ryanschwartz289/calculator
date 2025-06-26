import { useState, useEffect } from "react";
import "./App.css";
import NumberButtonList from "./components/ButtonList/ButtonList";
import Output from "./components/Output/Output";
// import KeybindingsList from "./components/KeybindingsList/KeybindingsList";
import { handleCalculatorKeyDown } from "./utils/keyboardUtils";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [output, setOutput] = useState("0");
  const [history, setHistory] = useState(["0"]);
  const [redoStack, setRedoStack] = useState<string[]>([]);
  // const [menuOpen, setMenuOpen] = useState(false);

  // const handleMenuClick = () => {
  //   setMenuOpen(!menuOpen);
  // };

  useEffect(() => {
    const handler = (event: KeyboardEvent) =>
      handleCalculatorKeyDown(
        event,
        output,
        setOutput,
        history,
        setHistory,
        setRedoStack,
        redoStack
      );
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [output, history, redoStack]);

  return (
    <div className="App">
      <main>
        <Output output={output} />
        <NumberButtonList
          output={output}
          setOutput={setOutput}
          history={history}
          setHistory={setHistory}
          setRedoStack={setRedoStack}
          redoStack={redoStack}
        />
      </main>
      {/* <nav className="keybindings-menu" aria-label="Keyboard Shortcuts">
        <FontAwesomeIcon
          icon={faBars}
          className="hamburger-icon"
          onClick={handleMenuClick}
        />
        <KeybindingsList hidden={!menuOpen} />
      </nav> */}
    </div>
  );
}

export default App;
