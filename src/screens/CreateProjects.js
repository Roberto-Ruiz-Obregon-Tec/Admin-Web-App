import React, { useState, useEffect } from 'react';
import BtnToAdd from "../components/AddAdminContentBtn";

import { getProgram } from '../client/availableProj'
import { FireError } from '../utils/alertHandler';
import '../styles/verCursos.css';
import '../styles/availableProj.css'
import '../styles/wrappers/wrap.css';

const CreateProjects = () => {

    const [avaliableP, setavailableP] = useState ([]);

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const proj = await getProgram();
    //             setavailableP(proj);
    //         } catch (error) {
    //             FireError(error.response.message);
    //         }
    //     })();
    // }, []);

    return (
        <div className='container_page_wrapper'>
            Hola :)
        </div>
    );
};

export default CreateProjects;
