import { BinaryNumberTypes } from "@amodx/binary";
import { SubstanceStructIds } from "../../Constants/Structs/SubstanceStructIds";
import { StructBuilder } from "./StructBuilder.js";

export const SubstanceStructBuilder = new StructBuilder(
  "substance-tag-manager",
  "substance"
);
SubstanceStructBuilder.addNode([
  {
    id: SubstanceStructIds.parent,
    type: "string-map",
    allowedComms: ["constructor", "nexus", "fx", "world", "render"],
  },
  {
    id: SubstanceStructIds.rendered,
    type: "string-map",
    allowedComms: ["constructor", "nexus", "fx", "world", "render"],
  },
  {
    id: SubstanceStructIds.culledSubstnaces,
    type: "object-map",
    allowedComms: ["constructor"],
  },
  {
    id: SubstanceStructIds.isTransparent,
    type: "boolean",
    default: false,
  },
  {
    id: SubstanceStructIds.isSolid,
    type: "boolean",
    default: false,
  },
  {
    id: SubstanceStructIds.isLiquid,
    type: "boolean",
    default: false,
  },
  {
    id: SubstanceStructIds.flowRate,
    type: "number",
    numberType: BinaryNumberTypes.Float32,
    default: 1,
  },
  {
    id: SubstanceStructIds.cullDense,
    type: "boolean",
    default: false,
  },
  {
    id: SubstanceStructIds.isWindAffected,
    type: "boolean",
    default: false,
  },
  {
    id: SubstanceStructIds.isBackFaceCulled,
    type: "boolean",
    default: true,
  },
]);
