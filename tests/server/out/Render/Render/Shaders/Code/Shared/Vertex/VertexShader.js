export const SharedVertexShader = {
    top: `
 #extension GL_EXT_gpu_shader4 : enable
  precision highp float;
  `,
    standardPositionMain: `
 vec4 worldPosition = world * vec4(position, 1.0);
 gl_Position = viewProjection * world * vec4(position, 1.0); 
  `,
    uniforams: `
uniform mat4 worldViewProjection;
uniform mat4 world;      
uniform mat4 viewProjection;    
uniform vec3 cameraPosition;         

uniform mat4 view;                    
uniform float doEffects;      
uniform vec4 fogOptions;      
uniform vec3 worldOrigin;
  `,
    attributes(ao = true) {
        let attributes = `
  ${SharedVertexShader.defaultAttributes}
  attribute vec3 cuv3;
  attribute vec4 ocuv3;
  attribute float faceData; 
  attribute vec4 lightColors;
  attribute vec4 colors;
  `;
        if (ao) {
            attributes += `
   attribute float aoColors;
   `;
        }
        return attributes;
    },
    defaultAttributes: `
 attribute vec3 position;
 attribute vec3 normal;
 `,
    defaultVarying: `
 //for fog 
 varying vec3 cameraPOS;
 varying vec3 worldPOS;
 varying vec3 worldPOSNoOrigin;
 varying float vDistance;
 varying float mipMapLevel;
 `,
    varying(ao = true) {
        let varying = `
  varying vec3 vUV;
  varying vec4 vOVUV;

  varying vec3 vNormal;

  

  //vectory nomral sun light color scale
  varying float vNColor;
  varying vec4 rgbLColor;
  varying vec4 sunLColor;
  varying vec4 vColors;
  //texture animations
  varying float animIndex;

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
    optionVars(ao = true) {
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
    useTime(passTime) {
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
        aoColor = vec4(aoColors,aoColors,aoColors,1.);
     } else {
        aoColor = vec4(1.0,1.0,1.0,1.0); 
     }
    `,
    doRGB: `
    if(doRGB == 1.0){
        vDoRGB = 1.0;
        rgbLColor = vec4(lightColors.rgb,1.);
     } else {
        vDoRGB = 0.0;
     }
    `,
    doSun: `
    if(doSun == 1.0){
        vDoSun = 1.0;
        float s = lightColors.a;
        sunLColor = vec4(s,s,s,1.);
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
    passAnimationState: `
 vAnimation = float(getAnimationType());
 `,
    updateVarying: `
 cameraPOS = cameraPosition;
 vec4 temp =  world * vec4(position, 1.0);
 worldPOS = vec3(temp.x,temp.y,temp.z);
 vDistance = distance(cameraPOS , worldPOS );
 mipMapLevel = 0.;
 if(vDistance <= 30.) {
  mipMapLevel = 0.;
 }
 if(vDistance > 50. &&  vDistance <= 70.) {
  mipMapLevel = 1.;
 }
 if(vDistance > 70. && vDistance < 90.) {
   mipMapLevel = 2.;
 }
 if(vDistance >= 90.) {
  mipMapLevel = 3.;
  }
  mat4 a;
  a[0] = world[0];
  a[1] = world[1];
  a[2] = world[2];
  a[3] = vec4(world[3].xyz - worldOrigin.xyz, 1.);
  temp =  a * vec4(position , 1.0);
  worldPOSNoOrigin =  vec3(temp.x,temp.y,temp.z);
 `,
    getAnimationType: `
 int getAnimationType() {
   int index = int(faceData);
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
