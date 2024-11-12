import { WorldRegister } from "./WorldRegister.js";
import { DataHooks } from "../DataHooks.js";

import { DataTool } from "../../Tools/Data/DataTool.js";
import { AddVoxelData } from "Data/Types/WorldData.types.js";
import { VoxelPalette } from "../../Data/Voxel/VoxelPalette.js";
export class WorldPainter {
  static instance: WorldPainter;
  constructor() {
    if (WorldPainter.instance) return WorldPainter.instance;
    WorldPainter.instance = this;
  }

  dataTool = new DataTool();
  data: AddVoxelData;
  dimenion: string = "main";

  paintVoxel(x: number, y: number, z: number) {
    let chunk = WorldRegister.instance.chunk.get(x, y, z);
    if (!chunk) {
      let buffer = DataHooks.chunk.onGetSync.pipe({
        location: [this.dimenion, x, y, z],
        chunk: null,
      });
      if (!buffer.chunk) return;
      chunk = WorldRegister.instance.chunk.add(x, y, z, buffer.chunk);
    }

    if (!this.dataTool.setDimension(this.dimenion).setXYZ(x, y, z).loadIn())
      return;
    const id = VoxelPalette.ids.getNumberId(this.data.id);
    if (id < 0) return false;
    this.dataTool.setId(id);

    this.dataTool.setShapeState(
      this.data.shapeState ? this.data.shapeState : 0
    );

    if (this.dataTool.getSubstnaceData().isLiquid()) {
      this.dataTool.setLevel(7);
    }
    this.dataTool.setMod(this.data.mod);

    if (
      this.data.secondaryVoxelId &&
      this.data.secondaryVoxelId != "dve_air" &&
      this.dataTool.canHaveSecondaryVoxel()
    ) {
      const vid = VoxelPalette.ids.getNumberId(this.data.secondaryVoxelId);

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
        [this.dimenion, x, y, z],
      ]);
    }

    this.dataTool.commit(1);
  }

  eraseVoxel(x: number, y: number, z: number) {
    this.dataTool.setDimension(this.dimenion);
    if (!this.dataTool.loadInAt(x, y, z)) return;
    if (!this.dataTool.isRenderable()) return;
    this.dataTool.data.raw[0] = 0;
    this.dataTool.data.raw[1] = 0;
    this.dataTool.data.raw[2] = 0;
    this.dataTool.data.raw[3] = 0;
    this.dataTool.data.raw[4] = 0;
    this.dataTool.commit(2);
  }
}
