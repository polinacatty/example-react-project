import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ArticlesListPage.css';
import jackdaw from './../../assets/images/jackdaw.png';
import square from './../../assets/images/square.png';
import AddArticleForm from './../../components/AddArticleForm/AddArticleForm';
import { addArticle } from './../../redux/actions/articlesActions';
import AbbreviatedCard from './../../components/AbbreviatedCard/AbbreviatedCard';

const ArticlesListPage = () => {

    useEffect(() => {
        console.log('Пользователь посетил страницу списка статей');
        console.info(`Время посещения: ${new Date().toLocaleString()}`);
        console.info(`Количество статей: ${articles.length}`);
    }, [articles.length]);

    const dispatch = useDispatch();
    const articles = useSelector(state => state.articles.items);
    const loading = useSelector(state => state.articles.loading);
    const [isSorted, setIsSorted] = useState(false);

    const onAddArticle = useCallback((newArticle) => {
        dispatch(addArticle(newArticle));
    }, [dispatch]);

    const sortedArticles = isSorted
        ? [...articles].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : articles;

    const Cards = sortedArticles.map((article) => (
        <AbbreviatedCard key={article.articleId} card={article} />
    ));

    return (
        <div className="ArticlesList">
            <div className="SortButton">
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
    );
}

export default ArticlesListPage;
