import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { DVEN } from "../../../out/Nexus/DivineVoxelEngineNexus.js";
import { Player } from "./Player.js";
import { DVEPH } from "../../../out/Physics/DivineVoxelEnginePhysics.js";

RegisterVoxels(DVEN as any);

await DVEN.$INIT();
DVEPH.$INIT(DVEN.voxelManager);

const playerPositionSAB = new SharedArrayBuffer(4 * 3);
const playerPosition = new Float32Array(playerPositionSAB);

DVEN.parentComm.sendMessage("connect-player-data", [playerPositionSAB]);

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

Player.$INIT(playerStates, playerDirection, playerPosition);
setInterval(() => {
 Player.update();
}, 17);
 