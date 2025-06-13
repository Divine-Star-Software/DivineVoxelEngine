import type { Scene } from "@babylonjs/core/scene";
import type { InstancedMesh } from "@babylonjs/core/Meshes/instancedMesh";
import { CreateBox } from "@babylonjs/core/Meshes/Builders/boxBuilder";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { VoxelMeshBVHStructCursor } from "@divinevoxel/vlox/Mesher/Geomtry/VoxelMeshBVHStructCursor";
import { VoxelMeshBVHBuilder } from "@divinevoxel/vlox/Mesher/Geomtry/VoxelMeshBVHBuilder";
import { Vector2, Vector3, Vector4 } from "@babylonjs/core/Maths/";
import { Mesh } from "@babylonjs/core/Meshes/mesh.js";

import { VoxelMeshVertexStructCursor } from "@divinevoxel/vlox/Mesher/Geomtry/VoxelMeshVertexStructCursor";

const vertexCursor = new VoxelMeshVertexStructCursor();
const v1Position = new Vector3();
const v2Position = new Vector3();
const v3Position = new Vector3();
const v1Normal = new Vector3();
const v2Normal = new Vector3();
const v3Normal = new Vector3();
class VoxelGeometryIntersectResult {
  constructor(
    public hit: boolean,
    public normal: Vector3,
    public position: Vector3,
    public uv: Vector2,
    public triangleId: number
  ) {}
}

class VoxelMeshIntersectResult {
  constructor(
    public found: boolean,
    public foundObject: number,
    public t: number,
    public error: boolean,
    public triangle: VoxelGeometryIntersectResult
  ) {}
}

class TriangleIntersectResult {
  constructor(
    public u: number,
    public v: number,
    public t: number
  ) {}
}

function BVH_TriangleIntersect(
  v0: Vector3,
  v1: Vector3,
  v2: Vector3,
  rayOrigin: Vector3,
  rayDirection: Vector3
): TriangleIntersectResult {
  const edge1 = v1.subtract(v0);
  const edge2 = v2.subtract(v0);
  const pvec = Vector3.Cross(rayDirection, edge2);
  const det = Vector3.Dot(edge1, pvec);
  const invDet = 1.0 / det;
  const tvec = rayOrigin.subtract(v0);
  const u = Vector3.Dot(tvec, pvec) * invDet;
  const qvec = Vector3.Cross(tvec, edge1);
  const v = Vector3.Dot(rayDirection, qvec) * invDet;
  const t = Vector3.Dot(edge2, qvec) * invDet;
  if (det < 0.0 || t <= 0.0 || u < 0.0 || u > 1.0 || v < 0.0 || u + v > 1.0) {
    return new TriangleIntersectResult(u, v, Infinity);
  }
  return new TriangleIntersectResult(u, v, t);
}

const indexOffets = new Vector4(0, 0, 0, 0);

function VoxelGeometryIntersect(
  ro: Vector3,
  rd: Vector3,
  nodeId: number,
  voxel_indice: Uint32Array,
  vertices: Float32Array,
  indices: Uint32Array
): VoxelGeometryIntersectResult {
  vertexCursor.data = vertices;
  let intersectResult = new VoxelGeometryIntersectResult(
    false,
    new Vector3(0, 0, 0),
    new Vector3(0, 0, 0),
    new Vector2(0, 0),
    0
  );

  let finalTriResult = new TriangleIntersectResult(0, 0, 0);
  let triId = 0;
  let t = Infinity;

  let voxelIndiceOffset = indexOffets.w;
  // let voxelIndiceOffset = 4096u * 2u * voxelMeshIndex;
  let indiceOffsets = new Vector2(
    voxel_indice[voxelIndiceOffset + nodeId * 2],
    voxel_indice[voxelIndiceOffset + nodeId * 2 + 1]
  );

  let length = indiceOffsets.y - indiceOffsets.x;
  if (length <= 0) {
    return intersectResult;
  }

  console.warn("checking triangles");
  let vertexOffset = indexOffets.x;
  let indiceOffset = indexOffets.y + indiceOffsets.x;

  let finalIndex = 0;
  for (let indiceIndex = 0; indiceIndex < length; indiceIndex += 3) {
    console.log(
      indices[indiceOffset + indiceIndex],
      indices[indiceOffset + indiceIndex + 1],
      indices[indiceOffset + indiceIndex + 2]
    );
    let v1 = vertexOffset + indices[indiceOffset + indiceIndex];
    vertexCursor.index = v1;
    v1Position.set(
      vertexCursor.positionX,
      vertexCursor.positionY,
      vertexCursor.positionZ
    );
    let v2 = vertexOffset + indices[indiceOffset + indiceIndex + 1];
    vertexCursor.index = v2;
    v2Position.set(
      vertexCursor.positionX,
      vertexCursor.positionY,
      vertexCursor.positionZ
    );
    let v3 = vertexOffset + indices[indiceOffset + indiceIndex + 2];
    vertexCursor.index = v3;
    v3Position.set(
      vertexCursor.positionX,
      vertexCursor.positionY,
      vertexCursor.positionZ
    );

    let triResult = BVH_TriangleIntersect(
      v2Position,
      v1Position,
      v3Position,
      ro,
      rd
    );
    console.log(
      v1Position.toString(),
      v2Position.toString(),
      v3Position.toString(),
      triResult
    );
    if (triResult.t < t) {
      intersectResult.hit = true;
      t = triResult.t;
      finalTriResult = triResult;
      triId = indiceIndex / 3;
      finalIndex = indiceOffset + indiceIndex;
    }
  }

  if (intersectResult.hit) {
    let v1 = vertices[vertexOffset + indices[finalIndex]];
    vertexCursor.index = v1;
    v1Normal.set(
      vertexCursor.normalX,
      vertexCursor.normalY,
      vertexCursor.normalZ
    );
    let v2 = vertices[vertexOffset + indices[finalIndex]];
    vertexCursor.index = v2;
    v2Normal.set(
      vertexCursor.normalX,
      vertexCursor.normalY,
      vertexCursor.normalZ
    );
    let v3 = vertices[vertexOffset + indices[finalIndex]];
    vertexCursor.index = v3;
    v3Normal.set(
      vertexCursor.normalX,
      vertexCursor.normalY,
      vertexCursor.normalZ
    );
    intersectResult.normal = new Vector3().copyFrom(v1Normal);

    intersectResult.uv.x = finalTriResult.u;
    intersectResult.uv.y = finalTriResult.v;
    intersectResult.position = ro.add(rd.scale(finalTriResult.t));
  }

  return intersectResult;
}

/**
 * Computes the intersection of a ray with an axis-aligned bounding box (AABB).
 * @param minCorner - The minimum corner (vertex) of the bounding box.
 * @param maxCorner - The maximum corner (vertex) of the bounding box.
 * @param rayOrigin - The origin point of the ray.
 * @param invDir - The inverse of the ray direction (1.0 / rayDirection).
 * @returns The distance along the ray to the intersection point, or Infinity if there's no intersection.
 */
function BoundingBoxIntersect(
  minCorner: Vector3,
  maxCorner: Vector3,
  rayOrigin: Vector3,
  invDir: Vector3
): number {
  // Compute the intersections of the ray with the bounding box planes
  const near = minCorner.subtract(rayOrigin).multiply(invDir);
  const far = maxCorner.subtract(rayOrigin).multiply(invDir);

  // Compute the minimum and maximum distances along the ray
  const tmin = Vector3.Minimize(near, far);
  const tmax = Vector3.Maximize(near, far);

  // Find the largest tmin and the smallest tmax
  const t0 = Math.max(Math.max(tmin.x, tmin.y), tmin.z);
  const t1 = Math.min(Math.min(tmax.x, tmax.y), tmax.z);

  // If the ray misses the box, return Infinity
  if (Math.max(t0, 0.0) > t1) {
    return Infinity;
  }

  // Return the distance to the intersection point
  return t0;
}

class StackNode {
  constructor(
    public nodeId: number,
    public t: number
  ) {}
}

const STACK_SIZE = 13;
const stack: StackNode[] = Array.from(
  { length: STACK_SIZE },
  () => new StackNode(0, 0)
);

const makeMesh = (
  struct: VoxelMeshBVHStructCursor,
  hit = false,
  parent = false
) => {
  const mesh = parent
    ? BVHViewer._parentBox.createInstance(crypto.randomUUID())
    : hit
      ? BVHViewer._hitBox.createInstance(crypto.randomUUID())
      : BVHViewer._box.createInstance(crypto.randomUUID());
  mesh.scaling.set(
    struct.maxX - struct.minX,
    struct.maxY - struct.minY,
    struct.maxZ - struct.minZ
  );
  mesh.position.set(
    struct.minX + mesh.scaling.x / 2,
    struct.minY + mesh.scaling.y / 2,
    struct.minZ + mesh.scaling.z / 2
  );
  mesh.material;
  return mesh;
};

const VOXEL_NODE_INDEX = 4095;
function VoxelMeshIntersect(
  ro: Vector3,
  rd: Vector3,
  voxel_bvh: Float32Array,
  voxel_indice_offsets: Uint32Array,
  mesh_verterices: Float32Array,
  mesh_indices: Uint32Array
) {
  const currentNode = new VoxelMeshBVHStructCursor(voxel_bvh);
  const leftChild = new VoxelMeshBVHStructCursor(voxel_bvh);
  const rightChild = new VoxelMeshBVHStructCursor(voxel_bvh);

  let intersectResult = new VoxelMeshIntersectResult(
    false,
    0,
    0,
    false,
    new VoxelGeometryIntersectResult(
      false,
      new Vector3(0, 0, 0),
      new Vector3(0, 0, 0),
      new Vector2(0, 0),
      0
    )
  );
  const mehses: InstancedMesh[][] = [];

  let stackIndex = 0;
  let currentNodeIndex = 0;
  let currentNodeT = 0.0;

  const minBox = new Vector3();
  const maxBox = new Vector3();

  const inverseDir = new Vector3(
    rd.x !== 0 ? 1 / rd.x : 0,
    rd.y !== 0 ? 1 / rd.y : 0,
    rd.z !== 0 ? 1 / rd.z : 0
  );

  do {
    currentNode.setIndex(currentNodeIndex);

    // Check if current node is a leaf
    if (currentNode.nodeType == 2.0) {
      // Found a leaf node check against actual triangles
      let geomtryResult = VoxelGeometryIntersect(
        ro,
        rd,
        currentNodeIndex - VOXEL_NODE_INDEX,
        voxel_indice_offsets,
        mesh_verterices,
        mesh_indices
      );
      if (geomtryResult.hit) {
        intersectResult.found = true;
        intersectResult.t = currentNodeT;
        intersectResult.triangle = geomtryResult;
        break;
      } else {
        // If stack is empty, break
        if (stackIndex == 0) {
          break;
        }
        // Pop from stack
        stackIndex--;
        currentNodeIndex = stack[stackIndex].nodeId;
        continue;
      }
    }

    // Fetch left and right child IDs
    let leftChildId = 2 * currentNodeIndex + 1;
    let rightChildId = 2 * currentNodeIndex + 2;
    // Fetch left and right child nodes
    leftChild.setIndex(leftChildId);
    rightChild.setIndex(rightChildId);

    // Initialize intersection distances to INFINITY
    let leftChildT = Infinity;
    let rightChildT = Infinity;

    // Test left child
    if (leftChild.active >= 0) {
      minBox.set(leftChild.minX, leftChild.minY, leftChild.minZ);
      maxBox.set(leftChild.maxX, leftChild.maxY, leftChild.maxZ);
      leftChildT = BoundingBoxIntersect(minBox, maxBox, ro, inverseDir);
    }

    // Test right child
    if (rightChild.active >= 0) {
      minBox.set(rightChild.minX, rightChild.minY, rightChild.minZ);
      maxBox.set(rightChild.maxX, rightChild.maxY, rightChild.maxZ);
      rightChildT = BoundingBoxIntersect(minBox, maxBox, ro, inverseDir);
    }

    // If neither child is hit
    if (leftChildT == Infinity && rightChildT == Infinity) {
      // If stack is empty, break
      if (stackIndex == 0) {
        break;
      }
      // Pop from stack
      stackIndex--;
      currentNodeIndex = stack[stackIndex].nodeId;
      currentNodeT = stack[stackIndex].t;
      continue;
    }
    // If only left child is hit
    if (leftChildT < Infinity && rightChildT == Infinity) {
      currentNodeIndex = leftChildId;
      currentNodeT = leftChildT;
      mehses.push([
        makeMesh(currentNode, false, true),
        makeMesh(leftChild, true),
        makeMesh(rightChild, false),
      ]);
    }
    // If only right child is hit
    else if (rightChildT < Infinity && leftChildT == Infinity) {
      currentNodeIndex = rightChildId;
      currentNodeT = rightChildT;
      mehses.push([
        makeMesh(currentNode, false, true),
        makeMesh(leftChild, false),
        makeMesh(rightChild, true),
      ]);
    }
    // If both children are hit
    else if (leftChildT < Infinity && rightChildT < Infinity) {
      // Process closer child first
      if (leftChildT <= rightChildT) {
        // Push right child onto stack
        if (stackIndex >= STACK_SIZE) {
          intersectResult.error = true;
          break;
        }
        stack[stackIndex] = new StackNode(rightChildId, rightChildT);
        stackIndex++;
        currentNodeIndex = leftChildId;
        currentNodeT = leftChildT;
        mehses.push([
          makeMesh(currentNode, false, true),
          makeMesh(leftChild, true),
          makeMesh(rightChild, true),
        ]);
      } else {
        // Push left child onto stack
        if (stackIndex >= STACK_SIZE) {
          intersectResult.error = true;
          break;
        }
        stack[stackIndex] = new StackNode(leftChildId, leftChildT);
        stackIndex++;
        currentNodeIndex = rightChildId;
        currentNodeT = rightChildT;
        mehses.push([
          makeMesh(currentNode, false, true),
          makeMesh(leftChild, true),
          makeMesh(rightChild, true),
        ]);
      }
    }
  } while (true);

  mehses.forEach((_) => _.forEach((_) => _.setEnabled(false)));
  let group = 0;

  setInterval(() => {
    mehses[group].forEach((_) => _.setEnabled(false));
    group++;
    if (group >= mehses.length) group = 0;
    mehses[group].forEach((_) => _.setEnabled(true));
  }, 500);

  return intersectResult;
}

export class BVHViewer {
  tool = new VoxelMeshBVHBuilder();

  _boxes: InstancedMesh[] = [];
  static _box: Mesh;
  static _hitBox: Mesh;
  static _parentBox: Mesh;
  static _material: StandardMaterial;
  static _hitMaterial: StandardMaterial;
  static _parentMaterial: StandardMaterial;

  static instances = new Set<BVHViewer>();

  constructor(
    public mesh: Mesh,
    public scene: Scene,
    tree: Float32Array,
    treeIndices: Uint32Array,
    public vertices: Float32Array,
    public indices: Uint32Array
  ) {
    console.warn("get other data", vertices, indices);
    this.tool.tree = tree;
    console.warn(this.tool.treeIndex.getIndexAtLevel(12, 0));
    this.tool.indices = treeIndices;
    this.tool.structCursor.data = tree;
    if (!BVHViewer._box) {
      BVHViewer._box = CreateBox("", { size: 1 }, scene);
      //   BVHViewer._box.renderingGroupId = 1;
      BVHViewer._box;
    }
    if (!BVHViewer._hitBox) {
      BVHViewer._hitBox = CreateBox("", { size: 1 }, scene);
      //   BVHViewer._box.renderingGroupId = 1;
      BVHViewer._hitBox;
    }
    if (!BVHViewer._parentBox) {
      BVHViewer._parentBox = CreateBox("", { size: 1 }, scene);
      //   BVHViewer._box.renderingGroupId = 1;
      BVHViewer._parentBox;
    }
    if (!BVHViewer._material) {
      BVHViewer._material = new StandardMaterial("", this.scene);
      BVHViewer._material.diffuseColor.set(0, 0, 1);
      BVHViewer._material.alpha = 0.5;
      BVHViewer._box!.material = BVHViewer._material;
    }
    if (!BVHViewer._hitMaterial) {
      BVHViewer._hitMaterial = new StandardMaterial("", this.scene);
      BVHViewer._hitMaterial.diffuseColor.set(1, 0, 0);
      BVHViewer._hitMaterial.alpha = 0.5;
      BVHViewer._hitBox!.material = BVHViewer._hitMaterial;
    }
    if (!BVHViewer._parentMaterial) {
      BVHViewer._parentMaterial = new StandardMaterial("", this.scene);
      BVHViewer._parentMaterial.diffuseColor.set(0, 1, 0);
      BVHViewer._parentMaterial.alpha = 0.5;
      BVHViewer._parentBox!.material = BVHViewer._parentMaterial;
    }
    BVHViewer.instances.add(this);
  }

  dispose() {
    for (const mesh of this._boxes) {
      mesh.dispose();
    }
    BVHViewer.instances.delete(this);
  }

  testIntersection(rayOrigin: Vector3, rayDirectoin: Vector3) {
    return VoxelMeshIntersect(
      rayOrigin,
      rayDirectoin,
      this.tool.tree,
      this.tool.indices,
      this.vertices,
      this.indices
    );
  }

  createBoxes(level: number, ro?: Vector3, rd?: Vector3) {
    for (const mesh of this._boxes) {
      mesh.dispose();
    }
    const minBox = new Vector3();
    const maxBox = new Vector3();

    const struct = this.tool.structCursor;
    const meshes: InstancedMesh[] = [];
    if (level == 0) {
      struct.setIndex(0);
      const mesh = BVHViewer._box.createInstance(`${0}`);

      mesh.scaling.set(
        struct.maxX - struct.minX,
        struct.maxY - struct.minY,
        struct.maxZ - struct.minZ
      );
      mesh.position.set(
        struct.minX + mesh.scaling.x / 2,
        struct.minY + mesh.scaling.y / 2,
        struct.minZ + mesh.scaling.z / 2
      );

      meshes.push(mesh);
    } else {
      const levelSize = this.tool.treeIndex.getLevelSize(level);

      for (let i = 0; i < levelSize; i++) {
        const nodeIndex = this.tool.treeIndex.getIndexAtLevel(level, i);
        struct.setIndex(nodeIndex);

        let mesh: InstancedMesh;
        if (ro && rd) {
          minBox.set(struct.minX, struct.minY, struct.minZ);
          maxBox.set(struct.maxX, struct.maxY, struct.maxZ);
          const t = BoundingBoxIntersect(
            minBox,
            maxBox,
            ro,
            new Vector3(
              rd.x !== 0 ? 1 / rd.x : 0,
              rd.y !== 0 ? 1 / rd.y : 0,
              rd.z !== 0 ? 1 / rd.z : 0
            )
          );
          if (t != Infinity) {
            mesh = BVHViewer._hitBox.createInstance(`${i}`);
          } else {
            mesh = BVHViewer._box.createInstance(`${i}`);
          }
        } else {
          mesh = BVHViewer._box.createInstance(`${i}`);
        }
        mesh.scaling.set(
          struct.maxX - struct.minX,
          struct.maxY - struct.minY,
          struct.maxZ - struct.minZ
        );
        mesh.position.set(
          struct.minX + mesh.scaling.x / 2,
          struct.minY + mesh.scaling.y / 2,
          struct.minZ + mesh.scaling.z / 2
        );
        meshes.push(mesh);
      }
    }

    this._boxes = meshes;
  }
}
