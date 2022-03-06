// (1) при загрузке на странице должно быть 6 карточек, которые добавит javascript

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const itemTemplateContent = document.querySelector('.item-template'); // ссылка на темплейт
const listElement = document.querySelector('.places__list'); // ссылка на родителя


initialCards.forEach(function(item) {
  const itemElement = itemTemplateContent.content.cloneNode(true); // клонировал темлейт

  itemElement.querySelector('.places__card-title').textContent = item.name; // наполнил содержимым
  itemElement.querySelector('.places__card-image').src = item.link;
  itemElement.querySelector('.places__card-image').alt = `${item.name}. Фотография`;
  itemElement.querySelector('.places__heart-button').addEventListener('click', function (event) {
    event.target.classList.toggle('places__heart-button_active');
  }); // лайк/дизлайк

  const delBtn = itemElement.querySelector('.places__basket'); // удаление карточки (кнопка корзина)
  delBtn.addEventListener('click', function (event) {
    const delItem = delBtn.closest('.places__card');
    delItem.remove();
    });

  listElement.appendChild(itemElement); // вставил на страницу
  });


// (2) Данные профиля по умолчанию (отображение на странице)

const profileInitialData = [
  'Жак-Ив Кусто',
  'Исследователь океана'
]; // массив со значениями полей профиля по умолчанию

let profileNameElement = document.querySelector('.profile__title'); // ссылка на имя
let profileAboutElement = document.querySelector('.profile__subtitle'); // ссылка на описание

profileNameElement.textContent = profileInitialData[0]; // подставляем имя из массива
profileAboutElement.textContent = profileInitialData[1]; // подставляем описание из массива


// (3) POPUP - общий функционал

// (3.1) закрыть попап
const popupElement = document.querySelector('.popup'); // ссылка на popup
const popupCloseBtnElement = popupElement.querySelector('.popup__close-button'); // крестик в popup

const closePopup = function() {
  popupElement.classList.remove('popup_opened');
};

popupCloseBtnElement.addEventListener('click', closePopup); //обработчик события


// (4) Редактирование профиля

// (4.1) открыть попап при клике на кнопку "редактировать", подставить тексты
const editBtnElement = document.querySelector('.profile__edit-button'); // ссылка на кнопку "редактировать"

let popupTitle = popupElement.querySelector('.popup__title'); // заголовок в попапе
let popupSaveBtnElement = popupElement.querySelector('.popup__save-button'); // кнопка в попапе
let popupNameElement = popupElement.querySelector('.popup__input-text_type_name'); // поле "имя" в попапе
let popupAboutElement = popupElement.querySelector('.popup__input-text_type_about'); // поле "описание" в попапе

const openPopupEditor = function() {
  popupTitle.textContent = 'Редактировать профиль';
  popupSaveBtnElement.textContent = 'Сохранить';
  popupSaveBtnElement.setAttribute('type', 'button');
  popupNameElement.value = profileNameElement.textContent;
  popupAboutElement.value = profileAboutElement.textContent;
  popupElement.classList.add('popup_opened');
};

editBtnElement.addEventListener('click', openPopupEditor); // обработчик события на кнопке "редактировать"

// (4.2) изменить данные на странице (кнопка сохранить)
const editPopup = function() {
  profileNameElement.textContent = popupNameElement.value;
  profileAboutElement.textContent = popupAboutElement.value;
  popupElement.classList.remove('popup_opened'); //при нажатии на кнопку "сохранить" попап закрывается
};

// обработчик события перенесен в п.5.2., т.к. клик по кнопке влечет разные последствия


// (5) Добавление новой карточки

const addBtnElement = document.querySelector('.profile__add-button'); // ссылка на кнопку "добавить"

// (5.1) открытие попапа при клике на кнопку "добавить"
const openPopupAddCard = function() {
  popupTitle.textContent = 'Новое место';
  popupSaveBtnElement.textContent = 'Создать';
  popupNameElement.setAttribute('placeholder', 'Название');
  popupAboutElement.setAttribute('placeholder', 'Ссылка на картинку');
  popupSaveBtnElement.setAttribute('type', 'submit');
  popupNameElement.value = ''; // чтобы value не перебивало placeholder
  popupAboutElement.value = ''; // чтобы value не перебивало placeholder
  popupElement.classList.add('popup_opened');
};

addBtnElement.addEventListener('click', openPopupAddCard); //обработчик события на кнопке "добавить"

// (5.2) добавление новой карточки в массив (кнопка попапа "создать")
const addCard = function() {
  let item = {
    name: popupNameElement.value,
    link: popupAboutElement.value
  };

  initialCards.unshift(item);

// (5.3) добавление новой карточки на страницу (кнопка попапа "создать")
  function addCards() {
    const itemElement = itemTemplateContent.content.cloneNode(true); // клонировал темлейт

    itemElement.querySelector('.places__card-title').textContent = item.name; // наполнил содержимым
    itemElement.querySelector('.places__card-image').src = item.link;
    itemElement.querySelector('.places__card-image').alt = `${item.name}. Фотография`;
    itemElement.querySelector('.places__heart-button').addEventListener('click', function (event) {
      event.target.classList.toggle('places__heart-button_active');
    }); // лайк/дизлайк

    const delBtn = itemElement.querySelector('.places__basket'); // удаление карточки (кнопка корзина)
    delBtn.addEventListener('click', function (event) {
      const delItem = delBtn.closest('.places__card');
      delItem.remove();
    });

    listElement.prepend(itemElement); // вставил на страницу в начало списка
  };

  addCards();

  popupElement.classList.remove('popup_opened'); //при нажатии на кнопку "создать" попап закрывается
};

// (5.4) обработчик события при добавлении новой карточки (корреляция с редактированием профиля)
function setEventHandler() {
  if (popupTitle.textContent === 'Новое место') {
    addCard(); //функция для добавления новой карточки
  } else if (popupTitle.textContent === 'Редактировать профиль') {
    editPopup(); //функция для редактирования данных профиля
  } else {
    popupElement.classList.remove('popup_opened');
  };
}; // эта функция разграничивает последствия, т.к. попап (и кнопка в нем) один для редактирования профиля и добавления карточек

popupSaveBtnElement.addEventListener('click', setEventHandler); // обработчик события при клике на кнопку попапа


// (6) Удаление карточки
//  const popupDeleteBtnElement = document.querySelector('.places__basket').addEventListener('click', function (event) {
//    event.target.classList.toggle('places__heart-button_active'); // ссылка на кнопку "корзина"
