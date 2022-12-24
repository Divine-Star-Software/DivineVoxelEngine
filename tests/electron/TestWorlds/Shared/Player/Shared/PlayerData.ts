import type { TagManagerBase } from "Libs/DBT/Classes/TagManagerBase";
import type { RemoteTagManagerInitData } from "Libs/DBT/Meta/Util.types.js";
import { PlayerTagIds } from "./Player.data.js";

export const PlayerData = {
 tags: <TagManagerBase>{},
 $INIT(
  tags: TagManagerBase,
  data: [string, SharedArrayBuffer, RemoteTagManagerInitData | null]
 ) {
  this.tags = tags;
  if (data[2]) {
   (tags as any).$INIT(data[2]);
  }
  tags.setBuffer(data[1]);
 },
 position: {
  set(x: number, y: number, z: number) {
   this.x = x;
   this.y = y;
   this.z = z;
  },
  get x() {
   return PlayerData.tags.getArrayTagValue(PlayerTagIds.position, 0);
  },
  set x(v: number) {
   PlayerData.tags.setArrayTagValue(PlayerTagIds.position, 0, v);
  },
  get y() {
   return PlayerData.tags.getArrayTagValue(PlayerTagIds.position, 1);
  },
  set y(v: number) {
   PlayerData.tags.setArrayTagValue(PlayerTagIds.position, 1, v);
  },
  get z() {
   return PlayerData.tags.getArrayTagValue(PlayerTagIds.position, 2);
  },
  set z(v: number) {
   PlayerData.tags.setArrayTagValue(PlayerTagIds.position, 2, v);
  },
 },
 pick: {
  normal: {
   set(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
   },
   get x() {
    return PlayerData.tags.getArrayTagValue(PlayerTagIds.pickNormals, 0);
   },
   set x(v: number) {
    PlayerData.tags.setArrayTagValue(PlayerTagIds.pickNormals, 0, v);
   },
   get y() {
    return PlayerData.tags.getArrayTagValue(PlayerTagIds.pickNormals, 1);
   },
   set y(v: number) {
    PlayerData.tags.setArrayTagValue(PlayerTagIds.pickNormals, 1, v);
   },
   get z() {
    return PlayerData.tags.getArrayTagValue(PlayerTagIds.pickNormals, 2);
   },
   set z(v: number) {
    PlayerData.tags.setArrayTagValue(PlayerTagIds.pickNormals, 2, v);
   },
  },
  position: {
   set(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
   },
   get x() {
    return PlayerData.tags.getArrayTagValue(PlayerTagIds.pickPosition, 0);
   },
   set x(v: number) {
    PlayerData.tags.setArrayTagValue(PlayerTagIds.pickPosition, 0, v);
   },
   get y() {
    return PlayerData.tags.getArrayTagValue(PlayerTagIds.pickPosition, 1);
   },
   set y(v: number) {
    PlayerData.tags.setArrayTagValue(PlayerTagIds.pickPosition, 1, v);
   },
   get z() {
    return PlayerData.tags.getArrayTagValue(PlayerTagIds.pickPosition, 2);
   },
   set z(v: number) {
    PlayerData.tags.setArrayTagValue(PlayerTagIds.pickPosition, 2, v);
   },
  },
 },
 direction: {
  set(x: number, y: number, z: number) {
   this.x = x;
   this.y = y;
   this.z = z;
  },
  get x() {
   return PlayerData.tags.getArrayTagValue(PlayerTagIds.direction, 0);
  },
  set x(v: number) {
   PlayerData.tags.setArrayTagValue(PlayerTagIds.direction, 0, v);
  },
  get y() {
   return PlayerData.tags.getArrayTagValue(PlayerTagIds.direction, 1);
  },
  set y(v: number) {
   PlayerData.tags.setArrayTagValue(PlayerTagIds.direction, 1, v);
  },
  get z() {
   return PlayerData.tags.getArrayTagValue(PlayerTagIds.direction, 2);
  },
  set z(v: number) {
   PlayerData.tags.setArrayTagValue(PlayerTagIds.direction, 2, v);
  },
 },
 sideDirection: {
  set(x: number, y: number, z: number) {
   this.x = x;
   this.y = y;
   this.z = z;
  },
  get x() {
   return PlayerData.tags.getArrayTagValue(PlayerTagIds.sideDirection, 0);
  },
  set x(v: number) {
   PlayerData.tags.setArrayTagValue(PlayerTagIds.sideDirection, 0, v);
  },
  get y() {
   return PlayerData.tags.getArrayTagValue(PlayerTagIds.sideDirection, 1);
  },
  set y(v: number) {
   PlayerData.tags.setArrayTagValue(PlayerTagIds.sideDirection, 1, v);
  },
  get z() {
   return PlayerData.tags.getArrayTagValue(PlayerTagIds.sideDirection, 2);
  },
  set z(v: number) {
   PlayerData.tags.setArrayTagValue(PlayerTagIds.sideDirection, 2, v);
  },
 },
 rotation: {
  set(x: number, y: number, z: number) {
   this.x = x;
   this.y = y;
   this.z = z;
  },
  get x() {
   return PlayerData.tags.getArrayTagValue(PlayerTagIds.rotation, 0);
  },
  set x(v: number) {
   PlayerData.tags.setArrayTagValue(PlayerTagIds.rotation, 0, v);
  },
  get y() {
   return PlayerData.tags.getArrayTagValue(PlayerTagIds.rotation, 1);
  },
  set y(v: number) {
   PlayerData.tags.setArrayTagValue(PlayerTagIds.rotation, 1, v);
  },
  get z() {
   return PlayerData.tags.getArrayTagValue(PlayerTagIds.rotation, 2);
  },
  set z(v: number) {
   PlayerData.tags.setArrayTagValue(PlayerTagIds.rotation, 2, v);
  },
 },
 states: {
  get movement() {
   return PlayerData.tags.getTag(PlayerTagIds.states.movement);
  },
  set movement(v: number) {
   PlayerData.tags.setTag(PlayerTagIds.states.movement, v);
  },
  get secondaryMovement() {
   return PlayerData.tags.getTag(PlayerTagIds.states.secondaryMovement);
  },
  set secondaryMovement(v: number) {
   PlayerData.tags.setTag(PlayerTagIds.states.secondaryMovement, v);
  },
  get jumping() {
   return PlayerData.tags.getTag(PlayerTagIds.states.jumping);
  },
  set jumping(v: number) {
   PlayerData.tags.setTag(PlayerTagIds.states.jumping, v);
  },
  get running() {
   return PlayerData.tags.getTag(PlayerTagIds.states.running);
  },
  set running(v: number) {
   PlayerData.tags.setTag(PlayerTagIds.states.running, v);
  },
  get onGround() {
   return PlayerData.tags.getTag(PlayerTagIds.states.onGround) == 1;
  },
  set onGround(v: boolean) {
   PlayerData.tags.setTag(PlayerTagIds.states.onGround, v ? 1 : 0);
  },
  get inWater() {
   return PlayerData.tags.getTag(PlayerTagIds.states.inWater) == 1;
  },
  set inWater(v: boolean) {
   PlayerData.tags.setTag(PlayerTagIds.states.inWater, v ? 1 : 0);
  },
 },
 get eyeLevel() {
  return PlayerData.tags.getTag(PlayerTagIds.eyeLevel) / 10;
 },
 set eyeLevel(v: number) {
  if (!Number.isInteger(v)) {
   v = (v * 10) >> 0;
  }
  PlayerData.tags.setTag(PlayerTagIds.eyeLevel, v);
 },

 is: {
  get walking() {
   return PlayerData.states.movement || PlayerData.states.secondaryMovement > 1;
  },
  get running() {
   return PlayerData.states.running;
  },
  get onGround() {
   return PlayerData.states.onGround;
  },
  get inWater() {
   return PlayerData.states.inWater;
  },
 },
};
