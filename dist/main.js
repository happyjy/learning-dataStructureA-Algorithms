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

eval("// console.log(\"### dataStructure.js \");\n\n// export default function () {\n//   console.log(\"dataSTructure - export\");\n// }\nconsole.log('### SinglyLinkedList');\n\nfunction SinglyLinkedListNode(data) {\n  this.data = data;\n  this.next = null;\n}\n\n/**\n * insert\n * insertAtHead\n * insertAtTail\n * remove\n * removeAt\n * removeAtHead\n * removeAtTail\n * print\n * getPrototypeList\n */\n\nclass SinglyLinkedList {\n  constructor() {\n    this.head = null;\n    this.size = 0;\n  }\n\n  isEmpty() {\n    return this.size == 0;\n  }\n\n  //원하는 위치에 insert\n  insert(position, value) {\n    if (position >= 0 && position <= this.size) {\n      let newNode = new SinglyLinkedListNode(value),\n        currNode = this.head,\n        prevNode,\n        nextNode, // 명시적인 이해를 위해서 추가\n        index = 0;\n\n      if (position === 0) {\n        newNode.next = currNode;\n        this.head = newNode;\n      } else {\n        while (index++ < position) {\n          prevNode = currNode;\n          currNode = currNode.next;\n        }\n        nextNode = currNode;\n\n        newNode.next = nextNode;\n        prevNode.next = newNode;\n      }\n      this.size++;\n      return true;\n    } else {\n      return false;\n    }\n  }\n\n  insertAtHead(value) {\n    // Linked List head 유무에 따라서 insertAtHead 로직이 달라진다.\n    const newNode = new SinglyLinkedListNode(value);\n\n    if (this.head === null) {\n      this.head = newNode;\n    } else {\n      //기존에 있던 head를 추가할 Node next로 옮긴다.\n      //추가할 Node -> 기존 head\n      const temp = this.head;\n      this.head = newNode;\n      this.head.next = temp;\n    }\n\n    this.size++;\n  }\n\n  insertAtTail(value) {\n    const newNode = new SinglyLinkedListNode(value);\n    let currNode;\n\n    if (this.head === null) {\n      this.head = newNode;\n    } else {\n      currNode = this.head;\n      //tail까지 이동\n      while (currNode.next) {\n        currNode = currNode.next;\n      }\n      currNode.next = newNode;\n    }\n    this.size++;\n  }\n\n  //Node 값 기준으로 삭제\n  remove(value) {\n    //지우려고 하는 value가 아래와 같이 세가지 경우로 나뉠 수 있다.\n    //1. head\n    //2. !(head || tail): value를 Node를 순회한다.\n    //3. tail\n    let currNode = this.head;\n    if (currNode.data == value) {\n      // 1. head\n      this.head = currNode.next;\n      this.size--;\n    } else {\n      let prevNode = currNode;\n      while (currNode.next) {\n        // 2. !(head || tail)\n        if (currNode.data == value) {\n          //삭제 대상 Node: \"currNode\"\n          prevNode.next = currNode.next;\n          // prevNode = currNode; //[&&&]이 코드는 필요 없어 보임...\n          currNode = currNode.next; //[&&&]아래 두 code는 break 되고 3.tail 조건에 만족하기 때문에 필요한 코드\n          break;\n        }\n        //Node 이동\n        prevNode = currNode;\n        currNode = currNode.next;\n      }\n      // 3. tail\n      if (currNode.data == value) {\n        prevNode.next = null;\n      }\n\n      this.size--;\n    }\n  }\n\n  //Node 위치 기준으로 삭제\n  removeAt(position) {\n    if (position > -1 && position < this.size) {\n      let currNode = this.head,\n        prevNode,\n        index = 0;\n\n      if (position === 0) {\n        this.head = currNode.next;\n      } else {\n        while (index++ < position) {\n          prevNode = currNode;\n          currNode = currNode.next;\n        }\n\n        // 현재 노드의 다음과 이전 것을 연결(삭제)\n        prevNode.next = currNode.next;\n      }\n      this.size--;\n      return currNode.data;\n    } else {\n      return null;\n    }\n  }\n\n  removeAtHead() {\n    let headData = null;\n\n    if (this.head !== null) {\n      headData = this.head.data;\n      this.head = this.head.next;\n      this.size--;\n    }\n\n    return headData;\n  }\n\n  removeAtTail() {\n    let headData = null;\n    if (this.head !== null) {\n      let currNode = this.head,\n        prevNode = this.head;\n      //tail까지 이동\n      if (!currNode.next) {\n        while (currNode.next) {\n          prevNode = currNode;\n          currNode = currNode.next;\n        }\n        //제일 마지막 노드의 이전 노드에서 마지막노드를 끊음\n        prevNode.next = currNode.next;\n      } else {\n        //노드가 하나 밖에 없을때\n        this.head = null;\n      }\n      headData = currNode.data;\n    }\n    this.size--;\n    return headData;\n  }\n\n  print() {\n    console.log(`--------------------------------------------------------`);\n    let printArr = [];\n    let currNode = this.head;\n\n    if (currNode != null) {\n      while (currNode.next != null) {\n        printArr.push(currNode.data);\n        currNode = currNode.next;\n      }\n      if (currNode.next == null) {\n        printArr.push(currNode.data);\n      }\n    } else {\n      printArr.push('empty');\n    }\n\n    if (arguments.length >= 1) {\n      const arg = [...arguments].shift();\n      let msg = '';\n      if (typeof arg === 'string') {\n        msg = arg;\n        console.log(`### PRINT - ${msg}: `, printArr.join(' -> '));\n        console.log(`--------------------------------------------------------`);\n        console.log('');\n        return;\n      }\n    }\n    console.log(`### PRINT: `, printArr.join(' -> '));\n    console.log(`--------------------------------------------------------`);\n    console.log('');\n  }\n\n  getPrototypeList() {\n    return Object.getOwnPropertyNames(SinglyLinkedList.prototype);\n  }\n}\n\ndebugger;\n\nconst sll = new SinglyLinkedList();\nsll.insertAtHead(10); //Linked List Node Status: 10 -> null\nsll.insertAtHead(20); //Linked List Node Status: 20 -> 10 -> null\nsll.insertAtHead(30); //Linked List Node Status: 30 -> 20 -> 10 -> null\nsll.print('end of sll');\n\nconst sll1 = new SinglyLinkedList();\nsll1.insertAtHead(10); //Linked List Node Status: 10 -> null\nsll1.insertAtHead(20); //Linked List Node Status: 20 -> 10 -> null\nsll1.insertAtHead(30); //Linked List Node Status: 30 -> 20 -> 10 -> null\nsll1.insertAtHead(31); //Linked List Node Status: 31 -> 30 -> 20 -> 10 -> null\nsll1.insertAtHead(32); //Linked List Node Status: 32 -> 31 -> 30 -> 20 -> 10 -> null\nsll1.insertAtHead(40); //Linked List Node Status: 40 -> 32 -> 31 -> 30 -> 20 -> 10 -> null\nsll1.print('end of insertAtHead sll1');\n\nsll1.remove(32); //Linked List Node Status: 40 -> 31 -> 30 -> 20 -> 10 -> null\nsll1.remove(31); //Linked List Node Status: 40 -> 30 -> 20 -> 10 -> null\nsll1.remove(30); //Linked List Node Status: 40 -> 20 -> 10 -> null\nsll1.print('end of remove sll1 - remove');\n\nsll1.removeAtTail();\nsll1.removeAtTail();\nsll1.removeAtTail();\nsll1.print('end of remove sll1 - removeAtTail');\n\n``;\nvar sll2 = new SinglyLinkedList();\nsll2.insertAtHead(1); // Linked List Node Status:  1 -> null\nsll2.insertAtHead(12); // Linked List Node Status: 12 -> 1 -> null\nsll2.insertAtHead(20); // Linked List Node Status: 20 -> 12 -> 1 -> null\nsll2.removeAtHead(); // Linked List Node Status:  12 -> 1 -> null\nsll2.print('end of sll2');\n\nsll2.removeAt(0);\nsll2.print('sll2 - removeAt');\nsll2.removeAt(0);\nsll2.print('sll2 - removeAt');\nsll2.removeAt(0);\nsll2.print('sll2 - removeAt');\n\nvar sll3 = new SinglyLinkedList();\nsll3.insertAtTail(10);\nsll3.insertAtTail(20);\nsll3.insertAtTail(30);\nsll3.print('sll3 - insertAtTail');\nsll3.insertAtHead(100);\nsll3.insertAtHead(200);\nsll3.insertAtHead(300);\nsll3.print('sll3 - insertAtHead');\n\nsll3.getPrototypeList();\n\n\n//# sourceURL=webpack:///./src/01.SinglyLinkedList.js?");

/***/ }),

/***/ "./src/02.DoublyLinkedList.js":
/*!************************************!*\
  !*** ./src/02.DoublyLinkedList.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("console.log('### DoublyLinkedList');\n\nclass DoublyLinkedListNode {\n  constructor(data) {\n    this.data = data;\n    this.next = null;\n    this.prev = null;\n  }\n}\n\nclass DoublyLinkedList {\n  constructor(data) {\n    this.head = null;\n    this.tail = null;\n    this.size = 0;\n  }\n\n  isEmpty() {\n    return this.size === 0;\n  }\n\n  insert(position, value) {\n    //범위외의 값 체크\n    if (position >= 0 && position <= size) {\n      let node = new DoublyLinkedListNode(value),\n        currNode = this.head,\n        prevNode,\n        nextNode, // 명시적인 이해를 위해서 추가\n        index = 0;\n      /*\n         아래 3가지 조건일때 추가한느 로직이 다름\n          1. head\n            1.1 size가 0인 경우\n            1.2 size가 0이 아닌 경우\n          2. tail\n          3. !(head || tail): value를 Node를 순회한다.\n      */\n      if (position === 0) {\n        //1. head\n        if (!this.head) {\n          //1.1 size가 0인 경우\n          this.head = node;\n          this.tail = node;\n        } else {\n          //1.2 size가 0이 아닌 경우\n          node.next = currNode;\n          currNode.prev = node;\n          this.head = node;\n        }\n      } else if (position === size) {\n        //2. tail\n        tail.next = node;\n        node.prev = tail;\n        tail = node;\n      } else {\n        //3. !(head || tail): value를 Node를 순회한다.\n        //position 바로 직전까지 순회하면서 prevNode, nextNode 이동\n        while (index++ < position) {\n          prevNode = currNode;\n          currNode = currNode.next;\n        }\n        nextNode = currNode;\n\n        node.next = nextNode;\n        prevNode.next = node;\n        nextNode.prev = node;\n        node.prev = prevNode;\n      }\n      length++;\n\n      return true;\n    } else {\n      // else statement of 범위체크 if statement\n      return false;\n    }\n  }\n\n  insertAtHead(value) {\n    if (this.head === null) {\n      this.head = new DoublyLinkedListNode(value);\n      this.tail = this.head;\n    } else {\n      const newNode = new DoublyLinkedListNode(value);\n      newNode.next = this.head;\n      this.head.prev = newNode;\n      this.head = newNode;\n    }\n    this.size++;\n  }\n\n  insertAtTail(value) {\n    if (this.tail === null) {\n      this.tail = new DoublyLinkedListNode(value);\n      this.head = this.tail;\n    } else {\n      const newNode = new DoublyLinkedListNode(value);\n      newNode.prev = this.tail;\n      this.tail.next = newNode;\n      this.tail = newNode;\n    }\n    this.size++;\n  }\n\n  deleteAtHead() {\n    let toReturn = null;\n\n    if (this.head !== null) {\n      toReturn = this.head.data;\n\n      if (this.tail === this.head) {\n        //node가 하나 밖에 없는 경우\n        this.head = null;\n        this.tail = null;\n      } else {\n        this.head = this.head.next;\n        this.head.prev = null;\n      }\n    }\n    this.size--;\n    return toReturn;\n  }\n\n  deleteAtTail() {\n    let toReturn = null;\n    if (this.tail !== null) {\n      toReturn = this.tail.data;\n      if (this.tila === this.head) {\n        this.head = null;\n        this.tail = null;\n      } else {\n        this.tail = this.tail.prev;\n        this.tail.next = null;\n      }\n    }\n    this.size--;\n    return toReturn;\n  }\n\n  findStartingHead(value) {\n    let currentHead = this.head;\n    while (currentHead.next != null) {\n      if (currentHead.data == value) {\n        return true;\n      }\n      currentHead = currentHead.next;\n    }\n    return false;\n  }\n\n  findStartingTail() {\n    let currentHead = this.tail;\n    while (currentHead.prev) {\n      if (currentHead.data == value) {\n        return true;\n      }\n      currentHead = currentHead.prev;\n    }\n    return false;\n  }\n}\n\nvar dll1 = new DoublyLinkedList();\ndll1.insertAtHead(10); // ddl1's structure: tail: 10  head: 10\ndll1.insertAtHead(12); // ddl1's structure: tail: 10  head: 12\ndll1.insertAtHead(20); // ddl1's structure: tail: 10  head: 20\n\nvar dll2 = new DoublyLinkedList();\ndll2.insertAtHead(10); // ddl1's structure: tail: 10  head: 10\ndll2.insertAtHead(12); // ddl1's structure: tail: 10  head: 12\ndll2.insertAtHead(20); // ddl1's structure: tail: 10  head: 20\ndll2.insertAtTail(30); // ddl1's structure: tail: 30  head: 20\n\n\n//# sourceURL=webpack:///./src/02.DoublyLinkedList.js?");

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