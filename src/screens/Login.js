import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { FireError } from '../utils/alertHandler';
import { postLogin } from '../client/authentication';
import Button from "../components/new/Button";
import { setToken, setAdminUserSaved, isAuthenticated } from '../utils/auth';
import axios from 'axios';
import '../styles/auth.css';
import '../styles/wrappers/wrap.css';

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
                navigate('/');
            }
        } catch (error) {
            setIsLoading(false);
            if (error.response.status === 401) FireError(error.response.data.message);
            else FireError('Ocurrió un error. Por favor intenta de nuevo.');
        }
    };

    if (isAuthenticated()) return <Navigate to='/' />;

    return (
        <div className='container_page_wrapper_no_nav' style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <div className='auth-container'>
                <h1>Iniciar Sesión</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            id='email'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Contraseña</label>
                        <input
                            type='password'
                            id='password'
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button isAnimationLoading isLoading={isLoading} type='submit'>Entrar</Button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
