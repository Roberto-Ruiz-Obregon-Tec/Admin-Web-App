import React, { useState, useEffect, useContext } from 'react';
import { FireError } from '../../../utils/alertHandler';
import { Link } from "react-router-dom";
import { getComments } from '../../../client/comments';
import LoaderPages from './Loader/LoaderPages';
import NavHistory from "../../../components/NavHistory/NavHistory";
import Title from "../../../components/Title/Title";
import { PATH_CREATE_COURSE } from "../../../config/paths";
import Icons from "../../../icons/index";
import Table from "../../../components/Table/Table";
import styles from "./Comments.module.css";
import { ContentContext } from "../Content";

function Comment() {

    const [availableCourseComments, setavailableCourseComments] = useState([]);
    const [availablePublicationComments, setavailablePublicationComments] = useState([]);
    const { modalDispatch, needsToDoRefresh, setNeedsToDoRefresh } = useContext(ContentContext);

    const [isLoading, setIsLoading] = useState(true);

    const fetchForData = async () => {
        try {
            setIsLoading(true);
            const posts = await getComments();
            setIsLoading(false);
            setavailableCourseComments(posts);
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

    const getPublicationMatrix = () => {
        if (availablePublicationComments.length === 0) return [];

        const publicationMatrix = []

        // El orden importa
        const possibleKeys = [
            "_id",
            "comment",
            "publication"

        ]

        const needsTransformation = new Set();
        needsTransformation.add("startDate");
        needsTransformation.add("endDate");

        for (let i = 0; i < availablePublicationComments.length; i++) {
            const row = [];
            const comment = availablePublicationComments[i];

            for (let j = 0; j < possibleKeys.length; j++) {
                const key = possibleKeys[j];
                if (needsTransformation.has(key)) {
                    row.push(comment[key] ? getFormatedDate(comment[key]) : "dd/mm/yyyy");
                } else {
                    row.push(comment[key] !== "" ? comment[key] : "");
                }
            }

            publicationMatrix.push(row);
        }
        console.log("HOLAAA")
        console.log(publicationMatrix)
        return publicationMatrix;
    };

    const getCourseMatrix = () => {
        if (availableCourseComments.length === 0) return [];

        const courseMatrix = []

        // El orden importa
        const possibleKeys = [
            "_id",
            "course",
            "comment",

        ]

        const needsTransformation = new Set();
        needsTransformation.add("startDate");
        needsTransformation.add("endDate");

        for (let i = 0; i < availableCourseComments.length; i++) {
            const row = [];
            const comment = availableCourseComments[i];

            for (let j = 0; j < possibleKeys.length; j++) {
                const key = possibleKeys[j];
                if (needsTransformation.has(key)) {
                    row.push(comment[key] ? getFormatedDate(comment[key]) : "dd/mm/yyyy");
                } else {
                    row.push(comment[key] !== "" ? comment[key] : "");
                }
            }

            courseMatrix.push(row);
        }
        console.log("HOLAAA")
        console.log(courseMatrix)
        return courseMatrix;
    };



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
                        matrixData={getCourseMatrix()}
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
                    />
                    <Link title="Añadir un curso" to={PATH_CREATE_COURSE} className={styles.add}>
                        {Icons.cross()}
                    </Link>
                </>
            )}
        </div>
    );

}

export default Comment;
