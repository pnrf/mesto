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
    constructor(popupSelector, callbackSubmitForm) {
      super(popupSelector); // вызывает конструктор родительского класса с одним аргументом - селектором формы;
      this._popupElement = document.querySelector(popupSelector);
      this._popupForm = this._popupElement.querySelector('.popup__input-list'); // ссылка на форму
      this._submitButtonElement = this._popupElement.querySelector('.popup__save-button'); // ссылка на кнопку submit формы
      this._callbackSubmitForm = callbackSubmitForm;
    }

    /** _getInputValues - приватный метод: собрать данные всех полей формы. Куда? - в некий объект.
    * Порядок действий:
    * 1) создать новый объект;
    * 2) обойти методом forEach псевдомассив всех полей input формы,
    * 3) их значения записать в созданный объект.
    * 4) вернуть созданный объект.
    */
    getInputValues() {
      this._inputsList = this._popupForm.querySelectorAll('.popup__input'); // псевдомассив всех полей input формы
      this._formValues = [];
      this._inputsList.forEach(input => this._formValues.push(input.value));
      // пришлось использовать массив вместо объекта. При добавлении input в объект, его значение перезаписывается:
      // this._formValues = {};
      // inputList.forEach(input => formValues[input.name] = input.value);
      return this._formValues;
    }

    getPopupForm () {
      return this._popupForm;
    }

   /** перезаписать родительский метод setEventListeners */
    setEventListeners() {
      super.setEventListeners();
      this._popupElement.addEventListener('submit', event => {
        this._callbackSubmitForm(event);
      });
    }

   /** перезаписать родительский метод closePopup */
    closePopup() {
      this._popupForm.reset(); // сбросить значения полей формы.
      super.closePopup();
    }
}
