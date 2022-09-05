/**
 * |||||||||||||||||||||||||||||||||||||
 * [TOP & BOTTOM]
 * Not Flipped
 *
 * 2: w 0,h 0        3: w 1, h 0
 *          |--------|
 *          |      / |
 *          |   /    |
 *          |/       |
 *          |--------|
 * 1: w 0,h 1        4: w 1,h 1
 *
 * ===============================
 * Flipped
 *
 * 4: w 1,h 0        3: w 0, h 0
 *          |--------|
 *          |\       |
 *          |   \    |
 *          |      \ |
 *          |--------|
 * 1: w 1,h 1        2: w 0, h 1
 *
 *||||||||||||||||||||||||||||||||||||||||
 * [Sides]
 * Not Flipped
 * 4: w 1,h 0        3: w 0, h 0
 *          |--------|
 *          |\       |
 *          |   \    |
 *          |      \ |
 *          |--------|
 * 1: w 1,h 1        2: w 0, h 1
 *
 * ===============================
 * Flipped
 * 2: w 0,h 0        3: w 1, h 0
 *          |--------|
 *          |      / |
 *          |   /    |
 *          |/       |
 *          |--------|
 * 1: w 0,h 1        4: w 1,h 1
 *
 */
export const UVHelper = {
    uvRotations: {
        top: {
            0: (uv, ws, we, hs, he, flipped, uvs) => {
                if (!flipped) {
                    uvs.push(ws, he, uv, ws, hs, uv, we, hs, uv, we, he, uv);
                }
                else {
                    uvs.push(we, he, uv, ws, he, uv, ws, hs, uv, we, hs, uv);
                }
            },
            90: (uv, ws, we, hs, he, flipped, uvs) => {
                if (!flipped) {
                    uvs.push(we, he, uv, ws, he, uv, ws, hs, uv, we, hs, uv);
                }
                else {
                    uvs.push(we, hs, uv, we, he, uv, ws, he, uv, ws, hs, uv);
                }
            },
            180: (uv, ws, we, hs, he, flipped, uvs) => {
                if (!flipped) {
                    uvs.push(we, hs, uv, we, he, uv, ws, he, uv, ws, hs, uv);
                }
                else {
                    uvs.push(ws, hs, uv, we, hs, uv, we, he, uv, ws, he, uv);
                }
            },
            270: (uv, ws, we, hs, he, flipped, uvs) => {
                if (!flipped) {
                    uvs.push(ws, hs, uv, we, hs, uv, we, he, uv, ws, he, uv);
                }
                else {
                    uvs.push(ws, he, uv, ws, hs, uv, we, hs, uv, we, he, uv);
                }
            },
            360: (uv, ws, we, hs, he, flipped, uvs) => {
                if (!flipped) {
                    uvs.push(he, we, uv, he, ws, uv, hs, ws, uv, hs, we, uv);
                }
                else {
                    uvs.push(hs, we, uv, he, we, uv, he, ws, uv, hs, ws, uv);
                }
            },
        },
        bottom: {
            0: (uv, ws, we, hs, he, flipped, uvs) => {
                if (!flipped) {
                    uvs.push(ws, hs, uv, we, hs, uv, we, he, uv, ws, he, uv);
                }
                else {
                    uvs.push(ws, he, uv, ws, hs, uv, we, hs, uv, we, he, uv);
                }
            },
            90: (uv, ws, we, hs, he, flipped, uvs) => {
                if (!flipped) {
                    uvs.push(ws, he, uv, ws, hs, uv, we, hs, uv, we, he, uv);
                }
                else {
                    uvs.push(we, he, uv, ws, he, uv, ws, hs, uv, we, hs, uv);
                }
            },
            180: (uv, ws, we, hs, he, flipped, uvs) => {
                if (!flipped) {
                    uvs.push(we, he, uv, ws, he, uv, ws, hs, uv, we, hs, uv);
                }
                else {
                    uvs.push(we, hs, uv, we, he, uv, ws, he, uv, ws, hs, uv);
                }
            },
            270: (uv, ws, we, hs, he, flipped, uvs) => {
                if (!flipped) {
                    uvs.push(we, hs, uv, we, he, uv, ws, he, uv, ws, hs, uv);
                }
                else {
                    uvs.push(ws, hs, uv, we, hs, uv, we, he, uv, ws, he, uv);
                }
            },
            360: (uv, ws, we, hs, he, flipped, uvs) => {
                if (!flipped) {
                    uvs.push(he, ws, uv, hs, hs, uv, hs, we, uv, he, we, uv);
                }
                else {
                    uvs.push(he, we, uv, he, ws, uv, hs, ws, uv, hs, we, uv);
                }
            },
        },
        side: {
            0: (uv, ws, we, hs, he, flipped, uvs) => {
                if (!flipped) {
                    uvs.push(ws, hs, uv, we, hs, uv, we, he, uv, ws, he, uv);
                }
                else {
                    uvs.push(ws, he, uv, ws, hs, uv, we, hs, uv, we, he, uv);
                }
            },
            90: (uv, ws, we, hs, he, flipped, uvs) => {
                if (!flipped) {
                    uvs.push(ws, he, uv, ws, hs, uv, we, hs, uv, we, he, uv);
                }
                else {
                    uvs.push(we, he, uv, ws, he, uv, ws, hs, uv, we, hs, uv);
                }
            },
            180: (uv, ws, we, hs, he, flipped, uvs) => {
                if (!flipped) {
                    uvs.push(we, he, uv, ws, he, uv, ws, hs, uv, we, hs, uv);
                }
                else {
                    uvs.push(we, hs, uv, we, he, uv, ws, he, uv, ws, hs, uv);
                }
            },
            270: (uv, ws, we, hs, he, flipped, uvs) => {
                if (!flipped) {
                    uvs.push(we, hs, uv, we, he, uv, ws, he, uv, ws, hs, uv);
                }
                else {
                    uvs.push(ws, hs, uv, we, hs, uv, we, he, uv, ws, he, uv);
                }
            },
            360: (uv, ws, we, hs, he, flipped, uvs) => {
                if (!flipped) {
                    uvs.push(he, ws, uv, hs, ws, uv, hs, we, uv, he, we, uv);
                }
                else {
                    uvs.push(he, we, uv, he, ws, uv, hs, ws, uv, hs, we, uv);
                }
            },
        },
    },
    advancedUVs: {
        top: (uv, ws1, ws2, we1, we2, hs1, hs2, he1, he2, uvs) => {
            uvs.push(ws1, he1, uv, ws2, hs1, uv, we1, hs2, uv, we2, he2, uv);
        },
        side: (uv, ws1, ws2, we1, we2, hs1, hs2, he1, he2, uvs) => {
            uvs.push(ws1, hs1, uv, we1, hs2, uv, we2, he1, uv, ws2, he2, uv);
        },
    },
    uvFunctions: {
        top: (data) => {
            UVHelper.uvRotations.top[data.rotoate](data.uv, data.width.start, data.width.end, data.height.start, data.height.end, data.flipped, data.uvs);
        },
        bottom: (data) => {
            UVHelper.uvRotations.bottom[data.rotoate](data.uv, data.width.start, data.width.end, data.height.start, data.height.end, data.flipped, data.uvs);
        },
        north: (data) => {
            UVHelper.uvRotations.side[data.rotoate](data.uv, data.width.start, data.width.end, data.height.start, data.height.end, data.flipped, data.uvs);
        },
        south: (data) => {
            UVHelper.uvRotations.side[data.rotoate](data.uv, data.width.start, data.width.end, data.height.start, data.height.end, data.flipped, data.uvs);
        },
        east: (data) => {
            UVHelper.uvRotations.side[data.rotoate](data.uv, data.width.start, data.width.end, data.height.start, data.height.end, data.flipped, data.uvs);
        },
        west: (data) => {
            UVHelper.uvRotations.side[data.rotoate](data.uv, data.width.start, data.width.end, data.height.start, data.height.end, data.flipped, data.uvs);
        },
    },
    addUVs(face, data) {
        this.uvFunctions[face](data);
    },
    addAdvancedUVs(uv, uvs, ws1, ws2, we1, we2, hs1, hs2, he1, he2) { },
    processOverlayUVs(data) {
        let k = data.overylayUVTemplateIndex;
        let i = 4;
        while (i--) {
            data.overlayUVs.push(data.overylayUVTemplate[k], data.overylayUVTemplate[k + 1], data.overylayUVTemplate[k + 2], data.overylayUVTemplate[k + 3]);
        }
    },
};
