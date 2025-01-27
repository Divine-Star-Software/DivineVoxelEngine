import { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import { Observable } from "@amodx/core/Observers/Observable";
import { ChunkMeshInterface } from "@divinevoxel/vlox/Renderer/DVEChunkMeshInterface";

class DVEBRMeshObservers {
  updated = new Observable();
}
import { VertexBuffer } from "@babylonjs/core/Meshes/buffer.js";
import { Engine } from "@babylonjs/core";
import { CompactSubMesh } from "@divinevoxel/vlox/Mesher/Types/Mesher.types";
export class DVEBRMesh implements ChunkMeshInterface {
  observers = new DVEBRMeshObservers();
  static UpdateVertexData(mesh: Mesh, engine: Engine, data: CompactSubMesh) {
    for (let i = 0; i < data[1].length; i++) {
      const subMesh = data[1][i];
      const id = subMesh[0];
      const array = subMesh[1];
      const stride = subMesh[2];
      if (id == "indices") {
        mesh.setIndices(array as any);
        continue;
      }
      mesh.setVerticesBuffer(
        new VertexBuffer(engine, array, id, false, undefined, stride)
      );
    }
  }
  constructor(public _mesh: Mesh) {}
  dispose(): void {
    this._mesh.dispose();
  }
}
