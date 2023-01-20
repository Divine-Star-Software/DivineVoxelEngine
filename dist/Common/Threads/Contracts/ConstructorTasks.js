export const ConstructorTasks = {
    buildChunk: 0,
    buildColumn: 0,
    generate: 0,
    RGBlightUpdate: 0,
    RGBlightRemove: 0,
    worldSun: 0,
    sunLightUpdate: 0,
    sunLightRemove: 0,
    analyzerPropagation: 0,
    analyzerUpdate: 0,
    flowUpdate: 0,
    flowRemove: 0,
    constructEntity: 0,
    constructItem: 0,
    explosion: 0,
    voxelErease: 0,
    voxelPaint: 0,
};
let index = 0;
for (const key of Object.keys(ConstructorTasks)) {
    ConstructorTasks[key] = index;
    index++;
}
