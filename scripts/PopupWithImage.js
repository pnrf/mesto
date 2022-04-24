/** Создайте класс PopupWithImage, который наследует от Popup.
 * Этот класс должен перезаписывать родительский метод open.
 * В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.
*/
import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  _popupImage = this._popupSelector.querySelector('.popup__image'); // ссылка на картинку в попапе
  _popupImageFigcaption = this._popupSelector.querySelector('.popup__figcaption'); // ссылка на подпись к картинке

  /** openPopupWithImage - публичный метод: вставить в попап картинку (src), alt и подпись к картинке
   * ранее это был метод _addDataToPopupImg класса Card (Card.js)
  */
  openPopupWithImage(name, link) {
    this._popupImageFigcaption.textContent = name;
    this._popupImage.src = link;
    this._popupImage.alt = `${name}. Фотография`;

  /** не совсем понимаю, что означает "этот класс должен перезаписывать родительский метод open". Мож, переиспользовать???
   * логика подсказывает, что нужно просто вызвать метод родительского класса:
   */
    super.openPopup();
  }
}
