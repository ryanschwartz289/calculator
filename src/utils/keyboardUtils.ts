import { addHistory, undo, redo, clearRedoStack } from "./history";
import { evaluate } from "mathjs";

/**
 * Handles keyboard events for a calculator input, updating the output and managing history/redo stacks.
 *
 * Supported keys:
 * - Digits, operators, parentheses, and decimal point for input.
 * - Backspace (with/without meta/alt) for deletion or clearing.
 * - Enter or "=" to evaluate the current expression.
 * - Undo/redo via Cmd/Ctrl+Z and Cmd/Ctrl+Shift+Z.
 *
 * @param event - The keyboard event triggered by user input.
 * @param output - The current calculator output as a string.
 * @param setOutput - Function to update the calculator output.
 * @param history - Array of previous calculator outputs for undo functionality.
 * @param setHistory - Function to update the history array.
 * @param setRedoStack - Function to update the redo stack array.
 * @param redoStack - Array of outputs for redo functionality.
 */
export function handleCalculatorKeyDown(
  event: KeyboardEvent,
  output: string,
  setOutput: (v: string) => void,
  history: string[],
  setHistory: (value: string[]) => void,
  setRedoStack: (value: string[]) => void,
  redoStack: string[]
): void {
  let disabled = false; // Flag to track if undo/redo should be disabled
  if (
    event.key === "Backspace" &&
    (event.metaKey || event.altKey) &&
    output !== "0"
  ) {
    addHistory(history, setHistory, output);
    setOutput("0");
  } else if (event.key === "Backspace" && output !== "0") {
    const newOutput = output.slice(0, -1);
    setOutput(newOutput ? newOutput : "0");
  } else if (/^[0-9+\-*/.()]$/.test(event.key)) {
    clearRedoStack(setRedoStack);
    if (event.key === ".") {
      // Get the last number segment after the last operator
      const lastNumber = output.split(/[+\-*/]/).pop() || "";
      if (lastNumber.includes(".")) {
        return;
      }
    }

    if (output === "0" && /[0-9-()]/.test(event.key)) {
      setOutput(event.key);
    } else {
      setOutput(output + event.key);
    }
  } else if (event.key === "Enter" || event.key === "=") {
    addHistory(history, setHistory, output);
    setOutput(String(evaluate(output)));
  }
  // Cmd+Shift+Z (Mac) or Ctrl+Y (Windows/Linux) for redo
  else if (
    event.key === "z" &&
    (event.metaKey || event.ctrlKey) &&
    event.shiftKey // Cmd+Shift+Z
  ) {
    // Redo logic here
    disabled = redoStack.length === 0;
    redo(
      history,
      setHistory,
      setOutput,
      setRedoStack,
      redoStack,
      output,
      disabled
    );
  } else if (event.key === "z" && (event.metaKey || event.ctrlKey)) {
    disabled = history.length === 1 && history[0] === "0" && output === "0";
    undo(
      history,
      setHistory,
      setOutput,
      setRedoStack,
      redoStack,
      output,
      disabled
    );
  } else {
    // Ignore other keys
    return;
  }
  // Prevent default behavior for keys that we handle
  event.preventDefault();
  // Prevent propagation to avoid conflicts with other event handlers
  event.stopPropagation();
}
