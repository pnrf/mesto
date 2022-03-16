// (1) Constants and variables

// (1.1) кнопки на странице
const editBtnElement = document.querySelector('.profile__edit-button'); // ссылка на кнопку "редактировать профиль"
const addBtnElement = document.querySelector('.profile__add-button'); // ссылка на кнопку "добавить новую карточку"

// (1.2) POPUP 1: profile editing form
const popupProfileElement = document.querySelector('.popup_type_profile'); // ссылка на popup для редактирования профиля

const popupCloseBtnElement = popupProfileElement.querySelector('.popup__close-button'); // ссылка на крестик в popup
const popupSaveBtnElement = popupProfileElement.querySelector('.popup__save-button'); // ссылка на кнопку "сохранить" в попапе
const popupProfileForm = popupProfileElement.querySelector('.popup__input-list'); // ссылка на форму
const popupNameElement = popupProfileElement.querySelector('.popup__input-text_type_name'); // ссылка на поле "имя" в попапе
const popupAboutElement = popupProfileElement.querySelector('.popup__input-text_type_about'); // ссылка на поле "описание" в попапе

const profileElement = document.querySelector('.profile'); // ссылка на профиль
const profileNameElement = profileElement.querySelector('.profile__title'); // ссылка на имя (Жак-Ив Кусто) на странице
const profileAboutElement = profileElement.querySelector('.profile__subtitle'); // ссылка на описание (Исследователь океана) на странице

// (1.3) POPUP 2: card adding form
const popupCardsElement = document.querySelector('.popup_type_cards'); // ссылка на popup для добавления новой карточки

const popupCardsCloseBtnElement = popupCardsElement.querySelector('.popup__close-button'); // ссылка на крестик в popup
const popupCardsSaveBtnElement = popupCardsElement.querySelector('.popup__save-button'); // ссылка на кнопку "создать" в попапе
const popupCardsForm = popupCardsElement.querySelector('.popup__input-list'); // ссылка на форму
const popupPlaceElement = popupCardsElement.querySelector('.popup__input-text_type_name'); // ссылка на поле "название места" в попапе
const popupLinkElement = popupCardsElement.querySelector('.popup__input-text_type_about'); // ссылка на поле "ссылка на картинку" в попапе

// (1.4) POPUP 3: image preview
const popupImageElement = document.querySelector('.popup_type_image'); // ссылка на popup для просмотра картики
const popupImgCloseBtnElement = popupImageElement.querySelector('.popup__close-button'); // ссылка на крестик в popup

// (1.5) TEMPLATE for cards
const itemTemplate = document.querySelector('#template'); // ссылка на темплейт
const listElement = document.querySelector('.cards__list'); // ссылка на родителя (куда вставить темплейт)



// (2) Functions

// (2.1) функция: создать карточку из темлейта:
const createCard = function(item) {
  // клонировал темлейт из html в DOM:
  const itemElement = itemTemplate.content.cloneNode(true);
  const cardImgElm = itemElement.querySelector('.card__image');
  const popupImgElm = popupImageElement.querySelector('.popup__image');

  // наполнил темплейт содержимым:
  itemElement.querySelector('.card__title').textContent = item.name;
  cardImgElm.src = item.link;
  cardImgElm.alt = `${item.name}. Фотография`;
  // слушатель на картинке:
  itemElement.querySelector('.card__image').addEventListener('click', function() {
    openPopup(popupImageElement);
    popupImageElement.querySelector('.popup__figcaption').textContent = item.name;
    popupImgElm.src = item.link;
    popupImgElm.alt = `${item.name}. Фотография`;
  });
  // слушатель для лайка/дизлайка:
  itemElement.querySelector('.card__like-button').addEventListener('click', function (event) {
    event.target.classList.toggle('card__like-button_active');
  });
  // слушатель для удаления карточки:
  itemElement.querySelector('.card__del-button').addEventListener('click', function (event) {
    event.target.closest('.card').remove();
  });

  return itemElement;
};

// (2.2) функция перебрать массив, отрисовать карточки по порядку
initialCards.forEach(function(item) {
  listElement.appendChild(createCard(item)); // отрисовал карточки по порядку
});

// (2.3) функция отрисовать новую карточку в начале списка:
const renderCard = function(name, link) {
  const item = {
      name,
      link
    };
  listElement.prepend(createCard(item)); // отрисовал карточку в начале списка
  popupPlaceElement.value = ''; // чтобы при добавлении новой карточки, прежние значения обнулялись
  popupLinkElement.value = ''; // иначе, они остаются в попапе и перебивают placeholder
};

// (2.4) функция: открыть попап
const openPopup = function(item) {
  item.classList.add('popup_opened');
};

// (2.5) функция: закрыть попап
const closePopup = function(item) {
  item.classList.remove('popup_opened');
};



// (3) Event handlers

// (3.1) редактировать профиль (Жак-Ив Кусто, исследователь океана)

editBtnElement.addEventListener('click', function(){
  openPopup(popupProfileElement);
  popupNameElement.value = profileNameElement.textContent;
  popupAboutElement.value = profileAboutElement.textContent;
}, false); // открыть попап при клике на кнопке "редактировать"

popupCloseBtnElement.addEventListener('click', function(){closePopup(popupProfileElement)}, false); //закрыть попап при клике на крестик

popupProfileForm.addEventListener('submit', function(evt){
  evt.preventDefault();
  profileNameElement.textContent = popupNameElement.value;
  profileAboutElement.textContent = popupAboutElement.value;
  closePopup(popupProfileElement);
}, false); // изменить данные профиля на странице при клике на кнопку "сохранить"

// (3.2) добавить новую карточку

addBtnElement.addEventListener('click', function(){openPopup(popupCardsElement);}, false); // открыть попап при клике на кнопке "добавить"

popupCardsCloseBtnElement.addEventListener('click', function(){closePopup(popupCardsElement)}, false); //закрыть попап при клике на крестик

popupCardsForm.addEventListener('submit', function(evt){
  evt.preventDefault();
  renderCard(popupPlaceElement.value, popupLinkElement.value);
  closePopup(popupCardsElement);
}); // отрисовать новую карточку на странице в начале списка

// (3.3) закрыть попап с картинкой

popupImgCloseBtnElement.addEventListener('click', function(){closePopup(popupImageElement)}, false); //закрыть попап при клике на крестик
