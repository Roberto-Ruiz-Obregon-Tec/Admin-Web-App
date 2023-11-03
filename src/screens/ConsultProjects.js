import React, { useState, useEffect, Fragment } from 'react';
import { getProgram } from '../client/availableProj'
import { FireError } from '../utils/alertHandler';
import '../styles/verCursos.css';
import '../styles/availableProj.css'

const ConsultProjects = () => {

    const [avaliableP, setavailableP] = useState ([]);

    useEffect(() => {
        (async () => {
            try {
                const proj = await getProgram();
                setavailableP(proj);
            } catch (error) {
                FireError(error.response.message);
            }
        })();
    }, []);

    return (
        <Fragment>

            <div className='header-container'>
                <h4>Inicio / Proyectos Disponibles</h4>
            </div>

            <table className='availableTable'>
                <thead>
                    <tr>
                    <th>Nombre</th>
                    <th>Fecha Inicio</th>
                    <th>Fecha Fin</th>
                    <th>Fecha Limite</th>
                    <th>Fecha Postal</th>
                    <th>Descripcion</th>
                    </tr>
                </thead>

                <tbody>
                    {avaliableP.map((item) => (
                    <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>{item.startDate}</td>
                        <td>{item.endDate}</td>
                        <td>{item.deadlineDate}</td>
                        <td>{item.postalCode}</td>
                        <td>{item.description}</td>
                    </tr>
                    ))}
                </tbody>
            
            </table>
            
        </Fragment>
    );
};

export default ConsultProjects;
