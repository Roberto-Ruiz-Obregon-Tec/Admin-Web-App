import React, { useState } from 'react';
import ReturnLink from "../../../../components/Links/Return/Return";
import { FireError, FireSucess } from '../../../../utils/alertHandler';
import { createAProject } from "../../../../client/availableProj";
import NavHistory from "../../../../components/NavHistory/NavHistory";
import Card from "../../../../components/ShadowCard/ShadowCard";
import { PATH_PROJECTS } from "../../../../config/paths";

import InputText from "../../../../components/Form/Input/Text/Text";
import InputTextArea from "../../../../components/Form/Input/TextArea/TextArea";
import InputImage from "../../../../components/Form/Input/Image/Image";
import InputDate from "../../../../components/Form/Input/Date/Date";
import Button from "../../../../components/Form/Button/Button";

import { useNavigate } from 'react-router-dom';
import styles from "./CreateProjects.module.css";

const CreateProjects = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [name, setName] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [description, setDescription] = useState('');

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [limitDate, setLimitDate] = useState(new Date());

    const [file, setFile] = useState(null);

    const validateDates = () => {
        const c1 = new Date(startDate).getTime() <= new Date(endDate).getTime();
        const c2 = new Date(limitDate).getTime() <= new Date(endDate).getTime();
        const c3 = new Date(startDate).getTime() <= new Date(limitDate).getTime();

        return c1 && c2 && c3;
    }

    /**
     * Handles the form submission for admin to create a project
     * 
     * @param {Event} e - The form submission event that triggered the function.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateDates()) {
            FireError('Las fecha de inicio debe de ser antes que la de inicio. Y el límite debe de ser antes que termine.');
            return;
        }

        if (
            name.trim() === "" ||
            postalCode.trim() === "" ||
            description.trim() === ""
        ) {
            FireError('No puedes dejar los campos vacíos.');
            return;
        }

        if (postalCode.length !== 5) {
            FireError('El código postal debe de ser de 5 números.');
            return;
        }
        if (isNaN(postalCode)) {
            FireError('El código postal debe de ser un número.');
            return;
        }

        if (file === null) {
            FireError('Debes de subir una imagen');
            return;
        }
        try {
            const data = {
                name: name,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                deadlineDate: new Date(limitDate),
                programImage: "https://ejemplo.com",
                postalCode: postalCode,
                description: description
            };
            setIsLoading(true);
            const response = await createAProject(data);
            setIsLoading(false);

            if (response.status === 'success') {
                FireSucess('Has creado un proyecto exitosamente.');
                navigate(PATH_PROJECTS);
            } else {
                FireError('Ha habido un error.');
            }
        } catch (error) {
            setIsLoading(false);
            if ([400, 401].includes(error.response.status)) FireError(error.response.data.message);
            else FireError('Ocurrió un error. Por favor intenta de nuevo.');
        }
    };

    return (
        <div>
            <NavHistory>
                Gestión de contenido / Proyectos / Crear Proyecto
            </NavHistory>
            <ReturnLink href={PATH_PROJECTS} />
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <Card>
                        <h1>
                            Crear proyecto
                        </h1>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <InputText
                                id="new-project-name"
                                text="Nombre"
                                value={name}
                                setValue={setName}
                            />
                            <div className={styles.dates}>
                                <InputDate
                                    currDate={startDate}
                                    setCurrDate={setStartDate}
                                    text="Fecha inicio"
                                    id="start-date-project"
                                />
                                <InputDate
                                    currDate={endDate}
                                    setCurrDate={setEndDate}
                                    text="Fecha fin"
                                    id="end-date-project"
                                />
                                <InputDate
                                    currDate={limitDate}
                                    setCurrDate={setLimitDate}
                                    text="Fecha límite"
                                    id="limit-date-project"
                                />
                            </div>
                            <InputText
                                id="new-project-postal-code"
                                text="Código postal"
                                value={postalCode}
                                setValue={setPostalCode}
                            />
                            <InputTextArea
                                id="new-project-description"
                                text="Descripción"
                                value={description}
                                setValue={setDescription}
                                className={styles.textarea}
                            />
                            <InputImage
                                id="image-project-new"
                                setFile={(file) => {
                                    setFile(file);
                                }}
                                file={file}
                            />
                            <Button isAnimationLoading isLoading={isLoading} type='submit'>
                                Crear proyecto
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CreateProjects;
