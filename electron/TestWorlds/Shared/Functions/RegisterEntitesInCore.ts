import {
 Entity1Rendered,
 Entity1RenderedData,
} from "../Entities/Rendered/Entity1.rendered.js";
import type { DivineVoxelEngine } from "../../../out/index";

export function RegisterEntitiesInCore(DVE: DivineVoxelEngine) {
 DVE.renderedEntites.registerEntity(
  "entity-1",
  Entity1RenderedData,
  Entity1Rendered
 );
}
