import { ThreadComm } from "../../Libs/ThreadComm/ThreadComm.js";
import { DVER } from "../DivineVoxelEngineRender.js";
import { Distance3D } from "../../Math/Functions/Distance3d.js";
export const RenderTasks = {
    setChunk: ThreadComm.registerTasks("set-chunk", (data) => {
        DVER.meshManager.updateChunk(data);
    }),
    removeChunk: ThreadComm.registerTasks("remove-chunk", (data) => {
        DVER.meshManager.removeChunk(data);
    }),
    removeColumn: ThreadComm.registerTasks("remove-column", (data) => {
        DVER.meshManager.removeColumn(data);
    }),
    removeColumnsOutsideRadius: ThreadComm.registerTasks("remove-column-outside-radius", (data) => {
        const dimesnionId = data[0];
        const x = data[1];
        const y = data[2];
        const z = data[3];
        const maxRadius = data[4];
        const register = DVER.render.meshRegister;
        const dimension = register.dimensions.get(dimesnionId);
        if (!dimension)
            return;
        dimension.forEach((region) => {
            region.columns.forEach((column) => {
                const pos = column.position;
                const distnace = Distance3D(pos[0], 0, pos[2], x, 0, z);
                if (distnace > maxRadius) {
                    register.column.remove(dimesnionId, pos[0], pos[2], pos[1]);
                }
            });
        });
    }),
};
