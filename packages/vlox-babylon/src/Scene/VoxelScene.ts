import { BoundingBox } from "@babylonjs/core/Culling/boundingBox";
import { BoundingInfo } from "@babylonjs/core/Culling/boundingInfo";
import { MultiMaterial } from "@babylonjs/core/Materials/multiMaterial";
import { Scene } from "@babylonjs/core/scene";
import { SubMesh } from "@babylonjs/core/Meshes/subMesh";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { CompactedMeshData } from "@divinevoxel/vlox/Mesher/Geomtry/CompactedSectionVoxelMesh";
import { VoxelPalettesRegister } from "@divinevoxel/vlox/Voxels/Data/VoxelPalettesRegister";
import { DVEBabylonRenderer } from "../Renderer/DVEBabylonRenderer";
import { BufferAllocation, BufferMesh } from "../Meshes/VoxelScene/BufferMesh";
import { SubBufferMesh } from "../Meshes/VoxelScene/SubBufferMesh";
import { VoxelMeshVertexStructCursor } from "@divinevoxel/vlox/Mesher/Geomtry/VoxelMeshVertexStructCursor";
import { WorldSpaces } from "@divinevoxel/vlox/World/WorldSpaces";
import { MeshRegister } from "@divinevoxel/vlox/Renderer/MeshRegister";
import { SceneOptions } from "./SceneOptions";


const min = Vector3.Zero();
const max = new Vector3(16, 16, 16);
const boundingBox = new BoundingBox(min, max);


export class VoxelScene {
  _material: MultiMaterial;
  _meshBuffers: BufferMesh[] = [];

  active = new Map<SubMesh, SubBufferMesh>();
  options: SceneOptions;
  constructor(public renderer: DVEBabylonRenderer) {
    this.options = new SceneOptions(renderer.scene);
  }
  init(scene: Scene) {
    const multiMaterial = new MultiMaterial("Voxel Scene Material", scene);
    for (let i = 0; i < VoxelPalettesRegister.material._palette.length; i++) {
      multiMaterial.subMaterials.push(
        this.renderer.materials.get(VoxelPalettesRegister.material._palette[i])!
          ._material
      );
    }

    scene.registerBeforeRender(() => {
      this.render();
    });
    this._material = multiMaterial;
    this._addBufferMesh();
  }

  _addBufferMesh() {
    const mesh = new BufferMesh(this, 10_000_000);
    this._meshBuffers.push(mesh);
    return mesh;
  }

  removeMesh(mesh: SubBufferMesh) {
    const bufferMesh = mesh.allocation._bufferMesh;

    mesh.setEnabled(false);
    mesh.mesh.dispose();
    (mesh as any).mesh = null;
    bufferMesh.deallocate(mesh.allocation);
    return null;
  }

  updateMesh(
    subBufferMesh: SubBufferMesh,
    data: CompactedMeshData
  ): SubBufferMesh | null {
    const bufferMesh = subBufferMesh.allocation._bufferMesh;
    if (
      data.vertexCount > subBufferMesh.verticesCount ||
      data.indexCount > subBufferMesh.indicesCount
    ) {
      this.removeMesh(subBufferMesh);

      return null;
    }

    const minBounds = data.minBounds;
    const maxBounds = data.maxBounds;

    min.x = minBounds[0] + subBufferMesh.transform.position.x;
    min.y = minBounds[1] + subBufferMesh.transform.position.y;
    min.z = minBounds[2] + subBufferMesh.transform.position.z;
    max.x = maxBounds[0] + subBufferMesh.transform.position.x;
    max.y = maxBounds[1] + subBufferMesh.transform.position.y;
    max.z = maxBounds[2] + subBufferMesh.transform.position.z;

    subBufferMesh.mesh.indexCount = data.indexCount;
    subBufferMesh.mesh.verticesCount = data.vertexCount;
    subBufferMesh.mesh.getBoundingInfo().reConstruct(min, max);
    for (let i = 0; i < data.indices.length; i++) {
      data.indices[i] += subBufferMesh.verticesStart;
    }
    bufferMesh.writeBuffers(
      subBufferMesh.allocation,
      data.verticies,
      data.indices
    );

    return subBufferMesh;
  }

  addMesh(
    data: CompactedMeshData,
    x: number,
    y: number,
    z: number
  ): SubBufferMesh {
    let allocation: BufferAllocation | null = null;
    for (let i = 0; i < this._meshBuffers.length; i++) {
      allocation = this._meshBuffers[i].allocate(
        data.vertexCount,
        data.indexCount
      );
      if (allocation) break;
    }
    if (!allocation) {
      allocation = this._addBufferMesh().allocate(
        data.vertexCount,
        data.indexCount
      );
      if (!allocation) {
        throw new Error(`Error making new buffer mesh and allocating`);
      }
    }

    const subBufferMesh = new SubBufferMesh();
    subBufferMesh.allocation = allocation;
    const bufferMesh = allocation._bufferMesh;
    const totalVertices =
      data.verticies.length / VoxelMeshVertexStructCursor.VertexFloatSize;
    const totalIndicies = data.indices.length;

    subBufferMesh.verticesCount = totalVertices;
    subBufferMesh.verticesStart = allocation.verticesStart;
    subBufferMesh.indicesCount = totalIndicies;
    subBufferMesh.indicesStart = allocation.indicesStart;

    subBufferMesh.mesh = new SubMesh(
      data.material,
      subBufferMesh.verticesStart,
      subBufferMesh.verticesCount,
      subBufferMesh.indicesStart,
      subBufferMesh.indicesCount,
      bufferMesh,
      undefined,
      false
      // false
    );

    const scene = bufferMesh.voxelScene.renderer.scene;
    subBufferMesh.transform = new TransformNode("", scene) as any;
    subBufferMesh.transform.position.set(x, y, z);
    subBufferMesh.transform.computeWorldMatrix();

    for (
      let i = 0;
      i < bufferMesh.voxelScene.renderer.scene.rootNodes.length;
      i++
    ) {
      if (scene.rootNodes[i] == subBufferMesh.transform) {
        scene.rootNodes.splice(i, 1);
        break;
      }
    }

    for (let i = 0; i < data.indices.length; i++) {
      data.indices[i] += subBufferMesh.verticesStart;
    }

    const minBounds = data.minBounds;
    const maxBounds = data.maxBounds;

    min.x = minBounds[0] + x;
    min.y = minBounds[1] + y;
    min.z = minBounds[2] + z;

    max.x = maxBounds[0] + x;
    max.y = maxBounds[1] + y;
    max.z = maxBounds[2] + z;

    subBufferMesh.mesh.setBoundingInfo(new BoundingInfo(min, max));
    bufferMesh.writeBuffers(
      subBufferMesh.allocation,
      data.verticies,
      data.indices
    );
    return subBufferMesh;
  }

  beforRender() {
    const camera = this.renderer.scene.activeCamera;
    if (!camera) return;

    for (const [, dimension] of MeshRegister._dimensions) {
      for (const [, sector] of dimension) {
        min.set(sector.position[0], sector.position[1], sector.position[2]);
        max.set(
          sector.position[0] + WorldSpaces.sector.bounds.x,
          sector.position[1] + WorldSpaces.sector.bounds.y,
          sector.position[2] + WorldSpaces.sector.bounds.z
        );
        boundingBox.reConstruct(min, max);
        const sectorVisible = camera.isInFrustum(boundingBox);
        for (const section of sector.sections) {
          if (!section) continue;
          for (const [key, mesh] of section.meshes as Map<
            string,
            SubBufferMesh
          >) {
            if (!mesh.mesh) continue;
            if (!sectorVisible) {
              if (mesh.isEnabled()) mesh.setEnabled(false);
              continue;
            }
            if (camera.isInFrustum(mesh.mesh.getBoundingInfo())) {
              if (!mesh.isEnabled()) mesh.setEnabled(true);
            } else {
              if (mesh.isEnabled()) mesh.setEnabled(false);
            }
          }
        }
      }
    }
  }

  render() {
    let totalMeshes = 0;
    for (let i = 0; i < this._meshBuffers.length; i++) {
      const mesh = this._meshBuffers[i];
      for (const sub of mesh.subMeshes) {
        totalMeshes++;
      }
    }
  }
}
