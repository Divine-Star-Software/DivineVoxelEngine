export const DebugBoxVoxelData = {
    name: "Debug Box",
    shapeId: "Box",
    id: "dve_debugbox",
    substance: "#dve_solid",
    material: "stone",
    hardnress: 1000,
    lightSource: true,
    lightValue: 0b1111_1111_1111_0000,
    physics: {
        collider: "Box",
        checkCollisions: true,
    },
};
