import styles from "./Card.module.css";

export default function CardUser({
    user
}) {
    const { firstName, lastName, email, rol } = user;

    return (
        <div className={styles.card_container}>
            <h3 className={styles.name}>{firstName} {lastName}</h3>
            <p className={styles.rol}> {rol} </p>
            <p>{email}</p>
        </div>
    )
}