import './AbbreviatedCard.css';
import { Link } from 'react-router-dom';
import { formatDate } from './../../helpers/formatDate';
import { truncateText } from './../../helpers/truncateText';

const AbbreviatedCard = (props) => {

    return (
        <div className='AbbreviatedCard'>
            <Link className='Link' to={`/articles/${props.card.articleId}`}>
                <div className='AbbreviatedTitle'>
                    <div>{props.card.title}</div>
                </div>
                <div className='AbbreviatedText'>
                    <div>{truncateText(props.card.text)}</div>
                </div>
                <div className='AbbreviatedDate'>
                    <div>создано : {formatDate(props.card.createdAt)}</div>
                </div>
                <div className='AbbreviatedLikes'>
                    <div>лайков : {props.card.currentLikes}</div>
                </div>
                <div className='AbbreviatedComments'>
                    <div>комментариев : {props.card.commentsCount}</div>
                </div>
            </Link>
        </div>
    )
}

export default AbbreviatedCard;
