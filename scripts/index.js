//открытие и закрытие popup
const popupElement = document.querySelector('.popup');
const popupEditButtonElement = document.querySelector('.profile__edit-button');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');

const openPopup = function() {
  popupElement.classList.add('popup_opened');
};

const closePopup = function() {
  popupElement.classList.remove('popup_opened');
};

popupEditButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

//попап содержит информацию ('имя' и 'о себе') из профиля
let profileNameElement = document.querySelector('.profile__title');
let profileAboutElement = document.querySelector('.profile__subtitle');
let popupNameElement = document.querySelector('.popup__input-text_type_name');
let popupAboutElement = document.querySelector('.popup__input-text_type_about');

popupNameElement.setAttribute('placeholder', profileNameElement);
popupAboutElement.setAttribute('placeholder', profileAboutElement);


//попап редактирует информацию профиля на странице



//ставим лайк на карточке (для черного сердечка на 5-ый спринт)
//пока работает только на 1-ой карточке

const likeButtonElement = document.querySelector('.places__heart-button');

const toggleLikeButton = function() {
  likeButtonElement.classList.toggle('places__heart-button_active');
};

likeButtonElement.addEventListener('click', toggleLikeButton);
