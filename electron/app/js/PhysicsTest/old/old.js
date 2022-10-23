"use strict";
/* import { Vector3 } from "../../../out/Math/Classes/Vector3.js";
import { DVEM } from "../../../out/Math/DivineVoxelEngineMath.js";
import { DVEN } from "../../../out/Nexus/DivineVoxelEngineNexus.js";

await DVEN.$INIT();
console.log("nexus is ready to go!");


const playerBoundinBox = DVEM.getSimpleBoundingBox(DVEM.getVector3(10, 7, 7), {
    w: 0.8,
    h: 2,
    d: 0.8,
   });
   
   const voxelBoundingBox = DVEM.getSimpleBoundingBox(DVEM.getVector3(0, 0, 0), {
    w: 1,
    h: 1,
    d: 1,
   });
   
   const directionVector = DVEM.getVector3(0, 0, 0);
   
   const playerPositionSAB = new SharedArrayBuffer(4 * 3);
   const playerPosition = new Float32Array(playerPositionSAB);
   
   playerPosition[0] = playerBoundinBox.origin.x;
   playerPosition[1] = playerBoundinBox.origin.y;
   playerPosition[2] = playerBoundinBox.origin.z;
   DVEN.parentComm.sendMessage("connect-player-data", [playerPositionSAB]);
   
   let playerDirection = new Float32Array();
   let playerStates = new Uint8Array();
   
   const ready = { ready: false };
   
   DVEN.parentComm.listenForMessage("connect-player-states", (data) => {
    playerDirection = new Float32Array(data[1]);
    playerStates = new Uint8Array(data[2]);
    ready.ready = true;
   });
   
   await DVEN.UTIL.createPromiseCheck({
    checkInterval: 1,
    check: () => ready.ready,
   });
   
   const gravityStates = {
    flaoting: false,
   };
   const jumpStates = {
    count: 0,
    max: 20,
    jumping: false,
    canJump: true,
   };
   const velocity = { x: 0, y: 0, z: 0 };
   const speed = 0.05;
   const gravity = 0.01;
   let jumpSpeed = 0.01;
   const checkPoint = DVEM.getVector3(0, 0, 0);
   
   const controlsUpdate = () => {
    directionVector.updateVector(playerDirection[0], 0, playerDirection[2]);
    directionVector.roundVector(2);
    if (playerStates[0] == 1) {
     velocity.x = directionVector.x;
     velocity.z = directionVector.z;
    } else if (playerStates[0] == 2) {
     velocity.x = playerDirection[0] * -1;
     velocity.z = playerDirection[2] * -1;
    } else {
     velocity.x = 0;
     velocity.z = 0;
    }
   
    if (playerStates[1] == 1 && !jumpStates.jumping && jumpStates.canJump) {
     jumpStates.jumping = true;
     jumpStates.canJump = false;
     velocity.y = 0.2;
     jumpSpeed = 0.05;
     playerStates[1] = 0;
    }
   
    if (jumpStates.jumping && velocity.y > -1 && gravityStates.flaoting) {
     if (jumpStates.count >= jumpStates.max) {
      jumpStates.count = 0;
      velocity.y = 0;
      jumpStates.jumping = false;
     } else {
      velocity.y -= 0.01;
      jumpStates.count++;
     }
    }
   
    if (gravityStates.flaoting && velocity.y > -1) {
     if (!jumpStates.jumping) {
      velocity.y -= 0.01;
     }
    }
    if (!gravityStates.flaoting) {
     velocity.y = 0;
    }
   };
   
   const yUpdate = (origin: Vector3) => {
    checkPoint.updateVector(
     origin.x + speed * velocity.x,
     origin.y + velocity.y,
     origin.z + speed * velocity.z
    );
    const checkVector = checkPoint;
    checkVector.roundVector(2);
    playerBoundinBox.setCheckOrigin(checkVector.x, checkVector.y, checkVector.z);
    const sideCheckPoints = playerBoundinBox.getVoxelCheckPoints();
    let foundGround = false;
    for (const point of sideCheckPoints) {
     const voxel = DVEN.worldMatrix.getVoxel(point[0], point[1], point[2]);
     DVEM.convertToOriginGridSpace(point);
     voxelBoundingBox.updateOrigin(point[0], point[1], point[2]);
     if (!voxel) continue;
     if (voxel[0] == "dve:air") continue;
     if (playerBoundinBox.doesBoxIntersect(voxelBoundingBox.bounds)) {
      if (
       point[1] < checkPoint.y - playerBoundinBox.dimensions.h / 2 &&
       velocity.y <= 0
      ) {
       if (
        playerBoundinBox.bounds.minY - gravity < voxelBoundingBox.bounds.maxY &&
        playerBoundinBox.bounds.minY.toFixed(2) !=
         voxelBoundingBox.bounds.maxY.toFixed(2)
       ) {
        origin.y += gravity;
       }
       foundGround = true;
       velocity.y = 0;
       jumpStates.canJump = true;
      }
      if (point[1] >= checkPoint.y && velocity.y > 0) {
       console.log("apply");
      }
     }
    }
    if (!foundGround) {
     gravityStates.flaoting = true;
    }
   };
   
   const xzUpdate = (origin: Vector3) => {
    checkPoint.updateVector(
     origin.x + speed * velocity.x,
     origin.y + velocity.y,
     origin.z + speed * velocity.z
    );
    const checkVector = checkPoint;
    checkVector.roundVector(2);
    playerBoundinBox.setCheckOrigin(checkVector.x, checkVector.y, checkVector.z);
    const sideCheckPoints = playerBoundinBox.getVoxelCheckPoints();
    let foundGround = false;
    for (const point of sideCheckPoints) {
     const voxel = DVEN.worldMatrix.getVoxel(point[0], point[1], point[2]);
     DVEM.convertToOriginGridSpace(point);
     voxelBoundingBox.updateOrigin(point[0], point[1], point[2]);
     if (!voxel) continue;
     if (voxel[0] == "dve:air") continue;
     if (playerBoundinBox.doesBoxIntersect(voxelBoundingBox.bounds)) {
      if (point[0] > checkPoint.x && velocity.x > 0) {
       velocity.x = 0;
      }
      if (point[2] > checkPoint.z && velocity.z > 0) {
       velocity.z = 0;
      }
      if (point[0] < checkPoint.x && velocity.x < 0) {
       velocity.x = 0;
      }
      if (point[2] < checkPoint.z && velocity.z < 0) {
       velocity.z = 0;
      }
     }
    }
    if (!foundGround) {
     gravityStates.flaoting = true;
    }
   };
   
   const originUpdate = (origin: Vector3) => {
    playerBoundinBox.updateOrigin(
     origin.x + speed * velocity.x,
     origin.y + velocity.y,
     origin.z + speed * velocity.z
    );
    playerPosition[0] = origin.x;
    playerPosition[1] = origin.y;
    playerPosition[2] = origin.z;
   };
   
   setInterval(async () => {
    controlsUpdate();
   
    const origin = playerBoundinBox.origin;
    yUpdate(origin);
    xzUpdate(origin);
    originUpdate(origin);
   }, 10); */ 
