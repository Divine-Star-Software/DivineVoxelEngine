import { RegisterVoxels } from "../Data/Functions/RegisterVoxelData.js";
import { WebSocketServer } from "ws";
import { DVEW } from "../../out/World/DivineVoxelEngineWorld.js";
import { WorldGen } from "./WorldGen/WorldGen.js";

RegisterVoxels(DVEW);

await DVEW.$INIT();

const d = {
 star: `         [1m[35m.[0m
        [1m[35m,[0m[1m[35mX[0m[1m[35m,[0m
       [1m[35m,[0m[1m[35mX[0m[1m[35mO[0m[1m[35mX[0m[1m[35m,[0m
 [1m[35m'[0m[1m[35mx[0m[1m[35mo[0m[1m[35mo[0m[1m[35mo[0m[1m[35mo[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mo[0m[1m[35mo[0m[1m[35mo[0m[1m[35mo[0m[1m[35mx[0m[1m[35m'[0m
   [1m[35m\`[0m[1m[35mX[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mX[0m[1m[35m\`[0m
     [1m[35m\`[0m[1m[35mX[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mO[0m[1m[35mX[0m[1m[35m\`[0m
     [1m[35mX[0m[1m[35mO[0m[1m[35mO[0m[1m[35mX[0m[1m[35m'[0m[1m[35mX[0m[1m[35mO[0m[1m[35mO[0m[1m[35mX[0m
    [1m[35mX[0m[1m[35mO[0m[1m[35mX[0m[1m[35m'[0m   [1m[35m'[0m[1m[35mX[0m[1m[35mO[0m[1m[35mX[0m
   [1m[35mX[0m[1m[35m'[0m         [1m[35m'[0m[1m[35mX[0m`,
};

console.log(d.star);

const severMessage = (message: string, data: any[] = []) => {
 console.log(`SERVER: [${message}]`, data);
};
severMessage("DIVINE VOXEL ENGINE SERVER");

const builder = DVEW.getBuilder();
const brush = DVEW.getBrush();
const tasks = DVEW.getTasksTool();

const depth = 128;
const startX = -depth;
const endX = depth;
const startZ = -depth;
const endZ = depth;

for (let x = startX; x <= endX; x += 16) {
 for (let z = startZ; z <= endZ; z += 16) {
  builder.setXZ(x, z).fillColumn();
  WorldGen.generate(x, z);
  tasks.light.worldSun.add(x, z);
 }
}
await tasks.light.worldSun.runAndAwait();

const connectionIds: Record<number, boolean> = {};

const getPlayerConnectionId = () => {
 let id = 0;
 let k = 0;
 while (true) {
  id = (Math.random() * 2 ** 14) >> 0;
  if (!connectionIds[id]) {
   connectionIds[id] = true;
   return id;
  }
  k++;
  if (k > 1000) break;
 }
 return id;
};

type ConnectionData = {
 id: number;
 socket: WebSocket;
 dataPackets: ArrayBuffer[];
};

const connections: Record<number, ConnectionData> = {};

const wss = new WebSocketServer({ port: 7777 });
wss.on("connection", function connection(ws) {
 ws.binaryType = "arraybuffer";
 ws.on("open", function () {});

 const id = getPlayerConnectionId();
 connections[id] = {
  id: id,
  socket: ws as any,
  dataPackets: [],
 };
 severMessage("NEW CONNECTION", [id]);

 ws.on("close", function message(data) {
  delete connections[id];
  severMessage("PLAYER DISCONNECTED", [id]);
  const buffer = new ArrayBuffer(4);
  const dv = new DataView(buffer);
  dv.setUint16(0, 700);
  dv.setUint16(2, id);
  updateClients((data) => {
   data.socket.send(buffer);
  });
 });

 ws.on("message", function message(data) {
  const dv = new DataView(data as any);
  const message = dv.getUint16(0);
  if (message == 0) {
   for (let x = startX; x <= endX; x += 16) {
    for (let z = startZ; z <= endZ; z += 16) {
     const wc = DVEW.data.worldRegister.column.get(0, x, z);
     if (!wc) continue;
     wc.chunks.forEach((chunk) => {
      ws.send(chunk.buffer);
     });
    }
   }

   const buf = new ArrayBuffer(4);
   const dv = new DataView(buf);
   dv.setUint16(0, 100);
   dv.setUint16(2, id);
   ws.send(buf);

   updateClients((data) => {
    sendAllPlayer(data.id);
   });
  }
  if (message == 200) {
   connections[id].dataPackets.push(data as ArrayBuffer);
  }
  if (message == 300) {
   //added voxel

   const clientId = dv.getUint16(2);
   const v1 = dv.getUint32(4);
   const v2 = dv.getUint32(8);
   const x = dv.getFloat32(12);
   const y = dv.getFloat32(16);
   const z = dv.getFloat32(20);
   brush.setXYZ(x, y, z).setRaw([v1, v2]).paintAndUpdate();

   dv.setUint16(0, 500);
   updateClients((con) => {
    con.socket.send(dv.buffer);
   }, clientId);
   severMessage("VOXEL ADD", [clientId]);
  }
  if (message == 400) {
   const clientId = dv.getUint16(2);
   const x = dv.getFloat32(4);
   const y = dv.getFloat32(8);
   const z = dv.getFloat32(12);
   brush.setXYZ(x, y, z).eraseAndUpdate();
   console.log(x, y, z);
   dv.setUint16(0, 600);
   updateClients((con) => {
    con.socket.send(dv.buffer);
   }, clientId);
   severMessage("VOXEL REMOVE", [clientId]);
  }
  if (message == 500) {
    const clientId = dv.getUint16(2);
    const x = dv.getFloat32(4);
    const y = dv.getFloat32(8);
    const z = dv.getFloat32(12);
    brush.setXYZ(x, y, z).explode();
    dv.setUint16(0, 800);
    updateClients((con) => {
     con.socket.send(dv.buffer);
    }, clientId);
    severMessage("EXPLOSION", [clientId]);
   }
 });
});

const updateClients = (
 run: (data: ConnectionData) => void,
 ignoreId: number = -1
) => {
 for (const ids of Object.keys(connections)) {
  const id = Number(ids);
  if (id == ignoreId) continue;
  const connection = connections[id];
  run(connection);
 }
};

const sendAllPlayer = (clientId: number) => {
 const clientConnection = connections[clientId];
 updateClients((connection) => {
  const packet = new ArrayBuffer(4);
  const dv = new DataView(packet);
  dv.setUint16(0, 400);
  dv.setUint16(2, connection.id);
  clientConnection.socket.send(packet);
 }, clientId);
};

setInterval(() => {
 updateClients((connection) => {
  if (connection.dataPackets.length > 0) {
   while (true) {
    const dataPacket = connection.dataPackets.shift();
    if (!dataPacket) break;
    const dv = new DataView(dataPacket);
    dv.setUint16(0, 300);
    updateClients((connection) => {
     connection.socket.send(dataPacket);
    }, connection.id);
   }
  }
 });
}, 20);
