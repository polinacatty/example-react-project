import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import jackdaw from './assets/images/jackdaw.png';
import square from './assets/images/square.png';
import Header from './components/Header/Header';
import Card from './components/Card/Card';
import AddArticleForm from './components/AddArticleForm/AddArticleForm';
import { fetchArticles, addArticle, updateArticle, } from './redux/actions/articlesActions';

const App = () => {
  const dispatch = useDispatch();
  const articles = useSelector(state => state.articles.items);
  const loading = useSelector(state => state.articles.loading);
  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  const onAddArticle = (newArticle) => {
    dispatch(addArticle(newArticle));
  };

  const onUpdateArticle = (articleId, updates) => {
    dispatch(updateArticle(articleId, updates));
  };

  const sortedArticles = isSorted
    ? [...articles].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : articles;

  const Cards = sortedArticles.map((article) => (
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
        <div className="sort-button">
          сортировка по дате:
          <button onClick={() => setIsSorted(!isSorted)}>
            <img
              src={isSorted ? jackdaw : square}
              width="24"
              height="24" />
          </button>
        </div>
        <AddArticleForm onAddArticle={onAddArticle} />
        {loading ? (
          <div>Загрузка карточек...</div>
        ) : Cards}
      </div>
    </div>
  );
}

export default App;
