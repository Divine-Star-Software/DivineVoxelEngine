export const Register = {
    stringMaps: {
        segments: new Map(),
        syncStringMap(data) {
            const [segment, id, value] = data;
            let segmentMap = this.segments.get(segment);
            if (!segmentMap) {
                segmentMap = new Map();
                this.segments.set(segment, segmentMap);
            }
            segmentMap.set(id, value);
            return;
        },
        getStringMapValue(segment, id, index) {
            const segmentMap = this.segments.get(segment);
            if (!segmentMap)
                return "";
            const map = segmentMap.get(id);
            if (!map) {
                // throw new Error(`${id} does not exists`);
                return "";
            }
            return map[index];
        },
    },
};
Register.stringMaps.segments.set("voxel", new Map());
