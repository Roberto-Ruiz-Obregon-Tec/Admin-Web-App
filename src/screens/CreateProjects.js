import React from 'react';
import ReturnLink from "../components/ReturnLink";
import '../styles/verCursos.css';
import '../styles/wrappers/wrap.css';

const CreateProjects = () => {

    return (
        <div className='container_page_wrapper'>
            <div className='header-container'>
                <h4>Inicio / Proyectos Disponibles / Crear Proyecto</h4>
            </div>
            <ReturnLink href="/consultprojects" />
        </div>
    );
};

export default CreateProjects;
