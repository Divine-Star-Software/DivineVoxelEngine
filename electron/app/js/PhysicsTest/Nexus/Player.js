import { DVEPH } from "../../../out/Physics/DivineVoxelEnginePhysics.js";
const states = {
    cilmbingStair: false,
    onLadder: false,
};
const player = DVEPH.createEntityObject({
    states: states,
});
player.doCollision = function (x, y, z, colliderName, colliderData) {
    if ((colliderName == "stair-bottom" ||
        colliderName == "stair-top") && colliderData.h < 0.3) {
        if (colliderData.nz == 1) {
            states.cilmbingStair = true;
            return;
        }
        if (colliderData.ny == 1) {
            states.cilmbingStair = false;
            return;
        }
    }
    states.cilmbingStair = false;
};
player.beforeUpdate = function () {
    if (this.states.cilmbingStair) {
        this.setVelocity(0, 0.1, -0.15);
    }
    this.states.cilmbingStair = false;
};
export const Player = player;
