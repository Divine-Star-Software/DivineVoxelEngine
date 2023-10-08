import { Scene } from "@babylonjs/core";
import { FOManager } from "./FloatingOrigin/FoManager.js";
import { Vector3, Vector4 } from "@babylonjs/core/Maths/math.vector.js";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode.js";
import { BoundingBox } from "@babylonjs/core/Culling/boundingBox.js";
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

export const MeshCuller = {
 $INIT(scene: Scene) {
  const box = new BoundingBox(
   Vector3.Zero(),
   Vector3.Zero()
  );
  const fallbackNode = new TransformNode("", scene);
  const min = new Vector3();
  const max = new Vector3();
  const world = new Vector4(0, 0, 0, 0);
  scene.onBeforeActiveMeshesEvaluationObservable.add(() => {
   const cam = scene.activeCamera;
   if (!cam) return;
   const node = FOManager.activeNode ? FOManager.activeNode : fallbackNode;
   const meshesLength = scene.meshes.length;
   for (let i = 0; i < meshesLength; i++) {
    const mesh = scene.meshes[i];
    if (!mesh.alwaysSelectAsActiveMesh) continue;
    if ((mesh as any).type == "chunk") {
     const position = mesh.position;
     mesh._worldMatrix.setRow(
      3,
      world.set(
       mesh.position.x + node.position.x,
       mesh.position.y + node.position.y,
       mesh.position.z + node.position.z,
       1
      )
     );
     min.set(
      node.position.x + position.x,
      node.position.y + position.y,
      node.position.z + position.z
     );
     max.set(
      node.position.x + position.x + 16,
      node.position.y + position.y + 16,
      node.position.z + position.z + 16
     );
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
