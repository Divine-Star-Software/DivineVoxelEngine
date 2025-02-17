import { VoxelModelPlacingStrategyData } from "../VoxelModel.types";
import { VoxelModelPlacingStrategy } from "./VoxelModelPlacingStrategy";

export class VoxelModelPlacingStrategyRegister {
  static _stragies = new Map<string, VoxelModelPlacingStrategy>();

  static register(id: string, data: VoxelModelPlacingStrategyData[]|string) {
    this._stragies.set(id,new VoxelModelPlacingStrategy(data))
  }

  static get(id: string) {
    const stragety = this._stragies.get(id);
    if (!stragety) return null;

    return stragety;
  }
}
