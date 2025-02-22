import { DimensionSegment } from "../Dimensions/DimensionSegment";
import { BrushTool } from "../../Tools/Brush/Brush";
import { TaskTool } from "../../Tools/Tasks/TasksTool";
import { WorldSimulationTools } from "../Internal/WorldSimulationTools";
import { LocationData } from "../../Math";
import { VoxelBehaviorsRegister } from "../Voxels/Behaviors";
import { VoxelTagsRegister } from "../../Voxels/Data/VoxelTagsRegister";
import { VoxelPalettesRegister } from "../../Voxels/Data/VoxelPalettesRegister";

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

  async paintAsync() {
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

    await this.taskTool.voxel.paint.runAsync([this._location, this.getRaw()]);
    behavior.onPaint(this._dimension.simulation, x, y, z);
  }

  erase() {
    throw new Error(`Must use erase async`);
    return this;
  }

  async eraseAsync() {
    this._mapLocation();
    const x = this.x;
    const y = this.y;
    const z = this.z;
    const voxel = this._dimension.simulation.getVoxelForUpdate(x, y, z);
    const tags = VoxelTagsRegister.VoxelTags[voxel.getVoxelId()];
    const behavior = VoxelBehaviorsRegister.get(
      tags["dve_simulation_behavior"] || "default"
    );
    await this.taskTool.voxel.erase.runAsync(this._location);
    behavior.onErase(this._dimension.simulation, x, y, z);
  }
}
