import { useState, useContext, useEffect } from 'react';
import PopUpModal from '../PopUp/PopUp';
import { ContentContext } from '../../Content';
import { CLEAR_MODALS, KEYS_MODAL } from '../../store/modalReducer';
import styles from './DeleteCertification.module.css';

export default function PopUpEditCertification() {
  const { modalState, modalDispatch } = useContext(ContentContext);
  const [formData, setFormData] = useState({
    name: '-----',
    description: '-----',
    adquisitionDate: 'yyyy-mm-dd', // Initialize with a valid date format
    createdAt: 'dd/mm/yyyy',
    updatedAt: 'dd/mm/yyyy',
  });

  useEffect(() => {
    // Set initial formData based on modalState.documentJSON when the component mounts
    setFormData({
      name: modalState.documentJSON.name || '-----',
      description: modalState.documentJSON.description || '-----',
      adquisitionDate: modalState.documentJSON.adquisitionDate || 'yyyy-mm-dd',
      createdAt: modalState.documentJSON.createdAt || 'dd/mm/yyyy',
      updatedAt: modalState.documentJSON.updatedAt || 'dd/mm/yyyy',
    });
  }, [modalState.documentJSON]);

  const isOpen = () => {
    return modalState.modalOpened === KEYS_MODAL.EDIT_CERTIFICATION;
  };

  const setIsOpen = () => {
    modalDispatch({
      type: CLEAR_MODALS,
    });
  };

  const getFormattedDate = (date) => {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = () => {
    // Implement your update logic here
    console.log('Updated data:', formData);
    clearState();
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
        <form>
          <div>
            <h2>Editar Acreditación</h2>
          </div>
          <div>
            <label>
              Name:
              <input
                className={styles.input}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Description:
              <textarea
                className={styles.input}
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Adquisition Date:
              <input
                className={styles.input}
                type="date"
                name="adquisitionDate"
                value={getFormattedDate(formData.adquisitionDate)}
                onChange={handleInputChange}
              />
            </label>
            {/* Add other form fields as needed */}
            <div className={styles.botons}>
              <button
                type="button"
                className={styles.whiteBoton}
                onClick={clearState}
              >
                Cancelar
              </button>
              <button
                type="button"
                className={styles.redBoton}
                onClick={handleUpdate}
              >
                Actualizar
              </button>
            </div>
          </div>
        </form>
      </div>
    </PopUpModal>
  );
}
