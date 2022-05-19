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
    this._popupSelector = document.querySelector(popupSelector); // принимает на вход селектор попапа (ссылку на конкретный попап);
  }

  /** openPopup -- публичный метод: открыть попап (ранее это была функция openPopup в index.js)*/
  openPopup() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  /** closePopup -- публичный метод: закрыть попап (ранее это была функция closePopup в index.js)*/
  closePopup() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  /** _handleEscClose -- приватный метод: закрыть попап клавишей Esc (ранее это была функция closePopupWithEscBtn в index.js) */
  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.closePopup();
    }
  }

  /** setEventListeners -- публичный метод:
   * добавить слушатель клика иконке закрытия попапа (крестик);
   * добавить слушатель клика на затемненную область вокруг попапа (оверлей).
   * Ранее в index.js это были слушатели, установленные на кнопки editBtnElement и addBtnElement, а также функция closePopupWithClick.
   * Здесь вместо переменных функции, которые querySelector классы '.popup_opened' и '.popup__close-button', нахожу эти элементы через evt.target;
   */
  setEventListeners() {
    this._popupSelector.addEventListener('click', event => {
      if (event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__close-button')) {
        this.closePopup();
      };
    });
  }
}
