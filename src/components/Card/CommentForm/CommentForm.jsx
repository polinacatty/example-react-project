import { useReducer} from 'react';
import './CommentForm.css';
import { checkAuth, getAuthData } from './../../../api/fakeApi';

const SET_TEXT = 'SET_TEXT';
const SET_IS_VISIBLE = 'SET_IS_VISIBLE';
const RESET_FORM = 'RESET_FORM';

const initialState = {
  text: '',
  isVisible: false
};

const formReducer = (state, action) => {
  switch(action.type) {
     case SET_TEXT:
      return {
        ...state,
        text: action.value
      };
     case SET_IS_VISIBLE:
      return {
        ...state,
        isVisible: action.value
      };
     case RESET_FORM:
      return initialState;
     default:
      return state;
  }
};

const getAuthor = () => {
    return checkAuth() ? getAuthData().login : 'Аноним';
};

const AddCommentForm = (props) => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const {text, isVisible} = state;

  const setText = (value) => {
    dispatch({ type: SET_TEXT, value });
  };

  const setIsVisible = (value) => {
    dispatch({type: SET_IS_VISIBLE, value})
  };

  const resetForm = (value) => {
    dispatch({type: RESET_FORM})
  };

  const onSubmit = (e) => {
    e.preventDefault();

    props.onAddComment({
        commentId: Date.now(),
        author: getAuthor(),
        articleId: props.articleId,
        text: text,
        currentLikes: 0,
        isLiked: false,
        createdAt: new Date().toISOString()
    });

    resetForm();
  };

  if (!isVisible) {
    return (
      <button 
        onClick={() => setIsVisible(true)}
      >
        Добавить комментарий
      </button>
    );
  }

  return (
    <form className='commentform' onSubmit={onSubmit}>
      <h3>Новый комментарий</h3>
      <textarea
        placeholder="Текст"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <div className='commentbuttons'>
        <button type="submit" className='commentsubmitButton'>
          Отправить комментарий
        </button>
        <button 
          className='commentcancelButton'
          onClick={() => resetForm()}
        >
          Отмена
        </button>
      </div>
    </form>
  );
};

export default AddCommentForm;
