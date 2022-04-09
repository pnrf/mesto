const popupImageElement = document.querySelector('.popup_type_image'); // ссылка на popup для просмотра картики
const popupFigcaptionElement = popupImageElement.querySelector('.popup__figcaption'); // ссылка на подпись к картинке
const popupImgElm = popupImageElement.querySelector('.popup__image'); // ссылка на картинку в попапе

import {openPopup} from './index.js';

/** функция: сгенерировать карточку из темлейта:
 * 1) клонировать темплейт из html в DOM;
 * 2) наполнить темплейт содержимым: название места, ссылка на картинку, alt к картинке;
 * 3) установить слушатели: на картинку, на кнопку лайк/дизлайк, на кнопку удаления карточки (корзинку);
 *
 * на вход функция получает объект, поэтому обращаемся к свойствам объекта можно через точку: item.name и item.link,
 * через ключ-переменную: item['name'] и item['link'] либо воспользоваться деструктуризацией: const createCard = ({name, link}) => {};
 * данная функция возвращает сгенерированную карточку;
 * для отрисовки карточки на странице используется функция renderCard();
*/
export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  // метод класса: клонировать темлейт из html в DOM
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector) // использую селектор для карточки
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  // метод класса: сгенерировать карточку, т.е. наполнить темплейт содержимым
  generateCard() {
    this._cardElement = this._getTemplate();

    this._cardElementTitle = this._cardElement.querySelector('.card__title');
    this._cardElementImage = this._cardElement.querySelector('.card__image');

    this._cardElementTitle.textContent = this._name;
    this._cardElementImage.src = this._link;
    this._cardElementImage.alt = `${this._name}. Фотография`;

    this._setEventListeners();

    return this._cardElement;
  }

  //установить слушатели событий в сгенерированной карточке (а не в темплейте):
  _setEventListeners() {
    // установить слушатель на картинку
    this._cardElementImage.addEventListener('click', () => {
      this._addDataToPopupImg(this._name, this._link);
      openPopup(popupImageElement);
    });
    // установить слушатель на кнопку лайк/дизлайк (сердечко)
    this._cardElement.querySelector('.card__like-button').addEventListener('click', evt => {
      evt.target.classList.toggle('card__like-button_active');
    });
    // установить слушатель на кнопку попапа для удаления карточки (корзинка)
    this._cardElement.querySelector('.card__del-button').addEventListener('click', evt => {
      evt.target.closest('.card').remove();
    });
  }

  _addDataToPopupImg = (name, link) => {
    popupFigcaptionElement.textContent = name;
    popupImgElm.src = link;
    popupImgElm.alt = `${name}. Фотография`;
  }
}


