import { NodeManager } from "../Nodes/NodeManager.js";
import { DVEBabylon } from "../Babylon/DVEBabylon.js";
import { RenderManager } from "../Render/RenderManager.js";
export class SceneTool {
    constructor() {
        this.sky._s = this;
        this.fog._s = this;
        this.effects._s = this;
        this.levels._s = this;
    }
    sky = {
        _s: {},
        setColor(r, g, b) {
            //todo
            return this._s;
        },
    };
    fog = {
        _s: {},
        setHeightFactor(v) {
            RenderManager.updateFogOptions({ volumetricOptions: { heightFactor: v } });
            return this._s;
        },
        setDensity(v) {
            RenderManager.updateFogOptions({ density: v });
            NodeManager.materials.updateFogOptions(RenderManager.fogData);
            return this._s;
        },
        setMode(mode) {
            RenderManager.updateFogOptions({ mode: mode });
            NodeManager.materials.updateFogOptions(RenderManager.fogData);
            return this._s;
        },
        setColor(r, g = r, b = r) {
            RenderManager.updateFogOptions({ color: new DVEBabylon.system.Color3(r, g, b) });
            NodeManager.materials.updateFogOptions(RenderManager.fogData);
            return this._s;
        },
    };
    effects = {
        _s: {},
        setFloraEffects(enabled) {
            RenderManager.updateShaderEffectOptions({ floraEffects: enabled });
            return this._s;
        },
        setLiquidEffects(enabled) {
            RenderManager.updateShaderEffectOptions({ liquidEffects: enabled });
            return this._s;
        },
    };
    levels = {
        _s: {},
        setBase(v) {
            RenderManager.setBaseLevel(v);
            NodeManager.materials.setBaseLevel(v);
            return this._s;
        },
        setSun(v) {
            RenderManager.setSunLevel(v);
            NodeManager.materials.setSunLevel(v);
            return this._s;
        },
    };
}
