//util
import { $3dMooreNeighborhood } from "../../Data/Constants/Util/CardinalNeighbors.js";
import { Util } from "../../Global/Util.helper.js";
//objects
import { WorldBounds } from "../../Data/World/WorldBounds.js";
//tools
import { BrushTool } from "./Brush.js";
import { TasksTool } from "../Tasks/TasksTool.js";
const tasks = TasksTool();
const setFocus = (dim, x, y, z) => {
    tasks.setFocalPoint(x, y, z, dim);
};
const rebuild = (dim, x, y, z, onDone) => {
    setFocus(dim, x, y, z);
    for (let i = 0; i < $3dMooreNeighborhood.length; i++) {
        const n = $3dMooreNeighborhood[i];
        const chunkPOS = WorldBounds.getChunkPosition(n[0] + x, n[1] + y, n[2] + z);
        tasks.build.chunk.add(chunkPOS.x, chunkPOS.y, chunkPOS.z);
    }
    tasks.build.chunk.run(onDone);
};
export const GetAdvancedBrushTool = () => {
    let brush = Util.merge(new BrushTool(), {
        paintAndAwaitUpdate() {
            const self = this;
            return new Promise((resolve) => {
                self.paintAndUpdate(() => {
                    resolve(true);
                });
            });
        },
        ereaseAndAwaitUpdate() {
            const self = this;
            return new Promise((resolve) => {
                self.ereaseAndUpdate(() => {
                    resolve(true);
                });
            });
        },
        paintAndUpdate(onDone) {
            const dimesnion = brush.data.dimension;
            const x = brush.data.position[0];
            const y = brush.data.position[1];
            const z = brush.data.position[2];
            setFocus(dimesnion, x, y, z);
            tasks.voxelUpdate.paint.add(x, y, z, brush.getRaw());
            tasks.voxelUpdate.paint.run(() => {
                setFocus(dimesnion, x, y, z);
                rebuild(dimesnion, x, y, z, () => (onDone ? onDone() : 0));
            });
        },
        ereaseAndUpdate(onDone) {
            const dimesnion = brush.data.dimension;
            const x = brush.data.position[0];
            const y = brush.data.position[1];
            const z = brush.data.position[2];
            setFocus(dimesnion, x, y, z);
            tasks.voxelUpdate.erease.add(x, y, z);
            tasks.voxelUpdate.erease.run(() => {
                setFocus(dimesnion, x, y, z);
                rebuild(dimesnion, x, y, z, () => (onDone ? onDone() : 0));
            });
        },
        explode(radius = 6, onDone) {
            const dimesnion = brush.data.dimension;
            const x = brush.data.position[0];
            const y = brush.data.position[1];
            const z = brush.data.position[2];
            setFocus(dimesnion, x, y, z);
            tasks.explosion.run.add(x, y, z, radius);
            tasks.explosion.run.run(() => {
                setFocus(dimesnion, x, y, z);
                tasks.build.chunk.run(() => (onDone ? onDone() : 0));
            });
        },
    });
    return brush;
};
