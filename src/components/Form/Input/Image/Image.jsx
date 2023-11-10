import React from 'react';
import { FireError } from '../../../../utils/alertHandler';
import styles from "./Image.module.css";

function UploadImage(props) {
    const {
        id,
        file,

        setFile,
        setUrl
    } = props;

    const addImage = (e) => {
        try {
            if (e.target.files === null) return;
            if (e.target.files.length === 0) return;

            const urlImage = URL.createObjectURL(e.target.files[0]);
            var allowedExtensions = /(.jpg|.jpeg|.png)$/i;
            if (!allowedExtensions.exec(e.target.value)) {
                FireError('La imagen no tiene extension .png .jpeg o .jpg');
                return;
            }

            const file = e.target.files[0];
            if (file === undefined || file === null) return;

            if (setFile !== undefined) {
                setFile(file);
            }
            if (setUrl !== undefined) {
                setUrl(urlImage);
            }
        } catch (error) {
            console.error(error);
            FireError('Algo ocurrió mal');
        }
    };

    return (
        <div className={`${styles.container_page_wrapper_images_upload}`}>
            <label style={{
                backgroundColor: file === null ? "#9A9A9A" : "#3B8439"
            }} htmlFor={id}>
                {file === null ? "Añadir imagen" : "Imagen subida"}

                {file !== null && (
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                        <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
                    </svg>
                )}
            </label>
            <input accept="image/png, image/jpeg, image/jpg" onChange={(e) => {
                addImage(e);
            }} type="file" name="img" id={id} />
        </div>
    );
}

export default UploadImage;
