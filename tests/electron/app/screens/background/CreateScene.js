import { ParticleSystemData } from "./particles.js";
export const CreateScene = () => {
    const canvas = document.createElement("canvas");
    canvas.id = "renderCanvas";
    document.body.append(canvas);
    const engine = new BABYLON.Engine(canvas, false, {});
    //engine.setSize(1920, 1080);
    const scene = new BABYLON.Scene(engine);
    const light = new BABYLON.HemisphericLight("", new BABYLON.Vector3(0, -1, 0), scene);
    const camera = new BABYLON.FreeCamera("main", BABYLON.Vector3.Zero(), scene);
    camera.position.x = 0;
    camera.position.z = -2;
    camera.position.y = 30;
    camera.setTarget(BABYLON.Vector3.Zero());
    scene.activeCamera = camera;
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0.5);
    const particleSystem = BABYLON.ParticleSystem.Parse(ParticleSystemData, scene, "");
    particleSystem.isLocal = true;
    particleSystem.emitter = new BABYLON.Vector3(0, -100, 0);
    engine.runRenderLoop(() => {
        scene.render();
    });
};
