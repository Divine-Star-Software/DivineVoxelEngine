import { WorldSpaces } from "./WorldSpaces.js";
import { Dimension } from "./Dimension/Dimension";
import { Sector, SectorData } from "./Sector/Sector.js";
import type { LocationData } from "../Math/index.js";
import { DimensionSyncData } from "./Types/WorldData.types.js";
import { Vector3Like } from "@amodx/math";

class WorldDataHooks {
  static dimension = {
    onNew: (dimension: DimensionSyncData): void => {},
    onRemove: (location: LocationData): void => {},
  };
  static sectors = {
    onNew: (location: LocationData, sector: SectorData): void => {},
    onRemove: (location: LocationData, sector: SectorData): void => {},
  };
}

class WorldRegisterDimensions {
  static add(index: number, id: string = "") {
    const dimesnion = Dimension.CreateNew(index, id);
    WorldRegister._dimensions.set(index, dimesnion);
    WorldDataHooks.dimension.onNew(dimesnion.getData());
    return dimesnion;
  }
  static get(index: number) {
    return WorldRegister._dimensions.get(index);
  }
}

const tempPosition = Vector3Like.Create();

class SectorPool {
  static _secotrs: SectorData[] = [];
  static _enabled = false;
  static getSector() {
    if (!this._enabled) return Sector.CreateNew();
    if (this._secotrs.length) return this._secotrs.shift()!;
    return Sector.CreateNew();
  }
  static returnSector(secotr: Sector) {
    secotr.bufferView.fill(0);
    this._secotrs.push(secotr.toJSON());
  }
}

class WorldRegisterSectors {
  static setSecotrPool(enabled: boolean) {
    SectorPool._enabled = enabled;
    SectorPool._secotrs.length = 0;
  }
  static add(
    dimensionId: number,
    x: number,
    y: number,
    z: number,
    sector: SectorData
  ) {
    let dimension = WorldRegister.dimensions.get(dimensionId);
    if (!dimension) dimension = WorldRegister.dimensions.add(dimensionId);

    const newSector = new Sector(
      sector,
      WorldSpaces.sector.getPositionVec3Array(x, y, z)
    );
    dimension.sectors.set(
      WorldSpaces.hash.hashVec3Array(newSector.position),
      newSector
    );
    return newSector;
  }
  static addAt(location: LocationData, sector: SectorData) {
    return this.add(...location, sector);
  }
  static new(dimensionId: number, x: number, y: number, z: number) {
    if (this.get(dimensionId, x, y, z)) return false;
    let dimension = WorldRegister.dimensions.get(dimensionId);
    if (!dimension) dimension = WorldRegister.dimensions.add(dimensionId);
    const sector = this.add(dimensionId, x, y, z, SectorPool.getSector())!;
    WorldDataHooks.sectors.onNew([dimensionId, x, y, z], sector);
    return true;
  }
  static newAt(location: LocationData) {
    return this.new(...location);
  }
  static get(
    dimensionId: number,
    x: number,
    y: number,
    z: number
  ): null | Sector {
    let dimension = WorldRegister.dimensions.get(dimensionId);
    if (!dimension) return null;
    const sector = dimension.sectors.get(
      WorldSpaces.hash.hashVec3(
        WorldSpaces.sector.getPosition(x, y, z, tempPosition)
      )
    );
    return sector || null;
  }
  static getAt(location: LocationData) {
    return this.get(...location);
  }
  static remove(dimensionId: number, x: number, y: number, z: number) {
    let dimension = WorldRegister.dimensions.get(dimensionId);
    if (!dimension) return false;
    const position = WorldSpaces.sector.getPosition(x, y, z, tempPosition);
    const sectorKey = WorldSpaces.hash.hashVec3(position);
    const sector = dimension.sectors.get(sectorKey);
    if (!sector) return false;
    if (SectorPool._enabled) SectorPool.returnSector(sector);
    WorldDataHooks.sectors.onRemove(
      [dimensionId, position.x, position.y, position.z],
      sector
    );
    dimension.sectors.delete(sectorKey);
    return true;
  }
  static removeAt(location: LocationData) {
    return this.remove(...location);
  }
}

export class WorldRegister {
  static _dimensions = new Map<number, Dimension>([
    [0, new Dimension(Dimension.CreateNew(0, "main"))],
  ]);
  static _hooks = WorldDataHooks;
  static dimensions = WorldRegisterDimensions;
  static sectors = WorldRegisterSectors;

  static clearAll() {
    this._dimensions.clear();
  }
}
