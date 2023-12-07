import PopUpModal from '../PopUp/PopUp';
import { useContext, useState, useEffect, useCallback } from 'react';
import { CLEAR_MODALS, KEYS_MODAL } from '../../store/modalReducer';
import { ContentContext } from '../../Content';
import styles from './DeletePost.module.css';
import {
  FireError,
  FireSucess,
} from '../../../../utils/alertHandler';
import { PATH_POSTS } from '../../../../config/paths';
import { deletePublicaction } from '../../../../client/publications';
import Button from '../../../../components/Form/Button/Button';
import { useNavigate } from 'react-router-dom';

export default function ModalDeletePost() {
    
    const [isLoading, setIsLoading] = useState(false);

    const [title, setTitle] = useState('');
    const [description , setDescription] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [_id , setId] = useState(0);

    const navigate = useNavigate();

    const { modalState, modalDispatch, setNeedsToDoRefresh } =
        useContext(ContentContext);

    const isOpen = useCallback(() => {
    return modalState.modalOpened === KEYS_MODAL.POST_DELETE;
    }, [modalState.modalOpened]);

    const getFormatedDate = (date) => {
        const dateObject = new Date(date);
    
        const dataMonth = dateObject.getMonth() + 1;
        const month =
          dataMonth <= 9 ? '0' + dataMonth.toString() : dataMonth;
    
        const dataDay = dateObject.getDate() + 1;
        const day = dataDay <= 9 ? '0' + dataDay.toString() : dataDay;
    
        return dateObject.getFullYear() + '-' + month + '-' + day;
      };

    const setIsOpen = () => {
        modalDispatch({
          type: CLEAR_MODALS,
        });
    };

    useEffect( () => {
        if (!isOpen()) return;
        
        const stateFromModal = {
            "title": modalState.documentJSON["title"] ? modalState.documentJSON["title"] : "-----",
            "description": modalState.documentJSON["description"] ? modalState.documentJSON["description"] : "-----",
            "createdAt": modalState.documentJSON["createdAt"] ? modalState.documentJSON["createdAt"] : "dd/mm/yyyy",
            "_id": modalState.documentJSON["_id"] ? modalState.documentJSON["_id"] : "-"
        };

        setTitle(stateFromModal.title);
        setDescription(stateFromModal.description);
        setId(stateFromModal._id)
        setCreatedAt(stateFromModal.createdAt)
        // eslint-disable-next-line
    }, [modalState.documentJSON, isOpen]);

    const clearState = () => {
        setIsOpen();
    };

    const handleSubmit = async () => {
        try {
          const id = {
            id: _id,
          };

          setIsLoading(true);
          const response = await deletePublicaction(id.id);
          console.log(response);
          setIsLoading(false);

          if (response.status == null) {
            FireSucess('Has eliminado la Publicación exitosamente.');
            navigate(PATH_POSTS);
            clearState();
            setNeedsToDoRefresh(true);
            window.location.reload();
          } else {
            FireError('Ha habido un error.');
          }

        } catch (error) {
          setIsLoading(false);
          if ([400, 401].includes(error.response.status))
            FireError(error.response.data.message);
          else FireError('Ocurrió un error. Por favor intenta de nuevo.');
        }
    };

    return (
        <PopUpModal
          isOpen={isOpen()}
          setIsOpen={clearState}
          classNameCard={styles.card}
          classNameBody={styles.card_body}
        >
          <div className={styles.left}>
            <div className={styles.title}>{title}</div>
            <p className={styles.description}>{description}</p>
            <div className={styles.fechas}>
              <div className={styles.date}>
                <div>Fecha de Creación:</div>
                <div>{getFormatedDate(createdAt)}</div>
              </div>
            </div>
            <div className={styles.botons}>
              <Button
                isAnimationLoading
                isLoading={isLoading}
                type="submit"
                onClick={handleSubmit}
              >
                Eliminar Publicación
              </Button>
            </div>
          </div>
        </PopUpModal>
    );

}