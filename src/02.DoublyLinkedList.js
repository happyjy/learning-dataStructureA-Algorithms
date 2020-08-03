console.log('### DoublyLinkedList');

class DoublyLinkedListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

/**
 * isEmpty
 * insert
 * insertAtHead
 * insertAtTail
 * deleteAtHead
 * deleteAtTail
 * findStartingHead
 * findStartingTail
 */
class DoublyLinkedList {
  constructor(data) {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  isEmpty() {
    return this.size === 0;
  }

  insert(position, value) {
    //범위외의 값 체크
    if (position >= 0 && position <= size) {
      let node = new DoublyLinkedListNode(value),
        currNode = this.head,
        prevNode,
        nextNode, // 명시적인 이해를 위해서 추가
        index = 0;
      /*
         아래 3가지 조건일때 추가한느 로직이 다름
          1. head
            1.1 size가 0인 경우
            1.2 size가 0이 아닌 경우
          2. tail
          3. !(head || tail): value를 Node를 순회한다.
      */
      if (position === 0) {
        //1. head
        if (!this.head) {
          //1.1 size가 0인 경우
          this.head = node;
          this.tail = node;
        } else {
          //1.2 size가 0이 아닌 경우
          node.next = currNode;
          currNode.prev = node;
          this.head = node;
        }
      } else if (position === size) {
        //2. tail
        tail.next = node;
        node.prev = tail;
        tail = node;
      } else {
        //3. !(head || tail): value를 Node를 순회한다.
        //position 바로 직전까지 순회하면서 prevNode, nextNode 이동
        while (index++ < position) {
          prevNode = currNode;
          currNode = currNode.next;
        }
        nextNode = currNode;

        node.next = nextNode;
        prevNode.next = node;
        nextNode.prev = node;
        node.prev = prevNode;
      }
      length++;

      return true;
    } else {
      // else statement of 범위체크 if statement
      return false;
    }
  }

  insertAtHead(value) {
    if (this.head === null) {
      this.head = new DoublyLinkedListNode(value);
      this.tail = this.head;
    } else {
      const newNode = new DoublyLinkedListNode(value);
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.size++;
  }

  insertAtTail(value) {
    if (this.tail === null) {
      this.tail = new DoublyLinkedListNode(value);
      this.head = this.tail;
    } else {
      const newNode = new DoublyLinkedListNode(value);
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  // Node 값 기준으로 삭제
  delete() {}

  // Node 위치 기준으로 삭제
  deleteAt(position) {}

  deleteAtHead() {
    let toReturn = null;

    if (this.head !== null) {
      toReturn = this.head.data;

      if (this.tail === this.head) {
        //node가 하나 밖에 없는 경우
        this.head = null;
        this.tail = null;
      } else {
        this.head = this.head.next;
        this.head.prev = null;
      }
    }
    this.size--;
    return toReturn;
  }

  deleteAtTail() {
    let toReturn = null;
    if (this.tail !== null) {
      toReturn = this.tail.data;
      if (this.tila === this.head) {
        this.head = null;
        this.tail = null;
      } else {
        this.tail = this.tail.prev;
        this.tail.next = null;
      }
    }
    this.size--;
    return toReturn;
  }

  findStartingHead(value) {
    let currentHead = this.head;
    while (currentHead.next != null) {
      if (currentHead.data == value) {
        return true;
      }
      currentHead = currentHead.next;
    }
    return false;
  }

  findStartingTail() {
    let currentHead = this.tail;
    while (currentHead.prev) {
      if (currentHead.data == value) {
        return true;
      }
      currentHead = currentHead.prev;
    }
    return false;
  }
}

var dll1 = new DoublyLinkedList();
dll1.insertAtHead(10); // ddl1's structure: tail: 10  head: 10
dll1.insertAtHead(12); // ddl1's structure: tail: 10  head: 12
dll1.insertAtHead(20); // ddl1's structure: tail: 10  head: 20

var dll2 = new DoublyLinkedList();
dll2.insertAtHead(10); // ddl1's structure: tail: 10  head: 10
dll2.insertAtHead(12); // ddl1's structure: tail: 10  head: 12
dll2.insertAtHead(20); // ddl1's structure: tail: 10  head: 20
dll2.insertAtTail(30); // ddl1's structure: tail: 30  head: 20
