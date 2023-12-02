import React, { useState } from "react";
import ReturnLink from "../../../../components/Links/Return/Return";
import { FireError, FireSucess } from '../../../../utils/alertHandler';
import { createScholarships } from "../../../../client/scholarships";
import NavHistory from "../../../../components/NavHistory/NavHistory";
import Card from "../../../../components/ShadowCard/ShadowCard";
import { PATH_SCHOLARSHIP } from "../../../../config/paths";

import InputText from "../../../../components/Form/Input/Text/Text";
import InputTextArea from "../../../../components/Form/Input/TextArea/TextArea";
import InputImage from "../../../../components/Form/Input/Image/Image";
import InputDate from "../../../../components/Form/Input/Date/Date";
import Button from "../../../../components/Form/Button/Button";

import { useNavigate } from 'react-router-dom';
import styles from './CreateScholarship.module.css';

const CreateScholarships = () => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [name, setName] = useState('');
    const [organization, setOrganization] = useState('');
    const [location, setLocation] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [file, setFile] = useState(null);

    const validateDates = () => {
        const c1 = new Date(startDate).getTime() <= new Date(endDate).getTime();
        return c1;
    }

    /**
     * Handles the form submission for admin to create a scholarships
     * 
     * @param {Event} e - The form submission event that triggered the function.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateDates()) {
            FireError('Las fecha de inicio debe de ser antes que la de fin.');
            return;
        }

        if (
            name.trim() === "" ||
            organization.trim() === "" ||
            location.trim() === "" ||
            phone.trim() === "" ||
            email.trim() === "" ||
            description.trim() === ""
        ) {
            FireError('No puedes dejar los campos vacíos.');
            return;
        }
    
        if (phone.length !== 10) {
            FireError('El número de teléfono debe de ser de 10 números.');
            return;
        }
    
        if (isNaN(phone)) {
            FireError('El teléfono debe de ser un número.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            FireError('Por favor, ingresa un correo electrónico válido.');
            return;
        }
    
        if (file === null) {
            FireError('Debes de subir una imagen');
            return;
        }
    
        try {
            const data = {
                name,
                organization,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                image: "https://imagen",
                location,
                email,
                phone,
                description
            };
            setIsLoading(true);
            const response = await createScholarships(data);
            setIsLoading(false);
    
            if (response.status === 'success') {
                FireSucess('Has dado de alta una beca exitosamente.');
                navigate(PATH_SCHOLARSHIP);
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
                Gestión de contenido / Becas / Crear Beca
            </NavHistory>
            <ReturnLink href={PATH_SCHOLARSHIP} />
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <Card>
                        <h1>
                            Crea Beca
                        </h1>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <InputText
                                id="new-scholarship-name"
                                text="Nombre"
                                value={name}
                                setValue={setName}
                            />
                            <InputText
                                id="new-scholariship-organization"
                                text="Organización"
                                value={organization}
                                setValue={setOrganization}
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
                            </div>
                            <InputText
                                id="new-scholariship-phone"
                                text="Teléfono"
                                value={phone}
                                setValue={setPhone}
                            />
                            <InputText
                                id="new-scholariship-localization"
                                text="Ubicación"
                                value={location}
                                setValue={setLocation}
                            />
                            <InputText
                                id="new-scholariship-email"
                                text="Correo electrónico"
                                value={email}
                                setValue={setEmail}
                            />
                            <InputTextArea
                                id="new-scholarship-description"
                                text="Descripción"
                                value={description}
                                setValue={setDescription}
                                className={styles.textarea}
                            />
                            <InputImage
                                id="image-scholarship-new"
                                setFile={(file) => {
                                    setFile(file);
                                }}
                                file={file}
                            />
                            <Button isAnimationLoading isLoading={isLoading} type='submit'>
                                Crear Beca
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );

    
}

export default CreateScholarships;



