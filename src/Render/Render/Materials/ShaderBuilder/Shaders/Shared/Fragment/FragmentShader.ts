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
 useTime: `
    varying float vTime;
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

    hsv2rgbSmooth : `
vec3 hsv2rgbSmooth( in vec3 c )
   {
      vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );
      rgb = rgb*rgb*(3.0-2.0*rgb); 
      return c.z * mix( vec3(1.0), rgb, c.y);
   }
    `
};
