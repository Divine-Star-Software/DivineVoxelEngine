import { WorldSpaces } from "../../World/WorldSpaces";
import { SectionMesh } from "./SectionMesh";
import { MeshManager } from "../MeshManager";
import { Vec3Array } from "@amodx/math";

export class SectorMesh {
  sections: (SectionMesh | null)[] = new Array(
    WorldSpaces.sector.sectionVolumne
  ).fill(null);
  position: Vec3Array = [0, 0, 0];

  dipose() {
    MeshManager._sectorPool.push(this);
    for (const section of this.sections) {
      if (!section) continue;
      section.dispose();
    }
    this.sections.fill(null);
  }
  getSection(x: number, y: number, z: number) {
    return this.sections[WorldSpaces.section.getIndex(x, y, z)];
  }
  addSection(x: number, y: number, z: number) {
    const index = WorldSpaces.section.getIndex(x, y, z);
    if (this.sections[index]) return this.sections[index];
    const section = MeshManager._sectionPool.length
      ? MeshManager._sectionPool.shift()!
      : new SectionMesh();
    section.sector = this;
    section.index = index;
    this.sections[index] = section;
    return section;
  }
  removeSection(x: number, y: number, z: number) {
    const index = WorldSpaces.section.getIndex(x, y, z);
    if (!this.sections[index]) return false;
    const section = this.sections[index];
    this.sections[index] = null;
    return section;
  }
}
