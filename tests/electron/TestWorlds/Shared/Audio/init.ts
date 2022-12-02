import { Vector3 } from "../../../out/Meta/Util.types.js";
import { DVER } from "../../../out/Render/DivineVoxelEngineRender.js";
import { DAE } from "../../Libs/DAE/DivineAudioEngine.js";
import { ReigsterSounds } from "./Functions/ReigsterSounds.js";

export async function InitalizeAudio() {
 await ReigsterSounds(DAE);
 await DAE.$INIT();
 DVER.TC.registerTasks<any>("play-sound", (data) => {
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
