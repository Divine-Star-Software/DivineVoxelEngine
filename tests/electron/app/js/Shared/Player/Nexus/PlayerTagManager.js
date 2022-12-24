import { PlayerTagIds } from "../Shared/Player.data.js";
import { TagManager } from "../../../Libs/DBT/TagManager.js";
const playerTagManager = new TagManager("player-tags");
playerTagManager.registerTag({
    id: PlayerTagIds.header,
    type: "header",
    numberType: "16ui",
});
playerTagManager.registerTag({
    id: PlayerTagIds.position,
    type: "typed-number-array",
    numberType: "64f",
    length: 3,
});
playerTagManager.registerTag({
    id: PlayerTagIds.pickPosition,
    type: "typed-number-array",
    numberType: "64f",
    length: 3,
});
playerTagManager.registerTag({
    id: PlayerTagIds.pickNormals,
    type: "typed-number-array",
    numberType: "8i",
    length: 3,
});
playerTagManager.registerTag({
    id: PlayerTagIds.rotation,
    type: "typed-number-array",
    numberType: "32f",
    length: 3,
});
playerTagManager.registerTag({
    id: PlayerTagIds.direction,
    type: "typed-number-array",
    numberType: "32f",
    length: 3,
});
playerTagManager.registerTag({
    id: PlayerTagIds.sideDirection,
    type: "typed-number-array",
    numberType: "32f",
    length: 3,
});
playerTagManager.registerTag({
    id: PlayerTagIds.eyeLevel,
    type: "typed-number",
    numberType: "8ui",
});
playerTagManager.registerTag({
    id: PlayerTagIds.states.movement,
    type: "typed-number",
    numberType: "8ui",
});
playerTagManager.registerTag({
    id: PlayerTagIds.states.secondaryMovement,
    type: "typed-number",
    numberType: "8ui",
});
playerTagManager.registerTag({
    id: PlayerTagIds.states.jumping,
    type: "boolean",
});
playerTagManager.registerTag({
    id: PlayerTagIds.states.running,
    type: "boolean",
});
playerTagManager.registerTag({
    id: PlayerTagIds.states.onGround,
    type: "boolean",
});
playerTagManager.registerTag({
    id: PlayerTagIds.states.inWater,
    type: "boolean",
});
export const PlayerTagManger = playerTagManager;
