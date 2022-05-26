/** Создайте класс PopupWithImage, который наследует от Popup.
 * Этот класс должен перезаписывать родительский метод open.
 * В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.
*/
import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    _popupImageElement = this._popupElement.querySelector('.popup__image');
    _popupImageСaptionElement = this._popupElement.querySelector('.popup__figcaption');

  open(item) {
    console.log("popup with image open ==", item);
    this._popupImageСaptionElement.textContent = item.name;
    this._popupImageElement.src = item.link;
    this._popupImageElement.alt = `${item.name}. Фотография`;

    super.open();
  }
}

