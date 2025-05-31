import { Flat3DIndex, Vector3Like } from "@amodx/math";
import { LocationData } from "../../Math";
import { WorldSpaces } from "../WorldSpaces";
import { Section } from "../Section/Section";
import { WorldRegister } from "../WorldRegister";

export interface SectionSnapShotTransferData {
  location: LocationData;
  sections: Uint8Array[];
}

export class SectionSnapShot {
  sections: Uint8Array[] = [];
  location: LocationData = [0, 0, 0, 0];
  index = Flat3DIndex.GetXYZOrder();
  private _buffers: ArrayBuffer[] = [];
  constructor() {
    this.index.setBounds(3, 3, 3);
    let totalSections = this.index.size;
    while (totalSections--) {
      const buffer = new ArrayBuffer(Section.GetBufferSize());
      this.sections.push(new Uint8Array(buffer));
      this._buffers.push(buffer);
    }
  }

  setLocation([dimension, x, y, z]: LocationData) {
    this.location[0] = dimension;
    this.location[1] = x;
    this.location[2] = y;
    this.location[3] = z;
  }

  storeSnapShot() {
    const { x: sizeX, y: sizeY, z: sizeZ } = WorldSpaces.section.bounds;
    const [dim, ox, oy, oz] = this.location;
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        for (let z = 0; z < 3; z++) {
          const wx = ox + (x - 1) * sizeX;
          const wy = oy + (y - 1) * sizeY;
          const wz = oz + (z - 1) * sizeZ;
          const snapShotSection =
            this.sections[this.index.getIndexXYZ(x, y, z)];
          if (!WorldSpaces.world.inBounds(wx, wy, wz)) {
            snapShotSection.fill(0);
            continue;
          }
          const sector = WorldRegister.sectors.get(dim, wx, wy, wz);
          if (!sector) {
            snapShotSection.fill(0);
            continue;
          }
          snapShotSection.set(sector.getSection(wx, wy, wz).view);
        }
      }
    }
  }

  private _isTransfered = false;

  isTransfered() {
    return this._isTransfered;
  }

  transfer(): [SectionSnapShotTransferData, ArrayBuffer[]] {
    this._isTransfered = true;
    return [
      {
        location: [...this.location],
        sections: [...this.sections],
      },
      this._buffers,
    ];
  }

  restore(data: SectionSnapShotTransferData) {
    this.sections = data.sections;
    this.location = data.location;
    this._buffers = [];
    this._isTransfered = false;
    for (let i = 0; i < this.sections.length; i++) {
      this._buffers.push(this.sections[i].buffer as ArrayBuffer);
    }
  }
}
