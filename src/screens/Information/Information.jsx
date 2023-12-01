import React, { useState, useEffect, useRef } from 'react';
import { FireError } from '../../utils/alertHandler';
import { getInformation, updateInformation } from '../../client/information';

import Title from "../../components/Title/Title";
import Icons from "../../icons/index";
import ListItem from "../../components/ListItem/ListItem";
import LoaderPages from './Loader/LoaderPages'

import styles from "./Information.module.css";


export default function Information() {

	const [info, setInfo] = useState({})
	const hasChanged = useRef(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				setIsLoading(true);
				const infoData = await getInformation();
				setIsLoading(false);

				if (infoData.length == 0) {
					FireError("Error al obtener la información de la organización");
					return;
				};

				setInfo(infoData[0]);
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
		const res = await updateInformation(info);
		if (res.status !== "success") {
			FireError("Error al actualizar la información de la organización");
		}
		setIsLoading(false);
	};

	return (
		<div className={`height_window ${styles.wrapper_info}`}>
			<div>
				<img src="/logoFundacion.png" alt="Logo fundacion" />
				<Title>
					Fundacion Roberto Ruiz Obregon
				</Title>
			</div>

			<div className={styles.wrapper_detail}>
				{isLoading && <LoaderPages />}
				{!isLoading && (
					<>
						<h2>Información sobre nosotros</h2>
						<div>
							<h3>Dirección</h3>
							<ListItem
								onChangeCallback={changeValue}
								submitUpdate={submitUpdate}
								name="location"
								icon={Icons.location()}
								content={info.location} />
						</div>
						<div>
							<h3>Números de teléfono de contacto</h3>
							<ListItem
								onChangeCallback={changeValue}
								submitUpdate={submitUpdate}
								name="phone"
								icon={Icons.telephone()}
								content={info.phone} />
						</div>
						<div>
							<h3>Redes Sociales</h3>
							<ListItem
								onChangeCallback={changeValue}
								submitUpdate={submitUpdate}
								name="facebook"
								isLink={true}
								href={info.facebook}
								icon={Icons.facebook()}
								content={info.facebook} />
							<ListItem
								onChangeCallback={changeValue}
								submitUpdate={submitUpdate}
								name="instagram"
								isLink={true}
								href={info.instagram}
								icon={Icons.instagram()}
								content={info.instagram} />
							<ListItem
								onChangeCallback={changeValue}
								submitUpdate={submitUpdate}
								name="twitter"
								isLink={true}
								href={info.twitter}
								icon={Icons.twitter()}
								content={info.twitter} />
							<ListItem
								onChangeCallback={changeValue}
								submitUpdate={submitUpdate}
								name="tiktok"
								isLink={true}
								href={info.tiktok}
								icon={Icons.tiktok()}
								content={info.tiktok} />
						</div>
					</>
				)}
			</div>
		</div>
	)
}