import { WorldSpaces } from "../../World/WorldSpaces";
import { LocationData } from "../../Math";
import { SectionMesh } from "./SectionMesh";
export class SectorMesh {
  sections: SectionMesh[] = [];
  constructor(public location: LocationData) {}

  getSection(x: number, y: number, z: number) {
    return this.sections[WorldSpaces.section.getIndex(x, y, z)];
  }
  addSection(x: number, y: number, z: number) {
    const index = WorldSpaces.section.getIndex(x, y, z);
    if (this.sections[index]) return this.sections[index];
    const section = new SectionMesh(this, index);
    this.sections[index] = section;
    return section;
  }
  removeSection(x: number, y: number, z: number) {
    const index = WorldSpaces.section.getIndex(x, y, z);
    if (!this.sections[index]) return false;
    const section = this.sections[index];
    delete this.sections[index];
    return section;
  }
}
