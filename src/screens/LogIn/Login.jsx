import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { FireError } from '../../utils/alertHandler';
import { postLogin } from '../../client/authentication';
import Button from "../../components/Form/Button/Button";
import { setToken, setAdminUserSaved, isAuthenticated } from '../../utils/auth';
import Card from "../../components/ShadowCard/ShadowCard";
import InputText from "../../components/Form/Input/Text/Text";
import axios from 'axios';
import styles from "./LogIn.module.css";
import { PATH_HOME } from "../../config/paths";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await postLogin(email, password);
            setIsLoading(false);
            if (response.status === 'success') {
                axios.defaults.headers.common[
                    'Authorization'
                ] = `Bearer ${response.token}`;

                setToken(response.token);
                setAdminUserSaved(response.data.user);
                navigate(PATH_HOME);
            }
        } catch (error) {
            setIsLoading(false);
            if (error.response.status === 401) FireError(error.response.data.message);
            else FireError('Ocurrió un error. Por favor intenta de nuevo.');
        }
    };

    if (isAuthenticated()) return <Navigate to={PATH_HOME} />;

    return (
        <div className={`container_page_wrapper_no_nav ${styles.container}`}>
            <div className={styles.wrapper}>
                <Card>
                    <h1>Iniciar Sesión</h1>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <InputText
                            id="log-in-email"
                            text="Correo electrónico"
                            value={email}
                            setValue={setEmail}
                        />
                        <InputText
                            id="log-in-passwod"
                            text="Contraseña"
                            value={password}
                            setValue={setPassword}
                            type='password'
                        />
                        <Button isAnimationLoading isLoading={isLoading} type='submit'>Entrar</Button>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default LoginForm;
