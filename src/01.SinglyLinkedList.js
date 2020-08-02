// console.log("### dataStructure.js ");

// export default function () {
//   console.log("dataSTructure - export");
// }
console.log('### SinglyLinkedList');

function SinglyLinkedListNode(data) {
  this.data = data;
  this.next = null;
}

/**
 * insert
 * insertAtHead
 * insertAtTail
 * remove
 * removeAt
 * removeAtHead
 * removeAtTail
 * print
 * getPrototypeList
 */

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  isEmpty() {
    return this.size == 0;
  }

  //원하는 위치에 insert
  insert(position, value) {
    if (position >= 0 && position <= this.size) {
      let newNode = new SinglyLinkedListNode(value),
        currNode = this.head,
        prevNode,
        nextNode, // 명시적인 이해를 위해서 추가
        index = 0;

      if (position === 0) {
        newNode.next = currNode;
        this.head = newNode;
      } else {
        while (index++ < position) {
          prevNode = currNode;
          currNode = currNode.next;
        }
        nextNode = currNode;

        newNode.next = nextNode;
        prevNode.next = newNode;
      }
      this.size++;
      return true;
    } else {
      return false;
    }
  }

  insertAtHead(value) {
    // Linked List head 유무에 따라서 insertAtHead 로직이 달라진다.
    const newNode = new SinglyLinkedListNode(value);

    if (this.head === null) {
      this.head = newNode;
    } else {
      //기존에 있던 head를 추가할 Node next로 옮긴다.
      //추가할 Node -> 기존 head
      const temp = this.head;
      this.head = newNode;
      this.head.next = temp;
    }

    this.size++;
  }

  insertAtTail(value) {
    const newNode = new SinglyLinkedListNode(value);
    let currNode;

    if (this.head === null) {
      this.head = newNode;
    } else {
      currNode = this.head;
      //tail까지 이동
      while (currNode.next) {
        currNode = currNode.next;
      }
      currNode.next = newNode;
    }
    this.size++;
  }

  //Node 값 기준으로 삭제
  remove(value) {
    //지우려고 하는 value가 아래와 같이 세가지 경우로 나뉠 수 있다.
    //1. head
    //2. !(head || tail): value를 Node를 순회한다.
    //3. tail
    let currNode = this.head;
    if (currNode.data == value) {
      // 1. head
      this.head = currNode.next;
      this.size--;
    } else {
      let prevNode = currNode;
      while (currNode.next) {
        // 2. !(head || tail)
        if (currNode.data == value) {
          //삭제 대상 Node: "currNode"
          prevNode.next = currNode.next;
          // prevNode = currNode; //[&&&]이 코드는 필요 없어 보임...
          currNode = currNode.next; //[&&&]아래 두 code는 break 되고 3.tail 조건에 만족하기 때문에 필요한 코드
          break;
        }
        //Node 이동
        prevNode = currNode;
        currNode = currNode.next;
      }
      // 3. tail
      if (currNode.data == value) {
        prevNode.next = null;
      }

      this.size--;
    }
  }

  //Node 위치 기준으로 삭제
  removeAt(position) {
    if (position > -1 && position < this.size) {
      let currNode = this.head,
        prevNode,
        index = 0;

      if (position === 0) {
        this.head = currNode.next;
      } else {
        while (index++ < position) {
          prevNode = currNode;
          currNode = currNode.next;
        }

        // 현재 노드의 다음과 이전 것을 연결(삭제)
        prevNode.next = currNode.next;
      }
      this.size--;
      return currNode.data;
    } else {
      return null;
    }
  }

  removeAtHead() {
    let headData = null;

    if (this.head !== null) {
      headData = this.head.data;
      this.head = this.head.next;
      this.size--;
    }

    return headData;
  }

  removeAtTail() {
    let headData = null;
    if (this.head !== null) {
      let currNode = this.head,
        prevNode = this.head;
      //tail까지 이동
      if (!currNode.next) {
        while (currNode.next) {
          prevNode = currNode;
          currNode = currNode.next;
        }
        //제일 마지막 노드의 이전 노드에서 마지막노드를 끊음
        prevNode.next = currNode.next;
      } else {
        //노드가 하나 밖에 없을때
        this.head = null;
      }
      headData = currNode.data;
    }
    this.size--;
    return headData;
  }

  print() {
    console.log(`--------------------------------------------------------`);
    let printArr = [];
    let currNode = this.head;

    if (currNode != null) {
      while (currNode.next != null) {
        printArr.push(currNode.data);
        currNode = currNode.next;
      }
      if (currNode.next == null) {
        printArr.push(currNode.data);
      }
    } else {
      printArr.push('empty');
    }

    if (arguments.length >= 1) {
      const arg = [...arguments].shift();
      let msg = '';
      if (typeof arg === 'string') {
        msg = arg;
        console.log(`### PRINT - ${msg}: `, printArr.join(' -> '));
        console.log(`--------------------------------------------------------`);
        console.log('');
        return;
      }
    }
    console.log(`### PRINT: `, printArr.join(' -> '));
    console.log(`--------------------------------------------------------`);
    console.log('');
  }

  getPrototypeList() {
    return Object.getOwnPropertyNames(SinglyLinkedList.prototype);
  }
}

debugger;

const sll = new SinglyLinkedList();
sll.insertAtHead(10); //Linked List Node Status: 10 -> null
sll.insertAtHead(20); //Linked List Node Status: 20 -> 10 -> null
sll.insertAtHead(30); //Linked List Node Status: 30 -> 20 -> 10 -> null
sll.print('end of sll');

const sll1 = new SinglyLinkedList();
sll1.insertAtHead(10); //Linked List Node Status: 10 -> null
sll1.insertAtHead(20); //Linked List Node Status: 20 -> 10 -> null
sll1.insertAtHead(30); //Linked List Node Status: 30 -> 20 -> 10 -> null
sll1.insertAtHead(31); //Linked List Node Status: 31 -> 30 -> 20 -> 10 -> null
sll1.insertAtHead(32); //Linked List Node Status: 32 -> 31 -> 30 -> 20 -> 10 -> null
sll1.insertAtHead(40); //Linked List Node Status: 40 -> 32 -> 31 -> 30 -> 20 -> 10 -> null
sll1.print('end of insertAtHead sll1');

sll1.remove(32); //Linked List Node Status: 40 -> 31 -> 30 -> 20 -> 10 -> null
sll1.remove(31); //Linked List Node Status: 40 -> 30 -> 20 -> 10 -> null
sll1.remove(30); //Linked List Node Status: 40 -> 20 -> 10 -> null
sll1.print('end of remove sll1 - remove');

sll1.removeAtTail();
sll1.removeAtTail();
sll1.removeAtTail();
sll1.print('end of remove sll1 - removeAtTail');

``;
var sll2 = new SinglyLinkedList();
sll2.insertAtHead(1); // Linked List Node Status:  1 -> null
sll2.insertAtHead(12); // Linked List Node Status: 12 -> 1 -> null
sll2.insertAtHead(20); // Linked List Node Status: 20 -> 12 -> 1 -> null
sll2.removeAtHead(); // Linked List Node Status:  12 -> 1 -> null
sll2.print('end of sll2');

sll2.removeAt(0);
sll2.print('sll2 - removeAt');
sll2.removeAt(0);
sll2.print('sll2 - removeAt');
sll2.removeAt(0);
sll2.print('sll2 - removeAt');

var sll3 = new SinglyLinkedList();
sll3.insertAtTail(10);
sll3.insertAtTail(20);
sll3.insertAtTail(30);
sll3.print('sll3 - insertAtTail');
sll3.insertAtHead(100);
sll3.insertAtHead(200);
sll3.insertAtHead(300);
sll3.print('sll3 - insertAtHead');

sll3.getPrototypeList();
