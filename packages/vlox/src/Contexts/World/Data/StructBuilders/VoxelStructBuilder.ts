import { BinaryNumberTypes } from "@amodx/binary";
import { VoxelTagIDs } from "../../../../Data/Constants/VoxelTagIds.js";
import { StructBuilder } from "../Classes/StructBuilder.js";

export const VoxelTagBuilder = new StructBuilder("voxel-tag-manager", "voxel");
VoxelTagBuilder.addNode([
  {
    id: VoxelTagIDs.substance,
    type: "string-map",
    allowedComms: ["constructor", "nexus", "fx", "world", "render"],
  },
  {
    id: VoxelTagIDs.shapeID,
    type: "string-map",
    allowedComms: ["constructor"],
  },
  {
    id: VoxelTagIDs.colliderID,
    type: "string-map",
    allowedComms: ["nexus"],
  },
  {
    id: VoxelTagIDs.checkCollisions,
    type: "boolean",
    default: false,
  },
  {
    id: VoxelTagIDs.material,
    type: "string-map",
    allowedComms: ["nexus"],
  },
  {
    id: VoxelTagIDs.isLightSource,
    type: "boolean",
    default: false,
  },
  {
    id: VoxelTagIDs.noAO,
    type: "boolean",
    default: false,
  },
  {
    id: VoxelTagIDs.lightValue,
    type: "number",
    numberType: BinaryNumberTypes.Uint16,
    default: 0,
  },
  {
    id: VoxelTagIDs.isRich,
    type: "boolean",
    default: false,
  },
  {
    id: VoxelTagIDs.isTransparent,
    type: "boolean",
    default: false,
  },
  {
    id: VoxelTagIDs.canHaveSecondary,
    type: "boolean",
    default: false,
  },
  {
    id: VoxelTagIDs.hardness,
    type: "number",
    numberType: BinaryNumberTypes.Uint32,
    default: 0,
  },
]);
