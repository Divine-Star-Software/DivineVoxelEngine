export const ConstantsManager = {
  effectsBaesPath: "DAE",
  customEffectsBaesPath: "DAE/custom",

  setEffectsBaePath(path: string) {
    this.effectsBaesPath = path;
  },
  setCustomEffectsBaePath(path: string) {
    this.customEffectsBaesPath = path;
  },
  getBuiltInReverbPath(id : string) {
    return `${this.effectsBaesPath}/reverb/${id}.wav`;
  },
  getCustomReverbPath(id : string) {
    return `${this.effectsBaesPath}${id}.wav`;
  }
};
