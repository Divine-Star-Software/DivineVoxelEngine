import type { Scene } from "@babylonjs/core/scene";
import type { Engine } from "@babylonjs/core/Engines/engine";
import { Geometry } from "@babylonjs/core/Meshes/geometry";
import { Buffer } from "@babylonjs/core/Meshes/buffer";
import { Vector3 } from "@babylonjs/core/Maths/";
import { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import { BoundingInfo } from "@babylonjs/core/Culling/boundingInfo.js";
import { DVESectionMeshes } from "@divinevoxel/vlox/Renderer";
import { DVEBabylonRenderer } from "../Renderer/DVEBabylonRenderer";
import { DVEBRMesh } from "./DVEBRMesh";
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

    for (const bufferKind in mesh.getVerticesDataKinds()) {
      mesh.removeVerticesData(bufferKind);
    }
    if (mesh.metadata.buffer && mesh.metadata.buffer instanceof Buffer) {
      mesh.metadata.buffer.dispose();
      mesh.metadata.buffer = null;
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
      const subMeshMaterial = meshData.materialId;
      found.add(subMeshMaterial);
      let mesh: Mesh;

      if (section.meshes.has(subMeshMaterial)) {
        mesh = section.meshes.get(subMeshMaterial) as Mesh;
      } else {
        if (!DVEBRSectionMeshes.meshCache.length) {
          const newMesh = new Mesh("", this.scene);
          newMesh.renderingGroupId = 1;
          newMesh.isPickable = false;
          newMesh.checkCollisions = false;
          newMesh.doNotSerialize = true;
          newMesh.metadata = { section: true, buffer: null };
          newMesh.alwaysSelectAsActiveMesh = true;
          const geometry = new Geometry(
            Geometry.RandomId(),
            this.scene,
            undefined,
            false,
            newMesh
          );

          geometry._boundingInfo = new BoundingInfo(
            new Vector3(0, 0, 0),
            new Vector3(0, 0, 0)
          );
          geometry.useBoundingInfoFromGeometry = true;
          newMesh.doNotSyncBoundingInfo = true;
          newMesh.setEnabled(false);
          newMesh.freezeWorldMatrix();
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

      mesh.unfreezeWorldMatrix();
      mesh.position.set(location[1], location[2], location[3]);
      mesh.computeWorldMatrix();
      if (mesh.metadata.buffer && mesh.metadata.buffer instanceof Buffer) {
        const buffer = mesh.metadata.buffer as Buffer;

        for (const bufferKind in mesh.getVerticesDataKinds()) {
          mesh.geometry!.removeVerticesData(bufferKind);
        }
        mesh.geometry!.releaseForMesh(mesh);
        mesh.metadata.buffer.dispose();
      }
      mesh.metadata.buffer = DVEBRMesh.UpdateVertexDataBuffers(
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
