import { FOCamera } from "./FOCamera.js";
import { FONode } from "./FONode.js";
export const FOManager = {
    activeCamera: null,
    activeNode: null,
    onOriginSet: [],
    registerOnOriginSet(run) {
        this.onOriginSet.push(run);
    },
    getCamera(scene, name, position = BABYLON.Vector3.Zero(), canvas) {
        const camera = new FOCamera(name, position, scene);
        camera.touchAngularSensibility = 10000;
        camera.speed = 1;
        camera.keysUp.push(87); // W
        camera.keysDown.push(83); // D
        camera.keysLeft.push(65); // A
        camera.keysRight.push(68); // S
        camera.keysUpward.push(69); // E
        camera.keysDownward.push(81); // Q
        camera.minZ = 0.5;
        camera.maxZ = 800;
        camera.fov = 1;
        camera.attachControl(canvas, true);
        this.activeCamera = camera;
        this.activeNode = this.getNode(scene, name);
        this.activeCamera.add(this.activeNode);
        scene.activeCamera = camera;
        scene.collisionsEnabled = false;
        return camera;
    },
    getNode(scene, name) {
        return new FONode(name, scene);
    },
    setOriginCenter(scene, object) {
        this.activeNode = this.getNode(scene, "world-origin");
        this.onOriginSet.forEach((_) => _(this.activeCamera));
        scene.onBeforeActiveMeshesEvaluationObservable.add(() => {
            this.activeNode.update(object.position);
        });
    },
};
