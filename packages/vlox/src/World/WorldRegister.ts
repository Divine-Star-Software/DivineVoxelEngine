import { WorldSpaces } from "./WorldSpaces.js";
import { Dimension } from "./Dimension/Dimension";
import { Sector, SectorData } from "./Sector/Sector.js";
import type { LocationData } from "../Math/index.js";
import { DimensionData } from "./Types/WorldData.types.js";

class WorldDataHooks {
  static dimension = {
    onNew: (dimension: DimensionData): void => {},
    onRemove: (location: LocationData): void => {},
  };
  static sectors = {
    onNew: (location: LocationData, sector: SectorData): void => {},
    onRemove: (location: LocationData, sector: SectorData): void => {},
  };
}

class WorldRegisterDimensions {
  static add(id: string) {
    const dimesnion = Dimension.CreateNew(id);
    WorldRegister._dimensions.set(id, dimesnion);
    return dimesnion;
  }
  static get(id: string) {
    return WorldRegister._dimensions.get(id);
  }
}

class WorldRegisterSectors {
  static add(x: number, y: number, z: number, sector: SectorData) {
    const positon = WorldSpaces.sector.getPositionXYZ(x, y, z);
    const newSector = new Sector(sector);
    newSector.position[0] = positon.x;
    newSector.position[1] = positon.y;
    newSector.position[2] = positon.z;
    WorldRegister._currentDimension.sectors.set(
      WorldSpaces.sector.getKeyXYZ(positon.x, positon.y, positon.z),
      newSector
    );
    return newSector;
  }
  static new(x: number, y: number, z: number) {
    if (this.get(x, y, z)) return false;
    const sector = this.add(x, y, z, Sector.CreateNew())!;
    WorldDataHooks.sectors.onNew(
      [WorldRegister._currentDimension.id, x, y, z],
      sector
    );
    return true;
  }
  static get(x: number, y: number, z: number): false | Sector {
    const positon = WorldSpaces.sector.getPositionXYZ(x, y, z);
    const sector = WorldRegister._currentDimension.sectors.get(
      WorldSpaces.sector.getKeyXYZ(positon.x, positon.y, positon.z)
    );
    return sector || false;
  }
  static remove(x: number, y: number, z: number) {
    const positon = WorldSpaces.sector.getPositionXYZ(x, y, z);
    const sectorKey = WorldSpaces.sector.getKeyXYZ(
      positon.x,
      positon.y,
      positon.z
    );
    const sector = WorldRegister._currentDimension.sectors.get(sectorKey);
    if (!sector) return false;
    WorldRegister._currentDimension.sectors.delete(sectorKey);
    WorldDataHooks.sectors.onRemove(
      [WorldRegister._currentDimension.id, positon.x, positon.y, positon.z],
      sector
    );
    return sector;
  }
}

export class WorldRegister {
  static _dimensions = new Map<string, Dimension>();
  static _hooks = WorldDataHooks;
  static dimensions = WorldRegisterDimensions;
  static sectors = WorldRegisterSectors;

  static _currentDimension: Dimension;
  static setDimension(dimensionId: string) {
    let dimension = this.dimensions.get(dimensionId);
    if (!dimension) {
      dimension = this.dimensions.add(dimensionId);
    }
    this._currentDimension = dimension;
  }

  static clearAll() {
    this._dimensions.clear();
  }
}
