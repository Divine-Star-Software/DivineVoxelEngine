import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { DVEM } from "../../../out/Math/DivineVoxelEngineMath.js";
import { DVEN } from "../../../out/Nexus/DivineVoxelEngineNexus.js";
import { Player } from "./Player.js";
import { DVEPH } from "../../../out/Physics/DivineVoxelEnginePhysics.js";

RegisterVoxels(DVEN as any);

await DVEN.$INIT({});
DVEPH.$INIT();

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
DVEN.renderComm.sendMessage("connect-player-data", [playerPositionSAB]);

let playerDirection = new Float32Array();
let playerStates = new Uint8Array();

const ready = { ready: false };

DVEN.renderComm.listenForMessage("connect-player-states", (data) => {
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

let speed = 0.05;

const gravity = 0.01;
let jumpSpeed = 0.01;
const checkPoint = DVEM.getVector3(0, 0, 0);

const controlsUpdate = () => {
 directionVector.updateVector(playerDirection[0], 0, playerDirection[2]);
 directionVector.normalize();
 directionVector.roundVector(2);
 if (playerStates[0] == 1) {
  velocity.x = directionVector.x;
  velocity.z = directionVector.z;
 } else if (playerStates[0] == 2) {
  velocity.x = directionVector.x * -1;
  velocity.z = directionVector.z * -1;
 } else {
  velocity.x = 0;
  velocity.z = 0;
 }

 if (playerStates[1] == 1 && !jumpStates.jumping && Player.onGround) {
  jumpStates.jumping = true;
  velocity.y = 0.2;
  jumpSpeed = 0.05;
  playerStates[1] = 0;
 }

 if (jumpStates.jumping) {
  if (jumpStates.count >= jumpStates.max) {
   jumpStates.count = 0;
   velocity.y = -0.1;
   jumpStates.jumping = false;
  } else {
   velocity.y -= 0.01;
   jumpStates.count++;
  }
 }
};
Player.setPosition(10, 8, 7);
Player.cachePosition();
Player.syncPosition(playerPosition);
velocity.y = -gravity;
setInterval(async () => {
 controlsUpdate();
 
 Player.setVelocity(velocity.x * speed, velocity.y, velocity.z * speed);
 Player.update();
 Player.syncPosition(playerPosition);
}, 17);
