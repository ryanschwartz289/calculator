import NumberButton from "../NumberButton/NumberButton";
import Operator from "../Operator/Operator";
import UtilButton from "../UtilButton/UtilButton";

import styles from "./ButtonList.module.css";
import { Grid } from "@mui/material";

type NumberButtonListProps = {
  output: string;
  setOutput: (value: string) => void;
  history: string[];
  setHistory: (value: string[]) => void;
  setRedoStack: (redoStack: string[]) => void;
  redoStack: string[];
};

export default function NumberButtonList({
  output,
  setOutput,
  history,
  setHistory,
  setRedoStack,
  redoStack,
}: NumberButtonListProps) {
  // Number Buttons
  const numsList = [];

  // Utility buttons (undo, redo, clear, delete, sign)
  numsList.push(
    <Grid size={6} key="undo">
      <UtilButton
        util="undo"
        output={output}
        setOutput={setOutput}
        history={history}
        setHistory={setHistory}
        disabled={history.length === 1 && history[0] === "0" && output === "0"} // Disable if only one item in history
        redoStack={redoStack}
        setRedoStack={setRedoStack}
      />
    </Grid>,
    <Grid size={6} key="redo">
      <UtilButton
        util="redo"
        output={output}
        setOutput={setOutput}
        history={history}
        setHistory={setHistory}
        disabled={redoStack.length === 0} // Disable if no items in history
        redoStack={redoStack}
        setRedoStack={setRedoStack}
      />
    </Grid>,
    <Grid size={3} key="clear">
      <UtilButton
        util="clear"
        output={output}
        setOutput={setOutput}
        history={history}
        setHistory={setHistory}
        redoStack={redoStack}
        setRedoStack={setRedoStack}
      />
    </Grid>,
    <Grid size={3} key="delete">
      <UtilButton
        util="delete"
        output={output}
        setOutput={setOutput}
        history={history}
        setHistory={setHistory}
        redoStack={redoStack}
        setRedoStack={setRedoStack}
      />
    </Grid>,
    <Grid size={3} key="sign">
      <UtilButton
        util="+/-"
        output={output}
        setOutput={setOutput}
        history={history}
        setHistory={setHistory}
        redoStack={redoStack}
        setRedoStack={setRedoStack}
      />
    </Grid>
  );

  const orderedNums: number[] = [7, 8, 9, 4, 5, 6, 1, 2, 3];

  // Render number buttons
  for (const i of orderedNums) {
    numsList.push(
      <Grid size={3} key={i}>
        <NumberButton
          output={output}
          setOutput={setOutput}
          number={String(i)}
          setRedoStack={setRedoStack}
        />
      </Grid>
    );
  }
  numsList.push(
    <Grid size={6} key={0}>
      <NumberButton
        output={output}
        setOutput={setOutput}
        number={String(0)}
        setRedoStack={setRedoStack}
      />
    </Grid>
  );
  numsList.push(
    <Grid size={3} key=".">
      <NumberButton
        output={output}
        setOutput={setOutput}
        number="."
        setRedoStack={setRedoStack}
      />
    </Grid>
  );

  // Operators in a right column
  const operators: ("divide" | "times" | "minus" | "add" | "equals")[] = [
    "divide",
    "times",
    "minus",
    "add",
    "equals",
  ];

  // Render operators in their own column (right side)
  let j = 0;
  for (let i = 5; j < operators.length; i += 4) {
    numsList.splice(
      i,
      0,
      <Grid size={3} key={operators[j]}>
        <Operator
          operator={operators[j]}
          output={output}
          setOutput={setOutput}
          history={history}
          setHistory={setHistory}
        />
      </Grid>
    );
    j++;
  }

  return (
    <Grid container className={styles.container} spacing={1}>
      {numsList}
    </Grid>
  );
}
