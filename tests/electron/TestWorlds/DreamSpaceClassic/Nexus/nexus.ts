import { GetNexusPlayer } from "../../Shared/Player/Nexus/NexusPlayer.js";
import { DVEN } from "../../../out/Nexus/DivineVoxelEngineNexus.js";
import { DVEPH } from "../../../out/Physics/DivineVoxelEnginePhysics.js";
import { RegisterVoxels } from "../../Shared/Functions/RegisterVoxelData.js";

RegisterVoxels((DVEN as any));
DVEPH.$INIT(DVEN.voxelManager);
await DVEN.$INIT();

GetNexusPlayer(DVEN,DVEPH,true);;

