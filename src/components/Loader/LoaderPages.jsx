import styles from "./LoaderPages.module.css";
import Skeleton from "./Skeleton/Skeleton";

function LoaderPages() {
    return (
        <div className={styles.wrap}>
            <div className={styles.wrap_skeleton}>
                <Skeleton className={styles.big_skeleton} />
                <Skeleton className={styles.small_skeleton} />
            </div>
            <div className={styles.wrap_skeleton}>
                <Skeleton className={styles.big_skeleton} />
                <Skeleton className={styles.small_skeleton} />
            </div>
            <div className={styles.wrap_skeleton}>
                <Skeleton className={styles.big_skeleton} />
                <Skeleton className={styles.small_skeleton} />
            </div>
            <div className={styles.wrap_skeleton}>
                <Skeleton className={styles.big_skeleton} />
                <Skeleton className={styles.small_skeleton} />
            </div>
        </div>
    )
}
export default LoaderPages;