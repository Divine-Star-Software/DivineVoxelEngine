import { NodeManager } from "../Nodes/NodeManager.js";
import { DVEBabylon } from "../Babylon/DVEBabylon.js";
import { RenderManager } from "../Render/RenderManager.js";
export class SceneTool {
    constructor() { }
    sky = {
        setColor: (r, g, b) => {
            return this;
        },
    };
    fog = {
        setHeightFactor: (v) => {
            RenderManager.updateFogOptions({ volumetricOptions: { heightFactor: v } });
            NodeManager.materials.updateFogOptions(RenderManager.fogData);
            return this;
        },
        setDensity: (v) => {
            RenderManager.updateFogOptions({ density: v });
            NodeManager.materials.updateFogOptions(RenderManager.fogData);
            return this;
        },
        setMode: (mode) => {
            RenderManager.updateFogOptions({ mode: mode });
            NodeManager.materials.updateFogOptions(RenderManager.fogData);
            return this;
        },
        setColor: (r, g = r, b = r) => {
            RenderManager.updateFogOptions({
                color: new DVEBabylon.system.Color3(r, g, b),
            });
            NodeManager.materials.updateFogOptions(RenderManager.fogData);
            return this;
        },
    };
    levels = {
        setBase: (v) => {
            NodeManager.materials.setBaseLevel(v);
            return this;
        },
        setSun: (v) => {
            NodeManager.materials.setSunLevel(v);
            return this;
        },
    };
    options = {
        doColor: (v) => {
            NodeManager.materials.setOption("doColor", v);
            return this.options;
        },
        doAO: (v) => {
            NodeManager.materials.setOption("doAO", v);
            return this.options;
        },
        doSun: (v) => {
            NodeManager.materials.setOption("doSun", v);
            return this.options;
        },
        doRGB: (v) => {
            NodeManager.materials.setOption("doRGB", v);
            return this.options;
        },
        doEffects: (v) => {
            NodeManager.materials.setOption("doEffects", v);
            return this.options;
        },
    };
}
