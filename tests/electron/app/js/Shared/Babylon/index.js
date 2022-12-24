import { CreateGUI } from "../GUI/index.js";
export const SetUpEngine = (canvas) => {
    let antialias = false;
    const graphics = localStorage.getItem("grahpics");
    if (graphics) {
        if (graphics == "medium" || graphics == "high" || graphics == "uldate") {
            antialias = true;
        }
    }
    const engine = new BABYLON.Engine(canvas, antialias, {
        useHighPrecisionMatrix: true,
        useHighPrecisionFloats: true,
    });
    engine.doNotHandleContextLost = true;
    engine.enableOfflineSupport = false;
    engine.setSize(1920, 1080);
    return engine;
};
export const SetUpCanvas = () => {
    const canvas = document.createElement("canvas");
    canvas.id = "renderCanvas";
    document.body.append(canvas);
    window.addEventListener("click", function () {
        canvas.requestPointerLock();
    });
    window.addEventListener("keydown", (event) => {
        if (event.key == "Escape") {
            document.exitPointerLock();
        }
    });
    return canvas;
};
export const SetUpDefaultScene = (engine) => {
    /*  const scene = new BABYLON.Scene(engine, {
      useGeometryUniqueIdsMap: true,
     }); */
    const scene = new BABYLON.Scene(engine);
    scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    scene.fogDensity = 0.008;
    scene.fogColor = new BABYLON.Color3(99 / 255, 157 / 255, 216 / 255);
    scene.fogEnabled = true;
    scene.autoClear = false;
    scene.autoClearDepthAndStencil = false;
    scene.skipPointerMovePicking = true;
    scene.constantlyUpdateMeshUnderPointer = false;
    // scene.debugLayer.show();
    return scene;
};
export const SetUpDarkScene = (engine) => {
    const scene = new BABYLON.Scene(engine);
    scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    scene.fogDensity = 0.008;
    scene.fogColor = new BABYLON.Color3(1 / 255, 1 / 255, 1 / 255);
    scene.fogEnabled = false;
    scene.autoClear = false;
    scene.autoClearDepthAndStencil = false;
    scene.skipPointerMovePicking = true;
    scene.constantlyUpdateMeshUnderPointer = false;
    return scene;
};
export const SetUpDefaultCamera = (scene, canvas, startPosition = { x: 0, y: 30, z: -2 }, startTarget = { x: 0, y: 0, z: 0 }, makeActiveCamera = true, attachControls = true, name = "main") => {
    const target = new BABYLON.Vector3(startTarget.x, startTarget.y, startTarget.z);
    const camera = new BABYLON.UniversalCamera(name, BABYLON.Vector3.Zero(), scene);
    camera.inertia = 0.1;
    camera.fov = 1.5;
    camera.minZ = 0.01;
    camera.maxZ = 1000;
    camera.angularSensibility = 1000;
    camera.speed = 10;
    camera.checkCollisions = false;
    camera.position.x = startPosition.x;
    camera.position.y = startPosition.y;
    camera.position.z = startPosition.z;
    camera.keysUp.push(87);
    camera.keysDown.push(83);
    camera.keysLeft.push(65);
    camera.keysRight.push(68);
    camera.setTarget(target);
    if (makeActiveCamera) {
        scene.activeCamera = camera;
    }
    if (attachControls) {
        camera.attachControl(canvas, true);
        camera.inputs.addKeyboard();
    }
    return camera;
};
export const SetUpDefaultSkybox = (scene) => {
    const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 800.0 }, scene);
    const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;
    skybox.infiniteDistance = true;
    return skybox;
};
export const CreateWorldAxis = (scene, y) => {
    //@ts-ignore
    const axes = new BABYLON.AxesViewer(scene, 5);
    axes.xAxis.position.y = y;
    axes.yAxis.position.y = y;
    axes.zAxis.position.y = y;
};
export const runRenderLoop = (engine, scene, watchPositon, DVER) => {
    const runGui = CreateGUI(DVER);
    engine.runRenderLoop(() => {
        scene.render();
        runGui(engine, watchPositon);
    });
};
export const GetPlayerModel = (scene) => {
    return new Promise((resolve, reject) => {
        BABYLON.SceneLoader.ImportMesh(null, "assets/player/", "chartest.babylon", scene, (assets) => {
            const mesh = assets[0];
            const texture = new BABYLON.Texture("assets/player/playertexture.png");
            texture.onLoadObservable.add(() => {
                texture.updateSamplingMode(1);
            });
            const mat = new BABYLON.StandardMaterial("player-mat");
            mat.backFaceCulling = false;
            mat.diffuseTexture = texture;
            mesh.material = mat;
            mesh.isPickable = false;
            resolve(mesh);
        });
    });
};
