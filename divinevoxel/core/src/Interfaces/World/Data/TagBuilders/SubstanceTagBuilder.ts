import { SubstanceTagIds } from "../../../../Data/Constants/SubstanceTagIds.js";
import { TagBuilder } from "../Classes/TagBuilder.js";

export const SubstanceTagBuilder = new TagBuilder(
  "substance-tag-manager",
  "substance"
);
SubstanceTagBuilder.addNode([
  {
    id: SubstanceTagIds.parent,
    type: "string-map",
    allowedComms: ["constructor", "nexus", "fx", "world", "render"],
  },
  {
    id: SubstanceTagIds.rendered,
    type: "string-map",
    allowedComms: ["constructor", "nexus", "fx", "world", "render"],
  },
  {
    id: SubstanceTagIds.culledSubstnaces,
    type: "object-map",
    allowedComms: ["constructor"],
  },
  {
    id: SubstanceTagIds.isSolid,
    type: "boolean",
    default: false,
  },
  {
    id: SubstanceTagIds.isLiquid,
    type: "boolean",
    default: false,
  },
  {
    id: SubstanceTagIds.flowRate,
    type: "number",
    numberType: "32f",
    default: 1,
  },
]);
