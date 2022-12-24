import { RemoteTagManager } from "../../Libs/DivineBinaryTags/RemoteTagManager.js";
import { Register } from "../Register/Register.js";
class VDTags extends RemoteTagManager {
    id;
    voxelMap = new Uint16Array();
    substanceRecord = Register.voxels.substanceRecord;
    materialMap = Register.voxels.materialMap;
    colliderMap = Register.voxels.colliderMap;
    voxelData = {
        substance: "solid",
        shapeId: 0,
        hardness: 0,
        material: "none",
        checkCollision: 0,
        colliderId: "none",
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
        this.voxelData.shapeId = this.getTag("#dve_shape_id");
        this.voxelData.hardness = this.getTag("#dve_hardness");
        this.voxelData.material = this.getMaterial(id);
        this.voxelData.checkCollision = this.getTag("#dve_check_collisions");
        this.voxelData.colliderId = this.getCollider(id);
        this.voxelData.lightSource = this.getTag("#dve_is_light_source");
        this.voxelData.lightValue = this.getTag("#dve_light_value");
        return this.voxelData;
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
