/** Класс UserInfo отвечает за управление отображением информации о пользователе на странице.
 * Этот класс:
 * Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
 * Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
 * Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
*/

export default class UserInfo {
  constructor({profileNameSelector, profileAboutSelector}) {
    this._profileNameSelector = profileNameSelector;
    this._profileAboutSelector = profileAboutSelector;
  }

  /** getUserInfo -- публичный метод:
   * возвращает объект с данными пользователя
  */
  getUserInfo() {
    return {
      profileName: this._profileNameSelector.textContent,
      profileAbout: this._profileAboutSelector.textContent
    }
  }

  /** setUserInfo -- публичный метод:
   * принимает новые данные пользователя
   * добавляет новые данные пользователя на страницу
  */
  setUserInfo(profileName, profileAbout) {
    this._profileNameSelector.textContent = profileName;
    this._profileAboutSelector.textContent = profileAbout;
  }
}
