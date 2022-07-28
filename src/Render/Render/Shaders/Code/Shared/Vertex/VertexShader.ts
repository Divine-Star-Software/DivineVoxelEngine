export const SharedVertexShader = {
 top: `
  precision highp float;
  `,
 standardPositionMain: `
  vec4 worldPosition = world * vec4(position, 1.0);
  vec3 p = position;
  gl_Position = worldViewProjection * vec4(p, 1.0); 
  `,
 uniforams: `
  uniform mat4 worldViewProjection;
  uniform mat4 world;      
  uniform vec3 worldMatrix;       
  uniform vec3 cameraPosition;         
  uniform mat4 view;                    
  uniform mat4 viewProjection;       
  `,
 attributes(ao: boolean = true) {
  let attributes = `
  ${SharedVertexShader.defaultAttributes}
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
 defaultAttributes : `
 attribute vec3 position;
 attribute vec3 normal;
 `,
 defaultVarying: `
 //for fog 
 varying vec3 cameraPOS;
 varying vec3 worldPOS;
 `,
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
  //texture animations
  varying float animIndex;
  varying float overlayAnimIndex;
  //animation States
  varying float vAnimation;
 ${SharedVertexShader.defaultVarying}
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

 passAnimationState : `
 vAnimation = float(getAnimationType());
 `,
 updateVarying: `
 cameraPOS = cameraPosition;
 worldPOS = worldPosition.xyz;
 `,

 getAnimationType: `
 int getAnimationType() {
   highp int index = int(faceData);
   return  index & 0xff;
}
 `,
 animationFunctions: `
 vec3 animType1(vec4 posWorld, vec3 p) {
   if(cuv3.y == 0. && normal.y != 1. && normal.y != -1.)  {
      float heightX = fbm(posWorld.xz * 0.15 + time);
      p.xz += heightX * 0.05;
   }
   if( cuv3.z == 1. && normal.y != 1. && normal.y != -1.) {
      float heightX = fbm(posWorld.xz * 0.15 + time);
      p.xz -= heightX * 0.06;
   }
   if(normal.y == 1. ) {
      float heightX = fbm(posWorld.xz * 0.15 + time);
      p.xz += heightX * 0.05;
   }
   return p;
}

vec3 animType2(vec4 posWorld, vec3 p) {
   float height = fbm(posWorld.xz * 0.08 + time );
   if(normal.z == 1.) {
      p.z += height * 0.05;
   } else
   if(normal.z == -1.) {
      p.z -= height * 0.05;
   } else {
      p.z += height * 0.05; 
   }

   if(normal.x == 1.) {
      p.x += height * 0.05;
   } else
   if(normal.x == -1.) {
      p.x -= height * 0.05;
   } else {
      p.x += height * 0.05; 
   }

   return p;
}

vec3 animType3(vec4 posWorld, vec3 p) {
   float height = fbm(posWorld.xz * 0.08 + time );
   p.xz += height * 0.05;
   return p;
}
`,
};
