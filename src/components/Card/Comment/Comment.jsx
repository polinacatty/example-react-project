import React from "react";
import './Comment.css'

const Comment = (props) => {
    return (
        <div className="Comment">
            <div className="CommenntText">
                {props.comment.author} : {props.comment.text}
            </div>
            <button onClick={() => props.onDeleteComment(props.comment.commentId)}>удалить</button>
        </div>
    )
}

export default Comment;
