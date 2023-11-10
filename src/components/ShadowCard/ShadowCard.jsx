import styles from "./ShadowCard.module.css";

export default function Card({
    children,
    className = ""
}) {
    return (
        <div className={`${styles.container} ${className}`}>
            {children}
        </div>
    )
}
