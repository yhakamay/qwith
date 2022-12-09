"use strict";
exports.id = 849;
exports.ids = [849];
exports.modules = {

/***/ 5849:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "I": () => (/* binding */ auth),
/* harmony export */   "db": () => (/* binding */ db),
/* harmony export */   "w": () => (/* binding */ functions)
/* harmony export */ });
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3745);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1492);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(401);
/* harmony import */ var firebase_functions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8937);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_firestore__WEBPACK_IMPORTED_MODULE_1__, firebase_auth__WEBPACK_IMPORTED_MODULE_2__, firebase_functions__WEBPACK_IMPORTED_MODULE_3__]);
([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_firestore__WEBPACK_IMPORTED_MODULE_1__, firebase_auth__WEBPACK_IMPORTED_MODULE_2__, firebase_functions__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




const firebaseConfig = {
    apiKey: "AIzaSyDWU2Vb3kKJOqEBDkutrG1MErZ1vBVPnuM",
    authDomain: "qwith-98273.firebaseapp.com",
    projectId: "qwith-98273",
    storageBucket: "qwith-98273.appspot.com",
    messagingSenderId: "649334180242",
    appId: "1:649334180242:web:5382b218ac0f063718594b"
};
const app = (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseConfig);
const db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getFirestore)(app);
const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getAuth)(app);
const functions = (0,firebase_functions__WEBPACK_IMPORTED_MODULE_3__.getFunctions)(app);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;