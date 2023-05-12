import type { DivineShaderBuilder } from "divine-shaders";
export function RegisterFragFunctions(builder: typeof DivineShaderBuilder) {
 builder.functions.create("getColor", {
  setID: "#dve_frag",
  inputs: [["base", "vec4"]],
  output: "vec4",
  arguments: {},
  body: {
   GLSL: () => `return base * vColors;`,
  },
 });
 builder.functions.create("getAO", {
  setID: "#dve_frag",
  inputs: [["base", "vec4"]],
  output: "vec4",
  arguments: {},
  body: {
   GLSL: () => `
   return  base * mix(base, vec4(VOXEL[1].r,VOXEL[1].r,VOXEL[1].r,1.) , 1.0);`,
  },
 });
 builder.functions.create("getLight", {
  setID: "#dve_frag",
  inputs: [["base", "vec4"]],
  output: "vec4",
  arguments: {},
  body: {
   GLSL: () => `
return base * VOXEL[0]; `,
  },
 });
 builder.functions. create("doFog", {
  setID: "#dve_frag",
  inputs: [["base", "vec4"]],
  output: "vec3",
  arguments: {},
  body: {
   GLSL: () => `
   switch (int(fogOptions)) {
      case 0:
         return mix( base.rgb, vFogColor, ExponentialFog() );
      case 1:
         return mix( base.rgb, vFogColor, VolumetricFog() );
      case 2:
         return mix( base.rgb, vFogColor, AnimatedVolumetricFog() );
   }
   return base.rgb;`,
  },
 });

 builder.functions.create("getBase", {
  setID: "#dve_frag",
  inputs: [
   ["tex", ["sampler2DArray", 4]],
   ["UV", "vec2"],
   ["index", "float"],
  ],
  output: "vec4",
  arguments: {},
  body: {
   GLSL: () => `
   switch (int(mipMapLevel)) {
      case 0:
          return texture(tex[0], vec3(UV.x,UV.y,index));
      case 1:
          return texture(tex[1], vec3(UV.x,UV.y,index));
      case 2: 
          return texture(tex[2], vec3(UV.x,UV.y,index));
      case 3:
          return texture(tex[3], vec3(UV.x,UV.y,index));
      }
  return  vec4(0.,0.,0.,0.); 
  `,
  },
 });
builder.functions.create("getBaseColor", {
  setID: "#dve_frag",
  inputs: [["UV", "vec2"]],
  output: "vec4",
  arguments: {
   textureID: "voxelTexture",
   overlayTextureID: "voxelOverlayTexture",
   mainVarying: "vUV",
   overlayVarying: "vOVUV",
  },
  body: {
   GLSL: (args) => `
   UV.xy += ${args.mainVarying}.xy;
   vec4 rgb = getBase(${args.textureID},UV.xy,${args.mainVarying}.z);
   vec4 oRGB1 =  getBase(${args.overlayTextureID},UV.xy,${args.overlayVarying}.x);
   vec4 oRGB2 =  getBase(${args.overlayTextureID},UV.xy,${args.overlayVarying}.y);
   vec4 oRGB3 =  getBase(${args.overlayTextureID},UV.xy,${args.overlayVarying}.z);
   vec4 oRGB4 =  getBase(${args.overlayTextureID},UV.xy,${args.overlayVarying}.w);

   if (rgb.a < 0.85 && oRGB1.a < 0.85 && oRGB2.a < 0.85 && oRGB3.a < 0.85 && oRGB4.a < 0.85) { 
      return vec4(0.,0.,0.,0.);
   }
   if(oRGB1.a > 0.85) {
      rgb = oRGB1;
   }
   if(oRGB2.a > 0.85) {
      rgb = oRGB2;
   }
   if(oRGB3.a > 0.85) {
      rgb = oRGB3;
   }
   if(oRGB4.a > 0.85) {
      rgb = oRGB4;
   }
   return rgb;
    `,
  },
 });
 builder.functions.create("getMainColor", {
   inputs: [],
   output: "vec4",
   arguments: {
    textureID: "voxelTexture",
    mainVarying: "vUV",
   },
   body: {
    GLSL: (args) => `
 
    vec4 rgb = getBase(${args.textureID},${args.mainVarying}.xy,${args.mainVarying}.z);
    if (rgb.a < 0.85) { 
      return vec4(0.,0.,0.,0.);
   }
    return rgb;
     `,
   },
  });
 return [
  "getColor",
  "getAO",
  "getLight",
  "doFog",
  "getBase",
  "getBaseAnimated",
  "getBaseColor",
  "getAnimatedBaseColor",
 ];
}
