import { type Scene, type Engine } from "@babylonjs/core";
import type { Vec3Array } from "@amodx/math";
import { Vector3 } from "@babylonjs/core/Maths/";
import { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import { BoundingInfo } from "@babylonjs/core/Culling/boundingInfo.js";
import { EngineSettingsData } from "@divinevoxel/vlox/Settings/EngineSettings.types";
import { DVEChunkMeshes } from "@divinevoxel/vlox/Renderer/DVEChunkMeshes";
import { DVEBabylonRenderer } from "../Renderer/DVEBabylonRenderer";
import { DVEBRMesh } from "./DVEBRMesh";
import { CompactMeshData } from "@divinevoxel/vlox/Mesher/Types/Mesher.types";
import { EngineSettings } from "@divinevoxel/vlox/Settings/EngineSettings";
import { ChunkMesh } from "@divinevoxel/vlox/Renderer/Classes/ChunkMesh";

export class DVEBRChunkMeshes extends DVEChunkMeshes {
  pickable = false;
  checkCollisions = false;
  serialize = false;
  clearCachedGeometry = true;
  defaultBb: BoundingInfo;

  constructor(
    public scene: Scene,
    public engine: Engine,
    public renderer: DVEBabylonRenderer
  ) {
    super();
    this.defaultBb = new BoundingInfo(Vector3.Zero(), new Vector3(16, 16, 16));
  }

  returnMesh(mesh: DVEBRMesh) {
    mesh.dispose();
    DVEBabylonRenderer.instance.observers.meshDisposed.notify(mesh);
  }

  updateVertexData(
    chunk: ChunkMesh,
    location: Vec3Array,
    data: CompactMeshData
  ) {
    if (data[0] == 1) return chunk;

    const found: Record<string, true> = {};
    const subMeshes = data[2];
    for (let i = 0; i < subMeshes.length; i++) {
      const subMeshMaterial = subMeshes[i][0];
      found[subMeshMaterial] = true;
      let mesh: Mesh;
      if (chunk.meshes.has(subMeshMaterial)) {
        mesh = chunk.meshes.get(subMeshMaterial) as Mesh;
      } else {
        mesh = new Mesh("", this.scene);
        mesh.doNotSyncBoundingInfo = true;
      }
      mesh.unfreezeWorldMatrix();
      mesh.position.set(location[0], location[1], location[2]);

      DVEBRMesh.UpdateVertexData(mesh, this.engine, subMeshes[i]);

      mesh.material = this.renderer.materials.get(subMeshMaterial)!._material;
      mesh
        .getBoundingInfo()
        .reConstruct(
          Vector3.Zero(),
          new Vector3(16, 16, 16),
          mesh.getWorldMatrix()
        );

      mesh.freezeWorldMatrix();

      chunk.meshes.set(subMeshMaterial, mesh);

      if (EngineSettings.settings.meshes.clearChachedGeometry) {
        mesh.geometry!.clearCachedData();
        if (mesh.subMeshes) {
          for (const sm of mesh.subMeshes) {
            sm.setBoundingInfo(this.defaultBb);
          }
        }
      }
    }

    for (const [key, mesh] of chunk.meshes) {
      if (!found[key]) {
        (mesh as Mesh).dispose();
        chunk.meshes.delete(key);
      }
    }

    return chunk;
  }

  syncSettings(settings: EngineSettingsData) {
    if (settings.meshes.pickable) {
      this.pickable = true;
    }
    if (typeof settings.meshes.clearChachedGeometry != "undefined") {
      this.clearCachedGeometry = settings.meshes.clearChachedGeometry;
    }
    if (settings.meshes.serialize) {
      this.serialize = true;
    }
  }
}
