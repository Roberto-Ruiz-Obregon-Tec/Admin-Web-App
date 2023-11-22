import React, { useState, useEffect, useContext } from 'react';
import { FireError } from '../../../utils/alertHandler';
import { Link } from "react-router-dom";
import { getCourses } from '../../../client/course';
import { EDIT_COURSE } from "../store/modalReducer";
import LoaderPages from './Loader/LoaderPages';
import NavHistory from "../../../components/NavHistory/NavHistory";
import Title from "../../../components/Title/Title";
import { PATH_CREATE_COURSE } from "../../../config/paths";
import Icons from "../../../icons/index";
import Table from "../../../components/Table/Table";
import styles from "./Courses.module.css";
import { ContentContext } from "../Content";

function Courses() {

    const [avaliableCourses, setavailableCourses] = useState([]);
    const { modalDispatch, needsToDoRefresh, setNeedsToDoRefresh } = useContext(ContentContext);

    const [isLoading, setIsLoading] = useState(true);

    const fetchForData = async () => {
        try {
            setIsLoading(true);
            const posts = await getCourses();
            setIsLoading(false);
            setavailableCourses(posts);
        } catch (error) {
            setIsLoading(false);
            FireError(error.response.data.message);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line
        fetchForData();
    }, []);

    useEffect(() => {
        if (needsToDoRefresh) {
            fetchForData();
            setNeedsToDoRefresh(false);
        };
    }, [needsToDoRefresh]);

    const getFormatedDate = (date) => {
        const dateObject = new Date(date);

        return dateObject.getDate() + "/" + (dateObject.getMonth() + 1) + "/" + dateObject.getFullYear();
    };

    const getMatrix = () => {
        if (avaliableCourses.length === 0) return [];

        const matrix = []

        // El orden importa
        const possibleKeys = [
            "name",
            "description",
            "speaker",
            "startDate",
            "endDate",
            "modality",
            "status",
            "rating",
            "cost"
        ]

        const needsTransformation = new Set();
        needsTransformation.add("startDate");
        needsTransformation.add("endDate");

        for (let i = 0; i < avaliableCourses.length; i++) {
            const row = [];
            const course = avaliableCourses[i];

            for (let j = 0; j < possibleKeys.length; j++) {
                const key = possibleKeys[j];
                if (needsTransformation.has(key)) {
                    row.push(course[key] ? getFormatedDate(course[key]) : "dd/mm/yyyy");
                } else {
                    row.push(course[key] !== "" ? course[key] : "");
                }
            }

            matrix.push(row);
        }
        return matrix;
    };

    const openEdit = (i) => {
        try {
            if (i < 0 || i >= avaliableCourses.length) return;
            const course = avaliableCourses[i];
            modalDispatch({
                type: EDIT_COURSE,
                payload: course
            });
        } catch { }
    }

    return (
        <div>
            <NavHistory>
                Gestión de contenido / Cursos
            </NavHistory>
            <Title>
                {Icons.courses()}
                Lista de cursos
            </Title>
            {isLoading && (
                <LoaderPages />
            )}
            {!isLoading && (
                <>
                    <Table
                        matrixData={getMatrix()}
                        arrayHeaders={[
                            "Nombre", // 20
                            "Descripción", // 22.5
                            "Ponente", // 10
                            "Fecha de inicio", // 10
                            "Fecha fin", // 10
                            "Modalidad", // 7.5
                            "Estatus", // 7.5
                            "Valuación", // 7.5
                            "Costo" // 5
                        ]}
                        percentages={[16, 18, 10, 10, 10, 7.5, 7.5, 8.5, 7]}
                        handleEdit={openEdit}
                    />
                    <Link title="Añadir un curso" to={PATH_CREATE_COURSE} className={styles.add}>
                        {Icons.cross()}
                    </Link>
                </>
            )}
        </div>
    );

}

export default Courses;
