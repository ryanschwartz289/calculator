import styles from "./Keybinding.module.css";

type KeybindingProps = {
  keybinding: string;
  description: string;
};

export default function Keybinding({
  keybinding,
  description,
}: KeybindingProps) {
  return (
    <li className={styles.keybindingListItem}>
      <span className={styles.keybindingKey}>{keybinding}</span>
      <span className={styles.keybindingDescription}>{description}</span>
    </li>
  );
}
