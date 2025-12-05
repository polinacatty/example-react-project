import { useState } from 'react';
import './AddArticleForm.css';

const AddArticleForm = ({ onAddArticle }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddArticle({
      articleId: Date.now(),
      title: title,
      text: text,
      currentLikes: 0,
      commentsCount: 0,
      isLiked: false,
      createdAt: new Date().toISOString()
    });

    setTitle('');
    setText('');
    setIsVisible(false);
  };

  if (!isVisible) {
    return (
      <button 
        className='toggleButton'
        onClick={() => setIsVisible(true)}
      >
        Добавить карточку
      </button>
    );
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <h3 className='title'>Новая карточка</h3>
      <input
        placeholder="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className='input'
        required
      />
      <textarea
        placeholder="Текст"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className='textarea'
      />
      <div className='buttons'>
        <button type="submit" className='submitButton'>
          Создать карточку
        </button>
        <button 
          className='cancelButton'
          onClick={() => setIsVisible(false)}
        >
          Отмена
        </button>
      </div>
    </form>
  );
};

export default AddArticleForm;
