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
 */
const openPopup = item => {
  item.classList.add('popup_opened');
};

/** функция: закрыть попап:
 * данная функция переиспользуется для всех 3 (трех) попапов
 * поэтому на вход она получает ссылку на соответствующий попап.
 */
const closePopup = item => {
  item.classList.remove('popup_opened');
};

/** функция: сгенерировать карточку из темлейта:
 * 1) клонировать темплейт из html в DOM;
 * 2) наполнить темплейт содержимым: название места, ссылка на картинку, alt к картинке;
 * 3) установить слушатели: на картинку, на кнопку лайк/дизлайк, на кнопку удаления карточки (корзинку);
 *
 * на вход функция получает объект, поэтому обращаемся к свойствам объекта через ключ-переменную: item['name'] и item['link'];
 * данная функция возвращает сгенерированную карточку;
 * для отрисовки карточки на странице используется функция renderCard();
*/
const createCard = (item) => {
  // клонировал темлейт из html в DOM
  const itemElement = itemTemplate.content.cloneNode(true);
  // ввел переменные внутри функции
  const cardImgElm = itemElement.querySelector('.card__image');
  const popupImgElm = popupImageElement.querySelector('.popup__image');
  // наполнил темплейт содержимым:
  itemElement.querySelector('.card__title').textContent = item['name'];
  cardImgElm.src = item['link'];
  cardImgElm.alt = `${item['name']}. Фотография`;
  // слушатель на картинке:
  cardImgElm.addEventListener('click', function() {
    popupFigcaptionElement.textContent = item['name'];
    popupImgElm.src = item['link'];
    popupImgElm.alt = `${item['name']}. Фотография`;
    openPopup(popupImageElement);
  });
  // слушатель для лайка/дизлайка:
  itemElement.querySelector('.card__like-button').addEventListener('click', event => {toggleLikeBtn(event)});
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
  popupPlaceElement.value = ''; // чтобы при добавлении новой карточки, прежние значения обнулялись
  popupLinkElement.value = ''; // иначе, они остаются в попапе и перебивают placeholder
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
 * 2) закрыть попап при клике на крестик;
 * 3) изменить данные профиля на странице, прервать перезагрузку страницы, закрыть попап при клике на кнопку "сохранить"
*/
editBtnElement.addEventListener('click', () => {
  openPopup(popupProfileElement);
  popupNameElement.value = profileNameElement.textContent;
  popupAboutElement.value = profileAboutElement.textContent;
}); // открыть попап при клике на кнопке "редактировать"

popupCloseBtnElement.addEventListener('click', () => {closePopup(popupProfileElement)}); //закрыть попап при клике на крестик

popupProfileForm.addEventListener('submit', evt => {
  evt.preventDefault();
  profileNameElement.textContent = popupNameElement.value;
  profileAboutElement.textContent = popupAboutElement.value;
  closePopup(popupProfileElement);
}); // изменить данные профиля на странице при клике на кнопку "сохранить"

/** добавить новую карточку */
addBtnElement.addEventListener('click', () => {openPopup(popupCardsElement);}); // открыть попап при клике на кнопке "добавить"

popupCardsCloseBtnElement.addEventListener('click', () => {closePopup(popupCardsElement);}); //закрыть попап при клике на крестик

popupCardsForm.addEventListener('submit', evt => {addNewCard(evt);}); // добавить новую карточку на страницу (при клике на кнопку "создать")

/** закрыть попап с картинкой при клике на крестик*/
popupImgCloseBtnElement.addEventListener('click', () => {closePopup(popupImageElement)});
