import { DimensionSegment } from "../Dimensions/DimensionSegment";
import { TaskRegister } from "../Tasks/TaskRegister"
import { WorldSimulationTools } from "./WorldSimulationTools";

export class WorldSimulationDimensions {
  static readonly _dimensions = new Map<number, DimensionSegment>();

  static addDimension(dimensionId: number) {
    const segment = new DimensionSegment(dimensionId,WorldSimulationTools.taskTool);
    TaskRegister.addToDimension(segment);
    this._dimensions.set(dimensionId, segment);
  }
  static getDimension(dimensionId: number) {
    const dimension = this._dimensions.get(dimensionId);
    if (!dimension) {
      throw new Error(`Dimension with id [${dimensionId}] is not registered`);
    }
    return dimension;
  }
}
