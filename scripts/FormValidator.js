/** Создайте класс FormValidator, который настраивает валидацию полей формы:
 * принимает в конструктор объект настроек с селекторами и классами формы;
 * принимает вторым параметром элемент той формы, которая валидируется;
 * имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
 * имеет публичный метод enableValidation, который включает валидацию формы.
 *
 * Для каждой проверяемой формы создайте экземпляр класса FormValidator.
 */
export default class FormValidator {
  constructor(formSelector) {
    this._formSelector = formSelector;
  }


  /** функция: добавить сообщение об ошибке */
  _showInputError = (inputElement, errorMessage) => {
  const errorElement = inputElement.closest('.popup__field').querySelector('.popup__input-error'); // ссылка на span внутри формы
  inputElement.classList.add('popup__input_type_error'); // подчеркивает поле input красной линией
  errorElement.textContent = errorMessage; // вставляет в span текст ошибки
  errorElement.classList.add('popup__input-error_active'); // выводит сообщение об ошибке
}

/** функция: удалить сообщение об ошибке */
  _hideInputError = inputElement => {
  const errorElement = inputElement.closest('.popup__field').querySelector('.popup__input-error');
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
}

/** функция: проверить валидность поля */
  _isValid = inputElement => {
  if (!inputElement.validity.valid) {
    this._showInputError(inputElement, inputElement.validationMessage);
  } else {
    this._hideInputError(inputElement);
  }
}

/** функция: перебрать массив, чтобы найти невалидный input */
  _hasInvalidInput = inputList => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
}

/** функция: переключить активность кнопок submit ("сохранить" и "создать")
 * в данном случае важно отслеживать атрибут disabled у кнопки, а в popup__save-button_inactive.css -
 * pointer-events: none, чтобы на неактивной кнопке не срабатывал hover. Также это позволяет исключить
 * возможность добавления пустой карточки.
*/
  _toggleButtonState = (inputList, buttonElement) => {
  if (this._hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__save-button_inactive');
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove('popup__save-button_inactive');
    buttonElement.removeAttribute('disabled');
  }
}

/** функция: установить слушатель для добавления сообщений об ошибках при заполнении полей формы */
  _setEventListeners = () => {
  const inputList = Array.from(this._formSelector.querySelectorAll('.popup__input')); // создает массив со ссылками на все поля input в форме
  const buttonElement = this._formSelector.querySelector('.popup__save-button'); // находит ссылку на кнопку "сохранить" или "создать"

  this._toggleButtonState(inputList, buttonElement); // делает кнопку неактивной, если хотя бы одно поле формы невалидно

  inputList.forEach(inputElement => { // для каждого поля input установил слушатель, проверяющий на валидность
    inputElement.addEventListener('input', () => {
      this._isValid(inputElement);
      this._toggleButtonState(inputList, buttonElement);
    });
  });
}

  enableValidation = () => {
    this._setEventListeners();
  /** устанавливаю слушатели на форму для добавления сообщений об ошибках (setEventListeners).
   * При этом здесь отменять дефолтное поведение формы (evt.preventDefault()) не нужно, т.к. это сделано
   * в файле index_js в функциях changeProfileData и addNewCard;
   * formSelector - это ссылка на форму;
  */
  };
}
