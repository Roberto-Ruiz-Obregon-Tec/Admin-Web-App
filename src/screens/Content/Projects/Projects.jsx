import React, { useState, useEffect, useContext } from 'react';
import { ContentContext } from "../Content";
import { OPEN_PROJECT, EDIT_PROJECT } from "../store/modalReducer";
import { FireError } from '../../../utils/alertHandler';
import { Link } from "react-router-dom";
import { getProgram } from '../../../client/availableProj'
import LoaderPages from './Loader/LoaderPages';
import NavHistory from "../../../components/NavHistory/NavHistory";
import Title from "../../../components/Title/Title";
import { PATH_CREATE_PROJECTS } from "../../../config/paths";
import Icons from "../../../icons/index";
import Table from "../../../components/Table/Table";
import styles from "./Projects.module.css";

function Proyectos() {
    const { modalDispatch } = useContext(ContentContext);
    const [avaliableP, setavailableP] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const proj = await getProgram();
                setIsLoading(false);
                setavailableP(proj);
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
        if (avaliableP.length === 0) return [];

        const matrix = []

        // El orden impora
        const possibleKeys = [
            "name",
            "startDate",
            "deadlineDate",
            "endDate",
            "description"
        ]

        const needsTransformation = new Set();
        needsTransformation.add("startDate");
        needsTransformation.add("endDate");
        needsTransformation.add("deadlineDate");

        for (let i = 0; i < avaliableP.length; i++) {
            const row = [];
            const project = avaliableP[i];

            for (let j = 0; j < possibleKeys.length; j++) {
                const key = possibleKeys[j];
                if (needsTransformation.has(key)) {
                    row.push(project[key] ? getFormatedDate(project[key]) : "dd/mm/yyyy");
                } else {
                    row.push(project[key] !== "" ? project[key] : "");
                }
            }

            matrix.push(row);
        }
        return matrix;
    };

    const openInfo = (i) => {
        try {
            if (i < 0 || i >= avaliableP.length) return;
            const project = avaliableP[i];
            modalDispatch({
                type: OPEN_PROJECT,
                payload: project
            });
        } catch { };
    };

    const openEdit = (i) => {
        try {
            if (i < 0 || i >= avaliableP.length) return;
            const project = avaliableP[i];
            modalDispatch({
                type: EDIT_PROJECT,
                payload: project
            });
        }catch{ }
    }

    return (
        <div>
            <NavHistory>
                Gestión de contenido / Proyectos
            </NavHistory>
            <Title>
                {Icons.projects()}
                Lista de proyectos
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
                            "Fecha de inicio",
                            "Fecha límite",
                            "Fecha fin",
                            "Descripción"
                        ]}
                        percentages={[30, 10, 10, 10, 40]}
                        clickOnCell={openInfo}
                        handleEdit = { openEdit }
                    />
                    <Link title="Añadir un proyecto" to={PATH_CREATE_PROJECTS} className={styles.add}>
                        {Icons.cross()}
                    </Link>
                </>
            )}
        </div>
    );

}

export default Proyectos;
