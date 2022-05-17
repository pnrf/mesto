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

/** задача функций createCard и renderCard: отрисовать карточку на странице (вставить в разметку):
 * функция renderCard переиспользуется для отрисовки исходного массива и для добавления новой карточки;
 * на вход функция получает 2 (два) строчных значения (текст и ссылку), которые пользователь ввел в форму;
 * эти значения присваиваются ключам-переменным (name, link);
 * затем ключи-переменные объединяем и в качестве (!)объекта передаем в класс Card;
*/

import {initialCards} from "../components/initialCards.js";
import Card from "../components/Card.js";
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

/** функция: создает карточку и возвращает ее разметку, которую мы вставляем в нужное место через функцию renderCard */
export const createCard = (name, link) => {
  const card = new Card({name, link}, '#template');
  const generatedCard = card.generateCard();
  return generatedCard;
};

/** функция render вызывает функцию create для создания карточки, получает из нее разметку и эту готовую разметку prepend
 * в нужную секцию или при необходимости на другую страницу. Т.е. цель этой функции -- место вставки кода.
 */
export const renderCard = (name, link) => {
  cardListSelector.prepend(createCard(name, link));
};

/** функция: обработчик события для добавления новой карточки (при клике на кнопку "создать")
 * сюда же добавлен функционал обнуления значений попапа, чтобы они не появлялись при новом открытии попапа и
 * функция деактивации кнопки "создать"
*/
export const addNewCard = evt => {
  evt.preventDefault();
  renderCard(popupCardsPlaceSelector.value, popupCardsLinkSelector.value);
  closePopup(popupCardsElement);
  popupCardsFormSelector.reset(); // обнуление значений полей формы в попапе
};
