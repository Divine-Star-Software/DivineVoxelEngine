import { Flat3DIndex, Vector3Like } from "@amodx/math";
import { WorldSpaces } from "../WorldSpaces";
import { DataCursorInterface } from "../../Voxels/Cursor/DataCursor.interface";
import { SectionSnapShot } from "./SectionSnapShot";
import { Sector } from "../Sector";
import { SectorCursor } from "../Cursor/SectorCursor";
import { SectionCursor } from "../Cursor/SectionCursor";

const tempPosition = Vector3Like.Create();
export class SectionSnapshotCursor implements DataCursorInterface {
  origin = Vector3Like.Create();
  sectorOrigin = Vector3Like.Create();
  dimension = 0;

  sectors: Sector[] = [];
  cursors: SectorCursor[] = [];
  index = Flat3DIndex.GetXYZOrder();
  
  constructor() {
    this.index.setBounds(3, 3, 3);
    const { x: sizeX, y: sizeY, z: sizeZ } = WorldSpaces.sector.bounds;

    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        for (let z = 0; z < 3; z++) {
          if (
            !WorldSpaces.world.inBounds(
              (x - 1) * sizeX,
              (y - 1) * sizeY,
              (z - 1) * sizeZ
            )
          )
            continue;
          const sectorIndex = this.index.getIndexXYZ(x, y, z);
          const sector = new Sector();
          sector.setBuffer(Sector.CreateNewBuffer());
          const cursor = new SectorCursor();
          cursor.setSector(sector);
          this.sectors[sectorIndex] = sector;
          this.cursors[sectorIndex] = cursor;
        }
      }
    }
  }

  private _snapShot: SectionSnapShot;
  private _centeralCursor = new SectionCursor();
  getCenteralCursor() {
    const [dim, x, y, z] = this._snapShot.location;

    const sector = this.sectors[this.getSectorIndex(x, y, z)];

    if (!sector) return null;
    const section = sector.getSection(x, y, z);

    if (!section) return null;
    this._centeralCursor.setSection(section);
    return this._centeralCursor;
  }

  setSectionSnapShot(snapShot: SectionSnapShot) {
    this._snapShot = snapShot;
    const {
      x: sectorSizeX,
      y: sectorSizeY,
      z: sectorSizeZ,
    } = WorldSpaces.sector.bounds;
    this.origin.x = snapShot.location[1];
    this.origin.y = snapShot.location[2];
    this.origin.z = snapShot.location[3];

    this.sectorOrigin.x = this.origin.x;
    this.sectorOrigin.y = this.origin.y;
    this.sectorOrigin.z = this.origin.z;
    WorldSpaces.sector.transformPosition(this.sectorOrigin);

    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        for (let z = 0; z < 3; z++) {
          const sectorIndex = this.index.getIndexXYZ(x, y, z);
          const sector = this.sectors[sectorIndex];
          if (!sector) continue;
          const secotrPosition = WorldSpaces.sector.getPosition(
            this.sectorOrigin.x + (x - 1) * sectorSizeX,
            this.sectorOrigin.y + (y - 1) * sectorSizeY,
            this.sectorOrigin.z + (z - 1) * sectorSizeZ,
            tempPosition
          );
          sector.position[0] = secotrPosition.x;
          sector.position[1] = secotrPosition.y;
          sector.position[2] = secotrPosition.z;
          this.cursors[sectorIndex].setSector(sector);
        }
      }
    }

    const {
      x: sectionSizeX,
      y: sectionSizeY,
      z: sectionSizeZ,
    } = WorldSpaces.section.bounds;
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        for (let z = 0; z < 3; z++) {
          const sectionX = this.origin.x + (x - 1) * sectionSizeX;
          const sectionY = this.origin.y + (y - 1) * sectionSizeY;
          const sectionZ = this.origin.z + (z - 1) * sectionSizeZ;
          if (!WorldSpaces.world.inBounds(sectionX, sectionY, sectionZ))
            continue;
          const sectorIndex = this.getSectorIndex(sectionX, sectionY, sectionZ);
          const sector = this.sectors[sectorIndex];
          if (!sector) continue;
          const section = sector.getSection(sectionX, sectionY, sectionZ);
          section.updatePosition();
          section.view.set(
            snapShot.sections[snapShot.index.getIndexXYZ(x, y, z)]
          );
        }
      }
    }
  }

  protected getSectorIndex(x: number, y: number, z: number) {
    const sectorPos = WorldSpaces.sector.getPosition(x, y, z, tempPosition);
    return this.index.getIndexXYZ(
      (sectorPos.x - this.sectorOrigin.x) / WorldSpaces.sector.bounds.x + 1,
      (sectorPos.y - this.sectorOrigin.y) / WorldSpaces.sector.bounds.y + 1,
      (sectorPos.z - this.sectorOrigin.z) / WorldSpaces.sector.bounds.z + 1
    );
  }

  inBounds(x: number, y: number, z: number) {
    return WorldSpaces.world.inBounds(x, y, z);
  }

  getVoxel(x: number, y: number, z: number) {
    const sector = this.cursors[this.getSectorIndex(x, y, z)];
    if (!sector) return null;
    return sector.getVoxel(x, y, z);
  }

  clone() {
    return new SectionSnapshotCursor();
  }
}
