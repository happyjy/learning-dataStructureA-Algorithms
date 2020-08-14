console.log('### Heap');

function Heap() {
  this.items = [];
}

Heap.prototype.swap = function (idx1, idx2) {
  [this.items[idx1], this.items[idx2]] = [this.items[idx2], this.items[idx1]];
  // let temp = this.items[idx1];
  // this.items[idx1] = this.items[idx2];
  // this.items[idx2] = temp;
};

Heap.prototype.parentIndex = function (idx) {
  return Math.floor(idx - 1 / 2);
};

Heap.prototype.leftChildIndex = function (idx) {
  return idx * 2 + 1;
};

Heap.prototype.rightChildIndex = function (idx) {
  return idx * 2 + 2;
};

Heap.prototype.parent = function (idx) {
  return this.items[this.parentIndex(idx)];
};

Heap.prototype.leftChild = function (idx) {
  return this.items[this.leftChildIndex(idx)];
};

Heap.prototype.rightChild = function (idx) {
  return this.items[this.rightChildIndex[idx]];
};

Heap.prototype.peek = function (item) {
  return this.item[0];
};

Heap.prototype.size = function () {
  return this.items.length;
};

function MinHeap() {
  this.items = [];
}

MinHeap.prototype = Object.create(Heap.prototype);
MinHeap.prototype.add = function (item) {
  this.items[this.items.length] = item;
  this.bubbleUp();
};

MinHeap.prototype.poll = function () {
  let item = this.items[0];
  this.items[0] = this.items[this.items.length - 1];
  this.items.pop();
  this.bubbleDown();
  return item;
};

// array 추가한 것을 MinHeap으로 받게 정려하는 로직
MinHeap.prototype.bubbleUp = function () {
  let idx = this.items.length - 1;
  while (this.parent(idx) && this.parent(idx) > this.items[idx]) {
    this.swap(this.parentIndex(idx), idx);
    idx = this.parentIndex(idx);
  }
};

MinHeap.prototype.bubbleDown = function () {
  let idx = 0;
  while (
    this.leftChild(idx) &&
    (this.leftChild(idx) < this.items[idx] ||
      this.rightChild(idx) < this.items[idx])
  ) {
    var smallerIndex = this.leftChildIndex(idx);
    if (
      this.rightChild(idx) &&
      this.rightChild(idx) < this.itmes[smallerIndex]
    ) {
      smallerIndex = this.rightChildIndex(idx);
    }
    this.swap(smallerIndex, idx);
    idx = smallerIndex;
  }
};

const mh1 = new MinHeap();
mh1.add(1);
mh1.add(10);
mh1.add(5);
mh1.add(100);
mh1.add(8);

console.log(mh1.poll()); // 1
console.log(mh1.poll()); // 5
console.log(mh1.poll()); // 8
console.log(mh1.poll()); // 10
console.log(mh1.poll()); // 100
