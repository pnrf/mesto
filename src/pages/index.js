/**
 * Файлы скриптов конкретной страницы расположим в уже существующей директории pages. Файлы скриптов страниц содержат только уникальный
 * для конкретной страницы код: создание новых экземпляров класса и передачу в них данных, описание взаимодействия между классами.
 */
import './index.css';

/** Data Import */
import {initialCards} from '../utils/initialCards.js';

/** Classes Import */
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

/** Constants Import */
import {
  profileEditButtonSelector,
  cardAddButtonSelector,
  profileSelector,
  profileNameSelector,
  profileAboutSelector,
  cardsContainerSelector,
  popupProfileSelector,
  popupProfileNameSelector,
  popupProfileAboutSelector,
  popupCardSelector,
  popupImageSelector,
  cardTemplateSelector,
  formSelectors
} from '../utils/constants.js';

/** Constants and variables */
const profileElement = document.querySelector(profileSelector);
const profileEditButtonElement = profileElement.querySelector(profileEditButtonSelector);

const popupProfileFormElement = document.querySelector(popupProfileSelector);
const popupCardFormElement = document.querySelector(popupCardSelector);

const popupProfileNameElement = popupProfileFormElement.querySelector(popupProfileNameSelector);
const popupProfileAboutElement = popupProfileFormElement.querySelector(popupProfileAboutSelector);


/** --- MAIN CODE --- */

/** При загрузке страницы отрисовать initial cards. */
const popupWithImage = new PopupWithImage(popupImageSelector);
popupWithImage.setEventListeners();

function createCard(cardData) {
  const newCard = new Card(cardData, cardTemplateSelector, () => {popupWithImage.open(cardData)});
  return newCard.generateCard();
};

const renderCards = new Section(
  { items: initialCards,
    renderer: (cardData) => {
      const card = createCard(cardData);
      renderCards.addItemAppend(card);
    }
  },
  cardsContainerSelector);

renderCards.renderItems();


/** Изменение данных профиля */
const userInfo = new UserInfo({profileNameSelector, profileAboutSelector});

const popupWithProfileForm = new PopupWithForm(popupProfileSelector, (formData) => {
  userInfo.setUserInfo({userName: formData.userName, userAbout: formData.userAbout});
  popupWithProfileForm.close();
});

popupWithProfileForm.setEventListeners();

profileEditButtonElement.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  popupProfileNameElement.value = userData.userName;
  popupProfileAboutElement.value = userData.userAbout;
  popupWithProfileForm.open();
});


/** Создание новой карточки */
const popupWithCardForm = new PopupWithForm(popupCardSelector, (formData) => {
  const card = createCard({name: formData.name, link: formData.link});
  renderCards.addItemPrepend(card);
  popupWithCardForm.close();
});

popupWithCardForm.setEventListeners();

document.querySelector(cardAddButtonSelector).addEventListener('click', () => {
  newCardValidation.toggleButtonState();
  popupWithCardForm.open();
});


/** Подключение валидации полей формы */
const profileValidation = new FormValidator(formSelectors, popupProfileFormElement);
const newCardValidation = new FormValidator(formSelectors, popupCardFormElement);
profileValidation.enableValidation();
newCardValidation.enableValidation();
