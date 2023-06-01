import { NodeSubstance } from "./NodeSubstance.js";
import { UtilMap } from "../../../Global/Util/UtilMap.js";
export const NodeSubstanceManager = {
    substances: new UtilMap(),
    add(meshes) {
        for (const mesh of meshes) {
            this.substances.add([[mesh.id, new NodeSubstance(mesh)]]);
        }
    },
    buldAll() {
        for (const [key, substance] of this.substances._map) {
            substance.build();
        }
    },
    get(id) {
        return this.substances.get(id);
    },
};
