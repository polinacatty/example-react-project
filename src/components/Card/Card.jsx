import { useState, useEffect } from 'react';
import './Card.css';
import { getComments } from '../../api/fakeApi';
import CommentForm from './CommentForm/CommentForm';
import like from './../../assets/images/like.png'
import antiLike from './../../assets/images/antiLike.png'
import Comment from './Comment/Comment';


const Card = (props) => {

    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);

    const onClickComments = () => {
        setShowComments(!showComments);
    };

    useEffect(() => {
        if (showComments && comments.length === 0) {
            setLoading(true);
            getComments(props.card.articleId)
                .then(fetchedComments => {
                    setComments(fetchedComments);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [showComments]);

    const onAddComment = (comment) => {
        setComments((comments) => [...comments, comment])
        props.onUpdateArticle(props.card.articleId, { commentsCount: props.card.commentsCount + 1 });
    };

    const deleteCommentary = () => {

    }

    const onClickLike = () => {
        const newLikesCount = isLiked ? props.card.currentLikes - 1 : props.card.currentLikes + 1;
        props.onUpdateArticle(props.card.articleId, { currentLikes: newLikesCount });
        setIsLiked(!isLiked);
    };

    const onDeleteComment = (commentId) => {
        const updatedComments = comments.filter(comment => comment.commentId !== commentId);
        setComments(updatedComments);
        props.onUpdateArticle(props.card.articleId, { 
          commentsCount: props.card.commentsCount - 1
        });
      };
    

    let CommentsMassive = comments.map(comment => <Comment comment={comment} onDeleteComment={onDeleteComment}/>);

    return (
        <div className='Card'>
            <div className='Title'>
                {props.card.title}
            </div>
            <div className='Text'>
                {props.card.text}
            </div>
            <div className='Likes'>
                <div>{props.card.currentLikes}</div>
                <button onClick={onClickLike}>
                    <img
                        src={isLiked ? like : antiLike}
                        width="24"
                        height="24" />
                </button>
            </div>
            <div className='Comments-Zone'>
                комментариев : {props.card.commentsCount}
                <div>
                    <button onClick={onClickComments}>{showComments ? 'Закрыть комментарии' : 'Открыть комментарии'}</button>
                    <div> {showComments
                        ? <div>

                            {loading ? (
                                <div>
                                    Загрузка комментариев...
                                </div>
                            ) : CommentsMassive}

                            <CommentForm onAddComment={onAddComment} articleId={props.card.articleId} />
                        </div>
                        : ''} </div>
                </div>
            </div>
        </div>
    )
}

export default Card;
