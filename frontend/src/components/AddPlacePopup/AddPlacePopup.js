import PopupWithForm from "../PopupWithForm/PopupWithForm";
import useValidation from "../hooks/useValidation";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
  const { handleChange, reset, value, error, isValid, isInputValid } =
    useValidation();

  const handleClose = () => {
    onClose();
    reset();
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddPlace({ title: value.title, link: value.link }, reset);
  };

  // ================================================================== component ==================================================================
  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      button="Создать"
      isOpen={isOpen}
      onClose={handleClose}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <input
        placeholder="Название"
        type="text"
        className={`popup__input_type_title popup__input ${
          isInputValid.title === undefined || isInputValid.title
            ? ""
            : "popup__input_error"
        }`}
        name="title"
        minLength={2}
        maxLength={30}
        required=""
        value={value.title ? value.title : ""}
        onChange={handleChange}
      />
      <span
        className={`title-error popup__input-error ${
          isInputValid.title ? "" : "popup__input-error_active"
        }`}
      >
        {error.title}
      </span>
      <input
        placeholder="Ссылка на картинку"
        type="url"
        className={`popup__input_type_link popup__input ${
          isInputValid.link === undefined || isInputValid.link
            ? ""
            : "popup__input_error"
        }`}
        name="link"
        required=""
        value={value.link ? value.link : ""}
        onChange={handleChange}
      />
      <span
        className={`link-error popup__input-error ${
          isInputValid.link ? "" : "popup__input-error_active"
        }`}
      >
        {error.link}
      </span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
