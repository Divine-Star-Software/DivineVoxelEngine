import { Entity1Nexus, Entity1NexusData, } from "../Entities/Nexus/Entity1.nexus.js";
export function RegisterEntitesInNexus(DVEN) {
    DVEN.nexusEntites.registerEntity("entity-1", Entity1NexusData, Entity1Nexus);
}
