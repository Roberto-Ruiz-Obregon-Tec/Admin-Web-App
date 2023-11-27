import { useState, useContext, useEffect } from 'react';
import PopUpModal from '../PopUp/PopUp';
import { ContentContext } from '../../Content';
import { CLEAR_MODALS, KEYS_MODAL } from '../../store/modalReducer';
import styles from './DeleteCertification.module.css';
import { updateACertification } from '../../../../client/certifications';
import {
  FireError,
  FireSucess,
} from '../../../../utils/alertHandler';
import { PATH_CERTIFICATIONS } from '../../../../config/paths';
import { useNavigate } from 'react-router-dom';
import InputText from '../../../../components/Form/Input/Text/Text';
import InputTextArea from '../../../../components/Form/Input/TextArea/TextArea';
import InputDate from '../../../../components/Form/Input/Date/Date';
import Button from '../../../../components/Form/Button/Button';
import { useCallback } from 'react';

export default function ModalEditCertification() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [adquisitionDate, setAquisitionDate] = useState(new Date());
  const [_id, setId] = useState(0);
  const navigate = useNavigate();

  const { modalState, modalDispatch, setNeedsToDoRefresh } =
    useContext(ContentContext);

    const isOpen = useCallback(() => {
        return modalState.modalOpened === KEYS_MODAL.EDIT_CERTIFICATION;
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
      name: modalState.documentJSON['name']
        ? modalState.documentJSON['name']
        : '-----',
      adquisitionDate: modalState.documentJSON['adquisitionDate']
        ? modalState.documentJSON['adquisitionDate']
        : 'dd/mm/yyyy',
      description: modalState.documentJSON['description']
        ? modalState.documentJSON['description']
        : '-----',
      _id: modalState.documentJSON['_id']
        ? modalState.documentJSON['_id']
        : '-',
      createdAt: modalState.documentJSON['createdAt']
        ? modalState.documentJSON['createdAt']
        : 'dd/mm/yyyy',
      updatedAt: modalState.documentJSON['updatedAt']
        ? modalState.documentJSON['updatedAt']
        : 'dd/mm/yyyy',
    };
  
    setName(stateFromModal.name);
    setDescription(stateFromModal.description);
    setAquisitionDate(stateFromModal.adquisitionDate);
    setId(stateFromModal._id);
  }, [modalState.documentJSON, isOpen]);
  

  const clearState = () => {
    setIsOpen();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() === '' || description.trim() === '') {
      FireError('No puedes dejar los campos vacíos.');
      return;
    }
    try {
      const data = {
        _id: _id,
        name: name,
        adquisitionDate: new Date(adquisitionDate),
        description: description,
      };
      setIsLoading(true);
      const response = await updateACertification(data);
      setIsLoading(false);

      if (response.status === 'success') {
        FireSucess('Has editado la Acreditación exitosamente.');
        navigate(PATH_CERTIFICATIONS);
        clearState();
        window.location.reload()
        setNeedsToDoRefresh(true);
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
    >
      <h1>Editar proyecto</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.form__item}>
          <InputText
            id="new-acreditacion-name"
            text="Nombre"
            value={name}
            setValue={setName}
          />
          <div className={styles.dates}>
            <InputDate
              currDate={getFormatedDate(adquisitionDate)}
              setCurrDate={setAquisitionDate}
              text="Fecha inicio"
              id="adqusitiondate-acreditacion"
            />
          </div>
          <InputTextArea
            id="new-acreditacion-description"
            text="Descripción"
            value={description}
            setValue={setDescription}
            className={styles.textarea}
          />
          <div className={styles.botons}>
          <Button
            isAnimationLoading
            isLoading={isLoading}
            type="submit"
          >
            Editar Acreditación
          </Button>
          </div>
        </div>
      </form>
    </PopUpModal>
  );
}