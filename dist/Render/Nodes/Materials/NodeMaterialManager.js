import { UtilMap } from "../../../Global/Util/UtilMap.js";
import { NodeMaterial } from "./NodeMaterial.js";
export const NodeMaterialManager = {
    materials: new UtilMap(),
    get(id) {
        const material = this.materials.get(id);
        if (!material)
            return null;
        return material;
    },
    create(materials) {
        for (const data of materials) {
            this.materials.add([[data.id, new NodeMaterial(data)]]);
        }
    },
    updateFogOptions(data) {
        this.materials._map.forEach((_) => _.updateFogOptions(data));
    },
    setSunLevel(level) {
        this.materials._map.forEach((_) => _.setSunLightLevel(level));
    },
    setBaseLevel(level) {
        this.materials._map.forEach((_) => _.setBaseLevel(level));
    },
};
