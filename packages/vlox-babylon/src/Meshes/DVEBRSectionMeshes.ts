import {
  type Scene,
  type Engine,
  VertexBuffer,
  Geometry,
} from "@babylonjs/core";
import type { Vec3Array } from "@amodx/math";
import { Vector3 } from "@babylonjs/core/Maths/";
import { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import { BoundingInfo } from "@babylonjs/core/Culling/boundingInfo.js";
import { DVESectionMeshes } from "@divinevoxel/vlox/Renderer";
import { DVEBabylonRenderer } from "../Renderer/DVEBabylonRenderer";
import { DVEBRMesh } from "./DVEBRMesh";
import { CompactMeshData } from "@divinevoxel/vlox/Mesher/Types/Mesher.types";
import { SectionMesh } from "@divinevoxel/vlox/Renderer";
import { EngineSettings } from "@divinevoxel/vlox/Settings/EngineSettings";
import {
  CompactedSectionVoxelMesh,
  CompactedMeshData,
} from "@divinevoxel/vlox/Mesher/Geomtry/CompactedSectionVoxelMesh";
import { LocationData } from "@divinevoxel/vlox/Math";

const min = Vector3.Zero();
const max = new Vector3(16, 16, 16);
const empty = new Float32Array(1);
const emptyIndice = new Uint16Array(1);
const meshData = new CompactedMeshData();
const location: LocationData = [0, 0, 0, 0];
const found = new Set<string>();
export class DVEBRSectionMeshes extends DVESectionMeshes {
  static meshCache: Mesh[] = [];
  pickable = false;
  checkCollisions = false;
  serialize = false;
  // clearCachedGeometry = false;
  defaultBb: BoundingInfo;

  constructor(
    public scene: Scene,
    public engine: Engine,
    public renderer: DVEBabylonRenderer
  ) {
    super();
    this.defaultBb = new BoundingInfo(Vector3.Zero(), new Vector3(16, 16, 16));
  }

  returnMesh(mesh: Mesh) {
    mesh.geometry?.clearCachedData();
    mesh.getVertexBuffer(VertexBuffer.PositionKind)?.dispose();
    for (const bufferKind in mesh.getVerticesDataKinds()) {
      mesh.removeVerticesData(bufferKind);
    }
    mesh.setIndices(emptyIndice);
    if (mesh.isEnabled()) {
      mesh.isEnabled(false);
      for (let i = this.scene.meshes.length - 1; i > -1; i--) {
        if (this.scene.meshes[i] == mesh) {
          this.scene.meshes.splice(i, 1);
          break;
        }
      }
    }
    DVEBRSectionMeshes.meshCache.push(mesh);
  }

  updateVertexData(section: SectionMesh, data: CompactedSectionVoxelMesh) {
    data.getLocation(location);

    const totalMeshes = data.getTotalMeshes();
    for (let i = 0; i < totalMeshes; i++) {
      data.getMeshData(i, meshData);
      const subMeshMaterial = meshData.material;
      found.add(subMeshMaterial);
      let mesh: Mesh;

      if (section.meshes.has(subMeshMaterial)) {
        mesh = section.meshes.get(subMeshMaterial) as Mesh;
      } else {
        if (!DVEBRSectionMeshes.meshCache.length) {
          const newMesh = new Mesh("", this.scene);
          newMesh.setEnabled(false);
          newMesh.freezeWorldMatrix();
          newMesh.doNotSyncBoundingInfo = true;
          newMesh.isPickable = false;
          newMesh.checkCollisions = false;
          newMesh.doNotSerialize = true;
          newMesh.metadata = { section: true };
          newMesh.alwaysSelectAsActiveMesh = true;
          for (let i = this.scene.meshes.length - 1; i > -1; i--) {
            if (this.scene.meshes[i] == newMesh) {
              this.scene.meshes.splice(i, 1);
              break;
            }
          }
          mesh = newMesh;
        } else {
          mesh = DVEBRSectionMeshes.meshCache.shift()!;
          mesh.setEnabled(false);
        }
      }

      mesh.getVertexBuffer(VertexBuffer.PositionKind)?.dispose();
      mesh.unfreezeWorldMatrix();
      mesh.position.set(location[1], location[2], location[3]);
      mesh.computeWorldMatrix();
      DVEBRMesh.UpdateVertexDataBuffers(
        mesh,
        this.engine,
        meshData.verticies,
        meshData.indices
      );
      const minBounds = meshData.minBounds;
      const maxBounds = meshData.maxBounds;

      min.x = minBounds[0];
      min.y = minBounds[1];
      min.z = minBounds[2];
      max.x = maxBounds[0];
      max.y = maxBounds[1];
      max.z = maxBounds[2];

      mesh.getBoundingInfo().reConstruct(min, max, mesh.getWorldMatrix());
      mesh.freezeWorldMatrix();

      mesh.material = this.renderer.materials.get(subMeshMaterial)!._material;

      section.meshes.set(subMeshMaterial, mesh);

      if (!EngineSettings.settings.rendererSettings.cpuBound) {
        mesh.geometry!.clearCachedData();
        if (mesh.subMeshes) {
          for (const sm of mesh.subMeshes) {
            sm.setBoundingInfo(this.defaultBb);
          }
        }
      }
    }

    for (const [key, mesh] of section.meshes as Map<string, Mesh>) {
      if (!found.has(key)) {
        this.returnMesh(mesh);
        section.meshes.delete(key);
      }
    }
    found.clear();

    return section;
  }
}
