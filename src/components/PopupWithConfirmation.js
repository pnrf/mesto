import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector('.popup__input-list');
  }

  updateSubmitHandler(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', event => {
      event.preventDefault();
      this._handleSubmit();
    });
  }
}
