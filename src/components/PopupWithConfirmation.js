import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement = this._popupSelector.querySelector('.popup__form');
  }

  setEventListener() {
    this._formElement.addEventListener('submit', event => this._handleFormSubmit(event));
    super.setEventListener();
  }

  changeHandleFormSubmit(event) {
    event.preventDefault();
    this._handleFormSubmit = event;
  }
}
