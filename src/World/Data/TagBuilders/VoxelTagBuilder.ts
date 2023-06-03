import { VoxelTagIDs } from "../../../Data/Constants/Tags/VoxelTagIds.js";
import { TagBuilder } from "../Classes/TagBuilder.js";

export const VoxelTagBuilder = new TagBuilder("voxel-tag-manager", "voxel");
VoxelTagBuilder.addNode([
 {
  id: VoxelTagIDs.substance,
  type: "string-map",
  allowedComms: ["constructor", "nexus", "fx", "world","render"],
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
  id: VoxelTagIDs.lightValue,
  type: "number",
  numberType: "16ui",
  default: 0,
 },
 {
  id: VoxelTagIDs.isRich,
  type: "boolean",
  default: false,
 },
 {
  id: VoxelTagIDs.hardness,
  type: "number",
  numberType: "32ui",
  default: 0,
 },
]);
