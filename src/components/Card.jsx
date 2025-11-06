import { useState } from 'react';
import './Card.css';
import like from './../assets/images/like.png'
import antiLike from './../assets/images/antiLike.png'

const Card = (props) => {

    const [likes, setLikes] = useState(props.card.currentLikes);
    const [isLiked, setIsLiked] = useState(false);

    const click = () => {
        if (isLiked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setIsLiked(!isLiked);
    };

    return (
        <div className='Card'>
            <div className='Title'>
                {props.card.title}
            </div>
            <div className='Text'>
                {props.card.text}
            </div>
            <div className='Likes'>
                <div>{likes}</div>
                <button onClick={click}>
                    <img
                        src={isLiked ? like : antiLike}
                        width="24"
                        height="24" />
                </button>
            </div>
        </div>
    )
}

export default Card;
