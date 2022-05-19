/** Создайте класс PopupWithImage, который наследует от Popup.
 * Этот класс должен перезаписывать родительский метод open.
 * В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.
*/
import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    _popupImageSelector = this._popupSelector.querySelector('.popup__image'); // ссылка на картинку в попапе
    _popupImageСaptionSelector = this._popupSelector.querySelector('.popup__figcaption'); // ссылка на подпись к картинке

  openPopupWithImage(item) {
    this._popupImageСaptionSelector.textContent = item.name;
    this._popupImageSelector.src = item.link;
    this._popupImageSelector.alt = `${item.name}. Фотография`;

    super.openPopup();
  }
}

