/** Создайте класс PopupWithForm, который наследует от Popup. Этот класс:
 * Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
 * Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
 * Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm должен
 * не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
 * Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
 * Для каждого попапа создавайте свой экземпляр класса PopupWithForm.
 */
import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
      super(popupSelector); // вызывает конструктор родительского класса с одним аргументом - селектором формы;
      this._popupForm = this._popupElement.querySelector('.popup__input-list'); // ссылка на форму
      this._inputsList = this._popupForm.querySelectorAll('.popup__input'); // псевдомассив всех полей input формы
      this._submitButtonElement = this._popupElement.querySelector('.popup__save-button'); // ссылка на кнопку submit формы
      this._handleFormSubmit = handleFormSubmit;
    }

    /** _getInputValues - приватный метод: собрать данные всех полей формы. */
    _getInputValues() {
      this._formValues = {};
      this._inputsList.forEach(input => {
        console.log("FFF", input);
        this._formValues[input.name] = input.value});
      return this._formValues;
    }

    /** перезаписать родительский метод setEventListeners */
    setEventListeners() {
      super.setEventListeners();
      this._popupElement.addEventListener('submit', (event) => {
        event.preventDefault();
        this._handleFormSubmit(this._getInputValues());
      });
    }

   /** перезаписать родительский метод close */
    close() {
      super.close();
      this._popupForm.reset(); // сбросить значения полей формы.
    }
}
