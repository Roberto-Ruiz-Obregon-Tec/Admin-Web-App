import React, { useState , useEffect} from 'react';
import { FireError, FireSucess } from '../../../../utils/alertHandler';
import { editScholarships } from '../../../../client/scholarships';

import PopUpModal from "../PopUp/PopUp";
import { useContext } from "react";
import { CLEAR_MODALS, KEYS_MODAL } from "../../store/modalReducer";
import { ContentContext } from "../../Content";
import Image from "../../../../components/Image/Image";
import styles from "./Scholarship.module.css";
import Icons from "../../../../icons/index";

import InputText from "../../../../components/Form/Input/Text/Text";
import InputTextArea from "../../../../components/Form/Input/TextArea/TextArea";
import InputImage from "../../../../components/Form/Input/Image/Image";
import InputDate from "../../../../components/Form/Input/Date/Date";
import Button from "../../../../components/Form/Button/Button";

export default function PopUpScholarship() {
    const [isLoading, setIsLoading] = useState(false);

    const [name, setName] = useState('');
    const [organization, setOrganization] = useState('');
    const [location, setLocation] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [sector, setSector] = useState('');
    const [description, setDescription] = useState('');

    const [startDate , setStartDate] = useState(new Date());
    const [endDate , setEndDate] = useState(new Date());

    const [_id , setId] = useState(0);
    const [file , setFile] = useState(null);            

    const {
        modalState,
        modalDispatch
    } = useContext(ContentContext);

    const isOpen = () => {
        return modalState.modalOpened === KEYS_MODAL.SCHOLARSHIP_EDIT;
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
            "sector": modalState.documentJSON["sector"] ? modalState.documentJSON["sector"] : "-----",
            "startDate": modalState.documentJSON["startDate"] ? modalState.documentJSON["startDate"] : "dd/mm/yyyy",
            "endDate": modalState.documentJSON["endDate"] ? modalState.documentJSON["endDate"] : "dd/mm/yyyy",
            "phone": modalState.documentJSON["phone"] ? modalState.documentJSON["phone"] : "-----",
            "organization": modalState.documentJSON["organization"] ? modalState.documentJSON["organization"] : "-----",
            "location": modalState.documentJSON["location"] ? modalState.documentJSON["location"] : "-----",
            "email": modalState.documentJSON["email"] ? modalState.documentJSON["email"] : "-----",
            "description": modalState.documentJSON["description"] ? modalState.documentJSON["description"] : "-----",
            "_id": modalState.documentJSON["_id"] ? modalState.documentJSON["_id"] : "-",
        };

        setName(stateFromModal.name);
        setOrganization(stateFromModal.organization);
        setLocation(stateFromModal.location);
        setStartDate(stateFromModal.startDate);
        setEndDate(stateFromModal.endDate);
        setPhone(stateFromModal.phone);
        setEmail(stateFromModal.email);
        setDescription(stateFromModal.description);
        setSector(stateFromModal.sector);
        setId(stateFromModal._id)
        setFile(stateFromModal.file)
      }, [modalState.documentJSON])

    const clearState = () => {
        setIsOpen();
    };

    const validateDates = () => {                
        const c1 = new Date(startDate).getTime() <= new Date(endDate).getTime();
        return c1;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateDates()) {
            FireError('Las fecha de inicio debe de ser antes que la de fin. Y el límite debe de ser antes que termine.');
            return;
        }                

        if (
            name.trim() === "" ||
            organization.trim() === "" ||
            location.trim() === "" ||
            phone.trim() === "" ||
            email.trim() === "" ||
            description.trim() === ""||
            sector.trim() === ""
        ) {
            FireError('No puedes dejar los campos vacíos.');
            return;
        }
    
        if (phone.length !== 10) {
            FireError('El número de teléfono debe de ser de 10 números.');
            return;
        }
    
        if (isNaN(phone)) {
            FireError('El teléfono debe de ser un número.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            FireError('Por favor, ingresa un correo electrónico válido.');
            return;
        }
    
        if (file === null) {
            FireError('Debes de subir una imagen');
            return;
        }
    
        try {
            const data = {
                _id,
                name,
                organization,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                image: "https://imagen",
                location,
                email,
                phone,
                description,
                sector
            };
            setIsLoading(true);
            const response = await editScholarships(data);            
            setIsLoading(false);

            if (response.status === 'success') {
                FireSucess('Has editado la beca exitosamente.');                
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
                    Editar Beca
                </h1>
                <form onSubmit={handleSubmit} className={styles.form}>

                    <div className={styles.formi}> 
                            <InputText
                                id="new-scholarship-name"
                                text="Nombre"
                                value={name}
                                setValue={setName}
                            />
                            <InputText
                                id="new-scholariship-phone"
                                text="Teléfono"
                                value={phone}
                                setValue={setPhone}
                            >

                            </InputText>
                            <InputText
                                id="new-scholariship-email"
                                text="Correo electrónico"
                                value={email}
                                setValue={setEmail}
                            >

                            </InputText>
                    </div>

                    <div className={styles.form__item} >
                        <InputText
                            id="new-scholariship-organization"
                            text="Organización"
                            value={organization}
                            setValue={setOrganization}
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
                        </div>
                        <InputText
                            id="new-scholariship-localization"
                            text="Ubicación"
                            value={location}
                            setValue={setLocation}
                        />
    
                        <InputTextArea
                            id="new-project-description"
                            text="Descripción"
                            value={description}
                            setValue={setDescription}
                            className={styles.textarea}
                        />                        

                        <Button isAnimationLoading isLoading={isLoading} type='submit'>
                            Editar Beca
                        </Button>
                    </div>
                    <div className={styles.form__item} >
                        <div className={styles.img}>
                            <Image
                                alt={name}
                                src={modalState.documentJSON["image"]}
                            />
                        </div>    
                        <InputImage
                            id="image-scholarship-new"
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