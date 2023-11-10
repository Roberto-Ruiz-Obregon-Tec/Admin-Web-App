import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FireError, FireSucess } from '../../utils/alertHandler';
import { postSignup } from '../../client/authentication';
import styles from "./SignUp.module.css";
import { PATH_USERS } from "../../config/paths";

import Card from "../../components/ShadowCard/ShadowCard";
import InputText from "../../components/Form/Input/Text/Text";
import Button from "../../components/Form/Button/Button";
import NavHistory from "../../components/NavHistory/NavHistory";


const SignupForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [fname, setFName] = useState('');
    const [lastname, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const navigate = useNavigate();

    const validate = () => {
        if (
            fname.trim() === "" ||
            lastname.trim() === "" ||
            age.trim() === "" ||
            email.trim() === "" ||
            gender.trim() === "" ||
            postalCode.trim() === "" ||
            password.trim() === "" ||
            passwordConfirm.trim() === ""
        ) {
            FireError('No puedes dejar campos vacíos.');
            return false;
        }
        if (isNaN(age)) {
            FireError('La edad debe de ser un número.');
            return false;
        }
        if (gender !== "Hombre" &&
            gender !== "Mujer" &&
            gender !== "Otro"
        ) {
            FireError('El género debe de ser válido.');
            return false;
        }
        if (passwordConfirm !== password) {
            FireError('Las contraseñas no coinciden.');
            return false;
        }
        if (postalCode.length !== 5) {
            FireError('El código postal debe de ser de 5 números.');
            return false;
        }
        if (isNaN(postalCode)) {
            FireError('El código postal debe de ser un número.');
            return false;
        }
        return true;
    };

    /**
     * Handles the form submission for user signup by preventing the default form submission behavior, checking that the password and passwordConfirm values match, and sending a POST request to the '/admin/auth/signup' endpoint with the user's name, email, password, and passwordConfirm data. 
     * 
     * @param {Event} e - The form submission event that triggered the function.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            const data = {
                firstName: fname,
                lastName: lastname,
                age: age,
                gender: gender,
                email: email,
                postalCode: postalCode,
                password: password
            };
            setIsLoading(true);
            const response = await postSignup(data);
            setIsLoading(false);
            if (response.status === 'success') {
                FireSucess('Has creado un administrador exitosamente.');
                navigate(PATH_USERS);
            } else {
                FireError('Ha habido un error.');
            }
        } catch (error) {
            setIsLoading(false);
            if ([400, 401].includes(error.response.status)) FireError(error.response.data.message);
            else FireError('Ocurrió un error. Por favor intenta de nuevo.');
        }
    };

    return (
        <div>
            <NavHistory>
                Inicio / Añadir administradores
            </NavHistory>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <Card>
                        <h1>
                            Registrar administrador
                        </h1>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <InputText
                                id="new-admin-name"
                                text="Primer Nombre"
                                value={fname}
                                setValue={setFName}
                            />
                            <InputText
                                id="new-admin-last-name"
                                text="Apellidos"
                                value={lastname}
                                setValue={setLastName}
                            />
                            <InputText
                                id="new-admin-age"
                                text="Edad"
                                value={age}
                                setValue={setAge}
                            />
                            <InputText
                                id="new-admin-email"
                                text="Correo electrónico"
                                value={email}
                                setValue={setEmail}
                                type='email'
                            />
                            <InputText
                                id="new-admin-age"
                                text="Género"
                                value={gender}
                                setValue={setGender}
                            />
                            <InputText
                                id="new-admin-postal-code"
                                text="Código postal"
                                value={postalCode}
                                setValue={setPostalCode}
                            />
                            <InputText
                                id="new-admin-password"
                                text="Contraseña"
                                value={password}
                                setValue={setPassword}
                                type="password"
                            />
                            <InputText
                                id="new-admin-confirm-password"
                                text="Confirmar contraseña"
                                value={passwordConfirm}
                                setValue={setPasswordConfirm}
                                type="password"
                            />
                            <Button isAnimationLoading isLoading={isLoading} type='submit'>
                                Crear administrador
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;
