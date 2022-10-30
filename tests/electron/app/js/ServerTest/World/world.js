import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { RegisterItemData } from "../../Shared/Functions/RegisterItemData.js";
import { VoxelMath } from "../../../out/Libs/Math/DivineVoxelEngineMath.js";
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
const pickSAB = new SharedArrayBuffer(4 * 3 + 3);
let pickDV = new DataView(pickSAB);
let playerDataBuffer = new SharedArrayBuffer(1);
let playerData = new DataView(playerDataBuffer);
let ready = false;
DVEW.parentComm.listenForMessage("player-server-data", (data) => {
    playerDataBuffer = data[1];
    playerData = new DataView(playerDataBuffer);
    ready = true;
});
self.DVEW = DVEW;
const builder = DVEW.getBuilder();
const depth = 32;
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
        // DVEW.addChunkFromServer(data);
    }
    if (message == 100) {
        load();
        connectionData.id = dv.getUint16(2);
        console.log("[CONECTION ID SET]", connectionData.id);
        playerData.setUint16(2, connectionData.id);
    }
    if (message == 400) {
        const playerId = dv.getUint16(2);
        playerSABS[playerId] = new SharedArrayBuffer(40);
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
        const v1 = dv.getUint32(4);
        const v2 = dv.getUint32(8);
        const x = dv.getFloat32(12);
        const y = dv.getFloat32(16);
        const z = dv.getFloat32(20);
        //DVEW.worldData.requestVoxelAddFromRaw(v1, v2, x, y, z);
    }
    if (message == 600) {
        const x = dv.getFloat32(4);
        const y = dv.getFloat32(8);
        const z = dv.getFloat32(12);
        console.log(x, y, z);
        //DVEW.worldData.requestVoxelBeRemoved(x, y, z);
    }
});
await DVEW.UTIL.createPromiseCheck({
    check: () => ready && opened,
    checkInterval: 1,
});
/*
let depth = 16;
for (let x = -depth; x <= depth; x++) {
 for (let z = -depth; z <= depth; z++) {
    for (let y = -depth; y <= depth; y++) {
  addVoxel("dve:dreamstone", 0, 0, x, y, z);
    }
 }
}

let depth = 16;
for (let x = -depth; x <= depth; x++) {
 for (let z = -depth; z <= depth; z++) {
  addVoxel("dve:dreamstone", 0, 0, x, 14, z);
 }
}
*/
DVEW.parentComm.listenForMessage("voxel-add", async (data) => {
    /*  let x = pickDV.getFloat32(0) + pickDV.getInt8(12);
     let y = pickDV.getFloat32(4) + pickDV.getInt8(13);
     let z = pickDV.getFloat32(8) + pickDV.getInt8(14);
     const voxel = DVEW.worldData.getVoxel(x, y, z);
     if (!voxel || voxel[0] < 0) {
       const rawVoxelData = await DVEW.worldData.requestVoxelAdd(
       "dve:dreamstone",
       0,
       0,
       x,
       y,
       z
      );
      //@ts-ignore
      if (rawVoxelData) {
       const message = new ArrayBuffer(4 + 8 + 4 * 3);
       const mdv = new DataView(message);
       mdv.setUint16(0, 300);
       mdv.setUint16(2, connectionData.id);
       //@ts-ignore
       mdv.setUint32(4, rawVoxelData.getUint32(0));
       //@ts-ignore
       mdv.setUint32(8, rawVoxelData.getUint32(4));
       mdv.setFloat32(12, x);
       mdv.setFloat32(16, y);
       mdv.setFloat32(20, z);
       socket.send(message);
      }
     }*/
});
DVEW.parentComm.listenForMessage("voxel-remove", async (data) => {
    let x = pickDV.getFloat32(0);
    let y = pickDV.getFloat32(4);
    let z = pickDV.getFloat32(8);
    /*  await DVEW.worldData.requestVoxelBeRemoved(x, y, z); */
    const message = new ArrayBuffer(4 + 4 * 3);
    const mdv = new DataView(message);
    mdv.setUint16(0, 400);
    mdv.setUint16(2, connectionData.id);
    mdv.setFloat32(4, x);
    mdv.setFloat32(8, y);
    mdv.setFloat32(12, z);
    console.log(x, y, z);
    socket.send(message);
});
DVEW.parentComm.listenForMessage("player-server-data", (data) => {
    playerDataBuffer = data[1];
    playerData = new DataView(playerDataBuffer);
    ready = true;
});
const positionVector = {
    x: 0,
    y: 0,
    z: 0,
};
const directionVector = {
    x: 0,
    y: 0,
    z: 0,
};
const endVector = {
    x: 0,
    y: 0,
    z: 0,
};
setInterval(() => {
    playerData.setUint16(0, 200);
    socket.send(sharedBufferToBuffer(playerDataBuffer));
    positionVector.x = playerData.getFloat32(4);
    positionVector.y = playerData.getFloat32(8);
    positionVector.z = playerData.getFloat32(12);
    directionVector.x = playerData.getFloat32(16);
    directionVector.y = playerData.getFloat32(20);
    directionVector.z = playerData.getFloat32(24);
    endVector.x = directionVector.x * 8 + positionVector.x;
    endVector.y = directionVector.y * 8 + positionVector.y;
    endVector.z = directionVector.z * 8 + positionVector.z;
    const voxels = VoxelMath.visitAll(positionVector, endVector);
    for (let i = 0; i < voxels.length; i += 3) {
        const x = voxels[i];
        const y = voxels[i + 1];
        const z = voxels[i + 2];
        /*   const voxel = DVEW.worldData.getVoxel(x, y, z);
          if (voxel && voxel[0] != -1) {
           pickDV.setFloat32(0, x);
           pickDV.setFloat32(4, y);
           pickDV.setFloat32(8, z);
           break;
          } */
    }
}, 20);
DVEW.parentComm.sendMessage("connect-player-pick", [pickSAB]);
