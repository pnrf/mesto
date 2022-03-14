// (1) Данные профиля по умолчанию (Жак-Ив Кусто, исследователь океана), отображение на странице

const profileInitialData = [
  'Жак-Ив Кусто',
  'Исследователь океана'
]; // массив со значениями полей профиля по умолчанию

let profileNameElement = document.querySelector('.profile__title'); // ссылка на имя
let profileAboutElement = document.querySelector('.profile__subtitle'); // ссылка на описание

profileNameElement.textContent = profileInitialData[0]; // подставляем имя из массива
profileAboutElement.textContent = profileInitialData[1]; // подставляем описание из массива


// (2) POPUP-IMG -- для просмотра картинок
const popupImgElement = document.querySelector('.popup-img'); // ссылка на popup-img
const popupImgCloseBtnElement = popupImgElement.querySelector('.popup__close-button'); // крестик в popup-img

// (2.1) закрытие попапа
const closePopupImg = function() {
  popupImgElement.classList.remove('popup-img_opened');
};

popupImgCloseBtnElement.addEventListener('click', closePopupImg); //обработчик события


// (3) при загрузке на странице должно быть 6 карточек, которые добавит javascript

// (3.1) функция отрисовки карточек на странице:
const itemTemplateContent = document.querySelector('.item-template'); // ссылка на темплейт
const listElement = document.querySelector('.places__list'); // ссылка на родителя

function renderCards(item) {
    // клонировал темлейт из html в DOM:
    const itemElement = itemTemplateContent.content.cloneNode(true);
    // наполнил темплейт содержимым:
    itemElement.querySelector('.places__card-title').textContent = item.name;
    itemElement.querySelector('.places__card-image').src = item.link;
    itemElement.querySelector('.places__card-image').alt = `${item.name}. Фотография`;
    // слушатель на картинке:
    itemElement.querySelector('.places__card-image').addEventListener('click', function(event) {
      popupImgElement.classList.add('popup-img_opened');
      popupImgElement.querySelector('.popup-img__text').textContent = item.name;
      popupImgElement.querySelector('.popup-img__image').src = item.link;
      popupImgElement.querySelector('.popup-img__image').alt = `${item.name}. Фотография`;
    });
    // функция лайк/дизлайк:
    itemElement.querySelector('.places__heart-button').addEventListener('click', function (event) {
      event.target.classList.toggle('places__heart-button_active');
    });
    // функция удаления карточки (кнопка корзина):
    const delBtn = itemElement.querySelector('.places__basket'); // ссылка на значок корзины в попапе

    delBtn.addEventListener('click', function (event) {
      const delItem = delBtn.closest('.places__card');
      delItem.remove();
    });
    // отрисовал карточку вначале списка:
    listElement.prepend(itemElement);
};

// (3.2) исходный массив объектов для отрисовки карточек на странице
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

// (3.3) развернул исходный массив, перебрал его и отрисовывал карточки на странице:
const arrayReversed = initialCards.reverse();
arrayReversed.forEach(function(item) {
  renderCards(item);
});


// (4) POPUP - для добавления карточек и редактирования профиля

// (4.1) закрыть попап нажатием на крестик
const popupElement = document.querySelector('.popup'); // ссылка на popup
const popupCloseBtnElement = popupElement.querySelector('.popup__close-button'); // ссылка на крестик в popup

const closePopup = function() {
  popupElement.classList.remove('popup_opened');
};

popupCloseBtnElement.addEventListener('click', closePopup); //обработчик события


// (4.2) редактировать профиль (Жак-Ив Кусто, исследователь океана)

// (4.2.1) открыть попап при клике на кнопку "редактировать", подставить в попап значения
const editBtnElement = document.querySelector('.profile__edit-button'); // ссылка на кнопку "редактировать"

const popupTitle = popupElement.querySelector('.popup__title'); // ссылка на заголовок "Редактировать профиль" в попапе
const popupSaveBtnElement = popupElement.querySelector('.popup__save-button'); // ссылка на кнопку "сохранить" в попапе
const popupNameElement = popupElement.querySelector('.popup__input-text_type_name'); // ссылка на поле "имя" в попапе
const popupAboutElement = popupElement.querySelector('.popup__input-text_type_about'); // ссылка на поле "описание" в попапе

const openPopupEditor = function() {
  popupTitle.textContent = 'Редактировать профиль';
  popupSaveBtnElement.textContent = 'Сохранить';
  popupSaveBtnElement.setAttribute('type', 'button');
  popupNameElement.value = profileNameElement.textContent;
  popupAboutElement.value = profileAboutElement.textContent;
  popupElement.classList.add('popup_opened');
};

editBtnElement.addEventListener('click', openPopupEditor); // обработчик события на кнопке "редактировать"

// (4.2.2) изменить данные профиля на странице (кнопка сохранить)
const editPopup = function() {
  profileNameElement.textContent = popupNameElement.value;
  profileAboutElement.textContent = popupAboutElement.value;
  popupElement.classList.remove('popup_opened'); //при нажатии на кнопку "сохранить" попап закрывается
};

// обработчик события перенесен в п.4.4., т.к. клик по кнопке влечет разные последствия


// (4.3) Добавление новой карточки

// (4.3.1) открыть попап при клике на кнопку "добавить", подставить в попап значения
const addBtnElement = document.querySelector('.profile__add-button'); // ссылка на кнопку "добавить"

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

// (4.3.2) добавить новую карточку в массив и на страницу (кнопка попапа "создать")
const addCard = function() {
  let item = {
    name: popupNameElement.value,
    link: popupAboutElement.value
  };

  initialCards.unshift(item);

renderCards(item); // функция отрисовки карточки на странице

popupElement.classList.remove('popup_opened'); //при нажатии на кнопку "создать" попап закрывается
};


// (4.4) обработчик события при добавлении новой карточки и при редактировании профиля
// эта функция разграничивает последствия, т.к. попап один и тот же для редактирования профиля и для добавления карточек
function setEventHandler() {
  if (popupTitle.textContent === 'Новое место') {
    addCard(); //функция для добавления новой карточки
  } else if (popupTitle.textContent === 'Редактировать профиль') {
    editPopup(); //функция для редактирования данных профиля
  } else {
    popupElement.classList.remove('popup_opened');
  }; // если что-то не сработает, попап просто закрывается без внесения каких-либо изменений на страницу
};

popupSaveBtnElement.addEventListener('click', setEventHandler); // обработчик события при клике на кнопку попапа



