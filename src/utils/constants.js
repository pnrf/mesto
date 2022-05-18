/** (I) CONSTANTS and VARIABLES */

/** кнопки на странице */
export const editBtnElement = document.querySelector('.profile__edit-button'); // ссылка на кнопку "редактировать профиль"
export const addBtnElement = document.querySelector('.profile__add-button'); // ссылка на кнопку "добавить новую карточку"

/** секции на странице */
export const profileElement = document.querySelector('.profile'); // ссылка на профиль
export const profileNameSelector = profileElement.querySelector('.profile__title'); // ссылка на имя (Жак-Ив Кусто) на странице
export const profileAboutSelector = profileElement.querySelector('.profile__subtitle'); // ссылка на описание (Исследователь океана) на странице

export const cardListSelector = document.querySelector('.cards__list'); // ссылка на родителя (куда вставить темплейт)


/** POPUP 1: profile editing form */
export const popupProfileElement = document.querySelector('.popup_type_profile'); // ссылка на popup для редактирования профиля

export const popupProfileFormSelector = popupProfileElement.querySelector('.popup__input-list'); // ссылка на форму
export const popupProfileNameSelector = popupProfileElement.querySelector('#name-input'); // ссылка на поле "имя" в попапе
export const popupProfileAboutSelector = popupProfileElement.querySelector('#about-input'); // ссылка на поле "описание" в попапе


/** POPUP 2: card adding form */
export const popupCardsElement = document.querySelector('.popup_type_cards'); // ссылка на popup для добавления новой карточки

export const popupCardsFormSelector = popupCardsElement.querySelector('.popup__input-list'); // ссылка на форму
export const popupCardsPlaceSelector = popupCardsElement.querySelector('#place-input'); // ссылка на поле "название места" в попапе
export const popupCardsLinkSelector = popupCardsElement.querySelector('#url-input'); // ссылка на поле "ссылка на картинку" в попапе

/** POPUP 3: image preview */
export const popupImageElement = document.querySelector('.popup_type_image'); // ссылка на popup для просмотра картики

/** TEMPLATE */
export const cardSelector = document.querySelector('#template'); // ссылка на темплейт


/** Form Selectors */
export const formSelectors = {
  inputFieldSelector: '.popup__field',
  inputSelector: '.popup__input',
  inputErrorSelector: '.popup__input-error',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  inactiveButtonClass: 'popup__save-button_inactive',
  buttonElement: '.popup__save-button'
};
