import PopUpModal from "../PopUp/PopUp";
import { useContext } from "react";
import { CLEAR_MODALS, KEYS_MODAL } from "../../store/modalReducer";
import { ContentContext } from "../../Content";
import styles from "./Certification.module.css"

export default function PopUpCertifications() { 
    const {
        modalState,
        modalDispatch
    } = useContext(ContentContext);

    const isOpen = () => {
        return modalState.modalOpened === KEYS_MODAL.CERTIFICATION;
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

        if (!isOpen()) return {
            "_id": "-",
            "name": "-----",
            "adquisitionDate": "dd/mm/yyyy",
            "description": "-----",
            "createdAt": "dd/mm/yyyy",
            "updatedAt": "dd/mm/yyyy",
        };;


        return {
            "_id": modalState.documentJSON["_id"] ? modalState.documentJSON["_id"] : "-",
            "name": modalState.documentJSON["name"] ? modalState.documentJSON["name"] : "-----",
            "adquisitionDate": modalState.documentJSON["adquisitionDate"] ? modalState.documentJSON["adquisitionDate"] : "dd/mm/yyyy",
            "description": modalState.documentJSON["description"] ? modalState.documentJSON["description"] : "-----",
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
        >
            <div className={styles.title}>
                {getState().name}
            </div>
            <p className={styles.description}>
                {getState().description}
            </p>
            <div className={styles.date}>
                <div>Fecha de adquisición:</div>
                <div>{getFormatedDate(getState().adquisitionDate)}</div>
            </div>
        </PopUpModal>
    )
}