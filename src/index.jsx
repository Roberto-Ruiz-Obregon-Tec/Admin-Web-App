import React from 'react';
import ReactDOM from 'react-dom';
import Redirect from './components/Redirect/Redirect';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar/Navbar';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import {
    PATH_HOME
} from './config/paths';
import routes from './routes';

import "./styles/styles.css";

function App() {
    return (
        <div className='container_page_wrapper'>
            <Routes>
                {routes.map((route) =>
                    route.isPrivate ? (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={
                                <PrivateRoute>
                                    <Navbar />
                                    <div className={`${!route.withoutPadding && "container_page_wrapper_pages"}`}>
                                        <route.Component />
                                    </div>
                                </PrivateRoute>
                            }
                        />
                    ) : (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={<route.Component />}
                        />
                    )
                )}
                <Route
                    key={"key-404"}
                    path={"*"}
                    element={<Redirect to={PATH_HOME} />}
                />
            </Routes>
        </div>
    );
}

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);
