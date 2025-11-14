import { useState } from 'react';
import './CommentForm.css';

const AddCommentForm = (props) => {
  const [text, setText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    props.onAddComment({
        commentId: Date.now(),
        author: "Me",
        articleId: props.articleId,
        text: text
    });

    setText('');
    setIsVisible(false);
  };

  if (!isVisible) {
    return (
      <button 
        onClick={() => setIsVisible(true)}
      >
        Добавить комментарий
      </button>
    );
  }

  return (
    <form className='commentform' onSubmit={onSubmit}>
      <h3>Новый комментарий</h3>
      <textarea
        placeholder="Текст"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className='commentbuttons'>
        <button type="submit" className='commentsubmitButton'>
          Отправить комментарий
        </button>
        <button 
          className='commentcancelButton'
          onClick={() => setIsVisible(false)}
        >
          Отмена
        </button>
      </div>
    </form>
  );
};

export default AddCommentForm;
