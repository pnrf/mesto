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
    this._inputErrorSelector = formSelectors.inputErrorSelector;
    this._inputErrorClass = formSelectors.inputErrorClass;
    this._errorClass = formSelectors.errorClass;
    this._inactiveButtonClass = formSelectors.inactiveButtonClass;
    this._inputSelectorList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(formSelectors.buttonElement);
  }

  /** приватный метод: добавить сообщение об ошибке */
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = inputElement.closest(this._inputFieldSelector).querySelector(this._inputErrorSelector); // ссылка на span внутри формы
    inputElement.classList.add(this._inputErrorClass); // подчеркивает поле input красной линией
    errorElement.textContent = errorMessage; // вставляет в span текст ошибки
    errorElement.classList.add(this._errorClass); // выводит сообщение об ошибке
  }

/** приватный метод: удалить сообщение об ошибке */
  _hideInputError = inputElement => {
    const errorElement = inputElement.closest(this._inputFieldSelector).querySelector(this._inputErrorSelector);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
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
    return this._inputSelectorList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }

/** публичный метод: переключить активность кнопок submit ("сохранить" и "создать")
 * в данном случае важно отслеживать атрибут disabled у кнопки, а в popup__save-button_inactive.css -
 * pointer-events: none, чтобы на неактивной кнопке не срабатывал hover. Также это позволяет исключить
 * возможность добавления пустой карточки.
*/
  toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

/** приватный метод: установить слушатель для добавления сообщений об ошибках при заполнении полей формы */
  _setEventListeners = () => {
    this.toggleButtonState(); // делает кнопку неактивной, если хотя бы одно поле формы невалидно

    this._inputSelectorList.forEach(inputElement => { // для каждого поля input установил слушатель, проверяющий на валидность
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        /** Классовые переменные доступны в любом методе класса, передавать их в качестве параметра не нужно. */
        this.toggleButtonState();
      });
    });
  }

/** публичный метод: запустить выполнение методов класса */
  enableValidation = () => {
    this._setEventListeners();
  };
}

