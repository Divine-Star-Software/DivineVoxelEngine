import type { DivineVoxelEngine } from "../../../out/Core/DivineVoxelEngine";
import type { PositionMatrix } from "../../../out/Meta/Util.types"

export class Player {
 absPositionArray: Float32Array;
 chunkPositionArray: Float32Array;
 playerDirectionArray: Uint8Array;

 cachedVelocity = new BABYLON.Vector3();

 active = true;
 breaking = false;
 placing = true;
 forward = new BABYLON.Vector3(0, 0, 1);
 camera: BABYLON.FreeCamera;
 ready = false;
 hitbox: BABYLON.Mesh;
 jumped = false;
 jumping = false;
 jumpTime = 4;
 speed = 0.1;
 moveForward = false;
 moveBackward = false;
 moveLeft = false;
 moveRight = false;
 jumpCount = this.jumpTime;
 velocity: BABYLON.Vector3 = BABYLON.Vector3.Zero(); // global

 lookingAtBlock = false;
 blockLookingAtPosition: PositionMatrix = { x: 0, y: 0, z: 0 };

 playerCube: BABYLON.Mesh;

 checkDownCollision = false;

 bottomRay: BABYLON.Ray;
 camRay: BABYLON.Ray;

 constructor(private DVE: DivineVoxelEngine) {}

 createPlayerSharedArrays() {
  const absPositionArrayBuffer = new SharedArrayBuffer(12);
  const chunkPositionArrayBuffer = new SharedArrayBuffer(8);
  const playerDirectionArrayBuffer = new SharedArrayBuffer(1);

  this.absPositionArray = new Float32Array(absPositionArrayBuffer);
  this.chunkPositionArray = new Float32Array(chunkPositionArrayBuffer);
  this.playerDirectionArray = new Uint8Array(playerDirectionArrayBuffer);

  const arrays = [
   absPositionArrayBuffer,
   chunkPositionArrayBuffer,
   playerDirectionArrayBuffer,
  ];
  this.DVE.world.sendPlayerSharedArrays(arrays);
 }

 calculateGameZone(positionX: number, positionZ: number) {
  const chunkpositionX = (positionX >> 4) << 4;
  const chunkpositionZ = (positionZ >> 4) << 4;

  return [chunkpositionX, chunkpositionZ];
 }

 /**# Directions
  * ---
  * 0 -> north
  * 1 -> north west
  * 2 -> north east
  * 3 -> east
  * 4 -> west;
  * 5 -> south
  * 6 -> south east
  * 7 -> south east
  *
  * @param direction
  */
 _getDirection(direction: BABYLON.Vector3) {
  //  console.log(direction.x, direction.y, direction.z);
  if (direction.x > -0.4 && direction.x < 0.4 && direction.z > 0) {
   //   console.log("north");
   this.playerDirectionArray[0] = 0;
  }
  if (direction.x < -0.4 && direction.x > -0.7 && direction.z > 0) {
   //   console.log("north west");
   this.playerDirectionArray[0] = 1;
  }
  if (direction.x > 0.4 && direction.x < 0.7 && direction.z > 0) {
   //   console.log("north east");
   this.playerDirectionArray[0] = 2;
  }
  if (
   direction.x > 0.7 &&
   direction.x < 1 &&
   direction.z > -0.6 &&
   direction.z < 0.6
  ) {
   //   console.log("east");
   this.playerDirectionArray[0] = 3;
  }
  if (
   direction.x < 0.7 &&
   direction.x > 1 &&
   direction.z < -0.6 &&
   direction.z > 0.6
  ) {
   //     console.log("west");
   this.playerDirectionArray[0] = 4;
  }
  if (direction.x > -0.7 && direction.x < -0.05 && direction.z < 0) {
   //   console.log("south west");
   this.playerDirectionArray[0] = 6;
  }
  if (direction.x > -0.2 && direction.x < 0.9 && direction.z < 0) {
   //console.log("south east");
   this.playerDirectionArray[0] = 7;
  }

  if (direction.x > -0.4 && direction.x < 0.4 && direction.z < 0) {
   //    console.log("south");
   this.playerDirectionArray[0] = 5;
  }

  /*     if (direction.z > -0.6 && direction.z < 0.6 && direction.x < 0) {
      console.log("west");
      this.playerDirectionArray[0] = 3;
    } */
 }

 async update() {
  if (!this.ready || !this.active) return;
  if (this.DVE.meshManager.runningUpdate) return;

  const x = Math.floor(this.hitbox.position.x);
  const y = Math.floor(this.hitbox.position.y);
  const z = Math.floor(this.hitbox.position.z);

  const direction = this.camera.getDirection(this.forward);
  this._getDirection(direction);

  this.absPositionArray[0] = x;
  this.absPositionArray[1] = y;
  this.absPositionArray[2] = z;

  const chunk = this.calculateGameZone(x, z);
  this.chunkPositionArray[0] = chunk[0];
  this.chunkPositionArray[1] = chunk[1];

  if (this.jumping) {
   this.velocity.y -= 0.05;
   if (this.jumpCount == 0) {
    this.jumpCount = this.jumpTime;
    this.jumping = false;
   } else {
    this.jumpCount--;
   }
  } else {
   this.velocity.y = -0.3;
  }

  if (this.checkDownCollision) {
   const downPick = this.hitbox.getScene().pickWithRay(this.bottomRay);
   if (downPick) {
    if (downPick.hit) {
     if (downPick.pickedMesh?.name == "solid") {
      this.jumped = false;
     }
    }
   }

   this.checkDownCollision = false;
  }

  const camRay = this.camera.getForwardRay(6, undefined, this.hitbox.position);
  this.camRay = camRay;

  const camPick = this.hitbox.getScene().pickWithRay(this.camRay);

  if (camPick) {
   if (camPick.hit) {
    const point = camPick.pickedPoint;
    /* console.log(point);
console.log(camPick.faceId);
console.log(camPick.pickedMesh); */
    if (point && camPick.pickedMesh && camPick.faceId !== undefined) {
     const x = Math.floor(point.x);
     const y = Math.floor(point.y);
     const z = Math.floor(point.z);

     if (!this.playerCube.isVisible) {
      this.playerCube.isVisible = true;
     }

     this.lookingAtBlock = true;
     this.playerCube.position.z = z + 0.5;

     let normal: BABYLON.Vector3 = BABYLON.Vector3.Zero();
     try {
      normal = camPick.pickedMesh.getFacetNormal(camPick.faceId);
      //  console.log(normal);
      if (normal.x == 1) {
       if (this.breaking) {
        this.playerCube.position.x = x - 0.4;
        this.playerCube.position.y = y + 0.5;
        this.playerCube.position.z = z + 0.5;
        this.blockLookingAtPosition.x = x - 1;
        this.blockLookingAtPosition.y = y;
        this.blockLookingAtPosition.z = z;
       }
       if (this.placing) {
        this.playerCube.position.x = x + 0.5;
        this.playerCube.position.y = y + 0.5;
        this.playerCube.position.z = z + 0.5;
        this.blockLookingAtPosition.x = x;
        this.blockLookingAtPosition.y = y;
        this.blockLookingAtPosition.z = z;
       }
       return;
      }
      if (normal.x == -1) {
       if (this.breaking) {
        this.playerCube.position.x = x + 0.4;
        this.playerCube.position.y = y + 0.5;
        this.playerCube.position.z = z + 0.5;
        this.blockLookingAtPosition.x = x;
        this.blockLookingAtPosition.y = y;
        this.blockLookingAtPosition.z = z;
       }
       if (this.placing) {
        this.playerCube.position.x = x - 0.5;
        this.playerCube.position.y = y + 0.5;
        this.playerCube.position.z = z + 0.5;
        this.blockLookingAtPosition.x = x - 1;
        this.blockLookingAtPosition.y = y;
        this.blockLookingAtPosition.z = z;
       }
       return;
      }
      if (normal.z == 1) {
       if (this.breaking) {
        this.playerCube.position.x = x + 0.5;
        this.playerCube.position.y = y + 0.5;
        this.playerCube.position.z = z - 0.4;
        this.blockLookingAtPosition.x = x;
        this.blockLookingAtPosition.y = y;
        this.blockLookingAtPosition.z = z - 1;
       }
       if (this.placing) {
        this.playerCube.position.x = x + 0.5;
        this.playerCube.position.y = y + 0.5;
        this.playerCube.position.z = z + 0.5;
        this.blockLookingAtPosition.x = x;
        this.blockLookingAtPosition.y = y;
        this.blockLookingAtPosition.z = z;
       }
       return;
      }
      if (normal.z == -1) {
       if (this.breaking) {
        this.playerCube.position.x = x + 0.5;
        this.playerCube.position.y = y + 0.5;
        this.playerCube.position.z = z + 0.4;
        this.blockLookingAtPosition.x = x;
        this.blockLookingAtPosition.y = y;
        this.blockLookingAtPosition.z = z;
       }
       if (this.placing) {
        this.playerCube.position.x = x + 0.5;
        this.playerCube.position.y = y + 0.5;
        this.playerCube.position.z = z - 0.5;
        this.blockLookingAtPosition.x = x;
        this.blockLookingAtPosition.y = y;
        this.blockLookingAtPosition.z = z - 1;
       }

       return;
      }
      if (normal.y == 1) {
       if (this.breaking) {
        this.playerCube.position.x = x + 0.5;
        this.playerCube.position.y = y - 0.4;
        this.playerCube.position.z = z + 0.5;
        this.blockLookingAtPosition.x = x;
        this.blockLookingAtPosition.y = y - 1;
        this.blockLookingAtPosition.z = z;
       }
       if (this.placing) {
        this.playerCube.position.x = x + 0.5;
        this.playerCube.position.y = y + 0.5;
        this.playerCube.position.z = z + 0.5;
        this.blockLookingAtPosition.x = x;
        this.blockLookingAtPosition.y = y;
        this.blockLookingAtPosition.z = z;
       }
       return;
      }
      if (normal.y == -1) {
       if (this.breaking) {
        this.playerCube.position.x = x + 0.5;
        this.playerCube.position.y = y + 0.4;
        this.playerCube.position.z = z + 0.5;
        this.blockLookingAtPosition.x = x;
        this.blockLookingAtPosition.y = y;
        this.blockLookingAtPosition.z = z;
       }
       if (this.placing) {
        this.playerCube.position.x = x + 0.5;
        this.playerCube.position.y = y - 0.5;
        this.playerCube.position.z = z + 0.5;
        this.blockLookingAtPosition.x = x;
        this.blockLookingAtPosition.y = y - 1;
        this.blockLookingAtPosition.z = z;
       }
       return;
      }
     } catch (error: any) {
      //  console.log(normal);
      //   console.log(error);
     }

     this.blockLookingAtPosition.z = z;
     //    console.log(this.blockLookingAtPosition);
    }
   } else {
    this.lookingAtBlock = false;
    this.playerCube.isVisible = false;
   }
  }
 }

 _setUpPlayerCube() {
  const cubeMaterial = new BABYLON.StandardMaterial(
   "block",
   this.hitbox.getScene()
  );
  cubeMaterial.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
  cubeMaterial.alpha = 0.3;
  const cube = BABYLON.MeshBuilder.CreateBox(
   "playerblockdisplay",
   { size: 1 },
   this.hitbox.getScene()
  );
  cube.isPickable = false;
  cube.material = cubeMaterial;

  cube.enableEdgesRendering();
  cube.edgesWidth = 0.3;
  cube.edgesColor = new BABYLON.Color4(0, 0, 0, 0.8);

  this.playerCube = cube;
 }

 _setUpPlayerCamera() {
  const cameraCrossHairMaterial = new BABYLON.StandardMaterial(
   "box-material",
   this.hitbox.getScene()
  );
  cameraCrossHairMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);
  //cameraCrossHairMaterial.disableLighting = true;
  const crossHairVertical = BABYLON.MeshBuilder.CreatePlane(
   "plane",
   { width: 0.01, height: 0.25 },
   this.hitbox.getScene()
  );
  const crossHairHorizontal = BABYLON.MeshBuilder.CreatePlane(
   "plane",
   { width: 0.25, height: 0.01 },
   this.hitbox.getScene()
  );

  crossHairVertical.isPickable = false;
  crossHairHorizontal.isPickable = false;

  crossHairVertical.parent = this.camera;

  crossHairHorizontal.parent = this.camera;
  crossHairVertical.position.z = 5;
  crossHairHorizontal.position.z = 5;

  crossHairVertical.material = cameraCrossHairMaterial;
  crossHairHorizontal.material = cameraCrossHairMaterial;
  crossHairVertical.renderingGroupId = 2;
  crossHairHorizontal.renderingGroupId = 2;
 }

 createPlayer(scene: BABYLON.Scene, camera: BABYLON.FreeCamera) {
  this.hitbox = BABYLON.MeshBuilder.CreateBox(
   "player-this.hitbox",
   { width: 0.7, height: 2, depth: 0.7 },
   scene
  );

  this.camera = camera;
  // this.camera.position.y = 1;
  this.hitbox.checkCollisions = true;
  this.hitbox.ellipsoid = new BABYLON.Vector3(0.45, 0.9, 0.45);
  this.hitbox.isPickable = false;
  //this.hitbox.showBoundingBox = true;
  this.hitbox.isVisible = false;
  this.hitbox.position.x = -56;

  this.hitbox.position.z = -56;
  this.hitbox.position.y = 600;

  this.bottomRay = new BABYLON.Ray(
   new BABYLON.Vector3(0, 0, 0),
   new BABYLON.Vector3(0, -1, 0),
   1
  );
  const bottomRayHelper = new BABYLON.RayHelper(this.bottomRay);
  bottomRayHelper.attachToMesh(
   this.hitbox,
   new BABYLON.Vector3(0, -1, 0),
   new BABYLON.Vector3(0, -0.5, 0)
  );

  this.hitbox.onCollideObservable.add((event, state) => {
   if (this.jumped && !this.jumping) {
    this.checkDownCollision = true;
   }
  });

  const camNode = new BABYLON.TransformNode("camnode", scene);
  camera.parent = camNode;
  camNode.parent = this.hitbox;

  this._setUpPlayerCube();
  this._setUpPlayerCamera();

  document.addEventListener("click", (event: MouseEvent) => {
   if (!this.active) return;
   if (event.button == 2) {
    if (!this.placing) return;
    if (this.lookingAtBlock) {
     const x = Math.floor(this.hitbox.position.x);
     const y = Math.floor(this.hitbox.position.y);
     const z = Math.floor(this.hitbox.position.z);



     if (
      x != this.blockLookingAtPosition.x ||
      (y != this.blockLookingAtPosition.y &&
       y != this.blockLookingAtPosition.y + 1) ||
      this.blockLookingAtPosition.z != z
     ) {
      this.DVE.world.requestWorldUpdate(
       "block-add",
       this.blockLookingAtPosition
      );
     }

     //need to create into a promise to make sure not too many updates are set at once
     this.active = false;
     setTimeout(() => {
      this.active = true;
     }, 50);
    }
   }
   if (event.button == 0) {
    if (!this.breaking) return;
    const x = Math.floor(this.hitbox.position.x);
    const y = Math.floor(this.hitbox.position.y - 1);
    const z = Math.floor(this.hitbox.position.z);

    if (this.lookingAtBlock) {
     this.DVE.world.requestWorldUpdate(
      "block-remove",
      this.blockLookingAtPosition
     );
    }
   }
  });

  document.addEventListener(
   "keydown",
   (event: KeyboardEvent) => {
    switch (event.key) {
     case "1":
      this.placing = true;
      this.breaking = false;
      break;
     case "2":
      this.placing = false;
      this.breaking = true;
      break;
     case "ArrowUp":
     case "w":
      this.moveForward = true;
      break;
     case "ArrowLeft":
     case "a":
      this.moveLeft = true;
      break;
     case "ArrowDown":
     case "s":
      this.moveBackward = true;
      break;
     case "ArrowRight":
     case "d":
      this.moveRight = true;
      break;
     case " ":
      if (!this.jumped && !this.jumping && this.velocity.y <= -0.3) {
       this.jumped = true;
       this.jumping = true;
       this.velocity.y = 0.18;
      }
      break;
    }
   },
   false
  );
  document.addEventListener(
   "keyup",
   (event: KeyboardEvent) => {
    switch (event.key) {
     case "ArrowUp":
     case "w":
      this.moveForward = false;
      break;
     case "ArrowLeft":
     case "a":
      this.moveLeft = false;
      break;
     case "ArrowDown":
     case "s":
      this.moveBackward = false;
      break;
     case "ArrowRight":
     case "d":
      this.moveRight = false;
      break;
    }
   },
   false
  );

  scene.registerBeforeRender(() => {
   let forwardSpeed = 0;
   let sideSpeed = 0;

   if (this.moveForward) {
    forwardSpeed = this.speed;
   }
   if (this.moveBackward) {
    forwardSpeed = -this.speed;
   }
   if (this.moveRight) {
    sideSpeed = 0.1;
   }
   if (this.moveLeft) {
    sideSpeed = -0.1;
   }
   /*       const forward = this.camera
        .getTarget()
        .subtract(this.camera.position)
        .normalize(); */
   const forward = this.camera.getDirection(new BABYLON.Vector3(0, 0, 1));
   forward.y = 0;
   const right = BABYLON.Vector3.Cross(
    forward,
    this.camera.upVector
   ).normalize();
   right.y = 0;
   const move = forward
    .scale(forwardSpeed)
    .subtract(right.scale(sideSpeed))
    .subtract(this.camera.upVector.scale(0));

   this.velocity.x = move.x;
   this.velocity.z = move.z;

   this.hitbox.moveWithCollisions(this.velocity);
  });
  this.ready = true;
 }
}
