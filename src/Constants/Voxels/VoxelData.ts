export const VoxelDataByteLengths = {
 substance: 1,
 shapeId: 2,
 hardness: 2,
 material: 2,
 checkCollision: 1,
 colliderId: 2,
 lightSource: 1,
 lightValue: 2,
 totalLength: 0,
};

export const VoxelDataIndexes = {
 substance: 0,
 shapeId: 0,
 hardness: 0,
 material: 0,
 checkCollision: 0,
 colliderId: 0,
 lightSource: 0,
 lightValue: 0,
};

let total = 0;
Object.entries(VoxelDataByteLengths).forEach((value) => {
 total += value[1];
});
VoxelDataByteLengths.totalLength = total;

let currentIndex = 0;
Object.entries(VoxelDataIndexes).forEach((value) => {
 //@ts-ignore
 VoxelDataIndexes[value[0]] = currentIndex;
 //@ts-ignore
 currentIndex += VoxelDataByteLengths[value[0]];
});


