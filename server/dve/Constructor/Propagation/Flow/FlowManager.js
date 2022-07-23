import { RunFlowNoChunkBuild } from "./Functions/RunFlowNoChunkBuild.js";
import { RunFlowReduce, RunFlowRemove, RunRemovePropagation, } from "./Functions/RunFlowRemove.js";
import { WorldMatrix } from "../../../Matrix/WorldMatrix.js";
import { RunFlow, RunFlowIncrease, RunFlowPropagation, } from "./Functions/RunFlow.js";
import { DVEP } from "../DivineVoxelEnginePropagation.js";
export const FlowManager = {
    //voxelByte : Util.
    currentVoxel: "",
    worldMatrx: WorldMatrix,
    _visitedMap: {},
    _flowQue: [],
    _flowRemoveQue: [],
    runRemovePropagation: RunRemovePropagation,
    runFlowReduce: RunFlowReduce,
    runFlowRemove: RunFlowRemove,
    runFlow: RunFlow,
    runFlowNoChunkRebuild: RunFlowNoChunkBuild,
    runFlowIncrease: RunFlowIncrease,
    runFlowPropagation: RunFlowPropagation,
    addToMap(x, y, z) {
        this._visitedMap[`${x}-${y}-${z}`] = true;
    },
    inMap(x, y, z) {
        return this._visitedMap[`${x}-${y}-${z}`] == true;
    },
    setVoxel(level, levelState, x, y, z) {
        WorldMatrix.setVoxel(this.currentVoxel, "default", 0, x, y, z);
        WorldMatrix.setLevel(level, x, y, z);
        if (levelState == 1) {
            WorldMatrix.setLevelState(levelState, x, y, z);
        }
    },
    runRemoveCheck(x, y, z) {
        const cl = this.getLevel(x, y, z);
        const n1 = this.getLevel(x + 1, y, z);
        const n1s = this.getLevelState(x + 1, y, z);
        if ((n1 > -1 && n1 < cl) || n1s == 1) {
            this._flowRemoveQue.push([x + 1, y, z]);
        }
        const n2 = this.getLevel(x - 1, y, z);
        const n2s = this.getLevelState(x - 1, y, z);
        if ((n2 > -1 && n2 < cl) || n2s == 1) {
            this._flowRemoveQue.push([x - 1, y, z]);
        }
        const n3 = this.getLevel(x, y, z + 1);
        const n3s = this.getLevelState(x, y, z + 1);
        if ((n3 > -1 && n3 < cl) || n3s == 1) {
            this._flowRemoveQue.push([x, y, z + 1]);
        }
        const n4 = this.getLevel(x, y, z - 1);
        const n4s = this.getLevelState(x, y, z - 1);
        if ((n4 > -1 && n4 < cl) || n4s == 1) {
            this._flowRemoveQue.push([x, y, z - 1]);
        }
    },
    setCurrentVoxel(x, y, z) {
        const voxelCheck = this.worldMatrx.getVoxelData(x, y, z);
        if (!voxelCheck ||
            (voxelCheck.substance != "fluid" && voxelCheck.substance != "magma")) {
            return false;
        }
        this.currentVoxel = voxelCheck.id;
        return true;
    },
    runRebuildQue() {
        DVEP.runRebuildQue();
    },
    addToRebuildQue(x, y, z) {
        DVEP.addToRebuildQue(x + 1, y, z, "all");
        DVEP.addToRebuildQue(x - 1, y, z, "all");
        DVEP.addToRebuildQue(x, y, z + 1, "all");
        DVEP.addToRebuildQue(x, y, z - 1, "all");
        DVEP.addToRebuildQue(x, y + 1, z, "all");
        DVEP.addToRebuildQue(x, y - 1, z, "all");
    },
    setLevel(level, x, y, z) {
        WorldMatrix.setLevel(level, x, y, z);
    },
    removeVoxel(x, y, z) {
        WorldMatrix.setAir(x, y, z, 0);
    },
    getLevel(x, y, z) {
        const voxel = WorldMatrix.getVoxel(x, y, z);
        if (!voxel)
            return -2;
        if (voxel[0] == this.currentVoxel) {
            return WorldMatrix.getLevel(x, y, z);
        }
        if (voxel[0] == "dve:air") {
            return 0;
        }
        return -1;
    },
    getLevelState(x, y, z) {
        const voxel = WorldMatrix.getVoxel(x, y, z);
        if (!voxel)
            return -2;
        if (voxel[0] == this.currentVoxel) {
            return WorldMatrix.getLevelState(x, y, z);
        }
        if (voxel[0] == "dve:air") {
            return -1;
        }
        return -1;
    },
    canFlowOutwardTest(x, y, z) {
        const level = this.getLevel(x, y - 1, z);
        if (level == -1) {
            return true;
        }
        return false;
    },
    canFlowDownardTest(x, y, z) {
        const level = this.getLevel(x, y - 1, z);
        if (level >= 0) {
            return true;
        }
        return false;
    },
    flowDownTest(x, y, z) {
        const level = this.getLevel(x, y - 1, z);
        if (level >= 0) {
            return true;
        }
        return false;
    },
    wait(ms) {
        return new Promise((resolve, reject) => setTimeout(resolve, ms));
    },
};
