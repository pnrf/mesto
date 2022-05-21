/** Создайте класс Section, который отвечает за отрисовку элементов на странице.
 * Этот класс:
 * Первым параметром конструктора принимает объект с двумя свойствами: items и renderer. Свойство items — это массив данных,
 * которые нужно добавить на страницу при инициализации класса. Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
 * Второй параметр конструктора — селектор контейнера, в который нужно добавлять созданные элементы.
 * Содержит публичный метод, который отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.
 * Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
 * У класса Section нет своей разметки. Он получает разметку через функцию-колбэк и вставляет её в контейнер.
*/

export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items; // массив данных (cardsDataArr), которые нужно добавить на страницу при инициализации класса;
    this._renderer = renderer; // функция, которая отвечает за создание и отрисовку данных на странице;
    this._containerElement = document.querySelector(containerSelector); // селектор контейнера, в который нужно добавлять созданные элементы.
  }

  /**
   * renderItems -- публичный метод: отвечает за отрисовку всех элементов.
   * На вход принимает массив данных.
   * Содержит функцию renderer, которая отвечает за отрисовку каждого отдельного элемента. Она перебирает вх. массив данных и отрисовывает каждый элемент в отдельности.
  */
  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }

  /**
   * addItem -- публичный метод: принимает DOM-элемент и добавляет его в контейнер.
   */
  addItemAppend(item) {
    this._containerElement.append(item);
  }

  addItemPrepend(item) {
    this._containerElement.prepend(item);
  }
}

