import { DVEM } from "../../../out/Math/DivineVoxelEngineMath.js";
import { DVEW } from "../../../out/World/DivineVoxelEngineWorld.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";
import { WorldGen } from "./WorldGen/WorldGen.js";
RegisterVoxels(DVEW);

await DVEW.$INIT({
 onReady: () => {},
});

const depth = 64;
let startX = -depth;
let startZ = -depth;
let endX = depth;
let endZ = depth;

for (let x = startX; x < endX; x += 16) {
 for (let z = startZ; z < endZ; z += 16) {
  WorldGen.generateChunk(x, 0, z);
  DVEW.queues.addWorldColumnToSunLightQue(x, z);
 }
}
for (let x = startX; x < endX; x += 16) {
 for (let z = startZ; z < endZ; z += 16) {
  DVEW.buildChunk(x, 0, z);
 }
}

const playerBoundinBox = DVEM.getSimpleBoundingBox(
 DVEM.getPositionVector3(3, 7, 0),
 { w: 0.8, h: 2, d: 0.8 }
);

const voxelBoundingBox = DVEM.getSimpleBoundingBox(
 DVEM.getPositionVector3(0, 0, 0),
 { w: 1, h: 1, d: 1 }
);

const playerPositionSAB = new SharedArrayBuffer(4 * 3);

const playerPosition = new Float32Array(playerPositionSAB);
playerPosition[0] = 3;
playerPosition[1] = 7;
DVEW.renderComm.sendMessage("connect-player-data", [playerPositionSAB]);

const velocity = { x: 1, y: 0, z: 1.3 };
const speed = 0.1;

setInterval(async () => {
 const origion = playerBoundinBox.origion.getVector();
 playerBoundinBox.setCheckOrigion(
  origion.x + speed * velocity.x,
  origion.y + speed * velocity.y,
  origion.z + speed * velocity.z
 );
 const checkPoints = playerBoundinBox.getVoxelCheckPoints();

 for (const point of checkPoints) {
  DVEM.convertToGridSpace(point);
  voxelBoundingBox.updateOrigion(point[0], point[1], point[2]);
  const voxel = DVEW.worldData.getVoxel(point[0], point[1], point[2]);
  if (!voxel) continue;
  if (voxel[0] == -1) continue;
  if (playerBoundinBox.doesBoxIntersect(voxelBoundingBox.bounds)) {
   velocity.x = 0;
   setTimeout(()=>{
    velocity.x = -1.5;
    console.log(velocity.x);
   },100)

   continue;
  }
 }
 playerBoundinBox.updateOrigion(
  origion.x + speed * velocity.x,
  origion.y + speed * velocity.y,
  origion.z + speed * velocity.z
 );
 playerPosition[0] = origion.x;
 playerPosition[1] = origion.y;
 playerPosition[2] = origion.z;
}, 100);

(self as any).DVEW = DVEW;
