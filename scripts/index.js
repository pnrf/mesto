//ставим лайк на карточке (для черного сердечка на 5-ый спринт)
//пока работает только на 1-ой карточке
const likeButtonElement = document.querySelector('.places__heart-button');

const toggleLikeButton = function() {
  likeButtonElement.classList.toggle('places__heart-button_active');
};

likeButtonElement.addEventListener('click', toggleLikeButton);


//кнопки
const popupElement = document.querySelector('.popup');
const popupEditButtonElement = document.querySelector('.profile__edit-button');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupSaveButtonElement = popupElement.querySelector('.popup__save-button');

//профиль 'name' и 'about'
let profileNameElement = document.querySelector('.profile__title');
let profileAboutElement = document.querySelector('.profile__subtitle');

//поля формы
let popupNameElement = popupElement.querySelector('.popup__input-text_type_name');
let popupAboutElement = popupElement.querySelector('.popup__input-text_type_about');


//добавили полям формы атрибут 'value' со значением по умолчанию
popupNameElement.setAttribute('value', profileNameElement.textContent);
popupAboutElement.setAttribute('value', profileAboutElement.textContent);


//открытие popup (кнопка редактировать)
const openPopup = function() {
  popupElement.classList.add('popup_opened');
};

popupEditButtonElement.addEventListener('click', openPopup);


//закрытие popup (крестик)
const closePopup = function() {
  popupNameElement.setAttribute('value', document.querySelector('.profile__title').textContent);
  popupAboutElement.setAttribute('value', document.querySelector('.profile__subtitle').textContent);
  popupElement.classList.remove('popup_opened');
};

popupCloseButtonElement.addEventListener('click', closePopup);


//редактирование профиля (кнопка сохранить)

const editPopup = function() {
  // profileNameElement.innerHTML = `<h1 class="profile__title">${popupNameElement.value}</h1>`;
  // profileAboutElement.innerHTML = `<p class="profile__subtitle">${popupAboutElement.value}</p>`;

  profileNameElement.textContent = popupNameElement.value;
  profileAboutElement.textContent = popupAboutElement.value;
  popupElement.classList.remove('popup_opened'); //при нажатии на кнопку "сохранить" попап закрывается
};

popupSaveButtonElement.addEventListener('click', editPopup);
