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
    this._popupSelector = document.querySelector(popupSelector);
  }

  openPopup() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  closePopup() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.closePopup();
    }
  }


  setEventListeners() {
    this._popupSelector.addEventListener('click', event => {
      if (event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__close-button')) {
        this.closePopup();
      };
    });
  }
}
