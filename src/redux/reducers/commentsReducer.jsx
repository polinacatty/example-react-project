import { SET_COMMENTS, ADD_COMMENT, DELETE_COMMENT, SET_COMMENTS_LOADING } from './../actions/commentsActions';

const initialState = {};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMENTS:
      return {
        ...state,
        [action.payload.articleId]: {
          items: action.payload.comments,
          loading: false
        }
      };

    case ADD_COMMENT:
      const { articleId } = action.payload;
      const currentData = state[articleId] || { items: [], loading: false };
      return {
        ...state,
        [articleId]: {
          ...currentData,
          items: [...currentData.items, action.payload]
        }
      };

    case DELETE_COMMENT:
      const { articleId: artId, commentId } = action.payload;
      return {
        ...state,
        [artId]: {
          items: (state[artId].items || []).filter(comment => comment.commentId !== commentId)
        }
      };

    case SET_COMMENTS_LOADING:
      const existingData = state[action.payload.articleId] || { items: [], loading: false };
      return {
        ...state,
        [action.payload.articleId]: {
          ...existingData,
          loading: action.payload.isLoading
        }
      };

    default:
      return state;
  }
};

export default commentsReducer;
