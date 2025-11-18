import { useState } from 'react';
import './Text.css';

const Text = (props) => {

    const [isEdit, setIsEdit] = useState(false);
    const [text, setText] = useState(props.text);

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onEditText(text);
        setIsEdit(false)
    };

    if (!isEdit) {
        return (
            <div className='Text'>
                {props.text}
                <button onClick={() => setIsEdit(true)}>
                    редактировать
                </button>
            </div>
        )
    }

    return (
        <div className='Text'>
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Заголовок"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className='input'
                />
                <button type="submit">Сохранить</button>
                <button onClick={() => {setIsEdit(false); setText(props.text)}}>Отмена</button>
            </form>
        </div>
    )
}


export default Text;