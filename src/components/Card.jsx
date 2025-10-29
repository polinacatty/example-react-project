import React from 'react';
import './Card.css';

const Card = (props) => {
    return(
        <div className='Card'>
            <div className='Title'>
                {props.title}
            </div>
            <div className='Text'>
                {props.text}
            </div>
            <div className = 'Likes'>
                <div>{props.currentLikes}</div>
                <button>лайк</button>
            </div>
        </div>
    )
}

export default Card;