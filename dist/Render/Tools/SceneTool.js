import { NodeManager } from "../Nodes/NodeManager.js";
import { DVEBabylon } from "../Nodes/DVEBabylon.js";
export class SceneTool {
    constructor() { }
    sky = {
        setColor: (r, g, b) => {
            return this;
        },
    };
    fog = {
        setHeightFactor: (v) => {
            NodeManager.materials.updateFogOptions({
                volumetricOptions: { heightFactor: v },
            });
            return this;
        },
        setDensity: (v) => {
            NodeManager.materials.updateFogOptions({ density: v });
            return this;
        },
        setMode: (mode) => {
            NodeManager.materials.updateFogOptions({ mode: mode });
            return this;
        },
        setColor: (r, g = r, b = r) => {
            NodeManager.materials.updateFogOptions({
                color: new DVEBabylon.system.Color3(r, g, b),
            });
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
