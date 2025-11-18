import { useState } from 'react';
import './CommentText.css';

const CommentText = (props) => {

    const [isEdit, setIsEdit] = useState(false);
    const [commentText, setCommentText] = useState(props.commentText);

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onEditCommentText(commentText);
        setIsEdit(false)
    };

    if (!isEdit) {
        return (
            <div className='CommentText'>
                {props.commentAuthor} : {props.commentText}
                <button onClick={() => setIsEdit(true)}>
                    редактировать
                </button>
            </div>
        )
    }

    return (
        <div className='CommentText'>
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Заголовок"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className='input'
                />
                <button type="submit">Сохранить</button>
                <button onClick={() => {setIsEdit(false); setCommentText(props.commentText)}}>Отмена</button>
            </form>
        </div>
    )
}


export default CommentText;