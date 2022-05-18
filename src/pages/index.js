/**
 * Файлы скриптов конкретной страницы расположим в уже существующей директории pages. Файлы скриптов страниц содержат только уникальный
 * для конкретной страницы код: создание новых экземпляров класса и передачу в них данных, описание взаимодействия между классами.
 */

/** Data Import */
import {initialCards} from '../utils/initialCards.js';

/** Constants Import */
import {
  editBtnElement,
  addBtnElement,
  profileElement,
  profileNameSelector,
  profileAboutSelector,
  cardListSelector,
  cardSelector,
  popupProfileElement,
  popupProfileFormSelector,
  popupProfileNameSelector,
  popupProfileAboutSelector,
  popupCardsElement,
  popupCardsFormSelector,
  popupCardsPlaceSelector,
  popupCardsLinkSelector,
  popupImageElement,
  formSelectors
} from '../utils/constants.js';

/** Functions Import */
/*
import {
  createCard,
  renderCard,
  addNewCard
} from '../utils/utils.js';
*/

/** Classes Import */
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';



/** --- MAIN CODE --- */

/** При загрузке страницы отрисовать initial cards. Для этого:
 *
 * 1) объявить экземпляр класса Section, который отвечает за отрисовку карточек на странице (const renderCards);
 *    а) передать ему в конструктор массив с данными - initialCards;
 *    б) передать ему в конструктор функцию renderer, которая отвечает за создание и отрисовку каждой отдельной карточки на странице;
 *    в) передать ему в конструктор селектор контейнера, куда нужно добавлять созданные карточки.
 *
 * 2) функция renderer:
 *    а) вызвать функцию createCard;
 *    б) отрисовать созданную карточку в начале списка.
 *
 * 3) объявить функцию createCard, которая для каждой карточки создает экземпляр класса Card:
 *    а) объявить экземпляр класса Card, который который создаёт карточку с текстом и ссылкой на изображение;
 *    б) передать ему в конструктор данные карточки и селектор её template-элемента;
 *    в) передать ему в конструктор функцию handleCardClick;
 *
 * 4) объявить функцию handleCardClick, которая открывает попап с картинкой при клике на карточку:
 *    а) объявить экземпляр класса PopupWithImage, который открывает попап с картинкой и наполняет его содержимым;
 *    б) установить слушатели для закрытия попапа, обратившись с методу setEventListeners() созданного экземпляра класса;
 *    в) открыть попап с наполненным содержимым, обратившись к методу openPopupWithImage() созданного экземпляра класса.
 */

function handleCardClick(item) {
  const popupWithImage = new PopupWithImage(popupImageElement);
  popupWithImage.setEventListeners(); // устанавливает слушатели для закрытия попапа
  popupWithImage.openPopupWithImage(item);
};

function createCard(item) {
  const newCard = new Card(item, '#template', () => {handleCardClick(item)});
  return newCard.generateCard();
};

const renderCards = new Section(
  { items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      renderCards.addItemAppend(card);
    }
  },
  cardListSelector);

renderCards.renderItems();


/** Изменение данных профиля:
 *  - при клике на кнопку редактирования открыть попап с формой для редактирования профиля;
 *  - при клике на кнопку сабмита формы отрисовать на странице новые данные о пользователе.
 *
 * Для этого:
 *
 * 1) объявить экземпляр класса UserInfo, который управляет информацией о пользователе на странице:
 *    а) методом getUserInfo() возвращает объект с данными пользователя;
 *    б) методом setUserInfo() принимает новые данные пользователя (из формы) и добавляет эти данные на страницу;
 *    в) передать ему в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
 *
 * 2) объявить экземпляр класса PopupWithForm, который открывает/закрывает попап и наполняет его содержимым;
 *    а) передать ему в конструктор селектор попапа и колбэк сабмита формы;
 *
 * 3) колбэк сабмита формы:
 *    а) отменить события формы по умолчанию методом event.preventDefault();
 *    б) методом getUserInfo() экземпляра класса UserInfo получить объект с данными пользователя;
 *    в) методом setUserInfo() экземпляра класса UserInfo передать из формы
 *    г) закрыть попап, обращаясь к методу closePopup() созданного экземпляра класса.
 *
 * 4) установить слушатель на кнопку редактирования (editBtnElement):
 *    а) получить ссылку на попап с формой для редактирования профиля;
 *    б) подставить в форму значения со страницы (name и about);
 *    в) открыть попап с формой для редактирования профайла;
 */

const userInfo = new UserInfo(profileNameSelector, profileAboutSelector);

const popupWithFormProfile = new PopupWithForm(popupProfileElement, (event) => {
  event.preventDefault();
  const formData = popupWithFormProfile.getFormData();
  userInfo.setUserInfo(formData.profileName, formData.profileAbout);
  popupWithFormProfile.closePopup();
});

popupWithFormProfile.setEventListeners();



/** Создание новой карточки */
/** PopupWithForm для новой карточки */
const popupWithFormNewCard = new PopupWithForm(popupCardsElement, (event) => {
  event.preventDefault();
  const formData = popupWithFormNewCard.getFormData();
  const item = {name: formData.name, link: formData.url};
  const card = createCard(item);
  renderCards.addItemPrepend(card);
  popupWithFormNewCard.closePopup();
});

popupWithFormNewCard.setEventListeners();

/** */

/** перебрать исходный массив, и отрисовать карточки по порядку
 * поскольку функция renderCard использует метод prepend вместо appendChild, то я вынужден применить reverse(),
 * иначе карточки отрисуются в обратном порядке, что будет противоречить макету;
*/
// initialCards.reverse().forEach(item => renderCard(item.name, item.link));

/** редактировать профиль (Жак-Ив Кусто, исследователь океана): */
/** 1) открыть попап при клике на кнопке "редактировать", вставить в попап данные со страницы */
// editBtnElement.addEventListener('click', () => {
//   popupProfileNameSelector.value = profileNameSelector.textContent;
//   popupProfileAboutSelector.value = profileAboutSelector.textContent;
//   openPopup(popupProfileElement);
// });


/** При клике на кнопку "Редактировать профайл":
 * 1) получить ссылку попап с формой для редактирования профиля;
 * 2) подставить в форму значения со страницы (name и about);
 * 3) открыть попап с формой для редактирования профайла;
 */
editBtnElement.addEventListener('click', () => {
  const formElm = popupWithFormProfile.getPopupForm();
  // formElm.elements.name.value = userInfo.getUserInfo().profileName;
  // formElm.elements.about.value = userInfo.getUserInfo().profileAbout;

  formElm.querySelector('#name-input').value = userInfo.getUserInfo().profileName;
  formElm.querySelector('#about-input').value = userInfo.getUserInfo().profileAbout;

  // popupProfileNameSelector.textContent = userInfo.getUserInfo().profileName;
  // popupProfileAboutSelector.textContent = userInfo.getUserInfo().profileAbout;
  // console.log (popupProfileNameSelector.textContent, popupProfileAboutSelector.textContent);
  popupWithFormProfile.openPopup();
});

/** 2) закрыть попап при клике на крестик или на оверлей */
// popupProfileElement.addEventListener('click', closePopupWithClick);
/** 3) изменить данные профиля на странице при клике на кнопку "сохранить" */

//popupProfileFormSelector.addEventListener('submit', changeProfileData);


/** добавить новую карточку: */
/** 1) открыть попап при клике на кнопке "добавить"
 * если колбек слушателя содержит однострочную функцию, то ее можно не обособлять фигурными скобками.
*/
addBtnElement.addEventListener('click', () => {
  newCardValidation.toggleButtonState();
  popupWithFormNewCard.openPopup();
});



/** 2) закрыть попап при клике на крестик или на оверлей */
// popupCardsElement.addEventListener('click', closePopupWithClick);
/** 3) добавить новую карточку на страницу (при клике на кнопке "создать"(submit)) */

// popupCardsFormSelector.addEventListener('submit', addNewCard);


/** закрыть попап с картинкой
 * при клике на крестик или на оверлей
*/
// popupImageElement.addEventListener('click', closePopupWithClick);

/** Просмотр картинки в попапе */
// const popupImageViewer = new PopupWithImage(popupImageElement);
// popupImageViewer.setEventListeners(); // закрыть попап при клике на крестик, оверлей или Esc


/** подключить валидацию полей формы */
// import FormValidator from "./FormValidator.js";
const profileValidation = new FormValidator(formSelectors, popupProfileElement);
const newCardValidation = new FormValidator(formSelectors, popupCardsElement);
profileValidation.enableValidation();
newCardValidation.enableValidation();
