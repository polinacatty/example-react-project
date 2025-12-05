import { useReducer } from 'react';
import './AddArticleForm.css';

const SET_TITLE = 'SET_TITLE';
const SET_TEXT = 'SET_TEXT';
const SET_IS_VISIBLE = 'SET_IS_VISIBLE';
const RESET_FORM = 'RESET_FORM';

const initialState = {
  title: '',
  text: '',
  isVisible: false
};

const formReducer = (state, action) => {
  switch (action.type) {
    case SET_TITLE:
      return {
        ...state,
        title: action.value
      };
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

const AddArticleForm = ({ onAddArticle }) => {

  const [state, dispatch] = useReducer(formReducer, initialState);
  const { title, text, isVisible } = state;

  const setTitle = (value) => {
    dispatch({ type: SET_TITLE, value });
  };

  const setText = (value) => {
    dispatch({ type: SET_TEXT, value });
  };

  const setIsVisible = (value) => {
    dispatch({ type: SET_IS_VISIBLE, value });
  };

  const resetForm = () => {
    dispatch({ type: RESET_FORM });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddArticle({
      articleId: Date.now(),
      title: title,
      text: text,
      currentLikes: 0,
      commentsCount: 0,
      isLiked: false,
      createdAt: new Date().toISOString()
    });

    resetForm();
  };

  if (!isVisible) {
    return (
      <button
        className='toggleButton'
        onClick={() => setIsVisible(true)}
      >
        Добавить карточку
      </button>
    );
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <h3 className='title'>Новая карточка</h3>
      <input
        placeholder="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className='input'
        required
      />
      <textarea
        placeholder="Текст"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className='textarea'
      />
      <div className='buttons'>
        <button type="submit" className='submitButton'>
          Создать карточку
        </button>
        <button
          className='cancelButton'
          onClick={() => resetForm()}
        >
          Отмена
        </button>
      </div>
    </form>
  );
};

export default AddArticleForm;
