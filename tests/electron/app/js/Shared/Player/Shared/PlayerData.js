import { PlayerTagIds } from "./Player.data.js";
export const PlayerData = {
    tags: {},
    $INIT(tags, data) {
        this.tags = tags;
        if (data[2]) {
            tags.$INIT(data[2]);
        }
        tags.setBuffer(data[1]);
    },
    position: {
        set(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        },
        get x() {
            return PlayerData.tags.getArrayTagValue(PlayerTagIds.position, 0);
        },
        set x(v) {
            PlayerData.tags.setArrayTagValue(PlayerTagIds.position, 0, v);
        },
        get y() {
            return PlayerData.tags.getArrayTagValue(PlayerTagIds.position, 1);
        },
        set y(v) {
            PlayerData.tags.setArrayTagValue(PlayerTagIds.position, 1, v);
        },
        get z() {
            return PlayerData.tags.getArrayTagValue(PlayerTagIds.position, 2);
        },
        set z(v) {
            PlayerData.tags.setArrayTagValue(PlayerTagIds.position, 2, v);
        },
    },
    pick: {
        normal: {
            set(x, y, z) {
                this.x = x;
                this.y = y;
                this.z = z;
            },
            get x() {
                return PlayerData.tags.getArrayTagValue(PlayerTagIds.pickNormals, 0);
            },
            set x(v) {
                PlayerData.tags.setArrayTagValue(PlayerTagIds.pickNormals, 0, v);
            },
            get y() {
                return PlayerData.tags.getArrayTagValue(PlayerTagIds.pickNormals, 1);
            },
            set y(v) {
                PlayerData.tags.setArrayTagValue(PlayerTagIds.pickNormals, 1, v);
            },
            get z() {
                return PlayerData.tags.getArrayTagValue(PlayerTagIds.pickNormals, 2);
            },
            set z(v) {
                PlayerData.tags.setArrayTagValue(PlayerTagIds.pickNormals, 2, v);
            },
        },
        position: {
            set(x, y, z) {
                this.x = x;
                this.y = y;
                this.z = z;
            },
            get x() {
                return PlayerData.tags.getArrayTagValue(PlayerTagIds.pickPosition, 0);
            },
            set x(v) {
                PlayerData.tags.setArrayTagValue(PlayerTagIds.pickPosition, 0, v);
            },
            get y() {
                return PlayerData.tags.getArrayTagValue(PlayerTagIds.pickPosition, 1);
            },
            set y(v) {
                PlayerData.tags.setArrayTagValue(PlayerTagIds.pickPosition, 1, v);
            },
            get z() {
                return PlayerData.tags.getArrayTagValue(PlayerTagIds.pickPosition, 2);
            },
            set z(v) {
                PlayerData.tags.setArrayTagValue(PlayerTagIds.pickPosition, 2, v);
            },
        },
    },
    direction: {
        set(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        },
        get x() {
            return PlayerData.tags.getArrayTagValue(PlayerTagIds.direction, 0);
        },
        set x(v) {
            PlayerData.tags.setArrayTagValue(PlayerTagIds.direction, 0, v);
        },
        get y() {
            return PlayerData.tags.getArrayTagValue(PlayerTagIds.direction, 1);
        },
        set y(v) {
            PlayerData.tags.setArrayTagValue(PlayerTagIds.direction, 1, v);
        },
        get z() {
            return PlayerData.tags.getArrayTagValue(PlayerTagIds.direction, 2);
        },
        set z(v) {
            PlayerData.tags.setArrayTagValue(PlayerTagIds.direction, 2, v);
        },
    },
    sideDirection: {
        set(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        },
        get x() {
            return PlayerData.tags.getArrayTagValue(PlayerTagIds.sideDirection, 0);
        },
        set x(v) {
            PlayerData.tags.setArrayTagValue(PlayerTagIds.sideDirection, 0, v);
        },
        get y() {
            return PlayerData.tags.getArrayTagValue(PlayerTagIds.sideDirection, 1);
        },
        set y(v) {
            PlayerData.tags.setArrayTagValue(PlayerTagIds.sideDirection, 1, v);
        },
        get z() {
            return PlayerData.tags.getArrayTagValue(PlayerTagIds.sideDirection, 2);
        },
        set z(v) {
            PlayerData.tags.setArrayTagValue(PlayerTagIds.sideDirection, 2, v);
        },
    },
    rotation: {
        set(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        },
        get x() {
            return PlayerData.tags.getArrayTagValue(PlayerTagIds.rotation, 0);
        },
        set x(v) {
            PlayerData.tags.setArrayTagValue(PlayerTagIds.rotation, 0, v);
        },
        get y() {
            return PlayerData.tags.getArrayTagValue(PlayerTagIds.rotation, 1);
        },
        set y(v) {
            PlayerData.tags.setArrayTagValue(PlayerTagIds.rotation, 1, v);
        },
        get z() {
            return PlayerData.tags.getArrayTagValue(PlayerTagIds.rotation, 2);
        },
        set z(v) {
            PlayerData.tags.setArrayTagValue(PlayerTagIds.rotation, 2, v);
        },
    },
    states: {
        get movement() {
            return PlayerData.tags.getTag(PlayerTagIds.states.movement);
        },
        set movement(v) {
            PlayerData.tags.setTag(PlayerTagIds.states.movement, v);
        },
        get secondaryMovement() {
            return PlayerData.tags.getTag(PlayerTagIds.states.secondaryMovement);
        },
        set secondaryMovement(v) {
            PlayerData.tags.setTag(PlayerTagIds.states.secondaryMovement, v);
        },
        get jumping() {
            return PlayerData.tags.getTag(PlayerTagIds.states.jumping);
        },
        set jumping(v) {
            PlayerData.tags.setTag(PlayerTagIds.states.jumping, v);
        },
        get running() {
            return PlayerData.tags.getTag(PlayerTagIds.states.running);
        },
        set running(v) {
            PlayerData.tags.setTag(PlayerTagIds.states.running, v);
        },
        get onGround() {
            return PlayerData.tags.getTag(PlayerTagIds.states.onGround) == 1;
        },
        set onGround(v) {
            PlayerData.tags.setTag(PlayerTagIds.states.onGround, v ? 1 : 0);
        },
        get inWater() {
            return PlayerData.tags.getTag(PlayerTagIds.states.inWater) == 1;
        },
        set inWater(v) {
            PlayerData.tags.setTag(PlayerTagIds.states.inWater, v ? 1 : 0);
        },
    },
    get eyeLevel() {
        return PlayerData.tags.getTag(PlayerTagIds.eyeLevel) / 10;
    },
    set eyeLevel(v) {
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
