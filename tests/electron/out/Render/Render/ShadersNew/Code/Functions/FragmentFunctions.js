export function RegisterFragFunctions(builder) {
    builder.createFunction("getColor", {
        inputs: [["base", "vec4"]],
        output: "vec4",
        body: {
            GLSL: `return base * vColors;`,
        },
    });
    builder.createFunction("getAO", {
        inputs: [["base", "vec4"]],
        output: "vec4",
        body: {
            GLSL: `return  base * mix(base, aoColor , 1.0);`,
        },
    });
    builder.createFunction("getLight", {
        inputs: [["base", "vec4"]],
        output: "vec4",
        body: {
            GLSL: `
vec4 final = ( ((rgbLColor * vDoRGB)  +  ((sunLColor * vDoSun  * sunLightLevel * vNColor))  ) + baseLevel) ;
return base * final; `,
        },
    });
    builder.createFunction("doFog", {
        inputs: [["base", "vec4"]],
        output: "vec3",
        body: {
            GLSL: `
  
   if(fogOptions.x == 0.) {
    float fog = ExponentialFog();
   return fog * base.rgb + (1.0 - fog) * vFogColor;
   }
   if(fogOptions.x == 1.) {
     float fogFactor = VolumetricFog();
     return mix( base.rgb, vFogColor, fogFactor );
   }
   if(fogOptions.x == 2.) {
 float fogFactor = AnimatedVolumetricFog();
   return mix( base.rgb, vFogColor, fogFactor );
   }
   return base.rgb;`,
        },
    });
    builder.createFunction("getBase", {
        inputs: [
            ["tex", ["sampler2DArray", 4]],
            ["index", "float"],
        ],
        output: "vec4",
        body: {
            GLSL: `
switch (int(mipMapLevel)) {
case 0:
    return texture(tex[0], vec3(vUV.x,vUV.y,index));
case 1:
    return texture(tex[1], vec3(vUV.x,vUV.y,index));
case 2:
    return texture(tex[2], vec3(vUV.x,vUV.y,index));
case 3:
    return texture(tex[3], vec3(vUV.x,vUV.y,index));
}
return  vec4(0.,0.,0.,0.);        
`,
        },
    });
    builder.createFunction("getBaseAnimated", {
        inputs: [
            ["tex", ["sampler2DArray", 4]],
            ["UV", "vec2"],
            ["index", "float"],
        ],
        output: "vec4",
        body: {
            GLSL: `
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
    builder.createFunction("getBaseColor", {
        inputs: [],
        output: "vec4",
        body: {
            GLSL: `
vec4 rgb = getBase(arrayTex, animIndex);
vec4 oRGB1 =  getBase(voxelOverlayTexture, vOVUV.x);
vec4 oRGB2 =  getBase(voxelOverlayTexture, vOVUV.y);
vec4 oRGB3 =  getBase(voxelOverlayTexture, vOVUV.z);
vec4 oRGB4 =  getBase(voxelOverlayTexture, vOVUV.w);

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
    builder.createFunction("getAnimatedBaseColor", {
        inputs: [["UV", "vec2"]],
        output: "vec4",
        body: {
            GLSL: `
   vec4 rgb = getBaseAnimated(arrayTex,UV ,animIndex);
   vec4 oRGB1 =  getBase(voxelOverlayTexture, vOVUV.x);
   vec4 oRGB2 =  getBase(voxelOverlayTexture, vOVUV.y);
   vec4 oRGB3 =  getBase(voxelOverlayTexture, vOVUV.z);
   vec4 oRGB4 =  getBase(voxelOverlayTexture, vOVUV.w);

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
