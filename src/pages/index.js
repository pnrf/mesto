/**
 * Файлы скриптов конкретной страницы расположим в уже существующей директории pages. Файлы скриптов страниц содержат только уникальный
 * для конкретной страницы код: создание новых экземпляров класса и передачу в них данных, описание взаимодействия между классами.
 */

/** Data Import */
import {initialCards} from '../utils/initialCards.js';

/** Constants Import */
import {
  editBtnElement,
  addBtnElement,
  profileElement,
  profileNameSelector,
  profileAboutSelector,
  cardListSelector,
  cardSelector,
  popupProfileElement,
  popupProfileFormSelector,
  popupProfileNameSelector,
  popupProfileAboutSelector,
  popupCardsElement,
  popupCardsFormSelector,
  popupCardsPlaceSelector,
  popupCardsLinkSelector,
  popupImageElement,
  formSelectors
} from '../utils/constants.js';

/** Functions Import */
/*
import {
  createCard,
  renderCard,
  addNewCard
} from '../utils/utils.js';
*/

/** Classes Import */
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';



/** --- MAIN CODE --- */

/** Render cards: Card, PopupWithImage */
function createCard(item, cardSelector) {
  const newCard = new Card(item, '#template' /*, () => {
    const popupWithImage = new PopupWithImage(popupImageElement);
    popupWithImage.setEventListeners();
    popupWithImage.openPopupWithImage(item.name, item.link);
  }*/);
  return newCard.generateCard();
}


const renderCards = new Section(
  { items: initialCards,
    renderer: (item) => {
      const card = createCard(item, cardSelector);
      renderCards.addItemAppend(card);
    }
  },
  cardListSelector);

renderCards.renderItems();


/** UserInfo */
const userInfo = new UserInfo(profileNameSelector, profileAboutSelector);


/** PopupWithForm для профайла*/
const popupWithFormProfile = new PopupWithForm(popupProfileElement, (event) => {
  event.preventDefault();
  const formData = popupWithFormProfile.getFormData();
  userInfo.setUserInfo(profileNameSelector, profileAboutSelector);
  popupWithFormProfile.closePopup();
});

popupWithFormProfile.setEventListeners();


/** PopupWithForm для новой карточки */
const popupWithFormNewCard = new PopupWithForm(popupCardsElement, (event) => {
  event.preventDefault();
  const formData = popupWithFormNewCard.getFormData();
  const item = {name: formData.name, link: formData.url};
  const card = createCard(item, cardSelector);
  renderCards.addItemPrepend(card);
  popupWithFormNewCard.closePopup();
});

popupWithFormNewCard.setEventListeners();

/** */

/** перебрать исходный массив, и отрисовать карточки по порядку
 * поскольку функция renderCard использует метод prepend вместо appendChild, то я вынужден применить reverse(),
 * иначе карточки отрисуются в обратном порядке, что будет противоречить макету;
*/
// initialCards.reverse().forEach(item => renderCard(item.name, item.link));

/** редактировать профиль (Жак-Ив Кусто, исследователь океана): */
/** 1) открыть попап при клике на кнопке "редактировать", вставить в попап данные со страницы */
// editBtnElement.addEventListener('click', () => {
//   popupProfileNameSelector.value = profileNameSelector.textContent;
//   popupProfileAboutSelector.value = profileAboutSelector.textContent;
//   openPopup(popupProfileElement);
// });

editBtnElement.addEventListener('click', () => {
  const formElm = popupWithFormProfile.getPopupForm();
  formElm.elements.name.value = userInfo.getUserInfo().profileName;
  formElm.elements.about.value = userInfo.getUserInfo().profileAbout;
  popupWithFormProfile.openPopup();
});

/** 2) закрыть попап при клике на крестик или на оверлей */
// popupProfileElement.addEventListener('click', closePopupWithClick);
/** 3) изменить данные профиля на странице при клике на кнопку "сохранить" */

//popupProfileFormSelector.addEventListener('submit', changeProfileData);


/** добавить новую карточку: */
/** 1) открыть попап при клике на кнопке "добавить"
 * если колбек слушателя содержит однострочную функцию, то ее можно не обособлять фигурными скобками.
*/
addBtnElement.addEventListener('click', () => {
  newCardValidation.toggleButtonState();
  // openPopup(popupCardsElement);
  popupWithFormNewCard.openPopup();
});



/** 2) закрыть попап при клике на крестик или на оверлей */
// popupCardsElement.addEventListener('click', closePopupWithClick);
/** 3) добавить новую карточку на страницу (при клике на кнопке "создать"(submit)) */

// popupCardsFormSelector.addEventListener('submit', addNewCard);


/** закрыть попап с картинкой
 * при клике на крестик или на оверлей
*/
// popupImageElement.addEventListener('click', closePopupWithClick);

/** Просмотр картинки в попапе */
// const popupImageViewer = new PopupWithImage(popupImageElement);
// popupImageViewer.setEventListeners(); // закрыть попап при клике на крестик, оверлей или Esc


/** подключить валидацию полей формы */
// import FormValidator from "./FormValidator.js";
const profileValidation = new FormValidator(formSelectors, popupProfileElement);
const newCardValidation = new FormValidator(formSelectors, popupCardsElement);
profileValidation.enableValidation();
newCardValidation.enableValidation();
