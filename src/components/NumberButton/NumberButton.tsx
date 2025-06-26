import { clearRedoStack } from "../../utils/history";
import styles from "./NumberButton.module.css";

type NumberButtonProps = {
  number: string;
  output: string;
  setOutput: (value: string) => void;
  setRedoStack: (redoStack: string[]) => void;
};

export default function NumberButton({
  number,
  output,
  setOutput,
  setRedoStack,
}: NumberButtonProps) {
  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    clearRedoStack(setRedoStack);
    setOutput(output === "0" ? number : output + number);
  }

  return (
    <div
      className={
        number === "."
          ? `${styles.period} ${styles.number} button`
          : `${styles.number} button`
      }
      onClick={handleClick}
    >
      {number}
    </div>
  );
}
