import { Vec3Array } from "@amodx/math";
import { WorldSpaces } from "../../World/WorldSpaces";
import { VoxelMeshBVHStructCursor } from "./VoxelMeshBVHStructCursor";
import { FlatBinaryTreeIndex } from "../../Util/FlatBinaryTreeIndex";
const MAX_FLOAT32 = new Float32Array([Infinity])[0];

export class VoxelMeshBVHBuilder {
  static AABBStructByteSize = (4 + 4) * 4;
  treeIndex = new FlatBinaryTreeIndex(13);
  tree = new Float32Array(
    new ArrayBuffer(
      this.treeIndex.getTotalSize() * VoxelMeshBVHBuilder.AABBStructByteSize
    )
  );
  structCursor = new VoxelMeshBVHStructCursor(this.tree);
  indices = new Uint32Array(this.treeIndex.getLevelSize(12) * 2);

  reset() {
    this.tree.fill(-MAX_FLOAT32);
    this.indices.fill(0);
  }
  getMeshBounds(): { min: Vec3Array; max: Vec3Array } {
    const leafIndex = this.treeIndex.getIndexAtLevel(0, 0);
    return {
      min: [
        this.tree[leafIndex],
        this.tree[leafIndex + 1],
        this.tree[leafIndex + 2],
      ],
      max: [
        this.tree[leafIndex + 4],
        this.tree[leafIndex + 5],
        this.tree[leafIndex + 6],
      ],
    };
  }

  updateVoxel(
    voxelX: number,
    voxelY: number,
    voxelZ: number,
    meshIndex: number,
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
    this.structCursor.setIndex(leafIndex);
    this.structCursor.updateMin(minX, minY, minZ);
    this.structCursor.updateMax(maxX, maxY, maxZ);
    this.structCursor.setVoxelIndex(voxelIndex);
    this.structCursor.setGeomtryNode();
    let current = leafIndex;
    for (let level = 1; level < 13; level++) {
      let parentNode = this.treeIndex.getParent(current);
      this.structCursor.setIndex(parentNode);
      this.structCursor.updateMin(minX, minY, minZ);
      this.structCursor.updateMax(maxX, maxY, maxZ);
      this.structCursor.setActive();
      this.structCursor.setInnerNode();
      current = parentNode;
    }
  }
}
