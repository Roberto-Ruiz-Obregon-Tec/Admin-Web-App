import PopUpModal from "../PopUp/PopUp";
import { useContext } from "react";
import { CLEAR_MODALS, KEYS_MODAL } from "../../store/modalReducer";
import { ContentContext } from "../../Content";
import Image from "../../../../components/Image/Image";
import styles from "./Projects.module.css";

export default function PopUpProyect() {
    const {
        modalState,
        modalDispatch
    } = useContext(ContentContext);

    const isOpen = () => {
        return modalState.modalOpened === KEYS_MODAL.PROJECT;
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
            "startDate": modalState.documentJSON["startDate"] ? modalState.documentJSON["startDate"] : "dd/mm/yyyy",
            "endDate": modalState.documentJSON["endDate"] ? modalState.documentJSON["endDate"] : "dd/mm/yyyy",
            "deadlineDate": modalState.documentJSON["deadlineDate"] ? modalState.documentJSON["deadlineDate"] : "dd/mm/yyyy",
            "postalCode": modalState.documentJSON["postalCode"] ? modalState.documentJSON["postalCode"] : "-----",
            "description": modalState.documentJSON["description"] ? modalState.documentJSON["description"] : "-----",
            "_id": modalState.documentJSON["_id"] ? modalState.documentJSON["_id"] : "-",
            "createdAt": modalState.documentJSON["createdAt"] ? modalState.documentJSON["createdAt"] : "dd/mm/yyyy",
            "updatedAt": modalState.documentJSON["updatedAt"] ? modalState.documentJSON["updatedAt"] : "dd/mm/yyyy",
            "focus": modalState.documentJSON["focus"] ? modalState.documentJSON["focus"] : [],
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
            <div className={styles.postalCode}>
                <span>Dirección postal:</span>&nbsp;{getState().postalCode}
            </div>
            <div className={styles.dates}>
                <div className={styles.date}>
                    <div>Fecha de inicio:</div>
                    <div>{getFormatedDate(getState().startDate)}</div>
                </div>
                <div className={styles.date}>
                    <div>Fecha de límite:</div>
                    <div>{getFormatedDate(getState().deadlineDate)}</div>
                </div>
                <div className={styles.date}>
                    <div>Fecha fin:</div>
                    <div>{getFormatedDate(getState().endDate)}</div>
                </div>
            </div>
            <div className={styles.img}>
                <Image
                    alt={getState().name}
                    src={modalState.documentJSON["programImage"]}
                />
            </div>
            <div className={styles.focus}>
                <div className={styles.focus_title}>Enfoques:</div>
                {getState().focus.length === 0 && (
                    <div>
                        Sin enfoques
                    </div>
                )}
                <div className={styles.focus_body}>
                    {getState().focus.map((focus, i) => {
                        return (
                            <div key={i}>
                                {focus}
                            </div>
                        )
                    })}
                </div>
            </div>
        </PopUpModal>
    )
}