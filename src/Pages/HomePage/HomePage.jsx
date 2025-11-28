import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {

    useEffect(() => {
        console.log('Пользователь посетил домашнюю страницу');
        console.info(`Время посещения: ${new Date().toLocaleString()}`);
    }, []);

    return (
        <div className='HomePage'>
            <h1>
                Домашняя страница
            </h1>
            <Link to='/articles'>
                Смотреть карточки
            </Link>
        </div>
    )
}

export default HomePage;
