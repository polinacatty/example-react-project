import { getArticles } from './../../api/fakeApi';

export const SET_ARTICLES = 'SET_ARTICLES';
export const ADD_ARTICLE = 'ADD_ARTICLE';
export const UPDATE_ARTICLE = 'UPDATE_ARTICLE';
export const SET_LOADING = 'SET_LOADING';

export const setArticles = (articles) => ({
  type: SET_ARTICLES,
  payload: articles
});

export const addArticle = (article) => ({
  type: ADD_ARTICLE,
  payload: article
});

export const updateArticle = (articleId, updates) => ({
  type: UPDATE_ARTICLE,
  payload: { articleId, updates }
});

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading
});

export const fetchArticles = () => {
  return (dispatch) => {
    dispatch(setLoading(true));
    getArticles()
      .then(articles => {
        dispatch(setArticles(articles));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
};
