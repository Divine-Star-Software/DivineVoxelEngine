import { PaintVoxelData } from "../../Data/Types/WorldData.types.js";
import { VoxelPalette } from "../Palettes/VoxelPalette.js";
import { WorldCursor } from "../../Data/Cursor/World/WorldCursor.js";
import { SubstanceDataTool } from "../../Tools/Data/SubstanceDataTool.js";
import { RawVoxelData } from "../../Voxels/Voxel.types.js"

const air: RawVoxelData = [0, 0, 0, 0, 0];

export class WorldPainter {
  static instance: WorldPainter;
  constructor() {
    if (WorldPainter.instance) return WorldPainter.instance;
    WorldPainter.instance = this;
  }

  dataCursor = new WorldCursor();
  substanceData = new SubstanceDataTool();
  data: PaintVoxelData;

  paintVoxel(x: number, y: number, z: number) {
    const voxel = this.dataCursor.getVoxel(x, y, z);
    if (!voxel) return;
    const id = VoxelPalette.ids.getNumberId(this.data.id);
    if (id < 0) return false;
    voxel.setId(id);

    voxel.setShapeState(this.data.shapeState ? this.data.shapeState : 0);

    this.substanceData.setSubstance(voxel.getSubstance());
    if (this.substanceData.isLiquid()) {
      voxel.setLevel(7);
    }
    voxel.setMod(this.data.mod);

    if (
      this.data.secondaryVoxelId &&
      this.data.secondaryVoxelId != "dve_air" &&
      voxel.canHaveSecondaryVoxel()
    ) {
      const vid = VoxelPalette.ids.getNumberId(this.data.secondaryVoxelId);

      if (vid > 0) {
        voxel.setSecondary(true);
        voxel.setId(vid);
        voxel.setSecondary(false);
      }
    }

    if (voxel.isLightSource() && voxel.getLightSourceValue()) {
      voxel.setLight(voxel.getLightSourceValue());
    }

    /*    if (this.voxelCursor.isRich()) {
      DataHooks.paint.onRichVoxelPaint.notify([
        this.voxelCursor.getStringId(),
        [this.dimenion, x, y, z],
      ]);
    } */

    voxel.updateHeightMap(0);
  }

  eraseVoxel(x: number, y: number, z: number) {
    const voxel = this.dataCursor.getVoxel(x, y, z);
    if (!voxel || !voxel.isRenderable()) return;
    voxel.copyRaw(air).updateHeightMap(1);
  }
}
