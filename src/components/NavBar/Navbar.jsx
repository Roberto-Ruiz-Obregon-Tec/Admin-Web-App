import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FireQuestion } from '../../utils/alertHandler';
import { LogOut } from 'react-feather';
import { logOut } from '../../utils/auth';
import routes from '../../routes';
import styles from "./NavBar.module.css";
import Icons from "../../icons/index";

function Navbar() {
    const navigate = useNavigate();

    const logOutHandler = async () => {
        const confirmation = await FireQuestion(
            '¿Está seguro de que quiere cerrar sesión?',
            'Tendrá que iniciar sesión de nuevo para volver a entrar.',
            'Cerrar sesión'
        );
        if (confirmation.isDismissed) return;
        logOut()
    };

    return (
        <div className={styles.navbar_container}>
            <div className={styles.navbar}>
                <div className={styles.navbar_left}>
                    {routes
                        .filter((route) => route.isPrivate && route.inNavbar)
                        .map((route) => {

                            if (route.path === "/") {
                                return (
                                    <img
                                        onClick={() => {
                                            navigate("/");
                                        }} src="/logoFundacion.png" width={50} />
                                )
                            }

                            return (
                                <a
                                    key={route.path}
                                    className={styles.button}
                                    onClick={() => navigate(route.path)}
                                >
                                    {route.svg && (
                                        <>
                                            {Icons[route.svg]()}
                                        </>
                                    )}
                                    {route.name}
                                </a>
                            )
                        })}
                </div>
                <div className={styles.navbar_logout}>
                    <a onClick={logOutHandler}>
                        <span>Cerrar sesión</span>
                        <LogOut color="white" />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
