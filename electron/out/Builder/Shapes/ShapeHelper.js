/**# Shape Helper
 * ---
 * A class that holds needed function shared betweeen different voxel shapes.
 */
export class ShapeHelper {
    util;
    infoByte;
    lightByte;
    constructor(util) {
        this.util = util;
        this.infoByte = this.util.getInfoByte();
        this.lightByte = this.util.getLightByte();
    }
    toLinearSpace(r, g, b, a) {
        r = Math.pow(r, 2.2);
        g = Math.pow(g, 2.2);
        b = Math.pow(b, 2.2);
        a = a * 1;
        return [r, g, b, a];
    }
    lightMap = [
        0.1, 0.15, 0.25, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85,
        0.9, 1,
    ];
    calculateLightColor(RGBlightColors, sunlightColors, lightTemplate, startIndex) {
        const alpha = 1;
        for (let v = 0; v < 4; v++) {
            const values = this.lightByte.getLightValues(lightTemplate[startIndex + v]);
            const w = this.lightMap[values[0]];
            const r = this.lightMap[values[1]];
            const g = this.lightMap[values[2]];
            const b = this.lightMap[values[3]];
            sunlightColors.push(w, w, w, 1);
            RGBlightColors.push(r, g, b, alpha);
        }
    }
    calculateSunightColor(sunLight, sunLightTemplate, sunLightIndex) {
        for (let v = 0; v < 4; v++) {
            const values = this.lightByte.getLightValues(sunLightTemplate[sunLightIndex + v]);
            const w = this.lightMap[values[0]];
            sunLight.push(w, w, w, 1);
        }
    }
    calculateAOColor(colors, chunkAmbientOcculusion, startIndex) {
        const Cr = 1;
        const Cg = 1;
        const Cb = 1;
        const Ca = 1;
        for (let v = 0; v < 4; v++) {
            const aColor = chunkAmbientOcculusion[startIndex + v];
            const Ar = aColor * Cr;
            const Ag = aColor * Cg;
            const Ab = aColor * Cb;
            const Aa = aColor * Ca;
            const newColor = this.toLinearSpace(Ar, Ag, Ab, Aa);
            colors.push(newColor[0], newColor[1], newColor[2], 1);
        }
    }
}