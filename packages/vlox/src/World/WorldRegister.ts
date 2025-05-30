import { WorldSpaces } from "./WorldSpaces.js";
import { Dimension } from "./Dimension/Dimension";
import { Sector, SectorData } from "./Sector/Sector.js";
import type { LocationData } from "../Math/index.js";
import { DimensionSyncData } from "./Types/WorldData.types.js";
import { Vector3Like } from "@amodx/math";
import { Section } from "./Section/Section.js";
import { EngineSettings } from "../Settings/EngineSettings.js";

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
  static _dimensionMap = new Map<string, number>([["main", 0]]);
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

class WorldRegisterPools {
  static _sectorBuffers: ArrayBufferLike[] = [];
  static _sectors: Sector[] = [];
  static _sections: Section[] = [];
  static _sectorBufferEnabled = false;
  static getSector() {
    if (!this._sectorBufferEnabled) return Sector.CreateNewBuffer();
    if (this._sectorBuffers.length) return this._sectorBuffers.shift()!;
    return Sector.CreateNewBuffer();
  }
  static returnSector(sector: Sector) {
    if (this._sectorBufferEnabled) {
      sector.bufferView.fill(0);
      this._sectorBuffers.push(sector.buffer);
    }
    this._sectors.push(sector);
    sector.clear();
    for (let i = 0; i < sector.sections.length; i++) {
      sector.sections[i].clear();
      this._sections.push(sector.sections[i]);
    }
    sector.setReleased(true);
  }
}

class WorldRegisterSectors {
  static setSecotrBufferPool(enabled: boolean) {
    WorldRegisterPools._sectorBufferEnabled = enabled;
    WorldRegisterPools._sectorBuffers.length = 0;
  }
  static add(
    dimensionId: number,
    x: number,
    y: number,
    z: number,
    sector: ArrayBufferLike
  ) {
    let dimension = WorldRegister.dimensions.get(dimensionId);
    if (!dimension) dimension = WorldRegister.dimensions.add(dimensionId);

    const newSector = WorldRegisterPools._sectors.length
      ? WorldRegisterPools._sectors.shift()!
      : new Sector();
    newSector.setReleased(false);
    WorldSpaces.sector.getPositionVec3Array(x, y, z, newSector.position);
    newSector.setBuffer(sector);

    dimension.sectors.set(
      WorldSpaces.hash.hashVec3Array(newSector.position),
      newSector
    );
    return newSector;
  }
  static addAt(location: LocationData, sector: ArrayBufferLike) {
    return this.add(...location, sector);
  }
  static new(dimensionId: number, x: number, y: number, z: number) {
    if (this.get(dimensionId, x, y, z)) return false;
    let dimension = WorldRegister.dimensions.get(dimensionId);
    if (!dimension) dimension = WorldRegister.dimensions.add(dimensionId);
    const sector = this.add(
      dimensionId,
      x,
      y,
      z,
      WorldRegisterPools.getSector()
    )!;
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

  static remove(
    dimensionId: number,
    x: number,
    y: number,
    z: number
  ): ArrayBuffer | null {
    let dimension = WorldRegister.dimensions.get(dimensionId);
    if (!dimension) return null;
    const position = WorldSpaces.sector.getPosition(x, y, z, tempPosition);
    const sectorKey = WorldSpaces.hash.hashVec3(position);
    const sector = dimension.sectors.get(sectorKey);
    if (!sector) return null;
    WorldDataHooks.sectors.onRemove(
      [dimensionId, position.x, position.y, position.z],
      sector
    );

    if (
      !EngineSettings.settings.memoryAndCPU.useSharedMemory &&
      WorldRegister.proxy == true
    ) {
      dimension.sectors.delete(sectorKey);
      return sector.buffer as ArrayBuffer;
    }
    WorldRegisterPools.returnSector(sector);
    dimension.sectors.delete(sectorKey);
    return null;
  }

  static removeAt(location: LocationData) {
    return this.remove(...location);
  }
}

export class WorldRegister {
  static proxy = false;
  static _pools = WorldRegisterPools;
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
