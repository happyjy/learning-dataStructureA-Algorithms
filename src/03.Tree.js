console.log('### Tree');
function TreeNode(value) {
  this.value = value;
  this.chhildren = [];
}

function BinaryTreeNode(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

class BinaryTree {
  constructor() {
    this._root = null;
  }

  traversePreOrder() {
    this.traversePreOrderHelper(this._root);
  }
  traversePreOrderHelper(node) {
    if (!node) return;

    console.log(node.value);
    this.traversePreOrderHelper(node.left);
    this.traversePreOrderHelper(node.right);
  }
  traversePreOrderIterative() {
    //전략
    /*
      * Tree를 순회하면서 Node를 모두 nodeStack배열에 넣는다. 
      1. 항목을 출력한다. 
      2. 오른쪽 자식을 nodeStack에 push
      3. 왼쪽 자식을 nodeStack에 push 
      
      * 오른쪽 자식을 먼저 넣는이유는 ?
       => let node = nodeStack.pop(); 단계에서 나중에 넣은 왼쪽 자식을 먼저 빼내기 때문이다. 
    */
    let nodeStack = [];
    nodeStack.push(this._root);

    while (nodeStack.length) {
      let node = nodeStack.pop();
      console.log(node.value);

      if (node.right) nodeStack.push(node.right);
      if (node.left) nodeStack.push(node.left);
    }
  }

  traverseInOrder() {
    //재귀 호출로 트리 순회
    this.traverseInOrderHelper(this._root);
  }
  traverseInOrderHelper(node) {
    if (!node) return;

    this.traverseInOrderHelper(node.left);
    console.log(node.value);
    this.traverseInOrderHelper(node.right);
  }
  traverseInOrderIterative() {
    let currNode = this._root,
      nodeStack = [],
      done = false;

    while (!done) {
      // 1. root 노드 기준 왼쪽에 있는 노드를 모두 nodeStack에 push
      // 2. nodeStack에 넣은 노드를 빼냄 -> 콘솔찍고 -> 콘솔 찍은 노드의 right노드를 currNode로 정하고
      if (currNode != null) {
        nodeStack.push(currNode);
        currNode = currNode.left;
      } else {
        if (nodeStack.length) {
          currNode = nodeStack.pop();
          console.log(currNode.value);
          currNode = currNode.right; // <- [] 없어도 되는 코드 있것 같은데 확인해보기
        } else {
          done = true;
        }
      }
    }
  }

  traversePostOrder() {
    this.traversePostOrderHelper(this._root);
  }
  traversePostOrderHelper(node) {
    //[] if 조건문 없어도 되지 않나 ? 확인해보기
    // if (node.left) {
    this.traversePostOrderHelper(node.left);
    // }
    // if (node.right) {
    this.traversePostOrderHelper(node.right);
    // }
    console.log(node.value);
  }
  traversePostOrderIterative() {
    let stack1 = [],
      stack2 = [];

    stack1.push(this._root);
    while (stack1.length) {
      let node = stack1.pop();
      stack2.push(node);

      if (node.left) stack1.push(node.left);
      if (node.right) stack1.push(node.right);
    }

    while (stack2.length) {
      const node = stack2.pop();
      console.log(node.value);
    }
  }
}
