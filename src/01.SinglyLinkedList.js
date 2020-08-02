// console.log("### dataStructure.js ");

// export default function () {
//   console.log("dataSTructure - export");
// }
console.log('### SinglyLinkedList');

function SinglyLinkedListNode(data) {
  this.data = data;
  this.next = null;
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  isEmpty() {
    return this.size == 0;
  }

  insert(value) {
    // Linked List head 유무에 따라서 insert 로직이 달라진다.
    // debugger;
    if (this.head === null) {
      this.head = new SinglyLinkedListNode(value);
    } else {
      //기존에 있던 head를 추가할 Node next로 옮긴다.
      //추가할 Node -> 기존 head
      const temp = this.head;
      this.head = new SinglyLinkedListNode(value);
      this.head.next = temp;
    }
    this.size++;
  }

  remove(value) {
    //지우려고 하는 value가 아래와 같이 세가지 경우로 나뉠 수 있다.
    //1. head
    //2. !(head || tail): value를 Node를 순회한다.
    //3. tail
    let currentHead = this.head;
    if (currentHead.data == value) {
      // 1. head
      this.head = currentHead.next;
      this.size--;
    } else {
      let prev = currentHead;
      while (currentHead.next) {
        // 2. !(head || tail)
        if (currentHead.data == value) {
          //삭제 대상 Node: "currentHead"
          debugger;
          prev.next = currentHead.next;
          // prev = currentHead; //[&&&]이 코드는 필요 없어 보임...
          currentHead = currentHead.next; //[&&&]아래 두 code는 break 되고 3.tail 조건에 만족하기 때문에 필요한 코드
          break;
        }
        //Node 이동
        prev = currentHead;
        currentHead = currentHead.next;
      }
      // 3. tail
      if (currentHead.data == value) {
        prev.next = null;
      }

      this.size--;
    }
  }

  deleteAtHead() {
    let headData = null;

    if (this.head !== null) {
      headData = this.head.data;
      this.head = this.head.next;
      this.size--;
    }

    return headData;
  }

  print() {
    let printArr = [];
    let currentHead = this.head;

    while (currentHead.next != null) {
      printArr.push(currentHead.data);
      currentHead = currentHead.next;
    }
    if (currentHead.next == null) {
      printArr.push(currentHead.data);
    }

    if (arguments.length >= 1) {
      const arg = [...arguments].shift();
      let msg = '';
      if (typeof arg === 'string') {
        msg = arg;
        console.log(`### PRINT - ${msg}: `, printArr.join(' -> '));
        return;
      }
    }
    console.log(`### PRINT: `, printArr.join(' -> '));
  }

  getPrototypeList() {
    return Object.getOwnPropertyNames(SinglyLinkedList.prototype);
  }
}

const sll = new SinglyLinkedList();
sll.insert(10); //Linked List Node Status: 10 -> null
sll.insert(20); //Linked List Node Status: 20 -> 10 -> null
sll.insert(30); //Linked List Node Status: 30 -> 20 -> 10 -> null
sll.print('end of sll');

// debugger;
const sll1 = new SinglyLinkedList();
sll1.insert(10); //Linked List Node Status: 10 -> null
sll1.insert(20); //Linked List Node Status: 20 -> 10 -> null
sll1.insert(30); //Linked List Node Status: 30 -> 20 -> 10 -> null
sll1.insert(31); //Linked List Node Status: 31 -> 30 -> 20 -> 10 -> null
sll1.insert(32); //Linked List Node Status: 32 -> 31 -> 30 -> 20 -> 10 -> null
sll1.insert(40); //Linked List Node Status: 40 -> 32 -> 31 -> 30 -> 20 -> 10 -> null
sll1.print('end of insert sll1');

sll1.remove(32); //Linked List Node Status: 40 -> 31 -> 30 -> 20 -> 10 -> null
sll1.remove(31); //Linked List Node Status: 40 -> 30 -> 20 -> 10 -> null
sll1.remove(30); //Linked List Node Status: 40 -> 20 -> 10 -> null
sll1.print('end of remove sll1');
// debugger;

var sll2 = new SinglyLinkedList();
sll2.insert(1); // Linked List Node Status:  1 -> null
sll2.insert(12); // Linked List Node Status: 12 -> 1 -> null
sll2.insert(20); // Linked List Node Status: 20 -> 12 -> 1 -> null
sll2.deleteAtHead(); // Linked List Node Status:  12 -> 1 -> null
sll2.print('end of sll2');

sll2.getPrototypeList();
// debugger;
