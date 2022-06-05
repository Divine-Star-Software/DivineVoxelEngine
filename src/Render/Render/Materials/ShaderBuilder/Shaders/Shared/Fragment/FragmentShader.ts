export const SharedFragmentShader = {
 top: `
    precision highp float;
    precision highp sampler2DArray;
    `,
 optionVariables: `
    uniform float sunLightLevel;
    uniform float baseLevel;
    varying float vDoSun;
    varying float vDoRGB;
    `,
 varsNormal: `
    uniform sampler2DArray arrayTex;
    varying vec3 vUV;
    varying vec4 aoColor;
    varying vec4 rgbLColor;
    varying vec4 sunLColor;
    varying vec4 vColors;
    varying vec3 vNormal;
    varying float animIndex;
    `,
 varsNoAO: `
    uniform sampler2DArray arrayTex;
    varying vec3 vUV;
    varying vec4 rgbLColor;
    varying vec4 sunLColor;
    varying vec4 vColors;
    varying vec3 vNormal;
    varying float animIndex;
    `,
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
     //   return base * ( ((rgbLColor * vDoRGB)  +  vec4(1,1,1,1)) + baseLevel );
     //   return base * ( ((sunLColor * vDoSun)  * sunLightLevel) + baseLevel );
      return base * ( ((rgbLColor * vDoRGB)  +  (sunLColor * vDoSun  * sunLightLevel)) + baseLevel );
    }
    `,
 doFog: `
    vec3 doFog(vec4 base) {
        float fog = CalcFogFactor();
        return fog * base.rgb + (1.0 - fog) * vFogColor;
    }
    `,
};
