import React, { useState, useEffect } from "react";
import { FireError } from '../../../utils/alertHandler';
import LoaderPages from './Loader/LoaderPages';
import { getESR } from '../../../client/esr';
import NavHistory from "../../../components/NavHistory/NavHistory";
import Title from "../../../components/Title/Title";
import Table from "../../../components/Table/Table";
import Icons from "../../../icons/index";

function CompaniesESR() {

    const [companies, setcompaniesESR] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const esr = await getESR();
                setIsLoading(false);
                setcompaniesESR(esr);
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
        if (companies.length === 0) return [];

        const matrix = []

        // El orden impora
        const possibleKeys = [
            "name",
            "phone",
            "postalCode",
            "description",
        ]

        const needsTransformation = new Set();
        needsTransformation.add("startDate");
        needsTransformation.add("endDate");
        needsTransformation.add("deadlineDate");

        for (let i = 0; i < companies.length; i++) {
            const row = [];
            const project = companies[i];

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

    return (<div>
        <NavHistory>
                Gestión de contenido / Certificación ESR 
            </NavHistory>
            <Title>
                {Icons.esr()}
                Lista de Empresas con certificación ESR
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
                            "Telefono",
                            "Codigo Postal",
                            "Descripción"
                        ]}
                        percentages={[30, 20, 10, 40]}
                    />
                </>
            )}
    </div>)

};

export default CompaniesESR