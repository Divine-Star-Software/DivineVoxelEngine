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
const overlayTextures = [];
const uvsSets = {
    north: {
        "0|": 0,
        "1|0|1|": 1,
        "1|1|0|": 2,
        "1|0|0|": 3,
    },
    south: {
        "0|": 4,
        "1|0|1|": 5,
        "1|1|0|": 6,
        "1|0|0|": 7,
    },
    east: {
        "0|": 8,
    },
    west: {
        "0|": 9,
    },
};
const getUV = (direction, x, y, z, builder, dimension) => {
    let key = "";
    const sets = checkSets[direction];
    for (let i = 0; i < sets.length; i++) {
        if (i > 0 && (direction == "west" || direction == "east"))
            break;
        const set = sets[i];
        const cx = x + set[0];
        const cz = z + set[1];
        const check = builder.processor.mDataTool.isSameVoxel(cx, y, cz);
        if (check) {
            key += "1|";
        }
        else {
            key += "0|";
            if (i == 0)
                break;
        }
    }
    if (uvsSets[direction][key] == undefined)
        return 0;
    const index = uvsSets[direction][key];
    return overlayTextures[index];
};
const getFoamUV = (builder, data) => {
    const tx = data.x;
    const ty = data.y;
    const tz = data.z;
    data.overlayUVTemplate.push(getUV("north", tx, ty, tz, builder, data.dimension), getUV("south", tx, ty, tz, builder, data.dimension), getUV("east", tx, ty, tz, builder, data.dimension), getUV("west", tx, ty, tz, builder, data.dimension));
};
let uv = 0;
export const LiquidDreamEtherVoxelBuilderThread = {
    id: "dve:liquiddreamether",
    hooks: {
        texturesRegistered: (builder) => {
            uv = builder.textureManager.getTextureUV("fluid", "liquid-dream-ether", "still-1");
            overlayTextures.push(builder.textureManager.getTextureUV("fluid", "foam", "top", true), builder.textureManager.getTextureUV("fluid", "foam", "ctr", true), builder.textureManager.getTextureUV("fluid", "foam", "ctl", true), builder.textureManager.getTextureUV("fluid", "foam", "ctltr", true), builder.textureManager.getTextureUV("fluid", "foam", "bottom", true), builder.textureManager.getTextureUV("fluid", "foam", "cbr", true), builder.textureManager.getTextureUV("fluid", "foam", "cbl", true), builder.textureManager.getTextureUV("fluid", "foam", "cblbr", true), builder.textureManager.getTextureUV("fluid", "foam", "right", true), builder.textureManager.getTextureUV("fluid", "foam", "left", true));
        },
    },
    process: function (data, DVEB) {
        if (data.exposedFaces[0]) {
            data.uvTemplate.push(uv);
            if (data.level == 15 && data.levelState != 1) {
                getFoamUV(DVEB, data);
            }
            else {
                data.overlayUVTemplate.push(0, 0, 0, 0);
            }
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
