export const DataSyncTypes = {
    chunk: 0,
    column: 1,
    region: 2,
    regionHeader: 2,
    voxelPalette: 3,
    voxelTags: 4,
    materials: 4,
    colliders: 4,
    dimesnion: 5,
    chunkTags: 6,
    columnTags: 7,
    regionTags: 8,
    registerStringMap: 0,
};
let index = 0;
for (const key of Object.keys(DataSyncTypes)) {
    DataSyncTypes[key] = index;
    index++;
}
