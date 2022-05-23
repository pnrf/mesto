/** Создайте класс Card, который создаёт карточку с текстом и ссылкой на изображение:
 * принимает в конструктор её данные и селектор её template-элемента;
 * содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
 * содержит приватные методы для каждого обработчика;
 * содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
 *
 * Для каждой карточки создайте экземпляр класса Card. */

/**Свяжите класс Card c попапом.
 * Сделайте так, чтобы Card принимал в конструктор функцию handleCardClick.
 * Эта функция должна открывать попап с картинкой при клике на карточку.
 */

export default class Card {
  constructor(cardData, cardTemplateSelector, handleCardClick) {
    this._cardNameData = cardData.name;
    this._cardLinkData = cardData.link;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
  }

// клонировать темлейт из html в DOM
  _getTemplate() {
    return document
      .querySelector(this._cardTemplateSelector) // использую селектор для карточки
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

// сгенерировать карточку, т.е. наполнить темплейт содержимым
  generateCard() {
    this._cardElement = this._getTemplate();

    this._cardTitleElement = this._cardElement.querySelector('.card__title');
    this._cardTitleElement.textContent = this._cardNameData;

    this._cardImageElement = this._cardElement.querySelector('.card__image');
    this._cardImageElement.src = this._cardLinkData;
    this._cardImageElement.alt = `${this._cardNameData}. Фотография`;

    this._likeButtonElement = this._cardElement.querySelector('.card__like-button');

    this._setEventListeners();

    return this._cardElement;
  }

//  установить слушатели событий в сгенерированной карточке (а не в темплейте):
  _setEventListeners() {

    // установить слушатель на картинку для открытия попапа
      this._cardImageElement.addEventListener('click', () => {
        this._handleCardClick();
      });

    // установить слушатель на кнопку лайк/дизлайк (сердечко)
      this._likeButtonElement.addEventListener('click', () => {
        this._handleLikeButton();
      });

    // установить слушатель на кнопку попапа для удаления карточки (корзинка)
      this._cardElement.querySelector('.card__del-button').addEventListener('click', () => {
        this._removeCard();
      });
  }

  _handleLikeButton() {
    this._likeButtonElement.classList.toggle('card__like-button_active');
  }

  _removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

}
