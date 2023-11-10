// import SendMail from './screens/SendMail';
// import SignupForm from './screens/Signup';
// import ForgotPassword from './screens/forgotPassword';
// import AddCourse from './screens/AddCourse';
// import EditCourse from './screens/EditCourse';
// import Courses from './screens/Courses';
// import EditProgram from './screens/EditProgram';
// import Inscriptions from './screens/Inscriptions';
// import Topics from './screens/Topics';
import LoginForm from './screens/LogIn/Login';
import Certifications from './screens/Certifications/Certifications';
import Dashboard from './screens/Dashboard/Dashboard';
import ConsultProjects from './screens/Projects/Projects';
import CreateProjects from './screens/Projects/CreateProjects/CreateProjects';
import Usuarios from './screens/Users/Users';

import {
    PATH_HOME,
    PATH_CERTIFICATIONS,
    PATH_USERS,
    PATH_PROJECTS,
    PATH_LOGIN,
    PATH_CREATE_PROJECTS
} from "./config/paths";

const routes = [
    {
        path: PATH_HOME,
        name: 'Inicio',
        Component: Dashboard,
        isPrivate: true,
        inNavbar: true
    },
    {
        path: PATH_CERTIFICATIONS,
        name: 'Certificaciones',
        Component: Certifications,
        isPrivate: true,
        inNavbar: true,
        svg: "certify"
    },
    {
        path: PATH_USERS,
        name: 'Usuarios',
        Component: Usuarios,
        isPrivate: true,
        inNavbar: true,
        svg: "users"
    },
    {
        path: PATH_PROJECTS,
        name: 'Proyectos',
        Component: ConsultProjects,
        isPrivate: true,
        inNavbar: true,
        svg: "projects"
    },
    {
        path: PATH_LOGIN,
        name: 'Iniciar sesión',
        Component: LoginForm,
        isPrivate: false,
        inNavbar: false,
    },
    {
        path: PATH_CREATE_PROJECTS,
        name: 'Crear proyectos',
        Component: CreateProjects,
        isPrivate: true, 
        inNavbar: false,
    }
    // {
    //     path: PATH_ANNOUNCES,
    //     name: 'Anuncios',
    //     Component: SendMail,
    //     isPrivate: true,
    //     inNavbar: true,
    //     svg: "announce.svg"
    // },
    // {
    //     path: PATH_CREATE_COURSE,
    //     name: 'Agregar curso',
    //     Component: AddCourse,
    //     isPrivate: true,
    //     inNavbar: false,
    // },
    // {
    //     path: PATH_ID_COURSE,
    //     name: 'Editar curso',
    //     Component: EditCourse,
    //     isPrivate: true,
    //     inNavbar: false,
    // },
    // {
    //     path: PATH_ID_INSCRIPTIONS,
    //     name: 'Ver inscripciones al curso',
    //     Component: Inscriptions,
    //     isPrivate: true,
    //     inNavbar: false,
    // },
    // {
    //     path: '/cursos',
    //     name: 'Cursos',
    //     Component: Courses,
    //     isPrivate: true,
    //     inNavbar: true,
    // },
    // {
    //     path: '/programs/program',
    //     name: 'Crear programa',
    //     Component: EditProgram,
    //     isPrivate: true,
    //     inNavbar: false,
    // },
    // {
    //     path: '/programs/program/:id',
    //     name: 'Editar programa',
    //     Component: EditProgram,
    //     isPrivate: true,
    //     inNavbar: false,
    // },
    // {
    //     path: '/programs',
    //     name: 'Programas',
    //     Component: Programs,
    //     isPrivate: true,
    //     inNavbar: true,
    // },    
    // {
    //     path: '/intereses',
    //     name: 'Intereses',
    //     Component: Topics,
    //     isPrivate: true,
    //     inNavbar: true,
    // },
    // {
    //     path: '/admins',
    //     name: 'Administradores',
    //     Component: Admins,
    //     isPrivate: true,
    //     inNavbar: true,
    // },
    // {
    //     path: '/pagos',
    //     name: 'Pagos pendientes',
    //     Component: Payments,
    //     isPrivate: true,
    //     inNavbar: true,
    // },
    // {
    //     path: '/crear-cuenta-admin',
    //     name: 'Registrarse',
    //     Component: SignupForm,
    //     isPrivate: true,
    //     inNavbar: false,
    // },
    // {
    //     path: '/cambiarContrasena',
    //     name: 'Cambiar contraseña',
    //     Component: ForgotPassword,
    //     isPrivate: true,
    //     inNavbar: false,
    // },
];

export default routes;
