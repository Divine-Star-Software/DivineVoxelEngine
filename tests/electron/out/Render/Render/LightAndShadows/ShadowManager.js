export const ShadowManager = {
    $INIT() {
    },
    addMeshToShadowCaster(mesh) {
        //@ts-ignore
        const shadowGenerator = new BABYLON.ShadowGenerator(1024, light, true);
        shadowGenerator.darkness = 0.1;
        shadowGenerator.usePercentageCloserFiltering = true;
        shadowGenerator.usePoissonSampling = true;
        shadowGenerator.filteringQuality = BABYLON.ShadowGenerator.QUALITY_MEDIUM;
        shadowGenerator.bias = 0.003;
        shadowGenerator.autoCalcDepthBounds = false;
    }
};
