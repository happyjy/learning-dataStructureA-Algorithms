/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/01.SinglyLinkedList.js":
/*!************************************!*\
  !*** ./src/01.SinglyLinkedList.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// console.log(\"### dataStructure.js \");\n\n// export default function () {\n//   console.log(\"dataSTructure - export\");\n// }\nconsole.log('### SinglyLinkedList');\n\nfunction SinglyLinkedListNode(data) {\n  this.data = data;\n  this.next = null;\n}\n\nclass SinglyLinkedList {\n  constructor() {\n    this.head = null;\n    this.size = 0;\n  }\n\n  isEmpty() {\n    return this.size == 0;\n  }\n\n  insert(value) {\n    // Linked List head 유무에 따라서 insert 로직이 달라진다.\n    // debugger;\n    if (this.head === null) {\n      this.head = new SinglyLinkedListNode(value);\n    } else {\n      //기존에 있던 head를 추가할 Node next로 옮긴다.\n      //추가할 Node -> 기존 head\n      const temp = this.head;\n      this.head = new SinglyLinkedListNode(value);\n      this.head.next = temp;\n    }\n    this.size++;\n  }\n\n  remove(value) {\n    //지우려고 하는 value가 아래와 같이 세가지 경우로 나뉠 수 있다.\n    //1. head\n    //2. !(head || tail): value를 Node를 순회한다.\n    //3. tail\n    let currentHead = this.head;\n    if (currentHead.data == value) {\n      // 1. head\n      this.head = currentHead.next;\n      this.size--;\n    } else {\n      let prev = currentHead;\n      while (currentHead.next) {\n        // 2. !(head || tail)\n        if (currentHead.data == value) {\n          //삭제 대상 Node: \"currentHead\"\n          debugger;\n          prev.next = currentHead.next;\n          // prev = currentHead; //[&&&]이 코드는 필요 없어 보임...\n          currentHead = currentHead.next; //[&&&]아래 두 code는 break 되고 3.tail 조건에 만족하기 때문에 필요한 코드\n          break;\n        }\n        //Node 이동\n        prev = currentHead;\n        currentHead = currentHead.next;\n      }\n      // 3. tail\n      if (currentHead.data == value) {\n        prev.next = null;\n      }\n\n      this.size--;\n    }\n  }\n\n  deleteAtHead() {\n    let headData = null;\n\n    if (this.head !== null) {\n      headData = this.head.data;\n      this.head = this.head.next;\n      this.size--;\n    }\n\n    return headData;\n  }\n\n  print() {\n    let printArr = [];\n    let currentHead = this.head;\n\n    while (currentHead.next != null) {\n      printArr.push(currentHead.data);\n      currentHead = currentHead.next;\n    }\n    if (currentHead.next == null) {\n      printArr.push(currentHead.data);\n    }\n\n    if (arguments.length >= 1) {\n      const arg = [...arguments].shift();\n      let msg = '';\n      if (typeof arg === 'string') {\n        msg = arg;\n        console.log(`### PRINT - ${msg}: `, printArr.join(' -> '));\n        return;\n      }\n    }\n    console.log(`### PRINT: `, printArr.join(' -> '));\n  }\n\n  getPrototypeList() {\n    return Object.getOwnPropertyNames(SinglyLinkedList.prototype);\n  }\n}\n\nconst sll = new SinglyLinkedList();\nsll.insert(10); //Linked List Node Status: 10 -> null\nsll.insert(20); //Linked List Node Status: 20 -> 10 -> null\nsll.insert(30); //Linked List Node Status: 30 -> 20 -> 10 -> null\nsll.print('end of sll');\n\n// debugger;\nconst sll1 = new SinglyLinkedList();\nsll1.insert(10); //Linked List Node Status: 10 -> null\nsll1.insert(20); //Linked List Node Status: 20 -> 10 -> null\nsll1.insert(30); //Linked List Node Status: 30 -> 20 -> 10 -> null\nsll1.insert(31); //Linked List Node Status: 31 -> 30 -> 20 -> 10 -> null\nsll1.insert(32); //Linked List Node Status: 32 -> 31 -> 30 -> 20 -> 10 -> null\nsll1.insert(40); //Linked List Node Status: 40 -> 32 -> 31 -> 30 -> 20 -> 10 -> null\nsll1.print('end of insert sll1');\n\nsll1.remove(32); //Linked List Node Status: 40 -> 31 -> 30 -> 20 -> 10 -> null\nsll1.remove(31); //Linked List Node Status: 40 -> 30 -> 20 -> 10 -> null\nsll1.remove(30); //Linked List Node Status: 40 -> 20 -> 10 -> null\nsll1.print('end of remove sll1');\n// debugger;\n\nvar sll2 = new SinglyLinkedList();\nsll2.insert(1); // Linked List Node Status:  1 -> null\nsll2.insert(12); // Linked List Node Status: 12 -> 1 -> null\nsll2.insert(20); // Linked List Node Status: 20 -> 12 -> 1 -> null\nsll2.deleteAtHead(); // Linked List Node Status:  12 -> 1 -> null\nsll2.print('end of sll2');\n\nsll2.getPrototypeList();\n// debugger;\n\n\n//# sourceURL=webpack:///./src/01.SinglyLinkedList.js?");

/***/ }),

/***/ "./src/02.DoublyLinkedList.js":
/*!************************************!*\
  !*** ./src/02.DoublyLinkedList.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("console.log('### DoublyLinkedList');\n\n\n//# sourceURL=webpack:///./src/02.DoublyLinkedList.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _01_SinglyLinkedList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./01.SinglyLinkedList */ \"./src/01.SinglyLinkedList.js\");\n/* harmony import */ var _01_SinglyLinkedList__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_01_SinglyLinkedList__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _02_DoublyLinkedList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./02.DoublyLinkedList */ \"./src/02.DoublyLinkedList.js\");\n/* harmony import */ var _02_DoublyLinkedList__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_02_DoublyLinkedList__WEBPACK_IMPORTED_MODULE_1__);\n\n\n// import LL from './LL';\n\n// console.log('### app.js1');\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ })

/******/ });