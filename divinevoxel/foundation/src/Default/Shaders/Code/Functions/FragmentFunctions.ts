import type { DivineShaderBuilder } from "@divinestar/shaders";
export function RegisterFragFunctions(builder: typeof DivineShaderBuilder) {
  builder.functions.create("toLinearSpace", {
    setID: "#dve_frag",
    inputs: [["base", "vec4"]],
    output: "vec4",
    arguments: {},
    body: {
      GLSL: () =>
        /* glsl */ `return vec4(pow(base.r, 2.2),pow(base.g, 2.2),pow(base.b, 2.2),base.a);`,
    },
  });
  builder.functions.create("toGammaSpace", {
    setID: "#dve_frag",
    inputs: [["base", "vec4"]],
    output: "vec4",
    arguments: {},
    body: {
      GLSL: () =>
        /* glsl */ `return vec4(pow(base.r, 1.0/2.2 ),pow(base.g, 1.0/2.2 ),pow(base.b, 1.0/2.2),base.a);`,
    },
  });
  builder.functions.create("getColor", {
    setID: "#dve_frag",
    inputs: [["base", "vec4"]],
    output: "vec4",
    arguments: {},
    body: {
      GLSL: () => /* glsl */ `return base * vColors;`,
    },
  });
  builder.functions.create("getAO", {
    setID: "#dve_frag",
    inputs: [["base", "vec4"]],
    output: "vec4",
    arguments: {},
    body: {
      GLSL: () => /* glsl */ `
   return  base * mix(base, vec4(VOXEL[1].r,VOXEL[1].r,VOXEL[1].r,1.) , 1.0);`,
    },
  });
  builder.functions.create("getLight", {
    setID: "#dve_frag",
    inputs: [["base", "vec4"]],
    output: "vec4",
    arguments: {},
    body: {
      GLSL: () => /* glsl */ `
return base * VOXEL[0]; `,
    },
  });
  builder.functions.create("doFog", {
    setID: "#dve_frag",
    inputs: [["base", "vec4"]],
    output: "vec3",
    arguments: {},
    body: {
      GLSL: () => /* glsl */ `
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
      ["tex", "sampler2DArray"],
      ["UV", "vec2"],
      ["index", "float"],
    ],
    output: "vec4",
    arguments: {},
    body: {
      GLSL: () => /* glsl */ `

     return  texture(tex, vec3(UV.x,UV.y,index), mipMapBias );
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
      GLSL: (args) => /* glsl */ `
   UV.xy += ${args.mainVarying}.xy;
   vec4 rgb = getBase(${args.textureID},UV.xy,${args.mainVarying}.z);

      vec4 oRGB1 =  getBase(${args.overlayTextureID},UV.xy,${args.overlayVarying}.x);
      vec4 oRGB2 =  getBase(${args.overlayTextureID},UV.xy,${args.overlayVarying}.y);
      vec4 oRGB3 =  getBase(${args.overlayTextureID},UV.xy,${args.overlayVarying}.z);
      vec4 oRGB4 =  getBase(${args.overlayTextureID},UV.xy,${args.overlayVarying}.w);
      if(oRGB1.a > 0.3) {
         rgb = oRGB1;
      }
      if(oRGB2.a > 0.3) {
         rgb = oRGB2;
      }
      if(oRGB3.a > 0.3) {
         rgb = oRGB3;
      }
      if(oRGB4.a > 0.3) {
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
      GLSL: (args) => /* glsl */ `
 
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
