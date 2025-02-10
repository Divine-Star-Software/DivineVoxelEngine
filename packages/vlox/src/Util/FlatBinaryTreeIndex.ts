/**
 * A class to help with indexing a full flat binary tree defined by the number of levels it has.
 */
export class FlatBinaryTreeIndex {
  constructor(public levels: number) {}

  /** Gets the number of nodes at a level of the tree */
  getLevelSize(level: number): number {
    if (level < 0 || level >= this.levels) {
      throw new Error("Invalid level");
    }
    return 1 << level; // Equivalent to 2^level
  }

  /**
   * Gets the flat index of a node indexed by the level it's on and its relative index in that level.
   */
  getIndexAtLevel(level: number, node: number): number {
    if (level < 0 || level >= this.levels) {
      throw new Error("Invalid level");
    }
    const levelSize = this.getLevelSize(level);
    if (node < 0 || node >= levelSize) {
      throw new Error("Invalid node index at the given level");
    }
    return (1 << level) - 1 + node;
  }

  /**
   * Gets the level and relative index of a node's flat index.
   */
  getLevelAndIndex(index: number): [level: number, relativeIndex: number] {
    const totalNodes = (1 << this.levels) - 1;
    if (index < 0 || index >= totalNodes) {
      throw new Error("Invalid node index");
    }
    const level = Math.floor(Math.log2(index + 1));
    const firstIndexAtLevel = (1 << level) - 1;
    const relativeIndex = index - firstIndexAtLevel;
    return [level, relativeIndex];
  }

  /**
   * Gets the flat left child of a node, where the node is indexed by its level and its relative index at that level.
   * @returns -1 if no child exist
   */
  getLeftChildAtLevel(level: number, node: number): number {
    if (level + 1 >= this.levels) {
      return -1;
    }
    const nodeIndex = this.getIndexAtLevel(level, node);
    return this.getLeftChild(nodeIndex);
  }

  /**
   * Gets the flat right child of a node, where the node is indexed by its level and its relative index at that level.
   * @returns -1 if no child exist
   */
  getRightChildAtLevel(level: number, node: number): number {
    if (level + 1 >= this.levels) {
      return -1;
    }
    const nodeIndex = this.getIndexAtLevel(level, node);
    return this.getRightChild(nodeIndex);
  }

  /**
   * Gets the flat index of the parent of a node, where the node is indexed by its level and its relative index at that level.
   * @returns -1 if level has no parent
   */
  getParentAtLevel(level: number, node: number): number {
    if (level === 0) {
      return -1;
    }
    const nodeIndex = this.getIndexAtLevel(level, node);
    return this.getParent(nodeIndex);
  }

  /** Gets the flat index of the left child of the node.
   * @returns -1 if no child exist
   */
  getLeftChild(node: number): number {
    const leftChildIndex = 2 * node + 1;
    const totalNodes = (1 << this.levels) - 1;
    return leftChildIndex < totalNodes ? leftChildIndex : -1;
  }

  /** Gets the flat index of the right child of the node.
   * @returns -1 if no child exist
   */
  getRightChild(node: number): number {
    const rightChildIndex = 2 * node + 2;
    const totalNodes = (1 << this.levels) - 1;
    return rightChildIndex < totalNodes ? rightChildIndex : -1;
  }

  /** Gets the flat index of the parent of the node.
   * @returns -1 if no parent exist
   */
  getParent(node: number): number {
    if (node === 0) {
      return -1; // Root node has no parent
    }
    return Math.floor((node - 1) / 2);
  }
  /** Gets the total number of nodes in the tree */
  getTotalSize(): number {
    return (1 << this.levels) - 1; // Equivalent to 2^levels - 1
  }
}