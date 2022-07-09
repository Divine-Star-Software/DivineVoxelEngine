export const SharedVertexShader = {
 top: `
  precision highp float;
  `,
 standardPositionMain: `
  vec4 worldPosition = world * vec4(position, 1.0);
  gl_Position = worldViewProjection * vec4(position, 1.0); 
  `,
 uniforams: `
  uniform mat4 worldViewProjection;
  uniform mat4 world;      
  uniform vec3 worldMatrix;                
  uniform mat4 view;                    
  uniform mat4 viewProjection;       
  `,
 attributes(ao: boolean = true) {
  let attributes = `
  attribute vec3 position;
  attribute vec3 normal;
  attribute vec3 cuv3;
  attribute vec4 ocuv3;
  attribute float faceData;
  attribute vec4 rgbLightColors;
  attribute vec4 sunLightColors;
  attribute vec4 colors;
  `;
  if (ao) {
   attributes += `
   attribute vec4 aoColors;
   `;
  }
  return attributes;
 },
 varying(ao: boolean = true) {
  let varying = `
  varying vec3 vUV;
  varying vec4 vOVUV;
  varying float vFaceData;
  varying vec3 vNormal;
  //vectory nomral sun light color scale
  varying float vNColor;
  varying vec4 rgbLColor;
  varying vec4 sunLColor;
  varying vec4 vColors;
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
 optionVars(ao: boolean = true) {
  let optionVars = `
  varying float vDoSun;
  varying float vDoRGB;
  uniform float doRGB;
  uniform float doSun;
  uniform float doColor;
 `;
  if (optionVars) {
   optionVars += `
   uniform float doAO;
   `;
  }
  return optionVars;
 },

 useTime(passTime: boolean) {
  let timeUniform = `
   uniform float time;
   `;
  if (passTime) {
   timeUniform += `
   varying float vTime;
      `;
  }

  return timeUniform;
 },

 setUVInMain: `
    animIndex = getUVFace(cuv3.z);
    vUV = cuv3;
    vOVUV.x = getOverlayUVFace(ocuv3.x);
    vOVUV.y = getOverlayUVFace(ocuv3.y);
    vOVUV.z = getOverlayUVFace(ocuv3.z);
    vOVUV.w = getOverlayUVFace(ocuv3.w);
    `,

 passTime: `
  vTime = time;
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
 if(normal.y == 1.) {
   vNColor = 1.2;
 }
 if(normal.y == -1.) {
   vNColor = .4;
 }
 if(abs(normal.x) == 1. || abs(normal.z)  == 1. ) {
   vNColor = 1.;
 }

 `,
};
