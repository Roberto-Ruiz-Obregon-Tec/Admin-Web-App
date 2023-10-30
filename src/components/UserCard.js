import React from 'react';
import '../styles/UserCard.css';

function UserCard(props) {
  const { user } = props;
  const { firstName, lastName, email, _id } = user;

  return (
      <div className='card-container'>
          <p>{firstName}</p>
          <p>{lastName}</p>
          <p>{email}</p>
      </div>
  );
}

export default UserCard;
