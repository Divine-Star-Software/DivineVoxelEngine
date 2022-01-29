export const SharedFragmentShaderFunctions = {
    getColor: `
    vec4 getColor(vec4 base) {
        return base * vColors;
     }
    `,
    getAO: `
    vec4 getAO(vec4 base) {
        return  base * mix(base, aoColor , 1.0);
    }
    `,
    getLight: `
    vec4 getLight(vec4 base) {
        return base * ( ((rgbLColor * vDoRGB)  +  (sunLColor * vDoSun)  * sunLightLevel) + baseLevel );
    }
    `,
    doFog: `
    vec3 doFog(vec4 base) {
        float fog = CalcFogFactor();
        return fog * base.rgb + (1.0 - fog) * vFogColor;
    }
    `
};
