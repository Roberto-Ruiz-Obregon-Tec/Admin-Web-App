import React, { useState, useEffect } from 'react';
import { FireError, FireSucess } from '../../../../utils/alertHandler';
import { useNavigate } from 'react-router-dom';

import PopUpModal from "../PopUp/PopUp";
import { useContext } from "react";
import { CLEAR_MODALS, KEYS_MODAL } from "../../store/modalReducer";
import { ContentContext } from "../../Content";

import styles from "./UpdateComment.module.css";
import InputText from "../../../../components/Form/Input/Text/Text";
import InputTextArea from "../../../../components/Form/Input/TextArea/TextArea";
import InputDate from "../../../../components/Form/Input/Date/Date";
import InputImage from "../../../../components/Form/Input/Image/Image";
import Button from "../../../../components/Form/Button/Button";
import Image from '../../../../components/Image/Image';
import { PATH_COMMENTS } from '../../../../config/paths'
import { updateStatus } from '../../../../client/comments';

export default function PopUpCertifications() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [id, setId] = useState(0)
    const [status, setStatus] = useState(''); 

    const {
        modalState,
        modalDispatch,
        setNeedsToDoRefresh
    } = useContext(ContentContext);

    const isOpen = () => {
        return modalState.modalOpened === KEYS_MODAL.COMMENT_STATUS;
    }

    const setIsOpen = () => {
        modalDispatch({
            type: CLEAR_MODALS
        });
    }

  
    useEffect(() => {
        if (!isOpen()) return;
        const stateFromModal = {
            "id": modalState.documentJSON["id"] ? modalState.documentJSON["id"] : "-",
            "status": modalState.documentJSON["status"] ? modalState.documentJSON["status"] : "-----", 
        };

        setId(stateFromModal.id);
        setStatus(stateFromModal.status);
        
    // eslint-disable-next-line
    }, [modalState.documentJSON])

    const clearState = () => {
        setIsOpen();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            id.trim() === "" ||
            status.trim() === "" 
        ) {
            FireError('No puedes dejar los campos vacíos.');
            return;
        }
        
        try {
            const data = {
                id,
                status,
            };
            setIsLoading(true);
            const response = await updateStatus(data);
            setIsLoading(false);

            if (response.status === 'success') {
                FireSucess('Haz cambiado el status del comentario satisfactoriamente');
                navigate(PATH_COMMENTS);
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
              Cambiar status del comentario  
            </h1>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.form__item}>
                    <Button
                        isAnimationLoading
                        isLoading={isLoading}
                        type="submit"
                    >
                        Cambiar estatus
                    </Button>
                </div>
                
            </form>
            
        </PopUpModal>
    )
}