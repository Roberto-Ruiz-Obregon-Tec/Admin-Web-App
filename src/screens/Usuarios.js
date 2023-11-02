import React, { useState, useEffect } from 'react';
import { FireError} from '../utils/alertHandler';
import { getUsers} from '../client/usuarios';
import UserCard from '../components/UserCard';
import '../styles/UserCard.css';
import '../styles/user.css';


function Usuarios() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const usersData = await getUsers();                
                setUsers(usersData);                
            } catch (error) {
                FireError(error.response.data.message);
            }
        })();
    }, []);

    return (
        <div className='user-container'>
            <h4 className='user-path'>Inicio / Usuarios</h4>
            <h2>Lista usuarios</h2>            

            <div className='users-container'>
                {users.map((user) => (
                    <UserCard
                        key={user._id}
                        user = {user}
                    />
                ))}
            </div>
            
        </div>
    );
                
}

export default Usuarios;
