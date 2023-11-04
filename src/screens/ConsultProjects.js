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
                        <td>{new Date(item.startDate).getDate()}/{new Date(item.startDate).getMonth() + 1}/{new Date(item.startDate).getFullYear()}</td>
                        <td>{new Date(item.endDate).getDate()}/{new Date(item.endDate).getMonth() + 1}/{new Date(item.endDate).getFullYear()}</td>
                        <td>{new Date(item.deadlineDate).getDate()}/{new Date(item.deadlineDate).getMonth() + 1}/{new Date(item.deadlineDate).getFullYear()}</td>
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
