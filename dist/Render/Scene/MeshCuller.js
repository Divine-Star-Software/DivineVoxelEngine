import { FOManager } from "../Render/FloatingOrigin/FoManager.js";
/*
  const dimensions = MeshRegister._dimensions;
dimensions.forEach((dimensions) => {
 dimensions.forEach((region) => {
  region.columns.forEach((column) => {
   const position = column.position;
   min.set(
    node.position.x + position[0],
    node.position.y + position[1],
    node.position.z + position[2]
   );
   max.set(
    node.position.x + position[0] + 16,
    node.position.y + position[1] + 256,
    node.position.z + position[2] + 16
 );
   box.reConstruct(min, max);
   if (cam.isInFrustum(box)) {
    column.chunks.forEach((chunk) => {
     chunk.forEach((mesh) => {
      mesh.mesh.isVisible = true;
     });
    });
   } else {
    column.chunks.forEach((chunk) => {
     chunk.forEach((mesh) => {
      mesh.mesh.isVisible = false;
     });
    });
   }
  });
 });
}); */
const box = new BABYLON.BoundingBox(BABYLON.Vector3.Zero(), BABYLON.Vector3.Zero());
export const MeshCuller = {
    $INIT(scene) {
        const fallbackNode = new BABYLON.TransformNode("", scene);
        const min = new BABYLON.Vector3();
        const max = new BABYLON.Vector3();
        const world = new BABYLON.Vector4(0, 0, 0, 0);
        scene.onBeforeActiveMeshesEvaluationObservable.add(() => {
            const cam = scene.activeCamera;
            if (!cam)
                return;
            const node = FOManager.activeNode ? FOManager.activeNode : fallbackNode;
            const meshesLength = scene.meshes.length;
            for (let i = 0; i < meshesLength; i++) {
                const mesh = scene.meshes[i];
                if (mesh.type == "chunk") {
                    const position = mesh.position;
                    mesh._worldMatrix.setRow(3, world.set(mesh.position.x + node.position.x, mesh.position.y + node.position.y, mesh.position.z + node.position.z, 1));
                    min.set(node.position.x + position.x, node.position.y + position.y, node.position.z + position.z);
                    max.set(node.position.x + position.x + 16, node.position.y + position.y + 16, node.position.z + position.z + 16);
                    box.reConstruct(min, max);
                    if (cam.isInFrustum(box)) {
                        mesh.isVisible = true;
                        mesh.setEnabled(true);
                        continue;
                    }
                    mesh.isVisible = false;
                    mesh.setEnabled(false);
                }
            }
        });
    },
};
