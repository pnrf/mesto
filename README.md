# Проект: Место ([mesto](https://pnrf.github.io/mesto/))

*- это моя новая учебная работа на курсе "веб-разработчик" в Яндекс.Практикуме (**4-ый спринт**). Мы только приступили к изучению javascript. Процесс обучения (в т.ч. выполнения данной работы) состоит из нескольких двухнедельных спринтов, поэтому с каждым спринтом код будет дополняться и изменяться*

**Мои предыдущие учебные работы:**
- [X] "Как надо учиться" ([how-to-learn](#)) - 1-ый спринт;
- [X] "Путешествие по России" ([russian-travel](https://pnrf.github.io/russian-travel/)) - 2-3 спринты;

### Особенности проекта:
* html, css, javascript;
* методология БЭМ (Nested);
* дизайн-макет из Figma;
* оптимизация картинок через онлайн-сервис [tinypng.com](https://tinypng.com/) и [svgomg](https://jakearchibald.github.io/svgomg/);
* адаптивная верстка (mobile first);
* git/github - терминал, работа с ветками, корректные названия коммитов ([онлайн-сервис](https://commitlint.io));
* готовый проект необходимо опубликовать на github pages.

### Хронология:
**04.02.2022**

* приступил к выполнению работы;
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

**05.02.2022**

* оказывается, после того как смержил ветки, нужно вызвать команду: git push. Ну, вот, теперь логика понятна, вроде бы все встало на свои места. Но! Чтобы лучше разобраться нужны еще git-конфликты. Сейчас запушу этот файл в ветку develop, т.к. в будущем я в нее волью features. Значит, неизбежно возникнет конфликт, с которым мне придется разобраться. Но! Теперь я вроде бы знаю, как это сделать.
* Дурень я, дурень!!!!! Как же все оказывается просто и доступно!!!! Оставлю все предыдущие свои комментарии себе на будущее -- для острастки!

**06.02.2022**

* добавил базовую структуру по БЭМ;
* добавил header. У логотипа при 320dpi непонятный размер картинки, поэтому я установил min-height для всего блока header;
* добавил section 'profile' (для мобильных -- 320px);
* добавил section 'places' (для мобильных -- 320px);
* добавил section 'footer' (для мобильных -- 320px);

**12.02.2022**

* изменил 'header' (для screen min-width - 1280px);
* добавил остальные блоки (для screen min-width - 1280px);
* исправил код под pixel perfect (для screen min-width - 320px);

**13.02.2022**

* адаптировал верстку (для screen min-widt - 320px, 768px, 1024px, 1280px);
* сверстал попап и добавил функции открытия/закрытия попапа;
* доработал заголовки в карточках (на случай их переполнения текстом);
* подготовил для следующего спринта возможность ставить лайк (сердечко закрашивается черным);
* опубликовал сайт на github pages;
