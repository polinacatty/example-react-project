import { SET_COMMENTS, ADD_COMMENT, DELETE_COMMENT, SET_COMMENTS_LOADING, UPDATE_COMMENT } from './../actions/commentsActions';

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
          items: [...currentData.items, action.payload],
          loading: false
        }
      };

    case DELETE_COMMENT:
      const { articleId: artId, commentId } = action.payload;
      return {
        ...state,
        [artId]: {
          items: (state[artId].items || []).filter(comment => comment.commentId !== commentId),
          loading: false
        }
      };

    case UPDATE_COMMENT:
      const lastData = state[action.payload.articleId] || { items: [], loading: false };
      return {
        ...state,
        [action.payload.articleId]: {
          items: lastData.items.map(comment =>
            comment.commentId === action.payload.commentId
              ? { ...comment, ...action.payload.updates }
              : comment
          ),
          loading: false
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
