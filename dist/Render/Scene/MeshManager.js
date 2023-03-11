import { DVER } from "../DivineVoxelEngineRender.js";
import { MeshRegister } from "./MeshRegister.js";
import { Distance3D } from "../../Math/Functions/Distance3d.js";
export const MeshManager = {
    scene: {},
    runningUpdate: false,
    meshMakers: {},
    $INIT(scene) {
        this.scene = scene;
        scene.freeActiveMeshes();
        this.meshMakers = {
            "#dve_solid": DVER.render.solidMesh,
            "#dve_transparent": DVER.render.solidMesh,
            "#dve_liquid": DVER.render.liquidMesh,
            "#dve_flora": DVER.render.floraMesh,
            "#dve_magma": DVER.render.liquidMesh,
        };
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
            MeshManager.meshMakers[substance].removeMesh(mesh);
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
                        MeshManager.meshMakers[substance].removeMesh(mesh);
                    }
                    continue;
                }
                let chunk = MeshRegister.chunk.get(location, substance);
                let mesh;
                if (!chunk) {
                    mesh = MeshManager.meshMakers[substance].createTemplateMesh(MeshManager.scene);
                    MeshRegister.chunk.add(location, mesh, substance);
                    MeshManager.meshMakers[substance].setMeshData(mesh, location, chunkData);
                }
                else {
                    mesh = chunk.mesh;
                    MeshManager.meshMakers[substance].setMeshData(mesh, location, chunkData);
                }
            }
        },
        removeColumn(data) {
            const column = MeshRegister.column.remove(data);
            if (!column)
                return false;
            for (const [key, chunk] of column.chunks) {
                for (const [substance, mesh] of chunk) {
                    MeshManager.meshMakers[substance].removeMesh(mesh.mesh);
                }
            }
        },
    },
};
