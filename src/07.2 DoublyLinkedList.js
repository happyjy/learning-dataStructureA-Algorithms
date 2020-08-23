console.log('### DoublyLinkedList');

/*
  # 7. 연결리스트
  ## 7.2 이중 연결 리스트
    * 7.2.0 연결 리스트 Empty 체크 - isEmpty

    * 7.2.1 원하는 위치항목 삽입하기 - insert
    * 7.2.2 헤드에 항목 삽입하기 - insertAtHead
    * 7.2.3 테일에 항목 삽입하기 - insertAtTail
     
    * 7.2.4 원하는 위치항목 삭제하기(recursive - node value 기준) - delete
      - Node 값 기준으로 삭제
      - recursiveDelFromHead, recursiveDelFromTail 호출로 Head, Tail 제거 
    * 7.2.4.1 헤드의 항목 삭제하기 - recursiveDelFromHead
    * 7.2.4.2 테일의 항목 삭제하기 - recursiveDelFromTail
     
    * 7.2.5 원하는 위치항목 삭제하기(iterator - node position 기준) - deleteAt
      - Node 위치 기준으로 삭제
      - deleteAtHead, deleteAtTail 호출
    * 7.2.5.1 헤드의 항목 삭제하기 - deleteAtHead
    * 7.2.5.2 테일의 항목 삭제하기 - deleteAtTail
    
    * 7.2.6 원하는 value 찾기 (head로 부터) - findStartingHead
    * 7.2.7 원하는 value 찾기 (tail로 부터) - findStartingTail
    
    * 7.2.8 첫 노드 head 부터 노트 프린트 - printFromHead
    * 7.2.9 마지막 노드 tail 부터 노드 프린트 - printFromTail
    * 7.2.10 Head, Tail Node 같은지 확인 - isSameHeadTailStatus
    
 */

class DoublyLinkedListNode {
	constructor(data) {
		this.data = data;
		this.next = null;
		this.prev = null;
	}
}

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
		if (position >= 0 && position <= this.size) {
			let newNode = new DoublyLinkedListNode(value),
				currNode = this.head,
				prevNode,
				nextNode, // 명시적인 이해를 위해서 추가
				index = 0;
			/*
         아래 3가지 조건일때 추가한는 로직이 다름
          1. head에 추가
            1.1 size가 0인 경우
            1.2 size가 0이 아닌 경우
          2. tail에 추가
          3. !(head || tail): value를 Node를 순회한다.
      */
			if (position === 0) {
				//1. head
				this.insertAtHead(value);
			} else if (position === this.size) {
				//2. tail
				this.insertAtTail(value);
			} else {
				//3. !(head || tail): value를 Node를 순회한다.
				//position 바로 직전까지 순회하면서 prevNode, nextNode 이동
				while (index++ < position) {
					prevNode = currNode;
					currNode = currNode.next;
				}
				nextNode = currNode;

				newNode.next = nextNode;
				prevNode.next = newNode;
				nextNode.prev = newNode;
				newNode.prev = prevNode;
			}
			this.size++;

			return true;
		} else {
			// else statement of 범위체크 if statement
			return false;
		}
	}

	insertAtHead(value) {
		if (this.head === null) {
			this.head = new DoublyLinkedListNode(value);
			this.tail = this.head; // [A] ref.
		} else {
			const newNode = new DoublyLinkedListNode(value);
			newNode.next = this.head;
			this.head.prev = newNode;
			// 0. this.head, this.tail을 callbyreference로 연결 되어 있다.
			// 1. this.head.prev는 this.Tail의 prev프로퍼티 제일 마지막 위치다. 그래서 this.head.prev는 this.Tail의 제일 끝 노드의 prev다.
			// 2. 1 -> 2 -> 3 이있을때 Tail의 prev 속성으로 프린트 하면 다음과 같다. 3 -> 2 -> 1
			// this.head는 1이다. 여기에 this.head.prev에 값을 연결하면 1다음에 연결되는 것이다.
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
			this.tail.next = newNode; // === this.tail.prev = newNode; (callbyreference 때문) <-[A] ref.
			this.tail = newNode;
		}
		this.size++;
	}

	// Node 값 기준으로 삭제
	// DoublyLinkedList constructor에 head, tail이 있기 때문에 두개 메소드 호출로 각각 data를 삭제해준다.
	delete(value) {
		this.recursiveDelFromHead(this.head, value);
		this.recursiveDelFromTail(this.tail, value);
	}

	recursiveDelFromHead(node, value) {
		let currNode = node;

		if (currNode.data === value) {
			if (!currNode.prev) {
				this.head = currNode.next;
				this.head.prev = null;
				return currNode.value;
			} else if (!currNode.next) {
				let returnValue = currNode.value;
				currNode = null;
				return returnValue;
			} else {
				currNode.prev.next = currNode.next;
				currNode.next.prev = currNode.prev;
			}
			this.size--;
			return currNode.data;
		}

		if (currNode.next === null) return null;
		if (currNode.next) this.recursiveDelFromHead(currNode.next, value);
	}

	recursiveDelFromTail(node, value) {
		let currNode = node;

		if (currNode.data === value) {
			if (!currNode.prev) {
				this.tail = currNode.prev;
				this.tail.prev = null;
				return currNode.value;
			} else if (!currNode.next) {
				let returnValue = currNode.value;
				currNode = null;
				return returnValue;
			} else {
				currNode.prev.next = currNode.next;
				currNode.next.prev = currNode.prev;
			}
			this.size--;
			return currNode.data;
		}

		if (currNode.prev === null) return null;
		if (currNode.prev) this.recursiveDelFromTail(currNode.prev, value);
	}

	// Node 위치 기준으로 삭제
	deleteAt(position) {
		if (position > -1 && position <= this.size) {
			let currNode = this.head,
				prevNode,
				index = 0;

			if (position === 0) {
				this.deleteAtHead();
			} else if (position === this.size) {
				this.deleteAtTail();
			} else {
				while (index++ < position) {
					prevNode = currNode;
					currNode = currNode.next;
				}

				prevNode.next = currNode.next;
				currNode.next.prev = prevNode;
				this.size--;
			}
			return currNode.value;
		} else {
			return null;
		}
	}

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
			if (this.tail === this.head) {
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

	findStartingTail(value) {
		let currentHead = this.tail;
		while (currentHead.prev) {
			if (currentHead.data == value) {
				return true;
			}
			currentHead = currentHead.prev;
		}
		return false;
	}

	printFromHead() {
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
			const arg = [ ...arguments ].shift();
			let msg = '';
			if (typeof arg === 'string') {
				msg = arg;
				console.log(`### PRINT from Head - ${msg}: `, printArr.join(' -> '));
				console.log(`--------------------------------------------------------`);
				console.log('');
				return;
			}
		}
		console.log(`### PRINT from Head: `, printArr.join(' -> '));
		console.log(`--------------------------------------------------------`);
		console.log('');
	}

	printFromTail(msg) {
		console.log(`--------------------------------------------------------`);
		let printArr = [];
		let currNode = this.tail;

		if (currNode != null) {
			while (currNode.prev != null) {
				printArr.push(currNode.data);
				currNode = currNode.prev;
			}
			if (currNode.prev == null) {
				printArr.push(currNode.data);
			}
		} else {
			printArr.push('empty');
		}

		if (arguments.length >= 1) {
			const arg = [ ...arguments ].shift();
			let msg = '';
			if (typeof arg === 'string') {
				msg = arg;
				console.log(`### PRINT from Tail - ${msg}: `, printArr.join(' -> '));
				console.log(`--------------------------------------------------------`);
				console.log('');
				return;
			}
		}
		console.log(`### PRINT from Tail: `, printArr.join(' -> '));
		console.log(`--------------------------------------------------------`);
		console.log('');
	}

	isSameHeadTailStatus() {
		let headStack = [];
		let tailStack = [];
		let currHeadNode = this.head;
		let currTailNode = this.tail;

		if (currHeadNode != null) {
			while (currHeadNode.next) {
				headStack.push(currHeadNode.data);
				currHeadNode = currHeadNode.next;
			}
			if (currHeadNode.next == null) {
				headStack.push(currHeadNode.data);
			}
		}

		if (currTailNode != null) {
			while (currTailNode.prev) {
				tailStack.push(currTailNode.data);
				currTailNode = currTailNode.prev;
			}
			if (currTailNode.prev == null) {
				tailStack.push(currTailNode.data);
			}
		}

		return JSON.stringify(headStack) == JSON.stringify(tailStack.reverse());
	}
}

var dll1 = new DoublyLinkedList();
dll1.insertAtHead(1); // `1
dll1.insertAtHead(2); // `2 -> 1
dll1.insertAtHead(3); // `3 -> 2 -> 1
dll1.insertAtTail(10); // 3 -> 2 -> 1 -> `10
dll1.insertAtTail(20); // 3 -> 2 -> 1 -> 10 -> `20
dll1.insert(0, 100); // `100 -> 3 -> 2 -> 1 -> 10 -> 20
dll1.insert(4, 200); // 100 -> 3 -> 2 -> 1 -> `200 -> 10 -> 20
dll1.insert(10, 300); // 삽입 안됨.
dll1.printFromHead('dll1 Test'); // 100 -> 3 -> 2 -> 1 -> 200 -> 10 -> 20
dll1.printFromTail('dll1 Test');
console.log(dll1.isSameHeadTailStatus());
debugger;

dll1.deleteAt(0); // 3 -> 2 -> 1 -> 200 -> 10 -> 20
dll1.deleteAt(2); // 3 -> 2 -> 200 -> 10 -> 20
dll1.deleteAt(dll1.size); // 3 -> 2 -> 200 -> 10
dll1.printFromHead('dll1 Test2'); // 3 -> 2 -> 200 -> 10
dll1.printFromTail('dll1 Test2');
console.log(dll1.isSameHeadTailStatus());
debugger;

dll1.deleteAtHead(); // 2 -> 200 -> 10
dll1.deleteAtTail(); // 2 -> 200
dll1.printFromHead('dll1 Test3');
dll1.printFromTail('dll1 Test3');
console.log(dll1.isSameHeadTailStatus());
debugger;

dll1.insertAtHead(1); //
dll1.insertAtHead(2); //
dll1.insertAtHead(3); //
dll1.insertAtTail(10); //
dll1.insertAtTail(20); //
dll1.insertAtTail(30); //
dll1.printFromHead('dll1 Test4');
dll1.printFromTail('dll1 Test4');
console.log(dll1.isSameHeadTailStatus());
debugger;

dll1.delete(1);
dll1.delete(2);
dll1.delete(3);
dll1.delete(30);
dll1.delete(20);
dll1.delete(2220);
dll1.printFromHead('dll1 Test5');
dll1.printFromTail('dll1 Test5');
console.log(dll1.isSameHeadTailStatus());
debugger;

dll1.findStartingHead(10);
dll1.findStartingTail(200);

debugger;
