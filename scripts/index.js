//ставим лайк на карточке (для черного сердечка на 5-ый спринт)
//пока работает только на 1-ой карточке
// const likeButtonElement = document.querySelector('.places__heart-button');
// const toggleLikeButton = function() {
//   likeButtonElement.classList.toggle('places__heart-button_active');
// };
// likeButtonElement.addEventListener('click', toggleLikeButton);


// (1) объявляю переменные:

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


// (2) при загрузке на странице должно быть 6 карточек, которые добавит javascript

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

const itemTemplateContent = document.querySelector('.item-template'); // нашел темплейт
const listElement = document.querySelector('.places__list'); // нашел, куда его нужно будет вставить

initialCards.forEach(function(item) {
  const nameElement = item.name; // взял из объекта массива название
  const srcElement = item.link; // взял из объекта массива ссылку на картинку

  const itemElement = itemTemplateContent.content.cloneNode(true); // склонировал темлейт

  itemElement.querySelector('.places__card-title').textContent = nameElement; // наполнил содержимым
  itemElement.querySelector('.places__card-image').src = srcElement;

  listElement.appendChild(itemElement); // вывел на страницу
});









// (3)реализую функционал:

//добавляю атрибут 'value' и его значение по умолчанию (при первом открытии формы)
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
