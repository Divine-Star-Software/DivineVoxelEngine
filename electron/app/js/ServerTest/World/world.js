import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { RegisterItemData } from "../../Shared/Functions/RegisterItemData.js";
const syncSABWtihBuffer = (sab, buffer) => {
    const temp1 = new Uint8Array(sab);
    const temp2 = new Uint8Array(buffer);
    temp1.set(temp2, 0);
};
const sharedBufferToBuffer = (sab) => {
    const temp1 = new Uint8Array(sab);
    const temp2 = new Uint8Array(sab.byteLength);
    temp2.set(temp1, 0);
    return temp2.buffer;
};
RegisterVoxels(DVEW);
RegisterItemData(DVEW);
await DVEW.$INIT({});
let playerDataBuffer = new SharedArrayBuffer(1);
let playerData = new DataView(playerDataBuffer);
let ready = false;
DVEW.renderComm.listenForMessage("player-server-data", (data) => {
    playerDataBuffer = data[1];
    playerData = new DataView(playerDataBuffer);
    ready = true;
});
self.DVEW = DVEW;
const depth = 32;
const startX = -depth;
const endX = depth;
const startZ = -depth;
const endZ = depth;
const load = () => {
    for (let x = startX; x <= endX; x += 16) {
        for (let z = startZ; z <= endZ; z += 16) {
            DVEW.buildWorldColumn(x, z);
        }
    }
};
const connectionData = {
    id: 0,
};
const playerSABS = {};
const socket = new WebSocket("ws://127.0.0.1:7777");
socket.binaryType = "arraybuffer";
let opened = false;
socket.addEventListener("open", (event) => {
    const buffer = new ArrayBuffer(4);
    const dv = new DataView(buffer);
    dv.setUint16(0, 0);
    socket.send(buffer);
    console.log("open");
    opened = true;
});
// Listen for messages
socket.addEventListener("message", (event) => {
    const data = event.data;
    const dv = new DataView(data);
    const message = dv.getUint16(0);
    if (dv.byteLength <= 0)
        return;
    if (message == 0) {
        DVEW.addChunkFromServer(data);
    }
    if (message == 100) {
        load();
        connectionData.id = dv.getUint16(2);
        console.log("[CONECTION ID SET]", connectionData.id);
        playerData.setUint16(2, connectionData.id);
    }
    if (message == 400) {
        const playerId = dv.getUint16(2);
        playerSABS[playerId] = new SharedArrayBuffer(28);
        console.log("[REMOTE PLYAER ID SET]", playerId);
        DVEW.renderComm.sendMessage("remote-player-connect", [
            playerId,
            playerSABS[playerId],
        ]);
    }
    if (message == 300) {
        const playerId = dv.getUint16(2);
        const sab = playerSABS[playerId];
        syncSABWtihBuffer(sab, data);
    }
});
await DVEW.UTIL.createPromiseCheck({
    check: () => ready && opened,
    checkInterval: 1,
});
setInterval(() => {
    playerData.setUint16(0, 200);
    socket.send(sharedBufferToBuffer(playerDataBuffer));
}, 20);
