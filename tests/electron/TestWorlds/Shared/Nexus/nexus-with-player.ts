import { GetNexusPlayer } from "../Player/Nexus/NexusPlayer.js";
import { DVEN } from "../../../out/Nexus/DivineVoxelEngineNexus.js";
import { DVP } from "../../../out/Plugins/Physics/Nexus/DivineVoxelPhysics.js";

await DVEN.$INIT();
(self as any).DVEN = DVEN;
GetNexusPlayer(DVEN, DVP);;

