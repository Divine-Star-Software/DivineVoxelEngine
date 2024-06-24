import { WorldRegister } from "./WorldRegister.js";
import { DataHooks } from "../DataHooks.js";

import type { LocationData } from "@divinevoxel/core/Math";;
import { DataTool } from "../../Default/Tools/Data/DataTool.js";
import { AddVoxelData } from "Data/Types/WorldData.types.js";
import { VoxelPaletteReader } from "@divinevoxel/core/Data/Voxel/VoxelPalette.js";
export class WorldPainter {
  static instance: WorldPainter;
  constructor() {
    if (WorldPainter.instance) return WorldPainter.instance;
    WorldPainter.instance = this;
  }

  dataTool = new DataTool();
  paintVoxel(location: LocationData, data: AddVoxelData) {
    let chunk = WorldRegister.instance.chunk.get(location);
    if (!chunk) {
      let buffer = DataHooks.chunk.onGetSync.pipe({ location, chunk: null });
      if (!buffer.chunk) return;
      chunk = WorldRegister.instance.chunk.add(location, buffer.chunk);
    }

    if (!this.dataTool.setLocation(location).loadIn()) return;
    const id = VoxelPaletteReader.id.getPaletteId(
      data.id,
      data.state ? data.state : 0
    );
    if (id < 0) return false;
    this.dataTool.setId(id);

    this.dataTool.setShapeState(data.shapeState ? data.shapeState : 0);

    if (this.dataTool.getSubstnaceData().isLiquid()) {
      this.dataTool.setLevel(15);
    }

    if (data.secondaryVoxelId && data.secondaryVoxelId != "dve_air") {
      const vid = VoxelPaletteReader.id.getPaletteId(
        data.secondaryVoxelId,
        data.secondaryState ? data.secondaryState : 0
      );

      if (vid > 0) {
        this.dataTool.setSecondary(true);
        this.dataTool.setId(vid);
        this.dataTool.setSecondary(false);
      }
    }

    if (this.dataTool.isLightSource() && this.dataTool.getLightSourceValue()) {
      this.dataTool.setLight(this.dataTool.getLightSourceValue());
    }

    if (this.dataTool.isRich()) {
      DataHooks.paint.onRichVoxelPaint.notify([
        this.dataTool.getStringId(),
        location,
      ]);
    }

    this.dataTool.commit(1);
  }

  eraseVoxel(location: LocationData) {
    this.dataTool.setLocation(location);
    if (!this.dataTool.loadIn()) return;
    if (!this.dataTool.isRenderable()) return;
    this.dataTool
      .setLight(0)
      .setLevel(0)
      .setLevelState(0)
      .setShapeState(0)
      .setAir()
      .commit(2);
  }
}
