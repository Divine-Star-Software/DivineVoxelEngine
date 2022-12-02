export const ConstantsManager = {
    effectsBaesPath: "DAE",
    customEffectsBaesPath: "DAE/custom",
    setEffectsBaePath(path) {
        this.effectsBaesPath = path;
    },
    setCustomEffectsBaePath(path) {
        this.customEffectsBaesPath = path;
    },
    getBuiltInReverbPath(id) {
        return `${this.effectsBaesPath}/reverb/${id}.wav`;
    },
    getCustomReverbPath(id) {
        return `${this.effectsBaesPath}${id}.wav`;
    }
};
