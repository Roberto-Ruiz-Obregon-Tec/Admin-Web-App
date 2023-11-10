import styles from "./LoaderPages.module.css";
import Skeleton from "../../../components/Skeleton/Skeleton";

function LoaderPages() {
    return (
        <div className={styles.wrap}>
            <Skeleton className={styles.skeleton} />
            <Skeleton className={styles.skeleton} />
            <Skeleton className={styles.skeleton} />
            <Skeleton className={styles.skeleton} />
            <Skeleton className={styles.skeleton} />
            <Skeleton className={styles.skeleton} />
            <Skeleton className={styles.skeleton} />
            <Skeleton className={styles.skeleton} />
        </div>
    )
}
export default LoaderPages;