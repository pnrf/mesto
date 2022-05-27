/** Класс UserInfo отвечает за управление отображением информации о пользователе на странице.
 * Этот класс:
 * Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
 * Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
 * Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
*/

export default class UserInfo {
  constructor({profileNameSelector, profileAboutSelector, profileAvatarSelector}) {
    this._profileNameElement = document.querySelector(profileNameSelector);
    this._profileAboutElement = document.querySelector(profileAboutSelector);
    this._profileAvatarElement = document.querySelector(profileAvatarSelector);
  }

  /** getUserInfo -- возвращает объект с данными пользователя */
  getUserInfo() {
    return {
      userName: this._profileNameElement.textContent,
      userAbout: this._profileAboutElement.textContent
    }
  }

  /** setUserInfo -- принимает первоначальные данные пользователя, добавляет их на страницу */
  setUserInfo(userData) {
    const {userName, userAbout, userAvatar, userId} = userData;
    this._profileNameElement.textContent = userName;
    this._profileAboutElement.textContent = userAbout;
    this._profileAvatarElement.src = userAvatar;
    this._userId = userId;
  }

  /** changeUserInfo -- изменяет данные пользователя.
   * Пришлось сделать это отдельным методом. Иначе при изменении данных автоматически удаляется аватарка.
   * Я пытался задать в методе setUserInfo значения по умолчанию. Не получается.
   */
  changeUserInfo({userName, userAbout}) {
    this._profileNameElement.textContent = userName;
    this._profileAboutElement.textContent = userAbout;
  }

  setUserAvatar({newUserAvatar}) {
    this._profileAvatarElement.src = newUserAvatar;
  }

  getUserId() {
    return this._userId;
  }
}
