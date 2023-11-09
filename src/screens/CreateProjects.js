import React, { useState } from 'react';
import ReturnLink from "../components/ReturnLink";
import { FireError, FireSucess } from '../utils/alertHandler';
import DateSelector from "../components/DateSelector";
import UploadImage from "../components/UploadImage";

import '../styles/verCursos.css';
import '../styles/wrappers/wrap.css';
import '../styles/auth.css';


const CreateProjects = () => {

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

        if (file === null) {
            FireError('Debes de subir una imagen');
            return;
        }

        // if (passwordConfirm !== password) {
        //     FireError('Las contraseñas no coinciden.');
        //     return;
        // }
        try {
            // const data = {
            //     firstName: fname,
            //     lastName: lastname,
            //     age: age,
            //     gender: gender,
            //     email: email,
            //     postalCode: cp,
            //     password: password
            // };
            // const response = await postSignup(data);
            // if (response.status === 'success') {
            //     FireSucess('Has creado un admin exitosamente.');
            // }
        } catch (error) {
            if ([400, 401].includes(error.response.status)) FireError(error.response.data.message);
            else FireError('Ocurrió un error. Por favor intenta de nuevo.');
        }
    };

    return (
        <div className='container_page_wrapper'>
            <div className='header-container'>
                <h4>Inicio / Proyectos Disponibles / Crear Proyecto</h4>
            </div>
            <ReturnLink href="/consultprojects" />

            <div className='auth-container' style={{
                width: "32rem"
            }}>
                <h1>
                    Crear proyecto
                </h1>
                <form onSubmit={handleSubmit} style={{
                    gap: "30px"
                }}>
                    <div>
                        <label htmlFor='name'>Nombre</label>
                        <input
                            type='text'
                            id='name'
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        flexDirection: "row",
                        gap: "10px"
                    }}>
                        <DateSelector
                            currDate={startDate}
                            setCurrDate={setStartDate}

                            text="Fecha inicio"
                            id="start-date-project"
                        />
                        <DateSelector
                            currDate={endDate}
                            setCurrDate={setEndDate}

                            text="Fecha fin"
                            id="end-date-project"
                        />
                        <DateSelector
                            currDate={limitDate}
                            setCurrDate={setLimitDate}

                            text="Fecha límite"
                            id="limit-date-project"
                        />
                    </div>
                    <div>
                        <label htmlFor='postal-code'>Código postal</label>
                        <input
                            type='text'
                            id='postal-code'
                            required
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='description'>Descripción</label>
                        <textarea
                            style={{
                                height: "100px"
                            }}
                            id='description'
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <UploadImage
                            id="image-project-new"
                            setFile={(file) => {
                                setFile(file);
                            }}
                            file={file}
                        />
                        <button type='submit'>
                            Crear proyecto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProjects;
