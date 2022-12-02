import {
 PlayerStatesIndexes,
 PlayerStatesValues,
} from "../Shared/Player.data.js";
import type { DivineVoxelEnginePhysics } from "../../../../out/Physics/DivineVoxelEnginePhysics.js";
import { DivineVoxelEngineNexus } from "../../../../out/Nexus/DivineVoxelEngineNexus.js";
import { DataTool } from "../../../../out/Tools/Data/DataTool.js";

export const GetNexusPlayer = async (
 DVEN: DivineVoxelEngineNexus,
 DVEPH: DivineVoxelEnginePhysics,
 waitForMessageFromWorld = false
) => {
 const gravity = -0.1;

 const playerPositionSAB = new SharedArrayBuffer(4 * 3);
 const playerPosition = new Float32Array(playerPositionSAB);

 DVEN.parentComm.listenForMessage("request-player-states", (data) => {
  DVEN.parentComm.sendMessage("connect-player-data", [playerPositionSAB]);
 });

 let playerDirection = new Float32Array();
 let playerStates = new Uint8Array();

 let ready = false;

 DVEN.parentComm.listenForMessage("connect-player-states", (data) => {
  playerDirection = new Float32Array(data[1]);
  playerStates = new Uint8Array(data[2]);
  ready = true;
 });

 await DVEN.UTIL.createPromiseCheck({
  checkInterval: 1,
  check: () => ready,
 });

 const player = DVEN.UTIL.merge(DVEPH.createEntityObject(), {
  states: {
   cilmbingStair: false,
   inWater: false,
   onLadder: false,
  },
  finalDirection: DVEPH.math.getVector3(0, 0, 0),
  sideDirecton: DVEPH.math.getVector3(0, 0, 0),
  speed: 0.05,
  runSpeed: 0.05,
  hitBox: { w: 0.8, h: 1.8, d: 0.8 },
  jumpStates: {
   count: 0,
   max: 10,
   jumping: false,
   canJump: true,
  },
  movementFunctions: <Record<number, Function>>{},
  gravityAcceleration: 0,
  playerStates: new Uint8Array(),
  playerDirection: new Float32Array(),
  playerPosition: new Float32Array(),
  $INIT(
   playerStates: Uint8Array,
   playerDirection: Float32Array,
   playerPosition: Float32Array
  ) {
   player.playerStates = playerStates;
   player.playerDirection = playerDirection;
   player.playerPosition = playerPosition;
   player.setPosition(10, 80, 7);
   player.cachePosition();
   player.syncPosition(playerPosition);
   player.velocity.y = gravity;
  },
  controlsUpdate() {
   //reset direction
   player.finalDirection.scaleXYZ(0);
   //get forward direction from where the player is looking
   player.direction.updateVector(
    player.playerDirection[0],
    0,
    player.playerDirection[2]
   );
   player.direction.normalize();
   //get side direction from where the player is looking
   player.sideDirecton.updateVector(
    player.playerDirection[3],
    0,
    player.playerDirection[5]
   );
   player.sideDirecton.normalize();
   //apply any changes on the direction vector based on player's state
   player.movementFunctions[
    player.playerStates[PlayerStatesIndexes.movement]
   ]();
   player.movementFunctions[
    player.playerStates[PlayerStatesIndexes.secondaryMovment]
   ]();

   //finally add, nomalize, then scale
   player.finalDirection.addFromVec3(player.direction);
   player.finalDirection.addFromVec3(player.sideDirecton);
   if (!player.finalDirection.isZero()) {
    player.finalDirection.normalize();
   }
   player.finalDirection.scaleXYZ(player.getSpeed());

   //set the player's velcoity based on their state
   if (
    player.playerStates[PlayerStatesIndexes.movement] ||
    player.playerStates[PlayerStatesIndexes.secondaryMovment]
   ) {
    player.velocity.x = player.finalDirection.x;
    player.velocity.z = player.finalDirection.z;
   }

   if (player.onGround || player.states.inWater) {
    player.gravityAcceleration = 0;
   }
   if (player.onGround) {
    player.velocity.y = gravity;
   }

   //player jump
   if (
    player.playerStates[PlayerStatesIndexes.jumping] &&
    !player.jumpStates.jumping &&
    (player.onGround || player.states.inWater)
   ) {
    player.jumpStates.jumping = true;
    player.velocity.y = 0.1;
    player.playerStates[PlayerStatesIndexes.jumping] = 0;
   }

   if (player.jumpStates.jumping) {
    if (player.jumpStates.count >= player.jumpStates.max) {
     player.jumpStates.count = 0;
     player.jumpStates.jumping = false;
    } else {
     player.jumpStates.count++;
    }
   }

   //player in air or water
   if (!player.onGround && !player.jumpStates.jumping) {
    player.gravityAcceleration += 0.0025;
    if (player.states.inWater) {
     player.velocity.y -= 0.0025;
     if (player.velocity.y < -0.01) {
      player.velocity.y = -0.01;
     }
    } else {
     if (player.velocity.y <= gravity) {
      player.velocity.y = gravity;
     }
     player.velocity.y -= player.gravityAcceleration;
    }
   }
  },
  getSpeed() {
   return (
    player.playerStates[PlayerStatesIndexes.running] * player.runSpeed +
    player.speed
   );
  },
  beforeUpdate() {
   player.states.inWater = false;
   for (let y = player.position.y; y <= player.position.y + 1; y++) {
    for (let x = player.position.x - 1; x <= player.position.x + 1; x++) {
     for (let z = player.position.z - 1; z <= player.position.z + 1; z++) {
      if (player.dataTool.loadIn(x >> 0, y >> 0, z >> 0)) {
       if (player.dataTool.getSubstance() == "liquid") {
        player.states.inWater = true;
        break;
       }
      }
     }
    }
   }
   player.controlsUpdate();
   if (player.states.cilmbingStair) {
    player.setVelocity(0, 1, -1.5);
    player.velocity.scaleXYZ(player.getSpeed());
   }
   player.states.cilmbingStair = false;
  },
  afterUpdate() {
   player.syncPosition(player.playerPosition);
  },
 });

 player.movementFunctions[PlayerStatesValues.still] = () => {
  player.direction.scaleXYZ(0);
 };
 player.movementFunctions[PlayerStatesValues.secondaryStill] = () => {
  player.sideDirecton.scaleXYZ(0);
 };
 player.movementFunctions[PlayerStatesValues.walkingForward] = () => {};
 player.movementFunctions[PlayerStatesValues.walkingBackward] = () => {
  player.direction.scaleXYZ(-1);
 };
 player.movementFunctions[PlayerStatesValues.walkingLeft] = () => {};
 player.movementFunctions[PlayerStatesValues.walkingRight] = () => {
  player.sideDirecton.scaleXYZ(-1);
 };

 player.doCollision = (colliderName, colliderData) => {
  if (
   (colliderName == "stair-bottom" || colliderName == "stair-top") &&
   colliderData.h < 0.3
  ) {
   if (colliderData.nz == 1) {
    player.states.cilmbingStair = true;
    return;
   }
   if (colliderData.ny == 1) {
    player.states.cilmbingStair = false;
    return;
   }
  }

  player.states.cilmbingStair = false;
 };

 player.$INIT(playerStates, playerDirection, playerPosition);

 const runUpdate = () => {
  setTimeout(() => {
   setInterval(() => {
    player.update();
   }, 17);
  }, 2000);
 };

 if (!waitForMessageFromWorld) {
  runUpdate();
  return player;
 }

 DVEN.worldComm.listenForMessage("ready", (data) => {
  runUpdate();
 });

 return player;
};
