import React, { useState, useEffect } from 'react';
import { FireError, FireSucess } from '../../../../utils/alertHandler';
import { useNavigate } from 'react-router-dom';

import PopUpModal from "../PopUp/PopUp";
import { useContext } from "react";
import { CLEAR_MODALS, KEYS_MODAL } from "../../store/modalReducer";
import { ContentContext } from "../../Content";

import styles from "./EditCertifications.module.css";
import InputText from "../../../../components/Form/Input/Text/Text";
import InputTextArea from "../../../../components/Form/Input/TextArea/TextArea";
import InputDate from "../../../../components/Form/Input/Date/Date";
import Button from "../../../../components/Form/Button/Button";
import { PATH_CERTIFICATIONS } from '../../../../config/paths'
import { editCertification } from '../../../../client/certifications';

export default function PopUpCertifications() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [_id, setId] = useState(0)
    const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [adquisitionDate, setAdquisitionDate] = useState('');	

    const {
        modalState,
        modalDispatch,
        setNeedsToDoRefresh
    } = useContext(ContentContext);

    const isOpen = () => {
        return modalState.modalOpened === KEYS_MODAL.CERTIFICATION_EDIT;
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

    useEffect(() => {
        if (!isOpen()) return;
        const stateFromModal = {
            "_id": modalState.documentJSON["_id"] ? modalState.documentJSON["_id"] : "-",
            "name": modalState.documentJSON["name"] ? modalState.documentJSON["name"] : "-----",
            "description": modalState.documentJSON["description"] ? modalState.documentJSON["description"] : "-----",
            "adquisitionDate": modalState.documentJSON["adquisitionDate"] ? modalState.documentJSON["adquisitionDate"] : "dd/mm/yyyy"
        };

        setId(stateFromModal._id)
        setName(stateFromModal.name);
        setDescription(stateFromModal.description);
        setAdquisitionDate(stateFromModal.adquisitionDate)
        
    // eslint-disable-next-line
    }, [modalState.documentJSON])

    const clearState = () => {
        setIsOpen();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            name.trim() === "" ||
            description.trim() === ""
        ) {
            FireError('No puedes dejar los campos vacíos.');
            return;
        }
        
        try {
            const data = {
                _id,
                name,
                description,
                adquisitionDate               
            };
            setIsLoading(true);
            const response = await editCertification(data);
            setIsLoading(false);

            if (response.status === 'success') {
                FireSucess('Has editado una certificacion exitosamente.');
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
                Editar certificacion
            </h1>

            <form onSubmit={handleSubmit} className={styles.form}>
							<InputText
								id="new-acred-name"
								text="Nombre"
								value={name}
								setValue={setName}
							/>
							<InputDate
								currDate={getFormatedDate(adquisitionDate)}
								setCurrDate={setAdquisitionDate}
								text="Fecha de adquisición"
								id="acred-date"
							/>
							<InputTextArea
								id="new-acred-description"
								text="Descripción"
								value={description}
								setValue={setDescription}
								className={styles.textarea}
							/>
							<Button
								isAnimationLoading
								isLoading={isLoading}
								type="submit"
							>
								Editar certificacion
							</Button>
						</form>
            
        </PopUpModal>
    )
}