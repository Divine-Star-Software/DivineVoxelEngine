import { Vec3Array } from "@amodx/math";
import { VoxelMesh } from "./VoxelMesh";
import { VoxelScene } from "../VoxelScene";
import { CompactMeshData, CompactSubMesh } from "@divinevoxel/vlox/Mesher/Types/Mesher.types";
import { VoxelMeshTypes } from "@divinevoxel/vlox/Mesher/Types/VoxelMesh.types";
import { VoxelMeshRegister } from "./VoxelMeshRegister";
export class VoxelSceneMeshes {
  _vertexBuffer: GPUBuffer;
  _indexBuffer: GPUBuffer;

  _meshes: VoxelMesh | null;

  register: VoxelMeshRegister;

  constructor(
    public scene: VoxelScene,
    public renderRadius: number
  ) {}

  async init() {
    //1073741824
    //2000000256
    //2 gigs
    const twoGigs = 1073741824;
    const halfGig = 1073741824 / 4;
    this._vertexBuffer = this.scene.scene.engine.device.createBuffer({
      size: twoGigs,
      usage:
        GPUBufferUsage.VERTEX |
        GPUBufferUsage.STORAGE |
        GPUBufferUsage.COPY_DST,
      mappedAtCreation: false,
    });
    this._indexBuffer = this.scene.scene.engine.device.createBuffer({
      size: halfGig,
      usage:
        GPUBufferUsage.INDEX | GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
      mappedAtCreation: false,
    });

    this.register = new VoxelMeshRegister(this.scene);

    this.register.init();
  }

  createMesh(position: Vec3Array, data: CompactMeshData) {
    if (data[0] == 0) return;
  
    const vertexBuffer = data[1];
    const indicesBuffer = data[2];
    const bvhTreeBuffer = data[3];
    const bvhIndiceBuffer = data[4];
    const minBounds = data[5];
    const maxBounds = data[6];

    let verticeStart = 0;
    let indicesStart = 0;

    const vertexBufferLength = vertexBuffer.byteLength;
    const indexBufferByteLength = indicesBuffer.byteLength;

    let newMesh: VoxelMesh;
    if (!this._meshes) {
      newMesh = new VoxelMesh(this.scene, {
        position,
        minBounds,
        maxBounds,
        //vertex
        verticesStartIndex: 0,
        verticesLength: vertexBufferLength / VoxelMeshTypes.vertexStrideBytes,
        verticesByteStart: 0,
        verticesByteEnd: vertexBufferLength,
        //indices
        indicesStartIndex: 0,
        indicesLength: indicesBuffer.length,
        indicesByteStart: 0,
        indicesByteEnd: indexBufferByteLength,
        bvhTreeBuffer,
        bvhIndiceBuffer,
      });
      this._meshes = newMesh;
    } else {
      let verticesByteIndex = -1;
      let indicesByteIndex = -1;

      let verticesGapSize = 0;
      let indicesGapSize = 0;

      let verticesStartIndex = 0;
      let indicesStartIndex = 0;

      let mesh = this._meshes;

      let lastMesh = mesh;
      while (mesh) {
        let next = mesh.next;
        if (!next) {
          verticesGapSize = this._vertexBuffer.size - mesh.data.verticesByteEnd;
          verticesStartIndex = mesh.data.verticesByteEnd;

          indicesGapSize = this._indexBuffer.size - mesh.data.indicesByteEnd;
          indicesStartIndex = mesh.data.indicesByteEnd;

          lastMesh = mesh;
        } else {
          verticesGapSize =
            next.data.verticesByteStart - mesh.data.verticesByteEnd;
          verticesStartIndex = mesh.data.verticesByteEnd;

          indicesGapSize =
            next.data.indicesByteStart - mesh.data.indicesByteEnd;
          indicesStartIndex = mesh.data.indicesByteEnd;

          lastMesh = mesh;
        }

        if (verticesByteIndex == -1) {
          if (verticesGapSize >= vertexBufferLength) {
            verticesByteIndex = verticesStartIndex;
          }
        }

        if (indicesByteIndex == -1) {
          if (indicesGapSize >= indexBufferByteLength) {
            indicesByteIndex = indicesStartIndex;
          }
        }

        if ((verticesByteIndex > -1 && indicesByteIndex > -1) || !next) {
          break;
        }

        mesh = next;
      }

      if (verticesByteIndex == -1 || indicesByteIndex == -1) {
        console.error("Could not allocate space for voxel mesh.", position);
        return;
      }
      verticeStart = verticesByteIndex;
      indicesStart = indicesByteIndex;

      newMesh = new VoxelMesh(this.scene, {
        position,
        minBounds,
        maxBounds,
        //vertex
        verticesStartIndex:
          verticesByteIndex / VoxelMeshTypes.vertexStrideBytes,
        verticesLength: vertexBufferLength / VoxelMeshTypes.vertexStrideBytes,
        verticesByteStart: verticesByteIndex,
        verticesByteEnd: verticesByteIndex + vertexBufferLength,
        //indicie
        indicesStartIndex: indicesByteIndex / Uint32Array.BYTES_PER_ELEMENT,
        indicesLength: indicesBuffer.length,
        indicesByteStart: indicesByteIndex,
        indicesByteEnd: indicesByteIndex + indexBufferByteLength,
        bvhTreeBuffer,
        bvhIndiceBuffer,
      });

      newMesh.next = lastMesh.next;
      lastMesh.next = newMesh;
    }

    this.scene.scene.engine.device.queue.writeBuffer(
      this._vertexBuffer,
      verticeStart,
      vertexBuffer
    );
    this.scene.scene.engine.device.queue.writeBuffer(
      this._indexBuffer,
      indicesStart,
      indicesBuffer
    );

      this.register.addMesh(newMesh);

  }

  render() {}
}
