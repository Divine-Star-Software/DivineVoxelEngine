import { DimensionSegment } from "../Dimensions/DimensionSegment";
import { BrushTool } from "../../Tools/Brush/Brush";
import { TaskTool } from "../../Tools/Tasks/TasksTool";
import { WorldSimulationTools } from "../Internal/WorldSimulationTools";
import { LocationData } from "../../Math";
import { VoxelBehaviorsRegister } from "../Voxels/Behaviors";
import { VoxelTagsRegister } from "../../Voxels/Data/VoxelTagsRegister";
import { VoxelPalettesRegister } from "../../Voxels/Data/VoxelPalettesRegister";
import { IVoxelTemplate } from "../../Templates/VoxelTemplates.types";
import { VoxelUpdateData } from "../../Tasks/Tasks.types";
import { VoxelPathData } from "Templates/Path/VoxelPath.types";
import { VoxelPath } from "Templates/Path/VoxelPath";

export class SimulationBrush extends BrushTool {
  private taskTool: TaskTool;

  _location: LocationData = [0, 0, 0, 0];
  _mapLocation() {
    this._location[0] = this._dimension.id;
    this._location[1] = this.x;
    this._location[2] = this.y;
    this._location[3] = this.z;
  }
  constructor(public _dimension: DimensionSegment) {
    super();
    this.taskTool = WorldSimulationTools.taskTool;
  }

  paint() {
    throw new Error(`Must use paint async`);
    return this;
  }

  async paintAsync(updateData: VoxelUpdateData = {}) {
    this._mapLocation();
    const x = this.x;
    const y = this.y;
    const z = this.z;
    const tags =
      VoxelTagsRegister.VoxelTags[
        VoxelPalettesRegister.voxelIds.getNumberId(this.data.id)
      ];

    const behavior = VoxelBehaviorsRegister.get(
      tags["dve_simulation_behavior"] || "default"
    );

    await this.taskTool.voxel.paint.runAsync([
      this._location,
      this.getRaw(),
      {},
    ]);
    behavior.onPaint(this._dimension.simulation, x, y, z);
  }

  paintTemplate(voxelTemplate: IVoxelTemplate) {
    throw new Error(`Must use paint template  async`);
    return this;
  }

  async paintTemplateAsync(
    voxelTemplate: IVoxelTemplate,
    updateData: VoxelUpdateData = {}
  ) {
    await this.taskTool.voxel.paintTemplate.runAsync([
      this.dimension,
      [this.x, this.y, this.z],
      voxelTemplate.toJSON(),
      updateData,
    ]);
    const { x: ox, y: oy, z: oz } = this;
    const [sx, sy, sz] = voxelTemplate.bounds;
    for (let x = 0; x < sx; x++) {
      for (let y = 0; y < sy; y++) {
        for (let z = 0; z < sz; z++) {
          const tx = ox + x;
          const ty = oy + y;
          const tz = oz + z;
          const voxel = this.dataCursor.getVoxel(tx, ty, tz);
          if (voxelTemplate.isAir(voxelTemplate.getIndex(x, y, z))) continue;
          if (!voxel) continue;
          const tags =
            VoxelTagsRegister.VoxelTags[
              VoxelPalettesRegister.voxelIds.getNumberId(this.data.id)
            ];

          const behavior = VoxelBehaviorsRegister.get(
            tags["dve_simulation_behavior"] || "default"
          );

          behavior.onPaint(this._dimension.simulation, tx, ty, tz);
        }
      }
    }
    return this;
  }
  paintPath(voxelTemplate: VoxelPath) {
    throw new Error(`Must use paint path async`);
    return this;
  }
  async paintPathAsync(voxelPath: VoxelPath, updateData: VoxelUpdateData = {}) {
    await this.taskTool.voxel.paintPath.runAsync([
      this.dimension,
      [this.x, this.y, this.z],
      voxelPath.toJSON(),
      updateData,
    ]);

    return this;
  }

  erase() {
    throw new Error(`Must use erase async`);
    return this;
  }
  async eraseAsync(updateData: VoxelUpdateData = {}) {
    this._mapLocation();
    const x = this.x;
    const y = this.y;
    const z = this.z;
    const voxel = this._dimension.simulation.getVoxelForUpdate(x, y, z);
    const tags = VoxelTagsRegister.VoxelTags[voxel.getVoxelId()];
    const behavior = VoxelBehaviorsRegister.get(
      tags["dve_simulation_behavior"] || "default"
    );
    await this.taskTool.voxel.erase.runAsync([this._location, updateData]);
    behavior.onErase(this._dimension.simulation, x, y, z);
  }
  async eraseTemplateAsync(
    voxelTemplate: IVoxelTemplate,
    updateData: VoxelUpdateData = {}
  ) {
    const { x: ox, y: oy, z: oz } = this;
    const [sx, sy, sz] = voxelTemplate.bounds;
    for (let x = 0; x < sx; x++) {
      for (let y = 0; y < sy; y++) {
        for (let z = 0; z < sz; z++) {
          const tx = ox + x;
          const ty = oy + y;
          const tz = oz + z;
          if (voxelTemplate.isAir(voxelTemplate.getIndex(x, y, z))) continue;
          const voxel = this.dataCursor.getVoxel(tx, ty, tz);
          if (!voxel) continue;
          const tags =
            VoxelTagsRegister.VoxelTags[
              VoxelPalettesRegister.voxelIds.getNumberId(this.data.id)
            ];

          const behavior = VoxelBehaviorsRegister.get(
            tags["dve_simulation_behavior"] || "default"
          );

          behavior.onErase(this._dimension.simulation, tx, ty, tz);
        }
      }
    }
    await this.taskTool.voxel.eraseTemplate.runAsync([
      this.dimension,
      [this.x, this.y, this.z],
      voxelTemplate.toJSON(),
      updateData,
    ]);

    return this;
  }

  erasePath(voxelTemplate: VoxelPath) {
    throw new Error(`Must use erase path async`);
    return this;
  }
  async erasePathAsync(voxelPath: VoxelPath, updateData: VoxelUpdateData = {}) {
    await this.taskTool.voxel.erasePath.runAsync([
      this.dimension,
      [this.x, this.y, this.z],
      voxelPath.toJSON(),
      updateData,
    ]);

    return this;
  }
}
