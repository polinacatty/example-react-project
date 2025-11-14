import articles from '../assets/data/articles.json';
import comments from '../assets/data/comments.json';

const ARTICLES_LOAD_DURATION = 2000;
const COMMENTS_LOAD_DURATION = 2000;

function selectByArticleId(totalData, id) {
    return totalData.filter(article => article.articleId === id);
} 

export async function getArticles() {
    return new Promise(resolve => {
        setTimeout(() => resolve([...articles]), ARTICLES_LOAD_DURATION);
    });
}

export async function getComments(articleId) {
    return new Promise(resolve => {
        const targetComments = selectByArticleId(comments, articleId);
        setTimeout(() => resolve([...targetComments]), COMMENTS_LOAD_DURATION);
    });
}
