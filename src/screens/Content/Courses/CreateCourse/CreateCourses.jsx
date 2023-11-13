import React, { useState } from 'react';
import ReturnLink from "../../../../components/Links/Return/Return";
import { FireError, FireSucess } from '../../../../utils/alertHandler';
import { createPublications } from "../../../../client/publications";
import NavHistory from "../../../../components/NavHistory/NavHistory";
import Card from "../../../../components/ShadowCard/ShadowCard";
import { PATH_COURSES } from "../../../../config/paths";

import InputText from "../../../../components/Form/Input/Text/Text";
import InputTextArea from "../../../../components/Form/Input/TextArea/TextArea";
import InputImage from "../../../../components/Form/Input/Image/Image";
import Button from "../../../../components/Form/Button/Button";

import { useNavigate } from 'react-router-dom';
import styles from "./CreateCourses.module.css";

const CreateCourses = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [file, setFile] = useState(null);

    /**
     * Handles the form submission for admin to create a post
     * 
     * @param {Event} e - The form submission event that triggered the function.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            title.trim() === "" ||
            description.trim() === ""
        ) {
            FireError('No puedes dejar los campos vacíos.');
            return;
        }
        if (file === null) {
            FireError('Debes de subir una imagen');
            return;
        }
        try {
            const data = {
                title,
                description,
                image: "https://ejemplo.com",
            };
            setIsLoading(true);
            const response = await createPublications(data);
            setIsLoading(false);

            if (response.status === 'success') {
                FireSucess('Has creado una publicación exitosamente.');
                navigate(PATH_COURSES);
            } else {
                FireError('Ha habido un error.');
            }
        } catch (error) {
            setIsLoading(false);
            if ([400, 401].includes(error.response.status)) FireError(error.response.data.message);
            else FireError('Ocurrió un error. Por favor intenta de nuevo.');
        }
    };

    // name
    // description
    // speaker
    // startDate
    // endDate
    // schedule
    // modality
    // postalCode
    // location
    // status
    // cost
    // courseImage
    // capacity
    // rating
    // ratingCount
    // meetingCode
    // accessCode

    return (
        <div>
            <NavHistory>
                Gestión de contenido / Cursos / Crear Curso
            </NavHistory>
            <ReturnLink href={PATH_COURSES} />
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <Card>
                        <h1>
                            Crear curso
                        </h1>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <InputText
                                id="new-post-name"
                                text="Título"
                                value={title}
                                setValue={setTitle}
                            />
                            <InputTextArea
                                id="new-post-description"
                                text="Descripción"
                                value={description}
                                setValue={setDescription}
                                className={styles.textarea}
                            />
                            <InputImage
                                id="image-post-new"
                                setFile={(file) => {
                                    setFile(file);
                                }}
                                file={file}
                            />
                            <Button isAnimationLoading isLoading={isLoading} type='submit'>
                                Crear curso
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CreateCourses;
