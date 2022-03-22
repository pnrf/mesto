/** (I) CONSTANTS and VARIABLES */

const popupFormList = document.querySelectorAll('.popup__input-list'); // псевдомассив всех форм на странице


/** (II) FUNCTIONS  */

/** функция: добавить сообщение об ошибке */
const showInputError = (inputElement, errorMessage) => {
  const errorElement = inputElement.closest('.popup__field').querySelector('.popup__input-error'); // ссылка на span внутри формы
  inputElement.classList.add('popup__input_type_error'); // подчеркивает поле input красной линией
  errorElement.textContent = errorMessage; // вставляет в span текст ошибки
  errorElement.classList.add('popup__input-error_active'); // выводит сообщение об ошибке
};

/** функция: удалить сообщение об ошибке */
const hideInputError = inputElement => {
  const errorElement = inputElement.closest('.popup__field').querySelector('.popup__input-error');
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

/** функция: проверить валидность поля */
const isValid = inputElement => {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage);
  } else {
    hideInputError(inputElement);
  }
};

/** функция: перебрать массив, чтобы найти невалидный input */
const hasInvalidInput = inputList => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};

/** функция: переключить активность кнопок submit ("сохранить" и "создать")
 * в данном случае важно отслеживать атрибут disabled у кнопки, а в popup__save-button_inactive.css -
 * pointer-events: none, чтобы на неактивной кнопке не срабатывал hover. Также это позволяет исключить
 * возможность добавления пустой карточки.
*/
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__save-button_inactive');
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove('popup__save-button_inactive');
    buttonElement.removeAttribute('disabled');
  }
};

/** функция: установить слушатель для добавления сообщений об ошибках при заполнении полей формы */
const setEventListeners = formElement => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input')); // создает массив со ссылками на все поля input в форме
  const buttonElement = formElement.querySelector('.popup__save-button'); // находит ссылку на кнопку "сохранить" или "создать"

  toggleButtonState(inputList, buttonElement); // делает кнопку неактивной, если хотя бы одно поле формы невалидно

  inputList.forEach(inputElement => { // для каждого поля input установил слушатель, проверяющий на валидность
    inputElement.addEventListener('input', () => {
      isValid(inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

/** функция: найти все формы на странице */
const enableValidation = () => {
  const formList = Array.from(popupFormList); // создает массив со ссылками на все формы
  formList.forEach(formElement => setEventListeners(formElement));
/** перебрал массив с формами и для каждой формы устанавливаю слушатели для добавления сообщений об ошибках (setEventListeners).
 * При этом здесь отменять дефолтное поведение формы (evt.preventDefault()) не нужно, т.к. это сделано
 * в файле index_js в функциях changeProfileData и addNewCard;
 * formElement - это ссылка на форму;
*/
};


/** (III) EVENT HANDLERS  */

enableValidation();
