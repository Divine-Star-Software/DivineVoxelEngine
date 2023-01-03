export const DataSyncTypes = {
 chunk: 0,
 column: 1,
 region: 2,
 regionHeader: 2,
 voxelPalette: 3,
 voxelData: 4,
 materials: 4,
 colliders: 4,
 dimesnion: 5,
 chunkTags: 6,
 columnTags: 7,
 regionTags: 8,
};


let index = 0;
for (const key of Object.keys(DataSyncTypes)) {
    DataSyncTypes[key as keyof typeof DataSyncTypes] = index;
 index++;
}
