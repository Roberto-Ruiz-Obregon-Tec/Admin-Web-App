import styles from "./NavHistory.module.css";

function NavHistory({
    children
}) {
    return (
        <h4 className={styles.h4}>
            {children}
        </h4>
    )
}
export default NavHistory;