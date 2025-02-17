import type { SetSectionMeshTask } from "../Mesher/Types/Mesher.types";
import { MeshRegister } from "./MeshRegister.js";
import { LocationData } from "../Math/index.js";
import { DVESectionMeshes } from "./Classes/DVESectionMeshes";
import { CompactedSectionVoxelMesh } from "../Mesher/Geomtry/CompactedSectionVoxelMesh";
import { SectorMesh } from "./Classes/SectorMesh";
import { SectionMesh } from "./Classes/SectionMesh";
const added = new Set<string>();
const compacted = new CompactedSectionVoxelMesh();
const location: LocationData = [0, 0, 0, 0];
export class MeshManager {
  static _sectorPool: SectorMesh[] = [];
  static _sectionPool: SectionMesh[] = [];
  static sectorMeshes: DVESectionMeshes;
  static runningUpdate = false;
  static updateSection(data: SetSectionMeshTask) {
    compacted.setData(data);

    compacted.getLocation(location);

    let sector = MeshRegister.sectors.getAt(location);
    if (!sector) {
      sector = MeshRegister.sectors.addAt(location);
    }
    let section = sector.getSection(location[1], location[2], location[3]);
    if (!section) {
      section = sector.addSection(location[1], location[2], location[3]);
    }
    /* 
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

 */
    this.sectorMeshes.updateVertexData(section, compacted);
  }
  static removeSector(dimensionId: number, x: number, y: number, z: number) {
    const sector = MeshRegister.sectors.remove(dimensionId, x, y, z);
    if (!sector) return false;
    sector.dipose();
  }
  static removeSectorAt(data: LocationData) {
    return this.removeSector(...data);
  }
}
