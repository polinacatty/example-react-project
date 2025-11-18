import { getComments } from './../../api/fakeApi';

export const SET_COMMENTS = 'SET_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const SET_COMMENTS_LOADING = 'SET_COMMENTS_LOADING';

export const setComments = (articleId, comments) => ({
  type: SET_COMMENTS,
  payload: { articleId, comments }
});

export const addComment = (comment) => ({
  type: ADD_COMMENT,
  payload: comment
});

export const deleteComment = (articleId, commentId) => ({
  type: DELETE_COMMENT,
  payload: { articleId, commentId }
});

export const updateComment = (articleId, commentId, updates) => ({
  type: UPDATE_COMMENT,
  payload: { articleId, commentId, updates }
})

export const setCommentsLoading = (articleId, isLoading) => ({
  type: SET_COMMENTS_LOADING,
  payload: { articleId, isLoading }
});

export const fetchComments = (articleId) => {
  return (dispatch) => {
    dispatch(setCommentsLoading(articleId, true));
    getComments(articleId)
      .then(comments => {
        dispatch(setComments(articleId, comments));
      })
      .finally(() => {
        dispatch(setCommentsLoading(articleId, false));
      });
  };
};
