export const OverrideManager = {
    overrides: {
        AO: new Map(),
        AOFlipFace: new Map(),
        CullFace: new Map(),
        FlipFace: new Map(),
        DarkenFaceUnderneath: new Map(),
    },
    registerOverride(type, subjectId, neighborShapeId, run) {
        let map = this.overrides[type].get(subjectId);
        if (!map) {
            map = new Map();
            this.overrides[type].set(subjectId, map);
        }
        map.set(neighborShapeId, run);
    },
    hasOverride(type, shapeId, neighborShapeId) {
        let map = this.overrides[type].get(shapeId);
        if (!map)
            return false;
        return map.has(neighborShapeId);
    },
    runOverride(type, firstId, secondOverride, data) {
        let map = this.overrides[type].get(firstId);
        if (!map)
            return data.default;
        const run = map.get(secondOverride);
        if (!run)
            return data.default;
        return run(data);
    },
};
