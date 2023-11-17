import React, {useState, useEffect } from "react";
import { FireError } from '../../../utils/alertHandler';
import LoaderPages from './Loader/LoaderPages';
import { PATH_CREATE_SCHOLARSHIP } from "../../../config/paths";
import { Link } from "react-router-dom";

import { getScholarships } from '../../../client/scholarships'; 

import NavHistory from "../../../components/NavHistory/NavHistory";
import Title from "../../../components/Title/Title";
import Icons from "../../../icons/index";
import Table from "../../../components/Table/Table";
import styles from "./Scholarships.module.css";

function Scholarships() {
    
    const [scholarships, setscholar] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const scholarsh = await getScholarships();
                setIsLoading(false);
                setscholar(scholarsh);
            } catch (error) {
                setIsLoading(false);
                FireError(error.response.data.message);
            }
        })();
    }, []);

    const getFormatedDate = (date) => {
        const dateObject = new Date(date);

        return dateObject.getDate() + "/" + (dateObject.getMonth() + 1) + "/" + dateObject.getFullYear();
    };

    const getMatrix = () => {
        if (scholarships.length === 0) return [];


        const matrix = []

        // El orden impora
        const possibleKeys = [
            "name",
            "organization",
            "location", 
            "phone", 
            "email",
            "startDate",
            "endDate",
            "description"
        ]

        const needsTransformation = new Set();
        needsTransformation.add("startDate");
        needsTransformation.add("endDate");

        for (let i = 0; i < scholarships.length; i++) {
            const row = [];
            const evento = scholarships[i];

            for (let j = 0; j < possibleKeys.length; j++) {
                const key = possibleKeys[j];
                if (needsTransformation.has(key)) {
                    row.push(evento[key] ? getFormatedDate(evento[key]) : "dd/mm/yyyy");
                } else {
                    row.push(evento[key] !== "" ? evento[key] : "");
                }
            }

            matrix.push(row);
        }
        return matrix;
    };

    return (
        <div>

            <NavHistory>
                Gestión de contenido / Becas
            </NavHistory>
            <Title>
                {Icons.becas()}
                Lista de Becas
            </Title>
            {isLoading && (
                <LoaderPages />
            )}
            {!isLoading && (
                <>
                    <Table
                        matrixData={getMatrix()}
                        arrayHeaders={[
                            "Nombre",
                            "Organización",
                            "Ubicación",
                            "Telefono",
                            "Correo", 
                            "Fecha de inicio",
                            "Fecha fin",
                            "Descripción"
                        ]}
                        percentages={[30, 10, 10, 10, 20, 10, 10, 40]}
                    />
                    <Link title="Dar de alta beca" to={PATH_CREATE_SCHOLARSHIP} className={styles.add}>
                        {Icons.cross()}
                    </Link>
                </>
            )}

        </div>
    )

};

export default Scholarships;
