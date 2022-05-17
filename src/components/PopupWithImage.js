/** Создайте класс PopupWithImage, который наследует от Popup.
 * Этот класс должен перезаписывать родительский метод open.
 * В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.
*/
import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
//  constructor() {
  _popupImageSelector = this._popupSelector.querySelector('.popup__image'); // ссылка на картинку в попапе
  _popupImageFigcaptionSelector = this._popupSelector.querySelector('.popup__figcaption'); // ссылка на подпись к картинке
//  }

  /** openPopupWithImage - публичный метод: вставить в попап картинку (src), alt и подпись к картинке
   * ранее это был метод _addDataToPopupImg класса Card (Card.js)
  */
  openPopupWithImage(name, link) {
    this._popupImageFigcaptionSelector.textContent = name;
    this._popupImageSelector.src = link;
    this._popupImageSelector.alt = `${name}. Фотография`;

    super.openPopup();
  }
}
