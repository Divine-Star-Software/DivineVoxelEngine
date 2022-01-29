export const SharedVertexShader = {


  top  : `
  precision highp float;
  `,
  standardPositionMain : `
  vec4 worldPosition = world * vec4(position, 1.0);
  gl_Position = worldViewProjection * vec4(position, 1.0); 
  `,
  uniforams : `
  uniform mat4 worldViewProjection;
  uniform mat4 world;                    
  uniform mat4 view;                    
  uniform mat4 viewProjection;       
  `,
  attributes : `
  attribute vec3 position;
  attribute vec3 normal;
  attribute vec3 cuv3;
  attribute vec4 aoColors;
  attribute vec4 rgbLightColors;
  attribute vec4 sunLightColors;
  attribute vec4 colors;
  `,
  attributesNoAO : `
  attribute vec3 position;
  attribute vec3 normal;
  attribute vec3 cuv3;
  attribute vec4 rgbLightColors;
  attribute vec4 sunLightColors;
  attribute vec4 colors;
  `,
  varying : `
  varying vec3 vUV;
  varying vec3 vNormal;
  varying vec4 aoColor;
  varying vec4 rgbLColor;
  varying vec4 sunLColor;
  varying vec4 vColors;
  varying float animIndex;
  `,
  varyingNoAO : `
  varying vec3 vUV;
  varying vec3 vNormal;
  varying vec4 rgbLColor;
  varying vec4 sunLColor;
  varying vec4 vColors;
  varying float animIndex;
  `,
  optionVars : `
  varying float vDoSun;
  varying float vDoRGB;
  uniform float doAO;
  uniform float doRGB;
  uniform float doSun;
  uniform float doColor;
  `,
  optionVarsNoAO : `
  varying float vDoSun;
  varying float vDoRGB;
  uniform float doRGB;
  uniform float doSun;
  uniform float doColor;
  `,
 setUVInMain: `
    animIndex = getUVFace(cuv3.z);
    vUV = cuv3;
    `,

 doAO: `
    if(doAO == 1.0){
        aoColor = aoColors;
     } else {
        aoColor = vec4(1.0,1.0,1.0,1.0); 
     }
    `,

 doRGB: `
    if(doRGB == 1.0){
        vDoRGB = 1.0;
        rgbLColor = rgbLightColors;
     } else {
        vDoRGB = 0.0;
     }
    `,
 doSun: `
    if(doSun == 1.0){
        vDoSun = 1.0;
        sunLColor = sunLightColors;
     } else {
        vDoSun = 0.0;
     }
    `,
 doColors: `
    if(doColor == 1.0){
        vColors = vec4(1.0,1.0,1.0,1.0); 
     } else {
        vColors = vec4(1.0,1.0,1.0,1.0); 
     }
    `,
 doNormals: `
 vNormal = normal;
 `
};
