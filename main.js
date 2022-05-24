(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e,n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._cardNameData=e.name,this._cardLinkData=e.link,this._cardTemplateSelector=n,this._handleCardClick=r}var n,r;return n=t,(r=[{key:"_getTemplate",value:function(){return document.querySelector(this._cardTemplateSelector).content.querySelector(".card").cloneNode(!0)}},{key:"generateCard",value:function(){return this._cardElement=this._getTemplate(),this._cardTitleElement=this._cardElement.querySelector(".card__title"),this._cardTitleElement.textContent=this._cardNameData,this._cardImageElement=this._cardElement.querySelector(".card__image"),this._cardImageElement.src=this._cardLinkData,this._cardImageElement.alt="".concat(this._cardNameData,". Фотография"),this._likeButtonElement=this._cardElement.querySelector(".card__like-button"),this._setEventListeners(),this._cardElement}},{key:"_setEventListeners",value:function(){var e=this;this._cardImageElement.addEventListener("click",(function(){e._handleCardClick()})),this._likeButtonElement.addEventListener("click",(function(){e._handleLikeButton()})),this._cardElement.querySelector(".card__del-button").addEventListener("click",(function(){e._removeCard()}))}},{key:"_handleLikeButton",value:function(){this._likeButtonElement.classList.toggle("card__like-button_active")}},{key:"_removeCard",value:function(){this._cardElement.remove(),this._cardElement=null}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function r(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var i=r((function e(t,n){var r=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),o(this,"_showInputError",(function(e,t){var n=e.closest(r._inputFieldSelector).querySelector(r._inputErrorMessageClass);e.classList.add(r._inputErrorUnderlineClass),n.textContent=t,n.classList.add(r._activeErrorClass)})),o(this,"_hideInputError",(function(e){var t=e.closest(r._inputFieldSelector).querySelector(r._inputErrorMessageClass);e.classList.remove(r._inputErrorUnderlineClass),t.classList.remove(r._activeErrorClass),t.textContent=""})),o(this,"_isValid",(function(e){e.validity.valid?r._hideInputError(e):r._showInputError(e,e.validationMessage)})),o(this,"_hasInvalidInput",(function(){return r._inputElementsArr.some((function(e){return!e.validity.valid}))})),o(this,"toggleButtonState",(function(){r._hasInvalidInput()?(r._popupSubmitButtonElement.classList.add(r._inactiveSubmitButtonClass),r._popupSubmitButtonElement.setAttribute("disabled",!0)):(r._popupSubmitButtonElement.classList.remove(r._inactiveSubmitButtonClass),r._popupSubmitButtonElement.removeAttribute("disabled"))})),o(this,"_setEventListeners",(function(){r.toggleButtonState(),r._inputElementsArr.forEach((function(e){e.addEventListener("input",(function(){r._isValid(e),r.toggleButtonState()}))}))})),o(this,"enableValidation",(function(){r._setEventListeners()})),this._formElement=n,this._inputFieldSelector=t.inputFieldSelector,this._inputSelector=t.inputSelector,this._inputErrorMessageClass=t.inputErrorMessageClass,this._inputErrorUnderlineClass=t.inputErrorUnderlineClass,this._activeErrorClass=t.activeErrorClass,this._inactiveSubmitButtonClass=t.inactiveSubmitButtonClass,this._inputElementsArr=Array.from(this._formElement.querySelectorAll(this._inputSelector)),this._popupSubmitButtonElement=this._formElement.querySelector(t.popupSubmitButtonSelector)}));function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var a=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popupElement=document.querySelector(t),this._handleEscClose=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popupElement.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popupElement.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"setEventListeners",value:function(){var e=this;this._popupElement.addEventListener("click",(function(t){(t.target.classList.contains("popup_opened")||t.target.classList.contains("popup__close-button"))&&e.close()}))}}])&&u(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function l(e){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l(e)}function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function s(){return s="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=p(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},s.apply(this,arguments)}function p(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=m(e)););return e}function f(e,t){return f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},f(e,t)}function d(e,t){if(t&&("object"===l(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function m(e){return m=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},m(e)}var _=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&f(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=m(r);if(o){var n=m(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return d(this,e)});function u(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,e))._popupForm=n._popupElement.querySelector(".popup__input-list"),n._inputsList=n._popupForm.querySelectorAll(".popup__input"),n._submitButtonElement=n._popupElement.querySelector(".popup__save-button"),n._handleFormSubmit=t,n}return t=u,(n=[{key:"_getInputValues",value:function(){var e=this;return this._formValues={},this._inputsList.forEach((function(t){e._formValues[t.name]=t.value})),this._formValues}},{key:"setEventListeners",value:function(){var e=this;s(m(u.prototype),"setEventListeners",this).call(this),this._popupElement.addEventListener("submit",(function(t){t.preventDefault(),e._handleFormSubmit(e._getInputValues())}))}},{key:"close",value:function(){s(m(u.prototype),"close",this).call(this),this._popupForm.reset()}}])&&c(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(a);function y(e){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},y(e)}function h(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function v(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function b(){return b="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=E(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},b.apply(this,arguments)}function E(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=k(e)););return e}function g(e,t){return g=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},g(e,t)}function S(e,t){if(t&&("object"===y(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return w(e)}function w(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function k(e){return k=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},k(e)}function C(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var O=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&g(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=k(r);if(o){var n=k(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return S(this,e)});function u(){var e;h(this,u);for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return C(w(e=i.call.apply(i,[this].concat(n))),"_popupImageElement",e._popupElement.querySelector(".popup__image")),C(w(e),"_popupImageСaptionElement",e._popupElement.querySelector(".popup__figcaption")),e}return t=u,(n=[{key:"open",value:function(e){this._popupImageСaptionElement.textContent=e.name,this._popupImageElement.src=e.link,this._popupImageElement.alt="".concat(e.name,". Фотография"),b(k(u.prototype),"open",this).call(this)}}])&&v(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(a);function j(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var L=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._items=r,this._renderer=o,this._containerElement=document.querySelector(n)}var t,n;return t=e,(n=[{key:"renderItems",value:function(){var e=this;this._items.forEach((function(t){e._renderer(t)}))}},{key:"addItemAppend",value:function(e){this._containerElement.append(e)}},{key:"addItemPrepend",value:function(e){this._containerElement.prepend(e)}}])&&j(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function P(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var I=function(){function e(t){var n=t.profileNameSelector,r=t.profileAboutSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._profileNameElement=document.querySelector(n),this._profileAboutElement=document.querySelector(r)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{userName:this._profileNameElement.textContent,userAbout:this._profileAboutElement.textContent}}},{key:"setUserInfo",value:function(e){var t=e.userName,n=e.userAbout;this._profileNameElement.textContent=t,this._profileAboutElement.textContent=n}}])&&P(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),q=".popup_type_profile",B=".popup_type_cards",A={inputFieldSelector:".popup__field",inputSelector:".popup__input",inputErrorMessageClass:".popup__input-error",inputErrorUnderlineClass:"popup__input_type_error",activeErrorClass:"popup__input-error_active",inactiveSubmitButtonClass:"popup__save-button_inactive",popupSubmitButtonSelector:".popup__save-button"},x=document.querySelector(".profile").querySelector(".profile__edit-button"),R=document.querySelector(q),T=document.querySelector(B),N=R.querySelector("#name-input"),D=R.querySelector("#about-input"),F=new O(".popup_type_image");function V(e){return new t(e,"#template",(function(){F.open(e)})).generateCard()}F.setEventListeners();var U=new L({items:[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}],renderer:function(e){var t=V(e);U.addItemAppend(t)}},".cards__list");U.renderItems();var M=new I({profileNameSelector:".profile__title",profileAboutSelector:".profile__subtitle"}),z=new _(q,(function(e){M.setUserInfo({userName:e.userName,userAbout:e.userAbout}),z.close()}));z.setEventListeners(),x.addEventListener("click",(function(){var e=M.getUserInfo();N.value=e.userName,D.value=e.userAbout,z.open()}));var G=new _(B,(function(e){var t=V({name:e.name,link:e.link});U.addItemPrepend(t),G.close()}));G.setEventListeners(),document.querySelector(".profile__add-button").addEventListener("click",(function(){J.toggleButtonState(),G.open()}));var H=new i(A,R),J=new i(A,T);H.enableValidation(),J.enableValidation()})();