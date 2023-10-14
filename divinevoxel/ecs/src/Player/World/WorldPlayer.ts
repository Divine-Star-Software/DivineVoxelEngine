import type { DivineVoxelEngineWorld } from "@divinevoxel/core/World/index.js";
import type { DataTool } from "@divinevoxel/core/Tools/Data/DataTool.js";
import type { PlayerManager } from "../Data/PlayerManager.js";
import { VisitAll } from "@divinevoxel/core/Math/index.js";

export class WorldPlayer {
  start = {
    x: 0,
    y: 0,
    z: 0,
  };
  end = {
    x: 0,
    y: 0,
    z: 0,
  };

  reachDistance = 10;
  dataTool: DataTool;
  constructor(
    public DVEW: DivineVoxelEngineWorld,
    public manager: typeof PlayerManager
  ) {
    this.dataTool = DVEW.getDataTool();
  }

  hooks = {
    onVoxelPickCheck: {
      _funcs: <Function[]>[],
      add(run: (dataTool: DataTool) => boolean) {
        this._funcs.push(run);
      },
      run(data: DataTool) {
        let add = true;
        this._funcs.forEach((_) => {
          add = _(data);
        });
        return add;
      },
    },
  };

  update() {
    this.start.x = this.manager.physics.position.x;
    this.start.y =
      this.manager.physics.position.y + this.manager.physics.eyeLevel;
    this.start.z = this.manager.physics.position.z;
    this.end.x =
      this.manager.physics.direction.x * this.reachDistance + this.start.x;
    this.end.y =
      this.manager.physics.direction.y * this.reachDistance + this.start.y;
    this.end.z =
      this.manager.physics.direction.z * this.reachDistance + this.start.z;
    let count = 0;
    const voxels = VisitAll(this.start, this.end, () => {
      count++;
      if (count > 100) return false;
      return true;
    });
    let foundVoxel = false;
    for (let i = 0; i < voxels.length; i += 3) {
      const x = voxels[i];
      const y = voxels[i + 1];
      const z = voxels[i + 2];

      if (!this.dataTool.loadInAt(x, y, z)) continue;
      if (!this.hooks.onVoxelPickCheck.run(this.dataTool)) continue;
      if (this.dataTool.isRenderable()) {
        this.manager.physics.pick.position.x = x;
        this.manager.physics.pick.position.y = y;
        this.manager.physics.pick.position.z = z;
        foundVoxel = true;
        break;
      }
    }
    if (!foundVoxel) this.manager.physics.pick.position.set(-Infinity, 0, 0);
  }
}
