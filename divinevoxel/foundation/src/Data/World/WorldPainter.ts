import { WorldRegister } from "./WorldRegister.js";
import { DataHooks } from "../DataHooks.js";

import type { LocationData } from "@divinevoxel/core/Math";
import { DataTool } from "../../Default/Tools/Data/DataTool.js";
import { AddVoxelData } from "Data/Types/WorldData.types.js";
import { VoxelPaletteReader } from "@divinevoxel/core/Data/Voxel/VoxelPalette.js";
export class WorldPainter {
  static instance: WorldPainter;
  constructor() {
    if (WorldPainter.instance) return WorldPainter.instance;
    WorldPainter.instance = this;
  }
  _currentionDimension = "main";

  _dt = new DataTool();
  paintVoxel(location: LocationData, data: AddVoxelData, update = true) {
    if (!location[0]) {
      location[0] = this._currentionDimension;
    }

    let chunk = WorldRegister.instance.chunk.get(location);
    if (!chunk) {
      let buffer = DataHooks.chunk.onGetSync.pipe({ location, chunk: null });
      if (!buffer.chunk) return;
      chunk = WorldRegister.instance.chunk.add(location, buffer.chunk);
    }
    this.__paint(location, data, update);
  }

  private __paint(location: LocationData, data: AddVoxelData, update = true) {
    this._dt.setLocation(location);

    if (!this._dt.setLocation(location).loadIn()) return;
    const id = VoxelPaletteReader.id.getPaletteId(
      data.id,
      data.state ? data.state : 0
    );
    if (id < 0) return false;
    this._dt.setId(id);

    this._dt.setShapeState(data.shapeState ? data.shapeState : 0);

    if (this._dt.getSubstnaceData().isLiquid()) {
      this._dt.setLevel(15);
    }

    if (data.secondaryVoxelId && data.secondaryVoxelId != "dve_air") {
      const vid = VoxelPaletteReader.id.getPaletteId(
        data.secondaryVoxelId,
        data.secondaryState ? data.secondaryState : 0
      );

      if (vid > 0) {
        this._dt.setSecondary(true);
        this._dt.setId(vid);
        this._dt.setSecondary(false);
      }
    }

    if (this._dt.isLightSource() && this._dt.getLightSourceValue()) {
      this._dt.setLight(this._dt.getLightSourceValue());
      if (update) {
        DataHooks.paint.onAddToRGBUpdate.notify(location);
      }
    }

    if (this._dt.isRich()) {
      DataHooks.paint.onRichVoxelPaint.notify([
        this._dt.getStringId(),
        location,
      ]);
    }

    this._dt.commit(1);
  }

  eraseVoxel(location: LocationData) {
    this._dt.setLocation(location);
    if (!this._dt.loadIn()) return;
    if (!this._dt.isRenderable()) return;
    this._dt
      .setLight(0)
      .setLevel(0)
      .setLevelState(0)
      .setShapeState(0)
      .setAir()
      .commit(2);
  }
}
