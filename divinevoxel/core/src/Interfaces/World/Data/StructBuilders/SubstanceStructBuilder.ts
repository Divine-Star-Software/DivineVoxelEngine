import { BinaryNumberTypes } from "@amodx/binary";
import { SubstanceTagIds } from "../../../../Data/Constants/SubstanceTagIds.js";
import { StructBuilder } from "../Classes/StructBuilder.js";

export const SubstanceTagBuilder = new StructBuilder(
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
    id: SubstanceTagIds.isTransparent,
    type: "boolean",
    default: false,
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
    numberType: BinaryNumberTypes.Float32,
    default: 1,
  },
  {
    id: SubstanceTagIds.cullDense,
    type: "boolean",
    default: false,
  },
]);
