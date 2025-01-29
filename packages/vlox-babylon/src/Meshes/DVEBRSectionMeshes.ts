import { type Scene, type Engine } from "@babylonjs/core";
import type { Vec3Array } from "@amodx/math";
import { Vector3 } from "@babylonjs/core/Maths/";
import { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import { BoundingInfo } from "@babylonjs/core/Culling/boundingInfo.js";
import { EngineSettingsData } from "@divinevoxel/vlox/Settings/EngineSettings.types";
import { DVESectionMeshes } from "@divinevoxel/vlox/Renderer";
import { DVEBabylonRenderer } from "../Renderer/DVEBabylonRenderer";
import { DVEBRMesh } from "./DVEBRMesh";
import { CompactMeshData } from "@divinevoxel/vlox/Mesher/Types/Mesher.types";
import { EngineSettings } from "@divinevoxel/vlox/Settings/EngineSettings";
import { SectionMesh } from "@divinevoxel/vlox/Renderer";

const min = Vector3.Zero();
const max = new Vector3(16, 16, 16);
const empty = new Float32Array(1);
const emptyIndice = new Uint16Array(1);
export class DVEBRSectionMeshes extends DVESectionMeshes {
  static meshCache: Mesh[] = [];
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
    chunk: SectionMesh,
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
        if (!DVEBRSectionMeshes.meshCache.length) {
          mesh = new Mesh("", this.scene);
          mesh.doNotSyncBoundingInfo = true;
   
          mesh.cullingStrategy = Mesh.CULLINGSTRATEGY_BOUNDINGSPHERE_ONLY;
        } else {
          mesh = DVEBRSectionMeshes.meshCache.shift()!;
        }
      }

      mesh.unfreezeWorldMatrix();
      mesh.position.set(location[0], location[1], location[2]);
      DVEBRMesh.UpdateVertexData(mesh, this.engine, subMeshes[i]);
      mesh.getBoundingInfo().reConstruct(min, max, mesh.getWorldMatrix());
      mesh.freezeWorldMatrix();

      mesh.material = this.renderer.materials.get(subMeshMaterial)!._material;

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

    for (const [key, mesh] of chunk.meshes as Map<string, Mesh>) {
      if (!found[key]) {
        mesh.dispose();
        for (const bufferKind in mesh.getVerticesDataKinds()) {
          mesh.setVerticesData(bufferKind, empty);
        }
        mesh.setIndices(emptyIndice);
        mesh.setEnabled(false);
        DVEBRSectionMeshes.meshCache.push(mesh as any);
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
