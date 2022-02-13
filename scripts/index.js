// Выборка DOM элементов
const popupElement = document.querySelector('.popup');
const popupEditButtonElement = document.querySelector('.profile__edit-button');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');

const likeButtonElement = document.querySelector('.places__heart-button'); //для черного сердечка на 5-ый спринт

const openPopup = function() {
  popupElement.classList.add('popup_opened');
};

const closePopup = function() {
  popupElement.classList.remove('popup_opened');
};

const toggleLikeButton = function() {
  likeButtonElement.classList.toggle('places__heart-button_active'); //для черного сердечка на 5-ый спринт
};

// Обработчики событий
popupEditButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
likeButtonElement.addEventListener('click', toggleLikeButton); //для черного сердечка на 5-ый спринт
