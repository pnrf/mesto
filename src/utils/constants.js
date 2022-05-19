/** (I) CONSTANTS and VARIABLES */

/** кнопки на странице */
export const editBtnElement = '.profile__edit-button'; // кнопка "редактировать профиль"
export const addBtnElement = '.profile__add-button'; // кнопка "добавить новую карточку"

/** секции на странице */

// export const profileElement = '.profile'; // профиль
export const profileNameSelector = '.profile__title'; // имя профиля (Жак-Ив Кусто) на странице
export const profileAboutSelector = '.profile__subtitle'; // описание профиля (Исследователь океана) на странице

export const cardListSelector = '.cards__list'; // контейнер, куда вставлять карточки

/** POPUP 1: profile editing form */
export const popupProfileElement = '.popup_type_profile'; // попап для редактирования профиля

// export const popupProfileFormSelector = '.popup__input-list'; // форма попапа для редактирования профиля
export const popupProfileNameSelector = '#name-input'; // поле "имя" в попапе
export const popupProfileAboutSelector = '#about-input'; // поле "описание" в попапе

/** POPUP 2: card adding form */
export const popupCardsElement = '.popup_type_cards'; // попап для добавления новой карточки

// export const popupCardsFormSelector = '.popup__input-list'; // форма попапа для добавления новой карточки
// export const popupCardsPlaceSelector = '#place-input'; // поле "название места" в попапе
// export const popupCardsLinkSelector = '#url-input'; // поле "ссылка на картинку" в попапе

/** POPUP 3: image preview */
export const popupImageElement = '.popup_type_image'; // попап для просмотра картики

/** TEMPLATE */
export const cardSelector = '#template'; // темплейт


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
