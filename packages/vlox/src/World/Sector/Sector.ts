import { RemoteBinaryStruct } from "@amodx/binary/";
import { Section, VoxelDataArrays } from "../Section/Section.js";
import { Vec3Array } from "@amodx/math";
import { WorldSpaces } from "../WorldSpaces";
export interface SectorData {
  position: Vec3Array;
  buffer: ArrayBufferLike;
  sections: VoxelDataArrays[];
}
export interface Sector extends SectorData {}
function forceMultipleOf2(n: number): number {
  return n % 2 === 0 ? n : n + 1;
}
export class Sector {
  static StateStruct = new RemoteBinaryStruct("sector-tags");
  static GetHeaderSize() {
    return forceMultipleOf2(Sector.StateStruct.structSize);
  }
  static GetBufferSize() {
    const totalSections =
      WorldSpaces.sector.bounds.y / WorldSpaces.section.bounds.y;
    return this.GetHeaderSize() + Section.GetBufferSize() * totalSections;
  }
  static CreateNew(): SectorData {
    const buffer = new SharedArrayBuffer(this.GetBufferSize());
    Sector.StateStruct.setBuffer(buffer);
    Sector.StateStruct.setProperty("dve_is_stored", 0);
    const sections: VoxelDataArrays[] = [];
    const totalSections =
      WorldSpaces.sector.bounds.y / WorldSpaces.section.bounds.y;
    for (let i = 0; i < totalSections; i++) {
      sections[i] = Section.CreateNew(i, buffer);
    }

    return {
      position: [0, 0, 0],
      buffer,
      sections,
    };
  }

  sections: Section[] = [];
  bufferView: Uint8Array;
  sectorState: DataView;
  position: Vec3Array;

  constructor(data: SectorData) {
    this.position = data.position;
    this.sectorState = new DataView(data.buffer);
    this.buffer = data.buffer;
    this.bufferView = new Uint8Array(data.buffer);
    for (let i = 0; i < data.sections.length; i++) {
      this.sections[i] = new Section(this, i, data.sections[i]);
    }
  }

  getSection(y: number) {
    const ry = y - this.position[1];
    const index = ry / WorldSpaces.section.bounds.y;
    return this.sections[index];
  }

  toJSON(): SectorData {
    const sections: VoxelDataArrays[] = [];
    for (const section of this.sections) {
      sections.push(section.serialize());
    }
    return {
      position: this.position,
      buffer: this.buffer,
      sections,
    };
  }
}
