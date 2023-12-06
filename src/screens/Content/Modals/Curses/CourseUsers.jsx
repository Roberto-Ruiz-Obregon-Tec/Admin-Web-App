import PopUpModal from "../PopUp/PopUp";
import { useState, useContext, useEffect } from "react";
import { CLEAR_MODALS, KEYS_MODAL } from "../../store/modalReducer";
import { ContentContext } from "../../Content";
import Table from "../../../../components/Table/Table";
import styles from "./CourseUsers.module.css";

export default function PopUpCourseUsers() {

    const [courseUsers, setCourseUsers] = useState([]);

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

    const getState = () => {
        if (!isOpen()) return [];

        // El orden importa
        const possibleKeys = [
            "firstName",
            "lastName",
            //"age",
            //"gender",
            "email",
            "occupation",
            "company",
            //"sociallyResponsibleCompany",
            //"postalCode",
            //"id"
        ]

        const matrix = [];
        for (let i = 0; i < modalState.documentJSON.length; i++) {
            const row = [];
            const user = modalState.documentJSON[i].user;

            for (let j = 0; j < possibleKeys.length; j++) {
                const key = possibleKeys[j];
                row.push(user[key] !== "" ? user[key] : "");
            }
            
            matrix.push(row);
        }

        setCourseUsers(matrix);
        return matrix
    };

    useEffect(() => {
        getState();
    }, [isOpen]);
    
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
                Usuarios inscritos
            </div>

            <br/>
            
            {<>
                <Table
                    matrixData={courseUsers}
                    arrayHeaders={[
                        "Nombre(s)",
                        "Apellidos",
                        //"Edad",
                        //"Género",
                        "Email",
                        "Ocupación",
                        "Empresa",
                        //"¿Socialmente responsable?",
                        //"Código postal",
                        //"id"
                    ]}
                    percentages={[15, 15, 30, 20, 20]}
                    handle={false}
                />
            </>}
        </PopUpModal>
    )
}