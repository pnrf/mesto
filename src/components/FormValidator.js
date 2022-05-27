/** Создайте класс FormValidator, который настраивает валидацию полей формы:
 * принимает в конструктор объект настроек с селекторами и классами формы;
 * принимает вторым параметром элемент той формы, которая валидируется;
 * имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
 * имеет публичный метод enableValidation, который включает валидацию формы.
 *
 * Для каждой проверяемой формы создайте экземпляр класса FormValidator.
 */
export default class FormValidator {
  constructor(formSelectors, formElement) {
    this._formElement = formElement;

    this._inputFieldSelector = formSelectors.inputFieldSelector;
    this._inputSelector = formSelectors.inputSelector;
    this._inputErrorMessageClass = formSelectors.inputErrorMessageClass;
    this._inputErrorUnderlineClass = formSelectors.inputErrorUnderlineClass;
    this._activeErrorClass = formSelectors.activeErrorClass;
    this._inactiveSubmitButtonClass = formSelectors.inactiveSubmitButtonClass;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._popupSubmitButtonElement = this._formElement.querySelector(formSelectors.popupSubmitButtonSelector);
  }

  /** приватный метод: добавить сообщение об ошибке */
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = inputElement.closest(this._inputFieldSelector).querySelector(this._inputErrorMessageClass); // ссылка на span внутри формы
    inputElement.classList.add(this._inputErrorUnderlineClass); // подчеркивает поле input красной линией
    errorElement.textContent = errorMessage; // вставляет в span текст ошибки
    errorElement.classList.add(this._activeErrorClass); // выводит сообщение об ошибке
  }

/** приватный метод: удалить сообщение об ошибке */
  _hideInputError = inputElement => {
    const errorElement = inputElement.closest(this._inputFieldSelector).querySelector(this._inputErrorMessageClass);
    inputElement.classList.remove(this._inputErrorUnderlineClass);
    errorElement.classList.remove(this._activeErrorClass);
    errorElement.textContent = '';
  }

/** приватный метод: проверить валидность поля */
  _isValid = inputElement => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

/** приватный метод: перебрать массив, чтобы найти невалидный input */
  _hasInvalidInput = () => {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }

/** resetValidation - публичный метод для очистки ошибок инпутов, выводимых браузером, и управления кнопкой submit.
 * Без него ошибки в инпутах остаются. Если пользователь неверно заполнил поле формы (при этом браузер сразу выводит ошибку), а
 * затем закроет попап, не заполнив корректно форму, (клик на крестик или оверлей, не нажимая submit), то при повторном открытии
 * попапа поля очистятся, но! ранее показанные браузером ошибки останутся. Вот, чтобы такого не было, нужен этот метод.
 */
  resetValidation() {
    this.toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

/** публичный метод: переключить активность кнопок submit ("сохранить" и "создать")
 * в данном случае важно отслеживать атрибут disabled у кнопки, а в popup__save-button_inactive.css -
 * pointer-events: none, чтобы на неактивной кнопке не срабатывал hover. Также это позволяет исключить
 * возможность добавления пустой карточки.
*/
  toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._popupSubmitButtonElement.classList.add(this._inactiveSubmitButtonClass);
      this._popupSubmitButtonElement.setAttribute('disabled', true);
    } else {
      this._popupSubmitButtonElement.classList.remove(this._inactiveSubmitButtonClass);
      this._popupSubmitButtonElement.removeAttribute('disabled');
    }
  }

/** приватный метод: установить слушатель для добавления сообщений об ошибках при заполнении полей формы */
  _setEventListeners = () => {
    this.toggleButtonState(); // делает кнопку неактивной, если хотя бы одно поле формы невалидно

    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this.toggleButtonState();
      });
    });
  }

/** публичный метод: запустить выполнение методов класса */
  enableValidation = () => {
    this._setEventListeners();
  };
}

