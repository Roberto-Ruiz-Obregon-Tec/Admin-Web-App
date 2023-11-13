import PopUpModal from "../PopUp/PopUp";
import { useContext } from "react";
import { CLEAR_MODALS, KEYS_MODAL } from "../../store/modalReducer";
import { ContentContext } from "../../Content";
import Image from "../../../../components/Image/Image";
import styles from "./Posts.module.css";

export default function PopUpCourses() {
    const {
        modalState,
        modalDispatch
    } = useContext(ContentContext);

    const isOpen = () => {
        return modalState.modalOpened === KEYS_MODAL.COURSE
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
            "location": modalState.documentJSON["location"] ? modalState.documentJSON["location"] : "-----",
            "postalCode": modalState.documentJSON["postalCode"] ? modalState.documentJSON["postalCode"] : "-----",
            "cost": modalState.documentJSON["cost"] ? modalState.documentJSON["cost"] : "0",
            "capacity": modalState.documentJSON["capacity"] ? modalState.documentJSON["capacity"] : "0",
            "rating": modalState.documentJSON["rating"] ? modalState.documentJSON["rating"] : "0",
            "ratingCount": modalState.documentJSON["ratingCount"] ? modalState.documentJSON["ratingCount"] : "0",
            "meetingCode": modalState.documentJSON["meetingCode"] ? modalState.documentJSON["meetingCode"] : "-----",
            "speaker": modalState.documentJSON["speaker"] ? modalState.documentJSON["speaker"] : "-----",
            "startDate": modalState.documentJSON["startDate"] ? modalState.documentJSON["startDate"] : "dd/mm/yyyy",
            "endDate": modalState.documentJSON["endDate"] ? modalState.documentJSON["endDate"] : "dd/mm/yyyy",
            "modality": modalState.documentJSON["modality"] ? modalState.documentJSON["modality"] : "-----",
            "status": modalState.documentJSON["status"] ? modalState.documentJSON["status"] : "-----",
            


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
            classNameBody={styles.card_body}
        >
            <div className={styles.left}>
                <div className={styles.title}>
                    {getState().title}
                </div>
                <p className={styles.description}>
                    {getState().description}
                </p>
                <div className={styles.likes}>
                    <span>Likes:</span>&nbsp;{getState().likes}
                </div>
                <div className={styles.date}>
                    <div>Fecha de creación:</div>
                    <div>{getFormatedDate(getState().createdAt)}</div>
                </div>
                <div className={styles.img}>
                    <Image
                        alt={getState().name}
                        src={modalState.documentJSON["courseImage"]}
                    />
                </div>
            </div>
            <div className={styles.comments}>
                <div className={styles.comments_title}>Comentarios:</div>
                {getState().comments.length === 0 && (
                    <div>
                        Sin comentarios
                    </div>
                )}
                <div className={styles.comments_body}>
                    {getState().comments.map((comment, i) => {
                        return (
                            <div key={i}>
                                {comment}
                            </div>
                        )
                    })}
                </div>
            </div>
        </PopUpModal>
    )
}