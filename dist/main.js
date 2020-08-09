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

eval("console.log('### Tree');\n/*\n  #1. Tree 순회\n    * preOrder, inOrder, postOrder, 단계순위 순회(BFS-Breadth first search)\n      - 각각 recursive, iterator 버전이 있음.\n  #2. BinarySearchTree\n    * insert\n    * remove(deleteRecursively, findMin)\n    * findNode\n  #3. findLowestCommonAncestor(root, value1, value2)\n    * 두개 노드의 같은 root node 찾기\n  #4. printNthLevels(root, n = 0)\n    * N level 노드 구하기\n  #5. checkIfSubTree(root, subTree)\n    * 두번째 tree가 첫번째 트리의 subTree여부 확인 \n  #6. isMirrorTrees(tree1, tree2)\n    * 인수로 받은 tree가 같은 트리 여부 확인\n*/\nfunction TreeNode(value) {\n  this.value = value;\n  this.children = [];\n}\n\nfunction BinaryTreeNode(value) {\n  this.value = value; // root node\n  this.left = null; // leaf node\n  this.right = null; // leaf node\n}\n\n/*\n  #1. Tree 순회\n    * 트리 구조\n      -  BinaryTreeNode function 확인\n    * 순회 종류 3가지 : preOrder, inOrder, postOrder\n      - 노드를 순회하는 순서에 따라 3가지로 나뉨\n      - preOrder\n        : root node 출력 -> left leaf node 재귀함수 호출 -> right leaf node 재귀함수 호출\n        : root를 조사할 피룡가 있는 경우(leaf node 방문 전에 root를 먼저 방문한다.)\n      - inOrder\n        : left leaf node 재귀함수를 호출 -> root node 출력 -> right leaf node 재귀함수 호출\n        : leaf node를 먼저 조사해야 하는 경우(leaf node 검색할 때 루트를 조사하느라 시간낭비 하지 않는다.)\n      - postOrder\n        : left leaf node 재귀함수를 호출 -> right leaf node 재귀함수 호출 -> root node 출력\n        : 트리를 원래 순서대로 방문 하고 싶은 경우(선,후순위 순회는 트리가 생성된 순서와 다른 순서로 순회)\n */\nclass BinaryTree {\n  constructor() {\n    this._root = null;\n    this.traverseArr = [];\n  }\n\n  // 선순위 순회(재귀호출)\n  traversePreOrder() {\n    this.traversePreOrderHelper(this._root);\n    return this.printTraverse();\n  }\n  traversePreOrderHelper(node) {\n    if (!node) return;\n\n    // console.log(node.value);\n    this.traverseArr.push(node.value);\n    this.traversePreOrderHelper(node.left);\n    this.traversePreOrderHelper(node.right);\n  }\n  // 선순위 순회(반복문)\n  traversePreOrderIterative() {\n    /*\n      # 전략\n        : nodeStack 배열이 재귀 호출 했을때 stack과 똑같이 동작한다.\n        step1. 항목을 출력한다. \n        step2. right leaf node를 nodeStack에 push\n        step3. left leaf node를 nodeStack에 push \n\n      # right leaf node을 먼저 넣는이유는 ?\n        * let node = nodeStack.pop(); 단계에서 나중에 넣은 왼쪽 자식을 먼저 빼내기 때문이다. \n    */\n    let nodeStack = [];\n    nodeStack.push(this._root);\n\n    while (nodeStack.length) {\n      let node = nodeStack.pop();\n      //step1\n      // console.log(node.value);\n      this.traverseArr.push(node.value);\n\n      //step2\n      if (node.right) nodeStack.push(node.right);\n      //step3\n      if (node.left) nodeStack.push(node.left);\n    }\n\n    return this.printTraverse();\n  }\n\n  // 중순위 순회(재귀호출)\n  traverseInOrder() {\n    //재귀 호출로 트리 순회\n    this.traverseInOrderHelper(this._root);\n    return this.printTraverse();\n  }\n  traverseInOrderHelper(node) {\n    if (!node) return;\n\n    this.traverseInOrderHelper(node.left);\n    // console.log(node.value);\n    this.traverseArr.push(node.value);\n    this.traverseInOrderHelper(node.right);\n  }\n  // 중순위 순회(반복문)\n  traverseInOrderIterative() {\n    let currNode = this._root,\n      nodeStack = [],\n      done = false;\n\n    while (!done) {\n      /*\n        # 전략\n        step1. currNode가 null이 아닐경우 현재 root node의 left leaf node으로 이동하면서 가장 왼쪽에 있는 노드로 이동   \n                - 이동하면서 root node를 nodeStack 배열에 push\n        step2.0 currNode = nodeStack 배열에 넣은 node를 pop()\n        step2.1. step2에서 pop()한 node value 콘솔 찍고\n        step2.2. currNode = currnode의 right노드\n                ([***] currnode의 right leaf node 여부에 따라 왼쪽 노드를 순회 할지말지 결정된다.)\n        step2.3. currNode == null && nodeStack이 0일때까지 순회\n      */\n      if (currNode != null) {\n        //step1\n        nodeStack.push(currNode);\n        currNode = currNode.left;\n      } else {\n        //step2.3\n        if (nodeStack.length) {\n          //step2.0\n          currNode = nodeStack.pop();\n          //step2.1\n          // console.log(currNode.value);\n          this.traverseArr.push(currNode.value);\n          //step2.2\n          currNode = currNode.right;\n        } else {\n          done = true;\n        }\n      }\n    }\n    return this.printTraverse();\n  }\n\n  // 후순위 순회(재귀호출)\n  traversePostOrder() {\n    this.traversePostOrderHelper(this._root);\n    return this.printTraverse();\n  }\n  traversePostOrderHelper(node) {\n    if (node.left) {\n      this.traversePostOrderHelper(node.left);\n    }\n    if (node.right) {\n      this.traversePostOrderHelper(node.right);\n    }\n    this.traverseArr.push(node.value);\n    // console.log(node.value);\n  }\n  // 중순위 순회(반복문)\n  traversePostOrderIterative() {\n    let stack1 = [],\n      stack2 = [];\n\n    stack1.push(this._root);\n\n    while (stack1.length) {\n      let currNode = stack1.pop();\n      stack2.unshift(currNode.value);\n\n      if (currNode.left) stack1.push(currNode.left);\n      if (currNode.right) stack1.push(currNode.right);\n    }\n\n    return stack2.join('->');\n    // while (stack2.length) {\n    //   const node = stack2.pop();\n    //   console.log(node.value);\n    // }\n  }\n\n  //단계순위 순회\n  //  * == 너비 우선 검색(BFS - breadth first search)\n  //  * 핵심\n  //    - leaf node(right, left leaf node)로 깊게 들어가는 대신에 각 노드 단계를 방문\n  traverseLevelOrder() {\n    let root = this._root,\n      queue = [],\n      stack = [];\n\n    if (!root) return;\n    queue.push(root);\n\n    while (queue.length) {\n      let currNode = queue.shift();\n      // console.log(currNode.value);\n      stack.push(currNode.value);\n      if (currNode.left) queue.push(currNode.left);\n      if (currNode.right) queue.push(currNode.right);\n    }\n\n    return stack.join('->');\n  }\n\n  printTraverse() {\n    const copyTraverseArr = [...this.traverseArr];\n    this.traverseArr = [];\n    return copyTraverseArr.join('->');\n  }\n}\n\n// 이진 검색 트리\n// root보다 작으면 왼쪽, 크면 오른쪽 노드에 위치 한다.\nclass BinarySearchTree extends BinaryTree {\n  constructor() {\n    super();\n    this._root = null;\n  }\n\n  insert(value) {\n    let thisNode = {\n      left: null,\n      right: null,\n      value: value,\n    };\n    if (!this._root) {\n      this._root = thisNode;\n    } else {\n      let currentRoot = this._root;\n      while (true) {\n        if (currentRoot.value > value) {\n          if (currentRoot.left != null) {\n            currentRoot = currentRoot.left;\n          } else {\n            currentRoot.left = thisNode;\n            break;\n          }\n        } else if (currentRoot.value < value) {\n          if (currentRoot.right != null) {\n            currentRoot = currentRoot.right;\n          } else {\n            currentRoot.right = thisNode;\n            break;\n          }\n        } else {\n          break;\n        }\n      }\n    }\n  }\n\n  // 시간 복잡도(균형트리) O(log2(n))\n  // 시간 복잡도(불균형 트리) O(n)\n  remove(value) {\n    return deleteRecursively(this._root, value);\n\n    //노드보다 작으면 왼쪽 노드로, 크면 오른쪽 노드로 설정하는 이진 검색 트리 특징을 이용\n    //left node를 찾아가면 가장 작은 숫자의 노드를 찾을 수 있다.\n    function findMin(root) {\n      while (root.left) {\n        root = root.left;\n      }\n      return root;\n    }\n\n    function deleteRecursively(root, value) {\n      if (!root) {\n        return null;\n      } else if (value < root.value) {\n        root.left = deleteRecursively(root.left, value);\n      } else if (value > root.value) {\n        root.right = deleteRecursively(root.right, value);\n      } else {\n        //value를 찾은 경우\n        //no child\n        if (!root.left && !root.right) {\n          //case1\n          return null;\n        } else if (!root.left) {\n          //case2\n          root = root.right;\n          return root;\n        } else if (!root.right) {\n          //case2\n          root = root.left;\n          return root;\n        } else {\n          //case3\n          //  - 자식 노드 두개 있는 경우 왼쪽 하위 트리의 최대치, 또는 오른쪽 하위 트리의 최소치를 찾아서 해당 노드 대체\n          let tempNode = findMin(root.right);\n          root.value = tempNode.value;\n          root.right = deleteRecursively(root.right, tempNode.value);\n          return root;\n        }\n      }\n    }\n  }\n\n  findNode(value) {\n    let currentRoot = this._root,\n      found = false;\n    while (currentRoot) {\n      if (currentRoot.value > value) {\n        currentRoot = currentRoot.left;\n      } else if (currentRoot.value < value) {\n        currentRoot = currentRoot.right;\n      } else {\n        //노드 찾음\n        found = true;\n        break;\n      }\n    }\n    return found;\n  }\n}\n\nconst bst1 = new BinarySearchTree();\n\nconsole.log('### insert');\nbst1.insert(4);\nbst1.insert(2);\nbst1.insert(6);\nbst1.insert(1);\nbst1.insert(3);\nbst1.insert(5);\nbst1.insert(7);\n/*\n       4\n     /  \\\n    2    6\n   / \\  / \\\n  1  3 5  7\n*/\n\nconsole.log('### findeNode');\nconsole.log(bst1.findNode(3)); // true\nconsole.log(bst1.findNode(5)); // true\nconsole.log(bst1.findNode(10)); // false\n\nconsole.log('### remove');\nconsole.log(bst1.remove(6));\nconsole.log(bst1.remove(4));\n\nbst1.insert(4);\nbst1.insert(2);\nbst1.insert(6);\nbst1.insert(1);\nbst1.insert(3);\nbst1.insert(5);\nbst1.insert(7);\n\nconsole.log('## traversePreOrder'); // 4->2->1->3->6->5->7\nconsole.log(bst1.traversePreOrder());\nconsole.log(bst1.traversePreOrderIterative());\nconsole.log('## traverseInOrder'); // 1->2->3->4->5->6->7\nconsole.log(bst1.traverseInOrder());\nconsole.log(bst1.traverseInOrderIterative());\nconsole.log('## traversePostOrder'); // 1->3->2->5->7->6->4\nconsole.log(bst1.traversePostOrder());\nconsole.log(bst1.traversePostOrderIterative());\nconsole.log('## traverseLevelOrder');\nconsole.log(bst1.traverseLevelOrder()); // 4->2->6->1->3->5->7\n\n// 두개 노드의 같은 root node 찾기\nfunction findLowestCommonAncestor(root, value1, value2) {\n  function findLowestCommonAncestorHelper(root, value1, value2) {\n    if (!root) return;\n    //[point] 조건문\n    if (Math.max(value1, value2) < root.value)\n      return findLowestCommonAncestorHelper(root.left, value1, value2);\n    //[point] 조건문\n    if (Math.min(value1, value2) > root.value)\n      return findLowestCommonAncestorHelper(root.right, value1, value2);\n    return root.value;\n  }\n  return findLowestCommonAncestorHelper(root, value1, value2);\n}\n\n// debugger;\nconsole.log('### findLowestCommonAncestor');\nconsole.log(findLowestCommonAncestor(bst1._root, 1, 4));\nconsole.log(findLowestCommonAncestor(bst1._root, 3, 5));\nconsole.log(findLowestCommonAncestor(bst1._root, 2, 3));\nconsole.log(findLowestCommonAncestor(bst1._root, 4, 5));\n\n//N level 노드 구하기\nfunction printNthLevels(root, n = 0) {\n  let arrayNth = [];\n  queue = [];\n\n  if (!root) return;\n\n  queue.push([root, 0]);\n  while (queue.length) {\n    let tuple = queue.shift(),\n      temp = tuple[0],\n      height = tuple[1];\n\n    if (height == n) {\n      arrayNth.push([temp.left, ++height]);\n    }\n    if (temp.left) queue.push([temp.left, height + 1]);\n    if (temp.right) queue.push([temp.right, height + 1]);\n  }\n  console.log(`${n} 번째 level node list`);\n  console.log(arrayNth);\n}\nconst bst2 = new BinarySearchTree();\nbst2.insert(5);\nbst2.insert(3);\nbst2.insert(7);\nbst2.insert(2);\nbst2.insert(4);\nbst2.insert(6);\nbst2.insert(8);\n\n/*\n      5\n     / \\\n    3   7\n  / \\  / \\\n 2  4 6  8\n*/\n// debugger;\nconsole.log('### printNthLevels');\nprintNthLevels(bst2._root, 1);\nprintNthLevels(bst2._root, 2);\n\n// * 주어진 두 트리가 구조가 같은지 확인\n// * return 문 예상 시나리오\n//   - root1, root2의 value가 같으면 해당 노드의 왼쪽을 recursive 하면서 모두 순회하면서 비교\n//   - 그리고 stack에서 빠져나오면 그 다음 조건인 노드의 오른쪽 조건을 확인한다.\nfunction isSameTree(root1, root2) {\n  if (root1 == null && root2 == null) return true;\n  if (root1 == null || root2 == null) return false;\n  return (\n    root1.value == root2.value &&\n    isSameTree(root1.left) === isSameTree(root2.left) &&\n    isSameTree(root1.right) === isSameTree(root2.right)\n  );\n}\n\n// isSameTree를 재귀 호출하면서 subTree가 root의 하위으 subTree인지 확인한다.\nfunction checkIfSubTree(root, subTree) {\n  var queue = [],\n    counter = 0;\n\n  if (!root) {\n    return;\n  }\n\n  queue.push(root);\n\n  while (queue.length) {\n    let temp = queue.shift();\n\n    if ((temp.data == subTree.data) === isSameTree(temp, subTree)) {\n      return true;\n    }\n\n    if (temp.left) {\n      queue.push(temp.left);\n    }\n    if (temp.right) {\n      queue.push(temp.right);\n    }\n  }\n  return false;\n}\n\nvar node1 = {\n  value: 5,\n  left: {\n    value: 3,\n    left: {\n      value: 1,\n    },\n    right: {\n      value: 2,\n    },\n  },\n  right: {\n    value: 7,\n  },\n};\n\nvar node2 = {\n  value: 3,\n  left: {\n    value: 1,\n  },\n  right: {\n    value: 2,\n  },\n};\n\nvar node3 = {\n  value: 3,\n  left: {\n    value: 1,\n  },\n};\n\n/*\n    node1\n      5\n     / \\\n    3   7\n   / \\   \n  1  2   \n*/\n\n/*\n    node2\n      3\n     / \\\n    1   2\n*/\n\n/*\n    node3\n      3\n     /\n    1   \n*/\n\nconsole.log('### checkIfSubTree 테스트');\nconsole.log(checkIfSubTree(node1, node2)); // true\nconsole.log(checkIfSubTree(node1, node3)); // false\nconsole.log(checkIfSubTree(node2, node3)); // false\n\nfunction isMirrorTrees(tree1, tree2) {\n  if (!tree1 && !tree2) {\n    return true;\n  }\n\n  if (!tree1 || !tree2) {\n    return false;\n  }\n\n  const checkLeftwithRight = isMirrorTrees(tree1.left, tree2.right),\n    checkRightwithLeft = isMirrorTrees(tree2.right, tree1.left);\n\n  return tree1.value == tree2.value && checkLeftwithRight && checkRightwithLeft;\n}\n\nvar node1 = {\n  value: 3,\n  left: {\n    value: 1,\n  },\n  right: {\n    value: 2,\n  },\n};\n\nvar node2 = {\n  value: 3,\n  left: {\n    value: 2,\n  },\n  right: {\n    value: 1,\n  },\n};\n\nvar node3 = {\n  value: 3,\n  left: {\n    value: 1,\n  },\n  right: {\n    value: 2,\n    left: {\n      value: 2.5,\n    },\n  },\n};\n\nconsole.log('### isMirrorTrees 테스트');\nconsole.log(isMirrorTrees(node1, node2)); // true\nconsole.log(isMirrorTrees(node2, node3)); // false\n\n\n//# sourceURL=webpack:///./src/03.Tree.js?");

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