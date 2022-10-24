import { Entity1Rendered, Entity1RenderedData, } from "../Entities/Rendered/Entity1.rendered.js";
export function RegisterEntitiesInCore(DVER) {
    DVER.renderedEntites.registerEntity("entity-1", Entity1RenderedData, Entity1Rendered);
}
