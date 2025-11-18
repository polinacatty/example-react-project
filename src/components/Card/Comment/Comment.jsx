import React, {useState} from "react";
import './Comment.css';
import Text from './CommentText/CommentText.jsx'
import like from './../../../assets/images/like.png';
import antiLike from './../../../assets/images/antiLike.png';

const Comment = (props) => {

    const onClikLike = () => {
        const newLikesCount = props.comment.isLiked ? props.comment.currentLikes - 1 : props.comment.currentLikes + 1;
        props.onUpdateComment(props.comment.articleId, props.comment.commentId, { currentLikes: newLikesCount, isLiked: !props.comment.isLiked});
    }

    const onEditText = (newText) => {
        props.onUpdateComment(props.comment.articleId, props.comment.commentId, { text: newText });
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
      };

    return (
        <div className="Comment">
            <Text commentAuthor={props.comment.author} commentText={props.comment.text} onEditText={onEditText}/>
            <div className="CommentLikes">
                <div>{props.comment.currentLikes}</div>
                <button onClick={onClikLike}>
                    <img
                    src={props.comment.isLiked ? like : antiLike}
                    width="20"
                    height="20" />
                </button>
            </div>
            <div className="CommentDate">
                создано: {formatDate(props.comment.createdAt)}
            </div>
            <button onClick={() => props.onDeleteComment(props.comment.commentId)}>удалить</button>
        </div>
    )
}

export default Comment;
