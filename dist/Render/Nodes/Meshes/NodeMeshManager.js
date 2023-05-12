import { UtilMap } from "../../../Global/Util/UtilMap.js";
import { NodeMesh } from "./NodeMesh.js";
export const NodeMeshManager = {
    meshes: new UtilMap(),
    add(meshes) {
        for (const mesh of meshes) {
            this.meshes.add([[mesh.id, new NodeMesh(mesh)]]);
        }
    },
    create(id, data) {
        const nodeMesh = this.meshes.get(id);
        if (!nodeMesh)
            return false;
        return nodeMesh.createMesh(data);
    },
    get(id) {
        return this.meshes.get(id);
    },
};
