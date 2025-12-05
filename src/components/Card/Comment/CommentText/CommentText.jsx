import { useReducer } from 'react';
import './CommentText.css';

const SET_COMMENT_TEXT = 'SET_COMMENT_TEXT';
const SET_IS_EDIT = 'SET_IS_EDIT';

const fieldReducer = (state, action) => {
  switch(action.type) {
     case SET_COMMENT_TEXT:
      return {
        ...state,
        commentText: action.value
      };
     case SET_IS_EDIT:
      return {
        ...state,
        isEdit: action.value
      };
     default:
      return state;
  }
};

const CommentText = (props) => {

    const initialState = {
        commentText: props.commentText,
        isEdit: false
      };

    const [state, dispatch] = useReducer(fieldReducer, initialState);
    const {commentText, isEdit} = state;

    const setCommentText = (value) => {
        dispatch({type: SET_COMMENT_TEXT, value});
    };

    const setIsEdit = (value) => {
        dispatch({type: SET_IS_EDIT, value});
    };

    const resetField = () => {
        setIsEdit(false);
        setCommentText(props.commentText);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onEditText(commentText);
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
                <button onClick={() => resetField()}>Отмена</button>
            </form>
        </div>
    )
}

export default CommentText;
