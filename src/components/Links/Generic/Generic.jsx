import styles from "./Generic.module.css";

function GenericLink({
    href, name
}) {
    return (
        <a href={href} target="blank" title={name} className={styles.container}>
            {name}
        </a>
    )
}
export default GenericLink;