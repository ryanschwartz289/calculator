/**
 * Utility functions for managing calculator history, undo, and redo operations.
 *
 * @module history
 */

/**
 * Type definition for a setter function that updates the history array.
 *
 */

type HistorySetter = {
  (history: string[]): void;
};

/**
 * Adds a new output to the history array if the output is not "0".
 *
 */
export function addHistory(
  history: string[],
  setHistory: HistorySetter,
  output: string
): void {
  if (output !== "0") {
    setHistory([...history, output]);
  }
}

/**
 * Performs an undo operation by moving the last output from history to the redo stack,
 * updating the output, and removing the last entry from history.
 * If only one item remains in history, resets history to ["0"].
 *
 */
export function undo(
  history: string[],
  setHistory: (history: string[]) => void,
  setOutput: (output: string) => void,
  setRedoStack: (redoStack: string[]) => void,
  redoStack: string[],
  output: string,
  disabled: boolean = false
): void {
  if (!disabled) {
    if (history.length > 0) {
      const lastOutput = history.at(-1) || "0";
      setRedoStack([...redoStack, output]);
      setOutput(lastOutput);
      setHistory(history.slice(0, -1));
    }
    if (history.length === 1) {
      setHistory(["0"]);
    }
  }
}

/**
 * Performs a redo operation by moving the last output from the redo stack back to history,
 * updating the output, and removing the last entry from the redo stack.
 *
 */
export function redo(
  history: string[],
  setHistory: (history: string[]) => void,
  setOutput: (output: string) => void,
  setRedoStack: (redoStack: string[]) => void,
  redoStack: string[],
  output: string,
  disabled: boolean = false
): void {
  if (!disabled) {
    if (redoStack.length > 0) {
      const nextOutput = redoStack.at(-1) || "0";
      setHistory([...history, output]);
      setOutput(nextOutput);
      setRedoStack(redoStack.slice(0, -1));
    }
  }
}

/**
 * Clears the redo stack by setting it to an empty array.
 *
 */
export function clearRedoStack(
  setRedoStack: (redoStack: string[]) => void
): void {
  setRedoStack([]);
}
