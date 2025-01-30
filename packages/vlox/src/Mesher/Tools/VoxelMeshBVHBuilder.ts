import { WorldSpaces } from "../../World/WorldSpaces";

/**
 * A class to help with indexing a full flat binary tree defined by the number of levels it has.
 */
class FlatBinaryTreeIndex {
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

export class StructCursor {
  get minX() {
    return this.data[this.trueIndex];
  }
  get minY() {
    return this.data[this.trueIndex + 1];
  }
  get minZ() {
    return this.data[this.trueIndex + 2];
  }
  get maxX() {
    return this.data[this.trueIndex + 4];
  }
  get maxY() {
    return this.data[this.trueIndex + 5];
  }
  get maxZ() {
    return this.data[this.trueIndex + 6];
  }
  get voxelIndex() {
    return this.data[this.trueIndex + 3];
  }
  get active() {
    return this.data[this.trueIndex + 3];
  }
  get nodeType() {
    return this.data[this.trueIndex + 7];
  }

  trueIndex = 0;

  _index = 0;
  get index() {
    return this._index;
  }
  set index(index: number) {
    this._index = index;
    this.trueIndex = index * 8;
  }
  constructor(public data: Float32Array) {}
  setActive() {
    this.data[this.trueIndex + 3] = 1;
  }
  setVoxelIndex(value:number) {
    this.data[this.trueIndex + 3] = value;
  }
  setInnerNode() {
    this.data[this.trueIndex + 7] = 1;
  }
  setGeomtryNode() {
    this.data[this.trueIndex + 7] = 2;
  }
  updateMin(x: number, y: number, z: number) {
    const ix = this.trueIndex;
    const iy = this.trueIndex + 1;
    const iz = this.trueIndex + 2;
    this.data[ix] =
      this.data[ix] == -Infinity || x < this.data[ix] ? x : this.data[ix];
    this.data[iy] =
      this.data[iy] == -Infinity || y < this.data[iy] ? y : this.data[iy];
    this.data[iz] =
      this.data[iz] == -Infinity || z < this.data[iz] ? z : this.data[iz];
  }
  updateMax(x: number, y: number, z: number) {
    const ix = this.trueIndex + 4;
    const iy = this.trueIndex + 5;
    const iz = this.trueIndex + 6;
    this.data[ix] =
      this.data[ix] == -Infinity || x > this.data[ix] ? x : this.data[ix];
    this.data[iy] =
      this.data[iy] == -Infinity || y > this.data[iy] ? y : this.data[iy];
    this.data[iz] =
      this.data[iz] == -Infinity || z > this.data[iz] ? z : this.data[iz];
  }

  toJSON() {
    return {
      min: [this.minX, this.minY, this.minZ],
      max: [this.maxX, this.maxY, this.maxZ],
      active: this.active,
      nodeType: this.nodeType,
    };
  }
}

export class VoxelMeshBVHBuilder {
  static AABBStructByteSize = (4 + 4) * 4;
  treeIndex = new FlatBinaryTreeIndex(13);
  tree = new Float32Array(
    new ArrayBuffer(
      this.treeIndex.getTotalSize() * VoxelMeshBVHBuilder.AABBStructByteSize
    )
  );
  structCursor = new StructCursor(this.tree);
  indices = new Uint32Array(this.treeIndex.getLevelSize(12) * 2);

  reset() {
    this.tree.fill(-Infinity);
    this.indices.fill(0);
  }

  updateVoxel(
    voxelX: number,
    voxelY: number,
    voxelZ: number,
    meshIndex : number,
    indicesStart: number,
    indicesEnd: number,
    minX: number,
    minY: number,
    minZ: number,
    maxX: number,
    maxY: number,
    maxZ: number
  ) {
    const voxelIndex = WorldSpaces.voxel.getIndex(voxelX, voxelY, voxelZ);
    const leafIndex = this.treeIndex.getIndexAtLevel(12, voxelIndex);
    this.indices[voxelIndex * 2] = indicesStart;
    this.indices[voxelIndex * 2 + 1] = indicesEnd;
    this.structCursor.index = leafIndex;
    this.structCursor.updateMin(minX, minY, minZ);
    this.structCursor.updateMax(maxX, maxY, maxZ);
    this.structCursor.setVoxelIndex(voxelIndex);
    this.structCursor.setGeomtryNode();
    let current = leafIndex;
    for (let level = 1; level < 13; level++) {
      let parentNode = this.treeIndex.getParent(current);
      this.structCursor.index = parentNode;
      this.structCursor.updateMin(minX, minY, minZ);
      this.structCursor.updateMax(maxX, maxY, maxZ);
      this.structCursor.setActive();
      this.structCursor.setInnerNode();
      current = parentNode;
    }
  }
}
/*  
console.warn(
  [voxelX, voxelY, voxelZ],
  "add gometry",
     [minX, minY, minZ],
  [maxX, maxY, maxZ],
  [voxelX, voxelY, voxelZ],
  [indicesStart, indicesEnd],
  indicesEnd - indicesStart,
  (indicesEnd - indicesStart) / 3 
);
*/
