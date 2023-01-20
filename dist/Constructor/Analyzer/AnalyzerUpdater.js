export const AnalyzerUpdater = {
    _voxels: new Map(),
    registerVoxel(id, run) {
        this._voxels.set(id, run);
    },
    getVoxel(id) {
        const run = this._voxels.get(id);
        if (!run)
            return false;
        return run;
    },
};
