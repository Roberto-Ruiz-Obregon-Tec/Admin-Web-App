// import SendMail from './screens/SendMail';
// import ForgotPassword from './screens/forgotPassword';
// import AddCourse from './screens/AddCourse';
// import EditCourse from './screens/EditCourse';
// import Courses from './screens/Courses';
// import EditProgram from './screens/EditProgram';
// import Inscriptions from './screens/Inscriptions';
// import Topics from './screens/Topics';
import LoginForm from './screens/LogIn/Login';
import SignupForm from './screens/SignUp/SignUp';
import Dashboard from './screens/Dashboard/Dashboard';
import Content from './screens/Content/Content';
import Usuarios from './screens/Users/Users';
import Informacion from './screens/Information/Information';

import {
  PATH_HOME,
  PATH_USERS,
  PATH_PROJECTS,
  PATH_LOGIN,
  PATH_CREATE_PROJECTS,
  PATH_NEW_ADMIN,
  PATH_CONTENT_DASHBOARD,
  PATH_CERTIFICATIONS,
  PATH_POSTS,
  PATH_EVENTS,
  PATH_COURSES,
  PATH_CREATE_POSTS,
  PATH_CREATE_COURSE,
  PATH_INFO,
  PATH_CREATE_CERTIFICATION,
  PATH_SCHOLARSHIP,
  PATH_CREATE_SCHOLARSHIP,
  PATH_ESR,
  PATH_COMMENTS,

} from './config/paths';

const routesContent = () => {
  const keysRoutes = [
    PATH_CONTENT_DASHBOARD,
    PATH_CREATE_PROJECTS,
    PATH_CREATE_CERTIFICATION,
    PATH_PROJECTS,
    PATH_CERTIFICATIONS,
    PATH_POSTS,
    PATH_CREATE_POSTS,
    PATH_EVENTS,
    PATH_COURSES,
    PATH_CREATE_COURSE,
    PATH_ESR,    
    PATH_SCHOLARSHIP,
    PATH_CREATE_SCHOLARSHIP,
    PATH_COMMENTS
    
  ];
  const arrayJSON = [];

  for (let i = 0; i < keysRoutes.length; i++) {
    const keyRouter = keysRoutes[i];
    arrayJSON.push({
      path: keyRouter,
      name: 'Gestión de contenido',
      Component: Content,
      isPrivate: true,
      inNavbar: keyRouter === PATH_CONTENT_DASHBOARD,
      withoutPadding: true,
      svg: 'content',
    });
  }

  return arrayJSON;
};

const routes = [
  {
    path: PATH_HOME,
    name: 'Inicio',
    Component: Dashboard,
    isPrivate: true,
    inNavbar: true,
    withoutPadding: false,
  },
  {
    path: PATH_USERS,
    name: 'Usuarios',
    Component: Usuarios,
    isPrivate: true,
    inNavbar: true,
    withoutPadding: false,
    svg: 'users',
  },
  {
    path: PATH_LOGIN,
    name: 'Iniciar sesión',
    Component: LoginForm,
    isPrivate: false,
    withoutPadding: false,
    inNavbar: false,
  },
  {
    path: PATH_NEW_ADMIN,
    name: 'Añadir administradores',
    Component: SignupForm,
    isPrivate: true,
    inNavbar: true,
    withoutPadding: false,
    svg: 'newUser',
  },
  ...routesContent(),
  {
    path: PATH_INFO,
    name: 'Información',
    Component: Informacion,
    isPrivate: true,
    inNavbar: true,
    svg: 'info',
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
  //     path: '/cambiarContrasena',
  //     name: 'Cambiar contraseña',
  //     Component: ForgotPassword,
  //     isPrivate: true,
  //     inNavbar: false,
  // },
];

export default routes;
