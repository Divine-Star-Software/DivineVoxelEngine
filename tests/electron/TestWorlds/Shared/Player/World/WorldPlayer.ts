import { VoxelMath } from "../../../../out/Libs/Math/VoxelMath.js";
import { DivineVoxelEngineWorld } from "../../../../out/World/DivineVoxelEngineWorld";

export const WorldPlayer = async (DVEW: DivineVoxelEngineWorld) => {
 const pickSAB = new SharedArrayBuffer(4 * 3 + 3);
 let pickDV = new DataView(pickSAB);

 const worldPlayerObject = {
  playerDataBuffer: new SharedArrayBuffer(1),
  playerData: new DataView(new ArrayBuffer(1)),
  onAdd: <((raw: number[],x: number, y: number, z: number) => void)[]>[],
  onRemove: <((x: number, y: number, z: number) => void)[]>[],
  onExplode: <((x: number, y: number, z: number, radius: number) => void)[]>[],
  onUpdate: <(() => void)[]>[],
 };

 const dataTool = DVEW.getDataTool();
 let playerDataBuffer = new SharedArrayBuffer(1);
 let playerData = new DataView(playerDataBuffer);
 let ready = false;
 DVEW.parentComm.sendMessage("send-player-server-data");
 DVEW.parentComm.listenForMessage("player-server-data", (data) => {
  playerDataBuffer = data[1];
  worldPlayerObject.playerDataBuffer = playerDataBuffer;
  playerData = new DataView(playerDataBuffer);
  worldPlayerObject.playerData = playerData;
  ready = true;
 });

 await DVEW.UTIL.createPromiseCheck({
  check: () => ready,
  checkInterval: 1,
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

 positionVector.x = playerData.getFloat32(4);
 positionVector.y = playerData.getFloat32(8);
 positionVector.z = playerData.getFloat32(12);

 directionVector.x = playerData.getFloat32(16);
 directionVector.y = playerData.getFloat32(20);
 directionVector.z = playerData.getFloat32(24);

 endVector.x = directionVector.x * 8 + positionVector.x;
 endVector.y = directionVector.y * 8 + positionVector.y;
 endVector.z = directionVector.z * 8 + positionVector.z;

 DVEW.parentComm.sendMessage("connect-player-pick", [pickSAB]);

 const brush = DVEW.getBrush();
 DVEW.parentComm.listenForMessage("voxel-add", (data) => {
  let x = pickDV.getFloat32(0) + pickDV.getInt8(12);
  let y = pickDV.getFloat32(4) + pickDV.getInt8(13);
  let z = pickDV.getFloat32(8) + pickDV.getInt8(14);
  if (!dataTool.loadIn(x, y, z)) return;
  if (dataTool.isRenderable()) return;
  brush.setId(data[1]).setXYZ(x, y, z).paintAndUpdate();
  const raw = brush.getRaw();
  worldPlayerObject.onAdd.forEach((_) => _(raw,x,y,z));
  DVEW.parentComm.runTasks("play-sound",["place",x,y,z]);
 });

 DVEW.parentComm.listenForMessage("voxel-remove", () => {
  let x = pickDV.getFloat32(0);
  let y = pickDV.getFloat32(4);
  let z = pickDV.getFloat32(8);
  if (!dataTool.loadIn(x, y, z)) return;
  if (dataTool.isRenderable()) {
   brush.setXYZ(x, y, z).ereaseAndUpdate();
  }
  worldPlayerObject.onRemove.forEach((_) => _(x, y, z));
  DVEW.parentComm.runTasks("play-sound",["place",x,y,z]);
 });

 DVEW.parentComm.listenForMessage("explode", () => {
  let x = pickDV.getFloat32(0);
  let y = pickDV.getFloat32(4);
  let z = pickDV.getFloat32(8);
  brush.setXYZ(x, y, z).explode();
  worldPlayerObject.onExplode.forEach((_) => _(x, y, z, 6));
  DVEW.parentComm.runTasks("play-sound",["explode",x,y,z]);
 });

 setInterval(() => {
  worldPlayerObject.onUpdate.forEach((_) => _());
  const voxels = VoxelMath.visitAll(positionVector, endVector);

  positionVector.x = playerData.getFloat32(4);
  positionVector.y = playerData.getFloat32(8) + 0.2;
  positionVector.z = playerData.getFloat32(12);

  directionVector.x = playerData.getFloat32(16);
  directionVector.y = playerData.getFloat32(20);
  directionVector.z = playerData.getFloat32(24);

  endVector.x = directionVector.x * 8 + positionVector.x;
  endVector.y = directionVector.y * 8 + positionVector.y;
  endVector.z = directionVector.z * 8 + positionVector.z;

  for (let i = 0; i < voxels.length; i += 3) {
   const x = voxels[i];
   const y = voxels[i + 1];
   const z = voxels[i + 2];

   if (!dataTool.loadIn(x, y, z)) continue;

   if (dataTool.isRenderable()) {
    pickDV.setFloat32(0, x);
    pickDV.setFloat32(4, y);
    pickDV.setFloat32(8, z);
    break;
   }
  }
 }, 12);

 return worldPlayerObject;
};
