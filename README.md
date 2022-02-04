# Проект: Место ([mesto](https://github.com/pnrf))

*- это моя новая учебная работа на курсе "веб-разработчик" в Яндекс.Практикуме (**4-ый спринт**). Мы только приступили к изучению javascript. Процесс обучения (в т.ч. выполнения данной работы) состоит из нескольких двухнедельных спринтов, поэтому с каждым спринтом код будет дополняться и изменяться*

**Мои предыдущие учебные работы:**
- [X] "Как надо учиться" ([how-to-learn](https://github.com/pnrf)) - 1-ый спринт;
- [X] "Путешествие по России" ([russian-travel](https://pnrf.github.io/russian-travel/)) - 2-3 спринты;

### Особенности проекта:
* html, css, javascript;
* методология БЭМ (Nested);
* дизайн-макет из Figma;
* оптимизация картинок через онлайн-сервис [tinypng.com](https://tinypng.com/);
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
* новая проблема: я попытался смержить feature/header в features. Терминал выдал что-то мне не понятное -- одни тильды. Говорит: "Please enter a commit message to explain why this merge is necessary, especially if it merges an updated upstream into a topic branch". При этом: в github у меня всего 2 ветки: main и feature/header. А в git - 4: main, developer, features, feature/header. Разбираюсь, что к чему.
