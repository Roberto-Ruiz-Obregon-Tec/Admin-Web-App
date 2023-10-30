import React from 'react';
import '../styles/certsCard.css';

function CertificationsCard(props) {
    const { name, description } = props;
    return (
        <div className='certs-container'>
            <p>{name}</p>
            <p>{description}</p>
        </div>
    );
}

export default CertificationsCard;
