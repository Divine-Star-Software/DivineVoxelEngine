/**
 * 0,0     1,0
 * |--------|
 * |      / |
 * |   /    |
 * |/       |
 * |--------|
 * 0,1      1,1
 *
 *
 * 1,0      0,0
 * |--------|
 * |\       |
 * |   \    |
 * |      \ |
 * |--------|
 * 1,1      0,1
 *
 */
export const UVHelper = {
    uvFunctions: {
        top: (data) => {
            let uv = data.uv;
            let s = data.startPercent;
            let e = data.endPerfect;
            if (!data.flipped) {
                data.uvs.push(s, e, uv, s, s, uv, e, s, uv, e, e, uv);
            }
            else {
                data.uvs.push(e, e, uv, s, e, uv, s, s, uv, e, s, uv);
            }
        },
        bottom: (data) => {
            let uv = data.uv;
            let s = data.startPercent;
            let e = data.endPerfect;
            if (!data.flipped) {
                data.uvs.push(e, e, uv, s, e, uv, s, s, uv, e, s, uv);
            }
            else {
                data.uvs.push(s, e, uv, s, s, uv, e, s, uv, e, e, uv);
            }
        },
        north: (data) => {
            let uv = data.uv;
            let s = data.startPercent;
            let e = data.endPerfect;
            if (!data.flipped) {
                data.uvs.push(s, s, uv, e, s, uv, e, e, uv, s, e, uv);
            }
            else {
                data.uvs.push(s, e, uv, s, s, uv, e, s, uv, e, e, uv);
            }
        },
        south: (data) => {
            let uv = data.uv;
            let s = data.startPercent;
            let e = data.endPerfect;
            if (!data.flipped) {
                data.uvs.push(s, s, uv, e, s, uv, e, e, uv, s, e, uv);
            }
            else {
                data.uvs.push(s, e, uv, s, s, uv, e, s, uv, e, e, uv);
            }
        },
        east: (data) => {
            let uv = data.uv;
            let s = data.startPercent;
            let e = data.endPerfect;
            if (!data.flipped) {
                data.uvs.push(s, s, uv, e, s, uv, e, e, uv, s, e, uv);
            }
            else {
                data.uvs.push(s, e, uv, s, s, uv, e, s, uv, e, e, uv);
            }
        },
        west: (data) => {
            let uv = data.uv;
            let s = data.startPercent;
            let e = data.endPerfect;
            if (!data.flipped) {
                data.uvs.push(s, s, uv, e, s, uv, e, e, uv, s, e, uv);
            }
            else {
                data.uvs.push(s, e, uv, s, s, uv, e, s, uv, e, e, uv);
            }
        },
    },
    addUVs(face, data) {
        this.uvFunctions[face](data);
    },
    processOverlayUVs(data) {
        let k = data.overylayUVTemplateIndex;
        let i = 4;
        while (i--) {
            data.overlayUVs.push(data.overylayUVTemplate[k], data.overylayUVTemplate[k + 1], data.overylayUVTemplate[k + 2], data.overylayUVTemplate[k + 3]);
        }
    },
};
