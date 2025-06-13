import { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { BoundingInfo } from "@babylonjs/core/Culling/boundingInfo";
import { Buffer } from "@babylonjs/core/Meshes/buffer";
import { DataBuffer } from "@babylonjs/core/Buffers/dataBuffer";
import { Engine } from "@babylonjs/core/Engines/engine";
import { Geometry } from "@babylonjs/core/Meshes/geometry";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { SubMesh } from "@babylonjs/core/Meshes/subMesh";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { VertexBuffer } from "@babylonjs/core/Buffers/buffer";
//https://playground.babylonjs.com/#SF6VE4
import { VoxelMeshVertexStructCursor } from "@divinevoxel/vlox/Mesher/Geomtry/VoxelMeshVertexStructCursor";
import { VoxelScene } from "../../Scene/VoxelScene";
import { BufferAllocator } from "./BufferAllocator";
import { nextPowerOf2 } from "@divinevoxel/vlox/Util/Binary/BinaryFunctions";
const min = new Vector3(-Infinity, -Infinity, -Infinity);
const max = new Vector3(Infinity, Infinity, Infinity);
export class BufferAllocation {
  verticesStart = 0;
  verticesCount = 0;
  indicesStart = 0;
  indicesCount = 0;
  verticeAllocationId = 0;
  verticeByteStart = 0;
  indiceAllocationId = 0;
  indiceByteCount = 0;
  constructor(public _bufferMesh: BufferMesh) {}
}

export class BufferMesh extends Mesh {
  // _mesh: Mesh;
  engine: Engine;
  _vertices: Buffer;
  _verticesAllocator: BufferAllocator;
  _indices: DataBuffer;
  _indicesAllocator: BufferAllocator;

  constructor(
    public voxelScene: VoxelScene,
    public totalVertices: number
  ) {
    super("", voxelScene.renderer.scene);
    const scene = this.voxelScene.renderer.scene;
    this.renderingGroupId = 1;
    const engine = scene.getEngine()! as Engine;
    this.engine = engine as any;
    const mesh = this;

    const gl = engine._gl;

    const verteicesByteSize = nextPowerOf2(
      totalVertices * VoxelMeshVertexStructCursor.VertexByteSize
    );
    this._verticesAllocator = new BufferAllocator(verteicesByteSize);
    const indicesByteSize = nextPowerOf2(
      totalVertices * Uint32Array.BYTES_PER_ELEMENT
    );
    this._indicesAllocator = new BufferAllocator(indicesByteSize);
    mesh.doNotSyncBoundingInfo = true;
    mesh.material = this.voxelScene._material;
    //   this._mesh = mesh;
    mesh.isPickable = false;
    mesh.checkCollisions = false;
    mesh.doNotSerialize = true;
    mesh.metadata = { section: true, buffer: null };
    mesh.alwaysSelectAsActiveMesh = true;

    const geometry = new Geometry(
      Geometry.RandomId(),
      scene,
      undefined,
      true,
      this
    );

    geometry._boundingInfo = new BoundingInfo(min, max);
    geometry.useBoundingInfoFromGeometry = true;

    const verticies = new Float32Array(new ArrayBuffer(verteicesByteSize));

    const verticesBuffer = new Buffer(
      engine,
      verticies,
      true,
      VoxelMeshVertexStructCursor.VertexFloatSize
    );
    this._vertices = verticesBuffer;
    this._indices = this.engine.createIndexBuffer(
      new Uint32Array(new ArrayBuffer(indicesByteSize)),
      true
    );
    //@ts-ignore
    geometry._indexBuffer = this._indices;
    geometry.setVerticesBuffer(
      new VertexBuffer(
        engine,
        verticesBuffer,
        VertexBuffer.PositionKind,
        true,
        undefined,
        VoxelMeshVertexStructCursor.VertexFloatSize,
        undefined,
        VoxelMeshVertexStructCursor.PositionOffset,
        4,
        undefined,
        undefined,
        undefined,
        undefined,
        false
      ),
      undefined,
      false
    );
    geometry.setVerticesBuffer(
      new VertexBuffer(
        engine,
        verticesBuffer,
        VertexBuffer.NormalKind,
        true,
        undefined,
        VoxelMeshVertexStructCursor.VertexFloatSize,
        undefined,
        VoxelMeshVertexStructCursor.NormalOffset,
        4,
        undefined,
        undefined,
        undefined,
        undefined,
        false
      ),
      undefined,
      false
    );
    geometry.setVerticesBuffer(
      new VertexBuffer(
        engine,
        verticesBuffer,
        "textureIndex",
        true,
        undefined,
        VoxelMeshVertexStructCursor.VertexFloatSize,
        undefined,
        VoxelMeshVertexStructCursor.TextureIndexOffset,
        4,
        undefined,
        undefined,
        undefined,
        undefined,
        false
      ),
      undefined,
      false
    );
    geometry.setVerticesBuffer(
      new VertexBuffer(
        engine,
        verticesBuffer,
        "uv",
        true,
        undefined,
        VoxelMeshVertexStructCursor.VertexFloatSize,
        undefined,
        VoxelMeshVertexStructCursor.UVOffset,
        2,
        undefined,
        undefined,
        undefined,
        undefined,
        false
      ),
      undefined,
      false
    );
    geometry.setVerticesBuffer(
      new VertexBuffer(
        engine,
        verticesBuffer,
        "color",
        true,
        undefined,
        VoxelMeshVertexStructCursor.VertexFloatSize,
        undefined,
        VoxelMeshVertexStructCursor.ColorOffset,
        4,
        undefined,
        undefined,
        undefined,
        undefined,
        false
      ),
      undefined,
      false
    );
    geometry.setVerticesBuffer(
      new VertexBuffer(
        engine,
        verticesBuffer,
        "voxelData",
        true,
        undefined,
        VoxelMeshVertexStructCursor.VertexFloatSize,
        undefined,
        VoxelMeshVertexStructCursor.VoxelDataOFfset,
        4,
        undefined,
        undefined,
        undefined,
        undefined,
        false
      ),
      undefined,
      false
    );

    this.subMeshes = [];
  }

  _allocations = 0;

  allocate(
    verticesCount: number,
    indicesCount: number
  ): BufferAllocation | null {
    const vertexOffset = this._verticesAllocator.allocate(
      (verticesCount + 4) * VoxelMeshVertexStructCursor.VertexByteSize
    );
    if (vertexOffset === null) {
      return null;
    }
    const verticeByteStart =
      Math.ceil(vertexOffset / VoxelMeshVertexStructCursor.VertexByteSize) *
      VoxelMeshVertexStructCursor.VertexByteSize;

    const indexOffset = this._indicesAllocator.allocate(
      indicesCount * Uint32Array.BYTES_PER_ELEMENT
    );
    if (indexOffset === null) {
      this._verticesAllocator.free(vertexOffset);
      return null;
    }

    const allocation = new BufferAllocation(this);
    allocation.verticeAllocationId = vertexOffset;
    allocation.verticeByteStart = verticeByteStart;
    allocation.verticesCount = verticesCount;
    allocation.verticesStart =
      verticeByteStart / VoxelMeshVertexStructCursor.VertexByteSize;

    allocation.indiceAllocationId = indexOffset;
    allocation.indicesCount = indicesCount;
    allocation.indicesStart = Math.floor(
      indexOffset / Uint32Array.BYTES_PER_ELEMENT
    );
    this._allocations++;
    return allocation;
  }

  deallocate(allocation: BufferAllocation) {
    this._verticesAllocator.free(allocation.verticeAllocationId);
    this._indicesAllocator.free(allocation.indiceAllocationId);
    this._allocations--;
  }

  writeBuffers(
    allocation: BufferAllocation,
    verticies: Float32Array,
    indices: Uint32Array
  ) {
    const gl = this.engine._gl!;

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indices.underlyingResource);
    gl.bindBuffer(
      gl.ARRAY_BUFFER,
      this._vertices.getBuffer()!.underlyingResource
    );

    gl.bufferSubData(
      gl.ELEMENT_ARRAY_BUFFER,
      allocation.indicesStart * 4,
      indices
    );
    gl.bufferSubData(
      gl.ARRAY_BUFFER,
      allocation.verticesStart *
        VoxelMeshVertexStructCursor.VertexFloatSize *
        4,
      verticies
    );

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }

  render(mesh: SubMesh, alpha: boolean, effectiveMesh: AbstractMesh) {
    const active = this.voxelScene.active.get(mesh);
    if (!active) return this as Mesh;

    return super.render(mesh, alpha, active.transform as any);
  }
}
