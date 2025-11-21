import React from 'react';
import { useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { fetchArticles } from './redux/actions/articlesActions';
import Header from './components/Header/Header';
import HomePage from './Pages/HomePage/HomePage';
import ArticleDetailPage from './Pages/ArticleDetailPage/ArticleDetailPage';
import ArticlesListPage from './Pages/ArticlesListPage/ArticlesListPage';
// import NotFoundPage from './pages/NotFoundPage';

const App = () => {

  const dispatch = useDispatch();
    
  useEffect(() => {
      dispatch(fetchArticles());
  }, [dispatch]);

    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/articles" element={<ArticlesListPage />} />
                        <Route path="/articles/:articleId" element={<ArticleDetailPage />} />
                        {/* <Route path="/404" element={<NotFoundPage />} />
                        <Route path="*" element={<Navigate to="/404" replace />} /> */}
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
