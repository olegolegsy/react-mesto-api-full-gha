import { useContext, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import useValidation from "../hooks/useValidation";
import CurrentUserContext from "../contexts/CurrentUserContext";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  // ================================================================== hooks ==================================================================
  const {
    handleChange,
    reset,
    setValues,
    value,
    error,
    isValid,
    isInputValid,
  } = useValidation();

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setValues("name", currentUser.name);
    setValues("about", currentUser.about);
  }, [currentUser, setValues]);

  const handleClose = () => {
    onClose();
    reset({ name: currentUser.name, about: currentUser.about });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser({ name: value.name, about: value.about }, reset);
  };

  // ================================================================== component ==================================================================
  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      button="Сохранить"
      isOpen={isOpen}
      onClose={handleClose}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <input
        placeholder="Имя"
        type="text"
        className={`popup__input_type_name popup__input ${
          isInputValid.name === undefined || isInputValid.name
            ? ""
            : "popup__input_error"
        }`}
        name="name"
        minLength={2}
        maxLength={40}
        required=""
        value={value.name ? value.name : ""}
        onChange={handleChange}
      />
      <span
        className={`name-error popup__input-error ${
          isInputValid.name ? "" : "popup__input-error_active"
        }`}
      >
        {error.name}
      </span>
      <input
        placeholder="Чем вы занимаетесь?"
        type="text"
        className={`popup__input_type_about popup__input ${
          isInputValid.about === undefined || isInputValid.about
            ? ""
            : "popup__input_error"
        }`}
        name="about"
        minLength={2}
        maxLength={200}
        required=""
        value={value.about ? value.about : ""}
        onChange={handleChange}
      />
      <span
        className={`about-error popup__input-error ${
          isInputValid.about ? "" : "popup__input-error_active"
        }`}
      >
        {error.about}
      </span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
