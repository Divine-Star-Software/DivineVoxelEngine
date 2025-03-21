import { VoxelPlacingStrategyData } from "./VoxelPlacingStrategy.types";
import { VoxelModelPlacingStrategy } from "./VoxelPlacingStrategy";

export class VoxelPlacingStrategyRegister {
  static _stragies = new Map<string, VoxelModelPlacingStrategy>();

  static register(id: string, data: VoxelPlacingStrategyData[] | string) {
    this._stragies.set(id, new VoxelModelPlacingStrategy(data));
  }

  static get(id: string) {
    const stragety = this._stragies.get(id);
    if (!stragety) return null;

    return stragety;
  }
}
