import React from 'react';
import '../styles/UserCard.css';

function UserCard(props) {
  const { user } = props;
  const { firstName, lastName, email, _id } = user;

  return (
      <div className='card-container'>
          <h3>{firstName} {lastName}</h3>          
          <p>{email}</p>
      </div>
  );
}

export default UserCard;
