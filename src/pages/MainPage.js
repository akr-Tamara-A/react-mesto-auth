import React, { useEffect, useState } from "react";

import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import Footer from "../components/Footer/Footer";
import ImagePopup from "../components/Popups/ImagePopup";
import PopupWithForm from "../components/Popups/PopupWithForm";
import EditProfilePopup from "../components/Popups/EditProfilePopup";
import EditAvatarPopup from "../components/Popups/EditAvatarPopup";
import AddPlacePopup from "../components/Popups/AddPlacePopup";

import { api } from "../utils/Api";

import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useHistory } from "react-router-dom";

/** Основной компонент страницы */
function MainPage(props) {
  const [currentUser, setCurrentUser] = useState({});

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isCardsLoading, setCardsIsLoading] = useState(false);
  const [submitButtonValues, setSubmitButtonValues] = useState({
    editAvatar: 'Сохранить',
    editUserInfo: 'Сохранить',
    addCards: 'Сохранить',
    confirmDeletion: 'Да',
  });

  const history = useHistory();

  const signOut = () => {
    localStorage.removeItem('jwt');
    history.push('/signin');
  }

  useEffect(() => {
    /** Загрузка данных текущего пользователя с сервера */
    api
    .getUserInfo()
    .then((data) => {
      setCurrentUser(data);
      console.log(`user info loaded`);
      setCardsIsLoading(true);
      /** Загрузка данных карточек с сервера */
      api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
    })
    .catch((err) => {
      console.log("Ошибка. Не удалось установить новые данные: ", err);
    })
    .finally(() => {
      setCardsIsLoading(false);
      console.log(`cards info loaded`);
        });
    }, [setCurrentUser, setCards]);
  

  /** Функция закрытия попапов */
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }
  
  /** Обработка лайка карточки */
  const handleCardLike = currentCard => {
    /** Проверка лайкнута ли карточка */
    const isLiked = currentCard.likes.some(user => user._id === currentUser._id);
    
    api.changeLikeCardStatus(currentCard._id, !isLiked).then((newCard) => {
      const newCards = cards.map((card) => card._id === currentCard._id ? newCard : card);
      setCards(newCards);
    });
  }

  /** Обработка удаления карточки */
  const handleCardDelete = currentCard => {
    api.deleteCard(currentCard._id)
    .then((res) => {
      console.log(res);
      const newCards = cards.filter(card => {
        return card._id !== currentCard._id
      });
      setCards(newCards);
      console.log('card deleted');
    })
  }


  /** Функция обработки клика по карточке */
  const handleCardClick = card => {
    setSelectedCard(card);
  }

  /** Обработка сабмита редактирования профиля пользователя */
  const handleUpdateUser = (data) => {
    setSubmitButtonValues({
      ...submitButtonValues, 
      editUserInfo: 'Загружается...',
    })
    api.patchUserInfo(data)
    .then(data => {
      setCurrentUser(data);
    })
    .catch((err) => {
      console.log("Ошибка. Не удалось установить новые данные: ", err);
    })
    .finally(() => {
      console.log(`user info updates`);
      setSubmitButtonValues({
        ...submitButtonValues, 
        editUserInfo: 'Сохранить',
      })
      setIsEditProfilePopupOpen(false);
    });
  }

  /** Обработка сабмита редактирования аватара пользователя */
  const handleUpdateAvatar = (data) => {
    setSubmitButtonValues({
      ...submitButtonValues, 
      editAvatar: 'Загружается...',
    });
    api.patchUserAvatar(data)
    .then(data => {
      setCurrentUser(data);
    })
    .catch((err) => {
      console.log("Ошибка. Не удалось установить новые данные: ", err);
    })
    .finally(() => {
      console.log(`user avatar updated`);
      setSubmitButtonValues({
        ...submitButtonValues, 
        editAvatar: 'Сохранить',
      })
      setIsEditAvatarPopupOpen(false);
    });
  }
  
  /** Обработка сабмита добавления карточки */
  const handleAddCard = (title, link) => {
    setSubmitButtonValues({
      ...submitButtonValues,
      addCards: "Загружается...",
    });
    api
      .postNewCard(title, link)
      .then((newCard) => {
        console.log(newCard);
        setCards([newCard, ...cards]);
      })
      .catch((err) => {
        console.log("Ошибка. Не удалось установить новые данные: ", err);
      })
      .finally(() => {
        console.log(`new card added`);
        setSubmitButtonValues({
          ...submitButtonValues,
          addCards: "Сохранить",
        });
        setIsAddPlacePopupOpen(false);
      });
  };

  /** Основная разметка */
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header>
        <div>
          <span className="mail">{props.userData.email}</span>
          <button className="link header__link" onClick={signOut}>Выйти</button>
        </div>
      </Header>
      <Main
        cards={cards}
        isCardsLoading={isCardsLoading}
        onEditProfile={() => {
          setIsEditProfilePopupOpen(true);
        }}
        onEditAvatar={() => {
          setIsEditAvatarPopupOpen(true);
        }}
        onAddPlace={() => {
          setIsAddPlacePopupOpen(true);
        }}
        onCardClick={(card) => {
          handleCardClick(card);
        }}
        onCardLike={(card) => {
          handleCardLike(card);
        }}
        onCardDelete={(card) => {
          handleCardDelete(card);
        }}
      />
      <Footer />
      <EditProfilePopup
        submitValue={submitButtonValues.editUserInfo}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <EditAvatarPopup
        submitValue={submitButtonValues.editAvatar}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <AddPlacePopup
        submitValue={submitButtonValues.addCards}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddCard}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <PopupWithForm
        name="deleteCard"
        title="Вы уверены?"
        submitValue={submitButtonValues.confirmDeletion}
        isOpen={false}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default MainPage;
