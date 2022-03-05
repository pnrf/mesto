//ставим лайк на карточке (для черного сердечка на 5-ый спринт)
//пока работает только на 1-ой карточке
// const likeButtonElement = document.querySelector('.places__heart-button');
// const toggleLikeButton = function() {
//   likeButtonElement.classList.toggle('places__heart-button_active');
// };
// likeButtonElement.addEventListener('click', toggleLikeButton);


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


// (3) POPUP - основной функционал (закрыть)

const popupElement = document.querySelector('.popup'); // ссылка на popup
const popupCloseBtnElement = popupElement.querySelector('.popup__close-button'); // крестик в popup

const closePopup = function() {
  popupElement.classList.remove('popup_opened');
};

popupCloseBtnElement.addEventListener('click', closePopup); //обработчик события


// (4) Редактирование профиля

// (4.1) открыть попап при клике на кнопку "редактировать", подставить тексты
const EditBtnElement = document.querySelector('.profile__edit-button'); // ссылка на кнопку "редактировать"

let popupTitle = popupElement.querySelector('.popup__title'); // заголовок в попапе
let popupSaveBtnElement = popupElement.querySelector('.popup__save-button'); // кнопка в попапе
let popupNameElement = popupElement.querySelector('.popup__input-text_type_name'); // поле "имя" в попапе
let popupAboutElement = popupElement.querySelector('.popup__input-text_type_about'); // поле "описание" в попапе

const openPopupEditor = function() {
  popupTitle.textContent = 'Редактировать профиль';
  popupSaveBtnElement.textContent = 'Сохранить';
  popupNameElement.value = profileNameElement.textContent;
  popupAboutElement.value = profileAboutElement.textContent;
  popupElement.classList.add('popup_opened');
};

EditBtnElement.addEventListener('click', openPopupEditor); //обработчик события на кнопке "редактировть"

// (4.2) изменить данные на странице (кнопка сохранить)
const editPopup = function() {
  profileNameElement.textContent = popupNameElement.value;
  profileAboutElement.textContent = popupAboutElement.value;
  popupElement.classList.remove('popup_opened'); //при нажатии на кнопку "сохранить" попап закрывается
};

popupSaveBtnElement.addEventListener('click', editPopup); //обработчик события


// (5) Добавление новой карточки
const AddBtnElement = document.querySelector('.profile__add-button'); // ссылка на кнопку "добавить"

const openPopupAddCard = function() {
  popupTitle.textContent = 'Новое место';
  popupSaveBtnElement.textContent = 'Создать';
  popupNameElement.setAttribute('placeholder', 'Название');
  popupAboutElement.setAttribute('placeholder', 'Ссылка на картинку');

  popupNameElement.value = ''; // чтобы не перебивало placeholder
  popupAboutElement.value = ''; // чтобы не перебивало placeholder
  popupElement.classList.add('popup_opened');
};

AddBtnElement.addEventListener('click', openPopupAddCard); //обработчик события на кнопке "добавить"

/*
// (2) Форма редактирования профиля, popup 1

//попап и кнопки
const popupElement = document.querySelector('.popup');
const EditBtnElement = document.querySelector('.profile__edit-button');
const popupCloseBtnElement = popupElement.querySelector('.popup__close-button');
const popupSaveBtnElement = popupElement.querySelector('.popup__save-button');

//профиль 'name' и 'about'
let profileNameElement = document.querySelector('.profile__title');
let profileAboutElement = document.querySelector('.profile__subtitle');

//поля формы
let popupNameElement = popupElement.querySelector('.popup__input-text_type_name');
let popupAboutElement = popupElement.querySelector('.popup__input-text_type_about');

//добавил атрибут 'value' и его значение по умолчанию (при первом открытии формы)
  popupNameElement.setAttribute('value', profileNameElement.textContent);
  popupAboutElement.setAttribute('value', profileAboutElement.textContent);

//открытие popup (кнопка редактировать)
const openPopup = function() {
  popupNameElement.value = profileNameElement.textContent;
  popupAboutElement.value = profileAboutElement.textContent;
  popupElement.classList.add('popup_opened');
};

EditBtnElement.addEventListener('click', openPopup); //обработчик события

//закрытие popup (крестик)
const closePopup = function() {
  popupElement.classList.remove('popup_opened');
};

popupCloseBtnElement.addEventListener('click', closePopup); //обработчик события

//редактирование профиля (кнопка сохранить)
const editPopup = function() {
  profileNameElement.textContent = popupNameElement.value;
  profileAboutElement.textContent = popupAboutElement.value;
  popupElement.classList.remove('popup_opened'); //при нажатии на кнопку "сохранить" попап закрывается
};

popupSaveBtnElement.addEventListener('click', editPopup); //обработчик события


// (3) Форма добавления новой карточки, popup 2
*/
