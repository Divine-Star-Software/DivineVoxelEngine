import type { LocationData } from "Libs/voxelSpaces/Types/VoxelSpaces.types.js";
import { Propagation } from "../Propagation/Propagation.js";
import { AnalyzerProcessor } from "./AnalyzerProcessor.js";
export const Analyzer = {
 processor: AnalyzerProcessor,

 findAndRunLightUpdates(data: LocationData) {
  const processedData = this.processor.anaylzeColumn(data, { light: true });
  if (processedData?.light) {
   for (const update of processedData.light) {
    //Propagation.runRGBUpdate(update);
   }
  }
 },
};
