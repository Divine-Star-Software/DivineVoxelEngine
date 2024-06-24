import { Chunk, Column } from "./Classes/index.js";
import { WorldBounds } from "@divinevoxel/core/Data/World/WorldBounds.js";
import {
  Flat3DIndex,
  Vec3Array,
  Vector3Like,
} from "@amodx/math";
import {

  type LocationData,
} from "@divinevoxel/core/Math";
import { EngineSettings } from "@divinevoxel/core/Data/Settings/EngineSettings.js";
function vector3Hash(x: number, y: number, z: number) {
  const xHash = Math.abs(x * 73856093) | 0;
  const yHash = Math.abs(y * 19349663) | 0;
  const zHash = Math.abs(z * 83492791) | 0;
  return xHash ^ yHash ^ zHash;
}

export class WorldRegisterCache {
  _cacheOn = false;
  _chunkCache = new Map<number, Chunk>();
  _columnCache = new Map<number, Column>();

  chunkSpaceIndex = Flat3DIndex.GetXZYOrder();
  columnSpaceIndex = Flat3DIndex.GetXZYOrder();
  worldSize = Vector3Like.Create();
  chunkSize = Vector3Like.Create();
  chunkSizePower = Vector3Like.Create();
  columnSize = Vector3Like.Create();
  columnSizePower = Vector3Like.Create();
  constructor() {
    this.symcSettings();
    EngineSettings.observers.updated.subscribe("WorldRegisterCache", () => {
      this.symcSettings();
    });
  }

  symcSettings() {
    const size = WorldBounds.getWorldDimensions();

    this.chunkSize.x = 2 ** EngineSettings.settings.chunks.chunkXPow2;
    this.chunkSize.y = 2 ** EngineSettings.settings.chunks.chunkYPow2;
    this.chunkSize.z = 2 ** EngineSettings.settings.chunks.chunkZPow2;

    this.chunkSizePower = Vector3Like.Create(
      EngineSettings.settings.chunks.chunkXPow2 - 1,
      EngineSettings.settings.chunks.chunkYPow2 - 1,
      EngineSettings.settings.chunks.chunkZPow2 - 1
    );
    this.columnSizePower = Vector3Like.Create(
      EngineSettings.settings.chunks.chunkXPow2 - 1,
      EngineSettings.settings.regions.regionYPow2 - 1,
      EngineSettings.settings.chunks.chunkZPow2 - 1
    );
    this.worldSize = Vector3Like.Create(size.width, size.height, size.depth);
    this.chunkSpaceIndex.setBounds(
      Math.floor(size.width / this.chunkSize.x),
      Math.floor(size.height / this.chunkSize.y),
      Math.floor(size.depth / this.chunkSize.z)
    );

    this.columnSize.x = 2 ** EngineSettings.settings.chunks.chunkXPow2;
    this.columnSize.y = 2 ** EngineSettings.settings.regions.regionYPow2;
    this.columnSize.z = 2 ** EngineSettings.settings.chunks.chunkZPow2;

    this.columnSpaceIndex.setBounds(
      Math.floor(size.width / this.columnSize.x),
      Math.floor(size.height / this.columnSize.y),
      Math.floor(size.depth / this.columnSize.z)
    );
  }

  enable() {
    this._cacheOn = true;
    this._chunkCache.clear();
    this._columnCache.clear();
  }

  disable() {
    this._cacheOn = false;
    this._chunkCache.clear();
    this._columnCache.clear();
  }

  addChunk(key: number, data: Chunk) {
    this._chunkCache.set(key, data);
  }

  addColumn(key: number, data: Column) {
    this._columnCache.set(key, data);
  }

  getChunk(key: number) {
    return this._chunkCache.get(key);
  }

  getColumn(key: number) {
    return this._columnCache.get(key);
  }

  getChunkIndex(location: LocationData) {
    return vector3Hash(
      ((location[1] >> this.chunkSizePower.x) << this.chunkSizePower.x) /
        this.chunkSize.x,

      ((location[2] >> this.chunkSizePower.y) << this.chunkSizePower.y) /
        this.chunkSize.y,

      ((location[3] >> this.chunkSizePower.z) << this.chunkSizePower.z) /
        this.chunkSize.z
    );
  }

  getColumnIndex(location: LocationData) {
    return vector3Hash(
      ((location[1] >> this.columnSizePower.x) << this.columnSizePower.x) /
        this.columnSize.x,
      ((location[2] >> this.columnSizePower.y) << this.columnSizePower.y) /
        this.columnSize.y,
      ((location[3] >> this.columnSizePower.z) << this.columnSizePower.z) /
        this.columnSize.z
    );
  }

  clear() {
    this._chunkCache.clear();
    this._columnCache.clear();
  }
}
