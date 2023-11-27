import { useContext, useRef } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import useValidation from '../hooks/useValidation';
import CurrentUserContext from '../contexts/CurrentUserContext';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const avatar = useRef();
  const { handleChange, reset, value, error, isValid, isInputValid } =
    useValidation();

  const currentUser = useContext(CurrentUserContext);

  const handleClose = () => {
    onClose();
    reset({});
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateAvatar({ avatar: avatar.current.value }, reset);
  };

  // ================================================================== component ==================================================================
  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      button='Сохранить'
      isOpen={isOpen}
      onClose={handleClose}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatar}
        placeholder='Ссылка на картинку'
        type='url'
        className={`popup__input_type_avatar popup__input ${
          isInputValid.avatar === undefined || isInputValid.avatar
            ? ''
            : 'popup__input_error'
        }`}
        name='avatar'
        required=''
        value={value.avatar ? value.avatar : ''}
        onChange={handleChange}
      />
      <span
        className={`avatar-error popup__input-error ${
          isInputValid.avatar ? '' : 'popup__input-error_active'
        }`}
      >
        {error.avatar}
      </span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
