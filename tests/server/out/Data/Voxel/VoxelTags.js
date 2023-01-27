import { RemoteTagManager } from "../../Libs/DivineBinaryTags/RemoteTagManager.js";
import { Register } from "../Register/Register.js";
class VDTags extends RemoteTagManager {
    id;
    voxelMap = new Uint16Array();
    substanceRecord = Register.voxels.substanceRecord;
    materialMap = Register.voxels.materialMap;
    colliderMap = Register.voxels.colliderMap;
    constructor(id) {
        super(id);
        this.id = id;
    }
    sync(voxelMap) {
        this.voxelMap = voxelMap;
    }
    setVoxel(id) {
        const index = this.voxelMap[id];
        this.setTagIndex(index);
    }
    getTrueSubstance(id) {
        this.setVoxel(id);
        return this.substanceRecord[this.getTag("#dve_substance")];
    }
    getMaterial(id) {
        this.setVoxel(id);
        const material = this.materialMap[this.getTag("#dve_material")];
        if (!material)
            return "none";
        return material;
    }
    getCollider(id) {
        this.setVoxel(id);
        const collider = this.colliderMap[this.getTag("#dve_collider_id")];
        if (!collider)
            return "none";
        return collider;
    }
}
export const VoxelTags = new VDTags("voxel-data");
