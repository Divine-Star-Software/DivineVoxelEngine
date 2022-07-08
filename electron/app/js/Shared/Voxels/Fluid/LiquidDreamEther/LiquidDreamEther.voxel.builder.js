import { LiquidDreamEtherVoxelData } from "./LiquidDreamEther.voxel.data.js";
const getFoamUV = (DVEB, data) => {
    let uv = 0;
    const world = DVEB.processor.worldMatrix;
    const tx = data.x + data.chunkX;
    const ty = data.y + data.chunkY;
    const tz = data.z + data.chunkZ;
    let leftCheck = world.sameVoxel(tx, ty, tz, tx - 1, ty, tz);
    if (!leftCheck) {
        uv = DVEB.textureManager.getTextureUV("fluid", "foam", "top", true);
    }
    let rightCheck = world.sameVoxel(tx, ty, tz, tx + 1, ty, tz);
    if (!rightCheck) {
        uv = DVEB.textureManager.getTextureUV("fluid", "foam", "bottom", true);
    }
    let northCheck = world.sameVoxel(tx, ty, tz + 1, tx, ty, tz);
    if (!northCheck) {
        uv = DVEB.textureManager.getTextureUV("fluid", "foam", "right", true);
    }
    let southCheck = world.sameVoxel(tx, ty, tz - 1, tx, ty, tz);
    if (!southCheck) {
        uv = DVEB.textureManager.getTextureUV("fluid", "foam", "left", true);
    }
    if (!leftCheck && !southCheck) {
        uv = DVEB.textureManager.getTextureUV("fluid", "foam", "lt", true);
    }
    if (!rightCheck && !southCheck) {
        uv = DVEB.textureManager.getTextureUV("fluid", "foam", "lb", true);
    }
    if (!leftCheck && !northCheck) {
        uv = DVEB.textureManager.getTextureUV("fluid", "foam", "rt", true);
    }
    if (!rightCheck && !northCheck) {
        uv = DVEB.textureManager.getTextureUV("fluid", "foam", "rb", true);
    }
    return uv;
};
export const LiquidDreamEtherVoxelBuilderThread = {
    data: LiquidDreamEtherVoxelData,
    trueShapeId: 1,
    hooks: {},
    process: function (data, DVEB) {
        const uv = DVEB.textureManager.getTextureUV("fluid", "liquid-dream-ether", "still-1");
        if (data.exposedFaces[0]) {
            data.uvTemplate.push(uv);
            const foamUV = getFoamUV(DVEB, data);
            data.overlayUVTemplate.push(foamUV);
        }
        if (data.exposedFaces[1]) {
            data.uvTemplate.push(uv);
            data.overlayUVTemplate.push(0);
        }
        if (data.exposedFaces[2]) {
            data.uvTemplate.push(uv);
            data.overlayUVTemplate.push(0);
        }
        if (data.exposedFaces[3]) {
            data.uvTemplate.push(uv);
            data.overlayUVTemplate.push(0);
        }
        if (data.exposedFaces[4]) {
            data.uvTemplate.push(uv);
            data.overlayUVTemplate.push(0);
        }
        if (data.exposedFaces[5]) {
            data.uvTemplate.push(uv);
            data.overlayUVTemplate.push(0);
        }
        data.shapeStateTemplate.push(0);
        data.shapeTemplate.push(this.trueShapeId);
        DVEB.processor.processVoxelLight(data, true);
    },
};
