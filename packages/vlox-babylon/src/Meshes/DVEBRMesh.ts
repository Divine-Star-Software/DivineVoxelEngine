import { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import { Observable } from "@amodx/core/Observers/Observable";

class DVEBRMeshObservers {
  updated = new Observable();
}
import { Buffer, VertexBuffer } from "@babylonjs/core/Meshes/buffer.js";
import { Engine } from "@babylonjs/core/Engines/engine";
import { CompactSubMesh } from "@divinevoxel/vlox/Mesher/Types/Mesher.types";
import { VoxelMeshVertexStructCursor } from "@divinevoxel/vlox/Mesher/Geomtry/VoxelMeshVertexStructCursor";
export class DVEBRMesh {
  observers = new DVEBRMeshObservers();
  static UpdateVertexData(mesh: Mesh, engine: Engine, data: CompactSubMesh) {
    this.UpdateVertexDataBuffers(mesh, engine, data[1], data[2]);
  }
  static UpdateVertexDataBuffers(
    mesh: Mesh,
    engine: Engine,
    vertices: Float32Array,
    indices: Uint16Array | Uint32Array
  ) {
    const buffer = new Buffer(engine, vertices, false);
    const geo = mesh.geometry ? mesh.geometry : mesh;
    geo.setVerticesBuffer(
      new VertexBuffer(
        engine,
        buffer,
        VertexBuffer.PositionKind,
        false,
        undefined,
        VoxelMeshVertexStructCursor.VertexFloatSize,
        undefined,
        VoxelMeshVertexStructCursor.PositionOffset,
        3
      )
    );
    geo.setVerticesBuffer(
      new VertexBuffer(
        engine,
        buffer,
        VertexBuffer.NormalKind,
        false,
        undefined,
        VoxelMeshVertexStructCursor.VertexFloatSize,
        undefined,
        VoxelMeshVertexStructCursor.NormalOffset,
        3
      )
    );
    geo.setVerticesBuffer(
      new VertexBuffer(
        engine,
        buffer,
        VertexBuffer.ColorKind,
        false,
        undefined,
        VoxelMeshVertexStructCursor.VertexFloatSize,
        undefined,
        VoxelMeshVertexStructCursor.ColorOffset,
        3
      )
    );
    geo.setVerticesBuffer(
      new VertexBuffer(
        engine,
        buffer,
        "textureIndex",
        false,
        undefined,
        VoxelMeshVertexStructCursor.VertexFloatSize,
        undefined,
        VoxelMeshVertexStructCursor.TextureIndexOffset,
        3
      )
    );
    geo.setVerticesBuffer(
      new VertexBuffer(
        engine,
        buffer,
        "uv",
        false,
        undefined,
        VoxelMeshVertexStructCursor.VertexFloatSize,
        undefined,
        VoxelMeshVertexStructCursor.UVOffset,
        2
      )
    );
    geo.setVerticesBuffer(
      new VertexBuffer(
        engine,
        buffer,
        "color",
        false,
        undefined,
        VoxelMeshVertexStructCursor.VertexFloatSize,
        undefined,
        VoxelMeshVertexStructCursor.ColorOffset,
        3
      )
    );
    geo.setVerticesBuffer(
      new VertexBuffer(
        engine,
        buffer,
        "voxelData",
        false,
        undefined,
        VoxelMeshVertexStructCursor.VertexFloatSize,
        undefined,
        VoxelMeshVertexStructCursor.VoxelDataOFfset,
        4
      )
    );
    geo.setIndices(indices);
    return buffer;
  }
  /*   static UpdateVertexDataO(mesh: Mesh, engine: Engine, data: CompactSubMesh) {
 
    for (let i = 0; i < data[1].length; i++) {
      const subMesh = data[1][i];
      const id = subMesh[0];
      const array = subMesh[1];
      const stride = subMesh[2];
      if (id == "indices") {
        mesh.setIndices(array as any);
        continue;
      }

      const buffer = new Buffer(engine, array,false,)
      mesh.setVerticesBuffer(
        new VertexBuffer(engine, array, id, false, undefined, stride)
      );
    }
  } */
  constructor(public _mesh: Mesh) {}
  dispose(): void {
    this._mesh.dispose();
  }
}
