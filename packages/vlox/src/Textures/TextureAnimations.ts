import type { TextureType } from "./TextureType";

export const TextureAnimationCreator = {
  createAnimations(texture: TextureType) {
    for (const [key, segment] of texture.segments) {
      const animaitonUniform: number[] = [];
      let i = 0;
      for (const anim of segment.animationsMap) {
        animaitonUniform[anim[0]] = anim[0];
        let keyCounts: number[] = [];
        const animTime = segment.animationTimes[i];
        if (animTime.length == 1) {
          for (let k = 0; k < anim.length; k++) {
            keyCounts.push(animTime[0]);
          }
        } else {
          keyCounts = segment.animationTimes[i];
        }

        segment.animations.push({
          uniformIndex: anim[0],
          keys: anim,
          currentFrame: 0,
          currentCount: 0,
          keyCounts: keyCounts,
        });
        i++;
      }
      for (let i = 0; i < segment.totalTextures; i++) {
        if (!animaitonUniform[i]) {
          animaitonUniform[i] = 0;
        }
      }

      texture.shader.addConstants([
        {
          id: "textureMasks",
          body: {
            GLSL: /* glsl  */ `
const uint textureIndexMask = uint(0xffff);
const uint mainTexutreIndex =uint(0);
const uint secondaryTextureIndex = uint(0xf + 0x1);
`,
          },
        },
      ]);

      segment.animationUniforID =
        `${texture.id}_${key}_texture_animations`.replace("#", "");
      segment.varyingID = `${texture.id}_${key}_texture_index`.replace("#", "");
      const functionName =
        `get_${texture.id}_${key}_texture_animation_frame`.replace("#", "");
      texture.shader.addUniform([
        [segment.animationUniforID, "float", animaitonUniform.length],
      ]);

      if (segment.mode == "sampler") {
        texture.shader.addFunction(functionName, "vertex", {
          inputs: [["index", "int"]],
          output: "float",
          arguments: {},
          body: {
            GLSL: () => /* glsl  */ `    
        float animatedIndex = ${segment.animationUniforID}[index];
        if(animatedIndex == 0.){
            return float(index);
        }
        if(animatedIndex != 0.){
          return float(animatedIndex);
        }
        return float(index);`,
          },
        });
        texture.shader.addVarying([
          {
            id: segment.varyingID,
            type: "vec3",
            body: {
              GLSL: () => /* glsl  */ `
        ${segment.varyingID}.x = uv.x;
        ${segment.varyingID}.y = uv.y;
        ${segment.varyingID}.z = ${functionName}( int( uint( ${segment.attributeID}.x)  & textureIndexMask)  );
       `,
            },
          },
        ]);
      }
      if (segment.mode == "overlay") {
        texture.shader.addFunction(functionName, "vertex", {
          inputs: [],
          output: "vec4",
          arguments: {
            attributeID: segment.attributeID,
          },
          body: {
            GLSL: (args) => /* glsl  */ `
        vec4 frames = vec4(0., 0., 0., 0.);
        int texture1Index =  int(((textureIndexMask << secondaryTextureIndex) & uint(${args.attributeID}.x)) >> secondaryTextureIndex);
        if( ${segment.animationUniforID}[texture1Index] != 0.) {
            frames.x =  ${segment.animationUniforID}[texture1Index];
        } else {
            frames.x = float(texture1Index);
        }

        int texture2Index =  int(((textureIndexMask << mainTexutreIndex) & uint(${args.attributeID}.y)) >> mainTexutreIndex);
        if( ${segment.animationUniforID}[texture2Index] != 0.) {
            frames.y =  ${segment.animationUniforID}[texture2Index];
        } else {
            frames.y = float(texture2Index);
        }

        int texture3Index =  int(((textureIndexMask << secondaryTextureIndex) & uint(${args.attributeID}.y)) >> secondaryTextureIndex);
        if( ${segment.animationUniforID}[texture3Index] != 0.) {
            frames.z =  ${segment.animationUniforID}[texture3Index];
        } else {
            frames.z = float(texture3Index);
        }

        int texture4Index =  int(((textureIndexMask << mainTexutreIndex) & uint(${args.attributeID}.z)) >> mainTexutreIndex);
        if( ${segment.animationUniforID}[texture4Index] != 0.) {
            frames.w =  ${segment.animationUniforID}[texture4Index];
        } else {
            frames.w = float(texture4Index);
        }
        return frames;`,
          },
        });
        texture.shader.addVarying([
          {
            id: segment.varyingID,
            type: "vec4",
            body: {
              GLSL: () => `${segment.varyingID} = ${functionName}();`,
            },
          },
        ]);
      }

      segment.animationUniform = new Float32Array(animaitonUniform);
    }
  },
};
