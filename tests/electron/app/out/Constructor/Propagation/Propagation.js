import { RGBRemove, RGBUpdate } from "./Illumanation/Functions/RGBUpdate.js";
import { SunRemove, SunUpdate } from "./Illumanation/Functions/SunUpdate.js";
import { RunWorldSun } from "./Illumanation/Functions/WorldSun.js";
import { FlowUpdate } from "./Flow/Functions/FlowUpdate.js";
import { FlowRemove } from "./Flow/Functions/FlowRemove.js";
import { ExplosionManager } from "./Explosion/ExplosionManager.js";
export const Propagation = {
    expolosion: {
        run(tasks) {
            ExplosionManager.runExplosion(tasks);
        },
    },
    flow: {
        async update(tasks) {
            await FlowUpdate(tasks);
        },
        async remove(tasks) {
            await FlowRemove(tasks);
        },
    },
    worldSun: {
        run(tasks) {
            RunWorldSun(tasks);
        },
    },
    rgb: {
        update(tasks) {
            RGBUpdate(tasks);
        },
        remove(tasks) {
            RGBRemove(tasks);
        },
    },
    sun: {
        update(tasks) {
            SunUpdate(tasks);
        },
        remove(tasks) {
            SunRemove(tasks);
        },
    },
};
