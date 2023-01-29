import { RemoteTagManager } from "../../Libs/DivineBinaryTags/RemoteTagManager.js";
class VDTags extends RemoteTagManager {
    id;
    voxelIndex = new Uint16Array();
    constructor(id) {
        super(id);
        this.id = id;
    }
    sync(voxelMap) {
        this.voxelIndex = voxelMap;
    }
    setVoxel(id) {
        const index = this.voxelIndex[id];
        this.setTagIndex(index);
    }
}
export const VoxelTags = new VDTags("voxel-data");
