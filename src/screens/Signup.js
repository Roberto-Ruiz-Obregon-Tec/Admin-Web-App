import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { FireError, FireSucess, FireQuestion } from '../utils/alertHandler';
import { postSignup } from '../client/authentication';
import '../styles/auth.css';

const SignupForm = () => {
    const [fname, setFName] = useState('');
    const [lastname, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [cp, setCp] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const navigate = useNavigate();

    /**
     * Handles the form submission for user signup by preventing the default form submission behavior, checking that the password and passwordConfirm values match, and sending a POST request to the '/admin/auth/signup' endpoint with the user's name, email, password, and passwordConfirm data. 
     * 
     * @param {Event} e - The form submission event that triggered the function.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordConfirm !== password) {
            FireError('Las contraseñas no coinciden.');
            return;
        }
        try {
            const data = {
                firstName: fname,
                lastName: lastname,
                age: age,
                gender: gender,
                email: email,
                postalCode: cp,
                password: password
            };
            const response = await postSignup(data);
            if (response.status === 'success') {
                FireSucess('Has creado un admin exitosamente.');
            }
        } catch (error) {
            if ([400, 401].includes(error.response.status)) FireError(error.response.data.message);
            else FireError('Ocurrió un error. Por favor intenta de nuevo.');
        }
    };

    return (
        <div className='auth-container'>
            <h1>Registrar administradores</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='name'>Primer Nombre</label>
                    <input
                        type='text'
                        id='firstName'
                        required
                        value={fname}
                        onChange={(e) => setFName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='name'>Apellidos</label>
                    <input
                        type='text'
                        id='lastName'
                        required
                        value={lastname}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='name'>Edad</label>
                    <input
                        type='text'
                        id='age'
                        required
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </div>
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
                    <label htmlFor='email'>Género</label>
                    <input
                        type='text'
                        id='gender'
                        required
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='email'>Código postal</label>
                    <input
                        type='text'
                        id='postalCode'
                        required
                        value={cp}
                        onChange={(e) => setCp(e.target.value)}
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
                <div>
                    <label htmlFor='passwordConfirm'>Confirmar contraseña</label>
                    <input
                        type='password'
                        id='passwordConfirm'
                        required
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                </div>
                <button type='submit'>Registrarse</button>
            </form>
            {/* <section>
                <Link to='/login'>Iniciar sesión</Link>
                <Link to='/cambiarContrasena'>Olvidé mi contraseña</Link>
            </section> */}
        </div>
    );
};

export default SignupForm;
