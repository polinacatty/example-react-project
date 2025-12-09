import articles from '../assets/data/articles.json';
import comments from '../assets/data/comments.json';
import users from '../assets/data/users.json';

const ARTICLES_LOAD_DURATION = 2000;
const COMMENTS_LOAD_DURATION = 2000;
const USERS_LOAD_DURATION = 2000;

const shouldFail = () => Math.random() < 0.05;

function selectByArticleId(totalData, id) {
    return totalData.filter(article => article.articleId === id);
} 

export async function getArticles() {
    return new Promise((resolve, reject) => {
        if (shouldFail()) {
            reject(new Error('Ошибка загрузки карточки'));
            return;
        }
        setTimeout(() => resolve([...articles]), ARTICLES_LOAD_DURATION);
    });
}

export async function getComments(articleId) {
    return new Promise((resolve, reject) => {
        if (shouldFail()) {
            reject(new Error(`Ошибка загрузки комментариев для карточки ${articleId}`));
            return;
        }
        const targetComments = selectByArticleId(comments, articleId);
        setTimeout(() => resolve([...targetComments]), COMMENTS_LOAD_DURATION);
    });
}

export async function authenticateUser(login, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = users.find(
                user => user.login === login && user.password === password
            );
            if (user) {
                window.localStorage.setItem('auth', JSON.stringify({
                    login: user.login,
                }));
                
                resolve({login: user.login});
            } else {
                reject(new Error('Неверный логин или пароль'));
            }
        }, USERS_LOAD_DURATION);
    });
}

export async function logoutUser() {
    window.localStorage.removeItem('auth');
};

export function checkAuth() {
    return Boolean(localStorage.getItem('auth'));
}

export function getAuthData() {
    const authData = localStorage.getItem('auth');
    if (!authData) return null;
    
    try {
        return JSON.parse(authData);
    } catch {
        return null;
    }
}
