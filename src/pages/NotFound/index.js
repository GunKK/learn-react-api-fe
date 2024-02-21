import styles from "./NotFound.module.css"
export default function NotFound() {
  return (
    <div className={styles.pageNotFound}>
      <h1 className={styles.heading}>404</h1>
      <h1 className={styles.heading2}>Not found !!!</h1>
      <a className={styles.returnHome} href="/">
        Quay lại trang chủ
      </a>
    </div>
  );
}
