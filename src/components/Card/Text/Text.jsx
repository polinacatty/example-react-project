import { useReducer, useState } from 'react';
import './Text.css';

const SET_TEXT = 'SET_TEXT';
const SET_IS_EDIT = 'SET_IS_EDIT';

const fieldReducer = (state, action) => {
  switch(action.type) {
     case SET_TEXT:
      return {
        ...state,
        text: action.value
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

const Text = (props) => {

    const initialState = {
        text: props.text,
        isEdit: false
      };

    const [state, dispatch] = useReducer(fieldReducer, initialState);
    const {text, isEdit} = state;

    const setText = (value) => {
        dispatch({type: SET_TEXT, value});
    };

    const setIsEdit = (value) => {
        dispatch({type: SET_IS_EDIT, value});
    };

    const resetField = () => {
        setIsEdit(false);
        setText(props.text);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onEditText(text);
        setIsEdit(false);
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
                <button onClick={() => resetField()}>Отмена</button>
            </form>
        </div>
    )
}

export default Text;