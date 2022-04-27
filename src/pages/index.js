/** Import of constants */
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

/** Import of Classes and Data */
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {initialCards} from "../components/initialCards.js";
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

/** (II) FUNCTIONS  */

/** функция: открыть попап:
 * данная функция переиспользуется для всех 3 (трех) попапов
 * поэтому на вход она получает ссылку на соответствующий попап.
 *
 * в функцию добавлен слушатель для закрытия попапа при нажатии Esc. Вместо анонимной стрелочной
 * функции (evt => {closePopupWithEscBtn(evt, item)}) ссылка на функцию closePopupWithEscBtn передается
 * слушателю вторым аргументом(параметром), чтобы этот слушатель удалялся при закрытии попапа. В противном
 * случае код удаления слушателя (см. функцию closePopup) работать не будет.
 */
// const openPopup = item => {
//   item.classList.add('popup_opened');
//   document.addEventListener('keydown', closePopupWithEscBtn);
// };

// export {openPopup};

/** функция: закрыть попап:
 * попап закрывается при клике на крестик, на оверлей и при нажатии Esc;
 * данная функция переиспользуется для всех 3 (трех) попапов
 * поэтому на вход она получает ссылку на соответствующий попап.
 *
 * в функцию добавлен метод для удаления слушателя при закрытии попапа. Из урока: "слушатель редко снимают, но
 * иногда это нужно. Так происходит в браузерной игре: когда персонаж выпивает зелье здоровья, склянка с ним должна
 * исчезать". В данном случае требование удалить слушатель обосновано тем, что слушатель клавиатуры реагирует на
 * все нажатия клавиш. Когда нет открытого попапа, то не стоит зря загружать систему.
 */
// const closePopup = item => {
//   item.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closePopupWithEscBtn);
// };

/** функция: закрыть попап при нажатии Esc */
// const closePopupWithEscBtn = evt => {
//   if (evt.key === 'Escape') {
//     const openedPopup = document.querySelector('.popup_opened');
//     closePopup(openedPopup);
//   };
// };

/** функция: закрыть попап при клике на крестик или на оверлей
 * данная функция применяется для 3-х разных попапов, кнопки в которых тоже разные;
*/
// const closePopupWithClick = evt => {
//   const openedPopup = document.querySelector('.popup_opened');
//   const closeBtnElement = openedPopup.querySelector('.popup__close-button');
//   if (evt.target.contains(closeBtnElement)) {
//     closePopup(openedPopup);
//   };
// };

/** функция: изменить данные профиля на странице: */
// const changeProfileData = evt => {
//   evt.preventDefault();
//   profileNameSelector.textContent = popupProfileNameSelector.value;
//   profileAboutSelector.textContent = popupProfileAboutSelector.value;
//   closePopup(popupProfileElement);
// };

const profileInfo = new UserInfo(profileNameSelector, profileAboutSelector);

/** задача функций createCard и renderCard: отрисовать карточку на странице (вставить в разметку):
 * функция renderCard переиспользуется для отрисовки исходного массива и для добавления новой карточки;
 * на вход функция получает 2 (два) строчных значения (текст и ссылку), которые пользователь ввел в форму;
 * эти значения присваиваются ключам-переменным (name, link);
 * затем ключи-переменные объединяем и в качестве (!)объекта передаем в класс Card;
*/

// import {initialCards} from "./initialCards.js";
// import Card from "./Card.js";

/** функция: создает карточку и возвращает ее разметку, которую мы вставляем в нужное место через функцию renderCard */
const createCard = (name, link) => {
  const card = new Card({name, link}, '#template');
  const generatedCard = card.generateCard();
  return generatedCard;
};

/** функция render вызывает функцию create для создания карточки, получает из нее разметку и эту готовую разметку prepend
 * в нужную секцию или при необходимости на другую страницу. Т.е. цель этой функции -- место вставки кода.
 */
const renderCard = (name, link) => {
  cardListSelector.prepend(createCard(name, link));
};

/** функция: обработчик события для добавления новой карточки (при клике на кнопку "создать")
 * сюда же добавлен функционал обнуления значений попапа, чтобы они не появлялись при новом открытии попапа и
 * функция деактивации кнопки "создать"
*/
const addNewCard = evt => {
  evt.preventDefault();
  renderCard(popupCardsPlaceSelector.value, popupCardsLinkSelector.value);
  closePopup(popupCardsElement);
  popupCardsFormSelector.reset(); // обнуление значений полей формы в попапе
};


/** (III) EVENT HANDLERS  */

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
