/**
 * Файлы скриптов конкретной страницы расположим в уже существующей директории pages. Файлы скриптов страниц содержат только уникальный
 * для конкретной страницы код: создание новых экземпляров класса и передачу в них данных, описание взаимодействия между классами.
 */
import './index.css';

/** Data Import */
// import {initialCards} from '../utils/initialCards.js';
import {token, cohort} from '../utils/authorizationData.js'

/** Classes Import */
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

/** Constants Import */
import {
  profileEditButtonSelector,
  cardAddButtonSelector,
  avatarEditButtonSelector,
  profileSelector,
  profileNameSelector,
  profileAboutSelector,
  profileAvatarSelector,
  cardsContainerSelector,
  popupProfileSelector,
  popupProfileNameSelector,
  popupProfileAboutSelector,
  popupAvatarSelector,
  popupCardSelector,
  popupConfirmationSelector,
  popupImageSelector,
  cardTemplateSelector,
  formSelectors
} from '../utils/constants.js';

/** Constants and variables */
const profileElement = document.querySelector(profileSelector);
const profileEditButtonElement = profileElement.querySelector(profileEditButtonSelector);
const cardAddButtonElement = document.querySelector(cardAddButtonSelector);
const avatarEditButtonElement = document.querySelector(avatarEditButtonSelector);

const popupProfileFormElement = document.querySelector(popupProfileSelector);
const popupCardFormElement = document.querySelector(popupCardSelector);
const popupAvatarFormElement = document.querySelector(popupAvatarSelector);

const popupProfileNameElement = popupProfileFormElement.querySelector(popupProfileNameSelector);
const popupProfileAboutElement = popupProfileFormElement.querySelector(popupProfileAboutSelector);


/** --- MAIN CODE --- */

/** Подключить API */
const api = new Api({
  baseUrl: `https://mesto.nomoreparties.co/v1/${cohort}`,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
});



/** ---------- Initial Cards ----------*/

/** Получить данные c сервера или вывести сообщение об ошибке*/
api.getDataFromServer().then((responses) => {
  const [initialCards, userData] = responses;

  console.log("Данные карточки", initialCards);
  console.log("Данные пользователя", userData);

  userInfo.setUserInfo({userName: userData.name, userAbout: userData.about});
  userInfo.setUserAvatar({userAvatarLink: userData.avatar});
  userInfo.fixUserId(userData._id);

  renderCards.renderItems(initialCards);
}).catch((err) => {
  console.error(err);
});

/** При загрузке страницы отрисовать initial cards. */
const renderCards = new Section(
  {
  renderer: (cardData) => {
      console.log("Это cardData --", cardData);
      const card = createCard(cardData);// ok
      renderCards.addItemAppend(card);// ok
    }
  },
  cardsContainerSelector);



/** ---------- Профиль ----------*/

/** Изменение данных профиля */
const userInfo = new UserInfo({profileNameSelector, profileAboutSelector, profileAvatarSelector});

/** Сменить аватар профиля*/
const popupUpdateAvatar = new PopupWithForm(popupAvatarSelector, (formData) => { // formData - это объект с данными полей input формы (мы его получаем в PopupWithForm - это _formValues)
  popupUpdateAvatar.isLoadingMessage(true);
  api.updateProfileAvatar({avatar: formData.url}).then((data) => {
    userInfo.setUserAvatar({userAvatarLink: data.avatar});
    popupUpdateAvatar.close();
  }).catch((err) => {
    console.error(err);
  }).finally(() => {
    popupUpdateAvatar.isLoadingMessage(false);
  });
});

popupUpdateAvatar.setEventListeners();

/** Валидация полей формы аватара*/
const avatarValidation = new FormValidator(formSelectors, popupAvatarFormElement);
avatarValidation.enableValidation();

/** Клик на кнопке редактирования аватара */
avatarEditButtonElement.addEventListener('click', () => {
  avatarValidation.toggleButtonState();
  popupUpdateAvatar.open();
});


/** Изменить имя и описание профиля */
const popupWithProfileForm = new PopupWithForm(popupProfileSelector, (formData) => {
  popupWithProfileForm.isLoadingMessage(true);
  api.updateUserInfo({name: formData.userName, about: formData.userAbout}).then((formData) => {
    userInfo.setUserInfo({userName: formData.userName, userAbout: formData.userAbout});
    popupWithProfileForm.close();
  }).catch((err) => {
    console.error(err);
  }).finally(() => {
    popupWithProfileForm.isLoadingMessage(false);
  });
});

popupWithProfileForm.setEventListeners();

/** Валидация полей формы редактирования профиля */
const profileValidation = new FormValidator(formSelectors, popupProfileFormElement);
profileValidation.enableValidation();

/** Клик на кнопке редактирования профиля */
profileEditButtonElement.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  popupProfileNameElement.value = userData.userName;
  popupProfileAboutElement.value = userData.userAbout;
  popupWithProfileForm.open();
});



/** ---------- Новая карточка ----------*/

/** Создание новой карточки */
const popupWithCardForm = new PopupWithForm(popupCardSelector, (formData) => {
  const card = createCard({name: formData.name, link: formData.link});
  popupWithCardForm.isLoadingMessage(true);
  api.addNewCard(formData).then((newCardItem) => {
    const cardElm = createCard(newCardItem, card);
    card.addNewItem(card);
    popupWithCardForm.close();
  }).catch((err) => {
    console.error(err);
  }).finally(() => {
    popupWithCardForm.isLoadingMessage(false);
  });
  // renderCards.addItemPrepend(card);
  // popupWithCardForm.close();
});

popupWithCardForm.setEventListeners();

/** Валидация полей формы добавления новой карточки*/
const newCardValidation = new FormValidator(formSelectors, popupCardFormElement);
newCardValidation.enableValidation();

/** Клик на кнопке добавления новой карточки */
cardAddButtonElement.addEventListener('click', () => {
  newCardValidation.toggleButtonState();
  popupWithCardForm.open();
});


/** Подтвердить удаление карточки */
const popupWithConfirmation = new PopupWithConfirmation(popupConfirmationSelector);
popupWithConfirmation.setEventListeners();

/** Просмотр картинки в попапе */
const popupWithImage = new PopupWithImage(popupImageSelector);
popupWithImage.setEventListeners();




function createCard(cardData) {
  const newCard = new Card({
    cardData: cardData,
    cardTemplateSelector: cardTemplateSelector,
    userId: userInfo.getUserId(),
    handleCardClick: (cardData) => {
      popupWithImage.open(cardData)
    },
    handleLikeButton: () => {
      if (newCard.isLiked) {
        api.deleteCardLike(newCard.getCardId()).then((cardData) => {
          newCard.unsetLike();
          newCard.updatelikesCounter(cardData.likes);
        }).catch((err) => {
          console.error(err);
        });
      } else {
        api.addCardLike(newCard.getCardId()).then((cardData) => {
          newCard.setLike();
          newCard.updatelikesCounter(cardData.likes);
        }).catch((err) => {
          console.error(err);
        });
      }
    },
    handleRemoveButton: (event) => {
      const cardElement = event.target.closest('.card');
      popupWithConfirmation.open();
      const cardId = newCard.getCardId();
      popupWithConfirmation.changeHandleFormSubmit(() => {
        api.removeCard(cardId).then(() => {
          cardElement.remove();
          popupWithConfirmation.close();
        }).catch((err) => {
          console.error(err);
        });
      });
    }
  });

  return newCard.generateCard();
};


