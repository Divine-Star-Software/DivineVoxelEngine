import * as THREE from "three";
import type { Vector3Tuple } from "three";
import { Box3, Vector3 } from "three";

import type {
  NodeMeshData,
  DVENodeMeshAttributes,
} from "@divinevoxel/core/Interfaces/Render/Nodes/DVERenderNode.types.js";

import { DVEThreeRenderer } from "../../DVEThreeRenderer";
import { DVETRMesh } from "./DVETRMesh";
import { DVETRScene } from "Scene/DVETRScene";
import { DVENodeMesh } from "@divinevoxel/core/Interfaces/Render/Nodes/Meshes/DVENodeMesh";
import { EngineSettingsData } from "@divinevoxel/core/Types/EngineSettings.types";

export class DVETRNodeMesh extends DVENodeMesh {
  pickable = false;
  checkCollisions = false;
  serialize = false;
  clearCachedGeometry = true;
  defaultBoundingBox: Box3;
  scene: DVETRScene;

  constructor(public data: NodeMeshData) {
    super(data);
    this.defaultBoundingBox = new Box3(new Vector3(), new Vector3(16, 16, 16));
    this.scene = DVEThreeRenderer.instance.scene; // Assuming DVEThreeRenderer.scene is a THREE.Scene
  }

  createMesh(location: Vector3Tuple, data: DVENodeMeshAttributes) {
    const geometry = new THREE.BufferGeometry();

    const mat = DVEThreeRenderer.instance.nodes.materials.get(this.data.id);
    if (!mat) {
      throw new Error(`Material: ${this.data.id} does not exist`);
    }

    // Set positions, normals, and any other attributes

    // Create and configure the mesh
    const mesh = new THREE.Mesh(geometry, mat._material);
    mesh.position.set(location[0], location[1], location[2]);
    mesh.visible = true; // Equivalent to mesh.setEnabled(true) and mesh.isVisible = true in BabylonJS
    this.scene._scene.add(mesh);

    const dveMesh = new DVETRMesh(this.scene); // Assuming DVETRMesh is adapted to work with Three.js
    dveMesh._mesh = mesh; // This would be different as THREE.Mesh does not have an _mesh property, adjust according to your DVETRMesh definition
    this.updateVertexData(location, data, dveMesh);
    return dveMesh;
  }

  returnMesh(mesh: DVETRMesh) {
    mesh._mesh.geometry.dispose();
    !Array.isArray(mesh._mesh.material)
      ? mesh._mesh.material.dispose()
      : mesh._mesh.material.forEach((_) => _.dispose());
    mesh._mesh.removeFromParent();
  }

  updateVertexData(
    location: Vector3Tuple,
    data: DVENodeMeshAttributes,
    dveMesh: DVETRMesh
  ) {
    const mesh = dveMesh._mesh;
    mesh.position.set(location[0], location[1], location[2]);
    const geometry = mesh.geometry;
    data.forEach(([id, attribute, stride]) => {
      if (id === "position") {
        geometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(attribute, 3)
        );
      } else if (id === "normal") {
        geometry.setAttribute(
          "normal",
          new THREE.Float32BufferAttribute(attribute, 3)
        );
      } else if (id === "indices") {
        geometry.setIndex(new THREE.Uint16BufferAttribute(attribute, 1));
      } else {
        if (attribute.BYTES_PER_ELEMENT == 4) {
          geometry.setAttribute(
            id,
            new THREE.Float32BufferAttribute(attribute, stride)
          );
        }
        if (attribute.BYTES_PER_ELEMENT == 2) {
          geometry.setAttribute(
            id,
            new THREE.Uint16BufferAttribute(attribute, stride)
          );
        }
        if (attribute.BYTES_PER_ELEMENT == 1) {
          geometry.setAttribute(
            id,
            new THREE.Uint8BufferAttribute(attribute, stride)
          );
        }
      }
    });

    // Update geometry attributes if needed. Similar logic as in createMesh can be applied here.
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

  _clearCached(dveMesh: DVETRMesh) {
    if (!this.clearCachedGeometry) return;
    const mesh = dveMesh._mesh;
  }
}
