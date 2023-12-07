import React, { useState, useEffect, useContext } from 'react';
import { FireError } from '../../../utils/alertHandler';
import { getInscription } from '../../../client/inscriptions';
import LoaderPages from './Loader/LoaderPages';
import NavHistory from "../../../components/NavHistory/NavHistory";
import Title from "../../../components/Title/Title";
import Icons from "../../../icons/index";
import Table from "../../../components/Table/CommentTable";
import styles from "./Inscription.module.css";
import { ContentContext } from "../Content";

function Comment() {

    const [inscriptions, setInscriptions] = useState([]);    
    const { modalDispatch, needsToDoRefresh, setNeedsToDoRefresh } = useContext(ContentContext);

    const [isLoading, setIsLoading] = useState(true);

    const fetchForData = async () => {
        try {
            setIsLoading(true);
            const posts = await getInscription();
            setInscriptions(posts);
            setIsLoading(false);            
        } catch (error) {
            setIsLoading(false);
            FireError(error.response.data.message);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line
        fetchForData();
    }, []);

    useEffect(() => {
        if (needsToDoRefresh) {
            fetchForData();
            setNeedsToDoRefresh(false);
        };
    }, [needsToDoRefresh]);

    const getMatrix = () => {
      if (inscriptions.length === 0) return [];

      const matrix = []

      
      for (let i = 0; i < inscriptions.length; i++) {        
        const row = {};
        const item = inscriptions[i];

        if ( item.course == null || item.user == null) continue;

        row["user"] = item.user.firstName + " " + item.user.lastName
        row["course"] = item.course.name        
        row["voucher"] = item.voucher
        
        matrix.push(row);
      }

      return matrix;
  };

  const handleDelete = (i) =>{
    try {
      console.log("eliminado", i)
    } catch { };
  }

  const handleAcept = (i) =>{
    try {
      console.log("aceptado", i)
    } catch { };
  }
    
    return (
        <div>
            <NavHistory>
                Gestión de contenido / Inscripciones 
            </NavHistory>
            <Title>
                {Icons.Inscription()}
                Lista de inscripciones pendientes
            </Title>
            {isLoading && (
                <LoaderPages />
            )}
            {!isLoading && (
                <>
                    <h2>
                        Inscripciones
                    </h2>

                    <Table
                        matrixData={getMatrix()}
                        arrayHeaders={[
                            "Usuario", // 20
                            "Curso / taller", // 22.5                            
                            "Voucher", // 10
                        ]}
                        percentages={[40, 40, 20]}
                        handleDelete={handleDelete}
                        handleEdit={handleAcept}
                    />

                    
                </>
            )}
        </div>
    );

}

export default Comment;
