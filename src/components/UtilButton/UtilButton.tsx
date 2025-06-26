import styles from "./UtilButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDeleteLeft,
  faPlusMinus,
  faRotateLeft,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { addHistory } from "../../utils/history";
import type { JSX } from "react";
import { undo, redo, clearRedoStack } from "../../utils/history";

type UtilButtonProps = {
  util: string;
  output: string;
  setOutput: (value: string) => void;
  history: string[];
  setHistory: (value: string[]) => void;
  disabled?: boolean;
  setRedoStack: (redoStack: string[]) => void;
  redoStack: string[];
};

export default function UtilButton({
  util,
  output,
  setOutput,
  history,
  setHistory,
  disabled = false,
  setRedoStack,
  redoStack,
}: UtilButtonProps) {
  function handleClick() {
    // e.preventDefault();
    if (util === "delete") {
      const newOutput = output.slice(0, -1);
      setOutput(newOutput === "" ? "0" : newOutput);
    } else if (util === "clear") {
      if (output === "0") {
        setHistory(["0"]);
        clearRedoStack(setRedoStack);
      } else {
        addHistory(history, setHistory, output);
        setOutput("0");
      }
    } else if (util === "+/-") {
      addHistory(history, setHistory, output);
      if (/^-[0-9.]+$/.test(output)) {
        // If output is just a negative number, remove the negative
        setOutput(output.slice(1));
      } else if (/^[0-9.]+$/.test(output)) {
        // If output is just a positive number, add the negative
        setOutput("-" + output);
      } else if (/[+\-*/^]/.test(output) && !/^-\(.*\)$/.test(output)) {
        // If any operation is present and not already wrapped in -(...)
        setOutput(`-(${output})`);
      } else if (/^-\((.*)\)$/.test(output)) {
        // If output is wrapped in -(...), unwrap it
        setOutput(output.match(/^-\((.*)\)$/)![1]);
      } else if (output[0] === "-") {
        setOutput(output.slice(1));
      }
    } else if (util === "undo") {
      undo(
        history,
        setHistory,
        setOutput,
        setRedoStack,
        redoStack,
        output,
        disabled
      );
    } else if (util === "redo") {
      redo(
        history,
        setHistory,
        setOutput,
        setRedoStack,
        redoStack,
        output,
        disabled
      );
    }
  }

  const utilIcons: Record<string, JSX.Element | string> = {
    delete: <FontAwesomeIcon icon={faDeleteLeft} />,
    "+/-": <FontAwesomeIcon icon={faPlusMinus} />,
    undo: <FontAwesomeIcon icon={faRotateLeft} />,
    redo: <FontAwesomeIcon icon={faRotateRight} />,
    clear: output === "0" ? "A/C" : "C",
  };

  return (
    <div
      className={`${styles.util} button ${disabled ? styles.disabled : ""}`}
      onClick={handleClick}
    >
      {utilIcons[util] ?? util}
    </div>
  );
}
