import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/verCursos.css';
import '../styles/availableProj.css'

const ConsultProjects = () => {

    const navigate = useNavigate();
    const [programs, setPrograms] = useState([]);
    const [getPage, setPage] = useState(1);
    const [getName, setName] = useState('');
    const [getLength, setLength] = useState('');
    const [getCategory, setCategory] = useState('');

    const [datos, setDatos] = useState ([
        { nombre: 'Juan', fechaInicio: "2023-10-30T00:00:00.000Z", fechaFin: "2023-11-01T00:00:00.000Z", fechaLímite: "2023-10-31T00:00:00.000Z", codigoP: 76100, descripcion: "Proyecto3"},
        { nombre: 'Juan', fechaInicio: "2023-10-30T00:00:00.000Z", fechaFin: "2023-11-01T00:00:00.000Z", fechaLímite: "2023-10-31T00:00:00.000Z", codigoP: 76100, descripcion: "Proyecto3"},
        { nombre: 'Juan', fechaInicio: "2023-10-30T00:00:00.000Z", fechaFin: "2023-11-01T00:00:00.000Z", fechaLímite: "2023-10-31T00:00:00.000Z", codigoP: 76100, descripcion: "Proyecto3"},
    ])

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
                    {datos.map((item) => (
                    <tr key={item.id}>
                        <td>{item.nombre}</td>
                        <td>{item.fechaInicio}</td>
                        <td>{item.fechaFin}</td>
                        <td>{item.fechaLímite}</td>
                        <td>{item.codigoP}</td>
                        <td>{item.descripcion}</td>
                    </tr>
                    ))}
                </tbody>
            
            </table>

            
        </Fragment>
    );
};

export default ConsultProjects;
