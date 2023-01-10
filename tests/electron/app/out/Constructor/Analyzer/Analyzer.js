import { AnalyzerProcessor } from "./AnalyzerProcessor.js";
export const Analyzer = {
    processor: AnalyzerProcessor,
    findAndRunLightUpdates(data) {
        const processedData = this.processor.anaylzeColumn(data, { light: true });
        if (processedData?.light) {
            for (const update of processedData.light) {
                //Propagation.runRGBUpdate(update);
            }
        }
    },
};
