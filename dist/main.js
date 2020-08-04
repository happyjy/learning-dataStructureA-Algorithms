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

/***/ "./src/02.DoublyLinkedList.js":
/*!************************************!*\
  !*** ./src/02.DoublyLinkedList.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("console.log('### DoublyLinkedList');\n\nclass DoublyLinkedListNode {\n  constructor(data) {\n    this.data = data;\n    this.next = null;\n    this.prev = null;\n  }\n}\n\n/**\n * isEmpty\n * insert\n * insertAtHead\n * insertAtTail\n *\n * deleteAtHead\n * delete\n * recursiveDelFromHead\n * recursiveDelFromTail\n *\n * deleteAt\n * deleteAtHead\n * deleteAtTail\n *\n * findStartingHead\n * findStartingTail\n * printFromHead\n * printFromTail\n * isSameHeadTailStatus\n */\nclass DoublyLinkedList {\n  constructor(data) {\n    this.head = null;\n    this.tail = null;\n    this.size = 0;\n  }\n\n  isEmpty() {\n    return this.size === 0;\n  }\n\n  insert(position, value) {\n    //범위외의 값 체크\n    if (position >= 0 && position <= this.size) {\n      let newNode = new DoublyLinkedListNode(value),\n        currNode = this.head,\n        prevNode,\n        nextNode, // 명시적인 이해를 위해서 추가\n        index = 0;\n      /*\n         아래 3가지 조건일때 추가한는 로직이 다름\n          1. head에 추가\n            1.1 size가 0인 경우\n            1.2 size가 0이 아닌 경우\n          2. tail에 추가\n          3. !(head || tail): value를 Node를 순회한다.\n      */\n      if (position === 0) {\n        //1. head\n        this.insertAtHead(value);\n      } else if (position === this.size) {\n        //2. tail\n        this.insertAtTail(value);\n      } else {\n        //3. !(head || tail): value를 Node를 순회한다.\n        //position 바로 직전까지 순회하면서 prevNode, nextNode 이동\n        while (index++ < position) {\n          prevNode = currNode;\n          currNode = currNode.next;\n        }\n        nextNode = currNode;\n\n        newNode.next = nextNode;\n        prevNode.next = newNode;\n        nextNode.prev = newNode;\n        newNode.prev = prevNode;\n      }\n      this.size++;\n\n      return true;\n    } else {\n      // else statement of 범위체크 if statement\n      return false;\n    }\n  }\n\n  insertAtHead(value) {\n    if (this.head === null) {\n      this.head = new DoublyLinkedListNode(value);\n      this.tail = this.head; // [A] ref.\n    } else {\n      const newNode = new DoublyLinkedListNode(value);\n      newNode.next = this.head;\n      this.head.prev = newNode;\n      // 0. this.head, this.tail을 callbyreference로 연결 되어 있다.\n      // 1. this.head.prev는 this.Tail의 prev프로퍼티 제일 마지막 위치다. 그래서 this.head.prev는 this.Tail의 제일 끝 노드의 prev다.\n      // 2. 1 -> 2 -> 3 이있을때 Tail의 prev 속성으로 프린트 하면 다음과 같다. 3 -> 2 -> 1\n      // this.head는 1이다. 여기에 this.head.prev에 값을 연결하면 1다음에 연결되는 것이다.\n      this.head = newNode;\n    }\n    this.size++;\n  }\n\n  insertAtTail(value) {\n    if (this.tail === null) {\n      this.tail = new DoublyLinkedListNode(value);\n      this.head = this.tail;\n    } else {\n      const newNode = new DoublyLinkedListNode(value);\n      newNode.prev = this.tail;\n      this.tail.next = newNode; // === this.tail.prev = newNode; (callbyreference 때문) <-[A] ref.\n      this.tail = newNode;\n    }\n    this.size++;\n  }\n\n  // Node 값 기준으로 삭제\n  delete(value) {\n    this.recursiveDelFromHead(this.head, value);\n    this.recursiveDelFromTail(this.tail, value);\n  }\n\n  recursiveDelFromHead(node, value) {\n    let currNode = node;\n\n    if (currNode.data === value) {\n      if (!currNode.prev) {\n        this.head = currNode.next;\n        this.head.prev = null;\n        return currNode.value;\n      } else if (!currNode.next) {\n        let returnValue = currNode.value;\n        currNode = null;\n        return returnValue;\n      } else {\n        currNode.prev.next = currNode.next;\n        currNode.next.prev = currNode.prev;\n      }\n      this.size--;\n      return currNode.data;\n    }\n\n    if (currNode.next === null) return null;\n    if (currNode.next) this.recursiveDelFromHead(currNode.next, value);\n  }\n\n  recursiveDelFromTail(node, value) {\n    let currNode = node;\n\n    if (currNode.data === value) {\n      if (!currNode.prev) {\n        this.tail = currNode.prev;\n        this.tail.prev = null;\n        return currNode.value;\n      } else if (!currNode.next) {\n        let returnValue = currNode.value;\n        currNode = null;\n        return returnValue;\n      } else {\n        currNode.prev.next = currNode.next;\n        currNode.next.prev = currNode.prev;\n      }\n      this.size--;\n      return currNode.data;\n    }\n\n    if (currNode.prev === null) return null;\n    if (currNode.prev) this.recursiveDelFromTail(currNode.prev, value);\n  }\n\n  // Node 위치 기준으로 삭제\n  deleteAt(position) {\n    if (position > -1 && position <= this.size) {\n      let currNode = this.head,\n        prevNode,\n        index = 0;\n\n      if (position === 0) {\n        this.deleteAtHead();\n      } else if (position === this.size) {\n        this.deleteAtTail();\n      } else {\n        while (index++ < position) {\n          prevNode = currNode;\n          currNode = currNode.next;\n        }\n\n        prevNode.next = currNode.next;\n        currNode.next.prev = prevNode;\n        this.size--;\n      }\n      return currNode.value;\n    } else {\n      return null;\n    }\n  }\n\n  deleteAtHead() {\n    let toReturn = null;\n\n    if (this.head !== null) {\n      toReturn = this.head.data;\n\n      if (this.tail === this.head) {\n        //node가 하나 밖에 없는 경우\n        this.head = null;\n        this.tail = null;\n      } else {\n        this.head = this.head.next;\n        this.head.prev = null;\n      }\n    }\n    this.size--;\n    return toReturn;\n  }\n\n  deleteAtTail() {\n    let toReturn = null;\n    if (this.tail !== null) {\n      toReturn = this.tail.data;\n      if (this.tail === this.head) {\n        this.head = null;\n        this.tail = null;\n      } else {\n        this.tail = this.tail.prev;\n        this.tail.next = null;\n      }\n    }\n    this.size--;\n    return toReturn;\n  }\n\n  findStartingHead(value) {\n    let currentHead = this.head;\n    while (currentHead.next != null) {\n      if (currentHead.data == value) {\n        return true;\n      }\n      currentHead = currentHead.next;\n    }\n    return false;\n  }\n\n  findStartingTail(value) {\n    let currentHead = this.tail;\n    while (currentHead.prev) {\n      if (currentHead.data == value) {\n        return true;\n      }\n      currentHead = currentHead.prev;\n    }\n    return false;\n  }\n\n  printFromHead() {\n    console.log(`--------------------------------------------------------`);\n    let printArr = [];\n    let currNode = this.head;\n\n    if (currNode != null) {\n      while (currNode.next != null) {\n        printArr.push(currNode.data);\n        currNode = currNode.next;\n      }\n      if (currNode.next == null) {\n        printArr.push(currNode.data);\n      }\n    } else {\n      printArr.push('empty');\n    }\n\n    if (arguments.length >= 1) {\n      const arg = [...arguments].shift();\n      let msg = '';\n      if (typeof arg === 'string') {\n        msg = arg;\n        console.log(`### PRINT from Head - ${msg}: `, printArr.join(' -> '));\n        console.log(`--------------------------------------------------------`);\n        console.log('');\n        return;\n      }\n    }\n    console.log(`### PRINT from Head: `, printArr.join(' -> '));\n    console.log(`--------------------------------------------------------`);\n    console.log('');\n  }\n\n  printFromTail(msg) {\n    console.log(`--------------------------------------------------------`);\n    let printArr = [];\n    let currNode = this.tail;\n\n    if (currNode != null) {\n      while (currNode.prev != null) {\n        printArr.push(currNode.data);\n        currNode = currNode.prev;\n      }\n      if (currNode.prev == null) {\n        printArr.push(currNode.data);\n      }\n    } else {\n      printArr.push('empty');\n    }\n\n    if (arguments.length >= 1) {\n      const arg = [...arguments].shift();\n      let msg = '';\n      if (typeof arg === 'string') {\n        msg = arg;\n        console.log(`### PRINT from Tail - ${msg}: `, printArr.join(' -> '));\n        console.log(`--------------------------------------------------------`);\n        console.log('');\n        return;\n      }\n    }\n    console.log(`### PRINT from Tail: `, printArr.join(' -> '));\n    console.log(`--------------------------------------------------------`);\n    console.log('');\n  }\n\n  isSameHeadTailStatus() {\n    let headStack = [];\n    let tailStack = [];\n    let currHeadNode = this.head;\n    let currTailNode = this.tail;\n\n    if (currHeadNode != null) {\n      while (currHeadNode.next) {\n        headStack.push(currHeadNode.data);\n        currHeadNode = currHeadNode.next;\n      }\n      if (currHeadNode.next == null) {\n        headStack.push(currHeadNode.data);\n      }\n    }\n\n    if (currTailNode != null) {\n      while (currTailNode.prev) {\n        tailStack.push(currTailNode.data);\n        currTailNode = currTailNode.prev;\n      }\n      if (currTailNode.prev == null) {\n        tailStack.push(currTailNode.data);\n      }\n    }\n\n    return JSON.stringify(headStack) == JSON.stringify(tailStack.reverse());\n  }\n}\n\nvar dll1 = new DoublyLinkedList();\ndll1.insertAtHead(1); // `1\ndll1.insertAtHead(2); // `2 -> 1\ndll1.insertAtHead(3); // `3 -> 2 -> 1\ndll1.insertAtTail(10); // 3 -> 2 -> 1 -> `10\ndll1.insertAtTail(20); // 3 -> 2 -> 1 -> 10 -> `20\ndll1.insert(0, 100); // `100 -> 3 -> 2 -> 1 -> 10 -> 20\ndll1.insert(4, 200); // 100 -> 3 -> 2 -> 1 -> `200 -> 10 -> 20\ndll1.insert(10, 300); // 삽입 안됨.\ndll1.printFromHead('dll1 Test'); // 100 -> 3 -> 2 -> 1 -> 200 -> 10 -> 20\ndll1.printFromTail('dll1 Test');\nconsole.log(dll1.isSameHeadTailStatus());\ndebugger;\n\ndll1.deleteAt(0); // 3 -> 2 -> 1 -> 200 -> 10 -> 20\ndll1.deleteAt(2); // 3 -> 2 -> 200 -> 10 -> 20\ndll1.deleteAt(dll1.size); // 3 -> 2 -> 200 -> 10\ndll1.printFromHead('dll1 Test2'); // 3 -> 2 -> 200 -> 10\ndll1.printFromTail('dll1 Test2');\nconsole.log(dll1.isSameHeadTailStatus());\ndebugger;\n\ndll1.deleteAtHead(); // 2 -> 200 -> 10\ndll1.deleteAtTail(); // 2 -> 200\ndll1.printFromHead('dll1 Test3');\ndll1.printFromTail('dll1 Test3');\nconsole.log(dll1.isSameHeadTailStatus());\ndebugger;\n\ndll1.insertAtHead(1); //\ndll1.insertAtHead(2); //\ndll1.insertAtHead(3); //\ndll1.insertAtTail(10); //\ndll1.insertAtTail(20); //\ndll1.insertAtTail(30); //\ndll1.printFromHead('dll1 Test4');\ndll1.printFromTail('dll1 Test4');\nconsole.log(dll1.isSameHeadTailStatus());\ndebugger;\n\ndll1.delete(1);\ndll1.delete(2);\ndll1.delete(3);\ndll1.delete(30);\ndll1.delete(20);\ndll1.delete(2220);\ndll1.printFromHead('dll1 Test5');\ndll1.printFromTail('dll1 Test5');\nconsole.log(dll1.isSameHeadTailStatus());\ndebugger;\n\ndll1.findStartingHead(10);\ndll1.findStartingTail(200);\n\ndebugger;\n\n\n//# sourceURL=webpack:///./src/02.DoublyLinkedList.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _02_DoublyLinkedList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./02.DoublyLinkedList */ \"./src/02.DoublyLinkedList.js\");\n/* harmony import */ var _02_DoublyLinkedList__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_02_DoublyLinkedList__WEBPACK_IMPORTED_MODULE_0__);\n// import SinglyLinkedList from './01.SinglyLinkedList';\n\n// import Tree from './03.Tree';\n// import LL from './LL';\n\n// console.log('### app.js1');\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ })

/******/ });