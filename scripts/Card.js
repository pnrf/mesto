/** Создайте класс Card, который создаёт карточку с текстом и ссылкой на изображение:
 * принимает в конструктор её данные и селектор её template-элемента;
 * содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
 * содержит приватные методы для каждого обработчика;
 * содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
 *
 * Для каждой карточки создайте экземпляр класса Card. */

const popupImageElement = document.querySelector('.popup_type_image'); // ссылка на popup для просмотра картики
const popupFigcaptionElement = popupImageElement.querySelector('.popup__figcaption'); // ссылка на подпись к картинке
const popupImgElm = popupImageElement.querySelector('.popup__image'); // ссылка на картинку в попапе

import {openPopup} from './index.js';

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

  // слушатели событий в сгенерированной карточке (а не в темплейте):
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

  //метод класса: наполнить попап (превью картинки) контентом:
  _addDataToPopupImg = (name, link) => {
    popupFigcaptionElement.textContent = name;
    popupImgElm.src = link;
    popupImgElm.alt = `${name}. Фотография`;
  }
}
