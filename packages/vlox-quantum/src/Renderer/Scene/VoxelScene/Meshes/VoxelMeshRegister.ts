import { Vec3Array, Vector3Like } from "@amodx/math";
import { VoxelMesh, VoxelMeshStruct } from "./VoxelMesh";
import { VoxelScene } from "../VoxelScene";

/**
struct VoxelMesh {
  position: vec3f,
  minBounds: vec3f,
  maxBounds: vec3f,
  //x -> vertex offset, y -> indice offset, z -> bvh offset
  indexOffets: vec3f
}
 */
const getIndex = (position: Vec3Array, bounds: Vec3Array) =>
  position[0] + position[1] * bounds[0] + position[2] * bounds[0] * bounds[1];
const getPosition = (index: number, bounds: Vec3Array, position: Vec3Array) => {
  position[2] = Math.floor(index / (bounds[0] * bounds[1]));
  position[1] = Math.floor((index % (bounds[0] * bounds[1])) / bounds[0]);
  position[0] = Math.floor(index % bounds[0]);
};

//check position

const getChunkPosiiton = (position: Vec3Array) => {
  position[0] = (position[0] >> 3) << 3;
  position[1] = (position[1] >> 3) << 3;
  position[2] = (position[2] >> 3) << 3;
  return position;
};

export class VoxelMeshRegister {
  worldBounds = {
    min: Vector3Like.Create(),
    max: Vector3Like.Create(),
  };
  chunkBounds = Vector3Like.Create();
  totalChunks: number;
  squareSize: number;

  _meshStructBuffer: GPUBuffer;
  _bvhTreeBuffer: GPUBuffer;
  _indiceBuffer: GPUBuffer;

  meshes: VoxelMesh[] = [];

  constructor(public scene: VoxelScene) {
    (window as any).Register = this;
  }

  init(
    props: {
      chunkRadius: number;
      worldHeight: number;
    } = {
      chunkRadius: 100,
      worldHeight: 256,
    }
  ) {
    const squareDimension =
      Math.floor(Math.ceil(props.chunkRadius * Math.sqrt(2)) / 16) * 16;
    this.squareSize = squareDimension;

    this.chunkBounds.x = squareDimension / 16;
    this.chunkBounds.y = props.worldHeight / 16;
    this.chunkBounds.z = squareDimension / 16;

    this.worldBounds.min.x = -squareDimension / 2;
    this.worldBounds.min.y = 0;
    this.worldBounds.min.z = -squareDimension / 2;

    this.worldBounds.max.x = squareDimension / 2;
    this.worldBounds.max.y = props.worldHeight;
    this.worldBounds.max.z = squareDimension / 2;

    this.totalChunks =
      this.chunkBounds.x * this.chunkBounds.y * this.chunkBounds.z;

    this._meshStructBuffer = this.scene.scene.engine.device.createBuffer({
      size: this.totalChunks * VoxelMeshStruct.StructBufferSize,
      usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.STORAGE,
      mappedAtCreation: false,
    });
    this._bvhTreeBuffer = this.scene.scene.engine.device.createBuffer({
      label: "bvh tree buffer",
      size: this.totalChunks * VoxelMesh.SectorIndexSize * 4,
      usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.STORAGE,
      mappedAtCreation: false,
    });
    this._indiceBuffer = this.scene.scene.engine.device.createBuffer({
      label: "indice buffer",
      size: this.totalChunks * VoxelMesh.VoxelIndexSize * 4,
      usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.STORAGE,
      mappedAtCreation: false,
    });

    this.scene._sceneProps[0] = this.scene._sceneProps[0];
    this.scene._sceneProps[1] = this.scene._sceneProps[1];
    //2
    //3
    this.scene._sceneProps[4] = this.chunkBounds.x;
    this.scene._sceneProps[5] = this.chunkBounds.y;
    this.scene._sceneProps[6] = this.chunkBounds.z;

    //7
    this.scene._sceneProps[8] = this.worldBounds.min.x;
    this.scene._sceneProps[9] = this.worldBounds.min.y;
    this.scene._sceneProps[10] = this.worldBounds.min.z;

    //11
    this.scene._sceneProps[12] = this.worldBounds.max.x;
    this.scene._sceneProps[13] = this.worldBounds.max.y;
    this.scene._sceneProps[14] = this.worldBounds.max.z;
  }

  getChunkIndex(x: number, y: number, z: number) {
    const chunkX = Math.floor(x / 16) * 16;
    const chunkY = Math.floor(y / 16) * 16;
    const chunkZ = Math.floor(z / 16) * 16;

    return (
      Math.abs(chunkX - this.worldBounds.min.x) / 16 +
      (Math.abs(chunkY - this.worldBounds.min.y) / 16) * this.chunkBounds.x +
      (Math.abs(chunkZ - this.worldBounds.min.z) / 16) *
        this.chunkBounds.x *
        this.chunkBounds.y
    );
  }

  getMeshAt(x: number, y: number, z: number) {
    const index = this.getChunkIndex(x, y, z);
    return this.meshes[index];
  }

  addMesh(mesh: VoxelMesh) {
    const position = mesh.data.position;

    const index = this.getChunkIndex(...position);

    this.meshes[index] = mesh;
    mesh.meshStruct.indexOffsets.z = (index * VoxelMesh.SectorIndexSize) / 8;
    mesh.meshStruct.indexOffsets.w = (index * VoxelMesh.VoxelIndexSize) / 2;

    console.warn(
      mesh.meshStruct.indexOffsets.w,
      index * VoxelMesh.VoxelIndexSize * 4,
      mesh.voxels
    );
    this.scene.scene.engine.device.queue.writeBuffer(
      this._meshStructBuffer,
      index * VoxelMeshStruct.StructBufferSize,
      mesh.meshStruct._buffer
    );
    this.scene.scene.engine.device.queue.writeBuffer(
      this._bvhTreeBuffer,
      index * VoxelMesh.SectorBufferSize,
      mesh.sectors
    );
    this.scene.scene.engine.device.queue.writeBuffer(
      this._indiceBuffer,
      index * VoxelMesh.VoxelBufferSize ,
      mesh.voxels
    );
  }
}
