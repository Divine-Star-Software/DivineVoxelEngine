export const AnimationManager = {
    //@ts-ignore
    animatedMaterials: {},
    animCount: 0,
    animations: [],
    /**# Register Animations
     * ---
     * Given the data from the texture creator it will generate
     * the needed shader code for each material.
     * It will also add the all animations into its anim que.
     * @param voxelSubstanceType
     * @param animations
     * @returns
     */
    registerAnimations(voxelSubstanceType, animations, animationTimes, overlay = false) {
        const returnUniforms = [];
        let uniformRegisterCode = `//animations\n`;
        let animationFunctionCode = `
  float getUVFace(float uv) {
  `;
        if (overlay) {
            animationFunctionCode = `
  float getOverlayUVFace(float uv) {
  `;
        }
        let i = 0;
        for (const anim of animations) {
            let shaderId = `anim${i}`;
            if (overlay) {
                shaderId = "o" + shaderId;
            }
            let keyCounts = [];
            const animTime = animationTimes[i];
            if (animTime.length == 1) {
                for (let k = 0; k < anim.length; k++) {
                    keyCounts.push(animTime[0]);
                }
            }
            else {
                keyCounts = animationTimes[i];
            }
            this.animations.push({
                uniformShaderId: shaderId,
                keys: anim,
                currentFrame: 0,
                currentCount: 0,
                keyCounts: keyCounts,
                substance: voxelSubstanceType,
            });
            returnUniforms.push(shaderId);
            uniformRegisterCode += `uniform float ${shaderId};
   `;
            animationFunctionCode += `if(uv == ${anim[0]}.0) {
   return ${shaderId};
  }`;
        }
        animationFunctionCode += `
  return uv;
   }
  `;
        this.animCount = this.animations.length;
        return {
            uniforms: returnUniforms,
            uniformRegisterCode: uniformRegisterCode,
            animationFunctionCode: animationFunctionCode,
        };
    },
    registerMaterial(voxelSubstanceType, material) {
        this.animatedMaterials[voxelSubstanceType] = material;
    },
    startAnimations() {
        setInterval(() => {
            let i = this.animCount;
            while (i--) {
                const anim = this.animations[i];
                if (anim.currentCount >= anim.keyCounts[anim.currentFrame]) {
                    anim.currentCount = 0;
                    if (anim.currentFrame < anim.keys.length - 1) {
                        anim.currentFrame++;
                    }
                    else {
                        anim.currentFrame = 0;
                    }
                    this.animatedMaterials[anim.substance].setFloat(anim.uniformShaderId, anim.keys[anim.currentFrame]);
                }
                else {
                    anim.currentCount++;
                }
            }
        }, 50);
    },
};
