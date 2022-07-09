export const SharedFragmentShader = {
 top: `
    precision highp float;
    precision highp sampler2DArray;
    `,
 optionVariables(ao: boolean = true) {
  let options = `
    uniform float sunLightLevel;
    uniform float baseLevel;
    varying float vDoSun;
    varying float vDoRGB;
    `;
  if (ao) {
   options += `
    varying float vDoAO; 
      `;
  }
  return options;
 },
 varying(ao: boolean = true) {
  let varying = `
    uniform sampler2DArray arrayTex;
    uniform sampler2DArray overlayTex;
    varying vec3 vUV;
    varying vec4 vOVUV;
    varying float vFaceData;
    varying vec4 rgbLColor;
    varying vec4 sunLColor;
    varying vec4 vColors;
    varying vec3 vNormal;
    varying float vNColor;
    varying float animIndex;
    varying float overlayAnimIndex;
    `;
  if (ao) {
   varying += `
    varying vec4 aoColor;
      `;
  }
  return varying;
 },
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

      return base * ( ((rgbLColor * vDoRGB)  +  (sunLColor * vDoSun  * sunLightLevel * vNColor)) + baseLevel) ;
    }
    `,
 doFog: `
    vec3 doFog(vec4 base) {
        float fog = CalcFogFactor();
        return fog * base.rgb + (1.0 - fog) * vFogColor;
    }
    `,

 hsv2rgbSmooth: `
vec3 hsv2rgbSmooth( in vec3 c )
   {
      vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );
      rgb = rgb*rgb*(3.0-2.0*rgb); 
      return c.z * mix( vec3(1.0), rgb, c.y);
   }
    `,
};
