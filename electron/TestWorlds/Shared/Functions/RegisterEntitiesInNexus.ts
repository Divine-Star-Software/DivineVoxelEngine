import {
 Entity1Nexus,
 Entity1NexusData,
} from "../Entities/Nexus/Entity1.nexus.js";
import type { DivineVoxelEngineNexus } from "../../../out/Nexus/DivineVoxelEngineNexus.js";

export function RegisterEntitesInNexus(DVEN: DivineVoxelEngineNexus) {
 DVEN.nexusEntites.registerEntity("entity-1", Entity1NexusData, Entity1Nexus);
}
