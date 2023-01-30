export const SharedFragmentShader = {
    top: `
precision highp float;
precision highp sampler2DArray;
uniform vec4 fogOptions;
    `,
    optionVariables(ao = true) {
        let options = `
uniform float sunLightLevel;
uniform float baseLevel;
uniform float time;
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
    varying(ao = true) {
        let varying = `
//textures
uniform sampler2DArray arrayTex[4];
uniform sampler2DArray voxelOverlayTexture[4];
varying float mipMapLevel;
//uvs
varying vec3 vUV;
varying vec4 vOVUV;
//colors
varying vec4 rgbLColor;
varying vec4 sunLColor;
varying vec4 vColors;
varying vec3 vNormal;
//for normal based lighting
varying float vNColor;
//texture animations
varying float animIndex;

//animation States
varying float vAnimation;
${SharedFragmentShader.defaultVarying}
    `;
        if (ao) {
            varying += `
    varying vec4 aoColor;
      `;
        }
        return varying;
    },
    defaultVarying: `
 //for fog
 varying vec3 cameraPOS;
 varying vec3 worldPOS;
 varying vec3 worldPOSNoOrigin;
 varying float vDistance;
 `,
    getBase: `
 vec4 getBase(sampler2DArray[4] tex, float index) {
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
}
vec4 getBaseAnimated(sampler2DArray[4] tex, vec2 UV, float index) {
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
}
 vec4 getBaseColor() {
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
 }
 vec4 getAnimatedBaseColor(vec2 UV) {
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
}
vec3 doLightFog(vec4 base) {
   vec3 fogC = vFogColor;
   if(worldPOS.y < 60.) {
      fogC -= .5;
   }
   if(fogOptions.x == 0.) {
      float fog = CalcFogFactor();
      return fog * base.rgb + (1.0 - fog) * fogC * sunLColor.rgb * sunLightLevel;
   }
   if(fogOptions.x == 1.) {
      float fogFactor = CalcVFogFactor();
      return mix( base.rgb, fogC * sunLColor.rgb * sunLightLevel, fogFactor );
   }
   if(fogOptions.x == 2.) {
      float fogFactor = CalcVFogFactorAnimated();
      return mix( base.rgb, fogC * sunLColor.rgb  * sunLightLevel, fogFactor );
   }
   return base.rgb;
}
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
   vec4 final = ( ((rgbLColor * vDoRGB)  +  ((sunLColor * vDoSun  * sunLightLevel * vNColor))  ) + baseLevel) ;
   return base * final; 
}
    `,
    doFog: `
vec3 doFog(vec4 base) {
   if(fogOptions.x == 0.) {
      float fog = CalcFogFactor();
      return fog * base.rgb + (1.0 - fog) * vFogColor;
   }
   if(fogOptions.x == 1.) {
      float fogFactor = CalcVFogFactor();
      return mix( base.rgb, vFogColor, fogFactor );
   }
   if(fogOptions.x == 2.) {
      float fogFactor = CalcVFogFactorAnimated();
      return mix( base.rgb, vFogColor, fogFactor );
   }
   return base.rgb;
}

    `,
    doVFog: `
vec3 doVFog(vec4 base) {
   float fogFactor = CalcVFogFactor();
   return mix( base.rgb, vFogColor, fogFactor );
}
    `,
    hsv2rgbSmooth: `
vec3 hsv2rgbSmooth( in vec3 c ) {
   vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );
   rgb = rgb*rgb*(3.0-2.0*rgb); 
   return c.z * mix( vec3(1.0), rgb, c.y);
}`,
};
