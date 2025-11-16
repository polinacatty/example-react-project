import { useState, useEffect } from 'react';
import './Card.css';
import { useDispatch, useSelector} from 'react-redux';
import { addComment, deleteComment, fetchComments } from '../../redux/actions/commentsActions';
import CommentForm from './CommentForm/CommentForm';
import like from './../../assets/images/like.png'
import antiLike from './../../assets/images/antiLike.png'
import Comment from './Comment/Comment';


const Card = (props) => {

    const dispatch = useDispatch();
    const commentsData = useSelector(state => 
        state.comments[props.card.articleId] || { items: [], loading: false }
      );
    const comments = commentsData.items;
    const loading = commentsData.loading;

    const [showComments, setShowComments] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [hasLoadedComments, setHasLoadedComments] = useState(false);

    useEffect(() => {
        if (showComments && !hasLoadedComments) {
          dispatch(fetchComments(props.card.articleId));
          setHasLoadedComments(true);
        }
    }, [showComments]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
      };

    const onClickComments = () => {
        setShowComments(!showComments);
    };

    const onAddComment = (comment) => {
        dispatch(addComment(comment));
        props.onUpdateArticle(props.card.articleId, { commentsCount: props.card.commentsCount + 1});
    };

    const onClickLike = () => {
        const newLikesCount = isLiked ? props.card.currentLikes - 1 : props.card.currentLikes + 1;
        props.onUpdateArticle(props.card.articleId, { currentLikes: newLikesCount });
        setIsLiked(!isLiked);
    };

    const onDeleteComment = (commentId) => {
        dispatch(deleteComment(props.card.articleId, commentId));
        props.onUpdateArticle(props.card.articleId, { commentsCount: props.card.commentsCount - 1});
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
            <div className='Date'>
                создано: {formatDate(props.card.createdAt)}
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
