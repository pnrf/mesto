/** Создайте класс Popup, который отвечает за открытие и закрытие попапа.
 * Этот класс:
 * Принимает в конструктор единственный параметр — селектор попапа.
 * Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
 * Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
 * Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа. Модальное окно также
 * закрывается при клике на затемнённую область вокруг формы.
 */

/** Данный класс является слоем и не имеет своего представления.
 * Он отвечает исключительно за открытие и закрытие попапа.
 * Весь функционал этого класса передается его наследникам -- PopupWithImage и PopupWithForm.
 */
export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener('mousedown', event => {
      if (event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__close-button')) {
        this.close();
      };
    });
  }
}
