import React, { useState , useEffect} from 'react';
import { FireError, FireSucess } from '../../../../utils/alertHandler';
import { useNavigate } from 'react-router-dom';
import { editPublications } from "../../../../client/publications";

import PopUpModal from "../PopUp/PopUp";
import { useContext } from "react";
import { CLEAR_MODALS, KEYS_MODAL } from "../../store/modalReducer";
import { ContentContext } from "../../Content";

import Image from "../../../../components/Image/Image";
import styles from "./EditPost.module.css";
import InputText from "../../../../components/Form/Input/Text/Text";
import InputTextArea from "../../../../components/Form/Input/TextArea/TextArea";
import InputImage from "../../../../components/Form/Input/Image/Image";
import Button from "../../../../components/Form/Button/Button";
import { PATH_POSTS } from "../../../../config/paths";

export default function PopUpPost() {

    const [isLoading, setIsLoading] = useState(false);

    const [title, setTitle] = useState('');
    const [description , setDescription] = useState('');
    const [likes , setLikes] = useState('');

    const [_id , setId] = useState(0);
    const [file , setFile] = useState(null); 

    const navigate = useNavigate();

    const {
        modalState,
        modalDispatch,
        setNeedsToDoRefresh
    } = useContext(ContentContext);

    const isOpen = () => {
        return modalState.modalOpened === KEYS_MODAL.POST_EDIT;
    }

    const setIsOpen = () => {
        modalDispatch({
            type: CLEAR_MODALS
        });
    }

    useEffect( () => {
        if (!isOpen()) return;
        
        const stateFromModal = {
            "title": modalState.documentJSON["title"] ? modalState.documentJSON["title"] : "-----",
            "description": modalState.documentJSON["description"] ? modalState.documentJSON["description"] : "-----",
            "likes": modalState.documentJSON["likes"] ? modalState.documentJSON["likes"] : "0",
            "createdAt": modalState.documentJSON["createdAt"] ? modalState.documentJSON["createdAt"] : "dd/mm/yyyy",
            "comments": modalState.documentJSON["comments"] ? modalState.documentJSON["comments"] : [],
        };

        setTitle(stateFromModal.title);
        setLikes(stateFromModal.likes);
        setDescription(stateFromModal.description);
        setId(stateFromModal._id)
        setFile(stateFromModal.file)
      }, [modalState.documentJSON])

    const clearState = () => {
        setIsOpen();
    };

    const handleSubmit = async (e) => {
        
        e.preventDefault();            

        if (
            title.trim() === "" ||
            likes.toString().trim() === "" ||
            description.trim() === ""
        ) {
            FireError('No puedes dejar los campos vacíos.');
            return;
        }

        if (isNaN(likes)) {
            FireError('Los likes deben ser numeros.');
            return;
        }

        if (file === null) {
            FireError('Debes de subir una imagen');
            return;
        }
        try {
            const data = {
                _id: _id,
                title: title,
                image: "https://image",
                likes: likes,
                description: description
            };
            setIsLoading(true);
            const response = await editPublications(data);            
            setIsLoading(false);

            if (response.status === 'success') {
                FireSucess('Has editado la publicación exitosamente.');  
                navigate(PATH_POSTS);
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
                    Editar Publicación
                </h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.form__item} >
                        <InputText
                            id="new-post-title"
                            text="Titulo"
                            value={title}
                            setValue={setTitle}
                        />
                        <InputText
                            id="new-post-likes"
                            text="Likes"
                            value={likes}
                            setValue={setLikes}
                        />
                        <InputTextArea
                            id="new-post-description"
                            text="Descripción"
                            value={description}
                            setValue={setDescription}
                            className={styles.textarea}
                        />                        
                        
                        <Button isAnimationLoading isLoading={isLoading} type='submit'>
                            Editar Publicación
                        </Button>
                    </div>
                    <div className={styles.form__item} >
                        <div className={styles.img}>
                            <Image
                                alt={title}
                                src={modalState.documentJSON["image"]}
                            />
                        </div>    
                        <InputImage
                            id="image-post-new"
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