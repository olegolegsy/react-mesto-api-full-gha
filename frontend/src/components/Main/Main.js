import { useContext } from "react";

import Card from "../Card/Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  onEditAvatar,
  onAddPlace,
  onEditProfile,
  onCardClick,
  onConfirm,
  initialCards,
}) {
  // ================================================================== states/props ==================================================================
  const currentUser = useContext(CurrentUserContext);

  // ================================================================== component ==================================================================
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__user">
          <div className="profile__avatar-edt-btn" onClick={onEditAvatar}>
            <div className="profile__avatar-cover" />
            <img
              src={currentUser.avatar}
              alt="Аватарка. Avatar."
              className="profile__avatar"
            />
          </div>
          <div className="profile__text">
            <div className="profile__headline">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                className="profile__edit-btn"
                type="button"
                onClick={onEditProfile}
              />
            </div>
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-btn"
          type="button"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements">
        {initialCards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onDelete={onConfirm}
            ></Card>
          );
        })}
      </section>
    </main>
  );
}

export default Main;
