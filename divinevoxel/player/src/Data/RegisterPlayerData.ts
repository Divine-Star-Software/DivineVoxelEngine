import { TagManager } from "@divinestar/binary/";
import { PlayerPhysicsTagIDs } from "./PlayerPhysicsData.js";
import { PlayerStatsTagIDs } from "./PlayerStatsData.js";

export function $RegisterPlayerData() {
  const playerPhysicsTagManager = new TagManager("player-physics-tags");
  playerPhysicsTagManager.registerTag({
    id: PlayerPhysicsTagIDs.header,
    type: "header",
    numberType: "16ui",
  });
  playerPhysicsTagManager.registerTag({
    id: PlayerPhysicsTagIDs.position,
    type: "typed-number-array",
    numberType: "64f",
    length: 3,
  });
  playerPhysicsTagManager.registerTag({
    id: PlayerPhysicsTagIDs.pickPosition,
    type: "typed-number-array",
    numberType: "64f",
    length: 3,
  });
  playerPhysicsTagManager.registerTag({
    id: PlayerPhysicsTagIDs.pickNormals,
    type: "typed-number-array",
    numberType: "8i",
    length: 3,
  });
  playerPhysicsTagManager.registerTag({
    id: PlayerPhysicsTagIDs.rotation,
    type: "typed-number-array",
    numberType: "32f",
    length: 3,
  });
  playerPhysicsTagManager.registerTag({
    id: PlayerPhysicsTagIDs.direction,
    type: "typed-number-array",
    numberType: "32f",
    length: 3,
  });
  playerPhysicsTagManager.registerTag({
    id: PlayerPhysicsTagIDs.sideDirection,
    type: "typed-number-array",
    numberType: "32f",
    length: 3,
  });
  playerPhysicsTagManager.registerTag({
    id: PlayerPhysicsTagIDs.eyeLevel,
    type: "typed-number",
    numberType: "8ui",
  });
  playerPhysicsTagManager.registerTag({
    id: PlayerPhysicsTagIDs.states.movement,
    type: "typed-number",
    numberType: "8ui",
  });
  playerPhysicsTagManager.registerTag({
    id: PlayerPhysicsTagIDs.states.secondaryMovement,
    type: "typed-number",
    numberType: "8ui",
  });

  playerPhysicsTagManager.registerTag({
    id: PlayerPhysicsTagIDs.states.jumping,
    type: "boolean",
  });
  playerPhysicsTagManager.registerTag({
    id: PlayerPhysicsTagIDs.states.running,
    type: "boolean",
  });
  playerPhysicsTagManager.registerTag({
    id: PlayerPhysicsTagIDs.states.onGround,
    type: "boolean",
  });
  playerPhysicsTagManager.registerTag({
    id: PlayerPhysicsTagIDs.states.inWater,
    type: "boolean",
  });
  playerPhysicsTagManager.$INIT({ indexBufferMode: "shared" });

  const playerStatesTagManger = new TagManager("player-states-tags");
  playerStatesTagManger.registerTag({
    id: PlayerStatsTagIDs.header,
    type: "header",
    numberType: "16ui",
  });
  playerStatesTagManger.registerTag({
    id: PlayerStatsTagIDs.level,
    type: "typed-number",
    numberType: "16ui",
  });
  playerStatesTagManger.registerTag({
    id: PlayerStatsTagIDs.exp,
    type: "typed-number",
    numberType: "16ui",
  });
  playerStatesTagManger.registerTag({
    id: PlayerStatsTagIDs.currentMana,
    type: "typed-number",
    numberType: "16ui",
  });
  playerStatesTagManger.registerTag({
    id: PlayerStatsTagIDs.maxMana,
    type: "typed-number",
    numberType: "16ui",
  });
  playerStatesTagManger.registerTag({
    id: PlayerStatsTagIDs.currentEnergy,
    type: "typed-number",
    numberType: "16ui",
  });
  playerStatesTagManger.registerTag({
    id: PlayerStatsTagIDs.maxEnegery,
    type: "typed-number",
    numberType: "16ui",
  });
  playerStatesTagManger.registerTag({
    id: PlayerStatsTagIDs.speed,
    type: "typed-number",
    numberType: "16ui",
  });
  playerStatesTagManger.registerTag({
    id: PlayerStatsTagIDs.jumpPower,
    type: "typed-number",
    numberType: "16ui",
  });
  playerStatesTagManger.registerTag({
    id: PlayerStatsTagIDs.intuition,
    type: "typed-number",
    numberType: "16ui",
  });

  playerStatesTagManger.$INIT({ indexBufferMode: "shared" });
  return {
    playerPhysicsTagManager,
    playerStatesTagManger,
  };
}
