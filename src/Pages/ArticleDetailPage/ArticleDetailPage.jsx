import React from 'react';
import './ArticleDetailPage.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Card from './../../components/Card/Card';
import { updateArticle } from './../../redux/actions/articlesActions';

const ArticleDetailPage = () => {
    const { articleId } = useParams();

    const dispatch = useDispatch();

    const article = useSelector(state => 
        state.articles.items.find(a => a.articleId == articleId)
    );

    const onUpdateArticle = (articleId, updates) => {
        dispatch(updateArticle(articleId, updates));
    };

    return (
        <div className="ArticleDetailPage">
            <Card 
                card={article}
                onUpdateArticle={onUpdateArticle}
            />
            <Link to='/articles'>Назад</Link>
        </div>
    );
}

export default ArticleDetailPage;
