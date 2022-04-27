/** Importing constants */
import {
  editBtnElement,
  addBtnElement,

  profileElement,
  profileNameSelector,
  profileAboutSelector,

  cardListSelector,

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


/** Importing data */
import {initialCards} from "../components/initialCards.js";


/** Importing functions */
import {
  createCard,
  renderCard,
  addNewCard
} from '../utils/utils.js';


/** Importing Classes */
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';


/** MAIN CODE: class instances and event handlers */
const profileInfo = new UserInfo(profileNameSelector, profileAboutSelector);









/** перебрать исходный массив, и отрисовать карточки по порядку
 * поскольку функция renderCard использует метод prepend вместо appendChild, то я вынужден применить reverse(),
 * иначе карточки отрисуются в обратном порядке, что будет противоречить макету;
*/
initialCards.reverse().forEach(item => renderCard(item.name, item.link));

/** редактировать профиль (Жак-Ив Кусто, исследователь океана): */
/** 1) открыть попап при клике на кнопке "редактировать", вставить в попап данные со страницы */
editBtnElement.addEventListener('click', () => {
  popupProfileNameSelector.value = profileNameSelector.textContent;
  popupProfileAboutSelector.value = profileAboutSelector.textContent;
  openPopup(popupProfileElement);
});
/** 2) закрыть попап при клике на крестик или на оверлей */
// popupProfileElement.addEventListener('click', closePopupWithClick);
/** 3) изменить данные профиля на странице при клике на кнопку "сохрать" */
popupProfileFormSelector.addEventListener('submit', changeProfileData);


/** добавить новую карточку: */
/** 1) открыть попап при клике на кнопке "добавить"
 * если колбек слушателя содержит однострочную функцию, то ее можно не обособлять фигурными скобками.
*/
addBtnElement.addEventListener('click', () => {
  newCardValidation.toggleButtonState();
  openPopup(popupCardsElement);
});
/** 2) закрыть попап при клике на крестик или на оверлей */
// popupCardsElement.addEventListener('click', closePopupWithClick);
/** 3) добавить новую карточку на страницу (при клике на кнопке "создать"(submit)) */
popupCardsFormSelector.addEventListener('submit', addNewCard);


/** закрыть попап с картинкой
 * при клике на крестик или на оверлей
*/
// popupImageElement.addEventListener('click', closePopupWithClick);

/** Просмотр картинки в попапе */
const popupImageViewer = new PopupWithImage(popupImageElement);
popupImageViewer.setEventListeners(); // закрыть попап при клике на крестик, оверлей или Esc


/** подключить валидацию полей формы */
// import FormValidator from "./FormValidator.js";
const profileValidation = new FormValidator(formSelectors, popupProfileElement);
const newCardValidation = new FormValidator(formSelectors, popupCardsElement);
profileValidation.enableValidation();
newCardValidation.enableValidation();
