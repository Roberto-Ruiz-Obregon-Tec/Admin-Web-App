import React, { useState, useEffect, useRef } from 'react';
import { FireError } from '../../utils/alertHandler';
import { patchUser } from '../../client/usuarios';
import { getMe } from '../../client/authentication';

import Title from "../../components/Title/Title";
import ListItem from "../../components/ListItem/ListItem";
import LoaderPages from './Loader/LoaderPages'

import styles from "./profile.module.css";

export default function Profile (){
  const [info, setInfo] = useState({})
	const hasChanged = useRef(false);
	const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
		(async () => {
			try {
				setIsLoading(true);
				const infoData = await getMe();
        console.log(infoData)
				setIsLoading(false);

				setInfo(infoData);
			} catch (error) {
				FireError(error.response.data.message);
			}
		})()
	}, []);

	const changeValue = async (
		label,
		newValue
	) => {
		for (let i = 0; i < Object.keys(info).length; i++) {
			const key = Object.keys(info)[i];
			const value = info[key];

			if (key === "id") {
				delete info["id"];
				info["_id"] = value;
			}
			if (key === label) {
				info[label] = newValue;
			}
		}

		const body = { ...info };
		hasChanged.current = true;
		setInfo(body);
	};

	const submitUpdate = async () => {
		if (!hasChanged.current) return;
		setIsLoading(true);
		const res = await patchUser(info);
		if (res.status !== "success") {
			FireError("Error al actualizar la información de la organización");
		}
		setIsLoading(false);
	};

  return (
    <div>            
      {isLoading && <LoaderPages />}
				{!isLoading && (          
					<>						
            <div className={styles.container} >
              <Title>
                Mi perfil
              </Title>              
              <div>
                <h3>Nombre</h3>
                <ListItem
                  onChangeCallback={changeValue}
                  submitUpdate={submitUpdate}
                  name="firstName"								
                  content={info.firstName} />
              </div>					
              <div>
                <h3>Apellidos</h3>
                <ListItem
                  onChangeCallback={changeValue}
                  submitUpdate={submitUpdate}
                  name="lastName"								
                  content={info.lastName} />
              </div>	
              <div>
                <h3>Edad</h3>
                <ListItem
                  onChangeCallback={changeValue}
                  submitUpdate={submitUpdate}
                  name="age"								
                  content={info.age} />
              </div>		
              <div>
                <h3>Correo</h3>
                <ListItem
                  onChangeCallback={changeValue}
                  submitUpdate={submitUpdate}
                  name="email"								
                  content={info.email} />
              </div>	
              
              <div>
                {info.occupation !== undefined && (
                  <div>
                    <h3>Ocupacion</h3>
                    <ListItem
                      onChangeCallback={changeValue}
                      submitUpdate={submitUpdate}
                      name="occupation"
                      content={info.occupation}
                    />
                  </div>
                )}
              </div>		            
              <div>
                {info.company !== undefined && (
                  <div>                
                    <h3>Empresa</h3>
                    <ListItem
                      onChangeCallback={changeValue}
                      submitUpdate={submitUpdate}
                      name="company"								
                      content={info.company} />
                  </div>
                )}
                
              </div>		
              <div>
                <h3>Codigo postal</h3>
                <ListItem
                  onChangeCallback={changeValue}
                  submitUpdate={submitUpdate}
                  name="postalCode"								
                  content={info.postalCode} />
              </div>		
            </div>
					</>
				)}
    </div>
  )

}