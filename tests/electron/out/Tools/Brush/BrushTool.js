import { WorldPainter as WD } from "../../Data/World/WorldPainter.js";
import { Util } from "../../Global/Util.helper.js";
import { VoxelBrush } from "./Brush.js";
import { LightData as LD } from "../../Data/Light/LightByte.js";
import { VoxelData } from "../../Data/Voxel/VoxelData.js";
import { $3dMooreNeighborhood } from "../../Data/Constants/Util/CardinalNeighbors.js";
import { WorldBounds } from "../../Data/World/WorldBounds.js";
import { ConstructorQueues as QM } from "../../Common/Queues/ConstructorQueues.js";
import { EngineSettings as ES } from "../../Data/Settings/EngineSettings.js";
import { VoxelPaletteReader } from "../../Data/Voxel/VoxelPalette.js";
import { DataTool } from "../Data/DataTool.js";
import { TasksTool } from "../Tasks/TasksTool.js";
const tasks = TasksTool();
const getUpdateState = () => {
    return {
        phase: "pre",
        status: "idle",
        pre: {
            rgb: false,
            sun: false,
        },
        paint: {
            done: false,
        },
        post: {
            rgb: false,
            build: false,
        },
    };
};
const getRemoveState = () => {
    return {
        phase: "pre",
        status: "idle",
        pre: {
            light: false,
        },
        post: {
            build: false,
        },
    };
};
const dataTool = new DataTool();
const preRemove = (l, data, onDone) => {
    const dimension = data.dimension;
    const x = data.position[0];
    const y = data.position[1];
    const z = data.position[2];
    if (!ES.doLight()) {
        onDone();
        return;
    }
    const updates = {
        rgb: 0,
        sun: 0,
    };
    dataTool.loadIn(x, y, z);
    if (l > 0) {
        dataTool.setLight(l).commit();
        if (ES.doRGBPropagation()) {
            tasks.light.rgb.remove.add(x, y, z);
        }
        if (ES.doSunPropagation()) {
            tasks.light.sun.remove.add(x, y, z);
        }
    }
    if (l < 0) {
        for (const n of $3dMooreNeighborhood) {
            if (n[0] == 0 && n[1] == 0 && n[2] == 0)
                continue;
            let nx = x + n[0];
            let ny = y + n[1];
            let nz = z + n[2];
            if (!dataTool.loadIn(nx, ny, nz))
                continue;
            const l = dataTool.getLight();
            if (l < 0)
                continue;
            if (LD.getS(l) > 0) {
                tasks.light.sun.update.add(nx, ny, nz);
            }
            if (LD.hasRGBLight(l)) {
                tasks.light.rgb.update.add(nx, ny, nz);
            }
        }
    }
    if (ES.doSunPropagation() && ES.doRGBPropagation()) {
        tasks.light.sun.remove.run(() => {
            updates.sun = 1;
            tasks.light.sun.update.run(() => {
                updates.sun = 2;
                tasks.light.rgb.remove.run(() => {
                    updates.rgb = 1;
                    tasks.light.rgb.update.run(() => {
                        updates.rgb = 2;
                    });
                });
            });
        });
    }
    if (ES.doRGBPropagation() && !ES.doSunPropagation()) {
        tasks.light.rgb.remove.run(() => {
            updates.rgb = 1;
            tasks.light.rgb.update.run(() => {
                updates.rgb = 2;
            });
        });
    }
    const inte = setInterval(() => {
        if (ES.doSunPropagation() && ES.doRGBPropagation()) {
            if (updates.rgb == 2 && updates.sun == 2) {
                clearInterval(inte);
                onDone();
            }
            return;
        }
        if (updates.rgb == 2) {
            clearInterval(inte);
            onDone();
        }
    }, 1);
};
const prePaint = (data, onDone) => {
    const x = data.position[0];
    const y = data.position[1];
    const z = data.position[2];
    let needLightUpdate = false;
    if (ES.doRGBPropagation()) {
        needLightUpdate = true;
        tasks.light.rgb.remove.add(x, y, z);
    }
    if (ES.doSunPropagation()) {
        needLightUpdate = true;
        tasks.light.sun.remove.add(x, y, z);
    }
    if (!needLightUpdate) {
        onDone();
        return;
    }
    const updates = {
        rgb: 0,
        sun: 0,
    };
    tasks.light.sun.remove.run(() => {
        updates.sun = 1;
        tasks.light.rgb.remove.run(() => {
            updates.rgb = 1;
        });
    });
    const inte = setInterval(() => {
        if (ES.doSunPropagation()) {
            if (updates.rgb == 1 && updates.sun == 1) {
                clearInterval(inte);
                onDone();
            }
            return;
        }
        if (updates.rgb == 1) {
            clearInterval(inte);
            onDone();
        }
    }, 1);
};
const postUpdate = (data, lightSource, lightValue, onDone) => {
    const x = data.position[0];
    const y = data.position[1];
    const z = data.position[2];
    let needLightUpdate = false;
    if (ES.settings.lighting?.autoRGBLight) {
        if (lightSource && lightValue) {
            needLightUpdate = true;
            tasks.light.rgb.update.add(x, y, z);
        }
    }
    if (needLightUpdate) {
        tasks.light.rgb.update.run(onDone);
        return;
    }
    onDone();
};
const rebuild = (data, onDone) => {
    const x = data.position[0];
    const y = data.position[1];
    const z = data.position[2];
    for (let i = 0; i < $3dMooreNeighborhood.length; i++) {
        const n = $3dMooreNeighborhood[i];
        const chunkPOS = WorldBounds.getChunkPosition(n[0] + x, n[1] + y, n[2] + z);
        QM.build.chunk.add([data.dimension, chunkPOS.x, chunkPOS.y, chunkPOS.z, 1]);
    }
    QM.build.chunk.run();
    QM.build.chunk.onDone("main", onDone);
};
export const GetBrush = () => {
    let brush = Util.merge(new VoxelBrush(), {
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
        paintAndUpdate(onDone = () => { }) {
            const state = getUpdateState();
            const data = JSON.parse(JSON.stringify(brush.data));
            const id = VoxelPaletteReader.id.numberFromString(data.id);
            const voxleData = VoxelData.getVoxelData(id);
            const inte = setInterval(() => {
                if (state.phase == "pre") {
                    if (state.status == "waiting") {
                        return;
                    }
                    if (state.status == "idle") {
                        state.status = "waiting";
                        prePaint(data, () => {
                            state.pre.sun = true;
                            state.pre.rgb = true;
                            state.status = "idle";
                            state.phase = "paint";
                        });
                        return;
                    }
                }
                if (state.phase == "paint") {
                    if (state.paint.done) {
                        state.phase = "post";
                        return;
                    }
                    WD.paint.voxel(data, false);
                    state.paint.done = true;
                    return;
                }
                if (state.phase == "post") {
                    if (state.status == "waiting") {
                        return;
                    }
                    if (state.status == "idle") {
                        if (state.post.build && state.post.rgb) {
                            if (onDone) {
                                onDone();
                            }
                            clearInterval(inte);
                        }
                        if (!state.post.rgb) {
                            state.status = "waiting";
                            postUpdate(data, voxleData.lightSource, voxleData.lightValue, () => {
                                state.post.rgb = true;
                                state.status = "idle";
                            });
                            return;
                        }
                        if (!state.post.build) {
                            state.status = "waiting";
                            rebuild(data, () => {
                                state.post.build = true;
                                state.status = "idle";
                            });
                            return;
                        }
                        return;
                    }
                }
            }, 1);
        },
        ereaseAndUpdate(onDone) {
            const state = getRemoveState();
            const data = JSON.parse(JSON.stringify(brush.data));
            dataTool.loadIn(data.position[0], data.position[1], data.position[2]);
            const l = dataTool.getLight();
            WD.paint.erease(data.dimension, data.position[0], data.position[1], data.position[2]);
            const inte = setInterval(() => {
                if (state.phase == "pre") {
                    if (state.status == "waiting") {
                        return;
                    }
                    if (state.status == "idle") {
                        state.status = "waiting";
                        preRemove(l, data, () => {
                            state.status = "idle";
                            state.phase = "post";
                        });
                        return;
                    }
                }
                if (state.phase == "post") {
                    if (state.status == "waiting") {
                        return;
                    }
                    if (state.status == "idle") {
                        if (state.post.build) {
                            if (onDone) {
                                onDone();
                            }
                            clearInterval(inte);
                            return;
                        }
                        if (!state.post.build) {
                            state.status = "waiting";
                            rebuild(data, () => {
                                state.post.build = true;
                                state.status = "idle";
                            });
                            return;
                        }
                    }
                    return;
                }
            }, 1);
        },
    });
    return brush;
};
