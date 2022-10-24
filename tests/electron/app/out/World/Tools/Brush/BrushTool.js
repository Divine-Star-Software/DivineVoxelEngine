import { WorldData as WD } from "../../../Data/World/WorldData.js";
import { Util } from "../../../Global/Util.helper.js";
import { VoxelBrush } from "../../../Tools/Brush/Brush.js";
import { LightData as LD } from "../../../Data/Light/LightByte.js";
import { VoxelData } from "../../../Data/Voxel/VoxelData.js";
import { $3dMooreNeighborhood } from "../../../Data/Constants/Util/CardinalNeighbors.js";
import { WorldBounds } from "../../../Data/World/WorldBounds.js";
import { QueuesManager as QM } from "../../Queues/QueuesManager.js";
import { EngineSettings as ES } from "../../../Data/Settings/EngineSettings.js";
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
    if (l > 0) {
        WD.light.set(dimension, x, y, z, l);
        if (ES.doRGBPropagation()) {
            QM.rgb.remove.add([x, y, z]);
        }
        if (ES.doSunPropagation()) {
            QM.sun.remove.add([x, y, z]);
        }
    }
    if (l < 0) {
        for (const n of $3dMooreNeighborhood) {
            if (n[0] == 0 && n[1] == 0 && n[2] == 0)
                continue;
            let nx = x + n[0];
            let ny = y + n[1];
            let nz = z + n[2];
            const l = WD.light.get(dimension, nx, ny, nz);
            if (l < 0)
                continue;
            if (LD.getS(l) > 0) {
                QM.sun.update.add([nx, ny, nz]);
            }
            if (LD.hasRGBLight(l)) {
                QM.rgb.update.add([nx, ny, nz]);
            }
        }
    }
    if (ES.doSunPropagation() && ES.doRGBPropagation()) {
        QM.sun.remove.run();
        QM.sun.remove.onDone("main", () => {
            updates.sun = 1;
            QM.sun.update.run();
            QM.sun.update.onDone("main", () => {
                updates.sun = 2;
                QM.rgb.remove.run();
                QM.rgb.remove.onDone("main", () => {
                    updates.rgb = 1;
                    QM.rgb.update.run();
                    QM.rgb.update.onDone("main", () => {
                        updates.rgb = 2;
                    });
                });
            });
        });
    }
    if (ES.doRGBPropagation() && !ES.doSunPropagation()) {
        QM.rgb.remove.run();
        QM.rgb.remove.onDone("main", () => {
            updates.rgb = 1;
            QM.rgb.update.run();
            QM.rgb.update.onDone("main", () => {
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
        QM.rgb.remove.add([x, y, z]);
    }
    if (ES.doSunPropagation()) {
        needLightUpdate = true;
        QM.sun.remove.add([x, y, z]);
    }
    if (!needLightUpdate) {
        onDone();
        return;
    }
    const updates = {
        rgb: 0,
        sun: 0,
    };
    QM.sun.remove.run();
    QM.sun.remove.onDone("main", () => {
        updates.sun = 1;
        QM.rgb.remove.run();
        QM.rgb.remove.onDone("main", () => {
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
            QM.rgb.update.add([x, y, z]);
        }
    }
    if (needLightUpdate) {
        QM.rgb.update.run();
        QM.rgb.update.onDone("main", onDone);
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
            const id = WD.voxel.id.numberFromString(data.id);
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
            const l = WD.light.get(data.dimension, data.position[0], data.position[1], data.position[2]);
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
