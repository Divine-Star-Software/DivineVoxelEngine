import type { EntityObject } from "Meta/Physics/Entity.type.js";
import type { ColliderObject } from "Meta/Physics/Collider.type.js";
//objects
import { DVEM } from "../Libs/Math/DivineVoxelEngineMath.js";
import { CollisionsHanlder } from "./Collisions/CollisionsHandler.js";
import { EntityBase } from "./Entities/Entity.base.js";
import { ColliderManager } from "./Colliders/ColliderManager.js";
import { RegisterDefaultColliders } from "./Colliders/Functions/RegisterDefaultColliders.js";
import type { VoxelManager } from "Data/Voxel/VoxelManager.js";
import { WorldData } from "../Data/World/WorldData.js";
import { DataTool } from "../Tools/Data/DataTool.js";

export const DVEPH = {
 math: DVEM,
 collisions: CollisionsHanlder,
 colliders: ColliderManager,
 wroldData: WorldData,

 _dataTool: new DataTool(),

 voxelManager: <typeof VoxelManager | null>null,

 $INIT(manager: typeof VoxelManager) {
  RegisterDefaultColliders(this.colliders);
  this.voxelManager = manager;
 },

 getCollider(
  x: number,
  y: number,
  z: number,
  dimension: number = 0
 ): false | ColliderObject {
  if (!this.voxelManager) {
   throw new Error("Voxel manager must be set for DVEP.");
  }

  if (!this._dataTool.loadIn(x, y, z)) return false;
  if (!this._dataTool.isRenderable()) return false;
  if (this._dataTool.getSubstance() == "fluid") return false;
  const voxelData = this.voxelManager.getVoxelData(
   this._dataTool.getStringId()
  );
  if (!voxelData) return false;
  if (!voxelData.physics) {
   return this.colliders.getCollider("Box");
  }
  if (!voxelData.physics.checkCollisions) return false;

  return this.colliders.getCollider(voxelData.physics.collider);
 },

 createEntityObject<T>(base: T): T & typeof EntityBase & EntityObject {
  const newBase = Object.create(EntityBase);
  const assignedBase = Object.assign(newBase, base);
  return assignedBase;
 },
};

export type DivineVoxelEnginePhysics = typeof DVEPH;
