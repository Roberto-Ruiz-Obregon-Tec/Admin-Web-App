import React, { useState, useEffect } from 'react';
import { FireError } from '../../utils/alertHandler';
import { getUsers } from '../../client/usuarios';
import LoaderPages from './Loader/LoaderPages';
import NavHistory from "../../components/NavHistory/NavHistory";
import Title from "../../components/Title/Title";
import Icons from "../../icons/index";
import Table from "../../components/Table/Table";

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
                setIsLoading(false);
                FireError(error.response.data.message);
            }
        })();
    }, []);

    const getMatrix = () => {
        if (users.length === 0) return [];

        const matrix = []

        // El orden impora
        const possibleKeys = [
            "firstName",
            "lastName",
            "email",
            "age",
            "rol",
            "gender"
        ]

        for (let i = 0; i < users.length; i++) {
            const row = [];
            const user = users[i];

            for (let j = 0; j < possibleKeys.length; j++) {
                const key = possibleKeys[j];
                row.push(user[key] ? user[key] : "");
            }

            matrix.push(row);
        }
        return matrix;
    };

    return (
        <div>
            <NavHistory>
                Inicio / Usuarios
            </NavHistory>
            <Title>
                {Icons.users()}
                Lista de usuarios
            </Title>
            {isLoading && (
                <LoaderPages />
            )}
            {!isLoading && (
                <Table
                    matrixData={getMatrix()}
                    arrayHeaders={[
                        "Primer nombre",
                        "Apellido",
                        "Correo electrónico",
                        "Edad",
                        "Rol",
                        "Género"
                    ]}
                />
            )}
        </div>
    );

}

export default Usuarios;
