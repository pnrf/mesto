/** Создайте класс FormValidator, который настраивает валидацию полей формы:
 * принимает в конструктор объект настроек с селекторами и классами формы;
 * принимает вторым параметром элемент той формы, которая валидируется;
 * имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
 * имеет публичный метод enableValidation, который включает валидацию формы.
 *
 * Для каждой проверяемой формы создайте экземпляр класса FormValidator.
 */
export default class FormValidator {
  constructor(inputListSelector, formElement) {
    this._inputList = inputListSelector;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector('.popup__save-button');
  }

  /** приватный метод: добавить сообщение об ошибке */
  _showInputError = (inputElement, errorMessage) => {
  const errorElement = inputElement.closest('.popup__field').querySelector('.popup__input-error'); // ссылка на span внутри формы
  inputElement.classList.add('popup__input_type_error'); // подчеркивает поле input красной линией
  errorElement.textContent = errorMessage; // вставляет в span текст ошибки
  errorElement.classList.add('popup__input-error_active'); // выводит сообщение об ошибке
}

/** приватный метод: удалить сообщение об ошибке */
  _hideInputError = inputElement => {
  const errorElement = inputElement.closest('.popup__field').querySelector('.popup__input-error');
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
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

/** публичный метод: переключить активность кнопок submit ("сохранить" и "создать")
 * в данном случае важно отслеживать атрибут disabled у кнопки, а в popup__save-button_inactive.css -
 * pointer-events: none, чтобы на неактивной кнопке не срабатывал hover. Также это позволяет исключить
 * возможность добавления пустой карточки.
*/
  toggleButtonState = () => {
  if (this._hasInvalidInput(this._inputList)) {
    this._buttonElement.classList.add('popup__save-button_inactive');
    this._buttonElement.setAttribute('disabled', true);
  } else {
    this._buttonElement.classList.remove('popup__save-button_inactive');
    this._buttonElement.removeAttribute('disabled');
  }
}

/** приватный метод: установить слушатель для добавления сообщений об ошибках при заполнении полей формы */
  _setEventListeners = () => {
 //const inputList = Array.from(this._formElement.querySelectorAll('.popup__input')); // создает массив со ссылками на все поля input в форме
  // const buttonElement = this._formElement.querySelector('.popup__save-button'); // находит ссылку на кнопку "сохранить" или "создать"

  this.toggleButtonState(this._buttonElement); // делает кнопку неактивной, если хотя бы одно поле формы невалидно

  this._inputList.forEach(inputElement => { // для каждого поля input установил слушатель, проверяющий на валидность
    inputElement.addEventListener('input', () => {
      this._isValid(inputElement);
      this.toggleButtonState(this._buttonElement);
    });
  });
}

/** публичный метод: запустить выполнение методов класса */
  enableValidation = () => {
    this._setEventListeners();
  };
}

