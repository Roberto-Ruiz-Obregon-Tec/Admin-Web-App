import React, { useState, useEffect, useContext } from 'react';
import { FireError } from '../../../utils/alertHandler';
import { getComments } from '../../../client/comments';
import { UPDATE_COMMENT_STATUS } from "../store/modalReducer";
import LoaderPages from './Loader/LoaderPages';
import NavHistory from "../../../components/NavHistory/NavHistory";
import Title from "../../../components/Title/Title";
import { PATH_UPDATE_COMMENT_STATUS } from "../../../config/paths";
import Icons from "../../../icons/index";
import Table from "../../../components/Table/CommentTable";
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
            setavailableCourseComments(posts.cursos);
            setavailablePublicationComments(posts.publicaciones);
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

    const gotAClick = (id, status) => {
        try {
            modalDispatch({
                type: UPDATE_COMMENT_STATUS,
                payload: {id : id, status: status}
            });
        } catch { }
    }

    const getPublicationCommentMatrix = () => {
        if (availablePublicationComments.length === 0) return [];

        const publicationMatrix = []

        // El orden importa
        const possibleKeys = [
            "_id",
            "comment",
            "publication"

        ]
        for (let i = 0; i < availablePublicationComments.length; i++) {
            const row = {};
            const comment = availablePublicationComments[i];

            row["user"] = availablePublicationComments[i].comment.user.firstName + availablePublicationComments[i].comment.user.lastName
            row["comment"] = {"id": availablePublicationComments[i].comment._id, "comment": availablePublicationComments[i].comment.comment}
            row["publicacion"] = availablePublicationComments[i].publication.title

            let mydate = new Date(availablePublicationComments[i].updatedAt);
            row["fecha"] = mydate.toLocaleDateString("es")

            publicationMatrix.push(row);
        }

        return publicationMatrix;
    };

    const getCourseCommentMatrix = () => {
        if (availableCourseComments.length === 0) return [];

        const courseCommentMatrix = []

        // El orden importa
        const possibleKeys = [
            "_id",
            "course",
            "comment",

        ]


        for (let i = 0; i < availableCourseComments.length; i++) {
            const row = {};
            const comment = availableCourseComments[i];

            row["user"] = availableCourseComments[i].comment.user.firstName + " " + availableCourseComments[i].comment.user.lastName
            row["comment"] = {"id": availablePublicationComments[i].comment._id, "comment": availablePublicationComments[i].comment.comment}
            row["curso"] = availableCourseComments[i].course.name
            
            let mydate = new Date(availableCourseComments[i].updatedAt);
            row["fecha"] = mydate.toLocaleDateString("es")


            courseCommentMatrix.push(row);
        }

        return courseCommentMatrix;
    };



    return (
        <div>
            <NavHistory>
                Gestión de contenido / Comentarios
            </NavHistory>
            <Title>
                {Icons.courses()}
                Lista de comentarios pendientes
            </Title>
            {isLoading && (
                <LoaderPages />
            )}
            {!isLoading && (
                <>
                    <h2>
                        Cursos
                    </h2>
                    <Table
                        matrixData={getCourseCommentMatrix()}
                        arrayHeaders={[
                            "Usuario", // 20
                            "Comentario", // 22.5
                            "Curso",
                            "Fecha de publicación", // 10

                        ]}
                        percentages={[20, 35, 30, 15]}
                    />

                    <h2>
                        Publicaciones
                    </h2>

                    <Table
                        matrixData={getPublicationCommentMatrix()}
                        arrayHeaders={[
                            "Usuario", 
                            "Comentario", 
                            "Publicacion",
                            "Fecha de publicación", 

                        ]}
                        percentages={[20, 35, 30, 15]}
                        clickOnApprove={gotAClick}
                        clickOnReject={gotAClick}
                    />

                </>
            )}
        </div>
    );

}

export default Comment;
