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

/***/ "./src/10. Heap.js":
/*!*************************!*\
  !*** ./src/10. Heap.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("console.log('### Heap');\n\n/*\n  * 트리같은 구조지만 배열로 구조로 되어 있다.\n\n  # 아래 네개의 기능이 구현 되어 있다. (MedianHeap 제외)\n    # 1. Heap\n    # 2. MinHeap\n      : Root가 자식보다 작다.\n    # 3. MaxHeap\n      : Root가 자식보다 크다.\n    # 4. 힙정렬\n      * 오름차순: MinHeap으로 add한 data를 poll 했을 떄  \n      * 내림차순: MaxHeap으로 add한 data를 poll 했을 떄  \n  \n  # 연습문제\n    * 연습문제 1.일련의 숫자에서 중간 값찾기\n      * MedianHeap\n    * 연습문제 2.배열에서 K번째로 가장 작은 값 찾기 \n    * 연습문제 3.배열에서 K번째로 가장 큰 값 찾기\n\n */\n\n// # 1. Heap\nfunction Heap() {\n\tthis.items = [];\n}\n\nHeap.prototype.swap = function(idx1, idx2) {\n\t[ this.items[idx1], this.items[idx2] ] = [ this.items[idx2], this.items[idx1] ];\n\t// let temp = this.items[idx1];\n\t// this.items[idx1] = this.items[idx2];\n\t// this.items[idx2] = temp;\n};\n\nHeap.prototype.parentIndex = function(idx) {\n\treturn Math.floor((idx - 1) / 2); // ###\n};\n\nHeap.prototype.leftChildIndex = function(idx) {\n\treturn idx * 2 + 1;\n};\n\nHeap.prototype.rightChildIndex = function(idx) {\n\treturn idx * 2 + 2;\n};\n\nHeap.prototype.parent = function(idx) {\n\treturn this.items[this.parentIndex(idx)];\n};\n\nHeap.prototype.leftChild = function(idx) {\n\treturn this.items[this.leftChildIndex(idx)];\n};\n\nHeap.prototype.rightChild = function(idx) {\n\treturn this.items[this.rightChildIndex(idx)];\n};\n\nHeap.prototype.peek = function(item) {\n\treturn this.items[0];\n};\n\nHeap.prototype.size = function() {\n\treturn this.items.length;\n};\n\n// # 2. MinHeap\nfunction MinHeap() {\n\tthis.items = [];\n}\n\nMinHeap.prototype = Object.create(Heap.prototype);\nMinHeap.prototype.add = function(item) {\n\t// this.items[this.items.length] = item;\n\tthis.items.push(item);\n\tthis.bubbleUp();\n\treturn this.items.length;\n};\n\nMinHeap.prototype.poll = function() {\n\tlet item = this.items[0];\n\tthis.items[0] = this.items.pop();\n\tthis.bubbleDown();\n\treturn item;\n};\n\n// add에서 array에 마지막에 요소를 추가한 후 트리 상단으로 올라가면서 재정렬\n//  : root가 자식것 보다 더 크면 bubbleUp 진행\nMinHeap.prototype.bubbleUp = function() {\n\tlet idx = this.items.length - 1;\n\twhile (this.parent(idx) && this.parent(idx) > this.items[idx]) {\n\t\tthis.swap(this.parentIndex(idx), idx);\n\t\tidx = this.parentIndex(idx);\n\t}\n};\n\n// poll에서 array 첫번째 요소를 제거 후 아래로 내려가면서 정렬\n//  : root가 자식것 보다 더 크면 bubbleDown 진행\n//  : root node의 왼, 오른쪽 노드중 더 작은 수를 root와 swap\nMinHeap.prototype.bubbleDown = function() {\n\tlet idx = 0;\n\twhile (this.leftChild(idx) && (this.leftChild(idx) < this.items[idx] || this.rightChild(idx) < this.items[idx])) {\n\t\tvar smallerIndex = this.leftChildIndex(idx);\n\t\tif (this.rightChild(idx) && this.rightChild(idx) < this.items[smallerIndex]) {\n\t\t\tsmallerIndex = this.rightChildIndex(idx);\n\t\t}\n\t\tthis.swap(smallerIndex, idx);\n\t\tidx = smallerIndex;\n\t}\n};\n\n// debugger;\nconsole.log('### MinHeap - add, poll');\nconst mh1 = new MinHeap();\nmh1.add(1); // add -> [1] -> bubbleUp -> [1]\nmh1.add(10); // add -> [1, 10] -> bubbleUp -> [1, 10]\nmh1.add(5); // add -> [1, 10,  5] -> bubbleUp -> [1, 5, 10]\nmh1.add(100); // add -> [1, 10, 5, 100] -> bubbleUp -> [1, 10, 100, 5]\nmh1.add(8); // add -> [1, 10, 5, 100, 8] -> bubbleUp -> [1, 8, 5, 100, 10]\n\nconsole.log(mh1.poll()); // 1, [1, 8, 5, 100, 10] -> poll -> [10, 8, 5, 100] -> bubbleDown -> [5, 8, 10, 100]\nconsole.log(mh1.poll()); // 5, [5, 8, 10, 100] -> poll -> [100, 8, 10] -> bubbleDown -> [8, 100, 10]\nconsole.log(mh1.poll()); // 8, [8, 100, 10] -> poll -> [10, 100] -> bubbleDown -> [10, 100]\nconsole.log(mh1.poll()); // 10, [10, 100] -> poll -> [100] -> bubbleDown -> [100]\nconsole.log(mh1.poll()); // 100, [100] -> poll -> [] -> bubbleDown -> []\n\n// # 3. MaxHeap\nfunction MaxHeap() {\n\tthis.items = [];\n}\n\nMaxHeap.prototype = Object.create(Heap.prototype);\nMaxHeap.prototype.add = function(item) {\n\tthis.items.push(item);\n\tthis.bubbleUp();\n\treturn this.items.length;\n};\nMaxHeap.prototype.poll = function() {\n\tconst item = this.items[0];\n\tthis.items[0] = this.items.pop();\n\tthis.bubbleDown();\n\treturn item;\n};\n\nMaxHeap.prototype.bubbleUp = function() {\n\tlet index = this.items.length - 1;\n\twhile (this.parent(index) && this.parent(index) < this.items[index]) {\n\t\tthis.swap(this.parentIndex(index), index);\n\t\tindex = this.parentIndex(index);\n\t}\n};\n\nMaxHeap.prototype.bubbleDown = function() {\n\tlet index = 0;\n\twhile (\n\t\tthis.leftChild(index) &&\n\t\t(this.leftChild(index) > this.items[index] || this.rightChild(index) > this.items[index])\n\t) {\n\t\tlet biggerIndex = this.leftChildIndex(index);\n\t\tif (this.rightChild(index) && this.rightChild(index) > this.items[biggerIndex]) {\n\t\t\tbiggerIndex = this.rightChildIndex(index);\n\t\t}\n\t\tthis.swap(biggerIndex, index);\n\t\tindex = biggerIndex;\n\t}\n};\n\nconsole.log('### MaxHeap - add, poll');\nvar mh2 = new MaxHeap();\nmh2.add(1);\nmh2.add(10);\nmh2.add(5);\nmh2.add(100);\nmh2.add(8);\n// mh2 -> [100,10,5,1,8]\n\nconsole.log(mh2.poll()); // 100\nconsole.log(mh2.poll()); // 10\nconsole.log(mh2.poll()); // 8\nconsole.log(mh2.poll()); // 5\nconsole.log(mh2.poll()); // 1\n\n//# 4. 힙정렬\n/**\n * # 정렬된 배열(Heap class add function으로 추가된 배열)을 \n *  pop()으로 호출하면서 꺼낸 객체를 저장하기만 하면 된다.\n * \n * # 시간 복잡도 \n *  * 힙정렬의 시간 복잡도는 O(nlog2(n))이다.(빠른정렬, 병합정렬 과 같다.)\n *    : 삼투가 O(log2(n))의 시간이 걸리고 정렬이 n개의 항목을 꺼내야 하기 때문에 \n */\n\n//오름차순 정렬\nconsole.log('오름차순 정렬');\nvar minHeapExample = new MinHeap();\nminHeapExample.add(12);\nminHeapExample.add(2);\nminHeapExample.add(23);\nminHeapExample.add(4);\nminHeapExample.add(13);\nminHeapExample.items; // [2, 4, 23, 12, 13]\n\nconsole.log(minHeapExample.poll()); // 2\nconsole.log(minHeapExample.poll()); // 4\nconsole.log(minHeapExample.poll()); // 12\nconsole.log(minHeapExample.poll()); // 13\nconsole.log(minHeapExample.poll()); // 23\n\n//내림차순 정렬\nconsole.log('내림차순 정렬');\nvar maxHeapExample = new MaxHeap();\nmaxHeapExample.add(12);\nmaxHeapExample.add(2);\nmaxHeapExample.add(23);\nmaxHeapExample.add(4);\nmaxHeapExample.add(13);\nmaxHeapExample.items; // [23, 13, 12, 2, 4]\n\nconsole.log(maxHeapExample.poll()); // 23\nconsole.log(maxHeapExample.poll()); // 13\nconsole.log(maxHeapExample.poll()); // 12\nconsole.log(maxHeapExample.poll()); // 2\nconsole.log(maxHeapExample.poll()); // 4\n\n// 연습문제 1.일련의 숫자에서 중간 값찾기\nfunction MedianHeap() {\n\tthis.minHeap = new MinHeap();\n\tthis.maxHeap = new MaxHeap();\n}\n\nMedianHeap.prototype.push = function(value) {\n\tif (value > this.median()) {\n\t\tthis.minHeap.add(value);\n\t} else {\n\t\tthis.maxHeap.add(value);\n\t}\n\n\t// Re balancing\n\tif (this.minHeap.size() - this.maxHeap.size() > 1) {\n\t\tthis.maxHeap.add(this.minHeap.poll());\n\t}\n\n\tif (this.maxHeap.size() - this.minHeap.size() > 1) {\n\t\tthis.minHeap.add(this.maxHeap.poll());\n\t}\n};\nMedianHeap.prototype.median = function() {\n\tif (this.minHeap.size() == 0 && this.maxHeap.size() == 0) {\n\t\treturn Number.NEGATIVE_INFINITY;\n\t} else if (this.minHeap.size() == this.maxHeap.size()) {\n\t\treturn (this.minHeap.peek() + this.maxHeap.peek()) / 2;\n\t} else if (this.minHeap.size() > this.maxHeap.size()) {\n\t\treturn this.minHeap.peek();\n\t} else {\n\t\treturn this.maxHeap.peek();\n\t}\n};\ndebugger;\nconsole.log('연습문제 1.일련의 숫자에서 중간 값찾기');\nvar medianH = new MedianHeap();\n\nmedianH.push(12);\nconsole.log(medianH.median()); // 12\nmedianH.push(2);\nconsole.log(medianH.median()); // 7 ( because 12 + 2 = 14; 14/2 = 7)\nmedianH.push(23);\nconsole.log(medianH.median()); // 12\nmedianH.push(13);\nconsole.log(medianH.median()); // 12.5\n\n// 연습문제 2.배열에서 K번째로 가장 작은 값 찾기\nconst array1 = [ 12, 3, 13, 4, 2, 40, 23 ];\nfunction getKthSmallestElement(array, k) {\n\tvar minH = new MinHeap();\n\tarray.forEach((el) => {\n\t\tminH.add(el);\n\t});\n\t//### 중요: 1부터 시작\n\tfor (var i = 1; i < k; i++) {\n\t\tminH.poll();\n\t}\n\treturn minH.poll();\n}\ndebugger;\nconsole.log('연습문제 2.배열에서 K번째로 가장 작은 값 찾기');\n//minH.items => \"3,4,13,12,23,40\"\nconsole.log(getKthSmallestElement(array1, 2)); // 3\nconsole.log(getKthSmallestElement(array1, 1)); // 2\nconsole.log(getKthSmallestElement(array1, 7)); // 40\n\n// 연습문제 3.배열에서 K번째로 가장 큰 값 찾기\nconst array2 = [ 12, 3, 13, 4, 2, 40, 23 ];\nfunction getKthBiggestElement(array, k) {\n\tlet maxH = new MaxHeap();\n\tarray.forEach((el) => {\n\t\tmaxH.add(el);\n\t});\n\n\tfor (let i = 1; i < k; i++) {\n\t\tmaxH.poll();\n\t}\n\treturn maxH.poll();\n}\ndebugger;\nconsole.log('연습문제 3.배열에서 K번째로 가장 큰 값 찾기');\n//minH.items => \"40,4,23,3,2,12,13\"\n//bubble down을 하기 때문에 위 items에서 순서를 카운트해서 답을 찾으려면 맞지 않는다.\n//3.MaxHeap의 poll 과정 적어 놓은것 확인해보자\nconsole.log(getKthBiggestElement(array2, 2)); // 23\nconsole.log(getKthBiggestElement(array2, 1)); // 40\nconsole.log(getKthBiggestElement(array2, 7)); // 2\n\n\n//# sourceURL=webpack:///./src/10._Heap.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _10_Heap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./10. Heap */ \"./src/10. Heap.js\");\n/* harmony import */ var _10_Heap__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_10_Heap__WEBPACK_IMPORTED_MODULE_0__);\n// import SinglyLinkedList from './07.1 SinglyLinkedList';\n// import DoublyLinkedList from './07.2 DoublyLinkedList';\n// import Tree from './09. Tree';\n\n// import Graph from './11. Graph';\n// import DP from './06.Dp';\n// import LL from './LL';\n\n// console.log('### app.js1');\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ })

/******/ });