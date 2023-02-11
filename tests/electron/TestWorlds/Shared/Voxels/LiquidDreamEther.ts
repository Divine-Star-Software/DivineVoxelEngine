import type { DivineVoxelEngineConstructor } from "../../../out/Constructor/DivineVoxelEngineConstructor.js";
import type { DataTool } from "../../../out/Tools/Data/DataTool.js";
const checkSets = {
 north: [
  [0, 1],
  [1, 1],
  [-1, 1],
 ],
 south: [
  [0, -1],
  [1, -1],
  [-1, -1],
 ],
 east: [
  [1, 0],
  [1, -1],
  [1, 1],
 ],
 west: [
  [-1, 0],
  [-1, -1],
  [-1, 1],
 ],
};

const overlayTextures: number[] = [];

const uvsSets: Record<string, Record<string, number>> = {
 north: {
  "0|": 0,
  "1|0|1|": 1,
  "1|1|0|": 2,
  "1|0|0|": 3,
 },
 south: {
  "0|": 4,
  "1|0|1|": 5,
  "1|1|0|": 6,
  "1|0|0|": 7,
 },
 east: {
  "0|": 8,
 },
 west: {
  "0|": 9,
 },
};

const getUV = (
 direction: "north" | "south" | "east" | "west",
 x: number,
 y: number,
 z: number,
 data: DataTool
) => {
 let key = "";
 const sets = checkSets[direction];
 for (let i = 0; i < sets.length; i++) {
  if (i > 0 && (direction == "west" || direction == "east")) break;
  const set = sets[i];
  const cx = x + set[0];
  const cz = z + set[1];
  const check = data.isSameVoxel(cx, y, cz);
  if (check) {
   key += "1|";
  } else {
   key += "0|";
   if (i == 0) break;
  }
 }

 if (uvsSets[direction][key] == undefined) return 0;
 const index = uvsSets[direction][key];
 return overlayTextures[index];
};

let uv = 0;

export function GetDreamEther(DVEC: DivineVoxelEngineConstructor) {
 DVEC.hooks.texturesRegistered.addToRun((textureManager) => {
  uv = textureManager.getTextureUV(["#dve_liquid", "liquid-dream-ether", "still-1"]);
  overlayTextures.push(
   textureManager.getTextureUV(["#dve_liquid", "foam", "top"], true),
   textureManager.getTextureUV(["#dve_liquid", "foam", "ctr"], true),
   textureManager.getTextureUV(["#dve_liquid", "foam", "ctl"], true),
   textureManager.getTextureUV(["#dve_liquid", "foam", "ctltr"], true),
   textureManager.getTextureUV(["#dve_liquid", "foam", "bottom"], true),
   textureManager.getTextureUV(["#dve_liquid", "foam", "cbr"], true),
   textureManager.getTextureUV(["#dve_liquid", "foam", "cbl"], true),
   textureManager.getTextureUV(["#dve_liquid", "foam", "cblbr"], true),
   textureManager.getTextureUV(["#dve_liquid", "foam", "right"], true),
   textureManager.getTextureUV(["#dve_liquid", "foam", "left"], true)
  );
 });

 DVEC.voxelManager.registerVoxel({
  id: "dve_liquiddreamether",

  process(templater) {
   if (templater.isFaceExpposed("top")) {
    templater.addUV(uv);
    if (
     templater.currentVoxel.getLevel() == 15 &&
     templater.currentVoxel.getLevelState() != 1
    ) {
     const x = templater.currentVoxel.x;
     const y = templater.currentVoxel.y;
     const z = templater.currentVoxel.z;
     templater.addOverlayUVs([
      getUV("north", x, y, z, templater.currentVoxel),
      getUV("south", x, y, z, templater.currentVoxel),
      getUV("east", x, y, z, templater.currentVoxel),
      getUV("west", x, y, z, templater.currentVoxel),
     ]);
    } else {
     templater.addOverlayUVs([0]);
    }
   }
   if (templater.isFaceExpposed("bottom")) {
    templater.addUV(uv).addOverlayUVs([0]);
   }
   if (templater.isFaceExpposed("east")) {
    templater.addUV(uv).addOverlayUVs([0]);
   }
   if (templater.isFaceExpposed("west")) {
    templater.addUV(uv).addOverlayUVs([0]);
   }
   if (templater.isFaceExpposed("south")) {
    templater.addUV(uv).addOverlayUVs([0]);
   }
   if (templater.isFaceExpposed("north")) {
    templater.addUV(uv).addOverlayUVs([0]);
   }
   templater.processVoxelLight(true);
  },
 });
}
