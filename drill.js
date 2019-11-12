class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    if (this.key == null) {
      this.key = key;
      this.value = value;
    }
    else if (key < this.key) {
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this)
      }
      else {
        this.left.insert(key, value)
      }
    }
    else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this)
      }
      else {
        this.right.insert(key, value)
      }
    }
  }

  find(key) {
    if (this.key == key) {
      return this.value;
    }
    else if (key < this.key && this.left) {
      return this.left.find(key)
    }
    else if (key > this.key && this.right) {
      return this.right.find(key)
    }
    else {
      throw new Error('No key found')
    }
  }

  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      else if (this.left) {
        this._replaceWith(this.left);
      }
      else if (this.right) {
        this._replaceWith(this.right)
      }
      else {
        this._replaceWith(null);
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key);
    }
    else if (key > this.key && this.right) {
      this.right.remove(key);
    }
    else {
      throw new Error('Key Error')
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      }
      else if (this == this.parent.right) {
        this.parent.right = node;
      }
      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }
}

// this function sums all values in the tree
function tree(t) {
  // if t is null/undefined, return 0
  if (!t) {
    return 0;
  }
  // otherwise we recursively pull left and right values and add them to t.value
  return tree(t.left) + t.value + tree(t.right)
}

function findDepth(tree, depth = 0) {
  if (!tree) {
    return depth;
  }
  if (tree.left || tree.right) {
    depth++;
  }
  return findDepth(tree.left, depth) > findDepth(tree.right, depth) ? findDepth(tree.left, depth) : findDepth(tree.right, depth)
}


function isBST2(tree, min = Number.MIN_VALUE, max = Number.MAX_VALUE) {
  if (min && tree.key < min) {
    return false;
  }
  if (max && tree.key > max) {
    return false;
  } 
  if (tree.left && !isBST2(tree.left, min, tree.key)) {
    return false;
  }
  if (tree.right && !isBST2(tree.right, tree.key, max)) {
    return false;
  }
  return true;
}



function isBST(tree, bstFlag = true) {
  if (!tree) {
    return bstFlag;
  }
  if (tree.left) {
    if (tree.left.key > tree.key) {
      bstFlag = false;
      return bstFlag;
    } else {
      bstFlag = isBST(tree.left, bstFlag)
    }
  }
  if (tree.right) {
    // if (tree.parent && tree.right.key > tree.parent.key) {

    //   bstFlag = false;
    } else if (tree.right.key < tree.key) {
      bstFlag = false;
      return bstFlag;

    } else {
      bstFlag = isBST(tree.right, bstFlag)
    }
return bstFlag;
}

function findMax(tree) {
  if (!tree.right) {
    return tree;
  }
  return findMax(tree.right);
}

function findThirdLargest(tree) {
  let max = findMax(tree);
  if (max.left) {
    return max.parent
  }
  if (max.parent.left) {
    return max.parent.left
  } else {
    return max.parent.parent
  }
}

function balancedBST(tree, depth = 0) {
  let depthL = findDepth(tree.left)
  let depthR = findDepth(tree.right)

  let result = Math.abs(depthL - depthR);

  return result >= 2;
}

function sameBST(arr1, arr2) {
  if(arr1.length === 0 || arr2.length === 0) {
    return true;
  }

  let higher1 = [];
  let higher2 = [];
  let lower1 = [];
  let lower2 = [];

  for (let i=1; i<arr1.length; i++) {
    if (arr1[i] > arr1[0]) {
      higher1.push(arr1[i])
    } else {
      lower1.push(arr1[i])
    }
  }

  for (let j=1; j<arr2.length; j++) {
    if (arr2[j] > arr2[0]) {
      higher2.push(arr2[j])
    } else {
      lower2.push(arr2[j])
    }
  }

  return sameBST(higher1, higher2) && sameBST(lower1, lower2)
}


function main() {
  let BST = new BinarySearchTree();

  BST.insert(3, 3)
  BST.insert(1, 1)
  BST.insert(4, 4)
  BST.insert(6, 6)
  BST.insert(9, 9)
  BST.insert(2, 2)
  //BST.insert(5, 5)
  BST.insert(7, 7)

  // BST.insert(3, 3)
  // BST.insert(1, 1)
  // BST.insert(4, 4)
  // BST.insert(6, 6)
  // // BST.insert(9, 9)
  // BST.insert(2, 2)
  // BST.insert(5, 5)
  // BST.insert(7, 7)

  //console.log(BST.right.right.key)

  // BST.left.right.key = 10
  //console.log(BST)
  //console.log(BST.right.right.key)

  let eBST = new BinarySearchTree();
  eBST.insert('E')
  eBST.insert('A')
  eBST.insert('S')
  eBST.insert('Y')
  eBST.insert('Q')
  eBST.insert('U')
  eBST.insert('E')
  eBST.insert('S')
  eBST.insert('T')
  eBST.insert('I')
  eBST.insert('O')
  eBST.insert('N')

  let arr1 = [3, 5, 4, 6, 1, 0, 2];
  let arr2 = [3, 1, 5, 2, 4, 6, 0];
  console.log(sameBST(arr1, arr2))

  //console.log(findMax(BST))
  //console.log(findThirdLargest(BST).value)
  // console.log(findDepth(eBST))
  //console.log(balancedBST(BST))
}

main()

                //    3
                // /     \
                // 1      4        1
                //  \        \
                //   2        6     2
                //            \
                //             9   3
                //            /
                //            7    4

/*
  if tree has right
    move to right
      call recursively
      depth++
  if tree has left
    move to left
      call recursively
      depth++

  if (!tree.left && !tree.right) {
    let depth = 1;
    return depth

  }




*/