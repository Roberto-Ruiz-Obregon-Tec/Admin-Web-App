import React, {useState, useEffect} from 'react';
import { FireError } from '../../utils/alertHandler';
import { getInformation } from '../../client/information';

import Title from "../../components/Title/Title";
import Icons from "../../icons/index";
import ListItem from '../../components/ListItem/ListItem';

import styles from "./Information.module.css";

export default function Information() {

  const [info, setInfo] = useState([])

  useEffect( () => {
    (async () => {
      try {
        const infoData = await getInformation();        
        console.log("Resultado:", infoData);
        setInfo(infoData);
      } catch ( error ){
        FireError(error.response.data.message);
      }
    })()
  }, [])


	return (
		<div className={`height_window ${styles.wrapper_info}`}>
      <div>
        <img src="/logoFundacion.png" alt = "Logo fundacion" />
        <Title>
          Fundacion Roberto Ruiz Obregon
        </Title>
      </div>

      <div className={` ${styles.wrapper_detail} `} >
        <h2>Informacion sobre nosotros</h2>
        <div>
          <h3>Numeros de telefono de contacto</h3>          

          {info.map((info, index) => {
            return (
              <ListItem 
              icon = {Icons.users()}
              content = {info.phone} />
            )
          })}
          
        </div>        
      </div>
      
		</div>
	)
}