import type { TextureArray } from "./TextureArray";

export const TextureAnimationCreator = {
  createAnimations(texture: TextureArray) {
    if (!texture.paths.size) return;
    const animaitonUniform: number[] = [];
    let i = 0;
    for (const anim of texture.animationsMap) {
      animaitonUniform[anim[0]] = anim[0];
      let keyCounts: number[] = [];
      const animTime = texture.animationTimes[i];
      if (animTime.length == 1) {
        for (let k = 0; k < anim.length; k++) {
          keyCounts.push(animTime[0]);
        }
      } else {
        keyCounts = texture.animationTimes[i];
      }

      texture.animations.push({
        uniformIndex: anim[0],
        keys: anim,
        currentFrame: 0,
        currentCount: 0,
        keyCounts: keyCounts,
      });
      i++;
    }
    for (let i = 0; i < texture.totalTextures; i++) {
      if (!animaitonUniform[i]) {
        animaitonUniform[i] = 0;
      }
    }

    texture.animationUniform = new Float32Array(animaitonUniform);
  },
};
