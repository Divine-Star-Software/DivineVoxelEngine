import { Vector3 } from "../../../out/Meta/Util.types.js";
import { DVER } from "../../../out/Render/DivineVoxelEngineRender.js";
import { DAE } from "../../Libs/DAE/DivineAudioEngine.js";
import { ReigsterSounds } from "./Functions/ReigsterSounds.js";

export async function InitalizeAudio() {
 const soundData = await ReigsterSounds(DAE);
 await DAE.$INIT();
 DVER.TC.registerTasks<any>("play-sound", (data) => {
  const soundType = data[0];

  if (soundType == "voxel-break") {
   const voxelId = data[1];
      //@ts-ignore
   if (!soundData.registeredVoxesl[voxelId]) return;
   DAE.sfx.play(`${voxelId}_break`, {
    _3dSoundPosition: {
     x: data[2],
     y: data[3],
     z: data[4],
    },
   });
   return;
  }
  if (soundType == "voxel-place") {
   const voxelId = data[1];
   //@ts-ignore
   if (!soundData.registeredVoxesl[voxelId]) return;
   DAE.sfx.play(`${voxelId}_place`, {
    _3dSoundPosition: {
     x: data[2],
     y: data[3],
     z: data[4],
    },
   });
   return;
  }
  const soundId = data[0];
  DAE.sfx.play(soundId, {
   _3dSoundPosition: {
    x: data[1],
    y: data[2],
    z: data[3],
   },
  });
 });

 (self as any).DAE = DAE;

 return DAE;
}
