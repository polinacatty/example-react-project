import { SET_ARTICLES, ADD_ARTICLE, UPDATE_ARTICLE, SET_LOADING } from './../actions/articlesActions';

const initialState = {
  items: [],
  loading: false
};

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ARTICLES:
      return {
        ...state,
        items: action.payload
      };

    case ADD_ARTICLE:
      return {
        ...state,
        items: [action.payload, ...state.items]
      };

    case UPDATE_ARTICLE:
      return {
        ...state,
        items: state.items.map(article =>
          article.articleId === action.payload.articleId
            ? { ...article, ...action.payload.updates }
            : article
        )
      };

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    default:
      return state;
  }
};

export default articlesReducer;
