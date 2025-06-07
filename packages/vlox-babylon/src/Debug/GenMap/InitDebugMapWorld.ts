import { Threads } from "@amodx/threads";

import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { Color3 } from "@babylonjs/core/Maths/math.color";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { Quaternion } from "@babylonjs/core/Maths/math.vector";
import { Axis } from "@babylonjs/core/Maths/math.axis";

import { GenMap } from "./Internal/GenMap";
import { TickInterval } from "@divinevoxel/vlox/Util/TickInterval";
import { Vector3Like, Vec3Array } from "@amodx/math";
import { DivineVoxelEngineWorld } from "@divinevoxel/vlox/Contexts/World/DivineVoxelEngineWorld";

export default function (followPosition = Vector3Like.Create()) {
  Threads.registerTask<Vec3Array>("update-debug-map-position", ([x, y, z]) => {
    followPosition.x = x;
    followPosition.y = y;
    followPosition.z = z;
  });
  Threads.registerTask<OffscreenCanvas>("set-debug-map-canvas", (canvas) => {
    // Babylon.js setup
    const engine = new Engine(canvas);
    const scene = new Scene(engine);
    engine.setSize(canvas.width, canvas.height);
    engine.resize();
    const camera = new ArcRotateCamera(
      "",
      Math.PI,
      0,
      800,
      Vector3.Zero(),
      scene
    );
    //  camera.attachControl(canvas, true);
    camera.panningSensibility = 1;
    const light = new HemisphericLight("", new Vector3(0, 1, 0), scene);
    light.specular.set(0, 0, 0);
    scene.activeCamera = camera;

    const material = new StandardMaterial("", scene);
    material.diffuseColor = new Color3(0, 1, 1);

    let map: GenMap = new GenMap();

    const follow = new TransformNode("follow", scene);
    const fixedParent = new TransformNode("fixedParent", scene);

    console.warn("OFFSCREEN CANVAS", canvas, canvas.width, canvas.height);
    let lastWidth = 0,
      lastHeight = 0;
    const world = DivineVoxelEngineWorld.instance;

    engine.runRenderLoop(() => {
      const width = canvas.width;
      const height = canvas.height;
      if (width !== lastWidth || height !== lastHeight) {
        engine.resize();
        lastWidth = width;
        lastHeight = height;
      }

      follow.position.x = followPosition.x;
      follow.position.y = followPosition.y;
      follow.position.z = followPosition.z;

      fixedParent.position.x = followPosition.x;
      fixedParent.position.y = followPosition.y;
      fixedParent.position.z = followPosition.z;

      const direction = camera.getDirection(new Vector3(0, 0, 1)).normalize();
      const normalized = new Vector3(direction.x, 0, direction.z).normalize();
      const angle = Math.atan2(normalized.x, normalized.z);
      const rotationQuaternion = Quaternion.RotationAxis(Axis.Y, angle);

      follow.rotationQuaternion = rotationQuaternion;
      follow.position.y = 10;
      fixedParent.position.y = 10;
      camera.radius = 800;
      camera.position.x = follow.position.x;
      camera.position.z = follow.position.z;

      camera.setTarget(follow.position);

      scene.render();
    });

    map.init(scene);

    const interval = new TickInterval(() => {
      map.updateTiles([
        0,
        followPosition.x,
        followPosition.y,
        followPosition.z,
      ]);
    }, 500);
    interval.start();
  });
}
