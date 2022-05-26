import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement = this._popupSelector.querySelector('.popup__input-list');
  }

  submitCallback(event) {
    this._handleSubmit = event;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('click', event => {
      event.preventDefault();
      this._handleSubmit();
    });
  }



  // setEventListener() {
  //   this._formElement.addEventListener('submit', event => this._handleFormSubmit(event));
  //   super.setEventListener();
  // }

  // changeHandleFormSubmit(event) {
  //   event.preventDefault();
  //   this._handleFormSubmit = event;
  //}
}
