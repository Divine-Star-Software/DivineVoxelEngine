import { DivineVoxelEngine } from "../../out/Core/DivineVoxelEngine.js";
const DVE = new DivineVoxelEngine();
window.DVE = DVE;
await DVE.$INIT({
    worldWorkerPath: "../../../js/LightTest/World/index.js",
    builderWorkerPath: "../../../js/Shared/Builder/builder.js",
    fluidBuilderWorkerPath: "../../../js/Shared/FluidBuilder/fluidbuilder.js",
});
console.log("%clight test 1", "color:cyan; font-size:30px;");
const readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);
        init();
    }
}, 10);
//DS.chunkManager.createSharedArrayBuffers();
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
    // engine.setSize(1280, 720);
    const scene = new BABYLON.Scene(engine);
    // scene.collisionsEnabled = true;
    const assumedFramesPerSecond = 60;
    const earthGravity = -9.81;
    scene.gravity = new BABYLON.Vector3(0, earthGravity / assumedFramesPerSecond, 0);
    // Fog
    //scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    scene.fogColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    scene.fogDensity = 0.01;
    const camera = new BABYLON.FreeCamera("main", BABYLON.Vector3.Zero(), scene);
    camera.fov = 1.5;
    camera.minZ = 0.01;
    camera.angularSensibility = 4000;
    camera.maxZ = 500;
    camera.position.x = 9;
    camera.position.z = 9;
    camera.position.y = 10;
    scene.activeCamera = camera;
    camera.setTarget(BABYLON.Vector3.Zero());
    //  camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 400.0 }, scene);
    const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    //skyboxMaterial.reflectionTexture.?coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;
    skybox.infiniteDistance = true;
    scene.fogDensity = 0.008;
    scene.fogColor = new BABYLON.Color3(1 / 255, 1 / 255, 1 / 255);
    scene.fogEnabled = false;
    scene.autoClear = false; // Color buffer
    scene.autoClearDepthAndStencil = false; // Depth and stencil, obviously
    DVE.$SCENEINIT({ scene: scene });
    let divFps = document.getElementById("fps");
    //render loop
    engine.runRenderLoop(() => {
        scene.render();
        //@ts-ignore
        divFps.innerHTML = engine.getFps().toFixed() + " fps";
    });
};
