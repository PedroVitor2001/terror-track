import styles from "./GenreTag.module.css";

type GenreTagProps = {
  name: string;
};

export default function GenreTag({ name }: GenreTagProps) {
  return <span className={styles.tag}>{name}</span>;
}
