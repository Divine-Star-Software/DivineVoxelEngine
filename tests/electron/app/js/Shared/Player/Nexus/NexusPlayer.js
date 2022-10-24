import { PlayerStatesIndexes, PlayerStatesValues, } from "../Shared/Player.data.js";
export const GetNexusPlayer = async (DVEN, DVEPH) => {
    const gravity = 0.1;
    const playerPositionSAB = new SharedArrayBuffer(4 * 3);
    const playerPosition = new Float32Array(playerPositionSAB);
    DVEN.parentComm.listenForMessage("request-player-states", (data) => {
        DVEN.parentComm.sendMessage("connect-player-data", [playerPositionSAB]);
    });
    let playerDirection = new Float32Array();
    let playerStates = new Uint8Array();
    let ready = false;
    DVEN.parentComm.listenForMessage("connect-player-states", (data) => {
        playerDirection = new Float32Array(data[1]);
        playerStates = new Uint8Array(data[2]);
        ready = true;
    });
    await DVEN.UTIL.createPromiseCheck({
        checkInterval: 1,
        check: () => ready,
    });
    const player = DVEPH.createEntityObject({
        states: {
            cilmbingStair: false,
            onLadder: false,
        },
        finalDirection: DVEPH.math.getVector3(0, 0, 0),
        sideDirecton: DVEPH.math.getVector3(0, 0, 0),
        speed: 0.05,
        runSpeed: 0.05,
        hitBox: { w: 0.8, h: 1.8, d: 0.8 },
        jumpStates: {
            count: 0,
            max: 20,
            jumping: false,
            canJump: true,
        },
        gravityAcceleration: 0,
        playerStates: new Uint8Array(),
        playerDirection: new Float32Array(),
        playerPosition: new Float32Array(),
        $INIT(playerStates, playerDirection, playerPosition) { },
        controlsUpdate() { },
        getSpeed() {
            return (this.playerStates[PlayerStatesIndexes.running] * this.runSpeed + this.speed);
        },
        movementFunctions: {},
    });
    player.movementFunctions[PlayerStatesValues.still] = function () {
        this.direction.scaleXYZ(0);
    };
    player.movementFunctions[PlayerStatesValues.secondaryStill] = function () {
        this.sideDirecton.scaleXYZ(0);
    };
    player.movementFunctions[PlayerStatesValues.walkingForward] = function () { };
    player.movementFunctions[PlayerStatesValues.walkingBackward] = function () {
        this.direction.scaleXYZ(-1);
    };
    player.movementFunctions[PlayerStatesValues.walkingLeft] = function () { };
    player.movementFunctions[PlayerStatesValues.walkingRight] = function () {
        this.sideDirecton.scaleXYZ(-1);
    };
    player.doCollision = function (x, y, z, colliderName, colliderData) {
        if ((colliderName == "stair-bottom" || colliderName == "stair-top") &&
            colliderData.h < 0.3) {
            if (colliderData.nz == 1) {
                this.states.cilmbingStair = true;
                return;
            }
            if (colliderData.ny == 1) {
                this.states.cilmbingStair = false;
                return;
            }
        }
        this.states.cilmbingStair = false;
    };
    player.$INIT = function (playerStates, playerDirection, playerPosition) {
        this.playerStates = playerStates;
        this.playerDirection = playerDirection;
        this.playerPosition = playerPosition;
        this.setPosition(10, 80, 7);
        this.cachePosition();
        this.syncPosition(playerPosition);
        this.velocity.y = -gravity;
        for (const key of Object.keys(this.movementFunctions)) {
            const func = this.movementFunctions[Number(key)];
            this.movementFunctions[Number(key)] = func.bind(this);
        }
    };
    player.controlsUpdate = function () {
        this.finalDirection.scaleXYZ(0);
        this.direction.updateVector(this.playerDirection[0], 0, this.playerDirection[2]);
        this.direction.normalize();
        this.sideDirecton.updateVector(this.playerDirection[3], 0, this.playerDirection[5]);
        this.sideDirecton.normalize();
        this.movementFunctions[this.playerStates[PlayerStatesIndexes.movement]]();
        this.movementFunctions[this.playerStates[PlayerStatesIndexes.secondaryMovment]]();
        this.finalDirection.addFromVec3(this.direction);
        this.finalDirection.addFromVec3(this.sideDirecton);
        if (!this.finalDirection.isZero()) {
            this.finalDirection.normalize();
        }
        this.finalDirection.scaleXYZ(this.getSpeed());
        if (this.playerStates[PlayerStatesIndexes.movement] ||
            this.playerStates[PlayerStatesIndexes.secondaryMovment])
            this.velocity.x = this.finalDirection.x;
        this.velocity.z = this.finalDirection.z;
        if (this.onGround) {
            this.gravityAcceleration = 0;
        }
        if (this.playerStates[PlayerStatesIndexes.jumping] &&
            !this.jumpStates.jumping &&
            this.onGround) {
            this.jumpStates.jumping = true;
            this.velocity.y = 0.2;
            this.playerStates[PlayerStatesIndexes.jumping] = 0;
        }
        if (this.jumpStates.jumping) {
            if (this.jumpStates.count >= this.jumpStates.max) {
                this.jumpStates.count = 0;
                this.jumpStates.jumping = false;
            }
            else {
                this.velocity.y -= 0.01;
                this.jumpStates.count++;
            }
        }
        if (!this.onGround && !this.jumpStates.jumping) {
            this.gravityAcceleration += 0.02;
            this.velocity.y = -gravity;
            this.velocity.y -= this.gravityAcceleration;
        }
    };
    player.beforeUpdate = function () {
        this.controlsUpdate();
        if (this.states.cilmbingStair) {
            this.setVelocity(0, 1, -1.5);
            this.velocity.scaleXYZ(this.getSpeed());
        }
        this.states.cilmbingStair = false;
    };
    player.afterUpdate = function () {
        this.syncPosition(this.playerPosition);
    };
    player.$INIT(playerStates, playerDirection, playerPosition);
    setTimeout(() => {
        setInterval(() => {
            player.update();
        }, 17);
    }, 2000);
};
