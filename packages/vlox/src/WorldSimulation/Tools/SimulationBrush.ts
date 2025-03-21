import { DimensionSegment } from "../Dimensions/DimensionSegment";
import { BrushTool } from "../../Tools/Brush/Brush";
import { TaskTool } from "../../Tools/Tasks/TasksTool";
import { WorldSimulationTools } from "../Internal/WorldSimulationTools";
import { LocationData } from "../../Math";
import { VoxelBehaviorsRegister } from "../Voxels/Behaviors";
import { VoxelTagsRegister } from "../../Voxels/Data/VoxelTagsRegister";
import { VoxelPalettesRegister } from "../../Voxels/Data/VoxelPalettesRegister";
import { Vector3Like } from "@amodx/math";
import { IVoxelTemplate } from "../../Templates/VoxelTemplates.types";
import { VoxelUpdateData } from "../../Tasks/Tasks.types";

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

  paintArea(start: Vector3Like, end: Vector3Like) {
    throw new Error(`Must use paint area async`);
    return this;
  }

  async paintAreaAsync(
    start: Vector3Like,
    end: Vector3Like,
    updateData: VoxelUpdateData = {}
  ) {
    await this.taskTool.voxel.paintArea.runAsync([
      this.dimension,
      [start.x, start.y, start.z],
      [end.x, end.y, end.z],
      this.getRaw(),
      {},
    ]);
    const { x: sx, y: sy, z: sz } = start;
    const { x: ex, y: ey, z: ez } = end;
    const tags =
      VoxelTagsRegister.VoxelTags[
        VoxelPalettesRegister.voxelIds.getNumberId(this.data.id)
      ];

    const behavior = VoxelBehaviorsRegister.get(
      tags["dve_simulation_behavior"] || "default"
    );

    for (let x = sx; x < ex; x++) {
      for (let y = sy; y < ey; y++) {
        for (let z = sz; z < ez; z++) {
          behavior.onPaint(this._dimension.simulation, x, y, z);
        }
      }
    }

    return this;
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
  eraseArea(start: Vector3Like, end: Vector3Like) {
    throw new Error(`Must use erase aera async`);
    return this;
  }
  async eraseAreaAsync(
    start: Vector3Like,
    end: Vector3Like,
    updateData: VoxelUpdateData = {}
  ) {
    const { x: sx, y: sy, z: sz } = start;
    const { x: ex, y: ey, z: ez } = end;
    for (let x = sx; x < ex; x++) {
      for (let y = sy; y < ey; y++) {
        for (let z = sz; z < ez; z++) {
          const voxel = this.dataCursor.getVoxel(x, y, z);
          if (!voxel) continue;
          const tags =
            VoxelTagsRegister.VoxelTags[
              VoxelPalettesRegister.voxelIds.getNumberId(this.data.id)
            ];

          const behavior = VoxelBehaviorsRegister.get(
            tags["dve_simulation_behavior"] || "default"
          );

          behavior.onErase(this._dimension.simulation, x, y, z);
        }
      }
    }
    await this.taskTool.voxel.eraseArea.runAsync([
      this.dimension,
      [start.x, start.y, start.z],
      [end.x, end.y, end.z],
      updateData,
    ]);

    return this;
  }

  eraseTemplate(voxelTemplate: IVoxelTemplate) {
    throw new Error(`Must use paint template async`);
    return this;
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
}
