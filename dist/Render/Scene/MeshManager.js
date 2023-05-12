import { MeshRegister } from "./MeshRegister.js";
import { Distance3D } from "../../Math/Functions/Distance3d.js";
import { NodeManager } from "../Nodes/NodeManager.js";
export const MeshManager = {
    scene: {},
    runningUpdate: false,
    $INIT(scene) {
        this.scene = scene;
        scene.freeActiveMeshes();
    },
    removeColumnsOutsideRadius(origion, radius) {
        const [dimesnionId, x, y, z] = origion;
        const dimension = MeshRegister.dimensions.get(dimesnionId);
        if (!dimension)
            return;
        dimension.forEach((region) => {
            region.columns.forEach((column) => {
                const location = column.location;
                const distnace = Distance3D(location[1], 0, location[3], x, 0, z);
                if (distnace > radius) {
                    this.chunks.removeColumn(location);
                }
            });
        });
    },
    chunks: {
        remove(data) {
            const [location, substance] = data;
            const mesh = MeshRegister.chunk.remove(location, substance);
            if (!mesh)
                return false;
            NodeManager.meshes.get(substance).returnMesh(mesh);
        },
        update(data) {
            const [location, chunks] = data;
            let i = chunks.length;
            while (i--) {
                const chunkData = chunks[i];
                const substance = chunkData[0];
                const remove = !chunkData[1];
                if (remove) {
                    const mesh = MeshRegister.chunk.remove(location, substance);
                    if (mesh) {
                        NodeManager.meshes.get(substance).returnMesh(mesh);
                    }
                    continue;
                }
                let chunk = MeshRegister.chunk.get(location, substance);
                let mesh;
                if (!chunk) {
                    mesh = NodeManager.meshes.get(substance).createMesh(chunkData[1]);
                    mesh.type = "chunk";
                    MeshRegister.chunk.add(location, mesh, substance);
                }
                else {
                    mesh = chunk.mesh;
                    NodeManager.meshes.get(substance).updateVetexData(chunkData[1], mesh);
                }
            }
        },
        removeColumn(data) {
            const column = MeshRegister.column.remove(data);
            if (!column)
                return false;
            for (const [key, chunk] of column.chunks) {
                for (const [substance, mesh] of chunk) {
                    NodeManager.meshes.get(substance).returnMesh(mesh.mesh);
                }
            }
        },
    },
};
