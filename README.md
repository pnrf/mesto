# Проект: Место ([mesto](https://pnrf.github.io/mesto/))

*- это моя новая учебная работа на курсе "веб-разработчик" в Яндекс.Практикуме. Мы приступили к изучению javascript. Процесс обучения (в т.ч. выполнения данной работы) состоит из нескольких двухнедельных спринтов (**4-9 спринты**), поэтому с каждым спринтом код будет меняться и дополняться*

**Мои предыдущие учебные работы:**
- [X] "Как надо учиться" ([how-to-learn](https://pnrf.github.io/how-to-learn/)) - 1-ый спринт;
- [X] "Путешествие по России" ([russian-travel](https://pnrf.github.io/russian-travel/)) - 2-3 спринты;

### Особенности проекта:
* html, css, javascript;
* методология БЭМ (Nested);
* дизайн-макет из Figma;
* оптимизация картинок через онлайн-сервис [tinypng.com](https://tinypng.com/) и [svgomg](https://jakearchibald.github.io/svgomg/);
* адаптивная верстка (mobile first);
* git/github - терминал, работа с ветками, корректные названия коммитов ([онлайн-сервис](https://commitlint.io));
* готовый проект опубликован на github pages - [ссылка](https://pnrf.github.io/mesto/);
* по итогам каждого спринта работа проверяется код-ревьюерами, критические замечания которых обязательны для устранения.

### Хронология:
**04.02.2022** (ПР 4)

* приступил к выполнению работы по 4-му спринту;
* склонировал репозиторий "mesto" себе на комп;
* изменил README_md (он изначально имелся в репозитории, вместе с пожеланиями удачи от Яндекс.Практикума);
* добавил новые файлы: .nojekyll, .editorconfig, .gitignore, normalize.css;
* скачал дизайн-макет, импортировал в Figma на своем компе;
* скачал шрифты Inter (400, 500, 900): [официальный сайт](https://rsms.me/inter/), [репозиторий на github](https://github.com/rsms/inter);
* добавил файл - fonts.css;
* добавил файл - index.html. Прописал основную структуру страницы, в т.ч. 'head';
* добавил и подключил файлы - index.css и index.js;
* в index.css подключил normalize.css и fonts.css;
* создал в git несколько веток в следующей последовательности: main -> develop -> features -> feature/header;
* пытаюсь разобраться с коммитами и пушами в разные ветки;
* возник первый git-конфликт! Я вносил изменения в Readme_md и пушил коммиты в разные ветки: в features и в feature/header. Конфликт между изменениями в файле Readme_md в этих ветках, когда я попытался смержить вторую в первую. Решение: команда git diff - показала где конфликт, команда: git cat README.md - показала содержимое файла, открыл файл Readme_md в Visual Studio Code и удалил маркировку конфликта, добавил новую запись, сохранил, команда: git status, команда: git add README.md, команда: git commit -m "docs: change Readme_md", команда: git push -u origin feature/header. Т.е., как я понял, изменил конфликтный файл, сделал его новый коммит и запушил. Результат: 'Everything up-to-date'. Сейчас я написал этот текст и опять его запушу в ветку feature/header, а затем смержу эту ветку в ветку features. Отпишусь.
* новая проблема: я попытался смержить feature/header в features. Терминал выдал что-то мне не понятное -- одни тильды. Говорит: "Please enter a commit message to explain why this merge is necessary, especially if it merges an updated upstream into a topic branch". При этом: в github у меня всего 2 ветки: main и feature/header. А в git - 4: main, develop, features, feature/header. Разбираюсь, что к чему.
* думаю, я уловил смысл, как работают ветки. Я пытался запушить коммит в несуществующую на githube ветку. А чтобы новая ветка появилась на github, ее нужно не только создать в git, но и запушить в нее какой-нибудь initial commit. Почему-то Яндекс.Практикум на этом не акцентрировал наше внимание, поинтересуюсь у них. Ок. Завтра начинаю верстку, с git-конфликтами буду разбираться по ходу дела.

**05.02.2022** (ПР 4)

* оказывается, после того как смержил ветки, нужно вызвать команду: git push. Ну, вот, теперь логика понятна, вроде бы все встало на свои места. Но! Чтобы лучше разобраться нужны еще git-конфликты. Сейчас запушу этот файл в ветку develop, т.к. в будущем я в нее волью features. Значит, неизбежно возникнет конфликт, с которым мне придется разобраться. Но! Теперь я вроде бы знаю, как это сделать.
* Дурень я, дурень!!!!! Как же все оказывается просто и доступно!!!! Оставлю все предыдущие свои комментарии себе на будущее -- для острастки!

**06.02.2022** (ПР 4)

* добавил базовую структуру по БЭМ;
* добавил header. У логотипа при 320dpi непонятный размер картинки, поэтому я установил min-height для всего блока header;
* добавил section 'profile' (для мобильных -- 320px);
* добавил section 'places' (для мобильных -- 320px);
* добавил section 'footer' (для мобильных -- 320px);

**12.02.2022** (ПР 4)

* изменил 'header' (для screen min-width - 1280px);
* добавил остальные блоки (для screen min-width - 1280px);
* исправил код под pixel perfect (для screen min-width - 320px);

**13.02.2022** (ПР 4)

* адаптировал верстку (для screen min-widt - 320px, 768px, 1024px, 1280px);
* сверстал попап и добавил функции открытия/закрытия попапа;
* доработал заголовки в карточках (на случай их переполнения текстом);
* подготовил для следующего спринта возможность ставить лайк (сердечко закрашивается черным);
* опубликовал сайт на github pages;
* отправил на проверку код-ревьюеру.

**14.02.2022** (ПР 4) - получил замечания от код-ревьюера. Устраняю.

* создал новую ветку - hotfixes, смержил в нее main;
* добавил opacity для border-bottom в header (через rgba);
* подчистил ограничения текстовых элементов (полей) по высоте (height);
* добавил свойства (text-overflow: ellipsis; white-space: nowrap; overflow: hidden;) при переполнении текста;
* добавил всем кнопкам атрибут type;
* не использовал тег fieldset для группировки полей формы. Он добавляет лишние стили, от которых нарушается вся верстка. Этим надо будет заморочиться в будущем. Сейчас сроки поджимают, нужно сконцентрироваться на javascript;
* доработал функциональность попапа в javascript.
* отправил на повторную проверку код-ревьюеру.

**15.02.2022** (ПР 4) - получил замечания и подсказки от код-ревьюера по js. Исправляю.

* **успешно завершил 4-ый спринт**. Все замечания код-ревьюера устранил.
* приступил к изучению теории javascript по 5-му спринту.

**04.03.2022** (ПР 5) - приступил к выполнению практической работы по 5-му спринту.

* при загрузке на странице отображаются 6 карточек, которые добавляет javascript;

**05.03.2022** (ПР 5)

* данные профиля (имя, описание) на странице теперь выводит js из массива;
* отрефакторил код для редактирования данных профиля;
* добавил вызов попапа при клике на кнопку "добавить";
* вставил в попап уникальные значения и атрибут placeholder;
* сделал функционал добавления новых карточек;
* добавил возможность поставить лайк;

**06.03.2022** (ПР 5)

* добавил кнопку корзины для удаления карточки;
* запрограммировал кнопку корзины для удаления карточек (код пока не оптимален);
* добавил попап для просмотра картинок;

**14.03.2022** (ПР 5)

* запрограммировал попап для просмотра картинок;
* отрефакторил код при отрисовке карточек на странице;
* отправил код-ревьюеру на проверку;
* получил обратную связь от код-ревьюера;

**15.03.2022** (ПР 5) - устраняю замечания код-ревьюера (~ 25 критических, но! с детальными советами и рекомендациями)

* исправил html-код: переименовал некоторые названия классов по БЭМу, изменил код попапов и темплейта;
* исправил ccs-файлы: скорректировал файловую структуру по БЭМу, переименовал некоторые ccs-файлы, переподключил их;
* начал переписывать js код под требования код-ревьюера;

**16.03.2022** (ПР 5)

* переписал весь js код под требования код-ревьюера. Мозг вскипел, но опыт крайне полезный. Понял, в чем я ошибался.
* отправил на повторную проверку код-ревьюеру. Ожидаю вердикта.
* получил вердикт от код-ревьюера: "в целом все отлично, осталось доработать несколько моментов". Восхищен скрупулезным подходом код-ревьюера. Спасибо ей огромное за множество практических и дельных советов. Обязуюсь все исправить! Вижу, что с каждой итерацией мой код становится все лучше.

**17.03.2022** (ПР 5) - устраняю замечания код-ревьюера (~ 4 критических + ~ 7 практических советов по улучшению кода)

* пользуясь советом код-ревьюера, приступил к изучению правил оформления для [JS Doc 3](https://jsdoc.app/), чтобы мои комментарии в js-коде были более профессиональными и в будущем могли быть автоматически сгенерированы в рабочую документацию проекта;
* отрефакторил js-код. Прописал себе на будущее подробные комментарии;
* отправил на повторную проверку код-ревьюеру;
* **успешно завершил 5-ый спринт**. Код-ревьюер одобрила мою работу и напоследок написала еще 5 рекомендаций. Круто!

**18.03.2022** (ПР 5)

* отрефакторил js-код, согласно последним рекомендациям код-ревьюера;
* приступил к изучению теории 6-ого спринта.

**20.03.2022** (ПР 6) - приступил к выполнению практической работы по 6-му спринту.

* добавил возможность закрытия попапов при клике на крестик и на оверлей, а также при нажатии Esc;
* написал код для валидации полей форм. Но, он работает некорректно. Что-то я запутался. Продолжу завтра.

**21.03.2022** (ПР 6)

* добавил валидацию форм;
* отправил на проверку код-ревьюеру;
* получил замечания и рекомендации от код-ревьюера. Завтра займусь.

**22.03.2022** (ПР 6) - устраняю замечания код-ревьюера (4 критических + 4 рекомендации)

* сделал, чтобы слушатель для закрытия попапа по нажатию на Esc добавлялся при открытии попапа и удалялся при его закрытии;
* добавил css-свойство object-fit, чтобы пропорции изображений в карточках не искажались;
* поправил синтаксис js-кода, согласно рекомендациям код-ревьюера (действительно, стало лучше);
* поправил функцию деактивации кнопок submit ("сохранить" и "создать") в попапах;
* отправил на повторную проверку код-ревьюеру;
* получил ответ от код-ревьюера. Оказалось, пока я исправлял замечания, то немного запутался и допустил одну ошибку. Теперь эту ошибку нужно исправить. Очень хорошо, что так получилось, потому что для исправления ошибки код-ревьюер предложила весьма интересное решение. Класс! Завтра заморочусь.

**23.03.2022** (ПР 6) - устраняю замечания код-ревьюера (1 критическое + рекомендация по его устранению)

* вызвал функцию toggleButtonState() внутри addNewCard(). Разобрался с конструкцией, предложенной код-ревьюером: массив инпутов и кнопку формы достаем через событие evt. Теперь все встало на свои места!
* отправил на повторную проверку код-ревьюеру;
* **успешно завершил 6 спринт**;

**09.04.2022** (ПР 7) - приступил к выполнению практической работы по 7-му спринту.

* установил в VSCode расширение LiveServer;
* создал класс Card с функионалом рендеринга новой карточки из темплейта;
* создал файл Card.js -- перенес в него класс Card, подключил модульно.

**11.04.2022** (ПР 7)

* создал класс FormValidator, который настраивает валидацию полей формы;
* создал файл FormValidator_js вместо прежнего файла validateForms_js;
* отправил на проверку код-ревьюеру.
* получил ответ от код-ревьюера (8 критических замечаний + 3 рекомендации). Вношу исправления:
* переподключил файл initialCards_js модульно в index_js;

**12.04.2022** (ПР 7)

* голову сломал, пока разбирался с активацией/деактивацией кнопки сохранить при валидации формы. Сделал.
* подчистил свои комментарии в js-файлах;

**13.04.2022** (ПР 7)

* отрефакторил код в Class_js для кнопки лайка (сердечко) и кнопки удаления карточки (корзинка);
* исправил, чтобы в попапе при появлении сообщений об ошибках не менялась высота (height in span);
* отправил на повторную проверку код-ревьюеру;
* получил ответ от код-ревьюера: в целом все хорошо, осталось исправить некоторые шероховатости в js-коде.

**22.04.2022** (ПР 7)

* устранил шероховатости в коде (по замечаниям код-ревьюера), отправил на новую проверку;
* **успешно завершил 7 спринт**;
* приступил к изучению Webpack (8 спринт) и выполнению ПР-8;

**24.04.2022** (ПР 8)

* установил себе на комп Node.js;
* в корневую папку проекта добавил package_json (npm init);
* установил webpack (npm i webpack --save-dev) + сразу добавил папку /node_modules в gitignore;
* установил интерфейс командной строки для вебпака - webpack CLI (npm i webpack-cli --save-dev);
* настройкой сборки проекта вебпаком займусь позднее (в завершении ПР 8), а пока вновь требуется рефакторинг кода: создать новые классы и настроить связи между ними;
* добавил js-файлы c заготовками для новых классов: Section, Popup, PopupWithImage, PopupWithForm, UserInfo. Разбираюсь, как их связать с index.js (что куда перенести) + еще потребуется переписать класс Card.

**25.04.2022** (ПР 8)

* добавил код в Popup.js (перенес из index.js и частично переписал под логику класса);
* добавил код в PopupWithImage.js (перенес метод из Card.js) и частично переписал;
