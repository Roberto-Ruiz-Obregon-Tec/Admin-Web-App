import PopUpModal from "../PopUp/PopUp";
import { useContext } from "react";
import { CLEAR_MODALS, KEYS_MODAL } from "../../store/modalReducer";
import { ContentContext } from "../../Content";
import Image from "../../../../components/Image/Image";
import styles from "./CourseUsers.module.css";

export default function PopUpCourseUsers() {

    const {
        modalState,
        modalDispatch
    } = useContext(ContentContext);

    const isOpen = () => {
        return modalState.modalOpened === KEYS_MODAL.COURSE_USERS;
    }

    const setIsOpen = () => {
        modalDispatch({
            type: CLEAR_MODALS
        });
    }

    /*const getState = () => {

        if (!isOpen()) return {
            "_id": "-",
            "name": "-----",
            "description": "-----",
            "speaker": "----",
            "startDate": "dd/mm/yyyy",
            "endDate": "dd/mm/yyyy",
            "cost": "-----",
            "capacity": "-----",
            "location": "-----",
            "postalCode": "-----",
            "meetingCode": "-----",
            "modality": "-----",
            "status": "-----",
            "courseImage": "----",
            "createdAt": "dd/mm/yyyy",
            "updatedAt": "dd/mm/yyyy",
        };;


        return {
            "_id": modalState.documentJSON["_id"] ? modalState.documentJSON["_id"] : "-",
            "name": modalState.documentJSON["name"] ? modalState.documentJSON["name"] : "-----",
            "description": modalState.documentJSON["description"] ? modalState.documentJSON["description"] : "-----",
            "speaker": modalState.documentJSON["speaker"] ? modalState.documentJSON["speaker"] : "-----",
            "startDate": modalState.documentJSON["startDate"] ? modalState.documentJSON["startDate"] : "dd/mm/yyyy",
            "endDate": modalState.documentJSON["endDate"] ? modalState.documentJSON["endDate"] : "dd/mm/yyyy",
            "cost": modalState.documentJSON["cost"] ? modalState.documentJSON["cost"] : "-----",
            "capacity": modalState.documentJSON["capacity"] ? modalState.documentJSON["capacity"] : "-----",
            "location": modalState.documentJSON["location"] ? modalState.documentJSON["location"] : "-----",
            "postalCode": modalState.documentJSON["postalCode"] ? modalState.documentJSON["postalCode"] : "-----",
            "meetingCode": modalState.documentJSON["meetingCode"] ? modalState.documentJSON["meetingCode"] : "-----",
            "modality": modalState.documentJSON["modality"] ? modalState.documentJSON["modality"] : "-----",
            "status": modalState.documentJSON["status"] ? modalState.documentJSON["status"] : "-----",
            "courseImage": modalState.documentJSON["courseImage"] ? modalState.documentJSON["courseImage"] : "-----",
            "createdAt": modalState.documentJSON["createdAt"] ? modalState.documentJSON["createdAt"] : "dd/mm/yyyy",
            "updatedAt": modalState.documentJSON["updatedAt"] ? modalState.documentJSON["updatedAt"] : "dd/mm/yyyy",
        };
    };*/

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
                Prueba funcional
            </div>

            {/*<p className={styles.description}>
                {getState().description}
            </p>

            <div className={styles.ponente}>
                <div>Ponente:</div>
                <div>{getState().speaker}</div>
            </div>

            <div className={styles.cost}>
                <div>Costo:</div>
                <div>{getState().cost}</div>
            </div>

            <div className={styles.code}>
                <div>Link:</div>
                <div>{getState().meetingCode}</div>
            </div>

            <div className={styles.locations}>
                <div className={styles.loc}>
                    <div>Direccion Postal</div>
                    <div>{getState().postalCode}</div>
                </div>
                <div className={styles.loc}>
                    <div>Ubicación:</div>
                    <div>{getState().location}</div>
                </div>
            </div>


            <div className={styles.dates}>
                <div className={styles.date}>
                    <div>Fecha de inicio:</div>
                    <div>{getFormatedDate(getState().startDate)}</div>
                </div>
                <div className={styles.date}>
                    <div>Fecha fin:</div>
                    <div>{getFormatedDate(getState().endDate)}</div>
                </div>
            </div>

            <div className={styles.courses}>
                <div className={styles.course}>
                    <div>Capacidad:</div>
                    <div>{getState().capacity}</div>
                </div>
                <div className={styles.course}>
                    <div>Modalidad:</div>
                    <div>{getState().modality}</div>
                </div>
                <div className={styles.course}>
                    <div>Estatus:</div>
                    <div>{getState().status}</div>
                </div>
            </div>
            
            <div className={styles.img}>
                <Image
                    alt={getState().name}
                    src={modalState.documentJSON["courseImage"]}
                />
            </div>*/}
        </PopUpModal>
    )
}