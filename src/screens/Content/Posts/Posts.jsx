import React, { useState, useEffect } from 'react';
import { FireError } from '../../../utils/alertHandler';
import { Link } from "react-router-dom";
import { getPublications } from '../../../client/publications';
import LoaderPages from './Loader/LoaderPages';
import NavHistory from "../../../components/NavHistory/NavHistory";
import Title from "../../../components/Title/Title";
import { PATH_CREATE_POSTS } from "../../../config/paths";
import Icons from "../../../icons/index";
import Table from "../../../components/Table/Table";
import styles from "./Posts.module.css";

function Posts() {

    const [avaliablePosts, setavailablePosts] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const posts = await getPublications();
                setIsLoading(false);
                setavailablePosts(posts);
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
        if (avaliablePosts.length === 0) return [];

        const matrix = []

        // El orden importa
        const possibleKeys = [
            "title",
            "description",
            "likes",
            "createdAt",
        ]

        const needsTransformation = new Set();
        needsTransformation.add("createdAt");

        for (let i = 0; i < avaliablePosts.length; i++) {
            const row = [];
            const post = avaliablePosts[i];

            for (let j = 0; j < possibleKeys.length; j++) {
                const key = possibleKeys[j];
                if (needsTransformation.has(key)) {
                    row.push(post[key] ? getFormatedDate(post[key]) : "dd/mm/yyyy");
                } else {
                    row.push(post[key] !== "" ? post[key] : "");
                }
            }

            matrix.push(row);
        }
        return matrix;
    };

    return (
        <div>
            <NavHistory>
                Gestión de contenido / Publicaciones
            </NavHistory>
            <Title>
                {Icons.posts()}
                Lista de publicaciones
            </Title>
            {isLoading && (
                <LoaderPages />
            )}
            {!isLoading && (
                <>
                    <Table
                        matrixData={getMatrix()}
                        arrayHeaders={[
                            "Título",
                            "Descripción",
                            "Likes",
                            "Fecha de creación"
                        ]}
                        percentages={[25, 60, 10, 15]}
                    />
                    <Link title="Añadir una publicación" to={PATH_CREATE_POSTS} className={styles.add}>
                        {Icons.cross()}
                    </Link>
                </>
            )}
        </div>
    );

}

export default Posts;
