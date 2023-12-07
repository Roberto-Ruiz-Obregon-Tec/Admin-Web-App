import React, { useState, useEffect, useContext } from 'react';
import { FireError } from '../../../utils/alertHandler';
import { ContentContext } from "../Content";
import { Link } from "react-router-dom";
import { getPublications } from '../../../client/publications';
import LoaderPages from './Loader/LoaderPages';
import NavHistory from "../../../components/NavHistory/NavHistory";
import Title from "../../../components/Title/Title";
import { PATH_CREATE_POSTS } from "../../../config/paths";
import Icons from "../../../icons/index";
import Table from "../../../components/Table/Table";
import styles from "./Posts.module.css";
import { OPEN_POST, EDIT_POST, DELETE_POST } from "../store/modalReducer";

function Posts() {
    const { modalDispatch, needsToDoRefresh, setNeedsToDoRefresh } = useContext(ContentContext);
    const [avaliablePosts, setavailablePosts] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const fetchForData = async () => {
        try {
            setIsLoading(true);
            const posts = await getPublications();
            setIsLoading(false);
            setavailablePosts(posts);
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
    // eslint-disable-next-line
    }, [needsToDoRefresh]);

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

    const openInfo = (i) => {
        try {
            if (i < 0 || i >= avaliablePosts.length) return;
            const post = avaliablePosts[i];  
            console.log(post)          
            modalDispatch({
                type: OPEN_POST,
                payload: post
            });
        } catch { };
    };

    const openEdit = (i) => {
        try {
            if (i < 0 || i >= avaliablePosts.length) return;
            const post = avaliablePosts[i];
            modalDispatch({
                type: EDIT_POST,
                payload: post
            });
        } catch { }
    }

    const handleDelete = (i) => {
        const post = avaliablePosts[i];
        modalDispatch({
          type: DELETE_POST,
          payload: post,
        });
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
                        handleDelete={handleDelete}
                        matrixData={getMatrix()}
                        arrayHeaders={[
                            "Título",
                            "Descripción",
                            "Likes",
                            "Fecha de creación"
                        ]}
                        percentages={[25, 60, 10, 15]}
                        clickOnCell={openInfo}
                        handleEdit={openEdit}
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
