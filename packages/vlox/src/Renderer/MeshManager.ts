import { SetSectionMeshTask } from "../Renderer/Renderer.types";
import { MeshRegister } from "./MeshRegister.js";
import { LocationData } from "../Math/index.js";
import { VoxelEffectRegister } from "../Voxels/Effects/VoxelEffectRegister.js";
import { DVESectionMeshes } from "./Classes/DVESectionMeshes";
const added = new Set<string>();
export class MeshManager {
  static sectorMeshes: DVESectionMeshes;
  static runningUpdate = false;
  static updateSection(data: SetSectionMeshTask) {
    const location = data[0];
    const sections = data[1];
    const effects = data[2];
    let sector = MeshRegister.sectors.get(location);
    if (!sector) {
      sector = MeshRegister.sectors.add(location);
    }
    let section = sector.getSection(location[2]);
    if (!section) {
      section = sector.addSection(location[2]);
    }

    added.clear();
    for (const [id, points] of effects) {
      added.add(id);
      if (!section.effects.has(id)) {
        const EffectClass = VoxelEffectRegister.get(id);
        const newEffect = new EffectClass(section);
        newEffect.init();
        newEffect.setPoints(points);
        section.effects.set(id, newEffect);
      } else {
        const effect = section.effects.get(id)!;
        effect.setPoints(points);
      }
    }
    for (const [key, effect] of section.effects) {
      if (!added.has(key)) {
        effect.dispose();
        section.effects.delete(key);
      }
    }

    if (sections[0] == 0) {
      this.sectorMeshes.updateVertexData(
        section,
        [location[1], location[2], location[3]],
        sections
      );
    }
  }
  static removeSector(data: LocationData) {
    const sector = MeshRegister.sectors.remove(data);
    if (!sector) return false;
    for (const section of sector.sections) {
      if (!section) continue;
      section.dispose();
      for (const [, mesh] of section.meshes) {
        this.sectorMeshes.returnMesh(mesh);
      }
      section.meshes.clear();
    }
  }
}
