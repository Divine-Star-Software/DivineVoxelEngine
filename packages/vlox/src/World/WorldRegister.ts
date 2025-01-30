import { WorldSpaces } from "./WorldSpaces.js";
import { Dimension } from "./Dimension/Dimension";
import { Sector, SectorData } from "./Sector/Sector.js";
import type { LocationData } from "../Math/index.js";
import { DimensionData } from "./Types/WorldData.types.js";
import { Vector3Like } from "@amodx/math";

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

const tempPosition = Vector3Like.Create();

class SectorPool {
  static _secotrs: Sector[] = [];
  static _enabled = false;
  static getSector() {
    if (!this._enabled) return Sector.CreateNew();
    if (this._secotrs.length) return this._secotrs.shift()!;
    return Sector.CreateNew();
  }
  static returnSector(secotr: Sector) {
    secotr.bufferView.fill(0);
  }
}

class WorldRegisterSectors {
  static setSecotrPool(enabled: boolean) {
    SectorPool._enabled = enabled;
    SectorPool._secotrs.length = 0;
  }
  static add(x: number, y: number, z: number, sector: SectorData) {
    WorldSpaces.sector.getPositionVec3Array(x, y, z, sector.position);
    const newSector = new Sector(sector);
    WorldRegister._currentDimension.sectors.set(
      WorldSpaces.hash.hashVec3Array(newSector.position),
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
    const sector = WorldRegister._currentDimension.sectors.get(
      WorldSpaces.hash.hashVec3(
        WorldSpaces.sector.getPosition(x, y, z, tempPosition)
      )
    );
    return sector || false;
  }
  static remove(x: number, y: number, z: number) {
    const position = WorldSpaces.sector.getPosition(x, y, z, tempPosition);
    const sectorKey = WorldSpaces.hash.hashVec3(position);
    const sector = WorldRegister._currentDimension.sectors.get(sectorKey);
    if (!sector) return false;
    if (SectorPool._enabled) SectorPool.returnSector(sector);
    WorldRegister._currentDimension.sectors.delete(sectorKey);
    WorldDataHooks.sectors.onRemove(
      [WorldRegister._currentDimension.id, position.x, position.y, position.z],
      sector
    );
    return true;
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
