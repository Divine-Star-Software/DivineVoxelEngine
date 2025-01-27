import { BinaryNumberTypes } from "@amodx/binary";
import { VoxelStructIds } from "../../Types/Voxel.types"
import { StructBuilder } from "../../../Data/Structs/StructBuilder.js"

export const VoxelStructBuilder = new StructBuilder("voxel-tag-manager", "voxel");
VoxelStructBuilder.addNode([
  {
    id: VoxelStructIds.substance,
    type: "string-map",
    allowedComms: ["constructor", "nexus", "fx", "world", "render"],
  },
  {
    id: VoxelStructIds.colliderID,
    type: "string-map",
    allowedComms: ["nexus"],
  },
  {
    id: VoxelStructIds.checkCollisions,
    type: "boolean",
    default: false,
  },
  {
    id: VoxelStructIds.renderedMaterial,
    type: "string-map",
    allowedComms: ["constructor", "nexus", "fx", "world", "render"],
  },
  {
    id: VoxelStructIds.voxelMaterial,
    type: "string-map",
    allowedComms: ["constructor", "nexus", "fx", "world", "render"],
  },
  {
    id: VoxelStructIds.isLightSource,
    type: "boolean",
    default: false,
  },
  {
    id: VoxelStructIds.noAO,
    type: "boolean",
    default: false,
  },
  {
    id: VoxelStructIds.lightValue,
    type: "number",
    numberType: BinaryNumberTypes.Uint16,
    default: 0,
  },
  {
    id: VoxelStructIds.isRich,
    type: "boolean",
    default: false,
  },
  {
    id: VoxelStructIds.isTransparent,
    type: "boolean",
    default: false,
  },
  {
    id: VoxelStructIds.canHaveSecondary,
    type: "boolean",
    default: false,
  },
  {
    id: VoxelStructIds.hardness,
    type: "number",
    numberType: BinaryNumberTypes.Uint32,
    default: 0,
  },
]);
