import React, { useState } from 'react';
import ReturnLink from '../../../../components/Links/Return/Return';
import {
	FireError,
	FireSucess,
} from '../../../../utils/alertHandler';
import NavHistory from '../../../../components/NavHistory/NavHistory';
import Card from '../../../../components/ShadowCard/ShadowCard';
import { PATH_CERTIFICATIONS } from '../../../../config/paths';

import InputText from '../../../../components/Form/Input/Text/Text';
import InputTextArea from '../../../../components/Form/Input/TextArea/TextArea';
import InputDate from '../../../../components/Form/Input/Date/Date';
import Button from '../../../../components/Form/Button/Button';

import { useNavigate } from 'react-router-dom';
import styles from './CreateCertifications.module.css';
import { createACertification } from '../../../../client/certifications';

const CreateCertifications = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [acredDate, setAcredDate] = useState(new Date());

  /**
   * Handles the form submission for admin to create a project
   *
   * @param {Event} e - The form submission event that triggered the function.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name: name,
        description: description,
        adquisitionDate: new Date(acredDate),
        createdAt : '',
        updatedAt : '',
      };
      setIsLoading(true);
      const response = await createACertification(data);
      setIsLoading(false);

			if (response.status === 'success') {
				FireSucess('Has creado una acreditación exitosamente.');
				navigate(PATH_CERTIFICATIONS);
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
    <div>
      <NavHistory>
        Gestión de contenido / Proyectos / Crear Proyecto
      </NavHistory>
      <ReturnLink href={PATH_CERTIFICATIONS} />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Card>
            <h1>Crear proyecto</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
              <InputText
                id="new-acred-name"
                text="Nombre"
                value={name}
                setValue={setName}
              />
              <InputDate
                currDate={acredDate}
                setCurrDate={setAcredDate}
                text="Fecha de adquisición"
                id="acred-date"
              />
              <InputTextArea
                id="new-acred-description"
                text="Descripción"
                value={description}
                setValue={setDescription}
                className={styles.textarea}
              />
              <Button
                isAnimationLoading
                isLoading={isLoading}
                type="submit"
              >
                Crear Acreditacion
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateCertifications;