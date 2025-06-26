// import { divide, multiply, add, subtract } from "../../utils/operations";
import styles from "./Operator.module.css";
import { evaluate } from "mathjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faDivide,
  faXmark,
  faMinus,
  faPlus,
  faEquals,
} from "@fortawesome/free-solid-svg-icons";
import { addHistory } from "../../utils/history";

type OperatorProps = {
  operator: "divide" | "times" | "minus" | "add" | "equals";
  output: string;
  setOutput: (value: string) => void;
  history: string[];
  setHistory: (value: string[]) => void;
};

export default function Operator({
  operator,
  output,
  setOutput,
  history,
  setHistory,
}: OperatorProps) {
  const operatorSymbols = {
    divide: <FontAwesomeIcon icon={faDivide} />,
    times: <FontAwesomeIcon icon={faXmark} />,
    minus: <FontAwesomeIcon icon={faMinus} />,
    add: <FontAwesomeIcon icon={faPlus} />,
    equals: <FontAwesomeIcon icon={faEquals} />,
  };

  const operatorMath = {
    divide: "/",
    times: "*",
    minus: "-",
    add: "+",
    equals: "=",
  };

  function handleClick(): void {
    if (operator === "equals") {
      addHistory(history, setHistory, output);
      setOutput(String(evaluate(output)));
    } else {
      setOutput(output + operatorMath[operator]);
    }
  }

  return (
    <div
      className={
        operator === "equals"
          ? `${styles.equals} button`
          : `${styles.operator} button`
      }
      onClick={handleClick}
    >
      {operatorSymbols[operator]}
    </div>
  );
}
