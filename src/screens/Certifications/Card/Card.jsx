import React from 'react';
import styles from "./Card.module.css";

function CertificationsCard(props) {
    const { name, description } = props;
    return (
        <div className={styles.certs_container}>
            <p className={styles.name}>{name}</p>
            <p className={styles.des}>
                {description}
            </p>
        </div>
    );
}

export default CertificationsCard;
