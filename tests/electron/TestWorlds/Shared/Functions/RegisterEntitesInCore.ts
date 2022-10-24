import {
 Entity1Rendered,
 Entity1RenderedData,
} from "../Entities/Rendered/Entity1.rendered.js";
import type { DivineVoxelEngineRender } from "../../../out/Render/DivineVoxelEngineRender.js";

export function RegisterEntitiesInCore(DVER: DivineVoxelEngineRender) {
 DVER.renderedEntites.registerEntity(
  "entity-1",
  Entity1RenderedData,
  Entity1Rendered
 );
}
