import React, { useState, useEffect } from 'react';
import { FireError, FireSucess } from '../../../../utils/alertHandler';
import { useNavigate } from 'react-router-dom';

import PopUpModal from "../PopUp/PopUp";
import { useContext } from "react";
import { CLEAR_MODALS, KEYS_MODAL } from "../../store/modalReducer";
import { ContentContext } from "../../Content";

import styles from "./EditESR.module.css";
import InputText from "../../../../components/Form/Input/Text/Text";
import InputTextArea from "../../../../components/Form/Input/TextArea/TextArea";
import Button from "../../../../components/Form/Button/Button";
import { PATH_ESR } from '../../../../config/paths'
import { editESR } from '../../../../client/esr';

export default function PopUpCertifications() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [_id, setId] = useState('')
    const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [phone, setPhone] = useState('');	
    const [postalCode, setPostalCode] = useState('');	

    const {
        modalState,
        modalDispatch,
        setNeedsToDoRefresh
    } = useContext(ContentContext);

    const isOpen = () => {
        return modalState.modalOpened === KEYS_MODAL.ESR_EDIT;
    }

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
            "postalCode": modalState.documentJSON["postalCode"] ? modalState.documentJSON["postalCode"] : "-----",
            "phone": modalState.documentJSON["phone"] ? modalState.documentJSON["phone"] : "dd/mm/yyyy"
        };

        setId(stateFromModal._id)
        setName(stateFromModal.name);
        setDescription(stateFromModal.description);
        setPhone(stateFromModal.phone);
        setPostalCode(stateFromModal.postalCode);
        
    // eslint-disable-next-line
    }, [modalState.documentJSON])

    const clearState = () => {
        setIsOpen();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            name.trim() === "" ||
            description.trim() === "" ||
            postalCode.toString().trim() === "" ||
            phone.toString().trim() === ""
        ) {
            FireError('No puedes dejar los campos vacíos.');
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
        if (phone.toString().length !== 10) {
            FireError('El telefono debe de ser de 10 números.');
            return;
        }
        if (isNaN(phone)) {
            FireError('El telefono debe de ser un número.');
            return;
        }
        
        try {
            const data = {
                _id,
                name,
                description,
                phone,
                postalCode        
            };
            setIsLoading(true);
            console.log(data)
            const response = await editESR(data);
            setIsLoading(false);

            if (response.status === 'success') {
                FireSucess('Has editado una empresa ESR exitosamente.');
                navigate(PATH_ESR);
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
                Editar empresa ESR
            </h1>

            <form onSubmit={handleSubmit} className={styles.form}>
							<InputText
								id="new-acred-name"
								text="Nombre"
								value={name}
								setValue={setName}
							/>
                            <InputText
								id="new-acred-phone"
								text="Telefono"
								value={phone}
								setValue={setPhone}
							/>
							<InputText
								id="new-acred-postalCode"
								text="Codigo Postal"
								value={postalCode}
								setValue={setPostalCode}
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