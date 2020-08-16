console.log('### Heap');

/**
 * 아래 세개의 기능이 구현 되어 있다. (MedianHeap 제외)
 * [o] # 1.Heap
 * [o] # 2.MinHeap
 * [o] # 3.MaxHeap
 * [o] # 4.힙정렬
 * 
 * # 연습 문제
 *  * 1.일련의 숫자에서 중간 값찾기
 *  * 2.배열에서 K번째로 가장 작은 값 찾기 
 *  * 3.배열에서 K번째로 가장 큰 값 찾기
 * 
 */

// # 1.Heap
function Heap() {
	this.items = [];
}

Heap.prototype.swap = function(idx1, idx2) {
	[ this.items[idx1], this.items[idx2] ] = [ this.items[idx2], this.items[idx1] ];
	// let temp = this.items[idx1];
	// this.items[idx1] = this.items[idx2];
	// this.items[idx2] = temp;
};

Heap.prototype.parentIndex = function(idx) {
	return Math.floor((idx - 1) / 2); // ###
};

Heap.prototype.leftChildIndex = function(idx) {
	return idx * 2 + 1;
};

Heap.prototype.rightChildIndex = function(idx) {
	return idx * 2 + 2;
};

Heap.prototype.parent = function(idx) {
	return this.items[this.parentIndex(idx)];
};

Heap.prototype.leftChild = function(idx) {
	return this.items[this.leftChildIndex(idx)];
};

Heap.prototype.rightChild = function(idx) {
	return this.items[this.rightChildIndex(idx)];
};

Heap.prototype.peek = function(item) {
	return this.items[0];
};

Heap.prototype.size = function() {
	return this.items.length;
};

// # 2.MinHeap
function MinHeap() {
	this.items = [];
}

MinHeap.prototype = Object.create(Heap.prototype);
MinHeap.prototype.add = function(item) {
	// this.items[this.items.length] = item;
	this.items.push(item);
	this.bubbleUp();
	return this.items.length;
};

MinHeap.prototype.poll = function() {
	let item = this.items[0];
	this.items[0] = this.items.pop();
	this.bubbleDown();
	return item;
};

// add에서 array에 마지막에 요소를 추가한 후 트리 상단으로 올라가면서 재정렬
//  : root가 자식것 보다 더 크면 bubbleUp 진행
MinHeap.prototype.bubbleUp = function() {
	let idx = this.items.length - 1;
	while (this.parent(idx) && this.parent(idx) > this.items[idx]) {
		this.swap(this.parentIndex(idx), idx);
		idx = this.parentIndex(idx);
	}
};

// poll에서 array 첫번째 요소를 제거 후 아래로 내려가면서 정렬
//  : root가 자식것 보다 더 크면 bubbleDown 진행
//  : root node의 왼, 오른쪽 노드중 더 작은 수를 root와 swap
MinHeap.prototype.bubbleDown = function() {
	let idx = 0;
	while (this.leftChild(idx) && (this.leftChild(idx) < this.items[idx] || this.rightChild(idx) < this.items[idx])) {
		var smallerIndex = this.leftChildIndex(idx);
		if (this.rightChild(idx) && this.rightChild(idx) < this.items[smallerIndex]) {
			smallerIndex = this.rightChildIndex(idx);
		}
		this.swap(smallerIndex, idx);
		idx = smallerIndex;
	}
};

// debugger;
console.log('### MinHeap - add, poll');
const mh1 = new MinHeap();
mh1.add(1); // add -> [1] -> bubbleUp -> [1]
mh1.add(10); // add -> [1, 10] -> bubbleUp -> [1, 10]
mh1.add(5); // add -> [1, 10,  5] -> bubbleUp -> [1, 5, 10]
mh1.add(100); // add -> [1, 10, 5, 100] -> bubbleUp -> [1, 10, 100, 5]
mh1.add(8); // add -> [1, 10, 5, 100, 8] -> bubbleUp -> [1, 8, 5, 100, 10]

console.log(mh1.poll()); // 1, [1, 8, 5, 100, 10] -> poll -> [10, 8, 5, 100] -> bubbleDown -> [5, 8, 10, 100]
console.log(mh1.poll()); // 5, [5, 8, 10, 100] -> poll -> [100, 8, 10] -> bubbleDown -> [8, 100, 10]
console.log(mh1.poll()); // 8, [8, 100, 10] -> poll -> [10, 100] -> bubbleDown -> [10, 100]
console.log(mh1.poll()); // 10, [10, 100] -> poll -> [100] -> bubbleDown -> [100]
console.log(mh1.poll()); // 100, [100] -> poll -> [] -> bubbleDown -> []

// # 3.MaxHeap
function MaxHeap() {
	this.items = [];
}

MaxHeap.prototype = Object.create(Heap.prototype);
MaxHeap.prototype.add = function(item) {
	this.items.push(item);
	this.bubbleUp();
	return this.items.length;
};
MaxHeap.prototype.poll = function() {
	const item = this.items[0];
	this.items[0] = this.items.pop();
	this.bubbleDown();
	return item;
};

MaxHeap.prototype.bubbleUp = function() {
	let index = this.items.length - 1;
	while (this.parent(index) && this.parent(index) < this.items[index]) {
		this.swap(this.parentIndex(index), index);
		index = this.parentIndex(index);
	}
};

MaxHeap.prototype.bubbleDown = function() {
	let index = 0;
	while (
		this.leftChild(index) &&
		(this.leftChild(index) > this.items[index] || this.rightChild(index) > this.items[index])
	) {
		let biggerIndex = this.leftChildIndex(index);
		if (this.rightChild(index) && this.rightChild(index) > this.items[biggerIndex]) {
			biggerIndex = this.rightChildIndex(index);
		}
		this.swap(biggerIndex, index);
		index = biggerIndex;
	}
};

console.log('### MaxHeap - add, poll');
var mh2 = new MaxHeap();
mh2.add(1);
mh2.add(10);
mh2.add(5);
mh2.add(100);
mh2.add(8);
// mh2 -> [100,10,5,1,8]

console.log(mh2.poll()); // 100
console.log(mh2.poll()); // 10
console.log(mh2.poll()); // 8
console.log(mh2.poll()); // 5
console.log(mh2.poll()); // 1

//# 4.힙정렬
/**
 * # 정렬된 배열(Heap class add function으로 추가된 배열)을 
 *  pop()으로 호출하면서 꺼낸 객체를 저장하기만 하면 된다.
 * 
 * # 시간 복잡도 
 *  * 힙정렬의 시간 복잡도는 O(nlog2(n))이다.(빠른정렬, 병합정렬 과 같다.)
 *    : 삼투가 O(log2(n))의 시간이 걸리고 정렬이 n개의 항목을 꺼내야 하기 때문에 
 */

//오름차순 정렬
console.log('오름차순 정렬');
var minHeapExample = new MinHeap();
minHeapExample.add(12);
minHeapExample.add(2);
minHeapExample.add(23);
minHeapExample.add(4);
minHeapExample.add(13);
minHeapExample.items; // [2, 4, 23, 12, 13]

console.log(minHeapExample.poll()); // 2
console.log(minHeapExample.poll()); // 4
console.log(minHeapExample.poll()); // 12
console.log(minHeapExample.poll()); // 13
console.log(minHeapExample.poll()); // 23

//내림차순 정렬
console.log('내림차순 정렬');
var maxHeapExample = new MaxHeap();
maxHeapExample.add(12);
maxHeapExample.add(2);
maxHeapExample.add(23);
maxHeapExample.add(4);
maxHeapExample.add(13);
maxHeapExample.items; // [23, 13, 12, 2, 4]

console.log(maxHeapExample.poll()); // 23
console.log(maxHeapExample.poll()); // 13
console.log(maxHeapExample.poll()); // 12
console.log(maxHeapExample.poll()); // 2
console.log(maxHeapExample.poll()); // 4

// 연습문제 1.일련의 숫자에서 중간 값찾기
function MedianHeap() {
	this.minHeap = new MinHeap();
	this.maxHeap = new MaxHeap();
}

MedianHeap.prototype.push = function(value) {
	if (value > this.median()) {
		this.minHeap.add(value);
	} else {
		this.maxHeap.add(value);
	}

	// Re balancing
	if (this.minHeap.size() - this.maxHeap.size() > 1) {
		this.maxHeap.add(this.minHeap.poll());
	}

	if (this.maxHeap.size() - this.minHeap.size() > 1) {
		this.minHeap.add(this.maxHeap.poll());
	}
};
MedianHeap.prototype.median = function() {
	if (this.minHeap.size() == 0 && this.maxHeap.size() == 0) {
		return Number.NEGATIVE_INFINITY;
	} else if (this.minHeap.size() == this.maxHeap.size()) {
		return (this.minHeap.peek() + this.maxHeap.peek()) / 2;
	} else if (this.minHeap.size() > this.maxHeap.size()) {
		return this.minHeap.peek();
	} else {
		return this.maxHeap.peek();
	}
};
debugger;
console.log('연습문제 1.일련의 숫자에서 중간 값찾기');
var medianH = new MedianHeap();

medianH.push(12);
console.log(medianH.median()); // 12
medianH.push(2);
console.log(medianH.median()); // 7 ( because 12 + 2 = 14; 14/2 = 7)
medianH.push(23);
console.log(medianH.median()); // 12
medianH.push(13);
console.log(medianH.median()); // 12.5

// 연습문제 2.배열에서 K번째로 가장 작은 값 찾기
const array1 = [ 12, 3, 13, 4, 2, 40, 23 ];
function getKthSmallestElement(array, k) {
	var minH = new MinHeap();
	array.forEach((el) => {
		minH.add(el);
	});
	//### 중요: 1부터 시작
	for (var i = 1; i < k; i++) {
		minH.poll();
	}
	return minH.poll();
}
debugger;
console.log('연습문제 2.배열에서 K번째로 가장 작은 값 찾기');
//minH.items => "3,4,13,12,23,40"
console.log(getKthSmallestElement(array1, 2)); // 3
console.log(getKthSmallestElement(array1, 1)); // 2
console.log(getKthSmallestElement(array1, 7)); // 40

// 연습문제 3.배열에서 K번째로 가장 큰 값 찾기
const array2 = [ 12, 3, 13, 4, 2, 40, 23 ];
function getKthBiggestElement(array, k) {
	let maxH = new MaxHeap();
	array.forEach((el) => {
		maxH.add(el);
	});

	for (let i = 1; i < k; i++) {
		maxH.poll();
	}
	return maxH.poll();
}
debugger;
console.log('연습문제 3.배열에서 K번째로 가장 큰 값 찾기');
//minH.items => "40,4,23,3,2,12,13"
//bubble down을 하기 때문에 위 items에서 순서를 카운트해서 답을 찾으려면 맞지 않는다.
//3.MaxHeap의 poll 과정 적어 놓은것 확인해보자
console.log(getKthBiggestElement(array2, 2)); // 23
console.log(getKthBiggestElement(array2, 1)); // 40
console.log(getKthBiggestElement(array2, 7)); // 2
