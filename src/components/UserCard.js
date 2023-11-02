import React from 'react';
import '../styles/UserCard.css';

function UserCard(props) {
  const { user } = props;
  const { firstName, lastName, email, rol, _id } = user;

  return (
      <div className='card-container'>
          <h3 className='name'>{firstName} {lastName}</h3>          
          <p className='rol'> {rol} </p>
          <p>{email}</p>
      </div>
  );
}

export default UserCard;
