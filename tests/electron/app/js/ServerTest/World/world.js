import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { RegisterItemData } from "../../Shared/Functions/RegisterItemData.js";
import { WorldPlayer } from "../../Shared/Player/World/WorldPlayer.js";
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
await DVEW.$INIT();
self.DVEW = DVEW;
const builder = DVEW.getBuilder();
const depth = 128;
const startX = -depth;
const endX = depth;
const startZ = -depth;
const endZ = depth;
const load = () => {
    for (let x = startX; x <= endX; x += 16) {
        for (let z = startZ; z <= endZ; z += 16) {
            builder.setXZ(x, z).buildColumn();
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
let ready = false;
let connectionId = 0;
socket.addEventListener("open", (event) => {
    const buffer = new ArrayBuffer(4);
    const dv = new DataView(buffer);
    dv.setUint16(0, 0);
    socket.send(buffer);
    console.log("open");
    opened = true;
});
const brush = DVEW.getBrush();
// Listen for messages
socket.addEventListener("message", (event) => {
    const data = event.data;
    const dv = new DataView(data);
    const message = dv.getUint16(0);
    if (dv.byteLength <= 0)
        return;
    if (message == 0) {
        DVEW.data.worldRegister.chunk.addFromServer(data);
    }
    if (message == 100) {
        load();
        connectionData.id = dv.getUint16(2);
        console.log("[CONECTION ID SET]", connectionData.id);
        connectionId = connectionData.id;
        ready = true;
    }
    if (message == 400) {
        const playerId = dv.getUint16(2);
        playerSABS[playerId] = new SharedArrayBuffer(4 + 4 * 3 * 3);
        console.log(playerSABS);
        console.log("[REMOTE PLYAER ID SET]", playerId);
        DVEW.parentComm.sendMessage("remote-player-connect", [
            playerId,
            playerSABS[playerId],
        ]);
    }
    if (message == 300) {
        const playerId = dv.getUint16(2);
        const sab = playerSABS[playerId];
        syncSABWtihBuffer(sab, data);
    }
    if (message == 500) {
        brush
            .setXYZ(dv.getFloat32(12), dv.getFloat32(16), dv.getFloat32(20))
            .setRaw([dv.getUint32(4), dv.getUint32(8)])
            .paintAndUpdate();
    }
    if (message == 600) {
        brush
            .setXYZ(dv.getFloat32(4), dv.getFloat32(8), dv.getFloat32(12))
            .eraseAndUpdate();
    }
    if (message == 700) {
        console.log("remove");
        DVEW.parentComm.sendMessage("remove-remote-player", [dv.getUint16(2)]);
    }
    if (message == 800) {
        console.log("explode");
        brush
            .setXYZ(dv.getFloat32(4), dv.getFloat32(8), dv.getFloat32(12))
            .explode();
    }
});
await DVEW.UTIL.createPromiseCheck({
    check: () => opened && ready,
    checkInterval: 2000,
});
const player = await WorldPlayer(DVEW);
player.data.setUint16(2, connectionId);
player.onExplode.push((x, y, z, radius) => {
    const message = new ArrayBuffer(4 + 4 * 3);
    const mdv = new DataView(message);
    mdv.setUint16(0, 500);
    mdv.setUint16(2, connectionData.id);
    mdv.setFloat32(4, x);
    mdv.setFloat32(8, y);
    mdv.setFloat32(12, z);
    socket.send(message);
});
player.onAdd.push((raw, x, y, z) => {
    const message = new ArrayBuffer(4 + 8 + 4 * 3);
    const mdv = new DataView(message);
    mdv.setUint16(0, 300);
    mdv.setUint16(2, connectionData.id);
    mdv.setUint32(4, raw[0]);
    mdv.setUint32(8, raw[1]);
    mdv.setFloat32(12, x);
    mdv.setFloat32(16, y);
    mdv.setFloat32(20, z);
    socket.send(message);
});
player.onRemove.push((x, y, z) => {
    const message = new ArrayBuffer(4 + 4 * 3);
    const mdv = new DataView(message);
    mdv.setUint16(0, 400);
    mdv.setUint16(2, connectionData.id);
    mdv.setFloat32(4, x);
    mdv.setFloat32(8, y);
    mdv.setFloat32(12, z);
    socket.send(message);
});
player.onUpdate.push(() => {
    player.data.setUint16(0, 200);
    socket.send(sharedBufferToBuffer(player.playerDataBuffer));
});
