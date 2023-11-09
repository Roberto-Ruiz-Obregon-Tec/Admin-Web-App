import React from 'react';
import { FireError } from '../utils/alertHandler';
import '../styles/wrappers/wrap.css';

function UploadImage(props) {
    const {
        id,

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
        <div className={`container_page_wrapper_images_upload`}>
            <label htmlFor={id}>
                Añadir imagen
            </label>
            <input  accept="image/png, image/jpeg, image/jpg" onChange={(e) => {
                addImage(e);
            }} type="file" name="img" id={id} />
        </div>
    );
}

export default UploadImage;
