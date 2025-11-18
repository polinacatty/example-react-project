import { useState } from 'react';
import './Title.css';

const Title = (props) => {

    const [isEdit, setIsEdit] = useState(false);
    const [title, setTitle] = useState(props.title);

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onEditTitle(title);
        setIsEdit(false)
    };

    if (!isEdit) {
        return (
            <div className='Title'>
                {props.title}
                <button onClick={() => setIsEdit(true)}>
                    редактировать
                </button>
            </div>
        )
    }

    return (
        <div className='Title'>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Заголовок"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='input'
                    required
                />
                <button type="submit">Сохранить</button>
                <button onClick={() => {setIsEdit(false); setTitle(props.title)}}>Отмена</button>
            </form>
        </div>
    )
}


export default Title;