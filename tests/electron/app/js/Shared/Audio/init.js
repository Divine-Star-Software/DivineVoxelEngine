import { DVER } from "../../../out/Render/DivineVoxelEngineRender.js";
import { DAE } from "../../Libs/DAE/DivineAudioEngine.js";
import { ReigsterSounds } from "./Functions/ReigsterSounds.js";
export async function InitalizeAudio() {
    await ReigsterSounds(DAE);
    await DAE.$INIT();
    DVER.TC.registerTasks("play-sound", (data) => {
        const soundId = data[0];
        DAE.sfx.play(soundId, {
            _3dSoundPosition: {
                x: data[1],
                y: data[2],
                z: data[3],
            },
        });
    });
    self.DAE = DAE;
    return DAE;
}
