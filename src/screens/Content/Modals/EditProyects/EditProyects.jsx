import React, { useState , useEffect} from 'react';
import { FireError, FireSucess } from '../../../../utils/alertHandler';
import { useNavigate } from 'react-router-dom';
import { editProject } from '../../../../client/availableProj';

import PopUpModal from "../PopUp/PopUp";
import { useContext } from "react";
import { CLEAR_MODALS, KEYS_MODAL } from "../../store/modalReducer";
import { ContentContext } from "../../Content";

import Image from "../../../../components/Image/Image";
import styles from "./EditProjects.module.css";
import InputText from "../../../../components/Form/Input/Text/Text";
import InputTextArea from "../../../../components/Form/Input/TextArea/TextArea";
import InputImage from "../../../../components/Form/Input/Image/Image";
import InputDate from "../../../../components/Form/Input/Date/Date";
import Button from "../../../../components/Form/Button/Button";
import { PATH_PROJECTS } from '../../../../config/paths';

export default function PopUpProyect() {
    const [isLoading, setIsLoading] = useState(false);

    const [name, setName] = useState('');
    const [postalCode , setPostalCode] = useState('');
    const [description , setDescription] = useState('');

    const [startDate , setStartDate] = useState(new Date());
    const [endDate , setEndDate] = useState(new Date());
    const [deadlineDate , setLimitDate] = useState(new Date());

    const [_id , setId] = useState(0);
    const [file , setFile] = useState(null);       
    
    const navigate = useNavigate();

    const {
        modalState,
        modalDispatch,
        setNeedsToDoRefresh
    } = useContext(ContentContext);

    const isOpen = () => {
        return modalState.modalOpened === KEYS_MODAL.PROJECT_EDIT;
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
    
    useEffect( () => {       
        const stateFromModal = {
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

        setName(stateFromModal.name);
        setPostalCode(stateFromModal.postalCode);
        setDescription(stateFromModal.description);
        setStartDate(stateFromModal.startDate);
        setEndDate(stateFromModal.endDate);
        setLimitDate(stateFromModal.deadlineDate);
        setId(stateFromModal._id)
        setFile(stateFromModal.file)
      }, [modalState.documentJSON])

    const clearState = () => {
        setIsOpen();
    };

    const validateDates = () => {                
        const c1 = new Date(startDate).getTime() <= new Date(endDate).getTime();
        const c2 = new Date(deadlineDate).getTime() <= new Date(endDate).getTime();
        const c3 = new Date(startDate).getTime() <= new Date(deadlineDate).getTime();

        return c1 && c2 && c3;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateDates()) {
            FireError('Las fecha de inicio debe de ser antes que la de fin. Y el límite debe de ser antes que termine.');
            return;
        }                

        if (
            name.trim() === "" ||
            postalCode.toString().trim() === "" ||
            description.trim() === ""
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

        if (file === null) {
            FireError('Debes de subir una imagen');
            return;
        }
        try {
            const data = {
                _id: _id,
                name: name,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                deadlineDate: new Date(deadlineDate),
                programImage: "https://ejemplo.com",
                postalCode: postalCode,
                description: description
            };
            setIsLoading(true);
            const response = await editProject(data);            
            setIsLoading(false);

            if (response.status === 'success') {
                FireSucess('Has editado el proyecto exitosamente.');  
                navigate(PATH_PROJECTS);
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
                    Editar proyecto
                </h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.form__item} >
                        <InputText
                            id="new-project-name"
                            text="Nombre"
                            value={name}
                            setValue={setName}
                        />
                        <div className={styles.dates}>                        
                            <InputDate
                                currDate={getFormatedDate(startDate)}                            
                                setCurrDate={setStartDate}
                                text="Fecha inicio"
                                id="start-date-project"
                            />
                            <InputDate
                                currDate={getFormatedDate(endDate)}
                                setCurrDate={setEndDate}
                                text="Fecha fin"
                                id="end-date-project"
                            />
                            <InputDate
                                currDate={getFormatedDate(deadlineDate)}
                                setCurrDate={setLimitDate}
                                text="Fecha límite"
                                id="limit-date-project"
                            />
                        </div>
                        <InputText
                            id="new-project-postal-code"
                            text="Código postal"
                            value={postalCode}
                            setValue={setPostalCode}
                        />
                        <InputTextArea
                            id="new-project-description"
                            text="Descripción"
                            value={description}
                            setValue={setDescription}
                            className={styles.textarea}
                        />                        
                        
                        <Button isAnimationLoading isLoading={isLoading} type='submit'>
                            Editar proyecto
                        </Button>
                    </div>
                    <div className={styles.form__item} >
                        <div className={styles.img}>
                            <Image
                                alt={name}
                                src={modalState.documentJSON["programImage"]}
                            />
                        </div>    
                        <InputImage
                            id="image-project-new"
                            setFile={(file) => {
                                setFile(file);
                            }}
                            file={file}
                        />
                    </div>                    
                    
                </form>

        </PopUpModal>
    )
}