/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./compiled/client/World/Actions/RegisterActions.js":
/*!**********************************************************!*\
  !*** ./compiled/client/World/Actions/RegisterActions.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RegisterActions": () => (/* binding */ RegisterActions)
/* harmony export */ });
/* harmony import */ var divine_voxel_engine_World__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-voxel-engine/World */ "../../DSLIBS/divineVoxelEngine/dist/World/index.js");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Player */ "./compiled/client/World/Player.js");


function RegisterActions() {
    const physicsData = _Player__WEBPACK_IMPORTED_MODULE_1__.DVEWorldPlayer.manager.physics;
    const dataTool = divine_voxel_engine_World__WEBPACK_IMPORTED_MODULE_0__.DVEW.getDataTool();
    const brush = divine_voxel_engine_World__WEBPACK_IMPORTED_MODULE_0__.DVEW.getBrush();
    divine_voxel_engine_World__WEBPACK_IMPORTED_MODULE_0__.DVEW.TC.registerTasks("place", async (data) => {
        const [x, y, z] = physicsData.pick.getPlacePosition();
        if (Math.abs(x) == Infinity)
            return;
        if (!dataTool.loadInAt(x, y, z))
            return;
        if (dataTool.isRenderable())
            return;
        await brush.setId(data).setXYZ(x, y, z).paintAndAwaitUpdate();
        divine_voxel_engine_World__WEBPACK_IMPORTED_MODULE_0__.DVEW.parentComm.runTasks("play-sound", ["voxel-place", data, x, y, z]);
        const raw = brush.getRaw();
    });
    divine_voxel_engine_World__WEBPACK_IMPORTED_MODULE_0__.DVEW.TC.registerTasks("break", async () => {
        const [x, y, z] = physicsData.pick.position.getAsArray();
        if (Math.abs(x) == Infinity)
            return;
        if (!dataTool.loadInAt(x, y, z))
            return;
        if (dataTool.isRenderable()) {
            const id = dataTool.getStringId();
            divine_voxel_engine_World__WEBPACK_IMPORTED_MODULE_0__.DVEW.parentComm.runTasks("play-sound", ["voxel-break", id, x, y, z]);
            await brush.setXYZ(x, y, z).eraseAndAwaitUpdate();
        }
    });
}


/***/ }),

/***/ "./compiled/client/World/Gen/Generate.js":
/*!***********************************************!*\
  !*** ./compiled/client/World/Gen/Generate.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GenerateWorld": () => (/* binding */ GenerateWorld)
/* harmony export */ });
/* harmony import */ var divine_voxel_engine_World__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-voxel-engine/World */ "../../DSLIBS/divineVoxelEngine/dist/World/index.js");
/* harmony import */ var _WorldGen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WorldGen */ "./compiled/client/World/Gen/WorldGen.js");


async function GenerateWorld() {
    const numChunks = 2;
    let startX = -16 * numChunks;
    let startZ = -16 * numChunks;
    let endX = 16 * numChunks;
    let endZ = 16 * numChunks;
    const builder = divine_voxel_engine_World__WEBPACK_IMPORTED_MODULE_0__.DVEW.getBuilder();
    const tasks = divine_voxel_engine_World__WEBPACK_IMPORTED_MODULE_0__.DVEW.getTasksTool();
    tasks.setFocalPoint(["main", 0, 0, 0]);
    for (let x = startX; x < endX; x += 16) {
        for (let z = startZ; z < endZ; z += 16) {
            _WorldGen__WEBPACK_IMPORTED_MODULE_1__.WorldGen.generateWorldColumn(x, z);
            tasks.worldSun.queued.add(["main", x, 0, z]);
        }
    }
    await tasks.worldSun.queued.runAndAwait();
    for (let x = startX; x < endX; x += 16) {
        for (let z = startZ; z < endZ; z += 16) {
            builder.setXZ(x, z).buildColumn();
        }
    }
}


/***/ }),

/***/ "./compiled/client/World/Gen/WorldGen.js":
/*!***********************************************!*\
  !*** ./compiled/client/World/Gen/WorldGen.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WorldGen": () => (/* binding */ WorldGen)
/* harmony export */ });
/* harmony import */ var divine_voxel_engine_World__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-voxel-engine/World */ "../../DSLIBS/divineVoxelEngine/dist/World/index.js");

const brush = divine_voxel_engine_World__WEBPACK_IMPORTED_MODULE_0__.DVEW.getBrush();
const WorldGen = {
    chunkDepth: 16,
    chunkWidth: 16,
    worldHeight: 256,
    minY: 60,
    generateHoleChunk(chunkX, chunkZ) {
        let rx = 0;
        for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
            let rz = 0;
            for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
                for (let y = 0; y < this.worldHeight; y++) {
                    if (rx == 0 || rz == 0 || rx == 15 || rz == 15) {
                        if (y > this.minY)
                            break;
                        if (y == this.minY) {
                            brush.setId("dve_dream_stone").setXYZ(x, y, z).paint();
                            if (Math.random() > 0.8) {
                                brush
                                    .setId("dve_dream_grass")
                                    .setXYZ(x, y + 1, z)
                                    .paint();
                            }
                        }
                    }
                    if (rx == 1 || rz == 1 || rx == 14 || rz == 14) {
                        if (y == this.minY - 1) {
                            brush.setId("dve_dream_stone").setXYZ(x, y, z).paint();
                            if (Math.random() > 0.8) {
                                brush
                                    .setId("dve_dream_grass")
                                    .setXYZ(x, y + 1, z)
                                    .paint();
                            }
                        }
                    }
                    if (rx == 2 || rz == 2 || rx == 13 || rz == 13) {
                        if (y == this.minY - 2) {
                            brush.setId("dve_dream_stone").setXYZ(x, y, z).paint();
                            if (Math.random() > 0.8) {
                                brush
                                    .setId("dve_dream_grass")
                                    .setXYZ(x, y + 1, z)
                                    .paint();
                            }
                        }
                    }
                    if (rx == 3 || rz == 3 || rx == 12 || rz == 12) {
                        if (y == this.minY - 3) {
                            brush.setId("dve_dream_stone").setXYZ(x, y, z).paint();
                            if (Math.random() > 0.8) {
                                brush
                                    .setId("dve_dream_grass")
                                    .setXYZ(x, y + 1, z)
                                    .paint();
                            }
                        }
                    }
                    if (rx == 4 || rz == 4 || rx == 11 || rz == 11) {
                        if (y == this.minY - 4) {
                            brush.setId("dve_dream_stone").setXYZ(x, y, z).paint();
                            if (Math.random() > 0.8) {
                                brush
                                    .setId("dve_dream_grass")
                                    .setXYZ(x, y + 1, z)
                                    .paint();
                            }
                        }
                    }
                    if (rx == 5 || rz == 5 || rx == 10 || rz == 10) {
                        if (y == this.minY - 5) {
                            brush.setId("dve_dream_stone").setXYZ(x, y, z).paint();
                            if (Math.random() > 0.8) {
                                brush
                                    .setId("dve_dream_grass")
                                    .setXYZ(x, y + 1, z)
                                    .paint();
                            }
                        }
                    }
                    if (rx == 6 || rz == 6 || rx == 9 || rz == 9) {
                        if (y == this.minY - 6) {
                            brush.setId("dve_dream_stone").setXYZ(x, y, z).paint();
                            if (Math.random() > 0.8) {
                                brush
                                    .setId("dve_dream_grass")
                                    .setXYZ(x, y + 1, z)
                                    .paint();
                            }
                        }
                    }
                    if (y < this.minY - 7) {
                        brush.setId("dve_dream_stone").setXYZ(x, y, z).paint();
                        if (Math.random() > 0.8) {
                            brush
                                .setId("dve_dream_grass")
                                .setXYZ(x, y + 1, z)
                                .paint();
                        }
                    }
                }
                rz++;
            }
            rx++;
        }
    },
    generatePondChunk(chunkX, chunkZ) {
        for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
            for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
                for (let y = 0; y < this.worldHeight; y++) {
                    brush.setXYZ(x, y, z);
                    if (y > this.minY + 1)
                        break;
                    if (x == chunkX ||
                        z == chunkZ ||
                        x == chunkX + this.chunkWidth - 1 ||
                        z == chunkZ + this.chunkDepth - 1) {
                        brush.setId("dve_dream_stone").paint();
                        continue;
                    }
                    if (y < this.minY - 10) {
                        brush.setId("dve_dream_stone").paint();
                    }
                    if (y >= this.minY - 10 && y <= this.minY) {
                        brush.setId("dve_liquid_dream_ether").paint();
                    }
                }
            }
        }
    },
    generateNormalChunk(chunkX, chunkZ) {
        for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
            for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
                for (let y = 0; y < this.worldHeight; y++) {
                    if (y > this.minY + 1)
                        break;
                    if (y <= this.minY) {
                        brush.setId("dve_dream_stone").setXYZ(x, y, z).paint();
                    }
                    if (y == this.minY + 1) {
                        if (Math.random() > 0.8) {
                            brush.setId("dve_dream_grass").setXYZ(x, y, z).paint();
                        }
                    }
                }
            }
        }
    },
    //1376271
    generateRoofChunk(chunkX, chunkZ) {
        for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
            for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
                for (let y = 0; y < this.minY + 10; y++) {
                    brush.setXYZ(x, y, z);
                    if (y < this.minY - 3) {
                        brush.setId("dve_dream_stone").paint();
                    }
                    if (y == this.minY - 3 && Math.random() > 0.8) {
                        brush.setId("dve_dream_grass").paint();
                    }
                    if (y == this.minY) {
                        brush.setId("dve_dream_stone_pillar").paint();
                    }
                }
            }
        }
    },
    generateBoxChunk(chunkX, chunkZ) {
        for (let x = chunkX; x < this.chunkWidth + chunkX; x++) {
            for (let z = chunkZ; z < this.chunkDepth + chunkZ; z++) {
                for (let y = 0; y < this.minY + 10; y++) {
                    brush.setXYZ(x, y, z);
                    if (y < this.minY - 3) {
                        brush.setId("dve_dream_stone").paint();
                    }
                    if (y == this.minY - 3 && Math.random() > 0.8) {
                        brush.setId("dve_dream_grass").paint();
                    }
                    if (y == this.minY) {
                        brush.setId("dve_dream_stone_pillar").paint();
                    }
                    if (y == this.minY + 5) {
                        brush.setId("dve_dream_stone_pillar").paint();
                    }
                    if (y >= this.minY &&
                        y <= this.minY + 5 &&
                        (x == chunkX || x == chunkX + 15 || z == chunkZ || z == chunkZ + 15)) {
                        brush.setId("dve_dream_stone_pillar").paint();
                    }
                }
            }
        }
    },
    generateWorldColumn(chunkX, chunkZ) {
        brush.start();
        let toss = Math.random();
        if ((chunkX == 0 && chunkZ == 0) ||
            (chunkX == 0 && chunkZ == -16) ||
            (chunkX == -16 && chunkZ == -0) ||
            (chunkX == -16 && chunkZ == -16)) {
            this.generateRoofChunk(chunkX, chunkZ);
            return;
        }
        //   return this.generatePondChunk(chunkX, chunkZ);
        if (toss < 0.3) {
            this.generateBoxChunk(chunkX, chunkZ);
            return;
        }
        if (toss > 0.6) {
            this.generateHoleChunk(chunkX, chunkZ);
            return;
        }
        let toss2 = Math.random() > 0.5;
        if (toss2)
            this.generateNormalChunk(chunkX, chunkZ);
        if (!toss2)
            this.generatePondChunk(chunkX, chunkZ);
        brush.stop();
    },
};


/***/ }),

/***/ "./compiled/client/World/Player.js":
/*!*****************************************!*\
  !*** ./compiled/client/World/Player.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DVEWorldPlayer": () => (/* binding */ DVEWorldPlayer)
/* harmony export */ });
const DVEWorldPlayer = {
    player: {},
    dimension: "main",
    manager: {},
    $INIT(player) {
        this.manager = player.manager;
        this.player = player;
    },
};


/***/ }),

/***/ "./compiled/client/World/Session/Session.js":
/*!**************************************************!*\
  !*** ./compiled/client/World/Session/Session.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameSession": () => (/* binding */ GameSession)
/* harmony export */ });
/* harmony import */ var simloop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! simloop */ "./node_modules/simloop/index.js");
/* harmony import */ var divine_voxel_engine_World__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! divine-voxel-engine/World */ "../../DSLIBS/divineVoxelEngine/dist/World/index.js");
/* harmony import */ var _Gen_Generate_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Gen/Generate.js */ "./compiled/client/World/Gen/Generate.js");



const GameSession = {
    player: {},
    async preLoad() {
        await (0,_Gen_Generate_js__WEBPACK_IMPORTED_MODULE_2__.GenerateWorld)();
    },
    startSession() {
        divine_voxel_engine_World__WEBPACK_IMPORTED_MODULE_1__.DVEW.nexusComm.runTasks("start-world", [0, 70, 0]);
        simloop__WEBPACK_IMPORTED_MODULE_0__.SimulationLoop.registerInterval(0);
        simloop__WEBPACK_IMPORTED_MODULE_0__.SimulationLoop.addToInterval(0, () => {
            this.player.update();
        });
        simloop__WEBPACK_IMPORTED_MODULE_0__.SimulationLoop.run();
    },
    endSession() { },
};


/***/ }),

/***/ "./compiled/client/World/State/WorldEvent.js":
/*!***************************************************!*\
  !*** ./compiled/client/World/State/WorldEvent.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RegisterWorldEvents": () => (/* binding */ RegisterWorldEvents)
/* harmony export */ });
/* harmony import */ var _WorldState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WorldState */ "./compiled/client/World/State/WorldState.js");
/* harmony import */ var divine_voxel_engine_World__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! divine-voxel-engine/World */ "../../DSLIBS/divineVoxelEngine/dist/World/index.js");
/* harmony import */ var _core_data_shared_Functions_RegisterVoxelData_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/data/shared/Functions/RegisterVoxelData.js */ "./compiled/core/data/shared/Functions/RegisterVoxelData.js");
/* harmony import */ var dve_plugins_player_World__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dve-plugins-player/World */ "../../DSLIBS/dvePlugIns/Player/dist/World/index.js");
/* harmony import */ var simloop__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! simloop */ "./node_modules/simloop/index.js");
/* harmony import */ var _Session_Session_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Session/Session.js */ "./compiled/client/World/Session/Session.js");
/* harmony import */ var _Player_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Player.js */ "./compiled/client/World/Player.js");
/* harmony import */ var _Actions_RegisterActions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Actions/RegisterActions */ "./compiled/client/World/Actions/RegisterActions.js");



//import { $INITWorldPlayer } from "./Player/WorldPlayer.js";





function RegisterWorldEvents() {
    _WorldState__WEBPACK_IMPORTED_MODULE_0__.WORLD_SM.addToStates({
        INIT: {
            LOAD: async () => {
                divine_voxel_engine_World__WEBPACK_IMPORTED_MODULE_1__.DVEW.TC.registerTasks("start-world", (data, onDone) => {
                    if (!onDone)
                        return;
                    _WorldState__WEBPACK_IMPORTED_MODULE_0__.WORLD_SM.triggerEvent("IDLE", "LOAD_SAVE", {
                        save: data,
                        onDone: () => {
                            onDone();
                        },
                    });
                }, "deferred");
                divine_voxel_engine_World__WEBPACK_IMPORTED_MODULE_1__.DVEW.TC.registerTasks("end-world", () => {
                    _Session_Session_js__WEBPACK_IMPORTED_MODULE_5__.GameSession.endSession();
                });
                (0,_core_data_shared_Functions_RegisterVoxelData_js__WEBPACK_IMPORTED_MODULE_2__.RegisterVoxelData)(divine_voxel_engine_World__WEBPACK_IMPORTED_MODULE_1__.DVEW);
                await divine_voxel_engine_World__WEBPACK_IMPORTED_MODULE_1__.DVEW.$INIT();
                await simloop__WEBPACK_IMPORTED_MODULE_4__.SimulationLoop.$INIT(20);
                const worldPlayer = await (0,dve_plugins_player_World__WEBPACK_IMPORTED_MODULE_3__.INIT_WORLD_PLAYER)(divine_voxel_engine_World__WEBPACK_IMPORTED_MODULE_1__.DVEW);
                _Player_js__WEBPACK_IMPORTED_MODULE_6__.DVEWorldPlayer.$INIT(worldPlayer);
                _Session_Session_js__WEBPACK_IMPORTED_MODULE_5__.GameSession.player = worldPlayer;
                (0,_Actions_RegisterActions__WEBPACK_IMPORTED_MODULE_7__.RegisterActions)();
                _WorldState__WEBPACK_IMPORTED_MODULE_0__.WORLD_SM.triggerEvent("INIT", "DONE");
            },
        },
    })
        .addToStates({
        IDLE: {
            LOAD_SAVE: async (args) => {
                _WorldState__WEBPACK_IMPORTED_MODULE_0__.WORLD_SM.triggerEvent("IN_WORLD", "LOADING", args);
            },
        },
    })
        .addToStates({
        IN_WORLD: {
            LOADING: async (args) => {
                await _Session_Session_js__WEBPACK_IMPORTED_MODULE_5__.GameSession.preLoad();
                args.onDone();
                _WorldState__WEBPACK_IMPORTED_MODULE_0__.WORLD_SM.triggerEvent("IN_WORLD", "START");
            },
        },
    })
        .addToStates({
        IN_WORLD: {
            START: (args) => {
                _Session_Session_js__WEBPACK_IMPORTED_MODULE_5__.GameSession.startSession();
            },
        },
    });
}
self.session = _Session_Session_js__WEBPACK_IMPORTED_MODULE_5__.GameSession;


/***/ }),

/***/ "./compiled/client/World/State/WorldState.js":
/*!***************************************************!*\
  !*** ./compiled/client/World/State/WorldState.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WORLD_SM": () => (/* binding */ WORLD_SM)
/* harmony export */ });
/* harmony import */ var _DSLIBS_crystallineState_dist__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../DSLIBS/crystallineState/dist */ "../../DSLIBS/crystallineState/dist/index.js");
/* harmony import */ var _WorldEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WorldEvent */ "./compiled/client/World/State/WorldEvent.js");


const WORLD_SM = (0,_DSLIBS_crystallineState_dist__WEBPACK_IMPORTED_MODULE_0__.CreateMachine)({
    INIT: {
        LOAD: {
            goTo: "INIT",
        },
        DONE: {
            goTo: "IDLE",
        },
    },
    IDLE: {
        LOAD_SAVE: {
            args: { save: "", onDone: () => { } },
            goTo: "IN_WORLD",
        },
    },
    IN_WORLD: {
        PAUSE: {
            goTo: "IN_WORLD",
        },
        EXIT: {
            goTo: "IDLE",
        },
        LOADING: {
            args: { save: "", onDone: () => { } },
            goTo: "IN_WORLD",
        },
        START: {
            goTo: "INIT",
        },
    },
});
WORLD_SM.activeState = "INIT";
(0,_WorldEvent__WEBPACK_IMPORTED_MODULE_1__.RegisterWorldEvents)();


/***/ }),

/***/ "./compiled/client/World/world.js":
/*!****************************************!*\
  !*** ./compiled/client/World/world.js ***!
  \****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _State_WorldState_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./State/WorldState.js */ "./compiled/client/World/State/WorldState.js");

await _State_WorldState_js__WEBPACK_IMPORTED_MODULE_0__.WORLD_SM.triggerEvent("INIT", "LOAD");

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ }),

/***/ "./compiled/core/data/shared/Functions/RegisterVoxelData.js":
/*!******************************************************************!*\
  !*** ./compiled/core/data/shared/Functions/RegisterVoxelData.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RegisterVoxelData": () => (/* binding */ RegisterVoxelData)
/* harmony export */ });
function RegisterVoxelData(DVEW) {
    DVEW.dataRegister.voxels.registerData([
        //util
        {
            id: "dve_debug_box",
            tags: [
                ["#dve_substance", "#dve_solid"],
                ["#dve_shape_id", "#dve_box"],
                ["#dve_is_light_source", true],
                ["#dve_light_value", [15, 15, 15]],
                ["#dve_collider_id", "#dve_box"],
                ["#dve_check_collisions", true],
                ["#dve_material", "stone"],
            ],
        },
        {
            id: "dve_light_debug",
            tags: [
                ["#dve_substance", "#dve_solid"],
                ["#dve_shape_id", "#dve_box"],
                ["#dve_collider_id", "#dve_box"],
                ["#dve_check_collisions", true],
                ["#dve_material", "stone"],
            ],
        },
        {
            id: "dve_data_holder",
            tags: [
                ["#dve_substance", "#dve_solid"],
                ["#dve_shape_id", "#dve_box"],
                ["#dve_collider_id", "#dve_box"],
                ["#dve_check_collisions", true],
                ["#dve_is_rich", true],
                ["#dve_material", "stone"],
            ],
        },
        {
            id: "dve_marker_box",
            states: 15,
            tags: [
                ["#dve_substance", "#dve_solid"],
                ["#dve_shape_id", "#dve_box"],
                ["#dve_collider_id", "#dve_box"],
                ["#dve_check_collisions", true],
                ["#dve_material", "stone"],
            ],
        },
        //dream
        {
            id: "dve_dream_stone",
            states: 1,
            tags: [
                ["#dve_substance", "#dve_solid"],
                ["#dve_shape_id", "#dve_box"],
                ["#dve_collider_id", "#dve_box"],
                ["#dve_check_collisions", true],
                ["#dve_material", "grassy-stone"],
            ],
        },
        {
            id: "dve_dream_stone_pillar",
            tags: [
                ["#dve_substance", "#dve_solid"],
                ["#dve_shape_id", "#dve_box"],
                ["#dve_collider_id", "#dve_box"],
                ["#dve_check_collisions", true],
                ["#dve_material", "stone"],
            ],
        },
        {
            id: "dve_dream_grass_block",
            tags: [
                ["#dve_substance", "#dve_flora"],
                ["#dve_shape_id", "#dve_box"],
                ["#dve_collider_id", "#dve_box"],
                ["#dve_check_collisions", true],
                ["#dve_material", "stone"],
            ],
        },
        {
            id: "dve_dream_lamp",
            tags: [
                ["#dve_substance", "#dve_solid"],
                ["#dve_shape_id", "#dve_box"],
                ["#dve_is_light_source", true],
                ["#dve_light_value", [15, 0, 15]],
                ["#dve_collider_id", "#dve_box"],
                ["#dve_check_collisions", true],
                ["#dve_material", "stone"],
            ],
        },
        {
            id: "dve_dream_stone_slab",
            tags: [
                ["#dve_substance", "#dve_solid"],
                ["#dve_shape_id", "#dve_halfbox"],
                ["#dve_collider_id", "#dve_box"],
                ["#dve_check_collisions", true],
                ["#dve_material", "grassy-stone"],
            ],
        },
        {
            id: "dve_dream_log",
            tags: [
                ["#dve_substance", "#dve_solid"],
                ["#dve_shape_id", "#dve_box"],
                ["#dve_collider_id", "#dve_box"],
                ["#dve_check_collisions", true],
                ["#dve_material", "wood"],
            ],
        },
        {
            id: "dve_dream_stone_stair",
            tags: [
                ["#dve_substance", "#dve_transparent"],
                ["#dve_shape_id", "#dve_stair"],
                ["#dve_collider_id", "#dve_stair"],
                ["#dve_check_collisions", true],
                ["#dve_material", "stone"],
            ],
        },
        {
            id: "dve_dream_grass",
            tags: [
                ["#dve_substance", "#dve_flora"],
                ["#dve_shape_id", "#dve_crossed_panels"],
                ["#dve_check_collisions", false],
                ["#dve_material", "grass"],
            ],
        },
        {
            id: "dve_dream_vine",
            tags: [
                ["#dve_substance", "#dve_flora"],
                ["#dve_shape_id", "#dve_panel"],
                ["#dve_check_collisions", false],
                ["#dve_material", "grass"],
            ],
        },
        {
            id: "dve_dream_leaves",
            tags: [
                ["#dve_substance", "#dve_flora"],
                ["#dve_shape_id", "#dve_box"],
                ["#dve_collider_id", "#dve_box"],
                ["#dve_check_collisions", true],
                ["#dve_material", "grass"],
            ],
        },
        {
            id: "dve_liquid_dream_ether",
            tags: [
                ["#dve_substance", "#dve_liquid"],
                ["#dve_shape_id", "#dve_liquid"],
                ["#dve_collider_id", "#dve_box"],
                ["#dve_check_collisions", true],
                ["#dve_material", "water"],
            ],
        },
        //dread
        {
            id: "dve_dread_stone",
            states: 1,
            tags: [
                ["#dve_substance", "#dve_solid"],
                ["#dve_shape_id", "#dve_box"],
                ["#dve_collider_id", "#dve_box"],
                ["#dve_check_collisions", true],
                ["#dve_material", "grassy-stone"],
            ],
        },
        {
            id: "dve_dread_grass_block",
            tags: [
                ["#dve_substance", "#dve_flora"],
                ["#dve_shape_id", "#dve_box"],
                ["#dve_collider_id", "#dve_box"],
                ["#dve_check_collisions", true],
                ["#dve_material", "stone"],
            ],
        },
        {
            id: "dve_dread_grass",
            tags: [
                ["#dve_substance", "#dve_translucent"],
                ["#dve_shape_id", "#dve_crossed_panels"],
                ["#dve_material", "grass"],
                ["#dve_collider_id", "#dve_climable_box"],
                ["#dve_check_collisions", true],
            ],
        },
        {
            id: "dve_dread_lamp",
            tags: [
                ["#dve_substance", "#dve_solid"],
                ["#dve_shape_id", "#dve_box"],
                ["#dve_is_light_source", true],
                ["#dve_light_value", [15, 0, 0]],
                ["#dve_collider_id", "#dve_box"],
                ["#dve_check_collisions", true],
                ["#dve_material", "stone"],
            ],
        },
        {
            id: "dve_dread_stone_pillar",
            tags: [
                ["#dve_substance", "#dve_solid"],
                ["#dve_shape_id", "#dve_box"],
                ["#dve_collider_id", "#dve_box"],
                ["#dve_check_collisions", true],
                ["#dve_material", "stone"],
            ],
        },
        {
            id: "dve_liquid_dread_ether",
            tags: [
                ["#dve_substance", "#dve_magma"],
                ["#dve_shape_id", "#dve_liquid"],
                ["#dve_collider_id", "#dve_box"],
                ["#dve_check_collisions", true],
                ["#dve_material", "water"],
                ["#dve_light_value", [15, 0, 0]],
                ["#dve_is_light_source", true],
            ],
        },
    ]);
}


/***/ }),

/***/ "perf_hooks":
/*!*****************************!*\
  !*** external "perf_hooks" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("perf_hooks");

/***/ }),

/***/ "../../DSLIBS/crystallineState/dist/StateMachine.js":
/*!**********************************************************!*\
  !*** ../../DSLIBS/crystallineState/dist/StateMachine.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StateMachine": () => (/* binding */ StateMachine)
/* harmony export */ });
class StateMachine {
    states;
    history = [];
    activeState;
    stateMachineData = {
        historyLength: 0,
        name: "sup",
    };
    stateData = {};
    constructor(states) {
        this.states = states;
        for (const state in states) {
            this.stateData[state] = {};
            const events = states[state];
            for (const eventKey in events) {
                this.stateData[state][eventKey] = {
                    nextState: events[eventKey].goTo,
                    procedures: [],
                };
            }
        }
    }
    isActiveState(state) {
        return this.activeState == state;
    }
    async triggerEvent(state, event, args) {
        if (!this.states[state]) {
            throw new Error(`The state ${String(state)} does not exist: machine- ${this.stateMachineData.name}.`);
        }
        if (!this.stateData[state][event]) {
            throw new Error(`The event ${String(event)} does not exist on the state ${String(state)}.: machine-> ${this.stateMachineData.name} data.`);
        }
        const procedures = this.stateData[state][event].procedures;
        for await (const procedure of procedures) {
            await procedure.func(args);
        }
        if (this.stateMachineData.historyLength > 0) {
            if (this.history.length > this.stateMachineData.historyLength) {
                this.history.shift();
            }
            this.history.push({
                previousState: this.activeState,
                newState: state,
                event: event,
            });
        }
        this.activeState = state;
        return this;
    }
    addToEvent(state, event, func, bind) {
        if (!this.stateData[state]) {
            throw new Error(`The state ${String(state)} does not exist: machine- ${this.stateMachineData.name}.`);
        }
        if (!this.stateData[state][event]) {
            throw new Error(`The event ${String(event)} does not exist on the state ${String(state)}.: machine-> ${this.stateMachineData.name} data.`);
        }
        this.stateData[state][event].procedures.push({
            bind: bind,
            func: func,
        });
        return this;
    }
    addToStates(data) {
        for (const state in data) {
            for (const event in data[state]) {
                this.addToEvent(state, event, data[state][event]);
            }
        }
        return this;
    }
}


/***/ }),

/***/ "../../DSLIBS/crystallineState/dist/StateProxy.js":
/*!********************************************************!*\
  !*** ../../DSLIBS/crystallineState/dist/StateProxy.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StateProxy": () => (/* binding */ StateProxy)
/* harmony export */ });
const StateProxy = {
    createProxy(obj) {
        const events = {};
        const handler1 = {
            get(target, prop, receiver) {
                if (events[prop]) {
                    events[prop]["get"].forEach((_) => _());
                }
                return Reflect.get(target, prop, receiver);
            },
            set(target, prop, newValue, receiver) {
                const oldValue = target[prop];
                target[prop] = newValue;
                if (events[prop]) {
                    events[prop]["set"].forEach((_) => _(newValue));
                    if (oldValue != newValue) {
                        events[prop]["change"].forEach((_) => _(oldValue, newValue));
                    }
                }
                return true;
            },
        };
        const update = (property, event, run) => {
            events[property] ??= {
                change: [],
                get: [],
                set: [],
            };
            events[property][event].push(run);
        };
        return [update, new Proxy(obj, handler1)];
    },
};


/***/ }),

/***/ "../../DSLIBS/crystallineState/dist/index.js":
/*!***************************************************!*\
  !*** ../../DSLIBS/crystallineState/dist/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateMachine": () => (/* binding */ CreateMachine),
/* harmony export */   "CreateState": () => (/* binding */ CreateState)
/* harmony export */ });
/* harmony import */ var _StateProxy_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StateProxy.js */ "../../DSLIBS/crystallineState/dist/StateProxy.js");
/* harmony import */ var _StateMachine_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StateMachine.js */ "../../DSLIBS/crystallineState/dist/StateMachine.js");


function CreateState(data) {
    return _StateProxy_js__WEBPACK_IMPORTED_MODULE_0__.StateProxy.createProxy(data);
}
function CreateMachine(stateMachineData) {
    return new _StateMachine_js__WEBPACK_IMPORTED_MODULE_1__.StateMachine(stateMachineData);
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Common/Queues/ConstructorQueues.js":
/*!******************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Common/Queues/ConstructorQueues.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConstructorQueues": () => (/* binding */ ConstructorQueues)
/* harmony export */ });
/* harmony import */ var _World_Threads_WorldThreads_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../World/Threads/WorldThreads.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Threads/WorldThreads.js");
/* harmony import */ var _Threads_Contracts_ConstructorTasks_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Threads/Contracts/ConstructorTasks.js */ "../../DSLIBS/divineVoxelEngine/dist/Common/Threads/Contracts/ConstructorTasks.js");
//objects


const QMBase = {
    $INIT() {
        this.addQueue("main");
    },
    _queueMap: new Map(),
    addQueue(queueKey) {
        if (this._queueMap.has(queueKey)) {
            this._queueMap.set(queueKey, Date.now());
            return false;
        }
        this.worldSun.addQueue(queueKey);
        this.propagation.addQueue(queueKey);
        this.build.chunk.addQueue(queueKey);
        this.generate.addQueue(queueKey);
        this.decorate.addQueue(queueKey);
        this._queueMap.set(queueKey, Date.now());
        return true;
    },
    removeQueue(queueKey) {
        if (!this._queueMap.has(queueKey))
            return false;
        this.worldSun.removeQueue(queueKey);
        this.propagation.addQueue(queueKey);
        this.build.chunk.addQueue(queueKey);
        this.generate.removeQueue(queueKey);
        this.decorate.addQueue(queueKey);
        this._queueMap.delete(queueKey);
        return true;
    },
    /**# Filter Queues
     * ---
     * Go through each current queue. IF the passed fucntion returns false it will remove that queue.
     * @param filter
     */
    filterQueues(filter) {
        this._queueMap.forEach((v, key) => {
            if (!filter(key)) {
                this.removeQueue(key);
            }
        });
    },
    /**# Filter Old Queues
     * ---
     * Will remove queues older then 10 minutes.
     * @param maxTime Max time in miliseconds.
     */
    filterOldQueues(maxTime = 600000) {
        const t = Date.now();
        this._queueMap.forEach((v, key) => {
            if (t - v > maxTime) {
                this.removeQueue(key);
            }
        });
    },
    worldSun: _World_Threads_WorldThreads_js__WEBPACK_IMPORTED_MODULE_0__.CCM.addQueue("world-sun", _Threads_Contracts_ConstructorTasks_js__WEBPACK_IMPORTED_MODULE_1__.ConstructorTasks.worldSun),
    propagation: _World_Threads_WorldThreads_js__WEBPACK_IMPORTED_MODULE_0__.CCM.addQueue("propagation", _Threads_Contracts_ConstructorTasks_js__WEBPACK_IMPORTED_MODULE_1__.ConstructorTasks.analyzerPropagation),
    build: {
        chunk: _World_Threads_WorldThreads_js__WEBPACK_IMPORTED_MODULE_0__.CCM.addQueue("build-chunk", _Threads_Contracts_ConstructorTasks_js__WEBPACK_IMPORTED_MODULE_1__.ConstructorTasks.buildChunk),
    },
    generate: _World_Threads_WorldThreads_js__WEBPACK_IMPORTED_MODULE_0__.CCM.addQueue("generatek", _Threads_Contracts_ConstructorTasks_js__WEBPACK_IMPORTED_MODULE_1__.ConstructorTasks.generate),
    decorate: _World_Threads_WorldThreads_js__WEBPACK_IMPORTED_MODULE_0__.CCM.addQueue("decorate", _Threads_Contracts_ConstructorTasks_js__WEBPACK_IMPORTED_MODULE_1__.ConstructorTasks.decorate),
};
const ConstructorQueues = QMBase;


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Common/Tasks/ConstructorTasks.js":
/*!****************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Common/Tasks/ConstructorTasks.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConstructorTasks": () => (/* binding */ ConstructorTasks)
/* harmony export */ });
/* harmony import */ var _Threads_Contracts_ConstructorRemoteThreadTasks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Threads/Contracts/ConstructorRemoteThreadTasks.js */ "../../DSLIBS/divineVoxelEngine/dist/Common/Threads/Contracts/ConstructorRemoteThreadTasks.js");
/* harmony import */ var threadcomm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! threadcomm */ "../../DSLIBS/threadComm/dist/index.js");
/* harmony import */ var _Tools_Tasks_TasksTool_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Tools/Tasks/TasksTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Tasks/TasksTool.js");



const tasks = new _Tools_Tasks_TasksTool_js__WEBPACK_IMPORTED_MODULE_2__.TaskTool();
const ConstructorTasks = {
    buildChunk: threadcomm__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.registerTasks(_Threads_Contracts_ConstructorRemoteThreadTasks_js__WEBPACK_IMPORTED_MODULE_0__.ConstructorRemoteThreadTasks.buildChunk, (data) => {
        tasks.setPriority(data.priority);
        tasks.build.chunk.deferred.run(data.data, () => { });
    }),
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Common/Threads/Contracts/ConstructorRemoteThreadTasks.js":
/*!****************************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Common/Threads/Contracts/ConstructorRemoteThreadTasks.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConstructorRemoteThreadTasks": () => (/* binding */ ConstructorRemoteThreadTasks)
/* harmony export */ });
const ConstructorRemoteThreadTasks = {
    syncShapeMap: -1,
    addToRebuildQue: 0,
    runRebuildQue: 1,
    addToRGBLightUpdateQue: 2,
    buildChunk: 3
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Common/Threads/Contracts/ConstructorTasks.js":
/*!****************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Common/Threads/Contracts/ConstructorTasks.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConstructorTasks": () => (/* binding */ ConstructorTasks)
/* harmony export */ });
const ConstructorTasks = {
    buildChunk: 0,
    buildColumn: 0,
    generate: 0,
    decorate: 0,
    RGBlightUpdate: 0,
    RGBlightRemove: 0,
    worldSun: 0,
    sunLightUpdate: 0,
    sunLightRemove: 0,
    analyzerPropagation: 0,
    analyzerUpdate: 0,
    flowUpdate: 0,
    flowRemove: 0,
    constructEntity: 0,
    constructItem: 0,
    explosion: 0,
    voxelErease: 0,
    voxelPaint: 0,
    voxelUpdate: 0,
};
let index = 0;
for (const key of Object.keys(ConstructorTasks)) {
    ConstructorTasks[key] = index;
    index++;
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Data/Constants/DataHeaders.js":
/*!*************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Data/Constants/DataHeaders.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DVEMessageHeader": () => (/* binding */ DVEMessageHeader),
/* harmony export */   "WorldDataHeaders": () => (/* binding */ WorldDataHeaders)
/* harmony export */ });
const DVEMessageHeader = 0xffff;
const WorldDataHeaders = {
    region: 0,
    column: 1,
    chunk: 2,
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Global/Util/UtilMap.js":
/*!******************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Global/Util/UtilMap.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UtilMap": () => (/* binding */ UtilMap)
/* harmony export */ });
class UtilMap {
    _map = new Map();
    constructor(data) {
        if (data)
            this.add(data);
    }
    set(id, value) {
        this._map.set(id, value);
    }
    get(id) {
        if (!this._map.has(id))
            return undefined;
        return this._map.get(id);
    }
    add(data) {
        data.forEach(([id, value]) => this._map.set(id, value));
    }
    has(id) {
        return this._map.has(id);
    }
    remove(id) {
        this._map.delete(id);
    }
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Tools/Brush/AdvancedBrushTool.js":
/*!****************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Tools/Brush/AdvancedBrushTool.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GetAdvancedBrushTool": () => (/* binding */ GetAdvancedBrushTool)
/* harmony export */ });
/* harmony import */ var _Global_Util_helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Global/Util.helper.js */ "../../DSLIBS/divineVoxelEngine/dist/Global/Util.helper.js");
/* harmony import */ var _Brush_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Brush.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Brush/Brush.js");
/* harmony import */ var _Tasks_TasksTool_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Tasks/TasksTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Tasks/TasksTool.js");
//util

//tools


const tasks = new _Tasks_TasksTool_js__WEBPACK_IMPORTED_MODULE_2__.TaskTool();
const GetAdvancedBrushTool = () => {
    let brush = _Global_Util_helper_js__WEBPACK_IMPORTED_MODULE_0__.Util.merge(new _Brush_js__WEBPACK_IMPORTED_MODULE_1__.BrushTool(), {
        mode: "async",
        setMode(mode) {
            this.mode = mode;
            return this;
        },
        paintAndAwaitUpdate() {
            const self = this;
            return new Promise((resolve) => {
                self.paintAndUpdate(() => {
                    resolve(true);
                });
            });
        },
        eraseAndAwaitUpdate() {
            const self = this;
            return new Promise((resolve) => {
                self.eraseAndUpdate(() => {
                    resolve(true);
                });
            });
        },
        paintAndUpdate(onDone) {
            tasks.setFocalPoint(brush.location);
            tasks.voxelUpdate.paint.run(brush.location, brush.getRaw(), () => {
                if (onDone)
                    onDone();
            }, this.mode);
        },
        eraseAndUpdate(onDone) {
            tasks.setFocalPoint(brush.location);
            tasks.voxelUpdate.erase.run(brush.location, () => {
                if (onDone)
                    onDone();
            }, this.mode);
        },
        update(onDone) {
            tasks.setFocalPoint(brush.location);
            tasks.voxelUpdate.update.run(brush.location, brush.getRaw(), () => {
                if (onDone)
                    onDone();
            }, this.mode);
        },
        updateAndAwait() {
            return new Promise((resolve) => {
                this.update(() => {
                    resolve(true);
                });
            });
        },
        explode(radius = 6, onDone) {
            tasks.setFocalPoint(brush.location);
            tasks.explosion.run(brush.location, radius, () => {
                if (onDone)
                    onDone();
            });
        },
        explodeAwaitUpdate(radius = 6) {
            return new Promise((resolve) => {
                this.explode(radius, () => {
                    resolve(true);
                });
            });
        },
    });
    return brush;
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Tools/Brush/Brush.js":
/*!****************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Tools/Brush/Brush.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BrushTool": () => (/* binding */ BrushTool)
/* harmony export */ });
/* harmony import */ var _Tools_Data_DataTool_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Tools/Data/DataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/DataTool.js");
/* harmony import */ var _Data_World_WorldPainter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Data/World/WorldPainter.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldPainter.js");
/* harmony import */ var _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Data/World/WorldRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldRegister.js");
/* harmony import */ var _Data_Voxel_VoxelPalette_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Data/Voxel/VoxelPalette.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Voxel/VoxelPalette.js");
/* harmony import */ var _Classes_LocationBoundTool_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Classes/LocationBoundTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Classes/LocationBoundTool.js");





class BrushTool extends _Classes_LocationBoundTool_js__WEBPACK_IMPORTED_MODULE_4__.LocationBoundTool {
    data = {
        id: "dve_air",
        state: 0,
        shapeState: 0,
        secondaryState: 0,
        secondaryVoxelId: "dve_air",
        level: 0,
        levelState: 0,
    };
    _update = true;
    _dt = new _Tools_Data_DataTool_js__WEBPACK_IMPORTED_MODULE_0__.DataTool();
    setData(data) {
        for (const key in data) {
            if (typeof data[key] !== undefined) {
                this.data[key] = data[key];
            }
        }
        return this;
    }
    setId(id, state = 0, shapeState = 0) {
        this.data.id = id;
        this.data.state = state;
        this.data.shapeState = shapeState;
        return this;
    }
    setDimension(dimensionId) {
        this.location[0] = dimensionId;
        this._dt.setDimension(dimensionId);
        return this;
    }
    setSecondaryId(id, state = 0) {
        this.data.secondaryVoxelId = id;
        this.data.secondaryState = state;
        return this;
    }
    setState(state) {
        this.data.state = state;
        return this;
    }
    setShapeState(state) {
        this.data.shapeState = state;
        return this;
    }
    setLevel(level) {
        this.data.level = level;
        return this;
    }
    setLevelState(levelState) {
        this.data.levelState = levelState;
        return this;
    }
    clear() {
        this.data.id = "dve_air";
        this.data.secondaryVoxelId = "dve_air";
        this.data.level = 0;
        this.data.levelState = 0;
        this.data.state = 0;
        this.data.secondaryState = 0;
        this.data.shapeState = 0;
        this.location[1] = 0;
        this.location[2] = 0;
        this.location[3] = 0;
    }
    setRaw(data) {
        this._dt.loadInRaw(data);
        this.data.id = this._dt.getStringId();
        this.data.shapeState = this._dt.getShapeState();
        this.data.state = this._dt.getState();
        this._dt.setSecondary(true);
        if (this._dt.data.secondaryId >= 2) {
            this.data.secondaryVoxelId = this._dt.getStringId();
            this.data.secondaryState = this._dt.getState();
        }
        this._dt.setSecondary(false);
        return this;
    }
    getRaw() {
        this._dt.setId(_Data_Voxel_VoxelPalette_js__WEBPACK_IMPORTED_MODULE_3__.VoxelPaletteReader.id.getPaletteId(this.data.id, this.data.state));
        this._dt
            .setSecondary(true)
            .setId(_Data_Voxel_VoxelPalette_js__WEBPACK_IMPORTED_MODULE_3__.VoxelPaletteReader.id.getPaletteId(this.data.secondaryVoxelId, this.data.secondaryState))
            .setSecondary(false);
        this._dt.setLevel(this.data.level);
        this._dt.setLevelState(this.data.levelState);
        this._dt.setShapeState(this.data.shapeState);
        this._dt.data.raw[3] == -1 ? (this._dt.data.raw[3] = 0) : false;
        return this._dt.data.raw;
    }
    getData() {
        return this.data;
    }
    paint() {
        _Data_World_WorldPainter_js__WEBPACK_IMPORTED_MODULE_1__.WorldPainter.paint.voxel(this.location, this.data, this._update);
        return this;
    }
    erase() {
        _Data_World_WorldPainter_js__WEBPACK_IMPORTED_MODULE_1__.WorldPainter.paint.erase(this.location);
        return this;
    }
    start() {
        _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_2__.WorldRegister.cache.enable();
        return this;
    }
    stop() {
        _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_2__.WorldRegister.cache.disable();
        return this;
    }
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Tools/Build/BuilderTool.js":
/*!**********************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Tools/Build/BuilderTool.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BuilderTool": () => (/* binding */ BuilderTool)
/* harmony export */ });
/* harmony import */ var _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Data/World/WorldRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldRegister.js");
/* harmony import */ var _Data_WorldData_ChunkDataTool_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Data/WorldData/ChunkDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/WorldData/ChunkDataTool.js");
/* harmony import */ var threadcomm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! threadcomm */ "../../DSLIBS/threadComm/dist/index.js");
/* harmony import */ var _Tools_Classes_LocationBoundTool_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Tools/Classes/LocationBoundTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Classes/LocationBoundTool.js");
/* harmony import */ var _Tools_Tasks_TasksTool_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Tools/Tasks/TasksTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Tasks/TasksTool.js");





const parentComm = threadcomm__WEBPACK_IMPORTED_MODULE_2__.ThreadComm.parent;
class BuilderTool extends _Tools_Classes_LocationBoundTool_js__WEBPACK_IMPORTED_MODULE_3__.LocationBoundTool {
    static _chunkTool = new _Data_WorldData_ChunkDataTool_js__WEBPACK_IMPORTED_MODULE_1__.ChunkDataTool();
    tasks = new _Tools_Tasks_TasksTool_js__WEBPACK_IMPORTED_MODULE_4__.TaskTool();
    data = {
        LOD: 1,
    };
    setLOD(lod) {
        this.data.LOD = lod;
        return this;
    }
    clearAll() {
        parentComm.runTasks("clear-all", []);
    }
    buildChunk(runQueue = false) {
        this.tasks.build.chunk.queued.add(this.location);
        if (runQueue)
            this.tasks.build.chunk.queued.run(() => { });
        return this;
    }
    buildColumn(onDone) {
        this.tasks.build.column.deferred.run(this.location, onDone ? onDone : (data) => { });
        return this;
    }
    removeColumn() {
        const column = _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_0__.WorldRegister.column.get(this.location);
        if (!column)
            return false;
        if (column.chunks.size == 0)
            return false;
        parentComm.runTasks("remove-column", this.location);
        return this;
    }
    fillColumn() {
        _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_0__.WorldRegister.column.fill(this.location);
        return this;
    }
    removeColumnsOutsideRadius(radius) {
        parentComm.runTasks("remove-column-outside-radius", [this.location, radius]);
    }
}



/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Tools/Loader/DataLoaderTool.js":
/*!**************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Tools/Loader/DataLoaderTool.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataLoaderTool": () => (/* binding */ DataLoaderTool)
/* harmony export */ });
/* harmony import */ var _Data_World_Region_RegionHeaderRegister_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Data/World/Region/RegionHeaderRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/Region/RegionHeaderRegister.js");
/* harmony import */ var threadcomm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! threadcomm */ "../../DSLIBS/threadComm/dist/index.js");
/* harmony import */ var _Data_WorldData_ColumnDataTool_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Data/WorldData/ColumnDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/WorldData/ColumnDataTool.js");
/* harmony import */ var _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Data/World/WorldRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldRegister.js");
/* harmony import */ var _Classes_LocationBoundTool_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Classes/LocationBoundTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Classes/LocationBoundTool.js");
/* harmony import */ var _Math_Functions_Distance3d_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Math/Functions/Distance3d.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Functions/Distance3d.js");
/* harmony import */ var _Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Data/Settings/EngineSettings.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Settings/EngineSettings.js");
/* harmony import */ var _Data_DataHooks_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../Data/DataHooks.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/DataHooks.js");
/* harmony import */ var _World_Lock_WorldLock_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../World/Lock/WorldLock.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Lock/WorldLock.js");
/* harmony import */ var _LoaderRegister_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./LoaderRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Loader/LoaderRegister.js");
/* harmony import */ var _Global_Util_SafeInterval_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../Global/Util/SafeInterval.js */ "../../DSLIBS/divineVoxelEngine/dist/Global/Util/SafeInterval.js");











class DataLoaderTool extends _Classes_LocationBoundTool_js__WEBPACK_IMPORTED_MODULE_4__.LocationBoundTool {
    static columnDataTool = new _Data_WorldData_ColumnDataTool_js__WEBPACK_IMPORTED_MODULE_2__.ColumnDataTool();
    static isEnabled() {
        const comm = threadcomm__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.getComm("data-loader");
        return Boolean(comm);
    }
    mode = "server";
    _enabled = true;
    dataComm;
    constructor() {
        super();
        const comm = threadcomm__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.getComm("data-loader");
        if (!comm) {
            this._enabled = false;
            console.error("Data Loader comm must be set.");
        }
        else {
            if (!comm.isPortSet()) {
                this._enabled = false;
                comm.onSetPort(() => (this._enabled = true));
            }
        }
        this.dataComm = comm;
        this.mode = _Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_6__.EngineSettings.settings.data.mode;
        _LoaderRegister_js__WEBPACK_IMPORTED_MODULE_9__.LoaderRegister.$INIT(this.dataComm);
        _Data_DataHooks_js__WEBPACK_IMPORTED_MODULE_7__.DataHooks.settingsSynced.addToRun((data) => {
            this.mode = data.data.mode;
        });
    }
    _runTask(id, location, onDone) {
        this.dataComm.runPromiseTasks(id, location, [], (data) => {
            onDone ? onDone(data) : false;
        });
    }
    isEnabled() {
        return this._enabled;
    }
    saveRegion(onDone) {
        const location = this.getLocation();
        this.dataComm.runPromiseTasks("save-region", location, [], () => onDone ? onDone() : false);
    }
    saveRegionAsync() {
        return new Promise((resolve) => {
            this.saveRegion(() => {
                resolve(true);
            });
        });
    }
    loadRegion(onDone) {
        const location = this.getLocation();
        this.dataComm.runPromiseTasks("load-region", location, [], () => onDone ? onDone() : false);
    }
    loadRegionAsync() {
        return new Promise((resolve) => {
            this.loadRegion(() => {
                resolve(true);
            });
        });
    }
    saveColumn(onDone) {
        const location = this.getLocation();
        this.dataComm.runPromiseTasks("save-column", location, [], () => onDone ? onDone() : false);
    }
    saveColumnIfNotStored(onDone) {
        const location = this.getLocation();
        if (!DataLoaderTool.columnDataTool.setLocation(location).loadIn())
            return onDone ? onDone(false) : false;
        if (DataLoaderTool.columnDataTool.isStored())
            return onDone ? onDone(false) : false;
        this.dataComm.runPromiseTasks("save-column", location, [], () => {
            if (onDone)
                onDone(true);
        });
        return true;
    }
    loadIfExists(onDone) {
        if (!this._enabled)
            return onDone ? onDone(true) : false;
        const location = [...this.getLocation()];
        this.columnExists((exists) => {
            if (exists) {
                this.setLocation(location).loadColumn(() => {
                    onDone ? onDone(true) : false;
                });
                return;
            }
            onDone ? onDone(false) : false;
        });
    }
    saveColumnAsync() {
        return new Promise((resolve) => {
            this.saveColumn(() => {
                resolve(true);
            });
        });
    }
    loadColumn(onDone) {
        _LoaderRegister_js__WEBPACK_IMPORTED_MODULE_9__.LoaderRegister.addToLoad(this.getLocation(), () => {
            onDone ? onDone(true) : false;
        });
    }
    loadColumnAsync() {
        return new Promise((resolve) => {
            this.loadColumn(() => {
                resolve(true);
            });
        });
    }
    unLoadColumn(onDone) {
        const location = this.getLocation();
        if (_World_Lock_WorldLock_js__WEBPACK_IMPORTED_MODULE_8__.WorldLock.isLocked(location) || !_Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_3__.WorldRegister.column.get(location))
            return onDone ? onDone(false) : false;
        this.dataComm.runPromiseTasks("unload-column", location, [], () => {
            onDone ? onDone(true) : false;
        });
    }
    columnExists(onDone) {
        const location = [...this.getLocation()];
        if (this.mode == "server") {
            if (!_Data_World_Region_RegionHeaderRegister_js__WEBPACK_IMPORTED_MODULE_0__.RegionHeaderRegister.get(location)) {
                this.loadRegionHeader(() => {
                    this.setLocation(location).columnExists(onDone);
                });
                return;
            }
            const exists = _Data_World_Region_RegionHeaderRegister_js__WEBPACK_IMPORTED_MODULE_0__.RegionHeaderRegister.isStored(location);
            onDone ? onDone(exists >= 1 ? true : false) : false;
            return;
        }
        this.dataComm.runPromiseTasks("column-exists", location, [], (data) => {
            onDone ? onDone(data) : false;
        });
    }
    loadRegionHeader(onDone) {
        const location = this.getLocation();
        this.dataComm.runPromiseTasks("load-region-header", location, [], (data) => {
            onDone ? onDone(data) : false;
        });
    }
    loadRegionHeaderAsync() {
        return new Promise((resolve) => {
            this.loadRegionHeader((anaswer) => {
                resolve(anaswer);
            });
        });
    }
    columnExistsAsync() {
        return new Promise((resolve) => {
            this.columnExists((anaswer) => {
                resolve(anaswer);
            });
        });
    }
    columnTimestamp(onDone) {
        const location = this.getLocation();
        this.dataComm.runPromiseTasks("column-timestamp", location, [], (data) => {
            onDone ? onDone(data) : false;
        });
    }
    columnTimestampAsync() {
        return new Promise((resolve) => {
            this.columnTimestamp((timeStamp) => {
                resolve(timeStamp);
            });
        });
    }
    unLoadAllOutsideRadius(radius, run = (columntool) => true, onDone) {
        const [dimension, sx, sy, sz] = this.location;
        const regions = _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_3__.WorldRegister.dimensions.get(dimension);
        if (!regions)
            return;
        let totalColumns = 0;
        for (const [key, region] of regions) {
            for (const [ckey, column] of region.columns) {
                DataLoaderTool.columnDataTool.setColumn(column);
                if (DataLoaderTool.columnDataTool.isPersistent())
                    continue;
                const [dimension, cx, cy, cz] = DataLoaderTool.columnDataTool.getLocationData();
                if (!run(DataLoaderTool.columnDataTool))
                    continue;
                const d = (0,_Math_Functions_Distance3d_js__WEBPACK_IMPORTED_MODULE_5__.Distance3D)(sx, sy, sz, cx, cy, cz);
                if (d > radius) {
                    totalColumns++;
                    this.setXYZ(cx, cy, cz).unLoadColumn(() => {
                        totalColumns--;
                    });
                }
            }
        }
        const inte = new _Global_Util_SafeInterval_js__WEBPACK_IMPORTED_MODULE_10__.SafeInterval().setInterval(1).setOnRun(() => {
            if (totalColumns == 0) {
                inte.stop();
                if (onDone)
                    onDone();
            }
        });
        inte.start();
    }
    unLoadAllColumnsAsync() {
        return new Promise((resolve) => {
            this.unLoadAllColumns(() => {
                resolve(true);
            });
        });
    }
    unLoadAllColumns(onDone) {
        const [dimension, sx, sy, sz] = this.location;
        const regions = _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_3__.WorldRegister.dimensions.get(dimension);
        if (!regions)
            return;
        let totalColumns = 0;
        for (const [key, region] of regions) {
            for (const [ckey, column] of region.columns) {
                DataLoaderTool.columnDataTool.setColumn(column);
                const [dimension, cx, cy, cz] = DataLoaderTool.columnDataTool.getLocationData();
                totalColumns++;
                this.setXYZ(cx, cy, cz).unLoadColumn(() => {
                    totalColumns--;
                });
            }
        }
        const inte = new _Global_Util_SafeInterval_js__WEBPACK_IMPORTED_MODULE_10__.SafeInterval().setInterval(1).setOnRun(() => {
            if (totalColumns == 0) {
                inte.stop();
                if (onDone)
                    onDone();
            }
        });
        inte.start();
    }
    allColumns(run) {
        const [dimension, sx, sy, sz] = this.location;
        const regions = _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_3__.WorldRegister.dimensions.get(dimension);
        if (!regions)
            return;
        for (const [key, region] of regions) {
            for (const [ckey, column] of region.columns) {
                DataLoaderTool.columnDataTool.setColumn(column);
                run(DataLoaderTool.columnDataTool);
            }
        }
    }
    getAllUnStoredColumns(run) {
        const [dimension, sx, sy, sz] = this.location;
        const regions = _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_3__.WorldRegister.dimensions.get(dimension);
        if (!regions)
            return;
        for (const [key, region] of regions) {
            for (const [ckey, column] of region.columns) {
                DataLoaderTool.columnDataTool.setColumn(column);
                if (DataLoaderTool.columnDataTool.isStored())
                    continue;
                const [dimension, cx, cy, cz] = DataLoaderTool.columnDataTool.getLocationData();
                run(dimension, cx, cy, cz);
            }
        }
    }
}



/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Tools/Loader/LoaderRegister.js":
/*!**************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Tools/Loader/LoaderRegister.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoaderRegister": () => (/* binding */ LoaderRegister)
/* harmony export */ });
/* harmony import */ var _Global_Util_UtilMap_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Global/Util/UtilMap.js */ "../../DSLIBS/divineVoxelEngine/dist/Global/Util/UtilMap.js");

const LoaderRegister = {
    load: new _Global_Util_UtilMap_js__WEBPACK_IMPORTED_MODULE_0__.UtilMap(),
    dataComm: {},
    $INIT(dataComm) {
        this.dataComm = dataComm;
    },
    addToLoad(location, run) {
        const key = location.toString();
        let load = this.load.get(key);
        if (load)
            return load.push(run);
        const newL = [...location];
        load = [];
        this.load.set(key, load);
        load.push(run);
        this.dataComm.runPromiseTasks("load-column", newL, [], (data) => {
            this.runLoad(newL, data);
        });
    },
    runLoad(location, data) {
        const key = location.toString();
        const run = this.load.get(key);
        if (!run)
            return false;
        run.forEach((_) => _(data));
        this.load.remove(key);
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Tools/Tasks/TasksTool.js":
/*!********************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Tools/Tasks/TasksTool.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TaskTool": () => (/* binding */ TaskTool)
/* harmony export */ });
/* harmony import */ var _Common_Queues_ConstructorQueues_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Common/Queues/ConstructorQueues.js */ "../../DSLIBS/divineVoxelEngine/dist/Common/Queues/ConstructorQueues.js");
/* harmony import */ var threadcomm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! threadcomm */ "../../DSLIBS/threadComm/dist/index.js");
/* harmony import */ var _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Data/World/WorldRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldRegister.js");
/* harmony import */ var _World_Threads_WorldThreads_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../World/Threads/WorldThreads.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Threads/WorldThreads.js");
/* harmony import */ var _Common_Threads_Contracts_ConstructorTasks_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Common/Threads/Contracts/ConstructorTasks.js */ "../../DSLIBS/divineVoxelEngine/dist/Common/Threads/Contracts/ConstructorTasks.js");
/* harmony import */ var _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Data/World/WorldSpaces.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldSpaces.js");






class TaskTool {
    _data = {
        dimension: "main",
        queue: "main",
    };
    _thread = "";
    _priority = 0;
    constructor() {
        this._thread = threadcomm__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.threadName;
    }
    setPriority(priority) {
        this._priority = priority;
        return this;
    }
    setFocalPoint(location) {
        const [dimesnion, x, y, z] = location;
        const queueKey = `${dimesnion}-${_Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_5__.WorldSpaces.region.getKeyXYZ(x, y, z)}`;
        _Common_Queues_ConstructorQueues_js__WEBPACK_IMPORTED_MODULE_0__.ConstructorQueues.addQueue(queueKey);
        this._data.queue = queueKey;
        this._thread = threadcomm__WEBPACK_IMPORTED_MODULE_1__.ThreadComm.threadName;
        return this;
    }
    voxelUpdate = {
        update: {
            run: (location, raw, onDone, mode = "sync") => {
                _World_Threads_WorldThreads_js__WEBPACK_IMPORTED_MODULE_3__.CCM.runPromiseTasks(_Common_Threads_Contracts_ConstructorTasks_js__WEBPACK_IMPORTED_MODULE_4__.ConstructorTasks.voxelUpdate, [location, raw, this._data.queue, this._thread], [], onDone, mode == "sync" ? 0 : undefined);
            },
        },
        erase: {
            run: (location, onDone, mode = "sync") => {
                _World_Threads_WorldThreads_js__WEBPACK_IMPORTED_MODULE_3__.CCM.runPromiseTasks(_Common_Threads_Contracts_ConstructorTasks_js__WEBPACK_IMPORTED_MODULE_4__.ConstructorTasks.voxelErease, [location, this._data.queue, this._thread], [], onDone, mode == "sync" ? 0 : undefined);
            },
        },
        paint: {
            run: (location, raw, onDone, mode = "sync") => {
                _World_Threads_WorldThreads_js__WEBPACK_IMPORTED_MODULE_3__.CCM.runPromiseTasks(_Common_Threads_Contracts_ConstructorTasks_js__WEBPACK_IMPORTED_MODULE_4__.ConstructorTasks.voxelPaint, [location, raw, this._data.queue, this._thread], [], onDone, mode == "sync" ? 0 : undefined);
            },
        },
    };
    build = {
        chunk: {
            deferred: {
                run: (buildTasks, onDone) => {
                    _World_Threads_WorldThreads_js__WEBPACK_IMPORTED_MODULE_3__.CCM.runPromiseTasks(_Common_Threads_Contracts_ConstructorTasks_js__WEBPACK_IMPORTED_MODULE_4__.ConstructorTasks.buildChunk, {
                        data: buildTasks,
                        priority: this._priority,
                    }, [], onDone, undefined, 0);
                },
            },
            queued: {
                add: (location) => {
                    _Common_Queues_ConstructorQueues_js__WEBPACK_IMPORTED_MODULE_0__.ConstructorQueues.build.chunk.add({
                        data: [location, 1],
                        priority: this._priority,
                    }, this._data.queue);
                },
                run: (onDone) => {
                    _Common_Queues_ConstructorQueues_js__WEBPACK_IMPORTED_MODULE_0__.ConstructorQueues.build.chunk.run(this._data.queue);
                    _Common_Queues_ConstructorQueues_js__WEBPACK_IMPORTED_MODULE_0__.ConstructorQueues.build.chunk.onDone(this._data.queue, onDone);
                },
                runAndAwait: async () => {
                    await _Common_Queues_ConstructorQueues_js__WEBPACK_IMPORTED_MODULE_0__.ConstructorQueues.build.chunk.runAndAwait(this._data.queue);
                },
            },
        },
        column: {
            queued: {},
            deferred: {
                run: (location, onDone) => {
                    _World_Threads_WorldThreads_js__WEBPACK_IMPORTED_MODULE_3__.CCM.runPromiseTasks(_Common_Threads_Contracts_ConstructorTasks_js__WEBPACK_IMPORTED_MODULE_4__.ConstructorTasks.buildColumn, [location, 1], [], onDone, undefined, 0);
                },
            },
        },
    };
    explosion = {
        run: (location, radius, onDone) => {
            _World_Threads_WorldThreads_js__WEBPACK_IMPORTED_MODULE_3__.CCM.runPromiseTasks(_Common_Threads_Contracts_ConstructorTasks_js__WEBPACK_IMPORTED_MODULE_4__.ConstructorTasks.explosion, [location, radius, "", ""], [], onDone, undefined, 0);
        },
    };
    anaylzer = {
        update: {
            run: (location, onDone) => {
                _World_Threads_WorldThreads_js__WEBPACK_IMPORTED_MODULE_3__.CCM.runPromiseTasks(_Common_Threads_Contracts_ConstructorTasks_js__WEBPACK_IMPORTED_MODULE_4__.ConstructorTasks.analyzerUpdate, [location, this._data.queue, this._thread], [], onDone, undefined, 0);
            },
        },
    };
    propagation = {
        deferred: {
            run: (location, onDone) => {
                _World_Threads_WorldThreads_js__WEBPACK_IMPORTED_MODULE_3__.CCM.runPromiseTasks(_Common_Threads_Contracts_ConstructorTasks_js__WEBPACK_IMPORTED_MODULE_4__.ConstructorTasks.analyzerPropagation, [location, this._data.queue, this._thread], [], onDone, undefined, 0);
            },
        },
        queued: {
            add: (location) => {
                _Common_Queues_ConstructorQueues_js__WEBPACK_IMPORTED_MODULE_0__.ConstructorQueues.propagation.add([location, this._data.queue, this._thread], this._data.queue);
            },
            run: (onDone) => {
                _Common_Queues_ConstructorQueues_js__WEBPACK_IMPORTED_MODULE_0__.ConstructorQueues.propagation.run(this._data.queue);
                _Common_Queues_ConstructorQueues_js__WEBPACK_IMPORTED_MODULE_0__.ConstructorQueues.propagation.onDone(this._data.queue, onDone);
            },
            runAndAwait: async () => {
                await _Common_Queues_ConstructorQueues_js__WEBPACK_IMPORTED_MODULE_0__.ConstructorQueues.propagation.runAndAwait(this._data.queue);
            },
        },
    };
    generate = {
        deferred: {
            run(location, data, onDone) {
                _World_Threads_WorldThreads_js__WEBPACK_IMPORTED_MODULE_3__.CCM.runPromiseTasks(_Common_Threads_Contracts_ConstructorTasks_js__WEBPACK_IMPORTED_MODULE_4__.ConstructorTasks.generate, [location, data], [], onDone, undefined, 0);
            },
        },
        queued: {
            add: (data) => {
                _Common_Queues_ConstructorQueues_js__WEBPACK_IMPORTED_MODULE_0__.ConstructorQueues.generate.add(data, this._data.queue);
            },
            run: (onDone) => {
                _Common_Queues_ConstructorQueues_js__WEBPACK_IMPORTED_MODULE_0__.ConstructorQueues.generate.run(this._data.queue);
                _Common_Queues_ConstructorQueues_js__WEBPACK_IMPORTED_MODULE_0__.ConstructorQueues.generate.onDone(this._data.queue, onDone);
            },
            runAndAwait: async () => {
                await _Common_Queues_ConstructorQueues_js__WEBPACK_IMPORTED_MODULE_0__.ConstructorQueues.generate.runAndAwait(this._data.queue);
            },
        },
    };
    decorate = {
        deferred: {
            run: (location, data, onDone) => {
                _World_Threads_WorldThreads_js__WEBPACK_IMPORTED_MODULE_3__.CCM.runPromiseTasks(_Common_Threads_Contracts_ConstructorTasks_js__WEBPACK_IMPORTED_MODULE_4__.ConstructorTasks.decorate, [location, data], [], onDone, undefined, 0);
            },
        },
        queued: {
            add: async (data) => {
                _Common_Queues_ConstructorQueues_js__WEBPACK_IMPORTED_MODULE_0__.ConstructorQueues.decorate.add(data, this._data.queue);
            },
            run: (onDone) => {
                _Common_Queues_ConstructorQueues_js__WEBPACK_IMPORTED_MODULE_0__.ConstructorQueues.decorate.run(this._data.queue);
                _Common_Queues_ConstructorQueues_js__WEBPACK_IMPORTED_MODULE_0__.ConstructorQueues.decorate.onDone(this._data.queue, onDone);
            },
            runAndAwait: async () => {
                await _Common_Queues_ConstructorQueues_js__WEBPACK_IMPORTED_MODULE_0__.ConstructorQueues.decorate.runAndAwait(this._data.queue);
            },
        },
    };
    worldSun = {
        deferred: {
            run: (location, onDone) => {
                _World_Threads_WorldThreads_js__WEBPACK_IMPORTED_MODULE_3__.CCM.runPromiseTasks(_Common_Threads_Contracts_ConstructorTasks_js__WEBPACK_IMPORTED_MODULE_4__.ConstructorTasks.worldSun, [location, this._thread], [], onDone, undefined, 0);
            },
        },
        queued: {
            add: (location) => {
                _Common_Queues_ConstructorQueues_js__WEBPACK_IMPORTED_MODULE_0__.ConstructorQueues.worldSun.add([location, this._data.queue, this._thread], this._data.queue);
                _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_2__.WorldRegister.column.fill(location);
            },
            run: (onDone) => {
                _Common_Queues_ConstructorQueues_js__WEBPACK_IMPORTED_MODULE_0__.ConstructorQueues.worldSun.run(this._data.queue);
                _Common_Queues_ConstructorQueues_js__WEBPACK_IMPORTED_MODULE_0__.ConstructorQueues.worldSun.onDone(this._data.queue, onDone);
            },
            runAndAwait: async () => {
                await _Common_Queues_ConstructorQueues_js__WEBPACK_IMPORTED_MODULE_0__.ConstructorQueues.worldSun.runAndAwait(this._data.queue);
            },
        },
    };
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/World/Data/Classes/RegisterDataManager.js":
/*!*************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/World/Data/Classes/RegisterDataManager.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RegisterDataManager": () => (/* binding */ RegisterDataManager)
/* harmony export */ });
class RegisterDataManager {
    data = new Map();
    getData(id) {
        const voxelData = this.data.get(id);
        if (!voxelData) {
            throw new Error(`Voxel with ${id} does not exists.`);
        }
        return voxelData;
    }
    registerData(data) {
        if (Array.isArray(data)) {
            for (const voxel of data) {
                this.data.set(voxel.id, voxel);
            }
            return;
        }
        this.data.set(data.id, data);
    }
    clear() {
        this.data.clear();
    }
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/World/Data/Classes/TagBuilder.js":
/*!****************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/World/Data/Classes/TagBuilder.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TagBuilder": () => (/* binding */ TagBuilder)
/* harmony export */ });
/* harmony import */ var divine_binary_tags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-binary-tags */ "../../DSLIBS/divineBinaryTags/dist/index.js");
/* harmony import */ var _DataSync_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DataSync.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Data/DataSync.js");
/* harmony import */ var _Data_Register_MappedDataRegister_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Data/Register/MappedDataRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Register/MappedDataRegister.js");



class TagBuilder {
    id;
    dataSegment;
    _built = false;
    _nodeMap = new Map();
    _stringMaps = new Map();
    _objectMaps = new Map();
    _defaults = new Map();
    _initData;
    constructor(id, dataSegment) {
        this.id = id;
        this.dataSegment = dataSegment;
    }
    addNode(node) {
        if (Array.isArray(node)) {
            for (const n of node) {
                this._nodeMap.set(n.id, n);
            }
            return;
        }
        this._nodeMap.set(node.id, node);
    }
    getNode(id) {
        return this._nodeMap.get(id);
    }
    setDefaults(tagManager) {
        for (const [key, node] of this._nodeMap) {
            const defaultValue = this._defaults.get(key);
            if (!defaultValue)
                continue;
            tagManager.setTag(key, Number(defaultValue));
        }
    }
    hasNode(id) {
        return this._nodeMap.has(id);
    }
    setNode(id, value, tagManager) {
        const node = this.getNode(id);
        if (!node)
            return;
        if (node.type == "number") {
            tagManager.setTag(node.id, Number(value));
        }
        if (node.type == "boolean") {
            tagManager.setTag(node.id, Number(value));
        }
        if (node.type == "number-array") {
            if (!Array.isArray(value))
                return false;
            let i = value.length;
            while (i--) {
                tagManager.setArrayTagValue(node.id, i, value[i]);
            }
        }
        if (node.type == "string-map") {
            const data = this._stringMaps.get(node.id);
            if (!data)
                return false;
            const v = String(value).trim();
            if (data.found[v] === undefined) {
                data.map.push(v);
                data.found[v] = data.count;
                data.count++;
            }
            tagManager.setTag(node.id, data.found[v]);
        }
        if (node.type == "object-map") {
            const data = this._objectMaps.get(node.id);
            if (!data)
                return false;
            const v = JSON.stringify(value);
            if (data.found[v] === undefined) {
                data.map[data.count] = value;
                data.found[v] = data.count;
                data.count++;
            }
            tagManager.setTag(node.id, data.found[v]);
        }
    }
    build(totalTagIndexes = 0) {
        if (this._built)
            return this._initData;
        const tags = new divine_binary_tags__WEBPACK_IMPORTED_MODULE_0__.TagManager(this.id);
        for (const [key, node] of this._nodeMap) {
            if (node.type == "number") {
                tags.registerTag({
                    id: node.id,
                    type: "typed-number",
                    numberType: node.numberType,
                });
                this._defaults.set(node.id, node.default);
                continue;
            }
            if (node.type == "number-array") {
                tags.registerTag({
                    id: node.id,
                    type: "typed-number-array",
                    numberType: node.numberType,
                    length: node.length,
                });
                continue;
            }
            if (node.type == "boolean") {
                tags.registerTag({
                    id: node.id,
                    type: "boolean",
                });
                this._defaults.set(node.id, node.default ? 1 : 0);
            }
            if (node.type == "string-map") {
                tags.registerTag({
                    id: node.id,
                    type: "typed-number",
                    numberType: "16ui",
                });
                this._stringMaps.set(node.id, {
                    count: 0,
                    found: {},
                    map: [],
                    allowedComms: node.allowedComms,
                });
            }
            if (node.type == "object-map") {
                tags.registerTag({
                    id: node.id,
                    type: "typed-number",
                    numberType: "16ui",
                });
                this._objectMaps.set(node.id, {
                    count: 0,
                    found: {},
                    map: {},
                    allowedComms: node.allowedComms,
                });
            }
        }
        tags.$INIT({
            indexBufferMode: "shared",
            numberOfIndexes: totalTagIndexes,
        });
        this._initData = tags.initData;
        return this._initData;
    }
    sync() {
        for (const [key, map] of this._stringMaps) {
            const data = [this.dataSegment, key, map.map];
            if (map.allowedComms.includes("world")) {
                _Data_Register_MappedDataRegister_js__WEBPACK_IMPORTED_MODULE_2__.MappedDataRegister.stringMaps.sync(data);
            }
            _DataSync_js__WEBPACK_IMPORTED_MODULE_1__.DataSync.loopThroughComms((comm) => {
                if (comm.name == "world")
                    return;
                if (map.allowedComms.includes(comm.name)) {
                    _DataSync_js__WEBPACK_IMPORTED_MODULE_1__.DataSync.maps.strings.syncInThread(comm.name, data);
                }
            });
        }
        for (const [key, map] of this._objectMaps) {
            const data = [this.dataSegment, key, map.map];
            if (map.allowedComms.includes("world")) {
                _Data_Register_MappedDataRegister_js__WEBPACK_IMPORTED_MODULE_2__.MappedDataRegister.objectMaps.sync(data);
            }
            _DataSync_js__WEBPACK_IMPORTED_MODULE_1__.DataSync.loopThroughComms((comm) => {
                if (comm.name == "world")
                    return;
                if (map.allowedComms.includes(comm.name)) {
                    _DataSync_js__WEBPACK_IMPORTED_MODULE_1__.DataSync.maps.objects.syncInThread(comm.name, data);
                }
            });
        }
    }
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/World/Data/DataSync.js":
/*!******************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/World/Data/DataSync.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataSync": () => (/* binding */ DataSync)
/* harmony export */ });
/* harmony import */ var _Generators_VoxelDataGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Generators/VoxelDataGenerator.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Data/Generators/VoxelDataGenerator.js");
/* harmony import */ var _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Data/World/WorldRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldRegister.js");
/* harmony import */ var _Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Common/Threads/Contracts/DataSyncIds.js */ "../../DSLIBS/divineVoxelEngine/dist/Common/Threads/Contracts/DataSyncIds.js");
/* harmony import */ var _Tags_ChunkTags_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Tags/ChunkTags.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Data/Tags/ChunkTags.js");
/* harmony import */ var _Tags_ColumnTags_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Tags/ColumnTags.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Data/Tags/ColumnTags.js");
/* harmony import */ var _Tags_RegionTags_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Tags/RegionTags.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Data/Tags/RegionTags.js");
/* harmony import */ var _Data_Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Data/Voxel/VoxelTags.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Voxel/VoxelTags.js");
/* harmony import */ var _Data_World_Region_RegionHeaderRegister_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../Data/World/Region/RegionHeaderRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/Region/RegionHeaderRegister.js");
/* harmony import */ var _Data_World_Dimensions_DimensionsRegister_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../Data/World/Dimensions/DimensionsRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/Dimensions/DimensionsRegister.js");
/* harmony import */ var _TagBuilders_VoxelTagBuilder_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./TagBuilders/VoxelTagBuilder.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Data/TagBuilders/VoxelTagBuilder.js");
/* harmony import */ var _Generators_SubstanceDataGenerator_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Generators/SubstanceDataGenerator.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Data/Generators/SubstanceDataGenerator.js");
/* harmony import */ var _Data_Substance_SubstanceTags_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../Data/Substance/SubstanceTags.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Substance/SubstanceTags.js");
/* harmony import */ var _TagBuilders_SubstanceTagBuilder_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./TagBuilders/SubstanceTagBuilder.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Data/TagBuilders/SubstanceTagBuilder.js");
//objects













class DataSyncNode {
    data;
    constructor(data) {
        this.data = data;
    }
    unSync(input) {
        const output = this.data.getUnSyncData(input);
        if (!output)
            return false;
        DataSync.loopThroughComms((comm, options) => {
            if (!this.data.commCheck(options))
                return false;
            comm.unSyncData(this.data.dataSyncType, output);
        });
    }
    unSyncInThread(commName, input) {
        const comm = DataSync.commMap.get(commName);
        if (!comm)
            return;
        const output = this.data.getUnSyncData(input);
        if (!output)
            return false;
        if (!this.data.commCheck(DataSync.commOptions.get(comm)))
            return false;
        comm.unSyncData(this.data.dataSyncType, output);
    }
    sync(input) {
        const output = this.data.getSyncData(input);
        if (!output)
            return false;
        DataSync.loopThroughComms((comm, options) => {
            if (!this.data.commCheck(options))
                return false;
            comm.syncData(this.data.dataSyncType, output);
        });
    }
    syncInThread(commName, input) {
        const comm = DataSync.commMap.get(commName);
        if (!comm)
            return;
        const output = this.data.getSyncData(input);
        if (!output)
            return false;
        if (!this.data.commCheck(DataSync.commOptions.get(comm)))
            return false;
        comm.syncData(this.data.dataSyncType, output);
    }
}
const DataSync = {
    commMap: new Map(),
    comms: [],
    commOptions: new WeakMap(),
    _ready: false,
    $INIT() {
        this.loopThroughComms((comm) => {
            this.commMap.set(comm.name, comm);
        });
        _Generators_VoxelDataGenerator_js__WEBPACK_IMPORTED_MODULE_0__.VoxelDataGenerator.$generate();
        _TagBuilders_VoxelTagBuilder_js__WEBPACK_IMPORTED_MODULE_9__.VoxelTagBuilder.sync();
        _Generators_SubstanceDataGenerator_js__WEBPACK_IMPORTED_MODULE_10__.SubstanceDataGenerator.$generate();
        _TagBuilders_SubstanceTagBuilder_js__WEBPACK_IMPORTED_MODULE_12__.SubstanceTagBuilder.sync();
        (0,_Tags_ChunkTags_js__WEBPACK_IMPORTED_MODULE_3__.InitalizeChunkTags)();
        (0,_Tags_ColumnTags_js__WEBPACK_IMPORTED_MODULE_4__.InitalizeColumnTags)();
        (0,_Tags_RegionTags_js__WEBPACK_IMPORTED_MODULE_5__.InitalizeRegionTags)();
        this.palettes.voxel.sync();
        this.palettes.substance.sync();
        this.tags.voxel.sync();
        this.tags.substance.sync();
        this.tags.chunk.sync();
        this.tags.column.sync();
        this.tags.region.sync();
        this._ready = true;
    },
    isReady() {
        return this._ready;
    },
    registerComm(comm, data = {}) {
        this.comms.push(comm);
        this.commOptions.set(comm, {
            worldData: data.worldData !== undefined ? data.worldData : true,
            voxelPalette: data.voxelPalette !== undefined ? data.voxelPalette : true,
            voxelTags: data.voxelTags !== undefined ? data.voxelTags : true,
            materials: data.materials !== undefined ? data.materials : false,
            colliders: data.colliders !== undefined ? data.colliders : false,
            worldDataTags: data.worldDataTags !== undefined ? data.worldDataTags : true,
        });
    },
    loopThroughComms(func) {
        for (const comm of DataSync.comms) {
            const options = this.commOptions.get(comm);
            if (!comm.isReady())
                continue;
            func(comm, options);
        }
    },
    worldData: {
        dimesnion: new DataSyncNode({
            dataSyncType: _Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.dimesnion,
            commCheck: (options) => options.worldData,
            getSyncData: (input) => {
                const dimensionData = _Data_World_Dimensions_DimensionsRegister_js__WEBPACK_IMPORTED_MODULE_8__.DimensionsRegister.getDimension(input);
                if (!dimensionData)
                    return false;
                return dimensionData;
            },
            getUnSyncData: () => true,
        }),
        chunk: new DataSyncNode({
            dataSyncType: _Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.chunk,
            commCheck: (options) => options.worldData,
            getSyncData: (input) => {
                const chunk = _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_1__.WorldRegister.chunk.get(input);
                if (!chunk)
                    return false;
                return [input, chunk.buffer];
            },
            getUnSyncData: (input) => input,
        }),
        column: new DataSyncNode({
            dataSyncType: _Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.column,
            commCheck: (options) => options.worldData,
            getSyncData: (input) => {
                const column = _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_1__.WorldRegister.column.get(input);
                if (!column)
                    return false;
                return [input, column.buffer];
            },
            getUnSyncData: (input) => input,
        }),
        region: new DataSyncNode({
            dataSyncType: _Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.region,
            commCheck: (options) => options.worldData,
            getSyncData: (input) => {
                const region = _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_1__.WorldRegister.region.get(input);
                if (!region)
                    return false;
                return [input, region.buffer];
            },
            getUnSyncData: (input) => input,
        }),
        regionHeader: new DataSyncNode({
            dataSyncType: _Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.regionHeader,
            commCheck: (options) => options.worldData,
            getSyncData: (input) => {
                const regionHeader = _Data_World_Region_RegionHeaderRegister_js__WEBPACK_IMPORTED_MODULE_7__.RegionHeaderRegister.get(input);
                if (!regionHeader)
                    return false;
                return [input, regionHeader.buffer];
            },
            getUnSyncData: () => true,
        }),
    },
    tags: {
        voxel: new DataSyncNode({
            dataSyncType: _Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.voxelTags,
            commCheck: (options) => options.voxelTags,
            getSyncData: () => [
                _Data_Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_6__.VoxelTags.initData,
                _Data_Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_6__.VoxelTags.voxelIndex.buffer,
            ],
            getUnSyncData: () => false,
        }),
        substance: new DataSyncNode({
            dataSyncType: _Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.substanceTags,
            commCheck: (options) => options.voxelTags,
            getSyncData: () => _Data_Substance_SubstanceTags_js__WEBPACK_IMPORTED_MODULE_11__.SubstanceTags.initData,
            getUnSyncData: () => false,
        }),
        chunk: new DataSyncNode({
            dataSyncType: _Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.chunkTags,
            commCheck: (options) => options.worldDataTags,
            getSyncData: () => _Tags_ChunkTags_js__WEBPACK_IMPORTED_MODULE_3__.ChunkDataTags.initData,
            getUnSyncData: () => false,
        }),
        column: new DataSyncNode({
            dataSyncType: _Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.columnTags,
            commCheck: (options) => options.worldDataTags,
            getSyncData: () => _Tags_ColumnTags_js__WEBPACK_IMPORTED_MODULE_4__.ColumnDataTags.initData,
            getUnSyncData: () => false,
        }),
        region: new DataSyncNode({
            dataSyncType: _Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.regionTags,
            commCheck: (options) => options.worldDataTags,
            getSyncData: () => [
                _Tags_RegionTags_js__WEBPACK_IMPORTED_MODULE_5__.RegionDataTags.initData,
                _Tags_RegionTags_js__WEBPACK_IMPORTED_MODULE_5__.RegionHeaderTagManager.initData,
            ],
            getUnSyncData: () => false,
        }),
    },
    palettes: {
        voxel: new DataSyncNode({
            dataSyncType: _Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.voxelPalette,
            commCheck: (options) => options.worldDataTags,
            getSyncData: () => [
                _Generators_VoxelDataGenerator_js__WEBPACK_IMPORTED_MODULE_0__.VoxelDataGenerator.palette._palette,
                _Generators_VoxelDataGenerator_js__WEBPACK_IMPORTED_MODULE_0__.VoxelDataGenerator.palette._map,
            ],
            getUnSyncData: () => false,
        }),
        substance: new DataSyncNode({
            dataSyncType: _Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.substancePalette,
            commCheck: (options) => options.worldDataTags,
            getSyncData: () => [
                _Generators_SubstanceDataGenerator_js__WEBPACK_IMPORTED_MODULE_10__.SubstanceDataGenerator.palette._palette,
                _Generators_SubstanceDataGenerator_js__WEBPACK_IMPORTED_MODULE_10__.SubstanceDataGenerator.palette._map,
            ],
            getUnSyncData: () => false,
        }),
    },
    maps: {
        strings: new DataSyncNode({
            dataSyncType: _Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.registerStringMap,
            commCheck: () => true,
            getSyncData: (data) => data,
            getUnSyncData: () => false,
        }),
        objects: new DataSyncNode({
            dataSyncType: _Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.registerObjectMap,
            commCheck: () => true,
            getSyncData: (data) => data,
            getUnSyncData: () => false,
        }),
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/World/Data/Generators/SubstanceDataGenerator.js":
/*!*******************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/World/Data/Generators/SubstanceDataGenerator.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SubstanceDataGenerator": () => (/* binding */ SubstanceDataGenerator)
/* harmony export */ });
/* harmony import */ var _Data_Substance_SubstancePalette_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Data/Substance/SubstancePalette.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Substance/SubstancePalette.js");
/* harmony import */ var _DivineVoxelEngineWorld_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../DivineVoxelEngineWorld.js */ "../../DSLIBS/divineVoxelEngine/dist/World/DivineVoxelEngineWorld.js");
/* harmony import */ var _TagBuilders_SubstanceTagBuilder_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../TagBuilders/SubstanceTagBuilder.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Data/TagBuilders/SubstanceTagBuilder.js");
/* harmony import */ var _Data_Substance_SubstanceTags_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Data/Substance/SubstanceTags.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Substance/SubstanceTags.js");




const SubstanceDataGenerator = {
    $generate() {
        //build palette
        for (const [key, voxel] of _DivineVoxelEngineWorld_js__WEBPACK_IMPORTED_MODULE_1__.DVEW.dataRegister.substances.data) {
            this.palette.register(voxel);
        }
        _Data_Substance_SubstancePalette_js__WEBPACK_IMPORTED_MODULE_0__.SubstancePaletteReader.setPalette(this.palette._palette, this.palette._map);
        //create data buffer
        const initData = _TagBuilders_SubstanceTagBuilder_js__WEBPACK_IMPORTED_MODULE_2__.SubstanceTagBuilder.build(_DivineVoxelEngineWorld_js__WEBPACK_IMPORTED_MODULE_1__.DVEW.dataRegister.substances.data.size);
        const buffer = new SharedArrayBuffer(initData.bufferSize);
        initData.buffer = buffer;
        _Data_Substance_SubstanceTags_js__WEBPACK_IMPORTED_MODULE_3__.SubstanceTags.$INIT(initData);
        _Data_Substance_SubstanceTags_js__WEBPACK_IMPORTED_MODULE_3__.SubstanceTags.setBuffer(buffer);
        //build data
        for (const [key, substance] of _DivineVoxelEngineWorld_js__WEBPACK_IMPORTED_MODULE_1__.DVEW.dataRegister.substances.data) {
            const substanceID = _Data_Substance_SubstancePalette_js__WEBPACK_IMPORTED_MODULE_0__.SubstancePaletteReader.id.numberFromString(key);
            if (typeof substanceID == undefined)
                continue;
            _Data_Substance_SubstanceTags_js__WEBPACK_IMPORTED_MODULE_3__.SubstanceTags.setTagIndex(substanceID);
            _TagBuilders_SubstanceTagBuilder_js__WEBPACK_IMPORTED_MODULE_2__.SubstanceTagBuilder.setDefaults(_Data_Substance_SubstanceTags_js__WEBPACK_IMPORTED_MODULE_3__.SubstanceTags);
            for (const tag of substance.tags) {
                const [id, value] = tag;
                if (!_TagBuilders_SubstanceTagBuilder_js__WEBPACK_IMPORTED_MODULE_2__.SubstanceTagBuilder.hasNode(id))
                    continue;
                _TagBuilders_SubstanceTagBuilder_js__WEBPACK_IMPORTED_MODULE_2__.SubstanceTagBuilder.setNode(id, value, _Data_Substance_SubstanceTags_js__WEBPACK_IMPORTED_MODULE_3__.SubstanceTags);
            }
        }
        _DivineVoxelEngineWorld_js__WEBPACK_IMPORTED_MODULE_1__.DVEW.data.tags.substances.$INIT(initData);
    },
    palette: {
        _count: 0,
        _palette: [],
        _map: {},
        register(sustance) {
            this._palette[this._count] = sustance.id;
            this._map[sustance.id] = this._count;
            this._count++;
        },
        get() {
            return this._palette;
        },
        getMap() {
            return this._map;
        },
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/World/Data/Generators/VoxelDataGenerator.js":
/*!***************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/World/Data/Generators/VoxelDataGenerator.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VoxelDataGenerator": () => (/* binding */ VoxelDataGenerator)
/* harmony export */ });
/* harmony import */ var _DivineVoxelEngineWorld_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../DivineVoxelEngineWorld.js */ "../../DSLIBS/divineVoxelEngine/dist/World/DivineVoxelEngineWorld.js");
/* harmony import */ var _Data_Voxel_VoxelPalette_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Data/Voxel/VoxelPalette.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Voxel/VoxelPalette.js");
/* harmony import */ var _TagBuilders_VoxelTagBuilder_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../TagBuilders/VoxelTagBuilder.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Data/TagBuilders/VoxelTagBuilder.js");
/* harmony import */ var _Data_Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Data/Voxel/VoxelTags.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Voxel/VoxelTags.js");
/* harmony import */ var _Data_Constants_Tags_VoxelTagIds_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../Data/Constants/Tags/VoxelTagIds.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Constants/Tags/VoxelTagIds.js");
/* harmony import */ var _Data_Light_LightByte_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../Data/Light/LightByte.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Light/LightByte.js");
//objects






const VoxelDataGenerator = {
    $generate() {
        //build palette
        for (const [key, voxel] of _DivineVoxelEngineWorld_js__WEBPACK_IMPORTED_MODULE_0__.DVEW.dataRegister.voxels.data) {
            this.palette.registerVoxel(voxel);
        }
        _Data_Voxel_VoxelPalette_js__WEBPACK_IMPORTED_MODULE_1__.VoxelPaletteReader.setVoxelPalette(this.palette._palette, this.palette._map);
        //build index
        const indexBuffer = new SharedArrayBuffer(this.palette._count * 2);
        const voxelIndex = new Uint16Array(indexBuffer);
        let currentCount = 0;
        let currentParent = 0;
        for (let i = 2; i < this.palette._count; i++) {
            let newParent = _Data_Voxel_VoxelPalette_js__WEBPACK_IMPORTED_MODULE_1__.VoxelPaletteReader.id.baseNumeric(i);
            if (newParent != currentParent) {
                currentParent = newParent;
                voxelIndex[i] = currentCount;
                currentCount++;
            }
        }
        //create data buffer
        const initData = _TagBuilders_VoxelTagBuilder_js__WEBPACK_IMPORTED_MODULE_2__.VoxelTagBuilder.build(_DivineVoxelEngineWorld_js__WEBPACK_IMPORTED_MODULE_0__.DVEW.dataRegister.voxels.data.size);
        const buffer = new SharedArrayBuffer(initData.bufferSize);
        initData.buffer = buffer;
        _Data_Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_3__.VoxelTags.$INIT(initData);
        _Data_Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_3__.VoxelTags.setBuffer(buffer);
        //build data
        for (const [key, voxel] of _DivineVoxelEngineWorld_js__WEBPACK_IMPORTED_MODULE_0__.DVEW.dataRegister.voxels.data) {
            const baseID = _Data_Voxel_VoxelPalette_js__WEBPACK_IMPORTED_MODULE_1__.VoxelPaletteReader.id.numberFromString(key);
            if (!baseID)
                continue;
            _Data_Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_3__.VoxelTags.setTagIndex(voxelIndex[baseID]);
            _TagBuilders_VoxelTagBuilder_js__WEBPACK_IMPORTED_MODULE_2__.VoxelTagBuilder.setDefaults(_Data_Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_3__.VoxelTags);
            for (const tag of voxel.tags) {
                const [id, value] = tag;
                if (!_TagBuilders_VoxelTagBuilder_js__WEBPACK_IMPORTED_MODULE_2__.VoxelTagBuilder.hasNode(id))
                    continue;
                if (id == _Data_Constants_Tags_VoxelTagIds_js__WEBPACK_IMPORTED_MODULE_4__.VoxelTagIDs.lightValue) {
                    const v = value;
                    let sl = 0;
                    sl = _Data_Light_LightByte_js__WEBPACK_IMPORTED_MODULE_5__.LightData.setR(v[0], sl);
                    sl = _Data_Light_LightByte_js__WEBPACK_IMPORTED_MODULE_5__.LightData.setG(v[1], sl);
                    sl = _Data_Light_LightByte_js__WEBPACK_IMPORTED_MODULE_5__.LightData.setB(v[2], sl);
                    _Data_Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_3__.VoxelTags.setTag(_Data_Constants_Tags_VoxelTagIds_js__WEBPACK_IMPORTED_MODULE_4__.VoxelTagIDs.lightValue, sl);
                    continue;
                }
                _TagBuilders_VoxelTagBuilder_js__WEBPACK_IMPORTED_MODULE_2__.VoxelTagBuilder.setNode(id, value, _Data_Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_3__.VoxelTags);
            }
        }
        _DivineVoxelEngineWorld_js__WEBPACK_IMPORTED_MODULE_0__.DVEW.data.tags.voxels.sync(voxelIndex);
        _DivineVoxelEngineWorld_js__WEBPACK_IMPORTED_MODULE_0__.DVEW.data.tags.voxels.$INIT(initData);
    },
    palette: {
        _count: 2,
        _palette: ["dve_air", "dve_barrier"],
        _map: {
            dve_air: 0,
            dve_barrier: 1,
        },
        registerVoxel(voxel) {
            this._palette[this._count] = voxel.id;
            this._map[voxel.id] = this._count;
            if (voxel.states) {
                for (let i = this._count; i <= this._count + voxel.states; i++) {
                    this._palette[i] = voxel.id;
                }
                this._count += voxel.states;
            }
            this._count++;
        },
        get() {
            return this._palette;
        },
        getMap() {
            return this._map;
        },
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/World/Data/Generators/WorldDataGenerator.js":
/*!***************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/World/Data/Generators/WorldDataGenerator.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WorldDataGenerator": () => (/* binding */ WorldDataGenerator)
/* harmony export */ });
/* harmony import */ var _Global_Util_helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Global/Util.helper.js */ "../../DSLIBS/divineVoxelEngine/dist/Global/Util.helper.js");
/* harmony import */ var _Data_Constants_DataHeaders_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Data/Constants/DataHeaders.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Constants/DataHeaders.js");
/* harmony import */ var _Tags_ChunkTags_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Tags/ChunkTags.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Data/Tags/ChunkTags.js");
/* harmony import */ var _Tags_ColumnTags_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Tags/ColumnTags.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Data/Tags/ColumnTags.js");
/* harmony import */ var _Tags_RegionTags_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Tags/RegionTags.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Data/Tags/RegionTags.js");





const WorldDataGenerator = {
    chunk: {
        create(buffer = false) {
            if (buffer) {
                return _Global_Util_helper_js__WEBPACK_IMPORTED_MODULE_0__.Util.convertBufferToSAB(buffer);
            }
            const newBuffer = new SharedArrayBuffer(_Tags_ChunkTags_js__WEBPACK_IMPORTED_MODULE_2__.ChunkDataTags.tagSize);
            _Tags_ChunkTags_js__WEBPACK_IMPORTED_MODULE_2__.ChunkDataTags.setBuffer(newBuffer);
            _Tags_ChunkTags_js__WEBPACK_IMPORTED_MODULE_2__.ChunkDataTags.setTag("#dve_header", _Data_Constants_DataHeaders_js__WEBPACK_IMPORTED_MODULE_1__.DVEMessageHeader);
            _Tags_ChunkTags_js__WEBPACK_IMPORTED_MODULE_2__.ChunkDataTags.setTag("#dve_data_type", _Data_Constants_DataHeaders_js__WEBPACK_IMPORTED_MODULE_1__.WorldDataHeaders.chunk);
            return newBuffer;
        },
    },
    column: {
        create(buffer = false) {
            if (buffer) {
                return _Global_Util_helper_js__WEBPACK_IMPORTED_MODULE_0__.Util.convertBufferToSAB(buffer);
            }
            const newBuffer = new SharedArrayBuffer(_Tags_ColumnTags_js__WEBPACK_IMPORTED_MODULE_3__.ColumnDataTags.tagSize);
            _Tags_ColumnTags_js__WEBPACK_IMPORTED_MODULE_3__.ColumnDataTags.setBuffer(newBuffer);
            _Tags_ColumnTags_js__WEBPACK_IMPORTED_MODULE_3__.ColumnDataTags.setTag("#dve_header", _Data_Constants_DataHeaders_js__WEBPACK_IMPORTED_MODULE_1__.DVEMessageHeader);
            _Tags_ColumnTags_js__WEBPACK_IMPORTED_MODULE_3__.ColumnDataTags.setTag("#dve_data_type", _Data_Constants_DataHeaders_js__WEBPACK_IMPORTED_MODULE_1__.WorldDataHeaders.column);
            return newBuffer;
        },
    },
    region: {
        create(buffer = false) {
            if (buffer) {
                return _Global_Util_helper_js__WEBPACK_IMPORTED_MODULE_0__.Util.convertBufferToSAB(buffer);
            }
            const newBuffer = new SharedArrayBuffer(_Tags_RegionTags_js__WEBPACK_IMPORTED_MODULE_4__.RegionDataTags.tagSize);
            _Tags_RegionTags_js__WEBPACK_IMPORTED_MODULE_4__.RegionDataTags.setBuffer(newBuffer);
            _Tags_RegionTags_js__WEBPACK_IMPORTED_MODULE_4__.RegionDataTags.setTag("#dve_header", _Data_Constants_DataHeaders_js__WEBPACK_IMPORTED_MODULE_1__.DVEMessageHeader);
            _Tags_RegionTags_js__WEBPACK_IMPORTED_MODULE_4__.RegionDataTags.setTag("#dve_data_type", _Data_Constants_DataHeaders_js__WEBPACK_IMPORTED_MODULE_1__.WorldDataHeaders.region);
            return newBuffer;
        },
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/World/Data/Managers/DataManagers.js":
/*!*******************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/World/Data/Managers/DataManagers.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SubstanceManager": () => (/* binding */ SubstanceManager),
/* harmony export */   "VoxelManager": () => (/* binding */ VoxelManager)
/* harmony export */ });
/* harmony import */ var _Classes_RegisterDataManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Classes/RegisterDataManager.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Data/Classes/RegisterDataManager.js");

const VoxelManager = new _Classes_RegisterDataManager_js__WEBPACK_IMPORTED_MODULE_0__.RegisterDataManager();
const SubstanceManager = new _Classes_RegisterDataManager_js__WEBPACK_IMPORTED_MODULE_0__.RegisterDataManager();
SubstanceManager.registerData([
    {
        id: "#dve_solid",
        tags: [
            ["#dve_parent_substance", "#dve_solid"],
            ["#dve_rendered_substance", "#dve_solid"],
            ["#dve_is_solid", true],
            ["#dve_is_liquid", false],
            ["#dve_flow_rate", 0],
            ["#dve_culled_substances", ["#dve_solid"]],
        ],
    },
    {
        id: "#dve_translucent",
        tags: [
            ["#dve_parent_substance", "#dve_flora"],
            ["#dve_rendered_substance", "#dve_solid"],
            ["#dve_is_solid", true],
            ["#dve_is_liquid", false],
            ["#dve_flow_rate", 0],
            ["#dve_culled_substances", []],
        ],
    },
    {
        id: "#dve_transparent",
        tags: [
            ["#dve_parent_substance", "#dve_solid"],
            ["#dve_rendered_substance", "#dve_solid"],
            ["#dve_is_solid", true],
            ["#dve_is_liquid", false],
            ["#dve_flow_rate", 0],
            ["#dve_culled_substances", ["#dve_transparent"]],
        ],
    },
    {
        id: "#dve_flora",
        tags: [
            ["#dve_parent_substance", "#dve_flora"],
            ["#dve_rendered_substance", "#dve_flora"],
            ["#dve_is_solid", true],
            ["#dve_is_liquid", false],
            ["#dve_flow_rate", 0],
            ["#dve_culled_substances", []],
        ],
    },
    {
        id: "#dve_liquid",
        tags: [
            ["#dve_parent_substance", "#dve_liquid"],
            ["#dve_rendered_substance", "#dve_liquid"],
            ["#dve_is_solid", false],
            ["#dve_is_liquid", true],
            ["#dve_flow_rate", 1],
            ["#dve_culled_substances", ["#dve_liquid", "#dve_solid"]],
        ],
    },
    {
        id: "#dve_magma",
        tags: [
            ["#dve_parent_substance", "#dve_liquid"],
            ["#dve_rendered_substance", "#dve_liquid"],
            ["#dve_is_solid", false],
            ["#dve_is_liquid", true],
            ["#dve_flow_rate", 3],
            ["#dve_culled_substances", ["#dve_liquid", "#dve_solid"]],
        ],
    },
]);


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/World/Data/TagBuilders/SubstanceTagBuilder.js":
/*!*****************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/World/Data/TagBuilders/SubstanceTagBuilder.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SubstanceTagBuilder": () => (/* binding */ SubstanceTagBuilder)
/* harmony export */ });
/* harmony import */ var _Data_Constants_Tags_SubstanceTagIds_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Data/Constants/Tags/SubstanceTagIds.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Constants/Tags/SubstanceTagIds.js");
/* harmony import */ var _Classes_TagBuilder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Classes/TagBuilder.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Data/Classes/TagBuilder.js");


const SubstanceTagBuilder = new _Classes_TagBuilder_js__WEBPACK_IMPORTED_MODULE_1__.TagBuilder("substance-tag-manager", "substance");
SubstanceTagBuilder.addNode([
    {
        id: _Data_Constants_Tags_SubstanceTagIds_js__WEBPACK_IMPORTED_MODULE_0__.SubstanceTagIds.parent,
        type: "string-map",
        allowedComms: ["constructor", "nexus", "fx", "world", "render"],
    },
    {
        id: _Data_Constants_Tags_SubstanceTagIds_js__WEBPACK_IMPORTED_MODULE_0__.SubstanceTagIds.rendered,
        type: "string-map",
        allowedComms: ["constructor", "nexus", "fx", "world", "render"],
    },
    {
        id: _Data_Constants_Tags_SubstanceTagIds_js__WEBPACK_IMPORTED_MODULE_0__.SubstanceTagIds.culledSubstnaces,
        type: "object-map",
        allowedComms: ["constructor"],
    },
    {
        id: _Data_Constants_Tags_SubstanceTagIds_js__WEBPACK_IMPORTED_MODULE_0__.SubstanceTagIds.isSolid,
        type: "boolean",
        default: false,
    },
    {
        id: _Data_Constants_Tags_SubstanceTagIds_js__WEBPACK_IMPORTED_MODULE_0__.SubstanceTagIds.isLiquid,
        type: "boolean",
        default: false,
    },
    {
        id: _Data_Constants_Tags_SubstanceTagIds_js__WEBPACK_IMPORTED_MODULE_0__.SubstanceTagIds.flowRate,
        type: "number",
        numberType: "32f",
        default: 1,
    },
]);


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/World/Data/TagBuilders/VoxelTagBuilder.js":
/*!*************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/World/Data/TagBuilders/VoxelTagBuilder.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VoxelTagBuilder": () => (/* binding */ VoxelTagBuilder)
/* harmony export */ });
/* harmony import */ var _Data_Constants_Tags_VoxelTagIds_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Data/Constants/Tags/VoxelTagIds.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Constants/Tags/VoxelTagIds.js");
/* harmony import */ var _Classes_TagBuilder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Classes/TagBuilder.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Data/Classes/TagBuilder.js");


const VoxelTagBuilder = new _Classes_TagBuilder_js__WEBPACK_IMPORTED_MODULE_1__.TagBuilder("voxel-tag-manager", "voxel");
VoxelTagBuilder.addNode([
    {
        id: _Data_Constants_Tags_VoxelTagIds_js__WEBPACK_IMPORTED_MODULE_0__.VoxelTagIDs.substance,
        type: "string-map",
        allowedComms: ["constructor", "nexus", "fx", "world", "render"],
    },
    {
        id: _Data_Constants_Tags_VoxelTagIds_js__WEBPACK_IMPORTED_MODULE_0__.VoxelTagIDs.shapeID,
        type: "string-map",
        allowedComms: ["constructor"],
    },
    {
        id: _Data_Constants_Tags_VoxelTagIds_js__WEBPACK_IMPORTED_MODULE_0__.VoxelTagIDs.colliderID,
        type: "string-map",
        allowedComms: ["nexus"],
    },
    {
        id: _Data_Constants_Tags_VoxelTagIds_js__WEBPACK_IMPORTED_MODULE_0__.VoxelTagIDs.checkCollisions,
        type: "boolean",
        default: false,
    },
    {
        id: _Data_Constants_Tags_VoxelTagIds_js__WEBPACK_IMPORTED_MODULE_0__.VoxelTagIDs.material,
        type: "string-map",
        allowedComms: ["nexus"],
    },
    {
        id: _Data_Constants_Tags_VoxelTagIds_js__WEBPACK_IMPORTED_MODULE_0__.VoxelTagIDs.isLightSource,
        type: "boolean",
        default: false,
    },
    {
        id: _Data_Constants_Tags_VoxelTagIds_js__WEBPACK_IMPORTED_MODULE_0__.VoxelTagIDs.lightValue,
        type: "number",
        numberType: "16ui",
        default: 0,
    },
    {
        id: _Data_Constants_Tags_VoxelTagIds_js__WEBPACK_IMPORTED_MODULE_0__.VoxelTagIDs.isRich,
        type: "boolean",
        default: false,
    },
    {
        id: _Data_Constants_Tags_VoxelTagIds_js__WEBPACK_IMPORTED_MODULE_0__.VoxelTagIDs.hardness,
        type: "number",
        numberType: "32ui",
        default: 0,
    },
]);


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/World/Data/Tags/ChunkTags.js":
/*!************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/World/Data/Tags/ChunkTags.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChunkDataTags": () => (/* binding */ ChunkDataTags),
/* harmony export */   "InitalizeChunkTags": () => (/* binding */ InitalizeChunkTags)
/* harmony export */ });
/* harmony import */ var _Data_World_Chunk_ChunkTags_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Data/World/Chunk/ChunkTags.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/Chunk/ChunkTags.js");
/* harmony import */ var divine_binary_tags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! divine-binary-tags */ "../../DSLIBS/divineBinaryTags/dist/index.js");
/* harmony import */ var _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Data/World/WorldSpaces.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldSpaces.js");
/* harmony import */ var _Data_Constants_Tags_WorldDataTagIds_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Data/Constants/Tags/WorldDataTagIds.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Constants/Tags/WorldDataTagIds.js");
/* harmony import */ var _Data_Constants_Tags_ChunkTagIds_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../Data/Constants/Tags/ChunkTagIds.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Constants/Tags/ChunkTagIds.js");





const ChunkDataTags = new divine_binary_tags__WEBPACK_IMPORTED_MODULE_1__.TagManager("chunk-tags");
ChunkDataTags.registerTag({
    id: _Data_Constants_Tags_WorldDataTagIds_js__WEBPACK_IMPORTED_MODULE_3__.WorldDataTagIDs.header,
    type: "header",
    numberType: "16ui",
});
ChunkDataTags.registerTag({
    id: _Data_Constants_Tags_WorldDataTagIds_js__WEBPACK_IMPORTED_MODULE_3__.WorldDataTagIDs.dataType,
    type: "header",
    numberType: "16ui",
});
ChunkDataTags.registerTag({
    id: _Data_Constants_Tags_WorldDataTagIds_js__WEBPACK_IMPORTED_MODULE_3__.WorldDataTagIDs.dimensionId,
    type: "typed-number",
    numberType: "16ui",
});
ChunkDataTags.registerTag({
    id: _Data_Constants_Tags_WorldDataTagIds_js__WEBPACK_IMPORTED_MODULE_3__.WorldDataTagIDs.positionX,
    type: "typed-number",
    numberType: "32i",
});
ChunkDataTags.registerTag({
    id: _Data_Constants_Tags_WorldDataTagIds_js__WEBPACK_IMPORTED_MODULE_3__.WorldDataTagIDs.positionY,
    type: "typed-number",
    numberType: "32i",
});
ChunkDataTags.registerTag({
    id: _Data_Constants_Tags_WorldDataTagIds_js__WEBPACK_IMPORTED_MODULE_3__.WorldDataTagIDs.positionZ,
    type: "typed-number",
    numberType: "32i",
});
ChunkDataTags.registerTag({
    id: _Data_Constants_Tags_ChunkTagIds_js__WEBPACK_IMPORTED_MODULE_4__.ChunkTagIDs.minHeight,
    type: "typed-number",
    numberType: "8ui",
});
ChunkDataTags.registerTag({
    id: _Data_Constants_Tags_ChunkTagIds_js__WEBPACK_IMPORTED_MODULE_4__.ChunkTagIDs.maxHeight,
    type: "typed-number",
    numberType: "8ui",
});
function InitalizeChunkTags() {
    ChunkDataTags.registerTag({
        id: _Data_Constants_Tags_ChunkTagIds_js__WEBPACK_IMPORTED_MODULE_4__.ChunkTagIDs.heightMap,
        type: "bit-array",
        length: _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_2__.WorldSpaces.chunk.getHeight(),
    });
    ChunkDataTags.registerTag({
        id: _Data_Constants_Tags_ChunkTagIds_js__WEBPACK_IMPORTED_MODULE_4__.ChunkTagIDs.dirtyMap,
        type: "bit-array",
        length: _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_2__.WorldSpaces.chunk.getHeight(),
    });
    ChunkDataTags.registerTag({
        id: _Data_Constants_Tags_ChunkTagIds_js__WEBPACK_IMPORTED_MODULE_4__.ChunkTagIDs.voxelIDSegment,
        type: "typed-number-array",
        numberType: "16ui",
        length: _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_2__.WorldSpaces.chunk.getVolume(),
    });
    ChunkDataTags.registerTag({
        id: _Data_Constants_Tags_ChunkTagIds_js__WEBPACK_IMPORTED_MODULE_4__.ChunkTagIDs.voxelLightSegment,
        type: "typed-number-array",
        numberType: "16ui",
        length: _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_2__.WorldSpaces.chunk.getVolume(),
    });
    ChunkDataTags.registerTag({
        id: _Data_Constants_Tags_ChunkTagIds_js__WEBPACK_IMPORTED_MODULE_4__.ChunkTagIDs.voxelStateSegment,
        type: "typed-number-array",
        numberType: "16ui",
        length: _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_2__.WorldSpaces.chunk.getVolume(),
    });
    ChunkDataTags.registerTag({
        id: _Data_Constants_Tags_ChunkTagIds_js__WEBPACK_IMPORTED_MODULE_4__.ChunkTagIDs.voxelSecondaryIDSegment,
        type: "typed-number-array",
        numberType: "16ui",
        length: _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_2__.WorldSpaces.chunk.getVolume(),
    });
    const initData = ChunkDataTags.$INIT({
        indexBufferMode: "shared",
    });
    _Data_World_Chunk_ChunkTags_js__WEBPACK_IMPORTED_MODULE_0__.ChunkTags.$INIT(initData);
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/World/Data/Tags/ColumnTags.js":
/*!*************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/World/Data/Tags/ColumnTags.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ColumnDataTags": () => (/* binding */ ColumnDataTags),
/* harmony export */   "InitalizeColumnTags": () => (/* binding */ InitalizeColumnTags)
/* harmony export */ });
/* harmony import */ var divine_binary_tags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-binary-tags */ "../../DSLIBS/divineBinaryTags/dist/index.js");
/* harmony import */ var _Data_World_Column_ColumnTags_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Data/World/Column/ColumnTags.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/Column/ColumnTags.js");
/* harmony import */ var _Data_Constants_Tags_WorldDataTagIds_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Data/Constants/Tags/WorldDataTagIds.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Constants/Tags/WorldDataTagIds.js");



const ColumnDataTags = new divine_binary_tags__WEBPACK_IMPORTED_MODULE_0__.TagManager("column-tags");
ColumnDataTags.registerTag({
    id: _Data_Constants_Tags_WorldDataTagIds_js__WEBPACK_IMPORTED_MODULE_2__.WorldDataTagIDs.header,
    type: "header",
    numberType: "16ui",
});
ColumnDataTags.registerTag({
    id: _Data_Constants_Tags_WorldDataTagIds_js__WEBPACK_IMPORTED_MODULE_2__.WorldDataTagIDs.dataType,
    type: "header",
    numberType: "16ui",
});
ColumnDataTags.registerTag({
    id: _Data_Constants_Tags_WorldDataTagIds_js__WEBPACK_IMPORTED_MODULE_2__.WorldDataTagIDs.dimensionId,
    type: "typed-number",
    numberType: "16ui",
});
ColumnDataTags.registerTag({
    id: _Data_Constants_Tags_WorldDataTagIds_js__WEBPACK_IMPORTED_MODULE_2__.WorldDataTagIDs.positionX,
    type: "typed-number",
    numberType: "32i",
});
ColumnDataTags.registerTag({
    id: _Data_Constants_Tags_WorldDataTagIds_js__WEBPACK_IMPORTED_MODULE_2__.WorldDataTagIDs.positionY,
    type: "typed-number",
    numberType: "32i",
});
ColumnDataTags.registerTag({
    id: _Data_Constants_Tags_WorldDataTagIds_js__WEBPACK_IMPORTED_MODULE_2__.WorldDataTagIDs.positionZ,
    type: "typed-number",
    numberType: "32i",
});
ColumnDataTags.registerTag({
    id: "#dve_last_save_timestamp",
    type: "typed-number",
    numberType: "32ui",
});
ColumnDataTags.registerTag({
    id: "#dve_last_analyzer_update_timestamp",
    type: "typed-number",
    numberType: "32ui",
});
ColumnDataTags.registerTag({
    id: "#dve_has_rich_data",
    type: "boolean",
});
ColumnDataTags.registerTag({
    id: "#dve_has_entity_data",
    type: "boolean",
});
ColumnDataTags.registerTag({
    id: "#dve_is_stored",
    type: "boolean",
});
ColumnDataTags.registerTag({
    id: "#dve_is_world_gen_done",
    type: "boolean",
});
ColumnDataTags.registerTag({
    id: "#dve_is_world_decor_done",
    type: "boolean",
});
ColumnDataTags.registerTag({
    id: "#dve_is_world_sun_done",
    type: "boolean",
});
ColumnDataTags.registerTag({
    id: "#dve_is_world_propagation_done",
    type: "boolean",
});
ColumnDataTags.registerTag({
    id: "#dve_is_dirty",
    type: "boolean",
});
ColumnDataTags.registerTag({
    id: "#dve_persistent",
    type: "boolean",
});
function InitalizeColumnTags() {
    const initData = ColumnDataTags.$INIT({
        indexBufferMode: "shared",
    });
    _Data_World_Column_ColumnTags_js__WEBPACK_IMPORTED_MODULE_1__.ColumnTags.$INIT(initData);
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/World/Data/Tags/RegionTags.js":
/*!*************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/World/Data/Tags/RegionTags.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InitalizeRegionTags": () => (/* binding */ InitalizeRegionTags),
/* harmony export */   "RegionDataTags": () => (/* binding */ RegionDataTags),
/* harmony export */   "RegionHeaderTagManager": () => (/* binding */ RegionHeaderTagManager)
/* harmony export */ });
/* harmony import */ var _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Data/World/WorldSpaces.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldSpaces.js");
/* harmony import */ var _Data_World_Region_RegionTags_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Data/World/Region/RegionTags.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/Region/RegionTags.js");
/* harmony import */ var divine_binary_tags__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! divine-binary-tags */ "../../DSLIBS/divineBinaryTags/dist/index.js");
/* harmony import */ var _Data_Constants_Tags_WorldDataTagIds_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Data/Constants/Tags/WorldDataTagIds.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Constants/Tags/WorldDataTagIds.js");




const RegionDataTags = new divine_binary_tags__WEBPACK_IMPORTED_MODULE_2__.TagManager("region-tags");
RegionDataTags.registerTag({
    id: _Data_Constants_Tags_WorldDataTagIds_js__WEBPACK_IMPORTED_MODULE_3__.WorldDataTagIDs.header,
    type: "header",
    numberType: "16ui",
});
RegionDataTags.registerTag({
    id: _Data_Constants_Tags_WorldDataTagIds_js__WEBPACK_IMPORTED_MODULE_3__.WorldDataTagIDs.dataType,
    type: "header",
    numberType: "16ui",
});
RegionDataTags.registerTag({
    id: "#dve_total_players",
    type: "typed-number",
    numberType: "16ui",
});
RegionDataTags.registerTag({
    id: _Data_Constants_Tags_WorldDataTagIds_js__WEBPACK_IMPORTED_MODULE_3__.WorldDataTagIDs.dimensionId,
    type: "typed-number",
    numberType: "16ui",
});
RegionDataTags.registerTag({
    id: _Data_Constants_Tags_WorldDataTagIds_js__WEBPACK_IMPORTED_MODULE_3__.WorldDataTagIDs.positionX,
    type: "typed-number",
    numberType: "32i",
});
RegionDataTags.registerTag({
    id: _Data_Constants_Tags_WorldDataTagIds_js__WEBPACK_IMPORTED_MODULE_3__.WorldDataTagIDs.positionY,
    type: "typed-number",
    numberType: "32i",
});
RegionDataTags.registerTag({
    id: _Data_Constants_Tags_WorldDataTagIds_js__WEBPACK_IMPORTED_MODULE_3__.WorldDataTagIDs.positionZ,
    type: "typed-number",
    numberType: "32i",
});
const RegionHeaderTagManager = new divine_binary_tags__WEBPACK_IMPORTED_MODULE_2__.TagManager("region-header-tags");
function InitalizeRegionTags() {
    const initData = RegionDataTags.$INIT({
        indexBufferMode: "shared",
    });
    _Data_World_Region_RegionTags_js__WEBPACK_IMPORTED_MODULE_1__.RegionTags.$INIT(initData);
    RegionHeaderTagManager.registerTag({
        id: "#dved-column-sector-index",
        type: "typed-number-array",
        numberType: "16ui",
        length: _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_0__.WorldSpaces.region.getColumnVolume(),
    });
    RegionHeaderTagManager.registerTag({
        id: "#dved-column-legnth-index",
        type: "typed-number-array",
        numberType: "16ui",
        length: _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_0__.WorldSpaces.region.getColumnVolume(),
    });
    RegionHeaderTagManager.registerTag({
        id: "#dved-column-save-timestamp",
        type: "typed-number-array",
        numberType: "32ui",
        length: _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_0__.WorldSpaces.region.getColumnVolume(),
    });
    const headerInitData = RegionHeaderTagManager.$INIT({
        indexBufferMode: "shared",
    });
    _Data_World_Region_RegionTags_js__WEBPACK_IMPORTED_MODULE_1__.RegionHeaderTags.$INIT(headerInitData);
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/World/DivineVoxelEngineWorld.js":
/*!***************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/World/DivineVoxelEngineWorld.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DVEW": () => (/* binding */ DVEW)
/* harmony export */ });
/* harmony import */ var _Threads_WorldThreads_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Threads/WorldThreads.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Threads/WorldThreads.js");
/* harmony import */ var _Common_Queues_ConstructorQueues_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Common/Queues/ConstructorQueues.js */ "../../DSLIBS/divineVoxelEngine/dist/Common/Queues/ConstructorQueues.js");
/* harmony import */ var _Common_Tasks_ConstructorTasks_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Common/Tasks/ConstructorTasks.js */ "../../DSLIBS/divineVoxelEngine/dist/Common/Tasks/ConstructorTasks.js");
/* harmony import */ var _Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Data/Settings/EngineSettings.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Settings/EngineSettings.js");
/* harmony import */ var _Global_Util_helper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Global/Util.helper.js */ "../../DSLIBS/divineVoxelEngine/dist/Global/Util.helper.js");
/* harmony import */ var _Data_DataSync_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Data/DataSync.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Data/DataSync.js");
/* harmony import */ var _Data_DataManager_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Data/DataManager.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/DataManager.js");
/* harmony import */ var _Data_Managers_DataManagers_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Data/Managers/DataManagers.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Data/Managers/DataManagers.js");
/* harmony import */ var _Data_Generators_WorldDataGenerator_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Data/Generators/WorldDataGenerator.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Data/Generators/WorldDataGenerator.js");
/* harmony import */ var _Data_TagBuilders_VoxelTagBuilder_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Data/TagBuilders/VoxelTagBuilder.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Data/TagBuilders/VoxelTagBuilder.js");
/* harmony import */ var _Tools_Build_BuilderTool_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Tools/Build/BuilderTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Build/BuilderTool.js");
/* harmony import */ var _Tools_Brush_AdvancedBrushTool_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../Tools/Brush/AdvancedBrushTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Brush/AdvancedBrushTool.js");
/* harmony import */ var _Tools_Data_WorldData_ChunkDataTool_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../Tools/Data/WorldData/ChunkDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/WorldData/ChunkDataTool.js");
/* harmony import */ var _Tools_Data_WorldData_ColumnDataTool_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../Tools/Data/WorldData/ColumnDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/WorldData/ColumnDataTool.js");
/* harmony import */ var _Tools_Data_DataTool_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../Tools/Data/DataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/DataTool.js");
/* harmony import */ var _Tools_Tasks_TasksTool_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../Tools/Tasks/TasksTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Tasks/TasksTool.js");
/* harmony import */ var _Tools_Data_WorldData_HeightMapTool_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../Tools/Data/WorldData/HeightMapTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/WorldData/HeightMapTool.js");
/* harmony import */ var _Tools_Data_WorldData_RegionDataTool_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../Tools/Data/WorldData/RegionDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/WorldData/RegionDataTool.js");
/* harmony import */ var _Tools_Loader_DataLoaderTool_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../Tools/Loader/DataLoaderTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Loader/DataLoaderTool.js");
/* harmony import */ var _Init_InitWorldWorker_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./Init/InitWorldWorker.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Init/InitWorldWorker.js");
/* harmony import */ var threadcomm__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! threadcomm */ "../../DSLIBS/threadComm/dist/index.js");
/* harmony import */ var _Data_Tags_ChunkTags_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./Data/Tags/ChunkTags.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Data/Tags/ChunkTags.js");
/* harmony import */ var _Tasks_WorldTasks_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./Tasks/WorldTasks.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Tasks/WorldTasks.js");
/* harmony import */ var _Tools_Data_RichDataTool_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../Tools/Data/RichDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/RichDataTool.js");
/* harmony import */ var _Data_TagBuilders_SubstanceTagBuilder_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./Data/TagBuilders/SubstanceTagBuilder.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Data/TagBuilders/SubstanceTagBuilder.js");
//threads

//queues

//tasks

//objects


//data




//tags

//tools









//functions






/**# Divine Voxel Engine World
 * ---
 * This handles everything in the world worker context.
 */
const DVEW = {
    environment: "browser",
    TC: threadcomm__WEBPACK_IMPORTED_MODULE_20__.ThreadComm,
    UTIL: _Global_Util_helper_js__WEBPACK_IMPORTED_MODULE_4__.Util,
    settings: _Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_3__.EngineSettings,
    worldTasks: _Tasks_WorldTasks_js__WEBPACK_IMPORTED_MODULE_22__.WorldTasks,
    generators: {
        worldData: _Data_Generators_WorldDataGenerator_js__WEBPACK_IMPORTED_MODULE_8__.WorldDataGenerator,
    },
    data: _Data_DataManager_js__WEBPACK_IMPORTED_MODULE_6__.DataManager,
    dataSync: _Data_DataSync_js__WEBPACK_IMPORTED_MODULE_5__.DataSync,
    fxComm: _Threads_WorldThreads_js__WEBPACK_IMPORTED_MODULE_0__.FXComm,
    dataComm: _Threads_WorldThreads_js__WEBPACK_IMPORTED_MODULE_0__.DataComm,
    nexusComm: _Threads_WorldThreads_js__WEBPACK_IMPORTED_MODULE_0__.NexusComm,
    parentComm: _Threads_WorldThreads_js__WEBPACK_IMPORTED_MODULE_0__.ParentComm,
    ccm: _Threads_WorldThreads_js__WEBPACK_IMPORTED_MODULE_0__.CCM,
    richWorldComm: _Threads_WorldThreads_js__WEBPACK_IMPORTED_MODULE_0__.RichWorldComm,
    cQueues: _Common_Queues_ConstructorQueues_js__WEBPACK_IMPORTED_MODULE_1__.ConstructorQueues,
    cTasks: _Common_Tasks_ConstructorTasks_js__WEBPACK_IMPORTED_MODULE_2__.ConstructorTasks,
    dataRegister: {
        voxels: _Data_Managers_DataManagers_js__WEBPACK_IMPORTED_MODULE_7__.VoxelManager,
        substances: _Data_Managers_DataManagers_js__WEBPACK_IMPORTED_MODULE_7__.SubstanceManager,
    },
    tags: {
        voxels: _Data_TagBuilders_VoxelTagBuilder_js__WEBPACK_IMPORTED_MODULE_9__.VoxelTagBuilder,
        substances: _Data_TagBuilders_SubstanceTagBuilder_js__WEBPACK_IMPORTED_MODULE_24__.SubstanceTagBuilder,
        chunks: _Data_Tags_ChunkTags_js__WEBPACK_IMPORTED_MODULE_21__.ChunkDataTags,
    },
    async $INIT() {
        await (0,_Init_InitWorldWorker_js__WEBPACK_IMPORTED_MODULE_19__.InitWorldWorker)(this);
    },
    getAllTools() {
        return {
            brush: this.getBrush(),
            builder: this.getBuilder(),
            data: this.getDataTool(),
            chunkData: this.getChunkDataTool(),
            columnData: this.getColumnDataTool(),
            regonData: this.getRegionTool(),
            heightMap: this.getHeightMapTool(),
            tasks: this.getTasksTool(),
        };
    },
    getBrush() {
        return (0,_Tools_Brush_AdvancedBrushTool_js__WEBPACK_IMPORTED_MODULE_11__.GetAdvancedBrushTool)();
    },
    getBuilder() {
        return new _Tools_Build_BuilderTool_js__WEBPACK_IMPORTED_MODULE_10__.BuilderTool();
    },
    getDataTool() {
        return new _Tools_Data_DataTool_js__WEBPACK_IMPORTED_MODULE_14__.DataTool();
    },
    getRegionTool() {
        return new _Tools_Data_WorldData_RegionDataTool_js__WEBPACK_IMPORTED_MODULE_17__.RegionDataTool();
    },
    getChunkDataTool() {
        return new _Tools_Data_WorldData_ChunkDataTool_js__WEBPACK_IMPORTED_MODULE_12__.ChunkDataTool();
    },
    getColumnDataTool() {
        return new _Tools_Data_WorldData_ColumnDataTool_js__WEBPACK_IMPORTED_MODULE_13__.ColumnDataTool();
    },
    getHeightMapTool() {
        return new _Tools_Data_WorldData_HeightMapTool_js__WEBPACK_IMPORTED_MODULE_16__.HeightMapTool();
    },
    getTasksTool() {
        return new _Tools_Tasks_TasksTool_js__WEBPACK_IMPORTED_MODULE_15__.TaskTool();
    },
    getDataLoaderTool() {
        return new _Tools_Loader_DataLoaderTool_js__WEBPACK_IMPORTED_MODULE_18__.DataLoaderTool();
    },
    getRichDataTool() {
        return new _Tools_Data_RichDataTool_js__WEBPACK_IMPORTED_MODULE_23__.RichDataTool();
    },
};
DVEW.environment = _Global_Util_helper_js__WEBPACK_IMPORTED_MODULE_4__.Util.getEnviorment();
DVEW.TC.threadName = "world";


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/World/Hooks/Data/WorldDataHooks.js":
/*!******************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/World/Hooks/Data/WorldDataHooks.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RegisterDataHooks": () => (/* binding */ RegisterDataHooks)
/* harmony export */ });
/* harmony import */ var _Data_DataHooks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Data/DataHooks.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/DataHooks.js");
/* harmony import */ var _Data_Generators_WorldDataGenerator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Data/Generators/WorldDataGenerator.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Data/Generators/WorldDataGenerator.js");
/* harmony import */ var _Data_DataSync_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Data/DataSync.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Data/DataSync.js");
/* harmony import */ var _DivineVoxelEngineWorld_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../DivineVoxelEngineWorld.js */ "../../DSLIBS/divineVoxelEngine/dist/World/DivineVoxelEngineWorld.js");




const RegisterDataHooks = () => {
    const tasks = _DivineVoxelEngineWorld_js__WEBPACK_IMPORTED_MODULE_3__.DVEW.getTasksTool();
    let dataLoaderTool = null;
    if (_DivineVoxelEngineWorld_js__WEBPACK_IMPORTED_MODULE_3__.DVEW.settings.saveWorldData()) {
        dataLoaderTool = _DivineVoxelEngineWorld_js__WEBPACK_IMPORTED_MODULE_3__.DVEW.getDataLoaderTool();
    }
    /*
   [chunks]
   */
    _Data_DataHooks_js__WEBPACK_IMPORTED_MODULE_0__.DataHooks.chunk.onGetAsync.addToRun(async () => _Data_Generators_WorldDataGenerator_js__WEBPACK_IMPORTED_MODULE_1__.WorldDataGenerator.chunk.create());
    _Data_DataHooks_js__WEBPACK_IMPORTED_MODULE_0__.DataHooks.chunk.onGetSync.addToRun(() => _Data_Generators_WorldDataGenerator_js__WEBPACK_IMPORTED_MODULE_1__.WorldDataGenerator.chunk.create());
    _Data_DataHooks_js__WEBPACK_IMPORTED_MODULE_0__.DataHooks.chunk.onNew.addToRun(async (data) => {
        _Data_DataSync_js__WEBPACK_IMPORTED_MODULE_2__.DataSync.worldData.chunk.sync(data);
    });
    _Data_DataHooks_js__WEBPACK_IMPORTED_MODULE_0__.DataHooks.chunk.onRemove.addToRun((data) => {
        if (!dataLoaderTool) {
            _Data_DataSync_js__WEBPACK_IMPORTED_MODULE_2__.DataSync.worldData.chunk.unSync(data);
            return;
        }
        dataLoaderTool.setLocation(data).saveColumn(() => {
            _Data_DataSync_js__WEBPACK_IMPORTED_MODULE_2__.DataSync.worldData.chunk.unSync(data);
        });
    });
    /*
   [columns]
   */
    _Data_DataHooks_js__WEBPACK_IMPORTED_MODULE_0__.DataHooks.column.onGetAsync.addToRun(async () => _Data_Generators_WorldDataGenerator_js__WEBPACK_IMPORTED_MODULE_1__.WorldDataGenerator.column.create());
    _Data_DataHooks_js__WEBPACK_IMPORTED_MODULE_0__.DataHooks.column.onGetSync.addToRun(() => _Data_Generators_WorldDataGenerator_js__WEBPACK_IMPORTED_MODULE_1__.WorldDataGenerator.column.create());
    _Data_DataHooks_js__WEBPACK_IMPORTED_MODULE_0__.DataHooks.column.onNew.addToRun(async (data) => _Data_DataSync_js__WEBPACK_IMPORTED_MODULE_2__.DataSync.worldData.column.sync(data));
    _Data_DataHooks_js__WEBPACK_IMPORTED_MODULE_0__.DataHooks.column.onRemove.addToRun((data) => {
        if (!dataLoaderTool) {
            _Data_DataSync_js__WEBPACK_IMPORTED_MODULE_2__.DataSync.worldData.column.unSync(data);
            return;
        }
        dataLoaderTool.setLocation(data).saveColumn(() => {
            _Data_DataSync_js__WEBPACK_IMPORTED_MODULE_2__.DataSync.worldData.column.unSync(data);
        });
    });
    /*
   [region]
   */
    _Data_DataHooks_js__WEBPACK_IMPORTED_MODULE_0__.DataHooks.region.onGetAsync.addToRun(async () => _Data_Generators_WorldDataGenerator_js__WEBPACK_IMPORTED_MODULE_1__.WorldDataGenerator.region.create());
    _Data_DataHooks_js__WEBPACK_IMPORTED_MODULE_0__.DataHooks.region.onGetSync.addToRun(() => _Data_Generators_WorldDataGenerator_js__WEBPACK_IMPORTED_MODULE_1__.WorldDataGenerator.region.create());
    _Data_DataHooks_js__WEBPACK_IMPORTED_MODULE_0__.DataHooks.region.onNew.addToRun(async (data) => {
        _Data_DataSync_js__WEBPACK_IMPORTED_MODULE_2__.DataSync.worldData.region.sync(data);
    });
    _Data_DataHooks_js__WEBPACK_IMPORTED_MODULE_0__.DataHooks.region.onRemove.addToRun((data) => {
        if (!dataLoaderTool) {
            _Data_DataSync_js__WEBPACK_IMPORTED_MODULE_2__.DataSync.worldData.region.unSync(data);
            return;
        }
        dataLoaderTool.setLocation(data).saveRegion(() => {
            _Data_DataSync_js__WEBPACK_IMPORTED_MODULE_2__.DataSync.worldData.region.unSync(data);
        });
    });
    /*
   [paint]
   */
    _Data_DataHooks_js__WEBPACK_IMPORTED_MODULE_0__.DataHooks.paint.onRichVoxelPaint.addToRun((data) => {
        // DVEW.richWorldComm.setInitalData(data);
    });
    /*
   [dimensions]
   */
    _Data_DataHooks_js__WEBPACK_IMPORTED_MODULE_0__.DataHooks.dimension.onRegisterDimension.addToRun((data) => {
        _DivineVoxelEngineWorld_js__WEBPACK_IMPORTED_MODULE_3__.DVEW.cQueues.addQueue(data.id);
        _Data_DataSync_js__WEBPACK_IMPORTED_MODULE_2__.DataSync.worldData.dimesnion.sync(data.id);
    });
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/World/Init/InitWorldWorker.js":
/*!*************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/World/Init/InitWorldWorker.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InitWorldWorker": () => (/* binding */ InitWorldWorker)
/* harmony export */ });
/* harmony import */ var threadcomm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! threadcomm */ "../../DSLIBS/threadComm/dist/index.js");
/* harmony import */ var _Hooks_Data_WorldDataHooks_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Hooks/Data/WorldDataHooks.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Hooks/Data/WorldDataHooks.js");
/* harmony import */ var _Threads_WorldThreadState_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Threads/WorldThreadState.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Threads/WorldThreadState.js");
/* harmony import */ var _Data_DataSync_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Data/DataSync.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Data/DataSync.js");
/* harmony import */ var _Lock_WorldLock_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Lock/WorldLock.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Lock/WorldLock.js");
/* harmony import */ var _Tools_Loader_DataLoaderTool_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Tools/Loader/DataLoaderTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Loader/DataLoaderTool.js");






function InitWorldWorker(DVEW) {
    return new Promise(async (resolve) => {
        let parent = "render";
        if (DVEW.environment == "node") {
            parent = "server";
        }
        await threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.$INIT("world", parent);
        (0,_Hooks_Data_WorldDataHooks_js__WEBPACK_IMPORTED_MODULE_1__.RegisterDataHooks)();
        await DVEW.UTIL.createPromiseCheck({
            check: () => {
                return _Threads_WorldThreadState_js__WEBPACK_IMPORTED_MODULE_2__.WorldThreadState.isReady();
            },
            checkInterval: 1,
        });
        threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.registerTasks("sync-all-data", async () => {
            _Data_DataSync_js__WEBPACK_IMPORTED_MODULE_3__.DataSync.$INIT();
            await DVEW.ccm.__comms.map((comm) => comm.waitTillTasksExist("ready"));
            await Promise.all(DVEW.ccm.__comms.map((comm) => new Promise((resolve) => {
                comm.runPromiseTasks("ready", [], [], () => {
                    resolve(true);
                });
            })));
            resolve(true);
        });
        _Lock_WorldLock_js__WEBPACK_IMPORTED_MODULE_4__.WorldLock.$INIT(new _Tools_Loader_DataLoaderTool_js__WEBPACK_IMPORTED_MODULE_5__.DataLoaderTool());
    });
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/World/Lock/WorldLock.js":
/*!*******************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/World/Lock/WorldLock.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WorldLock": () => (/* binding */ WorldLock)
/* harmony export */ });
/* harmony import */ var _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Data/World/WorldRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldRegister.js");
/* harmony import */ var _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Data/World/WorldSpaces.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldSpaces.js");
/* harmony import */ var _Global_Util_UtilMap_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Global/Util/UtilMap.js */ "../../DSLIBS/divineVoxelEngine/dist/Global/Util/UtilMap.js");
/* harmony import */ var _Global_Util_SafeInterval_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Global/Util/SafeInterval.js */ "../../DSLIBS/divineVoxelEngine/dist/Global/Util/SafeInterval.js");




const WorldLock = {
    locks: new _Global_Util_UtilMap_js__WEBPACK_IMPORTED_MODULE_2__.UtilMap(),
    dataLoader: {},
    $INIT(dataLoaderTool) {
        this.dataLoader = dataLoaderTool;
    },
    _loadMap: new _Global_Util_UtilMap_js__WEBPACK_IMPORTED_MODULE_2__.UtilMap(),
    addLock(data) {
        return new Promise((resolve) => {
            this.locks.add([[data.toString(), data]]);
            const [dim, [ssx, ssy, ssz], [esx, esy, esz]] = data;
            const [a, sx, sy, sz] = _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_1__.WorldSpaces.column.getLocationXYZ(ssx, ssy, ssz);
            const [b, ex, ey, ez] = _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_1__.WorldSpaces.column.getLocationXYZ(esx, esy, esz);
            const run = () => {
                let allFound = true;
                for (let y = sy; y < ey; y += _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_1__.WorldSpaces.column._bounds.y) {
                    for (let x = sx; x < ex; x += _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_1__.WorldSpaces.column._bounds.x) {
                        for (let z = sz; z < ez; z += _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_1__.WorldSpaces.column._bounds.z) {
                            const location = [
                                ..._Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_1__.WorldSpaces.column.getLocationXYZ(x, y, z),
                            ];
                            location[0] = dim;
                            if (_Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_0__.WorldRegister.column.get(location))
                                continue;
                            allFound = false;
                            if (!this.dataLoader.isEnabled()) {
                                _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_0__.WorldRegister.column.fill(location);
                                continue;
                            }
                            const key = location.toString();
                            if (this._loadMap.has(key))
                                continue;
                            this._loadMap.set(key, true);
                            this.dataLoader.setLocation(location).loadIfExists((loaded) => {
                                this._loadMap.remove(key);
                                if (_Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_0__.WorldRegister.column.get(location))
                                    return;
                                if (!loaded) {
                                    _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_0__.WorldRegister.column.fill(location);
                                }
                            });
                        }
                    }
                }
                return allFound;
            };
            if (run())
                return resolve(true);
            const inte = new _Global_Util_SafeInterval_js__WEBPACK_IMPORTED_MODULE_3__.SafeInterval().setInterval(100).setOnRun(() => {
                if (run()) {
                    inte.stop();
                    resolve(true);
                }
            });
            inte.start();
        });
    },
    removeLock(data) {
        this.locks.remove(data.toString());
    },
    isLocked([sdim, x, y, z]) {
        let locked = false;
        for (const [key, [dim, [sx, sy, sz], [ex, ey, ez]]] of this.locks._map) {
            if (dim != sdim)
                continue;
            if (x >= sx && y >= sy && z >= sz && x <= ex && y <= ey && z <= ez)
                continue;
            locked = true;
            break;
        }
        return locked;
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/World/Tasks/WorldTasks.js":
/*!*********************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/World/Tasks/WorldTasks.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WorldTasks": () => (/* binding */ WorldTasks)
/* harmony export */ });
/* harmony import */ var threadcomm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! threadcomm */ "../../DSLIBS/threadComm/dist/index.js");
/* harmony import */ var _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Data/World/WorldRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldRegister.js");
/* harmony import */ var _Data_Generators_WorldDataGenerator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Data/Generators/WorldDataGenerator.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Data/Generators/WorldDataGenerator.js");
/* harmony import */ var _Data_DataSync_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Data/DataSync.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Data/DataSync.js");
/* harmony import */ var _Tools_Data_WorldData_RegionDataTool_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Tools/Data/WorldData/RegionDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/WorldData/RegionDataTool.js");
/* harmony import */ var _Tools_Data_WorldData_ColumnDataTool_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Tools/Data/WorldData/ColumnDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/WorldData/ColumnDataTool.js");
/* harmony import */ var _Tools_Data_WorldData_ChunkDataTool_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Tools/Data/WorldData/ChunkDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/WorldData/ChunkDataTool.js");
/* harmony import */ var _Data_World_Region_RegionHeaderRegister_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../Data/World/Region/RegionHeaderRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/Region/RegionHeaderRegister.js");
/* harmony import */ var _Tools_Loader_DataLoaderTool_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../Tools/Loader/DataLoaderTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Loader/DataLoaderTool.js");
/* harmony import */ var _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../Data/World/WorldSpaces.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldSpaces.js");
/* harmony import */ var _Tools_Build_BuilderTool_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../Tools/Build/BuilderTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Build/BuilderTool.js");
/* harmony import */ var _Lock_WorldLock_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../Lock/WorldLock.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Lock/WorldLock.js");

//data











const regionTool = new _Tools_Data_WorldData_RegionDataTool_js__WEBPACK_IMPORTED_MODULE_4__.RegionDataTool();
const columnTool = new _Tools_Data_WorldData_ColumnDataTool_js__WEBPACK_IMPORTED_MODULE_5__.ColumnDataTool();
const chunkTool = new _Tools_Data_WorldData_ChunkDataTool_js__WEBPACK_IMPORTED_MODULE_6__.ChunkDataTool();
const dataLoaderTool = new _Tools_Loader_DataLoaderTool_js__WEBPACK_IMPORTED_MODULE_8__.DataLoaderTool();
const builderTool = new _Tools_Build_BuilderTool_js__WEBPACK_IMPORTED_MODULE_10__.BuilderTool();
const loadInMap = new Map();
const WorldTasks = {
    addChunk: threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.registerTasks("add-chunk", (location) => {
        const chunk = _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_1__.WorldRegister.chunk.get(location);
        if (chunk) {
            _Data_DataSync_js__WEBPACK_IMPORTED_MODULE_3__.DataSync.worldData.chunk.sync(location);
            return;
        }
        if (dataLoaderTool.isEnabled()) {
            _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_9__.WorldSpaces.column.getPositionLocation(location);
            const columnLocation = [..._Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_9__.WorldSpaces.column.getLocation()];
            if (loadInMap.has(columnLocation.toString()))
                return;
            loadInMap.set(columnLocation.toString(), true);
            dataLoaderTool.setLocation(columnLocation).loadIfExists((success) => {
                loadInMap.delete(columnLocation.toString());
                if (!success) {
                    builderTool.setLocation(columnLocation).fillColumn();
                }
            });
            return;
        }
        if (!chunk) {
            _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_1__.WorldRegister.chunk.add(location, _Data_Generators_WorldDataGenerator_js__WEBPACK_IMPORTED_MODULE_2__.WorldDataGenerator.chunk.create());
        }
    }),
    worldAlloc: threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.registerTasks("world-alloc", async (data, onDone) => {
        await _Lock_WorldLock_js__WEBPACK_IMPORTED_MODULE_11__.WorldLock.addLock(data);
        if (onDone)
            onDone();
    }, "deferred"),
    worldDealloc: threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.registerTasks("world-dealloc", async (data, onDone) => {
        await _Lock_WorldLock_js__WEBPACK_IMPORTED_MODULE_11__.WorldLock.removeLock(data);
        if (onDone)
            onDone();
    }, "deferred"),
    unLoad: {
        unLoadColumn: threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.registerTasks("unload-column", (data, onDone) => {
            if (_Lock_WorldLock_js__WEBPACK_IMPORTED_MODULE_11__.WorldLock.isLocked(data))
                return onDone ? onDone(false) : 0;
            _Data_DataSync_js__WEBPACK_IMPORTED_MODULE_3__.DataSync.worldData.column.unSync(data);
            _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_1__.WorldRegister.column.remove(data);
            const region = _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_1__.WorldRegister.region.get(data);
            if (region && region.columns.size == 0) {
                _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_1__.WorldRegister.region.remove(data);
                _Data_DataSync_js__WEBPACK_IMPORTED_MODULE_3__.DataSync.worldData.region.unSync(data);
            }
            return onDone ? onDone(true) : 0;
        }, "deferred"),
    },
    load: {
        loadRegino: threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.registerTasks("load-region", ([location, sab]) => {
            regionTool.setBuffer(sab);
            const sl = regionTool.getLocationData();
            sl[0] = location[0];
            _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_1__.WorldRegister.region.add(sl, sab);
            _Data_DataSync_js__WEBPACK_IMPORTED_MODULE_3__.DataSync.worldData.region.sync(sl);
        }),
        loadReginoHeader: threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.registerTasks("load-region-header", (data) => {
            _Data_World_Region_RegionHeaderRegister_js__WEBPACK_IMPORTED_MODULE_7__.RegionHeaderRegister.add(data[0], data[1]);
            const location = data[0];
            _Data_DataSync_js__WEBPACK_IMPORTED_MODULE_3__.DataSync.worldData.regionHeader.sync(location);
        }),
        loadColumn: threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.registerTasks("load-column", ([location, sab]) => {
            columnTool.setBuffer(sab);
            const sl = columnTool.getLocationData();
            sl[0] = location[0];
            _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_1__.WorldRegister.column.add(sl, sab);
            _Data_DataSync_js__WEBPACK_IMPORTED_MODULE_3__.DataSync.worldData.column.sync(sl);
        }),
        loadChunk: threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.registerTasks("load-chunk", ([location, sab]) => {
            chunkTool.setBuffer(sab);
            const sl = chunkTool.getLocationData();
            sl[0] = location[0];
            _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_1__.WorldRegister.chunk.add(sl, sab);
            _Data_DataSync_js__WEBPACK_IMPORTED_MODULE_3__.DataSync.worldData.chunk.sync(sl);
        }),
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/World/Threads/WorldThreadState.js":
/*!*****************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/World/Threads/WorldThreadState.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WorldThreadState": () => (/* binding */ WorldThreadState)
/* harmony export */ });
const WorldThreadState = {
    _settingsSynced: false,
    isReady() {
        return this._settingsSynced;
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/World/Threads/WorldThreads.js":
/*!*************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/World/Threads/WorldThreads.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CCM": () => (/* binding */ CCM),
/* harmony export */   "DataComm": () => (/* binding */ DataComm),
/* harmony export */   "FXComm": () => (/* binding */ FXComm),
/* harmony export */   "NexusComm": () => (/* binding */ NexusComm),
/* harmony export */   "ParentComm": () => (/* binding */ ParentComm),
/* harmony export */   "RichWorldComm": () => (/* binding */ RichWorldComm)
/* harmony export */ });
/* harmony import */ var _Data_DataSync_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Data/DataSync.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Data/DataSync.js");
/* harmony import */ var threadcomm___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! threadcomm/ */ "../../DSLIBS/threadComm/dist/index.js");
/* harmony import */ var _Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Data/Settings/EngineSettings.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Settings/EngineSettings.js");
/* harmony import */ var _WorldThreadState_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./WorldThreadState.js */ "../../DSLIBS/divineVoxelEngine/dist/World/Threads/WorldThreadState.js");
/* harmony import */ var _Data_DataHooks_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Data/DataHooks.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/DataHooks.js");





const CCM = threadcomm___WEBPACK_IMPORTED_MODULE_1__.ThreadComm.createCommManager({
    name: "constructor",
    onPortSet(port, commName) { },
});
_Data_DataSync_js__WEBPACK_IMPORTED_MODULE_0__.DataSync.registerComm(CCM);
const DataComm = threadcomm___WEBPACK_IMPORTED_MODULE_1__.ThreadComm.createComm("data-loader", {});
_Data_DataSync_js__WEBPACK_IMPORTED_MODULE_0__.DataSync.registerComm(DataComm);
const FXComm = threadcomm___WEBPACK_IMPORTED_MODULE_1__.ThreadComm.createComm("fx");
_Data_DataSync_js__WEBPACK_IMPORTED_MODULE_0__.DataSync.registerComm(FXComm);
const NexusComm = threadcomm___WEBPACK_IMPORTED_MODULE_1__.ThreadComm.createComm("nexus");
_Data_DataSync_js__WEBPACK_IMPORTED_MODULE_0__.DataSync.registerComm(NexusComm, {
    materials: true,
    colliders: true,
});
const RichWorldComm = threadcomm___WEBPACK_IMPORTED_MODULE_1__.ThreadComm.createComm("rich-world");
_Data_DataSync_js__WEBPACK_IMPORTED_MODULE_0__.DataSync.registerComm(RichWorldComm);
const ParentComm = threadcomm___WEBPACK_IMPORTED_MODULE_1__.ThreadComm.parent;
_Data_DataSync_js__WEBPACK_IMPORTED_MODULE_0__.DataSync.registerComm(ParentComm);
threadcomm___WEBPACK_IMPORTED_MODULE_1__.ThreadComm.registerTasks("sync-settings", (settings) => {
    _Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_2__.EngineSettings.syncSettings(settings);
    _WorldThreadState_js__WEBPACK_IMPORTED_MODULE_3__.WorldThreadState._settingsSynced = true;
    _Data_DataHooks_js__WEBPACK_IMPORTED_MODULE_4__.DataHooks.settingsSynced.run(settings);
});


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/World/index.js":
/*!**********************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/World/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DVEW": () => (/* reexport safe */ _DivineVoxelEngineWorld_js__WEBPACK_IMPORTED_MODULE_0__.DVEW)
/* harmony export */ });
/* harmony import */ var _DivineVoxelEngineWorld_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DivineVoxelEngineWorld.js */ "../../DSLIBS/divineVoxelEngine/dist/World/DivineVoxelEngineWorld.js");



/***/ }),

/***/ "../../DSLIBS/dvePlugIns/Player/dist/Data/SetUpPlayerData.js":
/*!*******************************************************************!*\
  !*** ../../DSLIBS/dvePlugIns/Player/dist/Data/SetUpPlayerData.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SetUpPlayerData": () => (/* binding */ SetUpPlayerData)
/* harmony export */ });
/* harmony import */ var _Data_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Data/index.js */ "../../DSLIBS/dvePlugIns/Player/dist/Data/index.js");

async function SetUpPlayerData(DVE) {
    let playerDataReady = false;
    DVE.TC.registerTasks("connect-player-tags", (data) => {
        _Data_index_js__WEBPACK_IMPORTED_MODULE_0__.PlayerManager.physics = new _Data_index_js__WEBPACK_IMPORTED_MODULE_0__.PlayerPhysicsData(data[0], data[1]);
        _Data_index_js__WEBPACK_IMPORTED_MODULE_0__.PlayerManager.stats = new _Data_index_js__WEBPACK_IMPORTED_MODULE_0__.PlayerStatsData(data[2], data[3]);
        playerDataReady = true;
    });
    await DVE.UTIL.createPromiseCheck({
        check: () => {
            return playerDataReady;
        },
        checkInterval: 1,
    });
}


/***/ }),

/***/ "../../DSLIBS/dvePlugIns/Player/dist/Data/index.js":
/*!*********************************************************!*\
  !*** ../../DSLIBS/dvePlugIns/Player/dist/Data/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$RegisterPlayerData": () => (/* reexport safe */ _RegisterPlayerData_js__WEBPACK_IMPORTED_MODULE_3__.$RegisterPlayerData),
/* harmony export */   "PlayerManager": () => (/* reexport safe */ _PlayerManager_js__WEBPACK_IMPORTED_MODULE_0__.PlayerManager),
/* harmony export */   "PlayerPhysicsData": () => (/* reexport safe */ _PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_1__.PlayerPhysicsData),
/* harmony export */   "PlayerPhysicsStatesValues": () => (/* reexport safe */ _PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_1__.PlayerPhysicsStatesValues),
/* harmony export */   "PlayerPhysicsTagIDs": () => (/* reexport safe */ _PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_1__.PlayerPhysicsTagIDs),
/* harmony export */   "PlayerPhysicsTags": () => (/* reexport safe */ _PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_1__.PlayerPhysicsTags),
/* harmony export */   "PlayerStatsData": () => (/* reexport safe */ _PlayerStatsData_js__WEBPACK_IMPORTED_MODULE_2__.PlayerStatsData),
/* harmony export */   "PlayerStatsTagIDs": () => (/* reexport safe */ _PlayerStatsData_js__WEBPACK_IMPORTED_MODULE_2__.PlayerStatsTagIDs),
/* harmony export */   "PlayerStatsTags": () => (/* reexport safe */ _PlayerStatsData_js__WEBPACK_IMPORTED_MODULE_2__.PlayerStatsTags)
/* harmony export */ });
/* harmony import */ var _PlayerManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PlayerManager.js */ "../../DSLIBS/dvePlugIns/Player/dist/Data/PlayerManager.js");
/* harmony import */ var _PlayerPhysicsData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PlayerPhysicsData.js */ "../../DSLIBS/dvePlugIns/Player/dist/Data/PlayerPhysicsData.js");
/* harmony import */ var _PlayerStatsData_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PlayerStatsData.js */ "../../DSLIBS/dvePlugIns/Player/dist/Data/PlayerStatsData.js");
/* harmony import */ var _RegisterPlayerData_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RegisterPlayerData.js */ "../../DSLIBS/dvePlugIns/Player/dist/Data/RegisterPlayerData.js");






/***/ }),

/***/ "../../DSLIBS/dvePlugIns/Player/dist/World/InitWorldPlayer.js":
/*!********************************************************************!*\
  !*** ../../DSLIBS/dvePlugIns/Player/dist/World/InitWorldPlayer.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "INIT_WORLD_PLAYER": () => (/* binding */ INIT_WORLD_PLAYER)
/* harmony export */ });
/* harmony import */ var _Data_SetUpPlayerData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Data/SetUpPlayerData.js */ "../../DSLIBS/dvePlugIns/Player/dist/Data/SetUpPlayerData.js");
/* harmony import */ var _Data_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Data/index.js */ "../../DSLIBS/dvePlugIns/Player/dist/Data/index.js");
/* harmony import */ var _WorldPlayer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WorldPlayer.js */ "../../DSLIBS/dvePlugIns/Player/dist/World/WorldPlayer.js");



const INIT_WORLD_PLAYER = async (DVEW) => {
    await (0,_Data_SetUpPlayerData_js__WEBPACK_IMPORTED_MODULE_0__.SetUpPlayerData)(DVEW);
    return new _WorldPlayer_js__WEBPACK_IMPORTED_MODULE_2__.WorldPlayer(DVEW, _Data_index_js__WEBPACK_IMPORTED_MODULE_1__.PlayerManager);
};


/***/ }),

/***/ "../../DSLIBS/dvePlugIns/Player/dist/World/WorldPlayer.js":
/*!****************************************************************!*\
  !*** ../../DSLIBS/dvePlugIns/Player/dist/World/WorldPlayer.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WorldPlayer": () => (/* binding */ WorldPlayer)
/* harmony export */ });
/* harmony import */ var divine_voxel_engine_Math_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-voxel-engine/Math/index.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/index.js");

class WorldPlayer {
    DVEW;
    manager;
    start = {
        x: 0,
        y: 0,
        z: 0,
    };
    end = {
        x: 0,
        y: 0,
        z: 0,
    };
    reachDistance = 10;
    dataTool;
    constructor(DVEW, manager) {
        this.DVEW = DVEW;
        this.manager = manager;
        this.dataTool = DVEW.getDataTool();
    }
    hooks = {
        onVoxelPickCheck: {
            _funcs: [],
            add(run) {
                this._funcs.push(run);
            },
            run(data) {
                let add = true;
                this._funcs.forEach((_) => {
                    add = _(data);
                });
                return add;
            },
        },
    };
    update() {
        this.start.x = this.manager.physics.position.x;
        this.start.y =
            this.manager.physics.position.y + this.manager.physics.eyeLevel;
        this.start.z = this.manager.physics.position.z;
        this.end.x =
            this.manager.physics.direction.x * this.reachDistance + this.start.x;
        this.end.y =
            this.manager.physics.direction.y * this.reachDistance + this.start.y;
        this.end.z =
            this.manager.physics.direction.z * this.reachDistance + this.start.z;
        let count = 0;
        const voxels = (0,divine_voxel_engine_Math_index_js__WEBPACK_IMPORTED_MODULE_0__.VisitAll)(this.start, this.end, () => {
            count++;
            if (count > 100)
                return false;
            return true;
        });
        let foundVoxel = false;
        for (let i = 0; i < voxels.length; i += 3) {
            const x = voxels[i];
            const y = voxels[i + 1];
            const z = voxels[i + 2];
            if (!this.dataTool.loadInAt(x, y, z))
                continue;
            if (!this.hooks.onVoxelPickCheck.run(this.dataTool))
                continue;
            if (this.dataTool.isRenderable()) {
                this.manager.physics.pick.position.x = x;
                this.manager.physics.pick.position.y = y;
                this.manager.physics.pick.position.z = z;
                foundVoxel = true;
                break;
            }
        }
        if (!foundVoxel)
            this.manager.physics.pick.position.set(-Infinity, 0, 0);
    }
}


/***/ }),

/***/ "../../DSLIBS/dvePlugIns/Player/dist/World/index.js":
/*!**********************************************************!*\
  !*** ../../DSLIBS/dvePlugIns/Player/dist/World/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "INIT_WORLD_PLAYER": () => (/* reexport safe */ _InitWorldPlayer_js__WEBPACK_IMPORTED_MODULE_1__.INIT_WORLD_PLAYER),
/* harmony export */   "WorldPlayer": () => (/* reexport safe */ _WorldPlayer_js__WEBPACK_IMPORTED_MODULE_0__.WorldPlayer)
/* harmony export */ });
/* harmony import */ var _WorldPlayer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WorldPlayer.js */ "../../DSLIBS/dvePlugIns/Player/dist/World/WorldPlayer.js");
/* harmony import */ var _InitWorldPlayer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InitWorldPlayer.js */ "../../DSLIBS/dvePlugIns/Player/dist/World/InitWorldPlayer.js");




/***/ }),

/***/ "./node_modules/simloop/SimulationLoop.js":
/*!************************************************!*\
  !*** ./node_modules/simloop/SimulationLoop.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SimulationLoop": () => (/* binding */ SimulationLoop)
/* harmony export */ });
const SimulationLoop = {
    speed: 0,
    _delta: 0,
    _previous: 0,
    _performance: {},
    _intervals: new Map(),
    async $INIT(speed) {
        this.speed = speed;
        if (performance) {
            this._performance = performance;
        }
        else {
            //@ts-ignore
            if (require) {
                //@ts-ignore
                this._performance = require("perf_hooks").performance;
            }
            else {
                //@ts-ignore
                this._performance = (await Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(__webpack_require__, /*! perf_hooks */ "perf_hooks", 19))).performance;
            }
        }
        this._previous = this._performance.now();
    },
    _round(n) {
        const d = Math.floor(n / 10) * 10;
        if (d < 10)
            return 10;
        return d;
    },
    registerInterval(interval) {
        this._intervals.set(this._round(interval), {
            delta: 0,
            functions: [],
        });
    },
    addToInterval(interval, run) {
        const inte = this._intervals.get(this._round(interval));
        if (!inte)
            return;
        inte.functions.push(run);
    },
    run() {
        const n = this._performance.now();
        this._delta = n - this._previous;
        this._previous = n;
        const roundedDelta = this._round(this._delta);
        for (const [inte, data] of this._intervals) {
            if (inte < roundedDelta) {
                data.functions.forEach((_) => _());
                continue;
            }
            if (data.delta + roundedDelta >= inte) {
                data.functions.forEach((_) => _(data.delta + roundedDelta));
                data.delta = 0;
                continue;
            }
            if (data.delta < inte) {
                data.delta += roundedDelta;
            }
        }
        setTimeout(() => {
            this.run();
        }, this.speed / 2);
    },
};


/***/ }),

/***/ "./node_modules/simloop/index.js":
/*!***************************************!*\
  !*** ./node_modules/simloop/index.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SimulationLoop": () => (/* reexport safe */ _SimulationLoop_js__WEBPACK_IMPORTED_MODULE_0__.SimulationLoop)
/* harmony export */ });
/* harmony import */ var _SimulationLoop_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SimulationLoop.js */ "./node_modules/simloop/SimulationLoop.js");



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	__webpack_require__.x = () => {
/******/ 		// Load entry module and return exports
/******/ 		// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, ["DSLIBS_divineBinaryObject_dist_index_js-DSLIBS_divineVoxelEngine_dist_Common_Threads_Contract-5324f4","DSLIBS_divineVoxelEngine_dist_Math_index_js-DSLIBS_divineVoxelEngine_dist_Tools_Data_RichData-f07748","DSLIBS_dvePlugIns_Player_dist_Data_PlayerManager_js-DSLIBS_dvePlugIns_Player_dist_Data_Regist-d31b5c"], () => (__webpack_require__("./compiled/client/World/world.js")))
/******/ 		__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 		return __webpack_exports__;
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && !queue.d) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = 1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks and sibling chunks for the entrypoint
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".DVE.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/importScripts chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "already loaded"
/******/ 		var installedChunks = {
/******/ 			"compiled_client_World_world_js": 1
/******/ 		};
/******/ 		
/******/ 		// importScripts chunk loading
/******/ 		var installChunk = (data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			while(chunkIds.length)
/******/ 				installedChunks[chunkIds.pop()] = 1;
/******/ 			parentChunkLoadingFunction(data);
/******/ 		};
/******/ 		__webpack_require__.f.i = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					importScripts(__webpack_require__.p + __webpack_require__.u(chunkId));
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkdve_testing"] = self["webpackChunkdve_testing"] || [];
/******/ 		var parentChunkLoadingFunction = chunkLoadingGlobal.push.bind(chunkLoadingGlobal);
/******/ 		chunkLoadingGlobal.push = installChunk;
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/startup chunk dependencies */
/******/ 	(() => {
/******/ 		var next = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			return Promise.all(["DSLIBS_divineBinaryObject_dist_index_js-DSLIBS_divineVoxelEngine_dist_Common_Threads_Contract-5324f4","DSLIBS_divineVoxelEngine_dist_Math_index_js-DSLIBS_divineVoxelEngine_dist_Tools_Data_RichData-f07748","DSLIBS_dvePlugIns_Player_dist_Data_PlayerManager_js-DSLIBS_dvePlugIns_Player_dist_Data_Regist-d31b5c"].map(__webpack_require__.e, __webpack_require__)).then(next);
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	
/******/ })()
;
//# sourceMappingURL=compiled_client_World_world_js.DVE.js.map