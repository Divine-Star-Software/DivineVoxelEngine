import { LiquidDreamEtherVoxelData } from "./LiquidDreamEther.voxel.data.js";
const sets = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
];
const checkSets = {
    north: [
        [0, 1],
        [1, 1],
        [-1, 1],
    ],
    south: [
        [0, -1],
        [1, -1],
        [-1, -1],
    ],
    east: [
        [1, 0],
        [1, -1],
        [1, 1],
    ],
    west: [
        [-1, 0],
        [-1, -1],
        [-1, 1],
    ],
};
const uvsSets = {
    north: {
        "0|": (DVEB) => {
            return DVEB.textureManager.getTextureUV("fluid", "foam", "top", true);
        },
        "1|0|1|": (DVEB) => {
            return DVEB.textureManager.getTextureUV("fluid", "foam", "ctr", true);
        },
        "1|1|0|": (DVEB) => {
            return DVEB.textureManager.getTextureUV("fluid", "foam", "ctl", true);
        },
        "1|0|0|": (DVEB) => {
            return DVEB.textureManager.getTextureUV("fluid", "foam", "ctltr", true);
        },
    },
    south: {
        "0|": (DVEB) => {
            return DVEB.textureManager.getTextureUV("fluid", "foam", "bottom", true);
        },
        "1|0|1|": (DVEB) => {
            return DVEB.textureManager.getTextureUV("fluid", "foam", "cbr", true);
        },
        "1|1|0|": (DVEB) => {
            return DVEB.textureManager.getTextureUV("fluid", "foam", "cbl", true);
        },
        "1|0|0|": (DVEB) => {
            return DVEB.textureManager.getTextureUV("fluid", "foam", "cblbr", true);
        },
    },
    east: {
        "0|": (DVEB) => {
            return DVEB.textureManager.getTextureUV("fluid", "foam", "right", true);
        },
    },
    west: {
        "0|": (DVEB) => {
            return DVEB.textureManager.getTextureUV("fluid", "foam", "left", true);
        },
    },
};
const getUV = (direction, x, y, z, DVEB) => {
    const world = DVEB.processor.worldMatrix;
    let key = "";
    const sets = checkSets[direction];
    for (let i = 0; i < sets.length; i++) {
        if (i > 0 && (direction == "west" || direction == "east"))
            break;
        const set = sets[i];
        const cx = x + set[0];
        const cz = z + set[1];
        const check = world.sameVoxel(x, y, z, cx, y, cz);
        if (check) {
            key += "1|";
        }
        else {
            key += "0|";
            if (i == 0)
                break;
        }
    }
    if (!uvsSets[direction][key])
        return 0;
    return uvsSets[direction][key](DVEB);
};
const getFoamUV = (DVEB, data) => {
    const tx = data.x + data.chunkX;
    const ty = data.y + data.chunkY;
    const tz = data.z + data.chunkZ;
    data.overlayUVTemplate.push(getUV("north", tx, ty, tz, DVEB), getUV("south", tx, ty, tz, DVEB), getUV("east", tx, ty, tz, DVEB), getUV("west", tx, ty, tz, DVEB));
};
export const LiquidDreamEtherVoxelBuilderThread = {
    data: LiquidDreamEtherVoxelData,
    trueShapeId: 1,
    hooks: {},
    process: function (data, DVEB) {
        const uv = DVEB.textureManager.getTextureUV("fluid", "liquid-dream-ether", "still-1");
        if (data.exposedFaces[0]) {
            data.uvTemplate.push(uv);
            getFoamUV(DVEB, data);
            //data.overlayUVTemplate.push(foamUV,foamUV ,foamUV,foamUV);
        }
        if (data.exposedFaces[1]) {
            data.uvTemplate.push(uv);
            data.overlayUVTemplate.push(0, 0, 0, 0);
        }
        if (data.exposedFaces[2]) {
            data.uvTemplate.push(uv);
            data.overlayUVTemplate.push(0, 0, 0, 0);
        }
        if (data.exposedFaces[3]) {
            data.uvTemplate.push(uv);
            data.overlayUVTemplate.push(0, 0, 0, 0);
        }
        if (data.exposedFaces[4]) {
            data.uvTemplate.push(uv);
            data.overlayUVTemplate.push(0, 0, 0, 0);
        }
        if (data.exposedFaces[5]) {
            data.uvTemplate.push(uv);
            data.overlayUVTemplate.push(0, 0, 0, 0);
        }
        DVEB.processor.processVoxelLight(data, true);
    },
};
