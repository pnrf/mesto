/** (1) CONSTANTS and VARIABLES */

/** кнопки на странице */
const editBtnElement = document.querySelector('.profile__edit-button'); // ссылка на кнопку "редактировать профиль"
const addBtnElement = document.querySelector('.profile__add-button'); // ссылка на кнопку "добавить новую карточку"

/** POPUP 1: profile editing form */
const popupProfileElement = document.querySelector('.popup_type_profile'); // ссылка на popup для редактирования профиля

const popupCloseBtnElement = popupProfileElement.querySelector('.popup__close-button'); // ссылка на крестик в popup
const popupSaveBtnElement = popupProfileElement.querySelector('.popup__save-button'); // ссылка на кнопку "сохранить" в попапе
const popupProfileForm = popupProfileElement.querySelector('.popup__input-list'); // ссылка на форму
const popupNameElement = popupProfileElement.querySelector('.popup__input-text_type_name'); // ссылка на поле "имя" в попапе
const popupAboutElement = popupProfileElement.querySelector('.popup__input-text_type_about'); // ссылка на поле "описание" в попапе

const profileElement = document.querySelector('.profile'); // ссылка на профиль
const profileNameElement = profileElement.querySelector('.profile__title'); // ссылка на имя (Жак-Ив Кусто) на странице
const profileAboutElement = profileElement.querySelector('.profile__subtitle'); // ссылка на описание (Исследователь океана) на странице

/** POPUP 2: card adding form */
const popupCardsElement = document.querySelector('.popup_type_cards'); // ссылка на popup для добавления новой карточки

const popupCardsCloseBtnElement = popupCardsElement.querySelector('.popup__close-button'); // ссылка на крестик в popup
const popupCardsSaveBtnElement = popupCardsElement.querySelector('.popup__save-button'); // ссылка на кнопку "создать" в попапе
const popupCardsForm = popupCardsElement.querySelector('.popup__input-list'); // ссылка на форму
const popupPlaceElement = popupCardsElement.querySelector('.popup__input-text_type_name'); // ссылка на поле "название места" в попапе
const popupLinkElement = popupCardsElement.querySelector('.popup__input-text_type_about'); // ссылка на поле "ссылка на картинку" в попапе

/** POPUP 3: image preview */
const popupImageElement = document.querySelector('.popup_type_image'); // ссылка на popup для просмотра картики
const popupImgCloseBtnElement = popupImageElement.querySelector('.popup__close-button'); // ссылка на крестик в popup
const popupFigcaptionElement = popupImageElement.querySelector('.popup__figcaption'); // ссылка на подпись к картинке
const popupImgElm = popupImageElement.querySelector('.popup__image'); // ссылка на картинку в попапе

/** TEMPLATE for cards */
const itemTemplate = document.querySelector('#template'); // ссылка на темплейт
const listElement = document.querySelector('.cards__list'); // ссылка на родителя (куда вставить темплейт)

/** (2) FUNCTIONS  */

/** функция: поставить лайк/дизлайк */
const toggleLikeBtn = event => {
  event.target.classList.toggle('card__like-button_active');
};

/** функция: удалить карточку со страницы */
const removeCard = event => {
  event.target.closest('.card').remove();
};

/** функция: открыть попап:
 * данная функция переиспользуется для всех 3 (трех) попапов
 * поэтому на вход она получает ссылку на соответствующий попап.
 *
 * в функцию добавлен слушатель для закрытия попапа при нажатии Esc.
 */
const openPopup = item => {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', evt => {closePopupWithEscBtn(evt, item)});
};

/** функция: закрыть попап:
 * попап закрывается при клике на крестик, на оверлей и при нажатии Esc;
 * данная функция переиспользуется для всех 3 (трех) попапов
 * поэтому на вход она получает ссылку на соответствующий попап.
 */
const closePopup = item => {
  item.classList.remove('popup_opened');
};

/** функция: закрыть попап при нажатии Esc */
const closePopupWithEscBtn = (evt, item) => {
  if (evt.key === 'Escape') {
    closePopup(item);
  };
};

/** функция: закрыть попап при клике на крестик или на оверлей */
const closePopupWithClick = (evt, closeBtn, overlayItem) => {
  if (evt.target.contains(closeBtn)) {
    closePopup(overlayItem);
  };
};

/** функция: обработчик события для слушателя на картинке (вызывывается внутри функции createCard()); */
const addDataToPopupImg = ({name, link}) => {
  popupFigcaptionElement.textContent = name;
  popupImgElm.src = link;
  popupImgElm.alt = `${name}. Фотография`;
};

/** функция: сгенерировать карточку из темлейта:
 * 1) клонировать темплейт из html в DOM;
 * 2) наполнить темплейт содержимым: название места, ссылка на картинку, alt к картинке;
 * 3) установить слушатели: на картинку, на кнопку лайк/дизлайк, на кнопку удаления карточки (корзинку);
 *
 * на вход функция получает объект, поэтому обращаемся к свойствам объекта можно через точку: item.name и item.link,
 * через ключ-переменную: item['name'] и item['link'] либо воспользоваться деструктуризацией: const createCard = ({name, link}) => {};
 * данная функция возвращает сгенерированную карточку;
 * для отрисовки карточки на странице используется функция renderCard();
*/
const createCard = ({name, link}) => {
  // клонировал темлейт из html в DOM
  const itemElement = itemTemplate.content.cloneNode(true);
  // ввел переменную внутри функции
  const cardImgElm = itemElement.querySelector('.card__image'); // ссылка на картинку в карточке
  // наполнил темплейт содержимым:
  itemElement.querySelector('.card__title').textContent = name;
  cardImgElm.src = link;
  cardImgElm.alt = `${name}. Фотография`;
  // слушатель на картинке:
  cardImgElm.addEventListener('click', function() {
    addDataToPopupImg({name, link});
    openPopup(popupImageElement);
  });
  // слушатель для лайка/дизлайка:
  // т.к. в колбек нужно передавать только объект события, можно сократить запись, передавая обработчик вторым аргументом:
  itemElement.querySelector('.card__like-button').addEventListener('click', toggleLikeBtn);
  // слушатель для удаления карточки:
  itemElement.querySelector('.card__del-button').addEventListener('click', event => {removeCard(event)});

  return itemElement;
};

/** функция: отрисовать карточку на странице (вставить в разметку):
 * данная функция переиспользуется для отрисовки исходного массива и для добавления новой карточки;
 * на вход функция получает 2 (два) строчных значения (текст и ссылку), которые пользователь ввел в форму;
 * эти значения присваиваются ключам-переменным (name, link);
 * затем ключи-переменные объединяем и в качестве (!)объекта передаем в функцию createCard;
*/
const renderCard = (name, link) => {
  listElement.prepend(createCard({name, link}));
};

/** функция: обработчик события для добавления новой карточки (при клике на кнопку "создать")
 * сюда же добавлен функционал обнуления значений попапа, чтобы они не появлялись при новом открытии попапа
*/
const addNewCard = evt => {
  evt.preventDefault();
  renderCard(popupPlaceElement.value, popupLinkElement.value);
  closePopup(popupCardsElement);
  popupCardsForm.reset(); // обнуление значений полей формы в попапе
};


// (3) EVENT HANDLERS

/** перебрать исходный массив, и отрисовать карточки по порядку
 * поскольку функция renderCard использует метод prepend вместо appendChild, то я вынужден применить reverse(),
 * иначе карточки отрисуются в обратном порядке, что будет противоречить макету;
*/
initialCards.reverse().forEach(item => {
  renderCard(item.name, item.link);
});

/** редактировать профиль (Жак-Ив Кусто, исследователь океана)
 * 1) открыть попап при клике на кнопке "редактировать", вставить в попап данные со страницы;
 * 2) закрыть попап при клике на крестик, на оверлей и при нажатии Esc;
 * 3) изменить данные профиля на странице, прервать перезагрузку страницы, закрыть попап при клике на кнопку "сохранить"
*/

/** 1) открыть попап при клике на кнопке"редактировать", вставить в попап данные со страницы */
editBtnElement.addEventListener('click', () => {
  popupNameElement.value = profileNameElement.textContent;
  popupAboutElement.value = profileAboutElement.textContent;
  openPopup(popupProfileElement);
});

/** 2) закрыть попап при клике на крестик или на оверлей */
popupProfileElement.addEventListener('click', evt => {
  closePopupWithClick(evt, popupCloseBtnElement, popupProfileElement);
});

/** 3) изменить данные профиля на странице при клике на кнопку "сохрать" */
popupProfileForm.addEventListener('submit', evt => {
  evt.preventDefault();
  profileNameElement.textContent = popupNameElement.value;
  profileAboutElement.textContent = popupAboutElement.value;
  closePopup(popupProfileElement);
});

/** добавить новую карточку
 * 1) открыть попап при клике на кнопке "добавить";
 * 2) закрыть попап при клике на крестик или на оверлей;
 * 3) добавить новую карточку на страницу (при клике на кнопке "создать")
*/

/** 1) открыть попап при клике на кнопке "добавить" */
addBtnElement.addEventListener('click', () => {openPopup(popupCardsElement);});

/** 2) закрыть попап при клике на крестик или на оверлей */
popupCardsElement.addEventListener('click', evt => {
  closePopupWithClick(evt, popupCardsCloseBtnElement, popupCardsElement);
});

/** 3) добавить новую карточку на страницу (при клике на кнопке "создать") */
popupCardsForm.addEventListener('submit', evt => {addNewCard(evt);});

/** закрыть попап с картинкой
 * при клике на крестик или на оверлей
*/
popupImageElement.addEventListener('click', evt => {
  closePopupWithClick(evt, popupImgCloseBtnElement, popupImageElement);
});
