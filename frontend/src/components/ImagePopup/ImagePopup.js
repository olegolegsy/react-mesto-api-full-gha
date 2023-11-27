function ImagePopup({ card, isOpen, onClose }) {
  return (
    <section
      className={`popup popup_type_image ${isOpen ? "popup_opened" : ""}`}
      onClick={onClose}
    >
      <div
        className="popup__image-content"
        onClick={(evt) => evt.stopPropagation()}
      >
        <button
          type="button"
          className="popup__cls-btn popup__cls-btn_type_image"
          onClick={onClose}
        />
        <img className="popup__image-photo" src={card.link} alt={card.name} />
        <p className="popup__image-caption">{card.name}</p>
      </div>
    </section>
  );
}

export default ImagePopup;
