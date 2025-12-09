import React from 'react';
import './Header.css';
import { checkAuth, logoutUser, getAuthData } from './../../api/fakeApi';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate('/');
    };

    return (
        <div className='Header'>
            {checkAuth() ? (
                <div>
                    <div>
                        {getAuthData().login}
                    </div>
                    <button
                        onClick={handleLogout}
                    >
                        Выйти
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => navigate('/auth')}
                >
                    Войти
                </button>
            )}
        </div>
    );
}

export default Header;
