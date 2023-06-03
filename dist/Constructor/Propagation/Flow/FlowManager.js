import { $3dCardinalNeighbors } from "../../../Math/Constants/CardinalNeighbors.js";
import { LightData } from "../../../Data/Light/LightByte.js";
import { DataTool } from "../../../Tools/Data/DataTool.js";
import { BrushTool } from "../../../Tools/Brush/Brush.js";
import { SunRemove, SunUpdate } from "../Illumanation/Functions/SunUpdate.js";
import { RGBRemove, RGBUpdate } from "../Illumanation/Functions/RGBUpdate.js";
import { IlluminationManager } from "../Illumanation/IlluminationManager.js";
import { SubstanceDataTool } from "../../../Tools/Data/SubstanceDataTool.js";
export const FlowManager = {
    lightData: LightData,
    _brush: new BrushTool(),
    _sDataTool: new DataTool(),
    _nDataTool: new DataTool(),
    _substanceTool: new SubstanceDataTool(),
    setVoxel(tasks, vox, level, levelState, x, y, z) {
        this.sunCheck(tasks, x, y, z);
        SunRemove(tasks);
        this._brush.setId(vox).setXYZ(x, y, z).paint();
        this._sDataTool.loadInAt(x, y, z);
        this._sDataTool
            .setLevel(level)
            .setLevelState(levelState)
            .setLight(this.getAbsorbLight(x, y, z))
            .commit();
        SunUpdate(tasks);
    },
    setDimension(dimension) {
        this._sDataTool.setDimension(dimension);
        this._nDataTool.setDimension(dimension);
        this._brush.setDimension(dimension);
        IlluminationManager.setDimension(dimension);
    },
    removeVoxel(tasks, x, y, z) {
        for (const n of $3dCardinalNeighbors) {
            const nx = x + n[0];
            const ny = y + n[1];
            const nz = z + n[2];
            if (!this._nDataTool.loadInAt(nx, ny, nz))
                continue;
            const l = this._nDataTool.getLight();
            if (l <= 0)
                continue;
            if (this.lightData.getS(l) > 0) {
                tasks.queues.sun.update.push(nx, ny, nz);
            }
            if (this.lightData.hasRGBLight(l)) {
                tasks.queues.rgb.update.push(nx, ny, nz);
            }
        }
        this._nDataTool.loadInAt(x, y, z);
        const currentLight = this._nDataTool.getLight();
        this._brush.setXYZ(x, y, z).erase();
        this._nDataTool.clear().loadInAt(x, y, z);
        this._nDataTool.setLight(currentLight).commit();
        tasks.queues.rgb.remove.push(x, y, z);
        RGBRemove(tasks);
        SunUpdate(tasks);
        RGBUpdate(tasks);
    },
    getFlowRate(substance) {
        this._substanceTool.setSubstance(substance);
        return this._substanceTool.getFlowRate();
    },
    getVoxel(x, y, z) {
        if (!this._sDataTool.loadInAt(x, y, z))
            return false;
        if (!this._sDataTool.isRenderable())
            return false;
        const substance = this._sDataTool.getSubstnaceData();
        if (!substance.isLiquid())
            return false;
        return this._sDataTool;
    },
    setLevel(level, x, y, z) {
        this._nDataTool.loadInAt(x, y, z);
        this._nDataTool.setLevel(level).commit();
    },
    getLevel(vox, x, y, z) {
        if (!this._nDataTool.loadInAt(x, y, z))
            return -2;
        const voxel = this._nDataTool.getStringId();
        if (this._nDataTool.isAir()) {
            return 0;
        }
        if (voxel == vox) {
            return this._nDataTool.getLevel();
        }
        return -1;
    },
    getLevelState(vox, x, y, z) {
        if (!this._nDataTool.loadInAt(x, y, z))
            return -2;
        const voxel = this._nDataTool.getStringId();
        if (voxel == vox) {
            return this._nDataTool.getLevelState();
        }
        if (this._nDataTool.isAir()) {
            return -1;
        }
        return -3;
    },
    canFlowOutwardTest(vox, x, y, z) {
        const level = this.getLevel(vox, x, y - 1, z);
        if (level == -1) {
            return true;
        }
        return false;
    },
    flowDownTest(vox, x, y, z) {
        const level = this.getLevel(vox, x, y - 1, z);
        if (level >= 0) {
            return true;
        }
        return false;
    },
    wait(ms) {
        return new Promise((resolve, reject) => setTimeout(resolve, ms));
    },
    _lightValues: [0, 0, 0, 0],
    getAbsorbLight(x, y, z) {
        for (const n of $3dCardinalNeighbors) {
            if (!n[0] && !n[1] && !n[2])
                continue;
            if (!this._nDataTool.loadInAt(x + n[0], y + n[1], z + n[2]))
                continue;
            let l = this._nDataTool.getLight();
            if (l <= 0)
                continue;
            const v = this.lightData.getLightValues(l);
            for (let i = 0; i < 4; i++) {
                if (this._lightValues[i] < v[i]) {
                    this._lightValues[i] = v[i];
                }
            }
        }
        let brightest = this.lightData.setLightValues(this._lightValues);
        for (let i = 0; i < 4; i++) {
            this._lightValues[i] = 0;
        }
        return this.lightData.minusOneForAll(brightest);
    },
    sunCheck(tasks, x, y, z) {
        if (!this._nDataTool.loadInAt(x, y - 1, z))
            return;
        if (!this._nDataTool.isAir())
            return;
        const l = this._nDataTool.getLight();
        if (this.lightData.getS(l) == 0xf) {
            tasks.queues.sun.remove.push(x, y - 1, z);
        }
    },
};
