import React, { useState, useEffect } from 'react';
import { FireError } from '../../utils/alertHandler';
import { getProgram } from '../../client/availableProj'
import LoaderPages from './Loader/LoaderPages';
import NavHistory from "../../components/NavHistory/NavHistory";
import Title from "../../components/Title/Title";
import Icons from "../../icons/index";
import Table from "../../components/Table/Table";

function Proyectos() {

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
            "endDate",
            "deadlineDate",
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
                    row.push(project[key] ? project[key] : "");
                }
            }

            matrix.push(row);
        }
        return matrix;
    };

    return (
        <div>
            <NavHistory>
                Inicio / Proyectos
            </NavHistory>
            <Title>
                {Icons.projects()}
                Lista proyectos
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
                            "Fecha fin",
                            "Fecha límite",
                            "Descripción"
                        ]}
                    />
                </>
            )}
        </div>
    );

}

export default Proyectos;
