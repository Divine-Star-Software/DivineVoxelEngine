import { PlayerStatesValues } from "../Shared/Player.data.js";
import { PlayerData } from "../Shared/PlayerData.js";
import { PlayerTagManger } from "./PlayerTagManager.js";
export const GetNexusPlayer = async (DVEN, DVP, waitForMessageFromWorld = false) => {
    const remoteData = PlayerTagManger.$INIT({
        indexBufferMode: "shared",
    });
    const playerDataSAB = new SharedArrayBuffer(remoteData.bufferSize);
    PlayerTagManger.setBuffer(playerDataSAB);
    PlayerData.$INIT(PlayerTagManger, ["", playerDataSAB, null]);
    let renderReady = false;
    DVEN.parentComm.listenForMessage("request-player-tags", (data) => {
        DVEN.parentComm.sendMessage("connect-player-tags", [
            playerDataSAB,
            remoteData,
        ]);
        renderReady = true;
    });
    DVEN.worldComm.listenForMessage("request-player-tags", (data) => {
        DVEN.worldComm.sendMessage("connect-player-tags", [
            playerDataSAB,
            remoteData,
        ]);
        renderReady = true;
    });
    await DVEN.UTIL.createPromiseCheck({
        checkInterval: 1,
        check: () => renderReady,
    });
    const gravity = -0.1;
    const player = DVEN.UTIL.merge(DVP.createEntityObject(), {
        states: {
            cilmbingStair: false,
            inWater: false,
            onLadder: false,
        },
        msterialStandingOn: "none",
        finalDirection: DVP.math.getVector3(0, 0, 0),
        sideDirection: DVP.math.getVector3(0, 0, 0),
        speed: 0.05,
        runSpeed: 0.05,
        hitBox: { w: 0.8, h: 1.8, d: 0.8 },
        jumpStates: {
            count: 0,
            max: 10,
            jumping: false,
            canJump: true,
        },
        movementFunctions: {},
        gravityAcceleration: 0,
        $INIT() {
            player.setPosition(10, 80, 7);
            player.cachePosition();
            player.velocity.y = gravity;
            player.syncPosition(PlayerData.position);
        },
        controlsUpdate() {
            //reset direction
            player.finalDirection.scaleXYZ(0);
            //get forward direction from where the player is looking
            player.direction.updateVector(PlayerData.direction.x, 0, PlayerData.direction.z);
            player.direction.normalize();
            //get side direction from where the player is looking
            player.sideDirection.updateVector(PlayerData.sideDirection.x, 0, PlayerData.sideDirection.z);
            player.sideDirection.normalize();
            //apply any changes on the direction vector based on player's state
            player.movementFunctions[PlayerData.states.movement]();
            player.movementFunctions[PlayerData.states.secondaryMovement]();
            //finally add, nomalize, then scale
            player.finalDirection.addFromVec3(player.direction);
            player.finalDirection.addFromVec3(player.sideDirection);
            if (!player.finalDirection.isZero()) {
                player.finalDirection.normalize();
            }
            player.finalDirection.scaleXYZ(player.getSpeed());
            //set the player's velcoity based on their state
            if (PlayerData.states.movement || PlayerData.states.secondaryMovement) {
                player.velocity.x = player.finalDirection.x;
                player.velocity.z = player.finalDirection.z;
            }
            if (player.onGround || player.states.inWater) {
                player.gravityAcceleration = 0;
            }
            if (player.onGround) {
                player.velocity.y = gravity;
            }
            //player jump
            if (PlayerData.states.jumping &&
                !player.jumpStates.jumping &&
                (player.onGround || player.states.inWater)) {
                player.jumpStates.jumping = true;
                player.velocity.y = 0.1;
                PlayerData.states.jumping = 0;
            }
            if (player.jumpStates.jumping) {
                if (player.jumpStates.count >= player.jumpStates.max) {
                    player.jumpStates.count = 0;
                    player.jumpStates.jumping = false;
                }
                else {
                    player.jumpStates.count++;
                }
            }
            //player in air or water
            if (!player.onGround && !player.jumpStates.jumping) {
                player.gravityAcceleration += 0.0025;
                if (player.states.inWater) {
                    player.velocity.y -= 0.0025;
                    if (player.velocity.y < -0.01) {
                        player.velocity.y = -0.01;
                    }
                }
                else {
                    if (player.velocity.y <= gravity) {
                        player.velocity.y = gravity;
                    }
                    player.velocity.y -= player.gravityAcceleration;
                }
            }
        },
        getSpeed() {
            return PlayerData.states.running * player.runSpeed + player.speed;
        },
        beforeUpdate() {
            player.states.inWater = false;
            for (let y = player.position.y; y <= player.position.y + 1; y++) {
                for (let x = player.position.x - 1; x <= player.position.x + 1; x++) {
                    for (let z = player.position.z - 1; z <= player.position.z + 1; z++) {
                        if (player.dataTool.loadInAt(x >> 0, y >> 0, z >> 0)) {
                            if (player.dataTool.getSubstance() == "#dve_liquid") {
                                player.states.inWater = true;
                                break;
                            }
                        }
                    }
                }
            }
            player.controlsUpdate();
            if (player.onGround) {
                if (player.dataTool.loadInAt(player.position.x >> 0, (player.position.y - 1) >> 0, player.position.z >> 0)) {
                    let material = player.dataTool.getMaterial();
                    if (material != this.msterialStandingOn) {
                        this.msterialStandingOn = material;
                        DVEN.parentComm.sendMessage("set-material", [material]);
                    }
                }
            }
            PlayerData.states.onGround = player.onGround;
            PlayerData.states.inWater = player.states.inWater;
            if (player.states.cilmbingStair) {
                player.setVelocity(0, 1, -1.5);
                player.velocity.scaleXYZ(player.getSpeed());
            }
            player.states.cilmbingStair = false;
        },
        afterUpdate() {
            player.syncPosition(PlayerData.position);
        },
    });
    player.movementFunctions[PlayerStatesValues.still] = () => {
        player.direction.scaleXYZ(0);
    };
    player.movementFunctions[PlayerStatesValues.secondaryStill] = () => {
        player.sideDirection.scaleXYZ(0);
    };
    player.movementFunctions[PlayerStatesValues.walkingForward] = () => { };
    player.movementFunctions[PlayerStatesValues.walkingBackward] = () => {
        player.direction.scaleXYZ(-1);
    };
    player.movementFunctions[PlayerStatesValues.walkingLeft] = () => { };
    player.movementFunctions[PlayerStatesValues.walkingRight] = () => {
        player.sideDirection.scaleXYZ(-1);
    };
    player.doCollision = (colliderName, colliderData) => {
        if ((colliderName == "stair-bottom" || colliderName == "stair-top") &&
            colliderData.h < 0.3) {
            if (colliderData.nz == 1) {
                player.states.cilmbingStair = true;
                return;
            }
            if (colliderData.ny == 1) {
                player.states.cilmbingStair = false;
                return;
            }
        }
        player.states.cilmbingStair = false;
    };
    player.$INIT();
    const runUpdate = () => {
        setTimeout(() => {
            setInterval(() => {
                player.update();
            }, 17);
        }, 2000);
    };
    if (!waitForMessageFromWorld) {
        runUpdate();
        return player;
    }
    DVEN.worldComm.listenForMessage("ready", (data) => {
        runUpdate();
    });
    return player;
};
