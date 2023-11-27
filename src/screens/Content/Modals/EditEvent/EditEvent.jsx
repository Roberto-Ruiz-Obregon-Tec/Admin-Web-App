import React, { useState, useEffect } from 'react';
import { FireError, FireSucess } from '../../../../utils/alertHandler';
import { useNavigate } from 'react-router-dom';

import PopUpModal from "../PopUp/PopUp";
import { useContext } from "react";
import { CLEAR_MODALS, KEYS_MODAL } from "../../store/modalReducer";
import { ContentContext } from "../../Content";

import styles from "./EditEvent.module.css";
import InputText from "../../../../components/Form/Input/Text/Text";
import InputTextArea from "../../../../components/Form/Input/TextArea/TextArea";
import InputDate from "../../../../components/Form/Input/Date/Date";
import InputImage from "../../../../components/Form/Input/Image/Image";
import Button from "../../../../components/Form/Button/Button";
import Image from '../../../../components/Image/Image';
import { PATH_CERTIFICATIONS } from '../../../../config/paths'
import { editEvents } from '../../../../client/events';

export default function PopUpCertifications() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [_id, setId] = useState(0)
    const [eventName, setEventName] = useState('');
	const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [imgUrl, setImgUrl] = useState('');  
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');  

    const {
        modalState,
        modalDispatch,
        setNeedsToDoRefresh
    } = useContext(ContentContext);

    const isOpen = () => {
        return modalState.modalOpened === KEYS_MODAL.EVENT_EDIT;
    }

    const setIsOpen = () => {
        modalDispatch({
            type: CLEAR_MODALS
        });
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

    useEffect(() => {
        if (!isOpen()) return;
        const stateFromModal = {
            "_id": modalState.documentJSON["_id"] ? modalState.documentJSON["_id"] : "-",
            "eventName": modalState.documentJSON["eventName"] ? modalState.documentJSON["eventName"] : "-----",
            "description": modalState.documentJSON["description"] ? modalState.documentJSON["description"] : "-----",
            "location": modalState.documentJSON["location"] ? modalState.documentJSON["location"] : "-----",
            "startDate": modalState.documentJSON["startDate"] ? modalState.documentJSON["startDate"] : "-----",
            "endDate": modalState.documentJSON["endDate"] ? modalState.documentJSON["endDate"] : "-----",
            "imgUrl": modalState.documentJSON["imgUrl"] ? modalState.documentJSON["imgUrl"] : ""
            
        };

        setId(stateFromModal._id);
        setEventName(stateFromModal.eventName);
        setDescription(stateFromModal.description); 
        setLocation(stateFromModal.location);
        setStartDate(stateFromModal.startDate);
        setEndDate(stateFromModal.endDate);       
        setImgUrl(stateFromModal.imgUrl);
        
    // eslint-disable-next-line
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
            eventName.trim() === "" ||
            description.trim() === "" ||
            location.trim() === ""
        ) {
            FireError('No puedes dejar los campos vacíos.');
            return;
        }
        if (!validateDates()) {
            FireError('Las fecha de inicio debe de ser antes que la de fin.');
            return;
        }
        if (imgUrl === null) {
            FireError('Debes de subir una imagen');
            return;
        }
        
        try {
            const data = {
                _id,
                eventName,
                description,
                startDate,
                endDate,
                location,
                imgUrl : "https://ejemplo.com"
            };
            setIsLoading(true);
            const response = await editEvents(data);
            setIsLoading(false);

            if (response.status === 'success') {
                FireSucess('Has editado una empresa ESR exitosamente.');
                navigate(PATH_CERTIFICATIONS);
                clearState();
                setNeedsToDoRefresh(true);
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
                Editar evento
            </h1>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.form__item}>
                <InputText
                    id="new-acred-name"
                    text="Nombre del evento"
                    value={eventName}
                    setValue={setEventName}
                />
                <InputDate
                    currDate={getFormatedDate(startDate)}
                    setCurrDate={setStartDate}
                    text="Fecha inicio"
                    id="start-date-new-course"
                />
                
                <InputText
                    id="new-acred-phone"
                    text="Localizacion"
                    value={location}
                    setValue={setLocation}
                />
                <InputDate
                    currDate={getFormatedDate(endDate)}
                    setCurrDate={setEndDate}
                    text="Fecha fin"
                    id="limit-date-new-course"
                />							
                <InputTextArea
                    id="new-acred-description"
                    text="Descripción"
                    value={description}
                    setValue={setDescription}
                    className={styles.textarea}
                />
                </div>
                <div className={styles.form__item}>
                    <div className={styles.img}>
                        <Image
                            alt={eventName}
                            src={imgUrl}
                        />
                    </div>

                    <InputImage
                        id="image-post-edit"
                        setFile={(imgUrl) => {
                            setImgUrl(imgUrl);
                        }}
                        file={imgUrl}
                    />

                    <Button
                        isAnimationLoading
                        isLoading={isLoading}
                        type="submit"
                    >
                        Editar evento
                    </Button>
                </div>
                
            </form>
            
        </PopUpModal>
    )
}