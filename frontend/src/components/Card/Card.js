import { useContext, useEffect, useState } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../../utils/Api';

function Card({ card, onCardClick, onDelete }) {
  // ================================================================== states/props ==================================================================
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;

  const [isLiked, setIsLiked] = useState(false);
  const [likeCounter, setLikeCounter] = useState(card.likes.length);

  const cardLikeButtonClassName = `element__like ${
    isLiked ? 'element__like_active' : ''
  }`;

  // ================================================================== funcs ==================================================================
  const handleClick = () => {
    onCardClick(card);
  };

  const handleDelBtn = () => {
    onDelete(card._id);
  };

  const handleLikeBtn = () => {
    if (isLiked) {
      api
        .removeLike(card._id, localStorage.jwt)
        .then((res) => {
          setIsLiked(false);
          setLikeCounter(res.likes.length);
        })
        .catch((err) => console.error(err));
    } else {
      api
        .addLike(card._id, localStorage.jwt)
        .then((res) => {
          setIsLiked(true);
          setLikeCounter(res.likes.length);
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    setIsLiked(card.likes.some((i) => i._id === currentUser._id));
  }, [card.likes, currentUser._id]);

  // ================================================================== component ==================================================================
  return (
    <article className='element'>
      {isOwn && (
        <button
          type='button'
          className='element__delete'
          onClick={handleDelBtn}
        />
      )}
      <img
        src={card.link}
        alt={card.name}
        onClick={handleClick}
        className='element__img'
      />
      <div className='element__content'>
        <h2 className='element__title'>{card.name}</h2>
        <div className='element__like-container'>
          <button
            className={cardLikeButtonClassName}
            type='button'
            onClick={handleLikeBtn}
          />
          <span className='element__counter'>{likeCounter}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;
