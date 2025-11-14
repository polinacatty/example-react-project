import React, { useState, useEffect } from 'react';
import './App.css';
import { getArticles } from './api/fakeApi';
import Header from './components/Header/Header';
import Card from './components/Card/Card';
import AddArticleForm from './components/AddArticleForm/AddArticleForm';

const App = () => {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getArticles()
    .then(fetchedArticles => {
      setArticles(fetchedArticles);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  const onAddArticle = (newArticle) => {
    setArticles(prevArticles => [newArticle, ...prevArticles]);
  };

  const onUpdateArticle = (articleId, updates) => {
    setArticles(prevArticles =>
      prevArticles.map(article =>
        article.articleId === articleId
          ? { ...article, ...updates }
          : article
      )
    );
  };

  let Cards = articles.map((article) => (
  <Card 
      key={article.articleId} 
      card={article}
      onUpdateArticle={onUpdateArticle}
  />
  ))

  return (
    <div className="App">
      <Header />
      <div className='Cards-container'>
       <AddArticleForm onAddArticle={onAddArticle}/>
        {loading ? (
        <div>
          Загрузка карточек...
        </div>
      ) : Cards}
      </div>
    </div>
  );
}

export default App;
