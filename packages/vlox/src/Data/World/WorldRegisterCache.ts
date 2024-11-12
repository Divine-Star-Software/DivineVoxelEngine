import { Chunk, Column } from "./Classes/index.js";
import { WorldBounds } from "../../Data/World/WorldBounds.js";
import {  Vector3Like } from "@amodx/math";
import { EngineSettings } from "../../Data/Settings/EngineSettings.js";
import { Observable } from "@amodx/core/Observers/Observable.js";

export class WorldRegisterCache {
  _cacheOn = false;
  _chunkCache: Chunk[] = [];
  _columnCache: Column[] = [];

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

    this.columnSize.x = 2 ** EngineSettings.settings.chunks.chunkXPow2;
    this.columnSize.y = 2 ** EngineSettings.settings.regions.regionYPow2;
    this.columnSize.z = 2 ** EngineSettings.settings.chunks.chunkZPow2;
  }

  enable() {
    this._cacheOn = true;
    this._chunkCache.length = 0;
    this._columnCache.length = 0;
  }

  disable() {
    this._cacheOn = false;
    this._chunkCache.length = 0;
    this._columnCache.length = 0;
  }

  addChunk(key: number, data: Chunk) {
    this._chunkCache[key] = data;
  }

  addColumn(key: number, data: Column) {
    this._columnCache[key] = data;
  }

  getChunk(key: number) {
    return this._chunkCache[key];
  }

  getColumn(key: number) {
    return this._columnCache[key];
  }

  getChunkIndex(x: number, y: number, z: number) {
    return Vector3Like.HashXYZ(
      ((x >> this.chunkSizePower.x) << this.chunkSizePower.x) /
        this.chunkSize.x,

      ((y >> this.chunkSizePower.y) << this.chunkSizePower.y) /
        this.chunkSize.y,

      ((z >> this.chunkSizePower.z) << this.chunkSizePower.z) / this.chunkSize.z
    );
  }

  getColumnIndex(x: number, y: number, z: number) {
    return Vector3Like.HashXYZ(
      ((x >> this.columnSizePower.x) << this.columnSizePower.x) /
        this.columnSize.x,
      ((y >> this.columnSizePower.y) << this.columnSizePower.y) /
        this.columnSize.y,
      ((z >> this.columnSizePower.z) << this.columnSizePower.z) /
        this.columnSize.z
    );
  }

  clear() {
    this._chunkCache.length = 0;
    this._columnCache.length = 0;
  }
}
