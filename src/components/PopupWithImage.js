/** Создайте класс PopupWithImage, который наследует от Popup.
 * Этот класс должен перезаписывать родительский метод open.
 * В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.
*/
import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector){
    super(popupSelector);
    this._popupImageElement = this._popupElement.querySelector('.popup__image');
    this._popupImageСaptionElement = this._popupElement.querySelector('.popup__figcaption');
  }

  open(name, link) {
    this._popupImageСaptionElement.textContent = name;
    this._popupImageElement.src = link;
    this._popupImageElement.alt = `${name}. Фотография`;

    super.open();
  }
}

