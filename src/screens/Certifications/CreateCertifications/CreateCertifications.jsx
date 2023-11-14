import React, { useState } from 'react';
import ReturnLink from "../../../components/Links/Return/Return";
import { FireError, FireSucess } from '../../../utils/alertHandler';
import { createACertification } from "../../../client/certifications";
import NavHistory from "../../../components/NavHistory/NavHistory";
import Card from "../../../components/ShadowCard/ShadowCard";
import { PATH_CERTIFICATIONS } from "../../../config/paths";

import InputText from "../../../components/Form/Input/Text/Text";
import InputTextArea from "../../../components/Form/Input/TextArea/TextArea";
import InputDate from "../../../components/Form/Input/Date/Date";
import Button from "../../../components/Form/Button/Button";

import { useNavigate } from 'react-router-dom';
import styles from "./CreateCertifications.module.css";

const CreateCertifications = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(new Date());

    /**
     * Handles the form submission for admin to create a Certification
     * 
     * @param {Event} e - The form submission event that triggered the function.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const data = {
                name: name,
                startDate: new Date(startDate),
                description: description
            };
            setIsLoading(true);
            const response = await createACertification(data);
            setIsLoading(false);

            if (response.status === 'success') {
                FireSucess('Has creado un proyecto exitosamente.');
                navigate(PATH_CERTIFICATIONS);
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
                Inicio / Acreditaciones Disponibles / Crear Acreditacion
            </NavHistory>
            <ReturnLink href="/certificaciones" />
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <Card>
                        <h1>
                            Crear Acreditacion
                        </h1>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <InputText
                                id="new-Certification-name"
                                text="Nombre"
                                value={name}
                                setValue={setName}
                            />
                            <InputDate
                                    currDate={startDate}
                                    setCurrDate={setStartDate}
                                    text="Fecha Adquisición"
                                    id="start-date-Certification"
                            />
                            <InputTextArea
                                id="new-Certification-description"
                                text="Descripción"
                                value={description}
                                setValue={setDescription}
                                className={styles.textarea}
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

export default CreateCertifications;
