import PopUpModal from "../PopUp/PopUp";
import { useContext } from "react";
import { CLEAR_MODALS, KEYS_MODAL } from "../../store/modalReducer";
import { ContentContext } from "../../Content";
import Image from "../../../../components/Image/Image";
import styles from "./Posts.module.css";

export default function PopUpProyect() {
    const {
        modalState,
        modalDispatch
    } = useContext(ContentContext);

    const isOpen = () => {
        return modalState.modalOpened === KEYS_MODAL.POST;
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
            "title": "-----",
            "description": "-----",
            "likes": "0",
            "createdAt": "dd/mm/yyyy",
            "comments": []
        };

        return {
            "title": modalState.documentJSON["title"] ? modalState.documentJSON["title"] : "-----",
            "description": modalState.documentJSON["description"] ? modalState.documentJSON["description"] : "-----",
            "likes": modalState.documentJSON["likes"] ? modalState.documentJSON["likes"] : "0",
            "createdAt": modalState.documentJSON["createdAt"] ? modalState.documentJSON["createdAt"] : "dd/mm/yyyy",
            "comments": modalState.documentJSON["comments"] ? modalState.documentJSON["comments"] : [],
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
                        src={modalState.documentJSON["image"]}
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