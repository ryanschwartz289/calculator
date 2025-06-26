import styles from "./Output.module.css";

type OutputProps = {
  output: string | number;
};

export default function Output({ output }: OutputProps) {
  return <div className={styles.output}>{output}</div>;
}
