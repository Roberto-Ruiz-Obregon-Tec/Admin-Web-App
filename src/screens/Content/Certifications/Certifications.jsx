import { useState, useEffect, Fragment, useContext } from 'react';
import { FireError } from '../../../utils/alertHandler';
import { getCertifications } from '../../../client/certifications';
import NavHistory from '../../../components/NavHistory/NavHistory';
import Title from '../../../components/Title/Title';
import LoaderPages from './Loader/LoaderPages';
import styles from './Certifications.module.css';
import Icons from '../../../icons/index';
import Table from '../../../components/Table/Table';
import { Link } from 'react-router-dom';
import { PATH_CREATE_CERTIFICATION } from '../../../config/paths';
import {
  EDIT_CERTIFICATION,
  DELETE_CERTIFICATION,
  OPEN_CERTIFICATION
} from '../store/modalReducer';
import { ContentContext } from '../Content';

function Certifications() {  
  const [certifications, setCertifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { modalDispatch, needsToDoRefresh, setNeedsToDoRefresh } = useContext(ContentContext);


  const fetchForData =   
    async () => {
      try {
        setIsLoading(true);
        const certs = await getCertifications();
        setIsLoading(false);
        setCertifications(certs);
      } catch (error) {
        setIsLoading(false);
        FireError(error.response.message);
      }
    };

    useEffect(() => {
      // eslint-disable-next-line
      fetchForData();
  }, []);

  useEffect(() => {
      if (needsToDoRefresh) {
          fetchForData();
          setNeedsToDoRefresh(false);
      };
      // eslint-disable-next-line
  }, [needsToDoRefresh]);

  const getFormattedDate = (dateString) => {
    if (!dateString) {
      return 'No hay fecha';
    }

    const dateObject = new Date(dateString);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1; // Months are zero-indexed
    const year = dateObject.getFullYear();

    // Ensure that day and month are always two digits
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${year}-${formattedMonth}-${formattedDay}`;
  };

  const getMatrix = () => {
    const matrix = [];
    if (certifications) {
      certifications.forEach((certification) => {
        matrix.push([
          certification.name,
          certification.description,
          getFormattedDate(certification.adquisitionDate),
        ]);
      });
    }
    return matrix;
  };

  const handleDelete = (i) => {
    const post = certifications[i];
    modalDispatch({
      type: DELETE_CERTIFICATION,
      payload: post,
    });
  };


  const openInfo = (i) => {
    try {
        if (i < 0 || i >= certifications.length) return;
        const certification = certifications[i];
        modalDispatch({
            type: OPEN_CERTIFICATION,
            payload: certification
        });
    } catch { };
  };

  const openEdit = (i) => {
    try {                  
        if (i < 0 || i >= certifications.length) return;
        const certification = certifications[i];        
        modalDispatch({
            type: EDIT_CERTIFICATION,
            payload: certification
        });
    } catch { }
}

  return (
    <div>
      <NavHistory>Gestión de contenido / Acreditaciones</NavHistory>
      <Title>
        {Icons.certify()}
        Lista de Acreditaciones
      </Title>
      {isLoading && <LoaderPages />}
      {!isLoading && (
        <>
          <Table
            handleDelete={handleDelete}
            matrixData={getMatrix()}
            arrayHeaders={[
              'Nombre',
              'Descripción',
              'Fecha de convocatoria',
            ]}
            percentages={[25, 50, 19]}
            handleEdit={openEdit}
            clickOnCell={openInfo}
          />
          <Link
            title="Añadir una Acreditación"
            to={PATH_CREATE_CERTIFICATION}
            className={styles.add}
          >
            {Icons.cross()}
          </Link>
        </>
      )}
    </div>
  );
}
export default Certifications;
