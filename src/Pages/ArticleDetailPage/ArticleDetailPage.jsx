import React, { useCallback } from 'react';
import './ArticleDetailPage.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Card from './../../components/Card/Card';
import { updateArticle } from './../../redux/actions/articlesActions';

const ArticleDetailPage = () => {

    useEffect(() => {
        console.log(`Пользователь посетил страницу статьи: "${article.title}" (ID: ${articleId})`);
        console.info(`Время посещения: ${new Date().toLocaleString()}`);
    }, [articleId, article.title]);

    const { articleId } = useParams();

    const dispatch = useDispatch();

    const article = useSelector(state => 
        state.articles.items.find(a => a.articleId == articleId)
    );

    const onUpdateArticle = useCallback((articleId, updates) => {
        dispatch(updateArticle(articleId, updates));
    }, [dispatch]);

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
