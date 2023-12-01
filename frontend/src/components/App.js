// docs of this App component
// 1 - handle funcs (popup closers)
// 2 - side effs and API requests
// 3 - states
// 4 - listeners (document.addEventListener)
// 5 - components html return part
//const express = require("express");

import Header from './Header/Header';
//import Main from "./Main/Main";
import Footer from './Footer/Footer';
import PopupWithForm from './PopupWithForm/PopupWithForm';
import ImagePopup from './ImagePopup/ImagePopup';
import Login from './Login/Login';
import Register from './Register/Register';
import InfoTooltip from './InfoTooltip/InfoTooltip';

import EditProfilePopup from './EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup/AddPlacePopup';

import CurrentUserContext from './contexts/CurrentUserContext';
import api from '../utils/Api';
import * as auth from '../utils/auth';

import { useCallback, useState, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import MainPage from './MainPage/MainPage';

function App() {
  // ================================================================== states ==================================================================
  // 3
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false); // ui state
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false); // ui state
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false); // ui state
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false); // ui state
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false); // ui state
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false); // ui state

  // card
  const [cards, setCards] = useState([]); // app data (user's data)
  const [selectedCard, setSelectedCard] = useState({}); // app data (user's data)
  const [delCardId, setDelCardId] = useState(''); // app data (user's data)

  const [currentUser, setCurrentUser] = useState({}); // app data (user's data)
  const [userEmail, setUserEmail] = useState(''); // app data (user's data)

  // routes
  const [isSuccess, setIsSuccess] = useState(false); // app data (user's data)
  const [isLoggedIn, setIsLoggedIn] = useState(false); // app data (user's data)
  const navigate = useNavigate();
  // ================================================================== handle funcs ==================================================================
  // 1
  //edit avatar
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
    setEventListeners();
  };

  //edit prof
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
    setEventListeners();
  };

  //add place
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
    setEventListeners();
  };

  //image
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
    setEventListeners();
  };

  //confirm
  const handleConfirmClick = (idCard) => {
    setIsConfirmPopupOpen(true);
    setEventListeners();
    setDelCardId(idCard);
  };

  // //tooltip
  // const handleTooltipClick = () => {
  //   setIsTooltipPopupOpen(true);
  //   setEventListeners();
  // };

  // closer
  const setPopupStates = useCallback(() => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsTooltipPopupOpen(false);
  }, []);

  // ================================================================== side effs and APIs ==================================================================
  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([
        api.getUserInfo(localStorage.jwt),
        api.getCards(localStorage.jwt),
      ])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch((err) => console.error(`Ошибка: ${err}`));
    }
  }, [isLoggedIn]);

  // with dep (чтобы неразлогиниться)
  useEffect(() => {
    if (localStorage.jwt) {
      auth
        .getUser(localStorage.jwt)
        .then((res) => {
          setUserEmail(res.email);
          setIsLoggedIn(true);
          navigate('/');
        })
        .catch((err) => console.error(`Ошибка: ${err}`));
    } else {
      setIsLoggedIn(false);
    }
  }, [navigate]);

  // APIs
  const handleUpdateUser = (userData, handleReset) => {
    api
      .setUserInfo(userData, localStorage.jwt)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        handleReset();
      })
      .catch((err) => console.error(`Ошибка: ${err}`));
  };

  const handleUpdateAvatar = (userData, handleReset) => {
    api
      .setAvatar(userData, localStorage.jwt)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        handleReset();
      })
      .catch((err) => console.error(`Ошибка: ${err}`));
  };

  const handleConfirmSubmit = (evt) => {
    evt.preventDefault();
    api
      .removeCard(delCardId, localStorage.jwt)
      .then(() => {
        setCards(
          cards.filter((card) => {
            return card._id !== delCardId;
          })
        );
        closeAllPopups();
      })
      .catch((err) => console.error(err));
  };

  const handleAddPlaceSubmit = (cardData, reset) => {
    api
      .setCard(cardData, localStorage.jwt)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
        reset();
      })
      .catch((err) => console.error(`Ошибка: ${err}`));
  };

  // auth API

  const handleLogin = (password, email) => {
    auth
      .auth(password, email)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setIsLoggedIn(true);
        navigate('/');
      })
      .catch((err) => {
        setIsTooltipPopupOpen(true);
        setIsSuccess(false);
        console.error(`Ошибка: ${err}`);
      });
  };

  const handleRegister = (password, email) => {
    auth
      .registration(password, email)
      .then(() => {
        setIsTooltipPopupOpen(true);
        setIsSuccess(true);
        navigate('/sign-in');
      })
      .catch((err) => {
        setIsTooltipPopupOpen(true);
        setIsSuccess(false);
        console.error(`Ошибка: ${err}`);
      });
  };

  // ================================================================== listeners ==================================================================
  // 4
  const handleKeydownEsc = useCallback(
    (evt) => {
      if (evt.key === 'Escape') {
        setPopupStates();
        document.removeEventListener('keydown', handleKeydownEsc);
      }
    },
    [setPopupStates]
  );

  const setEventListeners = () => {
    document.addEventListener('keydown', handleKeydownEsc);
  };

  const closeAllPopups = useCallback(() => {
    setPopupStates();
    document.removeEventListener('keydown', handleKeydownEsc);
  }, [setPopupStates, handleKeydownEsc]);

  // ================================================================================ component ================================================================================
  // 5
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page__content'>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute
                element={MainPage}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onEditProfile={handleEditProfileClick}
                onCardClick={handleCardClick}
                onConfirm={handleConfirmClick}
                initialCards={cards}
                isLoggedIn={isLoggedIn}
                userEmail={userEmail}
              />
            }
          />
          <Route
            path='/sign-up'
            element={
              <>
                <Header page='signup' />
                <Register handleRegister={handleRegister} />
              </>
            }
          />

          <Route
            path='/sign-in'
            element={
              <>
                <Header page='signin' />
                <Login handleLogin={handleLogin} />
              </>
            }
          />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>

        <Footer />
        <InfoTooltip
          isOpen={isTooltipPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />
        {/* ================================== profile ================================== */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        {/* ================================== place ================================== */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        {/* ================================== avatar ================================== */}
        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />
        {/* ================================== confirm ================================== */}
        <PopupWithForm
          name='confirm'
          title='Вы уверены?'
          button='Да'
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleConfirmSubmit}
        ></PopupWithForm>

        {/* ================================== image ================================== */}
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        ></ImagePopup>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
