import fail from "../../images/popup__fail.svg";
import success from "../../images/popup__success.svg";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <section
      className={`popup  ${isOpen ? "popup_opened" : ""}`}
      onClick={onClose}
    >
      <div
        className="popup__container"
        onClick={(evt) => evt.stopPropagation()}
      >
        <button type="button" className="popup__cls-btn" onClick={onClose} />
        <img
          className="popup__img"
          src={isSuccess ? success : fail}
          alt="abc"
        />
        <h2 className="popup__title_info">
          {isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
