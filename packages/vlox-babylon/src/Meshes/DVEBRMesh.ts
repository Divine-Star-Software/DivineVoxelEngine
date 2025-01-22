import { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import { Observable } from "@amodx/core/Observers/Observable";
import { ChunkMeshInterface } from "@divinevoxel/vlox/Interfaces/Render/DVEChunkMeshInterface";

class DVEBRMeshObservers {
  updated = new Observable();
}
import { VertexBuffer } from "@babylonjs/core/Meshes/buffer.js";
import { Engine } from "@babylonjs/core";
import { CompactSubMesh } from "@divinevoxel/vlox/Mesher/Types/Mesher.types";
export class DVEBRMesh implements ChunkMeshInterface {
  observers = new DVEBRMeshObservers();
  static UpdateVertexData(mesh: Mesh, engine: Engine, data:CompactSubMesh) {
    for (const [
      id,
      array,
      length,
      startByte,
      endByte,
      stride,
      type,
    ] of data[1]) {
      switch (id) {
        case "position":
          mesh.setVerticesBuffer(
            new VertexBuffer(engine, array, id, false, undefined, stride)
          );
          break;
        case "normal":
          mesh.setVerticesBuffer(
            new VertexBuffer(engine, array, id, false, undefined, stride)
          );
          break;
        case "indices":
          mesh.setIndices(array as any);
          break;
        default:
          mesh.setVerticesBuffer(
            new VertexBuffer(engine, array, id, false, undefined, stride)
          );
          break;
      }
    }
  }
  constructor(public _mesh: Mesh) {}
  dispose(): void {
    this._mesh.dispose();
  }
}
