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

/***/ "./src/03.Tree.js":
/*!************************!*\
  !*** ./src/03.Tree.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("console.log('### Tree');\nfunction TreeNode(value) {\n  this.value = value;\n  this.chhildren = [];\n}\n\nfunction BinaryTreeNode(value) {\n  this.value = value;\n  this.left = null;\n  this.right = null;\n}\n\nclass BinaryTree {\n  constructor() {\n    this._root = null;\n  }\n\n  traversePreOrder() {\n    this.traversePreOrderHelper(this._root);\n  }\n  traversePreOrderHelper(node) {\n    if (!node) return;\n\n    console.log(node.value);\n    this.traversePreOrderHelper(node.left);\n    this.traversePreOrderHelper(node.right);\n  }\n  traversePreOrderIterative() {\n    //전략\n    /*\n      * Tree를 순회하면서 Node를 모두 nodeStack배열에 넣는다. \n      1. 항목을 출력한다. \n      2. 오른쪽 자식을 nodeStack에 push\n      3. 왼쪽 자식을 nodeStack에 push \n      \n      * 오른쪽 자식을 먼저 넣는이유는 ?\n       => let node = nodeStack.pop(); 단계에서 나중에 넣은 왼쪽 자식을 먼저 빼내기 때문이다. \n    */\n    let nodeStack = [];\n    nodeStack.push(this._root);\n\n    while (nodeStack.length) {\n      let node = nodeStack.pop();\n      console.log(node.value);\n\n      if (node.right) nodeStack.push(node.right);\n      if (node.left) nodeStack.push(node.left);\n    }\n  }\n\n  traverseInOrder() {\n    //재귀 호출로 트리 순회\n    this.traverseInOrderHelper(this._root);\n  }\n  traverseInOrderHelper(node) {\n    if (!node) return;\n\n    this.traverseInOrderHelper(node.left);\n    console.log(node.value);\n    this.traverseInOrderHelper(node.right);\n  }\n  traverseInOrderIterative() {\n    let currNode = this._root,\n      nodeStack = [],\n      done = false;\n\n    while (!done) {\n      // 1. root 노드 기준 왼쪽에 있는 노드를 모두 nodeStack에 push\n      // 2. nodeStack에 넣은 노드를 빼냄 -> 콘솔찍고 -> 콘솔 찍은 노드의 right노드를 currNode로 정하고\n      if (currNode != null) {\n        nodeStack.push(currNode);\n        currNode = currNode.left;\n      } else {\n        if (nodeStack.length) {\n          currNode = nodeStack.pop();\n          console.log(currNode.value);\n          currNode = currNode.right; // <- [] 없어도 되는 코드 있것 같은데 확인해보기\n        } else {\n          done = true;\n        }\n      }\n    }\n  }\n\n  traversePostOrder() {\n    this.traversePostOrderHelper(this._root);\n  }\n  traversePostOrderHelper(node) {\n    //[] if 조건문 없어도 되지 않나 ? 확인해보기\n    // if (node.left) {\n    this.traversePostOrderHelper(node.left);\n    // }\n    // if (node.right) {\n    this.traversePostOrderHelper(node.right);\n    // }\n    console.log(node.value);\n  }\n  traversePostOrderIterative() {\n    let stack1 = [],\n      stack2 = [];\n\n    stack1.push(this._root);\n    while (stack1.length) {\n      let node = stack1.pop();\n      stack2.push(node);\n\n      if (node.left) stack1.push(node.left);\n      if (node.right) stack1.push(node.right);\n    }\n\n    while (stack2.length) {\n      const node = stack2.pop();\n      console.log(node.value);\n    }\n  }\n}\n\n// 이진트리\n// root보다 작으면 왼쪽, 크면 오른쪽 노드에 위치 한다.\nclass BinarySearchTree extends BinaryTree {\n  constructor() {\n    super();\n    this._root = null;\n  }\n\n  insert(value) {\n    let thisNode = {\n      left: null,\n      right: null,\n      value: value,\n    };\n    if (!this._root) {\n      this._root = thisNode;\n    } else {\n      let currentRoot = this._root;\n      while (true) {\n        if (currentRoot.value > value) {\n          if (currentRoot.left != null) {\n            currentRoot = currentRoot.left;\n          } else {\n            currentRoot.left = thisNode;\n            break;\n          }\n        } else if (currentRoot.value < value) {\n          if (currentRoot.right != null) {\n            currentRoot = currentRoot.right;\n          } else {\n            currentRoot.right = thisNode;\n            break;\n          }\n        } else {\n          break;\n        }\n      }\n    }\n  }\n\n  // 시간 복잡도(균형트리) O(log2(n))\n  // 시간 복잡도(불균형 트리) O(n)\n  remove(value) {\n    return deleteRecursively(this._root, value);\n\n    function deleteRecursively(root, value) {\n      if (!root) {\n        return null;\n      } else if (value < root.value) {\n        root.left = deleteRecursively(root.left, value);\n      } else if (value > root.value) {\n        root.right = deleteRecursively(root.right, value);\n      } else {\n        //value를 찾은 경우\n        //no child\n        if (!root.left && !root.right) {\n          //case1\n          return null;\n        } else if (!root.left) {\n          //case2\n          root = root.right;\n          return root;\n        } else if (!root.right) {\n          //case2\n          root = root.left;\n          return root;\n        } else {\n          //case3\n          //  - 자식 노드 두개 있는 경우 왼쪽 하위 트리의 최대치, 또는 오른쪽 하위 트리의 최소치를 찾아서 해당 노드 대체\n          let tempNode = this.findMin(root.right);\n          root.value = tempNode.value;\n          root.right = deleteRecursively(root.right, tempNode.value);\n          return root;\n        }\n      }\n    }\n  }\n\n  findMin(root) {\n    while (root.left) {\n      root = root.left;\n    }\n    return root;\n  }\n\n  findNode(value) {\n    let currentRoot = this._root,\n      found = false;\n    while (currentRoot) {\n      if (currentRoot.value > value) {\n        currentRoot = currentRoot.left;\n      } else if (currentRoot.value < value) {\n        currentRoot = currentRoot.right;\n      } else {\n        //노드 찾음\n        found = true;\n        break;\n      }\n    }\n    return found;\n  }\n}\n\nconst bst1 = new BinarySearchTree();\nbst1.insert(1);\nbst1.insert(3);\nbst1.insert(2);\nconsole.log(bst1.findNode(3)); // true\nconsole.log(bst1.findNode(5)); // false\n\n\n//# sourceURL=webpack:///./src/03.Tree.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _03_Tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./03.Tree */ \"./src/03.Tree.js\");\n/* harmony import */ var _03_Tree__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_03_Tree__WEBPACK_IMPORTED_MODULE_0__);\n// import SinglyLinkedList from './01.SinglyLinkedList';\n// import DoublyLinkedList from './02.DoublyLinkedList';\n\n// import LL from './LL';\n\n// console.log('### app.js1');\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ })

/******/ });