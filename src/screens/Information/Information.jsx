import React, {useState, useEffect, Fragment} from 'react';
import { FireError } from '../../utils/alertHandler';
import { getInformation } from '../../client/information';

import Title from "../../components/Title/Title";
import Icons from "../../icons/index";
import ListItem from '../../components/ListItem/ListItem';
import GenericLink from '../../components/Links/Generic/Generic';
import LoaderPages from './Loader/LoaderPages'

import styles from "./Information.module.css";


export default function Information() {

  const [info, setInfo] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect( () => {
    (async () => {
      try {
        setIsLoading(true);
        const infoData = await getInformation();                
        setIsLoading(false);
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
      {isLoading && <LoaderPages />}
          {!isLoading && (
            <>
        <h2>Informacion sobre nosotros</h2>

        <div>
          <h3>Direccion</h3>          

          {info.map((info, index) => {
            return (
              <Fragment key={index}>
                  <ListItem               
                  icon = {Icons.location()}
                  content = {info.location} />
              </Fragment>              
            )
          })}
          
        </div>    

        <div>
          
          <h3>Numeros de telefono de contacto</h3>          

          {info.map((info, index) => {
            return (
              <Fragment key={index}>
                <ListItem 
                icon = {Icons.telephone()}
                content = {info.phone} />
              </Fragment>
            )
          })}
          
        </div>   
        <div>
          <h3>Redes Sociales</h3>          

          {info.map((info, index) => {
            return (
              <Fragment key={index}>
                <ListItem 
                icon = {Icons.facebook()}
                content = {
                <GenericLink 
                  href={info.facebook}
                  name = {"Facebook"} />
              }  />
              </Fragment>
            )
          })}

          {info.map((info, index) => {
            return (
              <Fragment key={index}>
                <ListItem 
              icon = {Icons.instagram()}
              content = {
                <GenericLink 
                  href={info.instagram}
                  name = {"Instagram"} />
              }  />
              </Fragment>
            )
          })}

          {info.map((info, index) => {
            return (
              <Fragment key={index}>
                <ListItem 
              icon = {Icons.twitter()}
              content = {
                <GenericLink 
                  href={info.twitter}
                  name = {"Twitter"} />
              }  />
              </Fragment>
            )
          })}

          {info.map((info, index) => {
            return (
              <Fragment key={index}>
                <ListItem 
              icon = {Icons.tiktok()}
              content = {
                <GenericLink 
                  href={info.tiktok}
                  name = {"Tiktok"} />
              }  />
              </Fragment>
            )
          })}
          
        </div> 
        </>
        )}     
      </div>

       
      
		</div>
	)
}