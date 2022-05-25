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

/** Получить данные c сервера или вывести сообщение об ошибке*/
api.getDataFromServer().then((responses) => {
  const [initialCards, userData] = responses;

  console.log("Данные карточки", initialCards);
  console.log("Данные пользователя", userData);

  userInfo.setUserInfo({userName: userData.name, userAbout: userData.about});
  userInfo.setUserAvatar({userAvatarLink: userData.avatar});
  userInfo.saveUserId(userData._id);

  renderCards.renderItems(initialCards);
}).catch((err) => {
  console.error(err);
});

/** При загрузке страницы отрисовать initial cards. */
const renderCards = new Section(
  {
  renderer: (cardData) => {
      const card = createCard(cardData);// ok
      renderCards.addItemAppend(card);// ok
    }
  },
  cardsContainerSelector);


function createCard(cardData) {

  const newCard = new Card({
    cardData,
    cardTemplateSelector,
    userId:userInfo.getUserId(),
    handleCardClick: () => {popupWithImage.open(cardData)},
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
      const cardId = newCard.getCardId();
      popupWithConfirmation.changeHandleFormSubmit((event) => {
        api.removeCard(cardId).then(() => {
          cardElement.remove();
          popupWithConfirmation.close();
        }).catch((err) => {
          console.error(err);
        });
      });
      popupWithConfirmation.open();
    }
  });

  return newCard.generateCard();
};


/** Изменение данных профиля */
const userInfo = new UserInfo({profileNameSelector, profileAboutSelector, profileAvatarSelector});

/** Сменить аватар профиля*/
const popupUpdateAvatar = new PopupWithForm(popupAvatarSelector, (formData) => {
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

/** Изменить имя и описание профиля */
const popupWithProfileForm = new PopupWithForm(popupProfileSelector, (formData) => {
  popupWithProfileForm.isLoadingMessage(true);
  api.updateUserInfo({userName: formData.userName, userAbout: formData.userAbout}).then((data) => {
    userInfo.setUserInfo({userName: data.name, userAbout: data.about});
    popupWithProfileForm.close();
  }).catch((err) => {
    console.error(err);
  }).finally(() => {
    popupWithProfileForm.isLoadingMessage(false);
  });
});

popupWithProfileForm.setEventListeners();


/** Клик на кнопке редактирования профайла */
profileEditButtonElement.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  popupProfileNameElement.value = userData.userName;
  popupProfileAboutElement.value = userData.userAbout;
  popupWithProfileForm.open();
});


/** Создание новой карточки */
const popupWithCardForm = new PopupWithForm(popupCardSelector, (formData) => {
  const card = createCard({name: formData.name, link: formData.link});
  popupWithCardForm.isLoadingMessage(true);
  api.addNewCard(formData).then((newCardItem) => {
    const cardElm = createCard(newCardItem, card);
    cards.addNewItem(card);
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

/** Подключение валидации полей формы */
const profileValidation = new FormValidator(formSelectors, popupProfileFormElement);
const newCardValidation = new FormValidator(formSelectors, popupCardFormElement);
const avatarValidation = new FormValidator(formSelectors, popupAvatarFormElement);
profileValidation.enableValidation();
newCardValidation.enableValidation();
avatarValidation.enableValidation();




