import { WorldSpaces } from "../../World/WorldSpaces";
import { LocationData } from "../../Math";
import { SectionMesh } from "./SectionMesh";
export class SectorMesh {
  sections: SectionMesh[] = [];
  constructor(public location: LocationData) {}

  getIndex(y: number) {
    const ry = y - this.location[2];
    const index = ry / WorldSpaces.section.bounds.y;
    return index;
  }
  getSection(y: number) {
    return this.sections[this.getIndex(y)];
  }
  addSection(y: number) {
    const index = this.getIndex(y);
    if (this.sections[index]) return this.sections[index];
    const section = new SectionMesh(this, index);
    this.sections[index] = section;
    return section;
  }
  removeSection(y: number) {
    const index = this.getIndex(y);
    if (!this.sections[index]) return false;
    const section = this.sections[index];
    delete this.sections[index];
    return section;
  }
}
