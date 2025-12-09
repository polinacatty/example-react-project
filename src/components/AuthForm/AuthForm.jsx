import { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../../api/fakeApi';
import './AuthForm.css';

const SET_LOGIN = 'SET_LOGIN';
const SET_PASSWORD = 'SET_PASSWORD';
const SET_ERROR = 'SET_ERROR';
const RESET_FORM = 'RESET_FORM';

const initialState = {
  login: '',
  password: '',
  error: '',
};

const formReducer = (state, action) => {
  switch (action.type) {
    case SET_LOGIN:
      return {
        ...state,
        login: action.value
      };
    case SET_PASSWORD:
      return {
        ...state,
        password: action.value
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.value
      };
    case RESET_FORM:
      return initialState;
    default:
      return state;
  }
};

const AuthForm = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const {login, password, error} = state;
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const setLogin = (value) => {
    dispatch({ type: SET_LOGIN, value });
  };

  const setPassword = (value) => {
    dispatch({ type: SET_PASSWORD, value });
  };

  const setError = (value) => {
    dispatch({ type: SET_ERROR, value });
  };

  const resetForm = () => {
    dispatch({ type: RESET_FORM });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await authenticateUser(login, password);
      console.log('Авторизация успешна:', result);
      resetForm();
      navigate('/');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
          placeholder="Введите логин"
        />
      
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Введите пароль"
        />
      </div>
      
      {error && <div>{error}</div>}
      
      <button 
        type="submit"
      >
        Войти
      </button>
      <div> 
        {loading ? 'Секундочку...' : ''}
      </div>
    </form>
  );
};

export default AuthForm;
