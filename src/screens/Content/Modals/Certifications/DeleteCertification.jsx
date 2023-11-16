import PopUpModal from "../PopUp/PopUp";
import { useContext } from "react";
import { CLEAR_MODALS, KEYS_MODAL } from "../../store/modalReducer";
import { ContentContext } from "../../Content";
import styles from "./DeleteCertification.module.css";

export default function PopUpDeleteCertification() {
    const {
        modalState,
        modalDispatch
    } = useContext(ContentContext);

    const isOpen = () => {
        console.log(modalState.documentJSON);
        return modalState.modalOpened === KEYS_MODAL.DELETE_CERTIFICATION;
    }

    const getFormatedDate = (date) => {
        const dateObject = new Date(date);

        return dateObject.getDate() + "/" + (dateObject.getMonth() + 1) + "/" + dateObject.getFullYear();
    };

    const setIsOpen = () => {
        modalDispatch({
            type: CLEAR_MODALS
        });
    }


    const getState = () => {
        return {
            "name": modalState.documentJSON["name"] ? modalState.documentJSON["name"] : "-----",
            "description": modalState.documentJSON["description"] ? modalState.documentJSON["description"] : "-----",
            "adquisitionDate": modalState.documentJSON["adquisitionDate"] ? modalState.documentJSON["adquisitionDate"] : "dd/mm/yyyy",
            "createdAt": modalState.documentJSON["createdAt"] ? modalState.documentJSON["createdAt"] : "dd/mm/yyyy",
            "updatedAt": modalState.documentJSON["updatedAt"] ? modalState.documentJSON["updatedAt"] : "dd/mm/yyyy",
        };
    };

    const clearState = () => {
        setIsOpen();
    };

    return (
        <PopUpModal
            isOpen={isOpen()}
            setIsOpen={clearState}
            classNameCard={styles.card}
            classNameBody={styles.card_body}
        >
            <div className={styles.left}>
                <div className={styles.title}>
                    {getState().name}
                </div>
                <p className={styles.description}>
                    {getState().description}
                </p>
                <div className={styles.fechas}>
                    <div className={styles.date}>
                        <div>Fecha de Adquisición:</div>
                        <div>{getFormatedDate(getState().adquisitionDate)}</div>
                    </div>
                    <div className={styles.date}>
                        <div>Fecha de Actualización:</div>
                        <div>{getFormatedDate(getState().updatedAt)}</div>
                    </div>   
                    <div className={styles.date}>
                        <div>Fecha de Creación:</div>
                        <div>{getFormatedDate(getState().createdAt)}</div>
                    </div> 
                </div>
                <div className={styles.botons}>
                    <button className={styles.whiteBoton} onClick={clearState}>Cancelar</button>
                    <button className={styles.redBoton} onClick={clearState}>Eliminar</button>
                </div>
            </div>
        </PopUpModal>
    )
}