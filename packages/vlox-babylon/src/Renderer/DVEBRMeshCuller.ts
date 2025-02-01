import { BoundingBox, Mesh, Scene, Vector3 } from "@babylonjs/core";
import { MeshRegister } from "@divinevoxel/vlox/Renderer/MeshRegister";
import { WorldSpaces } from "@divinevoxel/vlox/World//WorldSpaces";
const min = new Vector3();
const max = new Vector3(16, 16, 16);
const boundingBox = new BoundingBox(min, max);

const removedMeshes: Mesh[] = [];
function CullSectors(scene: Scene) {
  const camera = scene.activeCamera;
  if (!camera) return;

  for (const [, dimension] of MeshRegister._dimensions) {
    for (const [, sector] of dimension) {
      min.set(sector.location[1], sector.location[2], sector.location[3]);
      max.set(
        sector.location[1] + WorldSpaces.sector.bounds.x,
        sector.location[2] + WorldSpaces.sector.bounds.y,
        sector.location[3] + WorldSpaces.sector.bounds.z
      );
      boundingBox.reConstruct(min, max);
      const sectorVisible = camera.isInFrustum(boundingBox);
      for (const section of sector.sections) {
        if (!section) continue;
        for (const [key, mesh] of section.meshes as Map<string, Mesh>) {
          if (!sectorVisible) {
            if (mesh.isEnabled()) {
              mesh.setEnabled(false);
              removedMeshes.push(mesh);
            }
            continue;
          }
          if (camera.isInFrustum(mesh)) {
            if (!mesh.isEnabled()) {
              mesh.setEnabled(true);
              scene.meshes.push(mesh);
            }
          } else {
            if (mesh.isEnabled()) {
              mesh.setEnabled(false);
              removedMeshes.push(mesh);
            }
          }
        }
      }
    }
  }

  for (let i = scene.meshes.length - 1; i > -1; i--) {
    if (removedMeshes.includes(scene.meshes[i] as Mesh)) {
      scene.meshes.splice(i, 1);
    }
  }
  removedMeshes.length = 0;
}

export class DVEBRMeshCuller {
  init(scene: Scene) {
    scene.freezeActiveMeshes();
    scene.registerBeforeRender(() => {
      CullSectors(scene);
    });
  }
}
