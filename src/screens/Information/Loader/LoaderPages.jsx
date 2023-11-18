import styles from "./LoaderPages.module.css";
import Skeleton from "../../../components/Skeleton/Skeleton";

function LoaderPages() {
    return (
        <div className={styles.wrap}>
            <div className={styles.wrap_skeleton}>                
                <Skeleton className={styles.small_skeleton} />
                <Skeleton className={styles.small_skeleton} />
                <Skeleton className={styles.small_skeleton} />
                <Skeleton className={styles.small_skeleton} />
            </div>
        </div>
    )
}
export default LoaderPages;