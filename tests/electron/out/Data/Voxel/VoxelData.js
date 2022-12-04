import { RemoteTagManager } from "../../Libs/DivineBinaryTags/RemoteTagManager.js";
import { Register } from "../Register/Register.js";
class VDTags extends RemoteTagManager {
    id;
    voxelMap = new Uint16Array();
    substanceRecord = Register.voxels.substanceRecord;
    voxelData = {
        substance: "solid",
        shapeId: 0,
        hardness: 0,
        material: 0,
        checkCollision: 0,
        colliderId: 0,
        lightSource: 0,
        lightValue: 0,
        isRich: 0,
    };
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
    getVoxelData(id) {
        this.setVoxel(id);
        this.voxelData.substance = this.getTrueSubstance(id);
        this.voxelData.shapeId = this.getTag("#dve:shape_id");
        this.voxelData.hardness = this.getTag("#dve:hardness");
        this.voxelData.material = this.getTag("#dve:material");
        this.voxelData.checkCollision = this.getTag("#dve:check_collisions");
        this.voxelData.colliderId = this.getTag("#dve:collider_id");
        this.voxelData.lightSource = this.getTag("#dve:is_light_source");
        this.voxelData.lightValue = this.getTag("#dve:light_value");
        return this.voxelData;
    }
    getTrueSubstance(id) {
        this.setVoxel(id);
        return this.substanceRecord[this.getTag("#dve:substance")];
    }
}
export const VoxelTags = new VDTags("voxel-data");
