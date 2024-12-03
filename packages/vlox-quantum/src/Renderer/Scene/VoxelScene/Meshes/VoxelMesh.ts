import { Vec3Array } from "@amodx/math";
import { VoxelScene } from "../VoxelScene";
import { mat4 } from "../../../Math/wgpu-matrix";

import { Vector3, Vector4 } from "../../../Math";

type VoxelMeshData = {
  position: Vec3Array;
  minBounds: Vec3Array;
  maxBounds: Vec3Array;

  verticesStartIndex: number;
  verticesLength: number;
  verticesByteStart: number;
  verticesByteEnd: number;

  indicesStartIndex: number;
  indicesLength: number;
  indicesByteStart: number;
  indicesByteEnd: number;

  bvhTreeBuffer: Float32Array;
  bvhIndiceBuffer: Uint32Array;
};

type IndexRange = [start: number, length: number];
export class VoxelMeshStruct {
  static StructIndexSizze =
    //states vec4f
    4 +
    //positions vec3f
    4 +
    //indexOffets vec4f
    4 +
    //AABB.min vec3f
    4 +
    //AABB.max vec3f
    4;
  static StructBufferSize = this.StructIndexSizze * 4;
  static StateRange: IndexRange = [0, 4];
  static PositonRange: IndexRange = [4, 4];
  static IndexOffsetsRange: IndexRange = [8, 4];
  static MinBoundsRange: IndexRange = [12, 4];
  static MaxBoundsRange: IndexRange = [16, 4];

  _buffer: ArrayBuffer;
  states = new Vector4();
  position = new Vector3();
  indexOffsets = new Vector4();
  minBounds = new Vector3();
  maxBounds = new Vector3();

  constructor() {
    const buffer = new ArrayBuffer(VoxelMeshStruct.StructBufferSize);

    this._buffer = buffer;
    this.states._vector = new Float32Array(
      buffer,
      VoxelMeshStruct.StateRange[0] * 4,
      VoxelMeshStruct.StateRange[1]
    );
    this.position._vector = new Float32Array(
      buffer,
      VoxelMeshStruct.PositonRange[0] * 4,
      VoxelMeshStruct.PositonRange[1]
    );
    this.indexOffsets._vector = new Float32Array(
      buffer,
      VoxelMeshStruct.IndexOffsetsRange[0] * 4,
      VoxelMeshStruct.IndexOffsetsRange[1]
    );
    this.minBounds._vector = new Float32Array(
      buffer,
      VoxelMeshStruct.MinBoundsRange[0] * 4,
      VoxelMeshStruct.MinBoundsRange[1]
    );
    this.maxBounds._vector = new Float32Array(
      buffer,
      VoxelMeshStruct.MaxBoundsRange[0] * 4,
      VoxelMeshStruct.MaxBoundsRange[1]
    );
  }
}

export class VoxelMesh {
  static SectorIndexSize = 8191 * 8;
  static SectorBufferSize = this.SectorIndexSize * 4;
  static VoxelIndexSize = 4096 * 2;
  static VoxelBufferSize = this.VoxelIndexSize * 4;
  id = crypto.randomUUID();
  next: VoxelMesh | null;
  _meshDataUniformBuffer: GPUBuffer;
  meshMatrix = new Float32Array(16);
  sectors: Float32Array;
  voxels: Uint32Array;

  meshStruct = new VoxelMeshStruct();

  bindGroup: GPUBindGroup;
  constructor(
    public scene: VoxelScene,
    public data: VoxelMeshData
  ) {
    mat4.translate(mat4.identity(), this.data.position, this.meshMatrix);

    this.meshStruct.indexOffsets.x = data.verticesStartIndex;
    this.meshStruct.indexOffsets.y = data.indicesStartIndex;

    this.meshStruct.states.x = 1;

    this.meshStruct.position.x = data.position[0];
    this.meshStruct.position.y = data.position[1];
    this.meshStruct.position.z = data.position[2];

    this.meshStruct.minBounds.x = data.minBounds[0] + data.position[0];
    this.meshStruct.minBounds.y = data.minBounds[1] + data.position[1];
    this.meshStruct.minBounds.z = data.minBounds[2] + data.position[2];

    this.meshStruct.maxBounds.x = data.maxBounds[0] + data.position[0];
    this.meshStruct.maxBounds.y = data.maxBounds[1] + data.position[1];
    this.meshStruct.maxBounds.z = data.maxBounds[2] + data.position[2];

    this.sectors = data.bvhTreeBuffer;
    this.voxels = data.bvhIndiceBuffer;

    this._meshDataUniformBuffer = this.scene.scene.engine.device.createBuffer({
      size: this.meshMatrix.byteLength,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      mappedAtCreation: false,
    });

    this.scene.scene.engine.device.queue.writeBuffer(
      this._meshDataUniformBuffer,
      0,
      this.meshMatrix
    );

    this.bindGroup = this.scene.scene.engine.device.createBindGroup({
      label: "bindGroup for work buffer",
      layout: this.scene.renderPipeline._meshBindGroupLayout,
      entries: [
        {
          binding: 0,
          resource: { buffer: this._meshDataUniformBuffer },
        },
      ],
    });
  }
}
