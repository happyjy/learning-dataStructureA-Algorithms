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

// 이진트리
// root보다 작으면 왼쪽, 크면 오른쪽 노드에 위치 한다.
class BinarySearchTree extends BinaryTree {
  constructor() {
    super();
    this._root = null;
  }

  insert(value) {
    let thisNode = {
      left: null,
      right: null,
      value: value,
    };
    if (!this._root) {
      this._root = thisNode;
    } else {
      let currentRoot = this._root;
      while (true) {
        if (currentRoot.value > value) {
          if (currentRoot.left != null) {
            currentRoot = currentRoot.left;
          } else {
            currentRoot.left = thisNode;
            break;
          }
        } else if (currentRoot.value < value) {
          if (currentRoot.right != null) {
            currentRoot = currentRoot.right;
          } else {
            currentRoot.right = thisNode;
            break;
          }
        } else {
          break;
        }
      }
    }
  }

  // 시간 복잡도(균형트리) O(log2(n))
  // 시간 복잡도(불균형 트리) O(n)
  remove(value) {
    return deleteRecursively(this._root, value);

    function deleteRecursively(root, value) {
      if (!root) {
        return null;
      } else if (value < root.value) {
        root.left = deleteRecursively(root.left, value);
      } else if (value > root.value) {
        root.right = deleteRecursively(root.right, value);
      } else {
        //value를 찾은 경우
        //no child
        if (!root.left && !root.right) {
          //case1
          return null;
        } else if (!root.left) {
          //case2
          root = root.right;
          return root;
        } else if (!root.right) {
          //case2
          root = root.left;
          return root;
        } else {
          //case3
          //  - 자식 노드 두개 있는 경우 왼쪽 하위 트리의 최대치, 또는 오른쪽 하위 트리의 최소치를 찾아서 해당 노드 대체
          let tempNode = this.findMin(root.right);
          root.value = tempNode.value;
          root.right = deleteRecursively(root.right, tempNode.value);
          return root;
        }
      }
    }
  }

  findMin(root) {
    while (root.left) {
      root = root.left;
    }
    return root;
  }

  findNode(value) {
    let currentRoot = this._root,
      found = false;
    while (currentRoot) {
      if (currentRoot.value > value) {
        currentRoot = currentRoot.left;
      } else if (currentRoot.value < value) {
        currentRoot = currentRoot.right;
      } else {
        //노드 찾음
        found = true;
        break;
      }
    }
    return found;
  }
}

const bst1 = new BinarySearchTree();

console.log('### insert');
console.log(bst1.insert(2));
console.log(bst1.insert(1));
console.log(bst1.insert(4));
console.log(bst1.insert(3));
console.log(bst1.insert(5));

/*
      2
     / \
    1   4
       / \
      3   5
*/

console.log('### findeNode');
console.log(bst1.findNode(3)); // true
console.log(bst1.findNode(5)); // true
console.log(bst1.findNode(10)); // false

// 두개 노드의 같은 root node 찾기
function findLowestCommonAncestor(root, value1, value2) {
  function findLowestCommonAncestorHelper(root, value1, value2) {
    if (!root) return;
    //[point] 조건문
    if (Math.max(value1, value2) < root.value)
      return findLowestCommonAncestorHelper(root.left, value1, value2);
    //[point] 조건문
    if (Math.min(value1, value2) > root.value)
      return findLowestCommonAncestorHelper(root.right, value1, value2);
    return root.value;
  }
  return findLowestCommonAncestorHelper(root, value1, value2);
}

// debugger;
console.log('### findLowestCommonAncestor');
console.log(findLowestCommonAncestor(bst1._root, 1, 4));
console.log(findLowestCommonAncestor(bst1._root, 3, 5));
console.log(findLowestCommonAncestor(bst1._root, 2, 3));
console.log(findLowestCommonAncestor(bst1._root, 4, 5));

//N level 노드 구하기
function printNthLevels(root, n = 0) {
  let arrayNth = [];
  queue = [];

  if (!root) return;

  queue.push([root, 0]);
  while (queue.length) {
    let tuple = queue.shift(),
      temp = tuple[0],
      height = tuple[1];

    if (height == n) {
      arrayNth.push([temp.left, ++height]);
    }
    if (temp.left) queue.push([temp.left, height + 1]);
    if (temp.right) queue.push([temp.right, height + 1]);
  }
  console.log(`${n} 번째 level node list`);
  console.log(arrayNth);
}
const bst2 = new BinarySearchTree();
bst2.insert(5);
bst2.insert(3);
bst2.insert(7);
bst2.insert(2);
bst2.insert(4);
bst2.insert(6);
bst2.insert(8);

/*
      5
     / \
    3   7
  / \  / \
 2  4 6  8
*/
// debugger;
console.log('### printNthLevels');
printNthLevels(bst2._root, 1);
printNthLevels(bst2._root, 2);

// * 주어진 두 트리가 구조가 같은지 확인
// * return 문 예상 시나리오
//   - root1, root2의 value가 같으면 해당 노드의 왼쪽을 recursive 하면서 모두 순회하면서 비교
//   - 그리고 stack에서 빠져나오면 그 다음 조건인 노드의 오른쪽 조건을 확인한다.
function isSameTree(root1, root2) {
  if (root1 == null && root2 == null) return true;
  if (root1 == null || root2 == null) return false;
  return (
    root1.value == root2.value &&
    isSameTree(root1.left) === isSameTree(root2.left) &&
    isSameTree(root1.right) === isSameTree(root2.right)
  );
}

// isSameTree를 재귀 호출하면서 subTree가 root의 하위으 subTree인지 확인한다.
function checkIfSubTree(root, subTree) {
  var queue = [],
    counter = 0;

  if (!root) {
    return;
  }

  queue.push(root);

  while (queue.length) {
    let temp = queue.shift();

    if ((temp.data == subTree.data) === isSameTree(temp, subTree)) {
      return true;
    }

    if (temp.left) {
      queue.push(temp.left);
    }
    if (temp.right) {
      queue.push(temp.right);
    }
  }
  return false;
}

var node1 = {
  value: 5,
  left: {
    value: 3,
    left: {
      value: 1,
    },
    right: {
      value: 2,
    },
  },
  right: {
    value: 7,
  },
};

var node2 = {
  value: 3,
  left: {
    value: 1,
  },
  right: {
    value: 2,
  },
};

var node3 = {
  value: 3,
  left: {
    value: 1,
  },
};

/*
    node1
      5
     / \
    3   7
   / \   
  1  2   
*/

/*
    node2
      3
     / \
    1   2
*/

/*
    node3
      3
     /
    1   
*/

console.log('### checkIfSubTree 테스트');
console.log(checkIfSubTree(node1, node2)); // true
console.log(checkIfSubTree(node1, node3)); // false
console.log(checkIfSubTree(node2, node3)); // false

function isMirrorTrees(tree1, tree2) {
  if (!tree1 && !tree2) {
    return true;
  }

  if (!tree1 || !tree2) {
    return false;
  }

  const checkLeftwithRight = isMirrorTrees(tree1.left, tree2.right),
    checkRightwithLeft = isMirrorTrees(tree2.right, tree1.left);

  return tree1.value == tree2.value && checkLeftwithRight && checkRightwithLeft;
}

var node1 = {
  value: 3,
  left: {
    value: 1,
  },
  right: {
    value: 2,
  },
};

var node2 = {
  value: 3,
  left: {
    value: 2,
  },
  right: {
    value: 1,
  },
};

var node3 = {
  value: 3,
  left: {
    value: 1,
  },
  right: {
    value: 2,
    left: {
      value: 2.5,
    },
  },
};

console.log('### isMirrorTrees 테스트');
console.log(isMirrorTrees(node1, node2)); // true
console.log(isMirrorTrees(node2, node3)); // false
