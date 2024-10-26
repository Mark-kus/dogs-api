import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.container}>
      <h2>Loading</h2>
      <div className={styles.loader}></div>
    </div>
  );
}
