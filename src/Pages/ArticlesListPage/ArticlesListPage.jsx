import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ArticlesListPage.css';
import jackdaw from './../../assets/images/jackdaw.png';
import square from './../../assets/images/square.png';
import AddArticleForm from './../../components/AddArticleForm/AddArticleForm';
import { addArticle } from './../../redux/actions/articlesActions';
import AbbreviatedCard from './../../components/AbbreviatedCard/AbbreviatedCard';
import { sortByDate } from  './../../helpers/sortByDate';

const ArticlesListPage = () => {
    const dispatch = useDispatch();
    const articles = useSelector(state => state.articles.items);
    const loading = useSelector(state => state.articles.loading);
    const [isSorted, setIsSorted] = useState(false);

    const onAddArticle = useCallback((newArticle) => {
        dispatch(addArticle(newArticle));
    }, [dispatch]);

    const sortedArticles = isSorted
        ? sortByDate(articles, true)
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
