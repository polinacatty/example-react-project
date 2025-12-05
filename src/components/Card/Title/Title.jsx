import { useReducer } from 'react';
import './Title.css';

const SET_TITLE = 'SET_TITLE';
const SET_IS_EDIT = 'SET_IS_EDIT';

const fieldReducer = (state, action) => {
  switch(action.type) {
     case SET_TITLE:
      return {
        ...state,
        title: action.value
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

const Title = (props) => {

    const initialState = {
        title: props.title,
        isEdit: false
      };

    const [state, dispatch] = useReducer(fieldReducer, initialState);
    const {title, isEdit} = state;

    const setTitle = (value) => {
        dispatch({type: SET_TITLE, value});
    };

    const setIsEdit = (value) => {
        dispatch({type: SET_IS_EDIT, value});
    };

    const resetField = () => {
        setIsEdit(false);    
        setTitle(props.title);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onEditTitle(title);
        setIsEdit(false);
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
                <button onClick={() => resetField()}>Отмена</button>
            </form>
        </div>
    )
}

export default Title;