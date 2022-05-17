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
      this._popupForm = this._popupSelector.querySelector('.popup__input-list'); // ссылка на форму
      this._formInputFields = this._popupForm.querySelectorAll('.popup__input'); // псевдомассив всех полей input формы
      this._submitButtonElement = this._popupSelector.querySelector('.popup__save-button'); // ссылка на кнопку submit формы
      this._callbackSubmitForm = callbackSubmitForm;
    }

    /** _getInputValues - приватный метод: собрать данные всех полей формы. Куда? - в некий объект.
    * Порядок действий:
    * 1) создать новый объект;
    * 2) обойти методом forEach псевдомассив всех полей input формы,
    * 3) их значения записать в созданный объект. Обратиться к свойству объекта лучше не через точку, а через квадратные скобки (это универсальный способ).
    * 4) вернуть созданный объект.
    */
    _getInputValues() {
      this._formInputFieldsArr = {};

      this._formInputFields.forEach(item => {
        this._formInputFieldsArr[item] = item.value;
      });
      return this._formInputFieldsArr;
    }

    /** а нужно ли???? */
    getFormData() {
      return this._getInputValues();
    }

    getPopupForm () {
      return this._popupForm;
    }

   /** перезаписать родительский метод setEventListeners */
    setEventListeners() {
      this._popupSelector.addEventListener('click', evt => {
        this._callbackSubmitForm(evt);
        super.setEventListeners();
      });
    }

   /** перезаписать родительский метод closePopup */
    closePopup() {
      this._popupForm.reset(); // сбросить значения полей формы.
      super.closePopup();
    }

    /** для каждого попапа нужно создавать свой экземпляр класса PopupWithForm */
}
