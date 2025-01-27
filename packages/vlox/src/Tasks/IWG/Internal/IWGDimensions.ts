import { DimensionSegment } from "./Classes/DimensionSegment";
import { TaskRegister } from "./TaskRegister";

export class IWGDimensions {
  static readonly _dimensions = new Map<string, DimensionSegment>();

  static addDimension(dimensionId: string) {
    const segment = new DimensionSegment(dimensionId);
    TaskRegister.addToDimension(segment);
    this._dimensions.set(dimensionId, segment);
  }
  static getDimension(dimensionId: string) {
    const dimension = this._dimensions.get(dimensionId);
    if (!dimension) {
      throw new Error(`Dimension with id [${dimensionId}] is not registered`);
    }
    return dimension;
  }
}
