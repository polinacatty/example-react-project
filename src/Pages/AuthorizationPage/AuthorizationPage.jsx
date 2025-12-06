import React from 'react';
import './AuthorizationPage.css';
import AuthForm from './../../components/AuthForm/AuthForm';
import { Link } from 'react-router-dom';

const AuthorizationPage = () => {

    return (
        <dev>
            <h1>Авторизация</h1>
            <AuthForm />
            <dev>
                <Link to="/">
                    Назад
                </Link>
            </dev>
        </dev>
    );
}

export default AuthorizationPage;
