"use strict";
exports.id = 17;
exports.ids = [17];
exports.modules = {

/***/ 4901:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Y": () => (/* binding */ QuizCard)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4513);
/* harmony import */ var _chakra_ui_icons__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_icons__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8930);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1492);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_firestore__WEBPACK_IMPORTED_MODULE_3__]);
firebase_firestore__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




function QuizCard(props) {
    const { quiz , index , quizzesRef , editable  } = props;
    const { question , answer: correctAnswer , options  } = quiz;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Card, {
        w: {
            base: "sm",
            md: "lg"
        },
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.CardBody, {
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.HStack, {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Stat, {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.StatLabel, {
                                children: [
                                    "# ",
                                    index + 1
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.StatNumber, {
                                children: question
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.StatHelpText, {
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.UnorderedList, {
                                    children: options?.map((option, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ListItem, {
                                                children: option === correctAnswer ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                    children: [
                                                        option,
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Badge, {
                                                            colorScheme: "green",
                                                            mx: 2,
                                                            children: "Correct"
                                                        })
                                                    ]
                                                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                    children: option
                                                })
                                            }, index)
                                        }))
                                })
                            })
                        ]
                    }),
                    editable === true && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.IconButton, {
                        "aria-label": "Delete quiz",
                        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_chakra_ui_icons__WEBPACK_IMPORTED_MODULE_1__.CloseIcon, {}),
                        onClick: ()=>deleteQuiz(quiz.id)
                    })
                ]
            })
        })
    });
    async function deleteQuiz(id) {
        if (quizzesRef) {
            await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.deleteDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_3__.doc)(quizzesRef, id));
        }
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 911:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "D": () => (/* binding */ quizConverter)
/* harmony export */ });
const quizConverter = {
    toFirestore (quiz) {
        return {
            question: quiz.question,
            options: quiz.options,
            answer: quiz.answer
        };
    },
    fromFirestore (snapshot, options) {
        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            question: data.question,
            options: data.options,
            answer: data.answer
        };
    }
};


/***/ }),

/***/ 808:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "e": () => (/* binding */ roomConverter)
/* harmony export */ });
const roomConverter = {
    toFirestore (room) {
        return {
            pin: room.pin,
            status: room.status,
            title: room.title,
            description: room.description,
            createdAt: room.createdAt,
            updatedAt: room.updatedAt,
            expiresAt: room.expiresAt,
            createdBy: room.createdBy,
            currentQuizId: room.currentQuizId
        };
    },
    fromFirestore (snapshot, options) {
        const data = snapshot.data(options);
        return {
            pin: data.pin,
            status: data.status,
            title: data.title,
            description: data.description,
            createdAt: data.createdAt.toDate(),
            updatedAt: data.updatedAt.toDate(),
            expiresAt: data.expiresAt.toDate(),
            createdBy: data.createdBy,
            currentQuizId: data.currentQuizId
        };
    }
};


/***/ })

};
;