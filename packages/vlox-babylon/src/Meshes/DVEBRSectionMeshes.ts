import { type Scene, type Engine, VertexBuffer } from "@babylonjs/core";
import type { Vec3Array } from "@amodx/math";
import { Vector3 } from "@babylonjs/core/Maths/";
import { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import { BoundingInfo } from "@babylonjs/core/Culling/boundingInfo.js";
import { DVESectionMeshes } from "@divinevoxel/vlox/Renderer";
import { DVEBabylonRenderer } from "../Renderer/DVEBabylonRenderer";
import { DVEBRMesh } from "./DVEBRMesh";
import { CompactMeshData } from "@divinevoxel/vlox/Mesher/Types/Mesher.types";
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
    const subMeshes = data[1];
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
          mesh.isPickable = false;
          mesh.checkCollisions = false;
          mesh.doNotSerialize = true;
          mesh.cullingStrategy = Mesh.CULLINGSTRATEGY_BOUNDINGSPHERE_ONLY;
        } else {
          mesh = DVEBRSectionMeshes.meshCache.shift()!;
        }
      }
      mesh.getVertexBuffer(VertexBuffer.PositionKind)?.dispose();
      mesh.unfreezeWorldMatrix();
      mesh.position.set(location[0], location[1], location[2]);
      DVEBRMesh.UpdateVertexData(mesh, this.engine, subMeshes[i]);
      min.x = subMeshes[i][3][0];
      min.y = subMeshes[i][3][1];
      min.z = subMeshes[i][3][2];
      max.x = subMeshes[i][4][0];
      max.y = subMeshes[i][4][1];
      max.z = subMeshes[i][4][2];
      this.defaultBb.reConstruct(min, max, mesh.getWorldMatrix());
      mesh.setBoundingInfo(this.defaultBb);
      mesh.freezeWorldMatrix();

      mesh.material = this.renderer.materials.get(subMeshMaterial)!._material;

      chunk.meshes.set(subMeshMaterial, mesh);

      if (this.clearCachedGeometry) {
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
        mesh.geometry?.clearCachedData();
        mesh.getVertexBuffer(VertexBuffer.PositionKind)?.dispose();
        for (const bufferKind in mesh.getVerticesDataKinds()) {
          mesh.removeVerticesData(bufferKind);
        }
        mesh.setIndices(emptyIndice);
        mesh.setEnabled(false);
        DVEBRSectionMeshes.meshCache.push(mesh);
        chunk.meshes.delete(key);
      }
    }

    return chunk;
  }
}
