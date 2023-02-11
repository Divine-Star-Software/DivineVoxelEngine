export const AnimationManager = {
    //@ts-ignore
    animatedMaterials: {},
    animCount: 0,
    animationUniforms: new Map(),
    overlayAnimationUniforms: new Map(),
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
    registerAnimations(voxelSubstanceType, shader, animations, animationTimes, overlay = false) {
        const animaitonUniform = [];
        let i = 0;
        for (const anim of animations) {
            animaitonUniform[anim[0]] = anim[0];
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
                uniformIndex: anim[0],
                keys: anim,
                overlay: overlay,
                currentFrame: 0,
                currentCount: 0,
                keyCounts: keyCounts,
                substance: voxelSubstanceType,
            });
            i++;
        }
        this.animCount = this.animations.length;
        let uniformName = "animationIndexArray";
        let functionName = "getUVFace";
        if (overlay) {
            uniformName += "O";
            functionName = "getOverlayUVFace";
        }
        shader.addUniform([[uniformName, "float", animaitonUniform.length + 1]]);
        shader.addFunction(functionName, "vertex", {
            inputs: [["uv", "float"]],
            output: "float",
            arguments: {},
            body: {
                GLSL: (d) => `
int index =  int(uv); 
float aUV = ${uniformName}[index];
if(aUV != 0.){
  return aUV;
}
return uv;`,
            },
        });
        for (let i = 0; i < animaitonUniform.length; i++) {
            if (!animaitonUniform[i]) {
                animaitonUniform[i] = 0;
            }
        }
        const unfirms = new Float32Array(animaitonUniform);
        if (overlay) {
            this.overlayAnimationUniforms.set(voxelSubstanceType, unfirms);
        }
        else {
            this.animationUniforms.set(voxelSubstanceType, unfirms);
        }
        return unfirms;
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
                    const material = this.animatedMaterials[anim.substance];
                    if (anim.overlay) {
                        const uniformArray = this.overlayAnimationUniforms.get(anim.substance);
                        uniformArray[anim.uniformIndex] = anim.keys[anim.currentFrame];
                        //@ts-ignore
                        material.setFloats("animationIndexArrayO", uniformArray);
                        return;
                    }
                    const uniformArray = this.animationUniforms.get(anim.substance);
                    uniformArray[anim.uniformIndex] = anim.keys[anim.currentFrame];
                    //@ts-ignore
                    material.setFloats("animationIndexArray", uniformArray);
                }
                else {
                    anim.currentCount++;
                }
            }
        }, 50);
    },
};
