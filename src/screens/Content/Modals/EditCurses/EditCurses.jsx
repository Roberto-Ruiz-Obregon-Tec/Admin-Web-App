import React, { useState , useEffect} from 'react';
import { FireError, FireSucess } from '../../../../utils/alertHandler';
import { useNavigate } from 'react-router-dom';

import PopUpModal from "../PopUp/PopUp";
import { useContext } from "react";
import { CLEAR_MODALS, KEYS_MODAL } from "../../store/modalReducer";
import { ContentContext } from "../../Content";

import OurInputText from "./Input/Text";
import DropDown from "../../../../components/Form/Input/DropDown/DropDown";
import Icons from "../../../../icons/index";
import Image from '../../../../components/Image/Image';

import styles from "./EditCurses.module.css";
import InputText from "../../../../components/Form/Input/Text/Text";
import InputTextArea from "../../../../components/Form/Input/TextArea/TextArea";
import InputImage from "../../../../components/Form/Input/Image/Image";
import InputDate from "../../../../components/Form/Input/Date/Date";
import Button from "../../../../components/Form/Button/Button";
import { PATH_COURSES } from '../../../../config/paths'
import { editCourse } from '../../../../client/course';

export default function PopUpCurses() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [_id, setId] = useState(0)
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

    const {
        modalState,
        modalDispatch
    } = useContext(ContentContext);

    const isOpen = () => {
        return modalState.modalOpened === KEYS_MODAL.COURSE_EDIT;
    }

    const getFormatedDate = (date) => {
        const dateObject = new Date(date);

        const dataMonth = dateObject.getMonth() + 1
        const month = dataMonth <= 9 ? 
            "0" + dataMonth.toString() :
            dataMonth
            
        const dataDay = dateObject.getDate() + 1        
        const day = dataDay <= 9 ? 
            "0" + dataDay.toString() :
            dataDay
        
        return dateObject.getFullYear() + "-" + month + "-" + day;
    };

    const setIsOpen = () => {
        modalDispatch({
            type: CLEAR_MODALS
        });
    }
    
    useEffect( () => {       
        const stateFromModal = {
            "_id": modalState.documentJSON["_id"] ? modalState.documentJSON["_id"] : "-",
            "name": modalState.documentJSON["name"] ? modalState.documentJSON["name"] : "-----",
            "description": modalState.documentJSON["description"] ? modalState.documentJSON["description"] : "-----",
            "speaker" : modalState.documentJSON["speaker"] ? modalState.documentJSON["speaker"] : "-----",
            "startDate": modalState.documentJSON["startDate"] ? modalState.documentJSON["startDate"] : "dd/mm/yyyy",
            "endDate": modalState.documentJSON["endDate"] ? modalState.documentJSON["endDate"] : "dd/mm/yyyy",
            "cost" : modalState.documentJSON["cost"] ? modalState.documentJSON["cost"] : "-----",
            "capacity": modalState.documentJSON["capacity"] ? modalState.documentJSON["capacity"] : "-----", 
            "location" : modalState.documentJSON["location"] ? modalState.documentJSON["location"] : "-----",
            "postalCode" :modalState.documentJSON["postalCode"] ? modalState.documentJSON["postalCode"] : "-----",
            "meetingCode" : modalState.documentJSON["meetingCode"] ? modalState.documentJSON["meetingCode"] : "-----",
            "modality" : modalState.documentJSON["modality"] ? modalState.documentJSON["modality"] : "-----",
            "status" : modalState.documentJSON["status"] ? modalState.documentJSON["status"] : "-----",                                    
            "courseImage" : modalState.documentJSON["courseImage"] ? modalState.documentJSON["courseImage"] : "-----", 
            "createdAt": modalState.documentJSON["createdAt"] ? modalState.documentJSON["createdAt"] : "dd/mm/yyyy",
            "updatedAt": modalState.documentJSON["updatedAt"] ? modalState.documentJSON["updatedAt"] : "dd/mm/yyyy",            
        };
                                                        
            
        setId(stateFromModal._id)
        setName(stateFromModal.name);
        setDescription(stateFromModal.description);
        setSpeaker(stateFromModal.speaker);        
        setStartDate(stateFromModal.startDate);
        setEndDate(stateFromModal.endDate);
        setCost(stateFromModal.cost);
        setCapacity(stateFromModal.capacity);
        setLocation(stateFromModal.location);
        setPostalCode(stateFromModal.postalCode);
        setMeetingCode(stateFromModal.meetingCode);
        setModality(stateFromModal.modality);
        setStatus(stateFromModal.status);        
        setCourseImage(stateFromModal.courseImage);
        
      }, [modalState.documentJSON])

    const clearState = () => {
        setIsOpen();
    };

    const validateDates = () => {
        return new Date(startDate).getTime() <= new Date(endDate).getTime();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            name.trim() === "" ||
            description.trim() === "" ||
            speaker.trim() === "" ||
            modality.trim() === "" ||
            postalCode.toString().trim() === "" ||
            location.trim() === "" ||
            status.trim() === "" ||
            cost.toString().trim() === "" ||
            capacity.toString().trim() === "" ||
            meetingCode.trim() === ""
        ) {
            FireError('No puedes dejar los campos vacíos.');
            return;
        }
        if (!validateDates()) {
            FireError('Las fecha de inicio debe de ser antes que la de fin.');
            return;
        }
        if (postalCode.toString().length !== 5) {
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
                _id,
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
            const response = await editCourse(data);
            setIsLoading(false);

            if (response.status === 'success') {
                FireSucess('Has editado un curso exitosamente.');
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
        <PopUpModal
            isOpen={isOpen()}
            setIsOpen={clearState}
            classNameCard={styles.card}
        >            
                <h1>
                    Editar curso
                </h1>                
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.form__item}>                        
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
                    <div className={styles.form__item}>
                        <InputText
                            id="new-course-name"
                            text="Nombre"
                            value={name}
                            setValue={setName}
                        />
                        <div className={`${styles.split} ${styles.dates}`}>
                            <InputDate
                                currDate={getFormatedDate(startDate)}
                                setCurrDate={setStartDate}
                                text="Fecha inicio"
                                id="start-date-new-course"
                            />
                            <InputDate
                                currDate={getFormatedDate(endDate)}
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
                    <div className={styles.form__item}>
                        <div className={styles.img}>
                            <Image
                                alt={name}
                                src={modalState.documentJSON["programImage"]}
                            />
                        </div> 

                        <InputImage
                            id="image-post-new"
                            setFile={(file) => {
                                setCourseImage(file);
                            }}
                            file={courseImage}
                        />
                        
                        <Button isAnimationLoading isLoading={isLoading} type='submit'>
                            Editar curso
                        </Button>                        
                    </div>
                </form>

        </PopUpModal>
    )
}