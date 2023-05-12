//built in
//objects
import { FOManager } from "./FloatingOrigin/FoManager.js";
import { MeshRegister } from "../Scene/MeshRegister.js";
import { MeshManager } from "../Scene/MeshManager.js";
import { MeshCuller } from "../Scene/MeshCuller.js";
import { NodeShaders } from "../Nodes/Shaders/NodeShaders.js";
import { DVEBabylon } from "../Babylon/DVEBabylon.js";
import { SceneTool } from "../Tools/SceneTool.js";
export const RenderManager = {
    fogOptions: {},
    meshRegister: MeshRegister,
    meshManager: MeshManager,
    meshCuller: MeshCuller,
    fogData: {},
    lightGradient: [
        0.06, 0.1, 0.11, 0.14, 0.17, 0.21, 0.26, 0.31, 0.38, 0.45, 0.54, 0.64, 0.74,
        0.85, 0.97, 1,
    ],
    mipMapLevels: [0, 1, 2, 3],
    effectOptions: {
        floraEffects: false,
        liquidEffects: false,
    },
    fo: FOManager,
    shaders: NodeShaders,
    sceneTool: new SceneTool(),
    scene: null,
    updateFogOptions(options) {
        for (const key of Object.keys(options)) {
            //@ts-ignore
            const data = options[key];
            if (typeof data == "object") {
                for (const key2 of Object.keys(data)) {
                    const data2 = data[key2];
                    this.fogOptions[key][key2] = data2;
                }
            }
            else {
                this.fogOptions[key] = data;
            }
        }
        if (options.color && this.scene) {
            //@ts-ignore
            this.scene.fogColor = options.color;
        }
        if (this.fogOptions.mode == "volumetric") {
            this.fogData.x = 1;
        }
        if (this.fogOptions.mode == "animated-volumetric") {
            this.fogData.x = 2;
        }
        this.fogData.y = this.fogOptions.density;
        this.fogData.z = this.fogOptions.volumetricOptions.heightFactor;
        this.fogData = this.fogData;
        this._setFogData();
    },
    _setFogData() {
        const fogData = this.fogData;
    },
    $INIT(scene) {
        this.fogData = new DVEBabylon.system.Vector4();
        this.fogOptions = {
            mode: "volumetric",
            density: 0.0005,
            color: new DVEBabylon.system.Color3(1, 1, 1),
            volumetricOptions: {
                heightFactor: 0.25,
            },
        };
        this.updateFogOptions(this.fogOptions);
        this._setFogData();
        this.scene = scene;
        this.meshManager.$INIT(scene);
        this.meshCuller.$INIT(scene);
    },
    getScene() {
        return this.scene;
    },
    getDefaultCamera(scene) {
        const camera = new DVEBabylon.system.UniversalCamera("", DVEBabylon.system.Vector3.Zero(), scene);
        camera.touchAngularSensibility = 10000;
        camera.speed = 1;
        camera.keysUp.push(87); // W
        camera.keysDown.push(83); // D
        camera.keysLeft.push(65); // A
        camera.keysRight.push(68); // S
        camera.keysUpward.push(69); // E
        camera.keysDownward.push(81); // Q
        camera.minZ = 0.01;
        camera.maxZ = 1000;
        camera.fov = 1.2;
        camera.attachControl(scene.getEngine().getRenderingCanvas(), true);
        scene.activeCamera = camera;
        scene.collisionsEnabled = false;
        return camera;
    },
};
