/** Класс UserInfo отвечает за управление отображением информации о пользователе на странице.
 * Этот класс:
 * Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
 * Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
 * Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
*/

export default class UserInfo {
  constructor({profileNameSelector, profileAboutSelector}) {
    this._profileNameElement = document.querySelector(profileNameSelector);
    this._profileAboutElement = document.querySelector(profileAboutSelector);
  }

  /** getUserInfo -- публичный метод:
   * возвращает объект с данными пользователя
  */
  getUserInfo() {
    return {
      userName: this._profileNameElement.textContent,
      userAbout: this._profileAboutElement.textContent
    }
  }

  /** setUserInfo -- публичный метод:
   * принимает новые данные пользователя
   * добавляет новые данные пользователя на страницу
  */
  setUserInfo({userName, userAbout}) {
    this._profileNameElement.textContent = userName;
    this._profileAboutElement.textContent = userAbout;
  }
}
