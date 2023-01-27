export const SharedFogFunctions = {
    fogFragConstants: ` #define FOGMODE_NONE 0.
    #define FOGMODE_NONE 0.
    #define FOGMODE_EXP 1.
    #define FOGMODE_EXP2 2.
    #define FOGMODE_LINEAR 3.
    #define E 2.71828`,
    fogFragVars: `
   uniform vec4 vFogInfos;
   uniform vec3 vFogColor;
   varying float fFogDistance;
   `,
    fogVertexTop: `
 varying float fFogDistance;
 `,
    fogVertexMain: `
 fFogDistance = (view * worldPosition).z;
 `,
    fogFunctions: `
 float CalcFogFactor()
 {
     float fogCoeff = 1.0;
     float fogStart = vFogInfos.y;
     float fogEnd = vFogInfos.z;
     float fogDensity = fogOptions.y;

     if (FOGMODE_LINEAR == vFogInfos.x)
     {
         fogCoeff = (fogEnd - fFogDistance) / (fogEnd - fogStart);
     }
     else if (FOGMODE_EXP == vFogInfos.x)
     {
         fogCoeff = 1.0 / pow(E, fFogDistance * fogDensity);
     }
     else if (FOGMODE_EXP2 == vFogInfos.x)
     {
         fogCoeff = 1.0 / pow(E, fFogDistance * fFogDistance * fogDensity * fogDensity);
     }

     return clamp(fogCoeff, 0.0, 1.0);
 }
 float CalcVFogFactor()
 {
  // float fogDensity = vFogInfos.w;
  float fogDensity = fogOptions.y;
 //float fogDensity = .00001;
   vec3 fogOrigin = cameraPOS;
   vec3 fogDirection = normalize(worldPOS - fogOrigin);
   float fogDepth = vDistance;
   fogDepth *= mix(1.0, 1.0, clamp((fogDepth - 5000.0) / 5000.0,0.,1.));
   fogDepth *= fogDepth;
   float heightFactor = fogOptions.z;
   float fogFactor = heightFactor * exp(-fogOrigin.y * fogDensity) * (
       1.0 - exp(-fogDepth * fogDirection.y * fogDensity)) / fogDirection.y;
   fogFactor = clamp(fogFactor,0.,1.);
   return fogFactor;
 }

 float CalcVFogFactorAnimated()
 {
  // float fogDensity = vFogInfos.w;
  float fogDensity = fogOptions.y;
   float fogTime = vTime * .5;
   vec3 fogOrigin = cameraPOS;
   vec3 fogDirection = normalize(worldPOS - fogOrigin);
   float fogDepth = vDistance;
   vec3 noiseSampleCoord = worldPOS * 0.00025 + vec3(
       0.0, 0.0, fogTime * 0.025);
   float noiseSample = fbm3(noiseSampleCoord + fbm3(noiseSampleCoord)) * 0.5 + 0.5;
   fogDepth *= mix(noiseSample, 1.0, clamp((fogDepth - 5000.0) / 5000.0,0.,1.));
   fogDepth *= fogDepth;
   float heightFactor = fogOptions.z;
   float fogFactor = heightFactor * exp(-fogOrigin.y * fogDensity) * (
       1.0 - exp(-fogDepth * fogDirection.y * fogDensity)) / fogDirection.y;
   fogFactor = clamp(fogFactor,0.,1.);
   return fogFactor;
 }
 `,
};
