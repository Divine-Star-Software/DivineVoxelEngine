"use strict";
(self["webpackChunkdve_testing"] = self["webpackChunkdve_testing"] || []).push([["DSLIBS_dvePlugIns_Player_dist_Data_PlayerManager_js-DSLIBS_dvePlugIns_Player_dist_Data_Regist-d31b5c"],{

/***/ "../../DSLIBS/dvePlugIns/Player/dist/Data/PlayerManager.js":
/*!*****************************************************************!*\
  !*** ../../DSLIBS/dvePlugIns/Player/dist/Data/PlayerManager.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlayerManager": () => (/* binding */ PlayerManager)
/* harmony export */ });
const PlayerManager = {
    currentDimension: "main",
    physics: {},
    stats: {},
    $INIt(data) { },
};


/***/ }),

/***/ "../../DSLIBS/dvePlugIns/Player/dist/Data/PlayerPhysicsData.js":
/*!*********************************************************************!*\
  !*** ../../DSLIBS/dvePlugIns/Player/dist/Data/PlayerPhysicsData.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlayerPhysicsData": () => (/* binding */ PlayerPhysicsData),
/* harmony export */   "PlayerPhysicsStatesValues": () => (/* binding */ PlayerPhysicsStatesValues),
/* harmony export */   "PlayerPhysicsTagIDs": () => (/* binding */ PlayerPhysicsTagIDs),
/* harmony export */   "PlayerPhysicsTags": () => (/* binding */ PlayerPhysicsTags)
/* harmony export */ });
/* harmony import */ var divine_binary_tags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-binary-tags */ "../../DSLIBS/divineBinaryTags/dist/index.js");

const PlayerPhysicsStatesValues = {
    still: 0,
    secondaryStill: 1,
    walkingForward: 2,
    walkingBackward: 3,
    walkingLeft: 4,
    walkingRight: 5,
};
const PlayerPhysicsTagIDs = {
    header: "#header",
    position: "#position",
    pickPosition: "#pick-position",
    pickNormals: "#pick-normals",
    direction: "#direction",
    sideDirection: "#side-direction",
    rotation: "#rotation",
    eyeLevel: "#eye-level",
    states: {
        movement: "#movement-state",
        secondaryMovement: "#secondary-movement-state",
        jumping: "#is-jumping",
        running: "#is-running",
        onGround: "#is-on-ground",
        inWater: "#is-in-water",
    },
};
const PlayerPhysicsTags = new divine_binary_tags__WEBPACK_IMPORTED_MODULE_0__.RemoteTagManager("player-physics-tags");
class DBTVec3 {
    tagId;
    parent;
    constructor(tagId, parent) {
        this.tagId = tagId;
        if (parent) {
            this.parent = parent;
        }
    }
    set(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    get x() {
        return this.parent.tags.getArrayTagValue(this.tagId, 0);
    }
    set x(v) {
        this.parent.tags.setArrayTagValue(this.tagId, 0, v);
    }
    get y() {
        return this.parent.tags.getArrayTagValue(this.tagId, 1);
    }
    set y(v) {
        this.parent.tags.setArrayTagValue(this.tagId, 1, v);
    }
    get z() {
        return this.parent.tags.getArrayTagValue(this.tagId, 2);
    }
    set z(v) {
        this.parent.tags.setArrayTagValue(this.tagId, 2, v);
    }
    getAsArray() {
        return [this.x, this.y, this.z];
    }
}
class PlayerPhysicsData {
    tags;
    constructor(buffer, initData) {
        this.tags = new divine_binary_tags__WEBPACK_IMPORTED_MODULE_0__.RemoteTagManager("player-physics-tags");
        this.tags.$INIT(initData);
        this.tags.setBuffer(buffer);
        this.pick._s = this;
        this.states._s = this;
        this.is._s = this;
        this.nowIs._s = this;
    }
    position = new DBTVec3(PlayerPhysicsTagIDs.position, this);
    pick = {
        _s: {},
        normal: new DBTVec3(PlayerPhysicsTagIDs.pickNormals, this),
        position: new DBTVec3(PlayerPhysicsTagIDs.pickPosition, this),
        getPlacePosition() {
            return [
                this.position.x + this.normal.x,
                this.position.y + this.normal.y,
                this.position.z + this.normal.z,
            ];
        },
        getPlaceVec3() {
            return {
                x: this.position.x + this.normal.x,
                y: this.position.y + this.normal.y,
                z: this.position.z + this.normal.z,
            };
        },
    };
    direction = new DBTVec3(PlayerPhysicsTagIDs.direction, this);
    sideDirection = new DBTVec3(PlayerPhysicsTagIDs.sideDirection, this);
    rotation = new DBTVec3(PlayerPhysicsTagIDs.rotation, this);
    states = {
        _s: {},
        get movement() {
            return this._s.tags.getTag(PlayerPhysicsTagIDs.states.movement);
        },
        set movement(v) {
            this._s.tags.setTag(PlayerPhysicsTagIDs.states.movement, v);
        },
        get secondaryMovement() {
            return this._s.tags.getTag(PlayerPhysicsTagIDs.states.secondaryMovement);
        },
        set secondaryMovement(v) {
            this._s.tags.setTag(PlayerPhysicsTagIDs.states.secondaryMovement, v);
        },
        get jumping() {
            return this._s.tags.getTag(PlayerPhysicsTagIDs.states.jumping);
        },
        set jumping(v) {
            this._s.tags.setTag(PlayerPhysicsTagIDs.states.jumping, v);
        },
        get running() {
            return this._s.tags.getTag(PlayerPhysicsTagIDs.states.running);
        },
        set running(v) {
            this._s.tags.setTag(PlayerPhysicsTagIDs.states.running, v);
        },
        get onGround() {
            return this._s.tags.getTag(PlayerPhysicsTagIDs.states.onGround) == 1;
        },
        set onGround(v) {
            this._s.tags.setTag(PlayerPhysicsTagIDs.states.onGround, v ? 1 : 0);
        },
        get inWater() {
            return this._s.tags.getTag(PlayerPhysicsTagIDs.states.inWater) == 1;
        },
        set inWater(v) {
            this._s.tags.setTag(PlayerPhysicsTagIDs.states.inWater, v ? 1 : 0);
        },
    };
    get eyeLevel() {
        return this.tags.getTag(PlayerPhysicsTagIDs.eyeLevel) / 10;
    }
    set eyeLevel(v) {
        if (!Number.isInteger(v)) {
            v = (v * 10) >> 0;
        }
        this.tags.setTag(PlayerPhysicsTagIDs.eyeLevel, v);
    }
    nowIs = {
        _s: {},
        still() {
            this._s.states.movement = PlayerPhysicsStatesValues.still;
            this._s.states.secondaryMovement =
                PlayerPhysicsStatesValues.secondaryStill;
        },
        walkingForward(v = true) {
            this._s.states.movement = v
                ? PlayerPhysicsStatesValues.walkingForward
                : PlayerPhysicsStatesValues.still;
        },
        walkingBackward(v = true) {
            this._s.states.movement = v
                ? PlayerPhysicsStatesValues.walkingBackward
                : PlayerPhysicsStatesValues.still;
        },
        walkingLeft(v = true) {
            this._s.states.secondaryMovement = v
                ? PlayerPhysicsStatesValues.walkingLeft
                : PlayerPhysicsStatesValues.secondaryStill;
        },
        walkingRight(v = true) {
            this._s.states.secondaryMovement = v
                ? PlayerPhysicsStatesValues.walkingRight
                : PlayerPhysicsStatesValues.secondaryStill;
        },
        jumping(v = true) {
            this._s.states.jumping = v ? 1 : 0;
        },
        running(v = true) {
            this._s.states.running = v ? 1 : 0;
        },
    };
    is = {
        _s: {},
        get walking() {
            return this._s.states.movement || this._s.states.secondaryMovement > 1;
        },
        get running() {
            return this._s.states.running;
        },
        get onGround() {
            return this._s.states.onGround;
        },
        get inWater() {
            return this._s.states.inWater;
        },
    };
}


/***/ }),

/***/ "../../DSLIBS/dvePlugIns/Player/dist/Data/PlayerStatsData.js":
/*!*******************************************************************!*\
  !*** ../../DSLIBS/dvePlugIns/Player/dist/Data/PlayerStatsData.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlayerStatsData": () => (/* binding */ PlayerStatsData),
/* harmony export */   "PlayerStatsTagIDs": () => (/* binding */ PlayerStatsTagIDs),
/* harmony export */   "PlayerStatsTags": () => (/* binding */ PlayerStatsTags)
/* harmony export */ });
/* harmony import */ var divine_binary_tags_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-binary-tags/index.js */ "../../DSLIBS/divineBinaryTags/dist/index.js");

const PlayerStatsTags = new divine_binary_tags_index_js__WEBPACK_IMPORTED_MODULE_0__.RemoteTagManager("player-stats-tags");
const PlayerStatsTagIDs = {
    header: "#header",
    level: "#level",
    exp: "#exp",
    maxMana: "#max_mana",
    currentMana: "#current_mana",
    maxEnegery: "#max_energy",
    currentEnergy: "#current_energy",
    speed: "#speed",
    jumpPower: "#jump_power",
    intuition: "#intuition",
};
class PlayerStatsData {
    tags = new divine_binary_tags_index_js__WEBPACK_IMPORTED_MODULE_0__.RemoteTagManager("player-stairs-data");
    constructor(sab, initData) {
        this.tags.$INIT(initData);
        this.tags.setBuffer(sab);
    }
    get level() {
        return this.tags.getTag(PlayerStatsTagIDs.level);
    }
    set level(level) {
        this.tags.setTag(PlayerStatsTagIDs.level, level);
    }
    get exp() {
        return this.tags.getTag(PlayerStatsTagIDs.exp);
    }
    set exp(exp) {
        this.tags.setTag(PlayerStatsTagIDs.exp, exp);
    }
    get maxMana() {
        return this.tags.getTag(PlayerStatsTagIDs.maxMana);
    }
    set maxMana(maxMana) {
        this.tags.setTag(PlayerStatsTagIDs.maxMana, maxMana);
    }
    get currentMana() {
        return this.tags.getTag(PlayerStatsTagIDs.currentMana);
    }
    set currentMana(currentMana) {
        this.tags.setTag(PlayerStatsTagIDs.currentMana, currentMana);
    }
    get maxEnegery() {
        return this.tags.getTag(PlayerStatsTagIDs.maxEnegery);
    }
    set maxEnegery(maxEnegery) {
        this.tags.setTag(PlayerStatsTagIDs.maxEnegery, maxEnegery);
    }
    get currentEnergy() {
        return this.tags.getTag(PlayerStatsTagIDs.currentEnergy);
    }
    set currentEnergy(currentEnergy) {
        this.tags.setTag(PlayerStatsTagIDs.currentEnergy, currentEnergy);
    }
    get speed() {
        return this.tags.getTag(PlayerStatsTagIDs.speed);
    }
    set speed(speed) {
        this.tags.setTag(PlayerStatsTagIDs.speed, speed);
    }
    get jumpPower() {
        return this.tags.getTag(PlayerStatsTagIDs.jumpPower);
    }
    set jumpPower(jumpPower) {
        this.tags.setTag(PlayerStatsTagIDs.jumpPower, jumpPower);
    }
    get intuition() {
        return this.tags.getTag(PlayerStatsTagIDs.intuition);
    }
    set intuition(intuition) {
        this.tags.setTag(PlayerStatsTagIDs.intuition, intuition);
    }
}


/***/ }),

/***/ "../../DSLIBS/dvePlugIns/Player/dist/Data/RegisterPlayerData.js":
/*!**********************************************************************!*\
  !*** ../../DSLIBS/dvePlugIns/Player/dist/Data/RegisterPlayerData.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$RegisterPlayerData": () => (/* binding */ $RegisterPlayerData)
/* harmony export */ });
/* harmony import */ var divine_binary_tags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-binary-tags */ "../../DSLIBS/divineBinaryTags/dist/index.js");
/* harmony import */ var _PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PlayerPhysicsData.js */ "../../DSLIBS/dvePlugIns/Player/dist/Data/PlayerPhysicsData.js");
/* harmony import */ var _PlayerStatsData_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PlayerStatsData.js */ "../../DSLIBS/dvePlugIns/Player/dist/Data/PlayerStatsData.js");



function $RegisterPlayerData() {
    const playerPhysicsTagManager = new divine_binary_tags__WEBPACK_IMPORTED_MODULE_0__.TagManager("player-physics-tags");
    playerPhysicsTagManager.registerTag({
        id: _PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_1__.PlayerPhysicsTagIDs.header,
        type: "header",
        numberType: "16ui",
    });
    playerPhysicsTagManager.registerTag({
        id: _PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_1__.PlayerPhysicsTagIDs.position,
        type: "typed-number-array",
        numberType: "64f",
        length: 3,
    });
    playerPhysicsTagManager.registerTag({
        id: _PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_1__.PlayerPhysicsTagIDs.pickPosition,
        type: "typed-number-array",
        numberType: "64f",
        length: 3,
    });
    playerPhysicsTagManager.registerTag({
        id: _PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_1__.PlayerPhysicsTagIDs.pickNormals,
        type: "typed-number-array",
        numberType: "8i",
        length: 3,
    });
    playerPhysicsTagManager.registerTag({
        id: _PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_1__.PlayerPhysicsTagIDs.rotation,
        type: "typed-number-array",
        numberType: "32f",
        length: 3,
    });
    playerPhysicsTagManager.registerTag({
        id: _PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_1__.PlayerPhysicsTagIDs.direction,
        type: "typed-number-array",
        numberType: "32f",
        length: 3,
    });
    playerPhysicsTagManager.registerTag({
        id: _PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_1__.PlayerPhysicsTagIDs.sideDirection,
        type: "typed-number-array",
        numberType: "32f",
        length: 3,
    });
    playerPhysicsTagManager.registerTag({
        id: _PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_1__.PlayerPhysicsTagIDs.eyeLevel,
        type: "typed-number",
        numberType: "8ui",
    });
    playerPhysicsTagManager.registerTag({
        id: _PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_1__.PlayerPhysicsTagIDs.states.movement,
        type: "typed-number",
        numberType: "8ui",
    });
    playerPhysicsTagManager.registerTag({
        id: _PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_1__.PlayerPhysicsTagIDs.states.secondaryMovement,
        type: "typed-number",
        numberType: "8ui",
    });
    playerPhysicsTagManager.registerTag({
        id: _PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_1__.PlayerPhysicsTagIDs.states.jumping,
        type: "boolean",
    });
    playerPhysicsTagManager.registerTag({
        id: _PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_1__.PlayerPhysicsTagIDs.states.running,
        type: "boolean",
    });
    playerPhysicsTagManager.registerTag({
        id: _PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_1__.PlayerPhysicsTagIDs.states.onGround,
        type: "boolean",
    });
    playerPhysicsTagManager.registerTag({
        id: _PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_1__.PlayerPhysicsTagIDs.states.inWater,
        type: "boolean",
    });
    playerPhysicsTagManager.$INIT({ indexBufferMode: "shared" });
    const playerStatesTagManger = new divine_binary_tags__WEBPACK_IMPORTED_MODULE_0__.TagManager("player-states-tags");
    playerStatesTagManger.registerTag({
        id: _PlayerStatsData_js__WEBPACK_IMPORTED_MODULE_2__.PlayerStatsTagIDs.header,
        type: "header",
        numberType: "16ui",
    });
    playerStatesTagManger.registerTag({
        id: _PlayerStatsData_js__WEBPACK_IMPORTED_MODULE_2__.PlayerStatsTagIDs.level,
        type: "typed-number",
        numberType: "16ui",
    });
    playerStatesTagManger.registerTag({
        id: _PlayerStatsData_js__WEBPACK_IMPORTED_MODULE_2__.PlayerStatsTagIDs.exp,
        type: "typed-number",
        numberType: "16ui",
    });
    playerStatesTagManger.registerTag({
        id: _PlayerStatsData_js__WEBPACK_IMPORTED_MODULE_2__.PlayerStatsTagIDs.currentMana,
        type: "typed-number",
        numberType: "16ui",
    });
    playerStatesTagManger.registerTag({
        id: _PlayerStatsData_js__WEBPACK_IMPORTED_MODULE_2__.PlayerStatsTagIDs.maxMana,
        type: "typed-number",
        numberType: "16ui",
    });
    playerStatesTagManger.registerTag({
        id: _PlayerStatsData_js__WEBPACK_IMPORTED_MODULE_2__.PlayerStatsTagIDs.currentEnergy,
        type: "typed-number",
        numberType: "16ui",
    });
    playerStatesTagManger.registerTag({
        id: _PlayerStatsData_js__WEBPACK_IMPORTED_MODULE_2__.PlayerStatsTagIDs.maxEnegery,
        type: "typed-number",
        numberType: "16ui",
    });
    playerStatesTagManger.registerTag({
        id: _PlayerStatsData_js__WEBPACK_IMPORTED_MODULE_2__.PlayerStatsTagIDs.speed,
        type: "typed-number",
        numberType: "16ui",
    });
    playerStatesTagManger.registerTag({
        id: _PlayerStatsData_js__WEBPACK_IMPORTED_MODULE_2__.PlayerStatsTagIDs.jumpPower,
        type: "typed-number",
        numberType: "16ui",
    });
    playerStatesTagManger.registerTag({
        id: _PlayerStatsData_js__WEBPACK_IMPORTED_MODULE_2__.PlayerStatsTagIDs.intuition,
        type: "typed-number",
        numberType: "16ui",
    });
    playerStatesTagManger.$INIT({ indexBufferMode: "shared" });
    return {
        playerPhysicsTagManager,
        playerStatesTagManger,
    };
}


/***/ })

}]);
//# sourceMappingURL=DSLIBS_dvePlugIns_Player_dist_Data_PlayerManager_js-DSLIBS_dvePlugIns_Player_dist_Data_Regist-d31b5c.DVE.js.map