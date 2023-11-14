import { useState, useEffect, Fragment } from 'react';
import { FireError } from '../../../utils/alertHandler';
import { getCertifications } from '../../../client/certifications';
import NavHistory from '../../../components/NavHistory/NavHistory';
import Title from '../../../components/Title/Title';
import LoaderPages from './Loader/LoaderPages';
import styles from './Certifications.module.css';
import Icons from '../../../icons/index';
import Table from '../../components/Table/Table';
import { Link } from 'react-router-dom';
import { PATH_CREATE_CERTIFICATION } from '../../config/paths';

function Certifications() {
  const [certifications, setCertifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const certs = await getCertifications();
        setIsLoading(false);
        setCertifications(certs);
      } catch (error) {
        setIsLoading(false);
        FireError(error.response.message);
      }
    })();
  }, []);

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

    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  const getMatrix = () => {
    const matrix = [];
    certifications.forEach((certification) => {
      matrix.push([
        certification.name,
        certification.description,
        getFormattedDate(certification.adquisitionDate),
      ]);
    });
    return matrix;
  };

  const handleTest = () => {
    console.log('test');
  };

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
            handleEdit={handleTest}
            handleDelete={handleTest}
            matrixData={getMatrix()}
            arrayHeaders={[
              'Nombre',
              'Descripción',
              'Fecha de adquisición',
            ]}
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
