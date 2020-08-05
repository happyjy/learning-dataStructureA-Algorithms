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

eval("console.log('### Tree');\nfunction TreeNode(value) {\n  this.value = value;\n  this.chhildren = [];\n}\n\nfunction BinaryTreeNode(value) {\n  this.value = value;\n  this.left = null;\n  this.right = null;\n}\n\nclass BinaryTree {\n  constructor() {\n    this._root = null;\n  }\n\n  traversePreOrder() {\n    this.traversePreOrderHelper(this._root);\n  }\n  traversePreOrderHelper(node) {\n    if (!node) return;\n\n    console.log(node.value);\n    this.traversePreOrderHelper(node.left);\n    this.traversePreOrderHelper(node.right);\n  }\n  traversePreOrderIterative() {\n    //전략\n    /*\n      * Tree를 순회하면서 Node를 모두 nodeStack배열에 넣는다. \n      1. 항목을 출력한다. \n      2. 오른쪽 자식을 nodeStack에 push\n      3. 왼쪽 자식을 nodeStack에 push \n      \n      * 오른쪽 자식을 먼저 넣는이유는 ?\n       => let node = nodeStack.pop(); 단계에서 나중에 넣은 왼쪽 자식을 먼저 빼내기 때문이다. \n    */\n    let nodeStack = [];\n    nodeStack.push(this._root);\n\n    while (nodeStack.length) {\n      let node = nodeStack.pop();\n      console.log(node.value);\n\n      if (node.right) nodeStack.push(node.right);\n      if (node.left) nodeStack.push(node.left);\n    }\n  }\n\n  traverseInOrder() {\n    //재귀 호출로 트리 순회\n    this.traverseInOrderHelper(this._root);\n  }\n  traverseInOrderHelper(node) {\n    if (!node) return;\n\n    this.traverseInOrderHelper(node.left);\n    console.log(node.value);\n    this.traverseInOrderHelper(node.right);\n  }\n  traverseInOrderIterative() {\n    let currNode = this._root,\n      nodeStack = [],\n      done = false;\n\n    while (!done) {\n      // 1. root 노드 기준 왼쪽에 있는 노드를 모두 nodeStack에 push\n      // 2. nodeStack에 넣은 노드를 빼냄 -> 콘솔찍고 -> 콘솔 찍은 노드의 right노드를 currNode로 정하고\n      if (currNode != null) {\n        nodeStack.push(currNode);\n        currNode = currNode.left;\n      } else {\n        if (nodeStack.length) {\n          currNode = nodeStack.pop();\n          console.log(currNode.value);\n          currNode = currNode.right; // <- [] 없어도 되는 코드 있것 같은데 확인해보기\n        } else {\n          done = true;\n        }\n      }\n    }\n  }\n\n  traversePostOrder() {\n    this.traversePostOrderHelper(this._root);\n  }\n  traversePostOrderHelper(node) {\n    //[] if 조건문 없어도 되지 않나 ? 확인해보기\n    // if (node.left) {\n    this.traversePostOrderHelper(node.left);\n    // }\n    // if (node.right) {\n    this.traversePostOrderHelper(node.right);\n    // }\n    console.log(node.value);\n  }\n  traversePostOrderIterative() {\n    let stack1 = [],\n      stack2 = [];\n\n    stack1.push(this._root);\n    while (stack1.length) {\n      let node = stack1.pop();\n      stack2.push(node);\n\n      if (node.left) stack1.push(node.left);\n      if (node.right) stack1.push(node.right);\n    }\n\n    while (stack2.length) {\n      const node = stack2.pop();\n      console.log(node.value);\n    }\n  }\n}\n\n// 이진트리\n// root보다 작으면 왼쪽, 크면 오른쪽 노드에 위치 한다.\nclass BinarySearchTree extends BinaryTree {\n  constructor() {\n    super();\n    this._root = null;\n  }\n\n  insert(value) {\n    let thisNode = {\n      left: null,\n      right: null,\n      value: value,\n    };\n    if (!this._root) {\n      this._root = thisNode;\n    } else {\n      let currentRoot = this._root;\n      while (true) {\n        if (currentRoot.value > value) {\n          if (currentRoot.left != null) {\n            currentRoot = currentRoot.left;\n          } else {\n            currentRoot.left = thisNode;\n            break;\n          }\n        } else if (currentRoot.value < value) {\n          if (currentRoot.right != null) {\n            currentRoot = currentRoot.right;\n          } else {\n            currentRoot.right = thisNode;\n            break;\n          }\n        } else {\n          break;\n        }\n      }\n    }\n  }\n\n  // 시간 복잡도(균형트리) O(log2(n))\n  // 시간 복잡도(불균형 트리) O(n)\n  remove(value) {\n    return deleteRecursively(this._root, value);\n\n    function deleteRecursively(root, value) {\n      if (!root) {\n        return null;\n      } else if (value < root.value) {\n        root.left = deleteRecursively(root.left, value);\n      } else if (value > root.value) {\n        root.right = deleteRecursively(root.right, value);\n      } else {\n        //value를 찾은 경우\n        //no child\n        if (!root.left && !root.right) {\n          //case1\n          return null;\n        } else if (!root.left) {\n          //case2\n          root = root.right;\n          return root;\n        } else if (!root.right) {\n          //case2\n          root = root.left;\n          return root;\n        } else {\n          //case3\n          //  - 자식 노드 두개 있는 경우 왼쪽 하위 트리의 최대치, 또는 오른쪽 하위 트리의 최소치를 찾아서 해당 노드 대체\n          let tempNode = this.findMin(root.right);\n          root.value = tempNode.value;\n          root.right = deleteRecursively(root.right, tempNode.value);\n          return root;\n        }\n      }\n    }\n  }\n\n  findMin(root) {\n    while (root.left) {\n      root = root.left;\n    }\n    return root;\n  }\n\n  findNode(value) {\n    let currentRoot = this._root,\n      found = false;\n    while (currentRoot) {\n      if (currentRoot.value > value) {\n        currentRoot = currentRoot.left;\n      } else if (currentRoot.value < value) {\n        currentRoot = currentRoot.right;\n      } else {\n        //노드 찾음\n        found = true;\n        break;\n      }\n    }\n    return found;\n  }\n}\n\nconst bst1 = new BinarySearchTree();\n\nconsole.log('### insert');\nconsole.log(bst1.insert(2));\nconsole.log(bst1.insert(1));\nconsole.log(bst1.insert(4));\nconsole.log(bst1.insert(3));\nconsole.log(bst1.insert(5));\n\n/*\n      2\n     / \\\n    1   4\n       / \\\n      3   5\n*/\n\nconsole.log('### findeNode');\nconsole.log(bst1.findNode(3)); // true\nconsole.log(bst1.findNode(5)); // true\nconsole.log(bst1.findNode(10)); // false\n\n// 두개 노드의 같은 root node 찾기\nfunction findLowestCommonAncestor(root, value1, value2) {\n  function findLowestCommonAncestorHelper(root, value1, value2) {\n    if (!root) return;\n    //[point] 조건문\n    if (Math.max(value1, value2) < root.value)\n      return findLowestCommonAncestorHelper(root.left, value1, value2);\n    //[point] 조건문\n    if (Math.min(value1, value2) > root.value)\n      return findLowestCommonAncestorHelper(root.right, value1, value2);\n    return root.value;\n  }\n  return findLowestCommonAncestorHelper(root, value1, value2);\n}\n\n// debugger;\nconsole.log('### findLowestCommonAncestor');\nconsole.log(findLowestCommonAncestor(bst1._root, 1, 4));\nconsole.log(findLowestCommonAncestor(bst1._root, 3, 5));\nconsole.log(findLowestCommonAncestor(bst1._root, 2, 3));\nconsole.log(findLowestCommonAncestor(bst1._root, 4, 5));\n\n//N level 노드 구하기\nfunction printNthLevels(root, n = 0) {\n  let arrayNth = [];\n  queue = [];\n\n  if (!root) return;\n\n  queue.push([root, 0]);\n  while (queue.length) {\n    let tuple = queue.shift(),\n      temp = tuple[0],\n      height = tuple[1];\n\n    if (height == n) {\n      arrayNth.push([temp.left, ++height]);\n    }\n    if (temp.left) queue.push([temp.left, height + 1]);\n    if (temp.right) queue.push([temp.right, height + 1]);\n  }\n  console.log(`${n} 번째 level node list`);\n  console.log(arrayNth);\n}\nconst bst2 = new BinarySearchTree();\nbst2.insert(5);\nbst2.insert(3);\nbst2.insert(7);\nbst2.insert(2);\nbst2.insert(4);\nbst2.insert(6);\nbst2.insert(8);\n\n/*\n      5\n     / \\\n    3   7\n  / \\  / \\\n 2  4 6  8\n*/\n// debugger;\nconsole.log('### printNthLevels');\nprintNthLevels(bst2._root, 1);\nprintNthLevels(bst2._root, 2);\n\n// * 주어진 두 트리가 구조가 같은지 확인\n// * return 문 예상 시나리오\n//   - root1, root2의 value가 같으면 해당 노드의 왼쪽을 recursive 하면서 모두 순회하면서 비교\n//   - 그리고 stack에서 빠져나오면 그 다음 조건인 노드의 오른쪽 조건을 확인한다.\nfunction isSameTree(root1, root2) {\n  if (root1 == null && root2 == null) return true;\n  if (root1 == null || root2 == null) return false;\n  return (\n    root1.value == root2.value &&\n    isSameTree(root1.left) === isSameTree(root2.left) &&\n    isSameTree(root1.right) === isSameTree(root2.right)\n  );\n}\n\n// isSameTree를 재귀 호출하면서 subTree가 root의 하위으 subTree인지 확인한다.\nfunction checkIfSubTree(root, subTree) {\n  var queue = [],\n    counter = 0;\n\n  if (!root) {\n    return;\n  }\n\n  queue.push(root);\n\n  while (queue.length) {\n    let temp = queue.shift();\n\n    if ((temp.data == subTree.data) === isSameTree(temp, subTree)) {\n      return true;\n    }\n\n    if (temp.left) {\n      queue.push(temp.left);\n    }\n    if (temp.right) {\n      queue.push(temp.right);\n    }\n  }\n  return false;\n}\n\nvar node1 = {\n  value: 5,\n  left: {\n    value: 3,\n    left: {\n      value: 1,\n    },\n    right: {\n      value: 2,\n    },\n  },\n  right: {\n    value: 7,\n  },\n};\n\nvar node2 = {\n  value: 3,\n  left: {\n    value: 1,\n  },\n  right: {\n    value: 2,\n  },\n};\n\nvar node3 = {\n  value: 3,\n  left: {\n    value: 1,\n  },\n};\n\n/*\n    node1\n      5\n     / \\\n    3   7\n   / \\   \n  1  2   \n*/\n\n/*\n    node2\n      3\n     / \\\n    1   2\n*/\n\n/*\n    node3\n      3\n     /\n    1   \n*/\n\nconsole.log('### checkIfSubTree 테스트');\nconsole.log(checkIfSubTree(node1, node2)); // true\nconsole.log(checkIfSubTree(node1, node3)); // false\nconsole.log(checkIfSubTree(node2, node3)); // false\n\nfunction isMirrorTrees(tree1, tree2) {\n  if (!tree1 && !tree2) {\n    return true;\n  }\n\n  if (!tree1 || !tree2) {\n    return false;\n  }\n\n  const checkLeftwithRight = isMirrorTrees(tree1.left, tree2.right),\n    checkRightwithLeft = isMirrorTrees(tree2.right, tree1.left);\n\n  return tree1.value == tree2.value && checkLeftwithRight && checkRightwithLeft;\n}\n\nvar node1 = {\n  value: 3,\n  left: {\n    value: 1,\n  },\n  right: {\n    value: 2,\n  },\n};\n\nvar node2 = {\n  value: 3,\n  left: {\n    value: 2,\n  },\n  right: {\n    value: 1,\n  },\n};\n\nvar node3 = {\n  value: 3,\n  left: {\n    value: 1,\n  },\n  right: {\n    value: 2,\n    left: {\n      value: 2.5,\n    },\n  },\n};\n\nconsole.log('### isMirrorTrees 테스트');\nconsole.log(isMirrorTrees(node1, node2)); // true\nconsole.log(isMirrorTrees(node2, node3)); // false\n\n\n//# sourceURL=webpack:///./src/03.Tree.js?");

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