import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Header from './components/Header/Header';
import Card from './components/Card/Card';
import AddArticleForm from './components/AddArticleForm/AddArticleForm';
import { fetchArticles, addArticle, updateArticle,  } from './redux/actions/articlesActions';

const App = () => {
  const dispatch = useDispatch();
  const articles = useSelector(state => state.articles.items);
  const loading = useSelector(state => state.articles.loading);

  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  const onAddArticle = (newArticle) => {
    dispatch(addArticle(newArticle));
  };

  const onUpdateArticle = (articleId, updates) => {
    dispatch(updateArticle(articleId, updates));
  };

  const Cards = articles.map((article) => (
    <Card 
      key={article.articleId} 
      card={article}
      onUpdateArticle={onUpdateArticle}
    />
  ));

  return (
    <div className="App">
      <Header />
      <div className='Cards-container'>
        <AddArticleForm onAddArticle={onAddArticle}/>
        {loading ? (
          <div>Загрузка карточек...</div>
        ) : Cards}
      </div>
    </div>
  );
}

export default App;
