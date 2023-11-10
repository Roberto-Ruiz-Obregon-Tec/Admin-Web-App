import React, { useState, useEffect } from 'react';
import { FireError } from '../../utils/alertHandler';
import { getUsers } from '../../client/usuarios';
import LoaderPages from './Loader/LoaderPages';
import UserCard from './Card/Card';
import NavHistory from "../../components/NavHistory/NavHistory";
import Title from "../../components/Title/Title";
import styles from "./Users.module.css";
import Icons from "../../icons/index";

function Usuarios() {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const usersData = await getUsers();
                setIsLoading(false);
                setUsers(usersData);
            } catch (error) {
                FireError(error.response.data.message);
            }
        })();
    }, []);

    return (
        <div>
            <NavHistory>
                Inicio / Usuarios
            </NavHistory>
            <Title>
                {Icons.users()}
                Lista usuarios
            </Title>
            {isLoading && (
                <LoaderPages />
            )}
            {!isLoading && (
                <div className={styles.users_container}>
                    {users.map((user) => (
                        <UserCard
                            key={user._id}
                            user={user}
                        />
                    ))}
                </div>
            )}
        </div>
    );

}

export default Usuarios;
