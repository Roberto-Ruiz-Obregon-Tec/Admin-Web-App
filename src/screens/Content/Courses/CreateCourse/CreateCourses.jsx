import React, { useState } from 'react';
import ReturnLink from "../../../../components/Links/Return/Return";
import { FireError, FireSucess } from '../../../../utils/alertHandler';
import { postCourse } from "../../../../client/course";
import NavHistory from "../../../../components/NavHistory/NavHistory";
import Card from "../../../../components/ShadowCard/ShadowCard";
import { PATH_COURSES } from "../../../../config/paths";
import DropDown from "../../../../components/Form/Input/DropDown/DropDown";

import InputText from "../../../../components/Form/Input/Text/Text";
import InputDate from "../../../../components/Form/Input/Date/Date";
import OurInputText from "./Input/Text";
import InputTextArea from "../../../../components/Form/Input/TextArea/TextArea";
import Icons from "../../../../icons/index";
import InputImage from "../../../../components/Form/Input/Image/Image";
import Button from "../../../../components/Form/Button/Button";

import { useNavigate } from 'react-router-dom';
import styles from "./CreateCourses.module.css";

const CreateCourses = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [speaker, setSpeaker] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [modality, setModality] = useState("");
    const [isOpenModality, setIsOpenModality] = useState(false);

    const [postalCode, setPostalCode] = useState("");
    const [location, setLocation] = useState("");

    const [status, setStatus] = useState("");
    const [isOpenStatus, setIsOpenStatus] = useState(false);

    const [cost, setCost] = useState("");
    const [capacity, setCapacity] = useState("");
    const [meetingCode, setMeetingCode] = useState("");

    const [courseImage, setCourseImage] = useState(null);

    const validateDates = () => {
        return new Date(startDate).getTime() <= new Date(endDate).getTime();
    }

    /**
     * Handles the form submission for admin to create a course
     * 
     * @param {Event} e - The form submission event that triggered the function.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            name.trim() === "" ||
            description.trim() === "" ||
            speaker.trim() === "" ||
            modality.trim() === "" ||
            postalCode.trim() === "" ||
            location.trim() === "" ||
            status.trim() === "" ||
            cost.trim() === "" ||
            capacity.trim() === "" ||
            meetingCode.trim() === ""
        ) {
            FireError('No puedes dejar los campos vacíos.');
            return;
        }
        if (!validateDates()) {
            FireError('Las fecha de inicio debe de ser antes que la de fin.');
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
        if (isNaN(cost)) {
            FireError('El costo debe de ser un número.');
            return;
        }
        if (isNaN(capacity)) {
            FireError('La capacidad debe de ser un número.');
            return;
        }
        if (courseImage === null) {
            FireError('Debes de subir una imagen');
            return;
        }
        try {
            const data = {
                name,
                description,
                speaker,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                schedule: new Date(startDate),
                modality,
                postalCode,
                location,
                status,
                cost,
                courseImage: "https://ejemplo.com",
                capacity,
                meetingCode
            };
            setIsLoading(true);
            const response = await postCourse(data);
            setIsLoading(false);

            if (response.status === 'success') {
                FireSucess('Has creado un curso exitosamente.');
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
                            <div className={styles.top}>
                                <div className={styles.left}>
                                    <OurInputText
                                        id="new-course-address"
                                        text="Localización"
                                        value={location}
                                        setValue={setLocation}
                                    >
                                        {Icons.map()}
                                    </OurInputText>
                                    <OurInputText
                                        id="new-course-postal-code"
                                        text="Código postal"
                                        value={postalCode}
                                        setValue={setPostalCode}
                                    >
                                        {Icons.postal()}
                                    </OurInputText>
                                    <OurInputText
                                        id="new-course-access-code"
                                        text="Código de acceso"
                                        value={meetingCode}
                                        setValue={setMeetingCode}
                                    >
                                        {Icons.link()}
                                    </OurInputText>
                                    <div className={styles.drops}>
                                        <DropDown
                                            text={modality === "" ? "Modalidad" : modality}
                                            attrDivChild="child-modality-new-course"
                                            isOpen={isOpenModality}
                                            id="dropdown-new-course-modality"
                                            setIsOpen={setIsOpenModality}
                                        >
                                            {["Remoto", "Presencial"].map((possibility, index) => {
                                                return (
                                                    <div onClick={() => {
                                                        setModality(possibility);
                                                        setIsOpenModality(false);
                                                    }} attr-css="element" key={index}>
                                                        {possibility}
                                                    </div>
                                                )
                                            })}
                                        </DropDown>
                                        <DropDown
                                            text={status === "" ? "Estatus" : status}
                                            isOpen={isOpenStatus}
                                            id="dropdown-new-course-status"
                                            setIsOpen={setIsOpenStatus}
                                        >
                                            {["Gratuito", "De pago"].map((possibility, index) => {
                                                return (
                                                    <div onClick={() => {
                                                        setStatus(possibility);
                                                        setIsOpenStatus(false);
                                                    }} attr-css="element" key={index}>
                                                        {possibility}
                                                    </div>
                                                )
                                            })}
                                        </DropDown>
                                    </div>
                                </div>
                                <div className={styles.right}>
                                    <InputText
                                        id="new-course-name"
                                        text="Nombre"
                                        value={name}
                                        setValue={setName}
                                    />
                                    <div className={`${styles.split} ${styles.dates}`}>
                                        <InputDate
                                            currDate={startDate}
                                            setCurrDate={setStartDate}
                                            text="Fecha inicio"
                                            id="start-date-new-course"
                                        />
                                        <InputDate
                                            currDate={endDate}
                                            setCurrDate={setEndDate}
                                            text="Fecha fin"
                                            id="limit-date-new-course"
                                        />
                                    </div>
                                    <div className={styles.split}>
                                        <InputText
                                            id="new-course-price"
                                            text="Costo"
                                            value={cost}
                                            className={styles.input_in_split}
                                            setValue={setCost}
                                        />
                                        <InputText
                                            id="new-course-capacity"
                                            text="Capacidad"
                                            value={capacity}
                                            className={styles.input_in_split}
                                            setValue={setCapacity}
                                        />
                                    </div>
                                    <InputTextArea
                                        id="new-course-description"
                                        text="Descripción"
                                        value={description}
                                        setValue={setDescription}
                                        className={styles.textarea}
                                    />
                                    <InputText
                                        id="new-course-speaker-name"
                                        text="Nombre del ponente"
                                        value={speaker}
                                        setValue={setSpeaker}
                                    />
                                </div>
                            </div>
                            <div className={styles.bottom}>
                                <InputImage
                                    id="image-post-new"
                                    setFile={(file) => {
                                        setCourseImage(file);
                                    }}
                                    file={courseImage}
                                />
                                <Button isAnimationLoading isLoading={isLoading} type='submit'>
                                    Crear curso
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CreateCourses;
