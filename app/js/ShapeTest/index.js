import { DivineVoxelEngine } from "../../out/Core/DivineVoxelEngine.js";
import { Shape1 } from "./ShapeTest/Shape1.js";
const DVE = new DivineVoxelEngine();
window.DVE = DVE;
await DVE.$INIT({
    worldWorkerPath: "../../../js/ShapeTest/World/index.js",
    builderWorkerPath: "../../../js/ShapeTest/Builder/index.js",
});
const readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);
        init();
    }
}, 10);
const init = async () => {
    const canvas = document.createElement("canvas");
    canvas.id = "renderCanvas";
    document.body.append(canvas);
    window.addEventListener("click", function () {
        canvas.requestPointerLock();
    });
    const engine = new BABYLON.Engine(canvas, false, {});
    engine.doNotHandleContextLost = true;
    engine.enableOfflineSupport = false;
    engine.setSize(1920, 1080);
    const scene = new BABYLON.Scene(engine);
    //@ts-ignore
    scene.skipPointerMovePicking = true;
    scene.autoClear = false;
    scene.autoClearDepthAndStencil = false;
    scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    scene.fogDensity = 0.008;
    scene.fogColor = new BABYLON.Color3(99 / 255, 157 / 255, 216 / 255);
    scene.fogEnabled = true;
    const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 400.0 }, scene);
    const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;
    skybox.infiniteDistance = true;
    const camera = new BABYLON.FreeCamera("main", new BABYLON.Vector3(4, 32, 4), scene);
    camera.setTarget(new BABYLON.Vector3(8, 32, 8));
    camera.fov = 1.5;
    camera.minZ = 0.01;
    camera.angularSensibility = 4000;
    camera.maxZ = 500;
    scene.activeCamera = camera;
    camera.attachControl(canvas, true);
    await DVE.$SCENEINIT({ scene: scene });
    const check = () => {
        if (DVE.builderManager.chunkMeshes[0] &&
            DVE.builderManager.chunkMeshes[0][0] !== undefined) {
            Shape1(scene, DVE.renderManager.floraMaterial.getMaterial());
        }
        else {
            setTimeout(() => {
                check();
            }, 25);
        }
    };
    check();
    //render loop
    engine.runRenderLoop(() => {
        scene.render();
    });
    scene.cleanCachedTextureBuffer();
};
