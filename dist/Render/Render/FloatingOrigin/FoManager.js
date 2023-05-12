import { DVEBabylon } from "../../Nodes/DVEBabylon.js";
export const FOManager = {
    activeCamera: null,
    activeNode: null,
    onOriginSet: [],
    registerOnOriginSet(run) {
        this.onOriginSet.push(run);
    },
    setOriginCenter(scene, object) {
        this.activeNode = new DVEBabylon.system.TransformNode("", scene);
        this.onOriginSet.forEach((_) => _(this.activeCamera));
        const doublepos = new DVEBabylon.system.Vector3();
        scene.onBeforeActiveMeshesEvaluationObservable.add(() => {
            this.activeNode.position = doublepos.subtract(object.position);
        });
    },
};
