import PopUpModal from '../PopUp/PopUp';
import { useContext, useState, useEffect, useCallback } from 'react';
import { CLEAR_MODALS, KEYS_MODAL } from '../../store/modalReducer';
import { ContentContext } from '../../Content';
import styles from './DeleteCurses.module.css';
import {
  FireError,
  FireSucess,
} from '../../../../utils/alertHandler';
import { PATH_COURSES } from '../../../../config/paths';
import { deleteCourse } from '../../../../client/course';
import Button from '../../../../components/Form/Button/Button';
import { useNavigate } from 'react-router-dom';

export default function ModalDeleteCourse() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [_id, setId] = useState(0)
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [createdAt, setCreatedAt] = useState('');
    const [updatedAt, setUpdatedAt] = useState('');  

    const { modalState, modalDispatch, setNeedsToDoRefresh } =
    useContext(ContentContext);

    const isOpen = useCallback(() => {
        return modalState.modalOpened === KEYS_MODAL.COURSE_DELETE;
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

      useEffect(() => {
        if (!isOpen()) return;
        const stateFromModal = {
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
            "updatedAt": modalState.documentJSON["updatedAt"] ? modalState.documentJSON["updatedAt"] : "dd/mm/yyyy"
        };

        setId(stateFromModal._id)
        setName(stateFromModal.name);
        setDescription(stateFromModal.description);
        setStartDate(stateFromModal.startDate);
        setEndDate(stateFromModal.endDate);
        setCreatedAt(stateFromModal.createdAt);
        setUpdatedAt(stateFromModal.updatedAt);
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
        const response = await deleteCourse(id.id);
        console.log(response);
        setIsLoading(false);
        if (response.status == null) {
          FireSucess('Has eliminado el curso exitosamente.');
          navigate(PATH_COURSES);
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
          <div className={styles.title}>{name}</div>
          <p className={styles.description}>{description}</p>
          <div className={styles.fechas}>
            <div className={styles.date}>
              <div>Fecha inicio:</div>
              <div>{getFormatedDate(startDate)}</div>
            </div>
            <div className={styles.date}>
              <div>Fecha fin:</div>
              <div>{getFormatedDate(endDate)}</div>
            </div>
            <div className={styles.date}>
              <div>Fecha de Actualización:</div>
              <div>{getFormatedDate(updatedAt)}</div>
            </div>
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
              Eliminar Curso
            </Button>
          </div>
        </div>
      </PopUpModal>
    );
}