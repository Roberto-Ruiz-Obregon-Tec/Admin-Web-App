import React, {useState, useEffect,  useContext } from "react";
import { FireError } from '../../../utils/alertHandler';
import { ContentContext } from "../Content";    
import LoaderPages from './Loader/LoaderPages';
import { PATH_CREATE_SCHOLARSHIP } from "../../../config/paths";
import { EDIT_SCHOLARSHIP } from "../store/modalReducer";
import { Link } from "react-router-dom";

import { getScholarships } from '../../../client/scholarships'; 

import NavHistory from "../../../components/NavHistory/NavHistory";
import Title from "../../../components/Title/Title";
import Icons from "../../../icons/index";
import Table from "../../../components/Table/Table";
import styles from "./Scholarships.module.css";

function Scholarships() {

    const { modalDispatch } = useContext(ContentContext);
    
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

    const openEdit = (i) => {
        try {
            if (i < 0 || i >= scholarships.length) return;
            const scholar = scholarships[i];
            modalDispatch({
                type: EDIT_SCHOLARSHIP,
                payload: scholar
            });
        }catch{ }
    }

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
                        percentages={[30, 15, 15, 20, 25, 15, 15, 40]}
                        handleEdit = { openEdit }
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
