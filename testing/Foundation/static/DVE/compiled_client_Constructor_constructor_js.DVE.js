/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./compiled/client/Constructor/constructor.js":
/*!****************************************************!*\
  !*** ./compiled/client/Constructor/constructor.js ***!
  \****************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_data_client_Functions_RegisterVoxelConstructors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/data/client/Functions/RegisterVoxelConstructors.js */ "./compiled/core/data/client/Functions/RegisterVoxelConstructors.js");
/* harmony import */ var divine_voxel_engine_Constructor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! divine-voxel-engine/Constructor */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/index.js");
/* harmony import */ var _core_Gen_WorldGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/Gen/WorldGenerator */ "./compiled/core/Gen/WorldGenerator.js");



(0,_core_data_client_Functions_RegisterVoxelConstructors_js__WEBPACK_IMPORTED_MODULE_0__.$RegisterVoxelConstructors)(divine_voxel_engine_Constructor__WEBPACK_IMPORTED_MODULE_1__.DVEC);
divine_voxel_engine_Constructor__WEBPACK_IMPORTED_MODULE_1__.DVEC.worldGen.setWorldGen(_core_Gen_WorldGenerator__WEBPACK_IMPORTED_MODULE_2__.WorldGenerator);
await divine_voxel_engine_Constructor__WEBPACK_IMPORTED_MODULE_1__.DVEC.$INIT();

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ }),

/***/ "./compiled/core/Gen/Dimensions/Main/MainWorldGen.js":
/*!***********************************************************!*\
  !*** ./compiled/core/Gen/Dimensions/Main/MainWorldGen.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MainWorldGen": () => (/* binding */ MainWorldGen)
/* harmony export */ });
/* harmony import */ var divine_voxel_engine_Constructor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-voxel-engine/Constructor */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/index.js");
/* harmony import */ var divine_voxel_engine_Math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! divine-voxel-engine/Math */ "../../DSLIBS/divineVoxelEngine/dist/Math/index.js");
/* harmony import */ var divine_rng__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! divine-rng */ "../../DSLIBS/divineRNG/dist/index.js");
/* harmony import */ var _Structures_Temples_DimensoinTemple_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Structures/Temples/DimensoinTemple.js */ "./compiled/core/Gen/Structures/Temples/DimensoinTemple.js");
/* harmony import */ var _Functions_Tree_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Functions/Tree.js */ "./compiled/core/Gen/Functions/Tree.js");






const perlin = new divine_rng__WEBPACK_IMPORTED_MODULE_2__.PerlinNoise3d();
const perlin2 = new divine_rng__WEBPACK_IMPORTED_MODULE_2__.PerlinNoise3d();
const bioneNoise = new divine_rng__WEBPACK_IMPORTED_MODULE_2__.PerlinNoise3d();
/*
perlin.noiseSeed(12341234);
perlin2.noiseSeed(989989989);
bioneNoise.noiseSeed(59695022384);
*/
const indexRNG = new divine_rng__WEBPACK_IMPORTED_MODULE_2__.IndexedRNG(2934782394782372);
perlin.noiseSeed(2934782394782372);
perlin2.noiseSeed(89898778990878798);
bioneNoise.noiseSeed(7890878787788789987);
const waveLength = 100;
const xOffSet = 1_000;
const zOffSet = 1_000;
const brush = divine_voxel_engine_Constructor__WEBPACK_IMPORTED_MODULE_0__.DVEC.worldGen.getBrush();
const dataTool = brush._dt;
const elysianDimensionVoxels = {
    stone: "ecd_elysian_stone",
    grass: "ecd_elysian_grass",
    water: "ecd_elysian_ether",
    vine: "ecd_elysian_hangingvine",
};
const inNoiseRange = (x, y, z) => {
    if (y > 128)
        return false;
    const r = perlin2.get((x + xOffSet) / 14, y / 20, (z + zOffSet) / 14) * 0.2;
    if (y > 30) {
        const n = perlin2.get((x + xOffSet) / 100, y / 100, (z + zOffSet) / 100) *
            (MainWorldGen.height + 50);
        return r > 0.1 && r < 0.8 && y <= n;
    }
    const n = perlin2.get((x + xOffSet) / 50, y / 100, (z + zOffSet) / 200) * 50;
    return y <= n || (r > 0.1 && r < 0.8);
};
const MainWorldGen = {
    depth: 16,
    width: 16,
    height: 128,
    generateCircle(vox, x, y, z, radius, skipCenter = false, noDestory = false) {
        let rx = x - radius;
        let rz = z - radius;
        brush.setId(vox);
        for (let ix = rx; ix <= x + radius; ix++) {
            for (let iz = rz; iz <= z + radius; iz++) {
                if (skipCenter) {
                    if (ix == x && iz == z)
                        continue;
                }
                if (noDestory) {
                    if (dataTool.loadInAt(ix, y, iz)) {
                        if (dataTool.isRenderable())
                            continue;
                    }
                }
                if (divine_voxel_engine_Math__WEBPACK_IMPORTED_MODULE_1__.VoxelMath.distance2D(ix, x, iz, z) < radius) {
                    brush.setXYZ(ix, y, iz).paint();
                }
            }
        }
    },
    generate([dimension, columnX, columnY, columnZ], data) {
        brush.setDimension(dimension).start();
        let makeTeple = false;
        let madeTemple = false;
        let makeVine = false;
        let makeWaterFall = false;
        let templeFlip = indexRNG.get(columnX * (columnY + 3) * columnZ);
        if (templeFlip > 0.98 && !madeTemple) {
            makeTeple = true;
            madeTemple = true;
        }
        const dataTool = brush._dt;
        let totalTrees = 0;
        for (let x = columnX; x < this.width + columnX; x++) {
            for (let z = columnZ; z < this.depth + columnZ; z++) {
                let voxels = elysianDimensionVoxels;
                let flip = indexRNG.get(x * (columnY + 1) * z);
                let vineHeight = 0;
                makeVine = false;
                makeWaterFall = false;
                if (flip > 0.97 && inNoiseRange(x, this.height - 10, z)) {
                    vineHeight = (50 * Math.random()) >> 0;
                    makeVine = true;
                }
                flip = indexRNG.get(x * (columnY + 2) * z);
                if (flip > 0.99 && !makeVine && inNoiseRange(x, this.height - 10, z)) {
                    makeWaterFall = true;
                }
                for (let y = 0; y < this.height + 10; y++) {
                    if (dataTool.loadInAt(x, y, z)) {
                        if (dataTool.isRenderable())
                            continue;
                    }
                    if (y == 0) {
                        brush.setId("ecd_immutable").setXYZ(x, y, z).paint();
                        continue;
                    }
                    if (inNoiseRange(x, y, z)) {
                        if (y > 50 + vineHeight)
                            makeVine = false;
                        brush.setId(voxels.stone);
                        brush.setXYZ(x, y, z).paint();
                    }
                    else {
                        if (makeTeple &&
                            y > 40 &&
                            inNoiseRange(x, y - 1, z) &&
                            !inNoiseRange(x + 7, y + 1, z + 7)) {
                            (0,_Structures_Temples_DimensoinTemple_js__WEBPACK_IMPORTED_MODULE_3__.GenerateDimensionTemple)(brush, x, y, z, "crimson");
                            makeTeple = false;
                            continue;
                        }
                        if (y > 70 && inNoiseRange(x, y - 1, z) && totalTrees < 3) {
                            if (indexRNG.get(x * y * z) > 0.98) {
                                (0,_Functions_Tree_js__WEBPACK_IMPORTED_MODULE_4__.GenerateTree)(brush, x, y, z, "ecd_elysian_log", "ecd_elysian_leafs");
                                totalTrees++;
                                continue;
                            }
                        }
                        if (y > 40 && inNoiseRange(x, y - 1, z)) {
                            if (indexRNG.get(x * y * z) > 0.93) {
                                brush.setId(voxels.grass).setXYZ(x, y, z).paint();
                                continue;
                            }
                        }
                        if (makeWaterFall) {
                            if (y > 40 && y < this.height - 10) {
                                if (inNoiseRange(x, y + 1, z)) {
                                    brush.setId(voxels.water).setXYZ(x, y, z).paint();
                                    makeWaterFall = false;
                                    continue;
                                }
                            }
                        }
                        if (makeVine) {
                            if (y > 50 + vineHeight) {
                                brush.setId(voxels.vine).setXYZ(x, y, z).paint();
                                continue;
                            }
                        }
                        if (y <= 40) {
                            brush.setId(voxels.water).setXYZ(x, y, z).paint();
                            continue;
                        }
                    }
                }
            }
        }
        brush.stop();
    },
};


/***/ }),

/***/ "./compiled/core/Gen/Functions/Circle.js":
/*!***********************************************!*\
  !*** ./compiled/core/Gen/Functions/Circle.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GenerateCircle": () => (/* binding */ GenerateCircle)
/* harmony export */ });
/* harmony import */ var divine_voxel_engine_Math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-voxel-engine/Math */ "../../DSLIBS/divineVoxelEngine/dist/Math/index.js");

function GenerateCircle(brush, voxel, sx, sy, sz, radius, skipCenter = false, noDestory = false) {
    let rx = sx - radius;
    let rz = sz - radius;
    brush.setId(voxel);
    const dataTool = brush._dt;
    for (let ix = rx; ix <= sx + radius; ix++) {
        for (let iz = rz; iz <= sz + radius; iz++) {
            if (skipCenter) {
                if (ix == sx && iz == sz)
                    continue;
            }
            if (noDestory) {
                if (dataTool.loadInAt(ix, sy, iz)) {
                    if (dataTool.isRenderable())
                        continue;
                }
            }
            if ((0,divine_voxel_engine_Math__WEBPACK_IMPORTED_MODULE_0__.Distance2D)(ix, sx, iz, sz) < radius) {
                brush.setXYZ(ix, sy, iz).paint();
            }
        }
    }
}


/***/ }),

/***/ "./compiled/core/Gen/Functions/StairPillar.js":
/*!****************************************************!*\
  !*** ./compiled/core/Gen/Functions/StairPillar.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GenerateStairPillar": () => (/* binding */ GenerateStairPillar)
/* harmony export */ });
/* harmony import */ var divine_voxel_engine_Data_Shapes_StairStates_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-voxel-engine/Data/Shapes/StairStates.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Shapes/StairStates.js");

function GenerateStairPillar(brush, sx, sy, sz, height, stairId, pillarId) {
    brush
        .setId(stairId)
        .setXYZ(sx - 1, sy, sz)
        .setShapeState(divine_voxel_engine_Data_Shapes_StairStates_js__WEBPACK_IMPORTED_MODULE_0__.StairStates.normal.bottom.east)
        .paint()
        .setXYZ(sx + 1, sy, sz)
        .setShapeState(divine_voxel_engine_Data_Shapes_StairStates_js__WEBPACK_IMPORTED_MODULE_0__.StairStates.normal.bottom.west)
        .paint()
        .setXYZ(sx, sy, sz - 1)
        .setShapeState(divine_voxel_engine_Data_Shapes_StairStates_js__WEBPACK_IMPORTED_MODULE_0__.StairStates.normal.bottom.north)
        .paint()
        .setXYZ(sx, sy, sz + 1)
        .setShapeState(divine_voxel_engine_Data_Shapes_StairStates_js__WEBPACK_IMPORTED_MODULE_0__.StairStates.normal.bottom.south)
        .paint()
        .setXYZ(sx - 1, sy, sz - 1)
        .setShapeState(divine_voxel_engine_Data_Shapes_StairStates_js__WEBPACK_IMPORTED_MODULE_0__.StairStates.connected.bottom.northEast)
        .paint()
        .setXYZ(sx - 1, sy, sz + 1)
        .setShapeState(divine_voxel_engine_Data_Shapes_StairStates_js__WEBPACK_IMPORTED_MODULE_0__.StairStates.connected.bottom.southEast)
        .paint()
        .setXYZ(sx + 1, sy, sz - 1)
        .setShapeState(divine_voxel_engine_Data_Shapes_StairStates_js__WEBPACK_IMPORTED_MODULE_0__.StairStates.connected.bottom.northWest)
        .paint()
        .setXYZ(sx + 1, sy, sz + 1)
        .setShapeState(divine_voxel_engine_Data_Shapes_StairStates_js__WEBPACK_IMPORTED_MODULE_0__.StairStates.connected.bottom.southWest)
        .paint()
        .setXYZ(sx - 1, sy + height, sz)
        .setShapeState(divine_voxel_engine_Data_Shapes_StairStates_js__WEBPACK_IMPORTED_MODULE_0__.StairStates.normal.top.east)
        .paint()
        .setXYZ(sx + 1, sy + height, sz)
        .setShapeState(divine_voxel_engine_Data_Shapes_StairStates_js__WEBPACK_IMPORTED_MODULE_0__.StairStates.normal.top.west)
        .paint()
        .setXYZ(sx, sy + height, sz - 1)
        .setShapeState(divine_voxel_engine_Data_Shapes_StairStates_js__WEBPACK_IMPORTED_MODULE_0__.StairStates.normal.top.north)
        .paint()
        .setXYZ(sx, sy + height, sz + 1)
        .setShapeState(divine_voxel_engine_Data_Shapes_StairStates_js__WEBPACK_IMPORTED_MODULE_0__.StairStates.normal.top.south)
        .paint()
        .setXYZ(sx - 1, sy + height, sz - 1)
        .setShapeState(divine_voxel_engine_Data_Shapes_StairStates_js__WEBPACK_IMPORTED_MODULE_0__.StairStates.connected.top.northEast)
        .paint()
        .setXYZ(sx - 1, sy + height, sz + 1)
        .setShapeState(divine_voxel_engine_Data_Shapes_StairStates_js__WEBPACK_IMPORTED_MODULE_0__.StairStates.connected.top.southEast)
        .paint()
        .setXYZ(sx + 1, sy + height, sz - 1)
        .setShapeState(divine_voxel_engine_Data_Shapes_StairStates_js__WEBPACK_IMPORTED_MODULE_0__.StairStates.connected.top.northWest)
        .paint()
        .setXYZ(sx + 1, sy + height, sz + 1)
        .setShapeState(divine_voxel_engine_Data_Shapes_StairStates_js__WEBPACK_IMPORTED_MODULE_0__.StairStates.connected.top.southWest)
        .paint();
    brush.setId(pillarId).setShapeState(0);
    let i = sy + height;
    while (i > sy) {
        brush.setXYZ(sx, i, sz).paint();
        i--;
    }
    brush.setShapeState(0);
}


/***/ }),

/***/ "./compiled/core/Gen/Functions/StairRoof.js":
/*!**************************************************!*\
  !*** ./compiled/core/Gen/Functions/StairRoof.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GenerateStairRoof": () => (/* binding */ GenerateStairRoof)
/* harmony export */ });
/* harmony import */ var divine_voxel_engine_Data_Shapes_StairStates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-voxel-engine/Data/Shapes/StairStates */ "../../DSLIBS/divineVoxelEngine/dist/Data/Shapes/StairStates.js");

function GenerateStairRoof(brush, sx, sy, sz, width, depth, height, stairId) {
    brush.setId(stairId);
    let c = 0;
    for (let y = sy; y < sy + height; y++) {
        let startX = sx + c;
        let endX = sx + width - c;
        let startZ = sz + c;
        let endZ = sz + depth - c;
        for (let x = startX; x < endX; x++) {
            for (let z = startZ; z < endZ; z++) {
                brush.setXYZ(x, y, z);
                if (x == startX && z == startZ) {
                    brush.setShapeState(divine_voxel_engine_Data_Shapes_StairStates__WEBPACK_IMPORTED_MODULE_0__.StairStates.connected.bottom.northEast).paint();
                    continue;
                }
                if (x == startX && z == endZ - 1) {
                    brush.setShapeState(divine_voxel_engine_Data_Shapes_StairStates__WEBPACK_IMPORTED_MODULE_0__.StairStates.connected.bottom.southEast).paint();
                    continue;
                }
                if (x == endX - 1 && z == startZ) {
                    brush.setShapeState(divine_voxel_engine_Data_Shapes_StairStates__WEBPACK_IMPORTED_MODULE_0__.StairStates.connected.bottom.northWest).paint();
                    continue;
                }
                if (x == endX - 1 && z == endZ - 1) {
                    brush.setShapeState(divine_voxel_engine_Data_Shapes_StairStates__WEBPACK_IMPORTED_MODULE_0__.StairStates.connected.bottom.southWest).paint();
                    continue;
                }
                if (x == startX) {
                    brush.setShapeState(divine_voxel_engine_Data_Shapes_StairStates__WEBPACK_IMPORTED_MODULE_0__.StairStates.normal.bottom.east).paint();
                    continue;
                }
                if (x == endX - 1) {
                    brush.setShapeState(divine_voxel_engine_Data_Shapes_StairStates__WEBPACK_IMPORTED_MODULE_0__.StairStates.normal.bottom.west).paint();
                    continue;
                }
                if (z == startZ) {
                    brush.setShapeState(divine_voxel_engine_Data_Shapes_StairStates__WEBPACK_IMPORTED_MODULE_0__.StairStates.normal.bottom.north).paint();
                    continue;
                }
                if (z == endZ - 1) {
                    brush.setShapeState(divine_voxel_engine_Data_Shapes_StairStates__WEBPACK_IMPORTED_MODULE_0__.StairStates.normal.bottom.south).paint();
                    continue;
                }
            }
        }
        c++;
    }
    brush.setShapeState(0);
}


/***/ }),

/***/ "./compiled/core/Gen/Functions/Tree.js":
/*!*********************************************!*\
  !*** ./compiled/core/Gen/Functions/Tree.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GenerateTree": () => (/* binding */ GenerateTree)
/* harmony export */ });
/* harmony import */ var divine_voxel_engine_Math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-voxel-engine/Math */ "../../DSLIBS/divineVoxelEngine/dist/Math/index.js");
/* harmony import */ var _Circle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Circle.js */ "./compiled/core/Gen/Functions/Circle.js");


const start = { x: 0, y: 0, z: 0 };
const end = { x: 0, y: 0, z: 0 };
function GenerateTree(brush, sx, sy, sz, logId, leafId) {
    const height = ((Math.random() * 15) >> 0) + 5;
    const rx = ((sx - 5 + Math.random() * 10) >> 0) + 1;
    const rz = ((sz - 5 + Math.random() * 10) >> 0) + 1;
    start.x = sx;
    start.y = sy;
    start.z = sz;
    end.x = rx;
    end.y = sy + height;
    end.z = rz;
    brush.setId(logId);
    let c = 0;
    const voxels = (0,divine_voxel_engine_Math__WEBPACK_IMPORTED_MODULE_0__.VisitAll)(start, end, (x, y, z) => {
        c++;
        if (c > 50) {
            end.x = x;
            end.y = y;
            end.z = z;
            return false;
        }
        return true;
    });
    for (let i = 0; i < voxels.length; i += 3) {
        const x = voxels[i];
        const y = voxels[i + 1];
        const z = voxels[i + 2];
        brush.setXYZ(x, y, z).paint();
    }
    let capHeight = ((Math.random() * 10) >> 0) + 1;
    if (capHeight < 4)
        capHeight = 4;
    let i = capHeight;
    let radius = 1;
    while (i--) {
        brush.setId(logId);
        if (i == capHeight - 1) {
            brush.setId(leafId);
        }
        brush.setXYZ(end.x, end.y + i, end.z).paint();
        (0,_Circle_js__WEBPACK_IMPORTED_MODULE_1__.GenerateCircle)(brush, leafId, end.x, end.y + i, end.z, radius, true, true);
        radius++;
    }
}


/***/ }),

/***/ "./compiled/core/Gen/Structures/Temples/DimensoinTemple.js":
/*!*****************************************************************!*\
  !*** ./compiled/core/Gen/Structures/Temples/DimensoinTemple.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GenerateDimensionTemple": () => (/* binding */ GenerateDimensionTemple)
/* harmony export */ });
/* harmony import */ var _Functions_StairPillar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Functions/StairPillar.js */ "./compiled/core/Gen/Functions/StairPillar.js");
/* harmony import */ var _Functions_StairRoof_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Functions/StairRoof.js */ "./compiled/core/Gen/Functions/StairRoof.js");


const DimensionTempleVoxels = {
    crimson: {
        stone: "ecd_crimson_star_stone",
        stair: "ecd_crimson_star_stone_stair",
        lamp: "ecd_crimson_lamp",
        ether: "ecd_crimson_ether",
    },
};
/*
ecd_crimson_star_stone
ecd_crimson_lamp
ecd_crimson_ether
*/
function GenerateDimensionTemple(brush, sx, sy, sz, templeDimension) {
    const dimensionData = DimensionTempleVoxels[templeDimension];
    if (!dimensionData)
        return false;
    const dataTool = brush._dt;
    const width = 16;
    const depth = 16;
    for (let x = sx; x < sx + width; x++) {
        for (let z = sz; z < sz + depth; z++) {
            for (let y = sy; y > 0; y--) {
                if (dataTool.loadInAt(x, y, z)) {
                    if (dataTool.isOpaque())
                        continue;
                }
                brush.setXYZ(x, y, z);
                if (y > sy - 5) {
                    if ((x == sx + 7 && z == sz + 7) ||
                        (x == sx + 8 && z == sz + 8) ||
                        (x == sx + 7 && z == sz + 8) ||
                        (x == sx + 8 && z == sz + 7)) {
                        brush.setId(dimensionData.stone).paint();
                        continue;
                    }
                    if (x >= sx + 4 && z >= sz + 4 && x <= sx + 11 && z <= sz + 11) {
                        brush.setId(dimensionData.ether).paint();
                        continue;
                    }
                }
                brush.setId(dimensionData.stone).paint();
            }
        }
    }
    for (let x = sx; x < sx + width; x++) {
        for (let z = sz; z < sz + depth; z++) {
            for (let y = sy; y < sy + 10; y++) {
                if (dataTool.loadInAt(x, y, z)) {
                    if (dataTool.isOpaque())
                        continue;
                }
                brush.setXYZ(x, y, z);
                if ((x == sx + 7 && z == sz + 7) ||
                    (x == sx + 8 && z == sz + 8) ||
                    (x == sx + 7 && z == sz + 8) ||
                    (x == sx + 8 && z == sz + 7)) {
                    if (y == sy + 9) {
                        brush.setId(dimensionData.lamp).paint();
                        brush
                            .setXYZ(x, y + 1, z)
                            .setId(dimensionData.ether)
                            .paint();
                        continue;
                    }
                    brush.setId(dimensionData.stone).paint();
                    continue;
                }
            }
        }
    }
    (0,_Functions_StairPillar_js__WEBPACK_IMPORTED_MODULE_0__.GenerateStairPillar)(brush, sx + 1, sy + 1, sz + 1, 10, dimensionData.stair, dimensionData.stone);
    (0,_Functions_StairPillar_js__WEBPACK_IMPORTED_MODULE_0__.GenerateStairPillar)(brush, sx + 14, sy + 1, sz + 1, 10, dimensionData.stair, dimensionData.stone);
    (0,_Functions_StairPillar_js__WEBPACK_IMPORTED_MODULE_0__.GenerateStairPillar)(brush, sx + 1, sy + 1, sz + 14, 10, dimensionData.stair, dimensionData.stone);
    (0,_Functions_StairPillar_js__WEBPACK_IMPORTED_MODULE_0__.GenerateStairPillar)(brush, sx + 14, sy + 1, sz + 14, 10, dimensionData.stair, dimensionData.stone);
    (0,_Functions_StairRoof_js__WEBPACK_IMPORTED_MODULE_1__.GenerateStairRoof)(brush, sx, sy + 12, sz, 16, 16, 10, dimensionData.stair);
}


/***/ }),

/***/ "./compiled/core/Gen/WorldGenerator.js":
/*!*********************************************!*\
  !*** ./compiled/core/Gen/WorldGenerator.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WorldGenerator": () => (/* binding */ WorldGenerator)
/* harmony export */ });
/* harmony import */ var _Dimensions_Main_MainWorldGen_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dimensions/Main/MainWorldGen.js */ "./compiled/core/Gen/Dimensions/Main/MainWorldGen.js");

const WorldGenerator = {
    async generate([location, data]) {
        if (location[0] == "main") {
            //  TestWorldGen.generate(dimension, x, y, z, data);
            _Dimensions_Main_MainWorldGen_js__WEBPACK_IMPORTED_MODULE_0__.MainWorldGen.generate(location, data);
        }
    },
    async decorate([location, data]) {
        if (location[0] == "main") {
            //  TestWorldGen.generate(dimension, x, y, z, data);
        }
    },
};


/***/ }),

/***/ "./compiled/core/data/client/Functions/RegisterVoxelConstructors.js":
/*!**************************************************************************!*\
  !*** ./compiled/core/data/client/Functions/RegisterVoxelConstructors.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$RegisterVoxelConstructors": () => (/* binding */ $RegisterVoxelConstructors)
/* harmony export */ });
/* harmony import */ var _Voxels_LightDebugBox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Voxels/LightDebugBox */ "./compiled/core/data/client/Voxels/LightDebugBox.js");
/* harmony import */ var _Voxels_MarkerBox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Voxels/MarkerBox */ "./compiled/core/data/client/Voxels/MarkerBox.js");
/* harmony import */ var _Voxels_LiquidDreamEther__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Voxels/LiquidDreamEther */ "./compiled/core/data/client/Voxels/LiquidDreamEther.js");
//types
//voxels



function $RegisterVoxelConstructors(DVEC) {
    (0,_Voxels_LightDebugBox__WEBPACK_IMPORTED_MODULE_0__.GetLightDebugBox)(DVEC);
    (0,_Voxels_MarkerBox__WEBPACK_IMPORTED_MODULE_1__.GetMarkerBox)(DVEC);
    (0,_Voxels_LiquidDreamEther__WEBPACK_IMPORTED_MODULE_2__.GetDreamEther)(DVEC);
    const vm = DVEC.voxelManager;
    vm.registerVoxel([
        //debug
        vm.defaults.box.simple("dve_debug_box", {
            top: ["#dve_solid", "dve_debug_box", "top"],
            bottom: ["#dve_solid", "dve_debug_box", "bottom"],
            north: ["#dve_solid", "dve_debug_box", "north"],
            south: ["#dve_solid", "dve_debug_box", "south"],
            east: ["#dve_solid", "dve_debug_box", "east"],
            west: ["#dve_solid", "dve_debug_box", "west"],
        }),
        vm.defaults.box.simple("dve_data_holder", [
            "#dve_solid",
            "dve_data_holder",
            "front",
        ]),
        //dream
        vm.defaults.box.simple("dve_dream_grass_block", [
            "#dve_flora",
            "dve_dream_grass_block",
            "grassy-top",
        ]),
        vm.defaults.box.pillar("dve_dream_stone_pillar", {
            top: ["#dve_solid", "dve_dream_stone_pillar", "top"],
            bottom: ["#dve_solid", "dve_dream_stone_pillar", "top"],
            sideBottom: ["#dve_solid", "dve_dream_stone_pillar", "side-bottom"],
            sideMiddle: ["#dve_solid", "dve_dream_stone_pillar"],
            sideTop: ["#dve_solid", "dve_dream_stone_pillar", "side-top"],
            sideFloat: ["#dve_solid", "dve_dream_stone_pillar", "top"],
        }),
        vm.defaults.box.pillar("dve_dream_stone", {
            top: ["#dve_solid", "dve_dream_stone", "grassy-top"],
            bottom: ["#dve_solid", "dve_dream_stone"],
            sideBottom: ["#dve_solid", "dve_dream_stone"],
            sideMiddle: ["#dve_solid", "dve_dream_stone"],
            sideTop: ["#dve_solid", "dve_dream_stone", "grassy-side"],
            sideFloat: ["#dve_solid", "dve_dream_stone", "grassy-side"],
        }),
        vm.defaults.box.simple("dve_dream_lamp", ["#dve_solid", "dve_dream_lamp"]),
        vm.defaults.box.pillar("dve_dream_stone_slab", {
            top: ["#dve_solid", "dve_dream_stone", "grassy-top"],
            bottom: ["#dve_solid", "dve_dream_stone"],
            sideBottom: ["#dve_solid", "dve_dream_stone"],
            sideMiddle: ["#dve_solid", "dve_dream_stone"],
            sideTop: ["#dve_solid", "dve_dream_stone", "grassy-side"],
            sideFloat: ["#dve_solid", "dve_dream_stone", "grassy-side"],
        }),
        vm.defaults.box.simple("dve_dream_log", ["#dve_solid", "dve_dream_log"]),
        vm.defaults.box.simple("dve_dream_stone_stair", [
            "#dve_solid",
            "dve_dream_stone",
        ]),
        vm.defaults.crossedPanel.simple("dve_dream_grass", [
            "#dve_flora",
            "dve_dream_grass",
        ]),
        vm.defaults.panel.simple("dve_dream_vine", [
            "#dve_flora",
            "dve_dream_vine",
        ]),
        vm.defaults.box.simple("dve_dream_leaves", [
            "#dve_flora",
            "dve_dream_leaves",
        ]),
        //dread
        vm.defaults.box.pillar("dve_dread_stone_pillar", {
            top: ["#dve_solid", "dve_dread_stone_pillar", "top"],
            bottom: ["#dve_solid", "dve_dread_stone_pillar", "top"],
            sideBottom: ["#dve_solid", "dve_dread_stone_pillar", "side-bottom"],
            sideMiddle: ["#dve_solid", "dve_dread_stone_pillar"],
            sideTop: ["#dve_solid", "dve_dread_stone_pillar", "side-top"],
            sideFloat: ["#dve_solid", "dve_dread_stone_pillar", "top"],
        }),
        vm.defaults.box.pillar("dve_dread_stone", {
            top: ["#dve_solid", "dve_dread_stone", "grassy-top"],
            bottom: ["#dve_solid", "dve_dread_stone"],
            sideBottom: ["#dve_solid", "dve_dread_stone"],
            sideMiddle: ["#dve_solid", "dve_dread_stone"],
            sideTop: ["#dve_solid", "dve_dread_stone", "grassy-side"],
            sideFloat: ["#dve_solid", "dve_dread_stone", "grassy-side"],
        }),
        vm.defaults.box.simple("dve_dread_lamp", ["#dve_solid", "dve_dread_lamp"]),
        vm.defaults.liquid.simple("dve_liquid_dread_ether", [
            ["#dve_liquid", "dve_liquid_dread_ether", "still-1"],
            ["#dve_liquid", "dve_liquid_dread_ether", "still-1"],
        ]),
        vm.defaults.crossedPanel.simple("dve_dread_grass", [
            "#dve_solid",
            "dve_dread_grass",
        ]),
    ]);
}


/***/ }),

/***/ "./compiled/core/data/client/Voxels/LightDebugBox.js":
/*!***********************************************************!*\
  !*** ./compiled/core/data/client/Voxels/LightDebugBox.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GetLightDebugBox": () => (/* binding */ GetLightDebugBox)
/* harmony export */ });
/* harmony import */ var divine_voxel_engine_Constructor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-voxel-engine/Constructor */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/index.js");

const getData = (dataTool, x, y, z) => {
    let data = 0;
    if (dataTool.loadInAt(x, y, z)) {
        data = dataTool.getLight();
    }
    return data;
};
function GetLightDebugBox(DVEC) {
    const textures = [];
    return DVEC.voxelManager.registerVoxel({
        id: "dve_light_debug",
        onTexturesRegistered(textureMangager) {
            for (let i = 0; i < 16; i++) {
                textures.push(textureMangager.getTextureUV([
                    "#dve_solid",
                    "dve_light_debug",
                    `light-level-${i}`,
                ]));
            }
        },
        process(tool) {
            const [dimension, x, y, z] = tool.voxel.getLocation();
            const dt = tool.nVoxel;
            if (tool.isFaceExposed("top")) {
                tool
                    .setTexture(textures[getData(dt, x, y + 1, z) || 0])
                    .calculateLight("top");
                divine_voxel_engine_Constructor__WEBPACK_IMPORTED_MODULE_0__.BoxVoxelShape.add.top();
            }
            if (tool.isFaceExposed("bottom")) {
                tool
                    .setTexture(textures[getData(dt, x, y - 1, z) || 0])
                    .calculateLight("bottom");
                divine_voxel_engine_Constructor__WEBPACK_IMPORTED_MODULE_0__.BoxVoxelShape.add.bottom();
            }
            if (tool.isFaceExposed("east")) {
                tool
                    .setTexture(textures[getData(dt, x + 1, y, z) || 0])
                    .calculateLight("east");
                divine_voxel_engine_Constructor__WEBPACK_IMPORTED_MODULE_0__.BoxVoxelShape.add.east();
            }
            if (tool.isFaceExposed("west")) {
                tool
                    .setTexture(textures[getData(dt, x - 1, y, z) || 0])
                    .calculateLight("west");
                divine_voxel_engine_Constructor__WEBPACK_IMPORTED_MODULE_0__.BoxVoxelShape.add.west();
            }
            if (tool.isFaceExposed("south")) {
                tool
                    .setTexture(textures[getData(dt, x, y, z - 1) || 0])
                    .calculateLight("south");
                divine_voxel_engine_Constructor__WEBPACK_IMPORTED_MODULE_0__.BoxVoxelShape.add.south();
            }
            if (tool.isFaceExposed("north")) {
                tool
                    .setTexture(textures[getData(dt, x, y, z + 1) || 0])
                    .calculateLight("north");
                divine_voxel_engine_Constructor__WEBPACK_IMPORTED_MODULE_0__.BoxVoxelShape.add.north();
            }
        },
    });
}


/***/ }),

/***/ "./compiled/core/data/client/Voxels/LiquidDreamEther.js":
/*!**************************************************************!*\
  !*** ./compiled/core/data/client/Voxels/LiquidDreamEther.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GetDreamEther": () => (/* binding */ GetDreamEther)
/* harmony export */ });
/* harmony import */ var divine_voxel_engine_Constructor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-voxel-engine/Constructor */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/index.js");
/* harmony import */ var divine_voxel_engine_Constructor_Builder_Tools_OutlinedVoxelTool_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! divine-voxel-engine/Constructor/Builder/Tools/OutlinedVoxelTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Tools/OutlinedVoxelTool.js");


function GetDreamEther(DVEC) {
    let uv = 0;
    let overlayTextures = [];
    DVEC.voxelManager.registerVoxel({
        id: "dve_liquid_dream_ether",
        onTexturesRegistered(textureMangager) {
            uv = textureMangager.getTextureUV([
                "#dve_liquid",
                "dve_liquid_dream_ether",
                "still-1",
            ]);
            divine_voxel_engine_Constructor_Builder_Tools_OutlinedVoxelTool_js__WEBPACK_IMPORTED_MODULE_1__.OutlinedVoxelTool.getOutlineUVs(["#dve_liquid", "foam", "top"], (textures) => {
                overlayTextures = textures;
            });
        },
        process(tool) {
            divine_voxel_engine_Constructor_Builder_Tools_OutlinedVoxelTool_js__WEBPACK_IMPORTED_MODULE_1__.OutlinedVoxelTool.setCurrentTextures(overlayTextures);
            divine_voxel_engine_Constructor__WEBPACK_IMPORTED_MODULE_0__.LiquidVoxelShape.start();
            tool.getOverlayTextures().setAll(0);
            if (tool.isFaceExposed("top")) {
                tool.setTexture(uv).calculateLight("top");
                if (tool.voxel.getLevel() == 15 && tool.voxel.getLevelState() != 1) {
                    divine_voxel_engine_Constructor_Builder_Tools_OutlinedVoxelTool_js__WEBPACK_IMPORTED_MODULE_1__.OutlinedVoxelTool.addTo.top(tool);
                }
                divine_voxel_engine_Constructor__WEBPACK_IMPORTED_MODULE_0__.LiquidVoxelShape.add.top();
            }
            tool.getOverlayTextures().setAll(0);
            if (tool.isFaceExposed("bottom")) {
                tool.setTexture(uv).calculateLight("bottom");
                divine_voxel_engine_Constructor__WEBPACK_IMPORTED_MODULE_0__.LiquidVoxelShape.add.bottom();
            }
            if (tool.isFaceExposed("east")) {
                tool.setTexture(uv).calculateLight("east");
                divine_voxel_engine_Constructor__WEBPACK_IMPORTED_MODULE_0__.LiquidVoxelShape.add.east();
            }
            if (tool.isFaceExposed("west")) {
                tool.setTexture(uv).calculateLight("west");
                divine_voxel_engine_Constructor__WEBPACK_IMPORTED_MODULE_0__.LiquidVoxelShape.add.west();
            }
            if (tool.isFaceExposed("south")) {
                tool.setTexture(uv).calculateLight("south");
                divine_voxel_engine_Constructor__WEBPACK_IMPORTED_MODULE_0__.LiquidVoxelShape.add.south();
            }
            if (tool.isFaceExposed("north")) {
                tool.setTexture(uv).calculateLight("north");
                divine_voxel_engine_Constructor__WEBPACK_IMPORTED_MODULE_0__.LiquidVoxelShape.add.north();
            }
        },
    });
}


/***/ }),

/***/ "./compiled/core/data/client/Voxels/MarkerBox.js":
/*!*******************************************************!*\
  !*** ./compiled/core/data/client/Voxels/MarkerBox.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GetMarkerBox": () => (/* binding */ GetMarkerBox)
/* harmony export */ });
/* harmony import */ var divine_voxel_engine_Constructor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-voxel-engine/Constructor */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/index.js");

function GetMarkerBox(DVEC) {
    const textures = [];
    return DVEC.voxelManager.registerVoxel({
        id: "dve_marker_box",
        onTexturesRegistered(textureMangager) {
            for (let i = 0; i < 16; i++) {
                textures.push(textureMangager.getTextureUV([
                    "#dve_solid",
                    "dve_light_debug",
                    `light-level-${i}`,
                ]));
            }
        },
        process(tool) {
            const uv = textures[tool.voxel.getState()];
            tool.getOverlayTextures().setAll(0);
            if (tool.isFaceExposed("top")) {
                tool.setTexture(uv).calculateLight("top");
                divine_voxel_engine_Constructor__WEBPACK_IMPORTED_MODULE_0__.BoxVoxelShape.add.top();
            }
            if (tool.isFaceExposed("bottom")) {
                tool.setTexture(uv).calculateLight("bottom");
                divine_voxel_engine_Constructor__WEBPACK_IMPORTED_MODULE_0__.BoxVoxelShape.add.bottom();
            }
            if (tool.isFaceExposed("east")) {
                tool.setTexture(uv).calculateLight("east");
                divine_voxel_engine_Constructor__WEBPACK_IMPORTED_MODULE_0__.BoxVoxelShape.add.east();
            }
            if (tool.isFaceExposed("west")) {
                tool.setTexture(uv).calculateLight("west");
                divine_voxel_engine_Constructor__WEBPACK_IMPORTED_MODULE_0__.BoxVoxelShape.add.west();
            }
            if (tool.isFaceExposed("south")) {
                tool.setTexture(uv).calculateLight("south");
                divine_voxel_engine_Constructor__WEBPACK_IMPORTED_MODULE_0__.BoxVoxelShape.add.south();
            }
            if (tool.isFaceExposed("north")) {
                tool.setTexture(uv).calculateLight("north");
                divine_voxel_engine_Constructor__WEBPACK_IMPORTED_MODULE_0__.BoxVoxelShape.add.north();
            }
        },
    });
}


/***/ }),

/***/ "../../DSLIBS/divineRNG/dist/IndexedRNG/index.js":
/*!*******************************************************!*\
  !*** ../../DSLIBS/divineRNG/dist/IndexedRNG/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IndexedRNG": () => (/* binding */ IndexedRNG)
/* harmony export */ });
/* harmony import */ var _seededRandom_LCG_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../seededRandom/LCG.js */ "../../DSLIBS/divineRNG/dist/seededRandom/LCG.js");

class IndexedRNG {
    seed;
    MAX_VERTICES = 256_000;
    MAX_VERTICES_MASK = this.MAX_VERTICES - 1;
    amplitude = 1;
    scale = 1;
    r = [];
    constructor(seed) {
        this.seed = seed;
        const lcg = new _seededRandom_LCG_js__WEBPACK_IMPORTED_MODULE_0__.LCG(seed);
        for (let i = 0; i < this.MAX_VERTICES; ++i) {
            this.r.push(lcg.rand());
        }
    }
    get(x) {
        const scaledX = x * this.scale;
        const xFloor = Math.floor(scaledX);
        const t = scaledX - xFloor;
        const tRemapSmoothstep = t * t * (3 - 2 * t);
        const xMin = xFloor & this.MAX_VERTICES_MASK;
        const xMax = (xMin + 1) & this.MAX_VERTICES_MASK;
        const y = this._lerp(this.r[xMin], this.r[xMax], tRemapSmoothstep);
        return y * this.amplitude;
    }
    _lerp(a, b, t) {
        return a * (1 - t) + b * t;
    }
}


/***/ }),

/***/ "../../DSLIBS/divineRNG/dist/index.js":
/*!********************************************!*\
  !*** ../../DSLIBS/divineRNG/dist/index.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IndexedRNG": () => (/* reexport safe */ _IndexedRNG_index_js__WEBPACK_IMPORTED_MODULE_0__.IndexedRNG),
/* harmony export */   "PRNG": () => (/* reexport safe */ _seededRandom_index_js__WEBPACK_IMPORTED_MODULE_2__.PRNG),
/* harmony export */   "PerlinNoise3d": () => (/* reexport safe */ _perlin_index_js__WEBPACK_IMPORTED_MODULE_1__.PerlinNoise3d)
/* harmony export */ });
/* harmony import */ var _IndexedRNG_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IndexedRNG/index.js */ "../../DSLIBS/divineRNG/dist/IndexedRNG/index.js");
/* harmony import */ var _perlin_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./perlin/index.js */ "../../DSLIBS/divineRNG/dist/perlin/index.js");
/* harmony import */ var _seededRandom_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./seededRandom/index.js */ "../../DSLIBS/divineRNG/dist/seededRandom/index.js");





/***/ }),

/***/ "../../DSLIBS/divineRNG/dist/perlin/index.js":
/*!***************************************************!*\
  !*** ../../DSLIBS/divineRNG/dist/perlin/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PerlinNoise3d": () => (/* binding */ PerlinNoise3d)
/* harmony export */ });
/**# Perlin Noise 3d
 * ---
 * TypeScript version of the library found here:
 * https://github.com/alterebro/perlin-noise-3d
 */
class PerlinNoise3d {
    // Based on http://mrl.nyu.edu/~perlin/noise/
    // Adapting from runemadsen/rune.noise.js
    // Which was adapted from P5.js
    // Which was adapted from PApplet.java
    // which was adapted from toxi
    // which was adapted from the german demo group farbrausch as used in their demo "art": http://www.farb-rausch.de/fr010src.zip
    PERLIN_YWRAPB = 4;
    PERLIN_YWRAP = 1 << this.PERLIN_YWRAPB;
    PERLIN_ZWRAPB = 8;
    PERLIN_ZWRAP = 1 << this.PERLIN_ZWRAPB;
    PERLIN_SIZE = 4095;
    SINCOS_PRECISION = 0.5;
    SINCOS_LENGTH = Math.floor(360 / this.SINCOS_PRECISION);
    sinLUT = new Array(this.SINCOS_LENGTH);
    cosLUT = new Array(this.SINCOS_LENGTH);
    DEG_TO_RAD = Math.PI / 180.0;
    perlin_octaves = 4; // default to medium smooth
    perlin_amp_falloff = 0.5; // 50% reduction/octave
    perlin = null;
    perlin_PI = this.SINCOS_LENGTH;
    constructor() {
        this.perlin_PI >>= 1;
        for (let i = 0; i < this.SINCOS_LENGTH; i++) {
            this.sinLUT[i] = Math.sin(i * this.DEG_TO_RAD * this.SINCOS_PRECISION);
            this.cosLUT[i] = Math.cos(i * this.DEG_TO_RAD * this.SINCOS_PRECISION);
        }
    }
    lcg() {
        // Set to values from http://en.wikipedia.org/wiki/Numerical_Recipes
        // m is basically chosen to be large (as it is the max period)
        // and for its relationships to a and c
        let m = 4294967296, 
        // a - 1 should be divisible by m's prime factors
        a = 1664525, 
        // c and m should be co-prime
        c = 1013904223, seed, z;
        return {
            setSeed: function (val) {
                // pick a random seed if val is undefined or null
                // the >>> 0 casts the seed to an unsigned 32-bit integer
                z = seed = (val == null ? Math.random() * m : val) >>> 0;
            },
            getSeed: function () {
                return seed;
            },
            rand: function () {
                // define the recurrence relationship
                z = (a * z + c) % m;
                // return a float in [0, 1)
                // if z = m then z / m = 0 therefore (z % m) / m < 1 always
                return z / m;
            },
        };
    }
    noiseSeed(seed) {
        // Linear Congruential Generator
        // Variant of a Lehman Generator
        const lcg = this.lcg();
        lcg.setSeed(seed);
        this.perlin = new Array(this.PERLIN_SIZE + 1);
        for (let i = 0; i < this.PERLIN_SIZE + 1; i++) {
            this.perlin[i] = lcg.rand();
        }
        return this;
    }
    noise_fsc(i) {
        // using cosine lookup table
        return (0.5 *
            (1.0 - this.cosLUT[Math.floor(i * this.perlin_PI) % this.SINCOS_LENGTH]));
    }
    get(x, y, z) {
        y = y || 0;
        z = z || 0;
        if (this.perlin == null) {
            this.perlin = new Array(this.PERLIN_SIZE + 1);
            for (let i = 0; i < this.PERLIN_SIZE + 1; i++) {
                this.perlin[i] = Math.random();
            }
        }
        if (x < 0) {
            x = -x;
        }
        if (y < 0) {
            y = -y;
        }
        if (z < 0) {
            z = -z;
        }
        let xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
        let xf = x - xi;
        let yf = y - yi;
        let zf = z - zi;
        let rxf, ryf;
        let r = 0;
        let ampl = 0.5;
        let n1, n2, n3;
        for (let o = 0; o < this.perlin_octaves; o++) {
            let of = xi + (yi << this.PERLIN_YWRAPB) + (zi << this.PERLIN_ZWRAPB);
            rxf = this.noise_fsc(xf);
            ryf = this.noise_fsc(yf);
            n1 = this.perlin[of & this.PERLIN_SIZE];
            n1 += rxf * (this.perlin[(of + 1) & this.PERLIN_SIZE] - n1);
            n2 = this.perlin[(of + this.PERLIN_YWRAP) & this.PERLIN_SIZE];
            n2 +=
                rxf *
                    (this.perlin[(of + this.PERLIN_YWRAP + 1) & this.PERLIN_SIZE] - n2);
            n1 += ryf * (n2 - n1);
            of += this.PERLIN_ZWRAP;
            n2 = this.perlin[of & this.PERLIN_SIZE];
            n2 += rxf * (this.perlin[(of + 1) & this.PERLIN_SIZE] - n2);
            n3 = this.perlin[(of + this.PERLIN_YWRAP) & this.PERLIN_SIZE];
            n3 +=
                rxf *
                    (this.perlin[(of + this.PERLIN_YWRAP + 1) & this.PERLIN_SIZE] - n3);
            n2 += ryf * (n3 - n2);
            n1 += this.noise_fsc(zf) * (n2 - n1);
            r += n1 * ampl;
            ampl *= this.perlin_amp_falloff;
            xi <<= 1;
            xf *= 2;
            yi <<= 1;
            yf *= 2;
            zi <<= 1;
            zf *= 2;
            if (xf >= 1.0) {
                xi++;
                xf--;
            }
            if (yf >= 1.0) {
                yi++;
                yf--;
            }
            if (zf >= 1.0) {
                zi++;
                zf--;
            }
        }
        return r;
    }
}


/***/ }),

/***/ "../../DSLIBS/divineRNG/dist/seededRandom/Algorithms/Base.js":
/*!*******************************************************************!*\
  !*** ../../DSLIBS/divineRNG/dist/seededRandom/Algorithms/Base.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @class
 * @classdesc Base class all algorithm implementations should inherit from.
 */
class Base {
    /**
     * Generate a hash from a string that is suitable to use as a seed for any
     * of the PRNG's that inherit from this.
     *
     * @param {string} str
     * @returns {Function}
     */
    static _xfnv1a(str) {
        let h = 2166136261 >>> 0;
        for (let i = 0; i < str.length; i++) {
            h = Math.imul(h ^ str.charCodeAt(i), 16777619);
        }
        return () => {
            h += h << 13;
            h ^= h >>> 7;
            h += h << 3;
            h ^= h >>> 17;
            return (h += h << 5) >>> 0;
        };
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Base);


/***/ }),

/***/ "../../DSLIBS/divineRNG/dist/seededRandom/Algorithms/Mulberry32.js":
/*!*************************************************************************!*\
  !*** ../../DSLIBS/divineRNG/dist/seededRandom/Algorithms/Mulberry32.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base.js */ "../../DSLIBS/divineRNG/dist/seededRandom/Algorithms/Base.js");

/**
 * @class
 * @classdesc Concrete mulberry32 implementation.
 */
class Mulberry32 extends _Base_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /**
     * Seed parameter.
     *
     * @var {number}
     */
    a;
    /**
     * Create a new mulberry32 instance.
     *
     * @param {string} str
     */
    constructor(str) {
        super();
        this.a = Mulberry32._xfnv1a(str)();
    }
    /**
     * Generate a random number using the mulberry32 algorithm.
     *
     * @returns {number}
     */
    next() {
        let t = (this.a += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Mulberry32);


/***/ }),

/***/ "../../DSLIBS/divineRNG/dist/seededRandom/Algorithms/Sfc32.js":
/*!********************************************************************!*\
  !*** ../../DSLIBS/divineRNG/dist/seededRandom/Algorithms/Sfc32.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base.js */ "../../DSLIBS/divineRNG/dist/seededRandom/Algorithms/Base.js");

/**
 * @class
 * @classdesc Concrete sfc32 implementation.
 */
class Sfc32 extends _Base_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /**
     * Seed parameters.
     *
     * @var {number}
     */
    a;
    b;
    c;
    d;
    /**
     * Create a new sfc32 instance.
     *
     * @param {string} str
     */
    constructor(str) {
        super();
        // Create the seed for the random number algorithm
        const seed = Sfc32._xfnv1a(str);
        this.a = seed();
        this.b = seed();
        this.c = seed();
        this.d = seed();
    }
    /**
     * Generate a random number using the sfc32 algorithm.
     *
     * @returns {number}
     */
    next() {
        this.a >>>= 0;
        this.b >>>= 0;
        this.c >>>= 0;
        this.d >>>= 0;
        let t = (this.a + this.b) | 0;
        this.a = this.b ^ (this.b >>> 9);
        this.b = (this.c + (this.c << 3)) | 0;
        this.c = (this.c << 21) | (this.c >>> 11);
        this.d = (this.d + 1) | 0;
        t = (t + this.d) | 0;
        this.c = (this.c + t) | 0;
        return (t >>> 0) / 4294967296;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sfc32);


/***/ }),

/***/ "../../DSLIBS/divineRNG/dist/seededRandom/Algorithms/Xoshiro128ss.js":
/*!***************************************************************************!*\
  !*** ../../DSLIBS/divineRNG/dist/seededRandom/Algorithms/Xoshiro128ss.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base.js */ "../../DSLIBS/divineRNG/dist/seededRandom/Algorithms/Base.js");

/**
 * @class
 * @classdesc Concrete xoshiro128** implementation.
 */
class Xoshiro128ss extends _Base_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
    /**
     * Seed parameters.
     *
     * @var {number}
     */
    a;
    b;
    c;
    d;
    /**
     * Create a new xoshiro128** instance.
     *
     * @param {string} str
     */
    constructor(str) {
        super();
        // Create the seed for the random number algorithm
        const seed = Xoshiro128ss._xfnv1a(str);
        this.a = seed();
        this.b = seed();
        this.c = seed();
        this.d = seed();
    }
    /**
     * Generate a random number using the xoshiro128** algorithm.
     *
     * @returns {number}
     */
    next() {
        const t = this.b << 9;
        let r = this.a * 5;
        r = (r << 7) | ((r >>> 25) * 9);
        this.c ^= this.a;
        this.d ^= this.b;
        this.b ^= this.c;
        this.a ^= this.d;
        this.c ^= t;
        this.d = (this.d << 11) | (this.d >>> 21);
        return (r >>> 0) / 4294967296;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Xoshiro128ss);


/***/ }),

/***/ "../../DSLIBS/divineRNG/dist/seededRandom/LCG.js":
/*!*******************************************************!*\
  !*** ../../DSLIBS/divineRNG/dist/seededRandom/LCG.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LCG": () => (/* binding */ LCG)
/* harmony export */ });
class LCG {
    seed;
    m = 4294967296;
    a = 1664525;
    c = 1013904223;
    z = 0;
    constructor(seed) {
        this.seed = seed;
        this.setSeed(seed);
    }
    setSeed(val) {
        this.z = this.seed = (val == null ? Math.random() * this.m : val) >>> 0;
    }
    getSeed() {
        return this.seed;
    }
    rand() {
        this.z = (this.a * this.z + this.c) % this.m;
        return this.z / this.m;
    }
}


/***/ }),

/***/ "../../DSLIBS/divineRNG/dist/seededRandom/Rand.js":
/*!********************************************************!*\
  !*** ../../DSLIBS/divineRNG/dist/seededRandom/Rand.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PRNG": () => (/* binding */ PRNG),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Algorithms_Mulberry32_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Algorithms/Mulberry32.js */ "../../DSLIBS/divineRNG/dist/seededRandom/Algorithms/Mulberry32.js");
/* harmony import */ var _Algorithms_Sfc32_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Algorithms/Sfc32.js */ "../../DSLIBS/divineRNG/dist/seededRandom/Algorithms/Sfc32.js");
/* harmony import */ var _Algorithms_Xoshiro128ss_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Algorithms/Xoshiro128ss.js */ "../../DSLIBS/divineRNG/dist/seededRandom/Algorithms/Xoshiro128ss.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers.js */ "../../DSLIBS/divineRNG/dist/seededRandom/helpers.js");




/**
 * Available seedable random number generator algorithms.
 *
 * @var {PRNG}
 */
var PRNG;
(function (PRNG) {
    PRNG["sfc32"] = "sfc32";
    PRNG["mulberry32"] = "mulberry32";
    PRNG["xoshiro128ss"] = "xoshiro128ss";
})(PRNG || (PRNG = {}));
/**
 * A class for generating random numbers. Several different (seedable) random
 * number generator algorithms are configurable.
 *
 * See https://stackoverflow.com/a/47593316/7024747 for more info.
 * @class
 * @classdesc A class for generating random numbers.
 */
class Rand {
    /**
     * The string that will be used for generating a suitable hash for any of
     * the provided PRNG algorithms.
     *
     * @var {string}
     */
    str;
    /**
     * The PRNG algorithm that should be used for random number generation.
     *
     * @var {PRNG}
     */
    prng;
    /**
     * The generator that should be used for generating random numbers.
     *
     * @var {Function}
     */
    generator;
    /**
     * Create a new rand instance.
     *
     * @param {string} str
     * @param {PRNG} prng
     */
    constructor(str, prng = PRNG.sfc32) {
        this.str = str;
        this.prng = prng;
        this.generator = this._initializeGenerator();
    }
    /**
     * Generate a new random number using the selected generator.
     *
     * @returns {number}
     */
    next() {
        return this.generator.next();
    }
    /**
     * Initialize the chosen random number generator.
     *
     * @returns {Algorithm|Function}
     */
    _initializeGenerator() {
        if ((0,_helpers_js__WEBPACK_IMPORTED_MODULE_3__.isNullOrUndefined)(this.str))
            return this.wrap();
        switch (this.prng) {
            case 'sfc32':
                return new _Algorithms_Sfc32_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.str);
            case 'mulberry32':
                return new _Algorithms_Mulberry32_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.str);
            case 'xoshiro128ss':
                return new _Algorithms_Xoshiro128ss_js__WEBPACK_IMPORTED_MODULE_2__["default"](this.str);
            default:
                return this.wrap();
        }
    }
    /**
     * Wrap the standard random function in an object.
     *
     * @returns {Algorithm}
     */
    wrap() {
        return {
            /**
             * Generate a random number.
             *
             * @return {number}
             */
            next() {
                return Math.random();
            },
        };
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Rand);


/***/ }),

/***/ "../../DSLIBS/divineRNG/dist/seededRandom/helpers.js":
/*!***********************************************************!*\
  !*** ../../DSLIBS/divineRNG/dist/seededRandom/helpers.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isNull": () => (/* binding */ isNull),
/* harmony export */   "isNullOrUndefined": () => (/* binding */ isNullOrUndefined),
/* harmony export */   "isUndefined": () => (/* binding */ isUndefined)
/* harmony export */ });
/**
 * Determine if the given value is undefined.
 *
 * @param {mixed} value
 * @returns {boolean}
 */
const isUndefined = (value) => typeof value === 'undefined';
/**
 * Determine if the given value is null.
 *
 * @param {mixed} value
 * @returns {boolean}
 */
const isNull = (value) => value === null;
/**
 * Determine if the given value is null or undefined.
 *
 * @param {mixed} value
 * @returns {boolean}
 */
const isNullOrUndefined = (value) => {
    return isNull(value) || isUndefined(value);
};


/***/ }),

/***/ "../../DSLIBS/divineRNG/dist/seededRandom/index.js":
/*!*********************************************************!*\
  !*** ../../DSLIBS/divineRNG/dist/seededRandom/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PRNG": () => (/* reexport safe */ _Rand_js__WEBPACK_IMPORTED_MODULE_0__.PRNG),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Rand_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Rand.js */ "../../DSLIBS/divineRNG/dist/seededRandom/Rand.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_Rand_js__WEBPACK_IMPORTED_MODULE_0__["default"]);



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

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Analyzer/Analyzer.js":
/*!****************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Analyzer/Analyzer.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Analyzer": () => (/* binding */ Analyzer)
/* harmony export */ });
/* harmony import */ var _Propagation_Flow_Functions_FlowUpdate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Propagation/Flow/Functions/FlowUpdate.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Flow/Functions/FlowUpdate.js");
/* harmony import */ var _Propagation_Propagation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Propagation/Propagation.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Propagation.js");
/* harmony import */ var _Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Data/Settings/EngineSettings.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Settings/EngineSettings.js");
/* harmony import */ var _Constructor_DivineVoxelEngineConstructor_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Constructor/DivineVoxelEngineConstructor.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/DivineVoxelEngineConstructor.js");
/* harmony import */ var _AnalyzerProcessor_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AnalyzerProcessor.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Analyzer/AnalyzerProcessor.js");
/* harmony import */ var _AnalyzerUpdater_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AnalyzerUpdater.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Analyzer/AnalyzerUpdater.js");
/* harmony import */ var _Tasks_TasksRequest_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Tasks/TasksRequest.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Tasks/TasksRequest.js");
/* harmony import */ var _Tools_Data_DataTool_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../Tools/Data/DataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/DataTool.js");
//propagation


//objects






//tools
const mainDT = new _Tools_Data_DataTool_js__WEBPACK_IMPORTED_MODULE_7__.DataTool();
const secondaryDT = new _Tools_Data_DataTool_js__WEBPACK_IMPORTED_MODULE_7__.DataTool();
const Analyzer = {
    updater: _AnalyzerUpdater_js__WEBPACK_IMPORTED_MODULE_5__.AnalyzerUpdater,
    processor: _AnalyzerProcessor_js__WEBPACK_IMPORTED_MODULE_4__.AnalyzerProcessor,
    _flowChecks: [
        [0, -1, 0],
        [1, 0, 0],
        [-1, 0, 0],
        [0, 0, 1],
        [0, 0, -1],
    ],
    async runPropagation(data) {
        const options = {
            light: _Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_2__.EngineSettings.doLight(),
            flow: _Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_2__.EngineSettings.doFlow(),
        };
        mainDT.setDimension(data[0][0]);
        secondaryDT.setDimension(data[0][0]);
        const tasks = _Tasks_TasksRequest_js__WEBPACK_IMPORTED_MODULE_6__.TasksRequest.getVoxelUpdateRequests(data[0], "none", "self");
        tasks.start();
        this.processor.goThroughColumn(data[0], (x, y, z) => {
            if (!mainDT.loadInAt(x, y, z))
                return;
            if (options.light) {
                if (mainDT.isLightSource()) {
                    tasks.queues.rgb.update.push(x, y, z);
                }
            }
            if (options.flow) {
                if (mainDT.getSubstnaceData().isLiquid()) {
                    let add = false;
                    for (const check of this._flowChecks) {
                        if (secondaryDT.loadInAt(x + check[0], y + check[1], z + check[2])) {
                            if (secondaryDT.isAir()) {
                                add = true;
                                break;
                            }
                        }
                    }
                    if (add) {
                        tasks.queues.flow.update.queue.push([x, y, z]);
                    }
                }
            }
        });
        _Propagation_Propagation_js__WEBPACK_IMPORTED_MODULE_1__.Propagation.rgb.update(tasks);
        const dimension = data[0][0];
        for (const flowUpdate of tasks.queues.flow.update.queue) {
            const [x, y, z] = flowUpdate;
            if (!mainDT.loadInAt(x, y, z))
                continue;
            await (0,_Propagation_Flow_Functions_FlowUpdate_js__WEBPACK_IMPORTED_MODULE_0__.FlowUpdate)(_Tasks_TasksRequest_js__WEBPACK_IMPORTED_MODULE_6__.TasksRequest.getFlowUpdateRequest([dimension, x, y, z], "none", "self"), false);
        }
        tasks.stop();
    },
    async runUpdate(data) {
        if (!this.processor.columnTool.setLocation(data[0]).loadIn())
            return;
        const deltaTime = Date.now() - this.processor.columnTool.getLastAnalyzerUpdateTimestamp();
        const location = [...data[0]];
        this.processor.goThroughColumn(data[0], (x, y, z) => {
            if (!mainDT.loadInAt(x, y, z))
                return;
            location[1] = x;
            location[2] = y;
            location[3] = z;
            const run = this.updater.getVoxel(mainDT.getStringId());
            if (!run)
                return;
            run(location, deltaTime, this, _Constructor_DivineVoxelEngineConstructor_js__WEBPACK_IMPORTED_MODULE_3__.DVEC);
        });
        this.processor.columnTool.setLastAnalyzerUpdateTimestamp();
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Analyzer/AnalyzerProcessor.js":
/*!*************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Analyzer/AnalyzerProcessor.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AnalyzerProcessor": () => (/* binding */ AnalyzerProcessor)
/* harmony export */ });
/* harmony import */ var _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Data/World/WorldSpaces.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldSpaces.js");
/* harmony import */ var _Tools_Data_WorldData_ColumnDataTool_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Tools/Data/WorldData/ColumnDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/WorldData/ColumnDataTool.js");
/* harmony import */ var _Tools_Data_WorldData_HeightMapTool_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Tools/Data/WorldData/HeightMapTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/WorldData/HeightMapTool.js");
/* harmony import */ var _Tools_Data_WorldData_ChunkDataTool_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Tools/Data/WorldData/ChunkDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/WorldData/ChunkDataTool.js");
/* harmony import */ var _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Data/World/WorldRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldRegister.js");





const columnTool = new _Tools_Data_WorldData_ColumnDataTool_js__WEBPACK_IMPORTED_MODULE_1__.ColumnDataTool();
const heightMapTool = new _Tools_Data_WorldData_HeightMapTool_js__WEBPACK_IMPORTED_MODULE_2__.HeightMapTool();
const chunkTool = new _Tools_Data_WorldData_ChunkDataTool_js__WEBPACK_IMPORTED_MODULE_3__.ChunkDataTool();
const AnalyzerProcessor = {
    columnTool: columnTool,
    chunkTool: chunkTool,
    goThroughColumn(location, run) {
        if (!columnTool.setLocation(location).loadIn())
            return;
        _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_4__.WorldRegister.cache.enable();
        const column = columnTool.getColumn();
        let maxX = _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_0__.WorldSpaces.chunk._bounds.x + location[1];
        let maxZ = _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_0__.WorldSpaces.chunk._bounds.z + location[3];
        for (const [index, chunk] of column.chunks) {
            heightMapTool.chunk.setChunk(chunk);
            chunkTool.setChunk(chunk);
            const [dimension, cx, cy, cz] = chunkTool.getLocationData();
            let [minY, maxY] = heightMapTool.chunk.getMinMax();
            minY += cy;
            maxY += cy + 1;
            for (let y = minY; y < maxY; y += 1) {
                for (let z = cz; z < maxZ; z += 1) {
                    for (let x = cx; x < maxX; x += 1) {
                        run(x, y, z, columnTool);
                    }
                }
            }
        }
        _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_4__.WorldRegister.cache.disable();
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Analyzer/AnalyzerUpdater.js":
/*!***********************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Analyzer/AnalyzerUpdater.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AnalyzerUpdater": () => (/* binding */ AnalyzerUpdater)
/* harmony export */ });
const AnalyzerUpdater = {
    _voxels: new Map(),
    registerVoxel(id, run) {
        this._voxels.set(id, run);
    },
    getVoxel(id) {
        const run = this._voxels.get(id);
        if (!run)
            return false;
        return run;
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Builder.js":
/*!**************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Builder.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Builder": () => (/* binding */ Builder)
/* harmony export */ });
/* harmony import */ var _Hooks_ConstructorHooks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Hooks/ConstructorHooks.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Hooks/ConstructorHooks.js");
/* harmony import */ var _Constructors_Voxel_VoxelConstructors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Constructors/Voxel/VoxelConstructors.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Constructors/Voxel/VoxelConstructors.js");
/* harmony import */ var _Processors_ChunkProcessor_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Processors/ChunkProcessor.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Processors/ChunkProcessor.js");
/* harmony import */ var _Rules_Overrides_OverridesManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Rules/Overrides/OverridesManager.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Rules/Overrides/OverridesManager.js");
/* harmony import */ var _Rules_RenderedSubstances_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Rules/RenderedSubstances.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Rules/RenderedSubstances.js");
/* harmony import */ var _Textures_TextureManager_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Textures/TextureManager.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Textures/TextureManager.js");
/* harmony import */ var _Nodes_NodeBuilderManager_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Nodes/NodeBuilderManager.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Nodes/NodeBuilderManager.js");







const Builder = {
    constructors: _Constructors_Voxel_VoxelConstructors_js__WEBPACK_IMPORTED_MODULE_1__.VoxelConstructors,
    textureManager: _Textures_TextureManager_js__WEBPACK_IMPORTED_MODULE_5__.TextureManager,
    chunkProcessor: _Processors_ChunkProcessor_js__WEBPACK_IMPORTED_MODULE_2__.ChunkProcessor,
    nodes: _Nodes_NodeBuilderManager_js__WEBPACK_IMPORTED_MODULE_6__.NodeBuilderManager,
    overrides: _Rules_Overrides_OverridesManager_js__WEBPACK_IMPORTED_MODULE_3__.OverrideManager,
    renderedSubstances: _Rules_RenderedSubstances_js__WEBPACK_IMPORTED_MODULE_4__.RenderedSubstances,
    $INIT() {
        _Hooks_ConstructorHooks_js__WEBPACK_IMPORTED_MODULE_0__.ConstructorHooks.texturesRegistered.addToRun((manager) => {
            this.constructors.constructors._map.forEach((_) => {
                _.onTexturesRegistered(manager);
            });
        });
    },
    buildChunk(location, LOD = 1) {
        this.chunkProcessor.build(location);
        return true;
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Calc/Flow/FlowGradient.js":
/*!*****************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Calc/Flow/FlowGradient.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FlowGradient": () => (/* binding */ FlowGradient)
/* harmony export */ });
/* harmony import */ var _Classes_VertexData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Classes/VertexData.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Classes/VertexData.js");

const checkSets = {
    1: [
        -1, 0, 0, -1,
        //corner
        -1, -1,
    ],
    2: [
        -1, 0, 0, 1,
        //corner
        -1, 1,
    ],
    3: [
        1, 0, 0, 1,
        //corner
        1, 1,
    ],
    4: [
        1, 0, 0, -1,
        //corner
        1, -1,
    ],
};
const flowStates = new _Classes_VertexData_js__WEBPACK_IMPORTED_MODULE_0__.QuadVertexData();
const FlowGradient = {
    getLevel(tool) {
        if (!tool.nVoxel.isRenderable())
            return -1;
        if (!tool.voxel.isSameVoxel(tool.nVoxel.x, tool.nVoxel.y, tool.nVoxel.z))
            return -1;
        const level = tool.nVoxel.getLevel();
        return level;
    },
    calculate(tool) {
        const cl = tool.voxel.getLevel();
        const cs = tool.voxel.getLevelState();
        if (cl == 15 && cs == 1) {
            if (tool.voxel.isSameVoxel(tool.voxel.x, tool.voxel.y + 1, tool.voxel.z)) {
                flowStates.setAll(15);
                return tool.getWorldLevel().setFromQuadData(flowStates);
            }
        }
        for (let vertex = 1; vertex <= 4; vertex++) {
            const checkSet = checkSets[vertex];
            if (cl == 15 && cs != 1) {
                flowStates.vetexes[vertex] = 15;
                continue;
            }
            let finalLevel = cl;
            let voxelCount = 0;
            let zeroCount = 0;
            let totalZero = true;
            let ovveride = false;
            let totalLevel = 0;
            for (let iy = 0; iy < 2; iy++) {
                for (let i = 0; i < 6; i += 2) {
                    const cx = checkSet[i] + tool.voxel.x;
                    const cz = checkSet[i + 1] + tool.voxel.z;
                    const loadedIn = tool.nVoxel.loadInAt(cx, tool.voxel.y + iy, cz);
                    if (!loadedIn)
                        continue;
                    const level = this.getLevel(tool);
                    const hasVoxel = tool.nVoxel.isRenderable();
                    if (hasVoxel && !tool.nVoxel.getSubstnaceData().isLiquid()) {
                        voxelCount++;
                    }
                    if (iy == 1) {
                        if (level > 0) {
                            finalLevel = 15;
                            totalZero = false;
                            ovveride = true;
                            totalLevel += level;
                        }
                    }
                    if (level <= 0 && !hasVoxel) {
                        if (iy == 0) {
                            zeroCount++;
                        }
                        continue;
                    }
                    if (level == 15) {
                        finalLevel = 15;
                        totalZero = false;
                        zeroCount = 0;
                        break;
                    }
                    if (level > 0 && !hasVoxel) {
                        totalZero = false;
                    }
                    if (finalLevel < level) {
                        finalLevel += level - finalLevel;
                    }
                }
            }
            if (ovveride && totalLevel == 1 && voxelCount == 3) {
                finalLevel = cl;
            }
            if (zeroCount >= 1 && cs == 0 && !ovveride) {
                finalLevel = 0;
            }
            if (totalZero && cs == 1 && cl == 15) {
                finalLevel = 7;
            }
            if (finalLevel > 15)
                finalLevel = 15;
            if (finalLevel < 1)
                finalLevel = 1;
            flowStates.vetexes[vertex] = finalLevel;
        }
        tool.getWorldLevel().setFromQuadData(flowStates);
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Calc/Light/LightGradient.js":
/*!*******************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Calc/Light/LightGradient.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LightGradient": () => (/* binding */ LightGradient)
/* harmony export */ });
/* harmony import */ var _Rules_Overrides_OverridesManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Rules/Overrides/OverridesManager.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Rules/Overrides/OverridesManager.js");
/* harmony import */ var _Data_Light_LightByte_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../Data/Light/LightByte.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Light/LightByte.js");
/* harmony import */ var _Classes_VertexData_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Classes/VertexData.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Classes/VertexData.js");
/* harmony import */ var _Rules_SubstanceRules_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Rules/SubstanceRules.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Rules/SubstanceRules.js");
/* harmony import */ var _Math_Constants_Faces_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../Math/Constants/Faces.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Constants/Faces.js");





const LD = _Data_Light_LightByte_js__WEBPACK_IMPORTED_MODULE_1__.LightData;
const LightValue = new _Classes_VertexData_js__WEBPACK_IMPORTED_MODULE_2__.QuadVertexData();
const RGBState = new _Classes_VertexData_js__WEBPACK_IMPORTED_MODULE_2__.QuadVertexData();
const SunState = new _Classes_VertexData_js__WEBPACK_IMPORTED_MODULE_2__.QuadVertexData();
const AOValue = new _Classes_VertexData_js__WEBPACK_IMPORTED_MODULE_2__.QuadVertexData();
const AOState = new _Classes_VertexData_js__WEBPACK_IMPORTED_MODULE_2__.QuadVertexData();
const swapSun = () => {
    LightValue.set(LD.setS(LD.getS(LightValue.vetexes[4]), LightValue.vetexes[1]), LD.setS(LD.getS(LightValue.vetexes[1]), LightValue.vetexes[2]), LD.setS(LD.getS(LightValue.vetexes[2]), LightValue.vetexes[3]), LD.setS(LD.getS(LightValue.vetexes[3]), LightValue.vetexes[4]));
};
const swapRGB = () => {
    LightValue.set(LD.setRGB(LD.getRGB(LightValue.vetexes[4]), LightValue.vetexes[1]), LD.setRGB(LD.getRGB(LightValue.vetexes[1]), LightValue.vetexes[2]), LD.setRGB(LD.getRGB(LightValue.vetexes[2]), LightValue.vetexes[3]), LD.setRGB(LD.getRGB(LightValue.vetexes[3]), LightValue.vetexes[4]));
};
const swapAO = () => {
    AOValue.set(AOValue.vetexes[1], AOValue.vetexes[2], AOValue.vetexes[3], AOValue.vetexes[4]);
};
const shouldAOFlip = (face) => {
    if (states.ignoreAO)
        return false;
    LightGradient.tool.faceDataOverride.face = face;
    LightGradient.tool.faceDataOverride.default = false;
    if (_Rules_Overrides_OverridesManager_js__WEBPACK_IMPORTED_MODULE_0__.OverrideManager.runOverride("AOFlipFace", LightGradient.tool.voxel.getShapeId(), "Any", LightGradient.tool.faceDataOverride)) {
        return false;
    }
    let check = false;
    if (!states.ignoreAO) {
        check = AOState.isEqualTo(0, 1, 1, 1);
        AOState.isEqualTo(1, 1, 0, 1) || AOState.isEqualTo(0, 1, 0, 1);
    }
    return check;
};
const flipCheck = (face) => {
    const rgbFlip = RGBState.isEqualTo(0, 1, 1, 1) ||
        RGBState.isEqualTo(1, 1, 0, 1) ||
        RGBState.isEqualTo(0, 1, 0, 1);
    const sunFlip = SunState.isEqualTo(0, 1, 1, 1) ||
        SunState.isEqualTo(1, 1, 0, 1) ||
        SunState.isEqualTo(0, 1, 0, 1);
    const aoFlip = shouldAOFlip(face);
    if (rgbFlip && !sunFlip) {
        swapSun();
    }
    if (!rgbFlip && sunFlip) {
        swapRGB();
    }
    if ((sunFlip || rgbFlip) && !aoFlip) {
        swapAO();
    }
    if (!sunFlip && aoFlip) {
        swapSun();
    }
    if (!rgbFlip && aoFlip) {
        swapRGB();
    }
    return rgbFlip || sunFlip || aoFlip;
};
const checkSets = {
    top: {
        1: [-1, 1, 0, 0, 1, -1, -1, 1, -1],
        2: [-1, 1, 0, 0, 1, 1, -1, 1, 1],
        3: [1, 1, 0, 0, 1, 1, 1, 1, 1],
        4: [1, 1, 0, 0, 1, -1, 1, 1, -1],
    },
    bottom: {
        1: [0, -1, -1, -1, -1, 0, -1, -1, -1],
        2: [0, -1, -1, 1, -1, 0, 1, -1, -1],
        3: [0, -1, 1, 1, -1, 0, 1, -1, 1],
        4: [0, -1, 1, -1, -1, 0, -1, -1, 1],
    },
    east: {
        1: [1, 0, -1, 1, 1, 0, 1, 1, -1],
        2: [1, 0, 1, 1, 1, 0, 1, 1, 1],
        3: [1, 0, 1, 1, -1, 0, 1, -1, 1],
        4: [1, 0, -1, 1, -1, 0, 1, -1, -1],
    },
    west: {
        1: [-1, 0, 1, -1, 1, 0, -1, 1, 1],
        2: [-1, 0, -1, -1, 1, 0, -1, 1, -1],
        3: [-1, 0, -1, -1, -1, 0, -1, -1, -1],
        4: [-1, 0, 1, -1, -1, 0, -1, -1, 1],
    },
    south: {
        1: [-1, 0, -1, 0, 1, -1, -1, 1, -1],
        2: [1, 0, -1, 0, 1, -1, 1, 1, -1],
        3: [1, 0, -1, 0, -1, -1, 1, -1, -1],
        4: [-1, 0, -1, 0, -1, -1, -1, -1, -1],
    },
    north: {
        1: [1, 0, 1, 0, 1, 1, 1, 1, 1],
        2: [-1, 0, 1, 0, 1, 1, -1, 1, 1],
        3: [-1, 0, 1, 0, -1, 1, -1, -1, 1],
        4: [1, 0, 1, 0, -1, 1, 1, -1, 1],
    },
};
const states = { ignoreAO: false };
const newRGBValues = [];
const zeroCheck = { s: 0, r: 0, g: 0, b: 0 };
const RGBValues = { r: 0, g: 0, b: 0 };
const sunValues = { s: 0 };
const nlValues = { s: 0, r: 0, g: 0, b: 0 };
const AOValues = { a: 0 };
const LightGradient = {
    tool: {},
    settings: {
        doAO: true,
        doRGB: true,
        doSun: true,
    },
    calculate(face, tool, ignoreAO) {
        this.tool = tool;
        const voxelSubstance = _Rules_SubstanceRules_js__WEBPACK_IMPORTED_MODULE_3__.SubstanceRules.getSubstanceParent(tool.voxel.getSubstance());
        const isLightSource = tool.voxel.isLightSource();
        let light = tool.voxel.getLight();
        let aoOverRide = -1;
        if (this.settings.doAO && !ignoreAO) {
            AOValue.setAll(1);
            AOState.setAll(1);
            states.ignoreAO = false;
        }
        else {
            states.ignoreAO = true;
        }
        const faceNormal = _Math_Constants_Faces_js__WEBPACK_IMPORTED_MODULE_4__.FaceNormals[face];
        tool.nVoxel.loadInAt(tool.voxel.x + faceNormal[0], tool.voxel.y + faceNormal[1], tool.voxel.z + faceNormal[2]);
        light = tool.nVoxel.getLight();
        if (light < 0) {
            if (tool.voxel.getLight() >= 0) {
                light = tool.voxel.getLight();
            }
            else {
                light = 0;
            }
        }
        if (tool.nVoxel.isRenderable() && !tool.nVoxel.isLightSource()) {
            tool.faceDataOverride.face = face;
            tool.faceDataOverride.default = false;
            if (_Rules_Overrides_OverridesManager_js__WEBPACK_IMPORTED_MODULE_0__.OverrideManager.runOverride("DarkenFaceUnderneath", tool.nVoxel.getShapeId(), "All", tool.faceDataOverride)) {
                aoOverRide = 2;
            }
        }
        for (let vertex = 1; vertex <= 4; vertex++) {
            const checkSet = checkSets[face][vertex];
            if (this.settings.doRGB || this.settings.doSun) {
                const values = LD.getLightValues(light);
                if (this.settings.doSun) {
                    sunValues.s = values[0];
                    if (sunValues.s == 0)
                        zeroCheck.s++;
                }
                if (this.settings.doRGB) {
                    RGBValues.r = values[1];
                    if (RGBValues.r == 0)
                        zeroCheck.r++;
                    RGBValues.g = values[2];
                    if (RGBValues.g == 0)
                        zeroCheck.g++;
                    RGBValues.b = values[3];
                    if (RGBValues.b == 0)
                        zeroCheck.b++;
                }
            }
            if (!states.ignoreAO) {
                AOValues.a = 1;
            }
            for (let i = 0; i < 9; i += 3) {
                if (this.settings.doRGB || this.settings.doSun) {
                    if (!tool.nVoxel.loadInAt(checkSet[i] + tool.voxel.x, checkSet[i + 1] + tool.voxel.y, checkSet[i + 2] + tool.voxel.z))
                        continue;
                    const nl = tool.nVoxel.getLight();
                    if (nl >= 0) {
                        const values = LD.getLightValues(nl);
                        nlValues.s = values[0];
                        nlValues.r = values[1];
                        nlValues.g = values[2];
                        nlValues.b = values[3];
                        doRGB: if (this.settings.doRGB) {
                            if (nlValues.r == 0)
                                zeroCheck.r++;
                            if (nlValues.g == 0)
                                zeroCheck.g++;
                            if (nlValues.b == 0)
                                zeroCheck.b++;
                            if (!LD.removeS(nl))
                                break doRGB;
                            if (nlValues.r > RGBValues.r && RGBValues.r < 15) {
                                RGBValues.r++;
                            }
                            if (nlValues.g > RGBValues.g && RGBValues.g < 15) {
                                RGBValues.g++;
                            }
                            if (nlValues.b > RGBValues.b && RGBValues.b < 15) {
                                RGBValues.b++;
                            }
                        }
                        doSun: if (this.settings.doSun) {
                            if (nlValues.s == 0)
                                zeroCheck.s++;
                            if (!LD.getS(nl))
                                break doSun;
                            if (sunValues.s < nlValues.s && sunValues.s < 15) {
                                sunValues.s += LD.SRS;
                            }
                        }
                    }
                }
                /*
                Do AO
                */
                doAO: if (!states.ignoreAO) {
                    if (aoOverRide > 0) {
                        AOState.setVertex(vertex, 0);
                        AOValues.a = aoOverRide;
                        break doAO;
                    }
                    if (!tool.nVoxel.isRenderable())
                        break doAO;
                    const neighborVoxelSubstance = _Rules_SubstanceRules_js__WEBPACK_IMPORTED_MODULE_3__.SubstanceRules.getSubstanceParent(tool.nVoxel.getSubstance());
                    const neightLightSource = tool.nVoxel.isLightSource();
                    let finalResult = true;
                    if (neighborVoxelSubstance != voxelSubstance) {
                        finalResult = false;
                    }
                    if (isLightSource || neightLightSource) {
                        finalResult = false;
                    }
                    tool.faceDataOverride.face = face;
                    tool.faceDataOverride.default = finalResult;
                    finalResult = _Rules_Overrides_OverridesManager_js__WEBPACK_IMPORTED_MODULE_0__.OverrideManager.runOverride("AO", tool.voxel.getShapeId(), tool.nVoxel.getShapeId(), tool.faceDataOverride);
                    if (!finalResult)
                        break doAO;
                    AOState.setVertex(vertex, 0);
                    AOValues.a++;
                }
            }
            /*
            Light End
            */
            if (this.settings.doSun || this.settings.doRGB) {
                let zeroTolerance = 2;
                let totalZero = true;
                if (zeroCheck.s >= zeroTolerance) {
                    SunState.setVertex(vertex, 1);
                    newRGBValues[0] = 0;
                }
                else {
                    SunState.setVertex(vertex, 0);
                    newRGBValues[0] = sunValues.s;
                }
                if (zeroCheck.r >= zeroTolerance) {
                    newRGBValues[1] = 0;
                }
                else {
                    totalZero = false;
                    newRGBValues[1] = RGBValues.r;
                }
                if (zeroCheck.g >= zeroTolerance) {
                    newRGBValues[2] = 0;
                }
                else {
                    totalZero = false;
                    newRGBValues[2] = RGBValues.g;
                }
                if (zeroCheck.b >= zeroTolerance) {
                    newRGBValues[3] = 0;
                }
                else {
                    totalZero = false;
                    newRGBValues[3] = RGBValues.b;
                }
                RGBState.setVertex(vertex, totalZero ? 0 : 1);
                LightValue.setVertex(vertex, LD.setLightValues(newRGBValues));
                zeroCheck.s = 0;
                zeroCheck.r = 0;
                zeroCheck.b = 0;
                zeroCheck.g = 0;
            }
            /*
            AO End
            */
            if (this.settings.doAO) {
                AOValue.setVertex(vertex, AOValues.a);
            }
        }
        if (flipCheck(face)) {
            tool
                .setFaceFlipped(true)
                .getWorldLight()
                .set(LightValue.vetexes[2], LightValue.vetexes[1], LightValue.vetexes[4], LightValue.vetexes[3]);
            if (!states.ignoreAO) {
                tool
                    .getWorldAO()
                    .set(AOValue.vetexes[4], AOValue.vetexes[1], AOValue.vetexes[2], AOValue.vetexes[3]);
            }
            return;
        }
        tool
            .setFaceFlipped(false)
            .getWorldLight()
            .set(LightValue.vetexes[1], LightValue.vetexes[2], LightValue.vetexes[3], LightValue.vetexes[4]);
        if (!states.ignoreAO) {
            tool
                .getWorldAO()
                .set(AOValue.vetexes[1], AOValue.vetexes[2], AOValue.vetexes[3], AOValue.vetexes[4]);
        }
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Classes/VertexData.js":
/*!*************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Classes/VertexData.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "QuadVertexData": () => (/* binding */ QuadVertexData)
/* harmony export */ });
class QuadVertexData {
    vetexes = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
    };
    getAsArray() {
        return [this.vetexes[1], this.vetexes[2], this.vetexes[3], this.vetexes[4]];
    }
    setVertex(vertex, value) {
        this.vetexes[vertex] = value;
    }
    addToVertex(vertex, value) {
        this.vetexes[vertex] += value;
    }
    subtractFromVertex(vertex, value) {
        this.vetexes[vertex] -= value;
    }
    getVertex(vertex) {
        return this.vetexes[vertex];
    }
    setAll(value) {
        this.vetexes[1] = value;
        this.vetexes[2] = value;
        this.vetexes[3] = value;
        this.vetexes[4] = value;
    }
    set(v1, v2, v3, v4) {
        this.vetexes[1] = v1;
        this.vetexes[2] = v2;
        this.vetexes[3] = v3;
        this.vetexes[4] = v4;
    }
    setFromQuadData(vertexData) {
        this.vetexes[1] = vertexData.vetexes[1];
        this.vetexes[2] = vertexData.vetexes[2];
        this.vetexes[3] = vertexData.vetexes[3];
        this.vetexes[4] = vertexData.vetexes[4];
    }
    addAll(value) {
        this.vetexes[1] += value;
        this.vetexes[2] += value;
        this.vetexes[3] += value;
        this.vetexes[4] += value;
    }
    add(v1, v2, v3, v4) {
        this.vetexes[1] += v1;
        this.vetexes[2] += v2;
        this.vetexes[3] += v3;
        this.vetexes[4] += v4;
    }
    subtractAll(value) {
        this.vetexes[1] -= value;
        this.vetexes[2] -= value;
        this.vetexes[3] -= value;
        this.vetexes[4] -= value;
    }
    subtract(v1, v2, v3, v4) {
        this.vetexes[1] += v1;
        this.vetexes[2] += v2;
        this.vetexes[3] += v3;
        this.vetexes[4] += v4;
    }
    isEqualTo(v1, v2, v3, v4) {
        if (this.vetexes[1] != v1)
            return false;
        if (this.vetexes[2] != v2)
            return false;
        if (this.vetexes[3] != v3)
            return false;
        if (this.vetexes[4] != v4)
            return false;
        return true;
    }
    isAllEqualTo(value) {
        if (this.vetexes[1] != value)
            return false;
        if (this.vetexes[2] != value)
            return false;
        if (this.vetexes[3] != value)
            return false;
        if (this.vetexes[4] != value)
            return false;
        return true;
    }
    isGreaterThan(v1, v2, v3, v4) {
        if (this.vetexes[1] < v1)
            return false;
        if (this.vetexes[2] < v2)
            return false;
        if (this.vetexes[3] < v3)
            return false;
        if (this.vetexes[4] < v4)
            return false;
        return true;
    }
    isAllGreaterThan(value) {
        if (this.vetexes[1] < value)
            return false;
        if (this.vetexes[2] < value)
            return false;
        if (this.vetexes[3] < value)
            return false;
        if (this.vetexes[4] < value)
            return false;
        return true;
    }
    isLessThan(v1, v2, v3, v4) {
        if (this.vetexes[1] > v1)
            return false;
        if (this.vetexes[2] > v2)
            return false;
        if (this.vetexes[3] > v3)
            return false;
        if (this.vetexes[4] > v4)
            return false;
        return true;
    }
    isAllLessThan(value) {
        if (this.vetexes[1] > value)
            return false;
        if (this.vetexes[2] > value)
            return false;
        if (this.vetexes[3] > value)
            return false;
        if (this.vetexes[4] > value)
            return false;
        return true;
    }
    forEach(run) {
        run(1, this.vetexes[1]);
        run(2, this.vetexes[2]);
        run(3, this.vetexes[3]);
        run(4, this.vetexes[4]);
    }
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Constructors/Voxel/Classes/Box/PillarBox.constructor.js":
/*!***********************************************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Constructors/Voxel/Classes/Box/PillarBox.constructor.js ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PillarBoxVoxelConstructor": () => (/* binding */ PillarBoxVoxelConstructor)
/* harmony export */ });
/* harmony import */ var _Shapes_default_Box_Box_voxel_shape_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../Shapes/default/Box/Box.voxel.shape.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/default/Box/Box.voxel.shape.js");
/* harmony import */ var _VoxelConstructor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../VoxelConstructor.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Constructors/Voxel/Classes/VoxelConstructor.js");


class PillarBoxVoxelConstructor extends _VoxelConstructor_js__WEBPACK_IMPORTED_MODULE_1__.VoxelConstructor {
    id;
    textureData;
    textures;
    constructor(id, textureData) {
        super();
        this.id = id;
        this.textureData = textureData;
    }
    process(tool) {
        const topCheck = tool.voxel.isSameVoxel(tool.voxel.x, tool.voxel.y + 1, tool.voxel.z);
        const bottomCheck = tool.voxel.isSameVoxel(tool.voxel.x, tool.voxel.y, tool.voxel.z);
        let side = -1;
        determineText: if (side) {
            if (topCheck && bottomCheck) {
                side = this.textures[2];
                break determineText;
            }
            if (topCheck && !bottomCheck) {
                side = this.textures[3];
                break determineText;
            }
            if (!topCheck && bottomCheck) {
                side = this.textures[4];
                break determineText;
            }
            if (!topCheck && !bottomCheck) {
                side = this.textures[5];
                break determineText;
            }
            side = 0;
        }
        tool.getOverlayTextures().setAll(0);
        if (tool.isFaceExposed("top")) {
            tool.setTexture(this.textures[0]).calculateLight("top");
            _Shapes_default_Box_Box_voxel_shape_js__WEBPACK_IMPORTED_MODULE_0__.BoxVoxelShape.add.top();
        }
        if (tool.isFaceExposed("bottom")) {
            tool.setTexture(this.textures[1]).calculateLight("bottom");
            _Shapes_default_Box_Box_voxel_shape_js__WEBPACK_IMPORTED_MODULE_0__.BoxVoxelShape.add.bottom();
        }
        if (tool.isFaceExposed("east")) {
            tool.setTexture(side).calculateLight("east");
            _Shapes_default_Box_Box_voxel_shape_js__WEBPACK_IMPORTED_MODULE_0__.BoxVoxelShape.add.east();
        }
        if (tool.isFaceExposed("west")) {
            tool.setTexture(side).calculateLight("west");
            _Shapes_default_Box_Box_voxel_shape_js__WEBPACK_IMPORTED_MODULE_0__.BoxVoxelShape.add.west();
        }
        if (tool.isFaceExposed("south")) {
            tool.setTexture(side).calculateLight("south");
            _Shapes_default_Box_Box_voxel_shape_js__WEBPACK_IMPORTED_MODULE_0__.BoxVoxelShape.add.south();
        }
        if (tool.isFaceExposed("north")) {
            tool.setTexture(side).calculateLight("north");
            _Shapes_default_Box_Box_voxel_shape_js__WEBPACK_IMPORTED_MODULE_0__.BoxVoxelShape.add.north();
        }
    }
    onTexturesRegistered(textureManager) {
        this.textures = [
            textureManager.getTextureUV(this.textureData.top),
            textureManager.getTextureUV(this.textureData.bottom),
            textureManager.getTextureUV(this.textureData.sideMiddle),
            textureManager.getTextureUV(this.textureData.sideBottom),
            textureManager.getTextureUV(this.textureData.sideTop),
            textureManager.getTextureUV(this.textureData.sideFloat),
        ];
        this.textureData = null;
    }
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Constructors/Voxel/Classes/Box/SimpleBox.constructor.js":
/*!***********************************************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Constructors/Voxel/Classes/Box/SimpleBox.constructor.js ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SimpleBoxVoxelConstructor": () => (/* binding */ SimpleBoxVoxelConstructor)
/* harmony export */ });
/* harmony import */ var _Shapes_default_Box_Box_voxel_shape_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../Shapes/default/Box/Box.voxel.shape.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/default/Box/Box.voxel.shape.js");
/* harmony import */ var _VoxelConstructor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../VoxelConstructor.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Constructors/Voxel/Classes/VoxelConstructor.js");


class SimpleBoxVoxelConstructor extends _VoxelConstructor_js__WEBPACK_IMPORTED_MODULE_1__.VoxelConstructor {
    id;
    textureData;
    textures = [];
    constructor(id, textureData) {
        super();
        this.id = id;
        this.textureData = textureData;
    }
    process(tool) {
        tool.getOverlayTextures().setAll(0);
        if (tool.isFaceExposed("top")) {
            tool.setTexture(this.textures[0]).calculateLight("top");
            _Shapes_default_Box_Box_voxel_shape_js__WEBPACK_IMPORTED_MODULE_0__.BoxVoxelShape.add.top();
        }
        if (tool.isFaceExposed("bottom")) {
            tool.setTexture(this.textures[1]).calculateLight("bottom");
            _Shapes_default_Box_Box_voxel_shape_js__WEBPACK_IMPORTED_MODULE_0__.BoxVoxelShape.add.bottom();
        }
        if (tool.isFaceExposed("east")) {
            tool.setTexture(this.textures[2]).calculateLight("east");
            _Shapes_default_Box_Box_voxel_shape_js__WEBPACK_IMPORTED_MODULE_0__.BoxVoxelShape.add.east();
        }
        if (tool.isFaceExposed("west")) {
            tool.setTexture(this.textures[3]).calculateLight("west");
            _Shapes_default_Box_Box_voxel_shape_js__WEBPACK_IMPORTED_MODULE_0__.BoxVoxelShape.add.west();
        }
        if (tool.isFaceExposed("south")) {
            tool.setTexture(this.textures[4]).calculateLight("south");
            _Shapes_default_Box_Box_voxel_shape_js__WEBPACK_IMPORTED_MODULE_0__.BoxVoxelShape.add.south();
        }
        if (tool.isFaceExposed("north")) {
            tool.setTexture(this.textures[5]).calculateLight("north");
            _Shapes_default_Box_Box_voxel_shape_js__WEBPACK_IMPORTED_MODULE_0__.BoxVoxelShape.add.north();
        }
    }
    onTexturesRegistered(textureManager) {
        const textures = this.textureData;
        if (Array.isArray(textures)) {
            let i = 6;
            while (i--) {
                this.textures.push(textureManager.getTextureUV(textures));
            }
            return;
        }
        this.textures.push(textureManager.getTextureUV(textures.top));
        this.textures.push(textureManager.getTextureUV(textures.bottom));
        this.textures.push(textureManager.getTextureUV(textures.east));
        this.textures.push(textureManager.getTextureUV(textures.west));
        this.textures.push(textureManager.getTextureUV(textures.south));
        this.textures.push(textureManager.getTextureUV(textures.north));
    }
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Constructors/Voxel/Classes/Liquid/SimpleLiquid.constructor.js":
/*!*****************************************************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Constructors/Voxel/Classes/Liquid/SimpleLiquid.constructor.js ***!
  \*****************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SimpleLiquidConstructor": () => (/* binding */ SimpleLiquidConstructor)
/* harmony export */ });
/* harmony import */ var _VoxelConstructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../VoxelConstructor.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Constructors/Voxel/Classes/VoxelConstructor.js");
/* harmony import */ var _Shapes_default_Liquid_Liquid_voxel_shape_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../Shapes/default/Liquid/Liquid.voxel.shape.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/default/Liquid/Liquid.voxel.shape.js");


class SimpleLiquidConstructor extends _VoxelConstructor_js__WEBPACK_IMPORTED_MODULE_0__.VoxelConstructor {
    id;
    textureData;
    textures = [];
    constructor(id, textureData) {
        super();
        this.id = id;
        this.textureData = textureData;
    }
    process(tool) {
        _Shapes_default_Liquid_Liquid_voxel_shape_js__WEBPACK_IMPORTED_MODULE_1__.LiquidVoxelShape.start();
        tool.getOverlayTextures().setAll(0);
        if (tool.isFaceExposed("top")) {
            tool.setTexture(this.textures[0]).calculateLight("top", true);
            _Shapes_default_Liquid_Liquid_voxel_shape_js__WEBPACK_IMPORTED_MODULE_1__.LiquidVoxelShape.add.top();
        }
        if (tool.isFaceExposed("bottom")) {
            tool.setTexture(this.textures[0]).calculateLight("bottom", true);
            _Shapes_default_Liquid_Liquid_voxel_shape_js__WEBPACK_IMPORTED_MODULE_1__.LiquidVoxelShape.add.bottom();
        }
        if (tool.isFaceExposed("east")) {
            tool.setTexture(this.textures[0]).calculateLight("east", true);
            _Shapes_default_Liquid_Liquid_voxel_shape_js__WEBPACK_IMPORTED_MODULE_1__.LiquidVoxelShape.add.east();
        }
        if (tool.isFaceExposed("west")) {
            tool.setTexture(this.textures[0]).calculateLight("west", true);
            _Shapes_default_Liquid_Liquid_voxel_shape_js__WEBPACK_IMPORTED_MODULE_1__.LiquidVoxelShape.add.west();
        }
        if (tool.isFaceExposed("south")) {
            tool.setTexture(this.textures[0]).calculateLight("south", true);
            _Shapes_default_Liquid_Liquid_voxel_shape_js__WEBPACK_IMPORTED_MODULE_1__.LiquidVoxelShape.add.south();
        }
        if (tool.isFaceExposed("north")) {
            tool.setTexture(this.textures[0]).calculateLight("north", true);
            _Shapes_default_Liquid_Liquid_voxel_shape_js__WEBPACK_IMPORTED_MODULE_1__.LiquidVoxelShape.add.north();
        }
    }
    onTexturesRegistered(textureManager) {
        for (const text of this.textureData) {
            this.textures.push(textureManager.getTextureUV(text));
        }
    }
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Constructors/Voxel/Classes/Panel/SimpleCrossedPanel.constructor.js":
/*!**********************************************************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Constructors/Voxel/Classes/Panel/SimpleCrossedPanel.constructor.js ***!
  \**********************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SimpleCrossedPanelVoxelConstructor": () => (/* binding */ SimpleCrossedPanelVoxelConstructor)
/* harmony export */ });
/* harmony import */ var _VoxelConstructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../VoxelConstructor.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Constructors/Voxel/Classes/VoxelConstructor.js");
/* harmony import */ var _Shapes_default_Panel_CrossedPanels_voxel_shape_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../Shapes/default/Panel/CrossedPanels.voxel.shape.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/default/Panel/CrossedPanels.voxel.shape.js");


class SimpleCrossedPanelVoxelConstructor extends _VoxelConstructor_js__WEBPACK_IMPORTED_MODULE_0__.VoxelConstructor {
    id;
    textuerData;
    texture = 0;
    constructor(id, textuerData) {
        super();
        this.id = id;
        this.textuerData = textuerData;
    }
    process(tool) {
        tool.setTexture(this.texture);
        tool.getOverlayTextures().setAll(0);
        tool.getWorldAO().setAll(1);
        tool.getWorldLight().setAll(tool.voxel.getLight());
        _Shapes_default_Panel_CrossedPanels_voxel_shape_js__WEBPACK_IMPORTED_MODULE_1__.CrossedPanels.build();
    }
    onTexturesRegistered(textureManager) {
        this.texture = textureManager.getTextureUV(this.textuerData);
        this.textuerData = null;
    }
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Constructors/Voxel/Classes/Panel/SimplePanel.constructor.js":
/*!***************************************************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Constructors/Voxel/Classes/Panel/SimplePanel.constructor.js ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SimplePanelVoxelConstructor": () => (/* binding */ SimplePanelVoxelConstructor)
/* harmony export */ });
/* harmony import */ var _VoxelConstructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../VoxelConstructor.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Constructors/Voxel/Classes/VoxelConstructor.js");
/* harmony import */ var _Shapes_default_Panel_Panel_voxel_shape_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../Shapes/default/Panel/Panel.voxel.shape.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/default/Panel/Panel.voxel.shape.js");


class SimplePanelVoxelConstructor extends _VoxelConstructor_js__WEBPACK_IMPORTED_MODULE_0__.VoxelConstructor {
    id;
    textuerData;
    texture = 0;
    constructor(id, textuerData) {
        super();
        this.id = id;
        this.textuerData = textuerData;
    }
    process(tool) {
        tool.setTexture(this.texture);
        tool.getOverlayTextures().setAll(0);
        tool.getWorldAO().setAll(1);
        tool.getWorldLight().setAll(tool.voxel.getLight());
        _Shapes_default_Panel_Panel_voxel_shape_js__WEBPACK_IMPORTED_MODULE_1__.PanelVoxelShape.build();
    }
    onTexturesRegistered(textureManager) {
        this.texture = textureManager.getTextureUV(this.textuerData);
        this.textuerData = null;
    }
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Constructors/Voxel/Classes/Stair/SimpleStair.constructor.js":
/*!***************************************************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Constructors/Voxel/Classes/Stair/SimpleStair.constructor.js ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SimpleStairVoxelConstructor": () => (/* binding */ SimpleStairVoxelConstructor)
/* harmony export */ });
/* harmony import */ var _VoxelConstructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../VoxelConstructor.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Constructors/Voxel/Classes/VoxelConstructor.js");
/* harmony import */ var _Shapes_default_Stairs_Stair_voxel_shape_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../Shapes/default/Stairs/Stair.voxel.shape.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/default/Stairs/Stair.voxel.shape.js");


class SimpleStairVoxelConstructor extends _VoxelConstructor_js__WEBPACK_IMPORTED_MODULE_0__.VoxelConstructor {
    id;
    textureData;
    texture = 0;
    constructor(id, textureData) {
        super();
        this.id = id;
        this.textureData = textureData;
    }
    process(tool) {
        tool.setTexture(this.texture);
        tool.getOverlayTextures().setAll(0);
        if (tool.isFaceExposed("top")) {
            tool.calculateLight("top");
            _Shapes_default_Stairs_Stair_voxel_shape_js__WEBPACK_IMPORTED_MODULE_1__.StairVoxelShape.add.top();
        }
        if (tool.isFaceExposed("bottom")) {
            tool.calculateLight("bottom");
            _Shapes_default_Stairs_Stair_voxel_shape_js__WEBPACK_IMPORTED_MODULE_1__.StairVoxelShape.add.bottom();
        }
        if (tool.isFaceExposed("east")) {
            tool.calculateLight("east");
            _Shapes_default_Stairs_Stair_voxel_shape_js__WEBPACK_IMPORTED_MODULE_1__.StairVoxelShape.add.east();
        }
        if (tool.isFaceExposed("west")) {
            tool.calculateLight("west");
            _Shapes_default_Stairs_Stair_voxel_shape_js__WEBPACK_IMPORTED_MODULE_1__.StairVoxelShape.add.west();
        }
        if (tool.isFaceExposed("south")) {
            tool.calculateLight("south");
            _Shapes_default_Stairs_Stair_voxel_shape_js__WEBPACK_IMPORTED_MODULE_1__.StairVoxelShape.add.south();
        }
        if (tool.isFaceExposed("north")) {
            tool.calculateLight("north");
            _Shapes_default_Stairs_Stair_voxel_shape_js__WEBPACK_IMPORTED_MODULE_1__.StairVoxelShape.add.north();
        }
    }
    onTexturesRegistered(textureManager) {
        this.texture = textureManager.getTextureUV(this.textureData);
        this.textuerData = null;
    }
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Constructors/Voxel/Classes/VoxelConstructor.js":
/*!**************************************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Constructors/Voxel/Classes/VoxelConstructor.js ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VoxelConstructor": () => (/* binding */ VoxelConstructor)
/* harmony export */ });
class VoxelConstructor {
    id;
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Constructors/Voxel/VoxelConstructors.js":
/*!*******************************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Constructors/Voxel/VoxelConstructors.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VoxelConstructors": () => (/* binding */ VoxelConstructors)
/* harmony export */ });
/* harmony import */ var _Global_Util_UtilMap_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../Global/Util/UtilMap.js */ "../../DSLIBS/divineVoxelEngine/dist/Global/Util/UtilMap.js");
/* harmony import */ var _Classes_Box_SimpleBox_constructor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Classes/Box/SimpleBox.constructor.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Constructors/Voxel/Classes/Box/SimpleBox.constructor.js");
/* harmony import */ var _Classes_Box_PillarBox_constructor_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Classes/Box/PillarBox.constructor.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Constructors/Voxel/Classes/Box/PillarBox.constructor.js");
/* harmony import */ var _Classes_Liquid_SimpleLiquid_constructor_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Classes/Liquid/SimpleLiquid.constructor.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Constructors/Voxel/Classes/Liquid/SimpleLiquid.constructor.js");
/* harmony import */ var _Classes_Panel_SimplePanel_constructor_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Classes/Panel/SimplePanel.constructor.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Constructors/Voxel/Classes/Panel/SimplePanel.constructor.js");
/* harmony import */ var _Classes_Stair_SimpleStair_constructor_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Classes/Stair/SimpleStair.constructor.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Constructors/Voxel/Classes/Stair/SimpleStair.constructor.js");
/* harmony import */ var _Classes_Panel_SimpleCrossedPanel_constructor_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Classes/Panel/SimpleCrossedPanel.constructor.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Constructors/Voxel/Classes/Panel/SimpleCrossedPanel.constructor.js");
//utils

//constructors






const VoxelConstructors = {
    constructors: new _Global_Util_UtilMap_js__WEBPACK_IMPORTED_MODULE_0__.UtilMap(),
    get(id) {
        return this.constructors.get(id);
    },
    registerVoxel(voxel) {
        if (Array.isArray(voxel)) {
            for (const vox of voxel) {
                this.constructors.set(vox.id, vox);
            }
            return;
        }
        this.constructors.set(voxel.id, voxel);
    },
    defaults: {
        box: {
            simple(id, textures) {
                return new _Classes_Box_SimpleBox_constructor_js__WEBPACK_IMPORTED_MODULE_1__.SimpleBoxVoxelConstructor(id, textures);
            },
            pillar(id, textures) {
                return new _Classes_Box_PillarBox_constructor_js__WEBPACK_IMPORTED_MODULE_2__.PillarBoxVoxelConstructor(id, textures);
            },
        },
        stair: {
            simple(id, texture) {
                return new _Classes_Stair_SimpleStair_constructor_js__WEBPACK_IMPORTED_MODULE_5__.SimpleStairVoxelConstructor(id, texture);
            },
        },
        panel: {
            simple(id, texture) {
                return new _Classes_Panel_SimplePanel_constructor_js__WEBPACK_IMPORTED_MODULE_4__.SimplePanelVoxelConstructor(id, texture);
            },
        },
        crossedPanel: {
            simple(id, texture) {
                return new _Classes_Panel_SimpleCrossedPanel_constructor_js__WEBPACK_IMPORTED_MODULE_6__.SimpleCrossedPanelVoxelConstructor(id, texture);
            },
        },
        liquid: {
            simple(id, textures) {
                return new _Classes_Liquid_SimpleLiquid_constructor_js__WEBPACK_IMPORTED_MODULE_3__.SimpleLiquidConstructor(id, textures);
            },
        },
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Geometry/QuadBuilder.js":
/*!***************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Geometry/QuadBuilder.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "QuadBuilder": () => (/* binding */ QuadBuilder)
/* harmony export */ });
const QuadBuilder = {
    defaultTransform: {
        1: { x: 0, y: 0, z: 0 },
        2: { x: 0, y: 0, z: 0 },
        3: { x: 0, y: 0, z: 0 },
        4: { x: 0, y: 0, z: 0 },
    },
    width: 0,
    height: 0,
    faceFunctions: {
        top: (origin, tool, transform, flip) => {
            if (!flip) {
                tool.addPositions(
                //v1
                origin.x - QuadBuilder.width + transform[1].x, origin.y + transform[1].y, origin.z - QuadBuilder.height + transform[1].z, 
                //v2
                origin.x - QuadBuilder.width + transform[2].x, origin.y + transform[2].y, origin.z + QuadBuilder.height + transform[2].z, 
                //v3
                origin.x + QuadBuilder.width + transform[3].x, origin.y + transform[3].y, origin.z + QuadBuilder.height + transform[3].z, 
                //v4
                origin.x + QuadBuilder.width + transform[4].x, origin.y + transform[4].y, origin.z - QuadBuilder.height + transform[4].z);
            }
            else {
                tool.addPositions(
                //v1
                origin.x + QuadBuilder.width + transform[4].x, origin.y + transform[4].y, origin.z - QuadBuilder.height + transform[4].z, 
                //v2
                origin.x - QuadBuilder.width + transform[1].x, origin.y + transform[1].y, origin.z - QuadBuilder.height + transform[1].z, 
                //v3
                origin.x - QuadBuilder.width + transform[2].x, origin.y + transform[2].y, origin.z + QuadBuilder.height + transform[2].z, 
                //v4
                origin.x + QuadBuilder.width + transform[3].x, origin.y + transform[3].y, origin.z + QuadBuilder.height + transform[3].z);
            }
            tool.addIndices(tool.indicieIndex + 3, tool.indicieIndex + 2, tool.indicieIndex, tool.indicieIndex + 2, tool.indicieIndex + 1, tool.indicieIndex);
            tool.addNormals(0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0);
            tool.indicieIndex += 4;
        },
        bottom: (origin, tool, transform, flip) => {
            if (!flip) {
                tool.addPositions(
                //v1
                origin.x - QuadBuilder.width + transform[1].x, origin.y + transform[1].y, origin.z - QuadBuilder.height + transform[1].z, 
                //v2
                origin.x + QuadBuilder.width + transform[2].x, origin.y + transform[2].y, origin.z - QuadBuilder.height + transform[2].z, 
                //v3
                origin.x + QuadBuilder.width + transform[3].x, origin.y + transform[3].y, origin.z + QuadBuilder.height + transform[3].z, 
                //v4
                origin.x - QuadBuilder.width + transform[4].x, origin.y + transform[4].y, origin.z + QuadBuilder.height + transform[4].z);
            }
            else {
                tool.addPositions(
                //v1
                origin.x - QuadBuilder.width + transform[4].x, origin.y + transform[4].y, origin.z + QuadBuilder.height + transform[4].z, 
                //v2
                origin.x - QuadBuilder.width + transform[1].x, origin.y + transform[1].y, origin.z - QuadBuilder.height + transform[1].z, 
                //v3
                origin.x + QuadBuilder.width + transform[2].x, origin.y + transform[2].y, origin.z - QuadBuilder.height + transform[2].z, 
                //v4
                origin.x + QuadBuilder.width + transform[3].x, origin.y + transform[3].y, origin.z + QuadBuilder.height + transform[3].z);
            }
            tool.addIndices(tool.indicieIndex + 2, tool.indicieIndex + 1, tool.indicieIndex, tool.indicieIndex + 3, tool.indicieIndex + 2, tool.indicieIndex);
            tool.addNormals(0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0);
            tool.indicieIndex += 4;
        },
        //front
        south: (origin, tool, transform, flip) => {
            if (!flip) {
                tool.addPositions(
                //v1
                origin.x - QuadBuilder.width + transform[1].x, origin.y + QuadBuilder.height + transform[1].y, origin.z + transform[1].z, 
                //v2
                origin.x + QuadBuilder.width + transform[2].x, origin.y + QuadBuilder.height + transform[2].y, origin.z + transform[2].z, 
                //v3
                origin.x + QuadBuilder.width + transform[3].x, origin.y - QuadBuilder.height + transform[3].y, origin.z + transform[3].z, 
                //v4
                origin.x - QuadBuilder.width + transform[4].x, origin.y - QuadBuilder.height + transform[4].y, origin.z + transform[4].z);
            }
            else {
                tool.addPositions(
                //v1
                origin.x - QuadBuilder.width + transform[4].x, origin.y - QuadBuilder.height + transform[4].y, origin.z + transform[4].z, 
                //v2
                origin.x - QuadBuilder.width + transform[1].x, origin.y + QuadBuilder.height + transform[1].y, origin.z + transform[1].z, 
                //v3
                origin.x + QuadBuilder.width + transform[2].x, origin.y + QuadBuilder.height + transform[2].y, origin.z + transform[2].z, 
                //v4
                origin.x + QuadBuilder.width + transform[3].x, origin.y - QuadBuilder.height + transform[3].y, origin.z + transform[3].z);
            }
            tool.addIndices(tool.indicieIndex + 2, tool.indicieIndex + 1, tool.indicieIndex, tool.indicieIndex + 3, tool.indicieIndex + 2, tool.indicieIndex);
            tool.addNormals(0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1);
            tool.indicieIndex += 4;
        },
        //back
        north: (origin, tool, transform, flip) => {
            if (!flip) {
                tool.addPositions(
                //v1
                origin.x + QuadBuilder.width + transform[1].x, origin.y + QuadBuilder.height + transform[1].y, origin.z + transform[1].z, 
                //v2
                origin.x - QuadBuilder.width + transform[2].x, origin.y + QuadBuilder.height + transform[2].y, origin.z + transform[2].z, 
                //v3
                origin.x - QuadBuilder.width + transform[3].x, origin.y - QuadBuilder.height + transform[3].y, origin.z + transform[3].z, 
                //v4
                origin.x + QuadBuilder.width + transform[4].x, origin.y - QuadBuilder.height + transform[4].y, origin.z + transform[4].z);
            }
            else {
                tool.addPositions(
                //v1
                origin.x + QuadBuilder.width + transform[4].x, origin.y - QuadBuilder.height + transform[4].y, origin.z + transform[4].z, 
                //v2
                origin.x + QuadBuilder.width + transform[1].x, origin.y + QuadBuilder.height + transform[1].y, origin.z + transform[1].z, 
                //v3
                origin.x - QuadBuilder.width + transform[2].x, origin.y + QuadBuilder.height + transform[2].y, origin.z + transform[2].z, 
                //v4
                origin.x - QuadBuilder.width + transform[3].x, origin.y - QuadBuilder.height + transform[3].y, origin.z + transform[3].z);
            }
            tool.addIndices(tool.indicieIndex + 2, tool.indicieIndex + 1, tool.indicieIndex, tool.indicieIndex + 3, tool.indicieIndex + 2, tool.indicieIndex);
            tool.addNormals(0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1);
            tool.indicieIndex += 4;
        },
        //left
        west: (origin, tool, transform, flip) => {
            if (!flip) {
                tool.addPositions(
                //v1
                origin.x + transform[1].x, origin.y + QuadBuilder.height + transform[1].y, origin.z + QuadBuilder.width + transform[1].z, 
                //v2
                origin.x + transform[2].x, origin.y + QuadBuilder.height + transform[2].y, origin.z - QuadBuilder.width + transform[2].z, 
                //v3
                origin.x + transform[3].x, origin.y - QuadBuilder.height + transform[3].y, origin.z - QuadBuilder.width + +transform[3].z, 
                //v4
                origin.x + transform[4].x, origin.y - QuadBuilder.height + transform[4].y, origin.z + QuadBuilder.width + transform[4].z);
            }
            else {
                tool.addPositions(
                //v1
                origin.x + transform[4].x, origin.y - QuadBuilder.height + transform[4].y, origin.z + QuadBuilder.width + transform[4].z, 
                //v2
                origin.x + transform[1].x, origin.y + QuadBuilder.height + transform[1].y, origin.z + QuadBuilder.width + transform[1].z, 
                //v3
                origin.x + transform[2].x, origin.y + QuadBuilder.height + transform[2].y, origin.z - QuadBuilder.width + transform[2].z, 
                //v4
                origin.x + transform[3].x, origin.y - QuadBuilder.height + transform[3].y, origin.z - QuadBuilder.width + transform[3].z);
            }
            tool.addIndices(tool.indicieIndex + 2, tool.indicieIndex + 1, tool.indicieIndex, tool.indicieIndex + 3, tool.indicieIndex + 2, tool.indicieIndex);
            tool.addNormals(-1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0);
            tool.indicieIndex += 4;
        },
        //right
        east: (origin, tool, transform, flip) => {
            if (!flip) {
                tool.addPositions(
                //v1
                origin.x + transform[1].x, origin.y + QuadBuilder.height + transform[1].y, origin.z - QuadBuilder.width + transform[1].z, 
                //v2
                origin.x + transform[2].x, origin.y + QuadBuilder.height + transform[2].y, origin.z + QuadBuilder.width + transform[2].z, 
                //v3
                origin.x + transform[3].x, origin.y - QuadBuilder.height + transform[3].y, origin.z + QuadBuilder.width + transform[3].z, 
                //v4
                origin.x + transform[4].x, origin.y - QuadBuilder.height + transform[4].y, origin.z - QuadBuilder.width + transform[4].z);
            }
            else {
                tool.addPositions(
                //v1
                origin.x + transform[4].x, origin.y - QuadBuilder.height + transform[4].y, origin.z - QuadBuilder.width + transform[4].z, 
                //v2
                origin.x + transform[1].x, origin.y + QuadBuilder.height + transform[1].y, origin.z - QuadBuilder.width + transform[1].z, 
                //v3
                origin.x + transform[2].x, origin.y + QuadBuilder.height + transform[2].y, origin.z + QuadBuilder.width + transform[2].z, 
                //v4
                origin.x + transform[3].x, origin.y - QuadBuilder.height + transform[3].y, origin.z + QuadBuilder.width + transform[3].z);
            }
            tool.addIndices(tool.indicieIndex + 2, tool.indicieIndex + 1, tool.indicieIndex, tool.indicieIndex + 3, tool.indicieIndex + 2, tool.indicieIndex);
            tool.addNormals(1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0);
            tool.indicieIndex += 4;
        },
    },
    create(tool, direction, origin, dimensions, flip, transform) {
        this.width = dimensions.width / 2;
        this.height = dimensions.height / 2;
        this.faceFunctions[direction](origin, tool, transform ? transform : this.defaultTransform, flip);
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Geometry/QuadUVs.js":
/*!***********************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Geometry/QuadUVs.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "QuadUVs": () => (/* binding */ QuadUVs)
/* harmony export */ });
/**
 * |||||||||||||||||||||||||||||||||||||
 * [TOP & BOTTOM]
 * Not Flipped
 *
 * 2: w 0,h 0        3: w 1, h 0
 *          |--------|
 *          |      / |
 *          |   /    |
 *          |/       |
 *          |--------|
 * 1: w 0,h 1        4: w 1,h 1
 *
 * ===============================
 * Flipped
 *
 * 4: w 1,h 0        3: w 0, h 0
 *          |--------|
 *          |\       |
 *          |   \    |
 *          |      \ |
 *          |--------|
 * 1: w 1,h 1        2: w 0, h 1
 *
 *||||||||||||||||||||||||||||||||||||||||
 * [Sides]
 * Not Flipped
 * 4: w 1,h 0        3: w 0, h 0
 *          |--------|
 *          |\       |
 *          |   \    |
 *          |      \ |
 *          |--------|
 * 1: w 1,h 1        2: w 0, h 1
 *
 * ===============================
 * Flipped
 * 2: w 0,h 0        3: w 1, h 0
 *          |--------|
 *          |      / |
 *          |   /    |
 *          |/       |
 *          |--------|
 * 1: w 0,h 1        4: w 1,h 1
 *
 */
const QuadUVs = {
    uvRotations: {
        top: {
            0: (uv, ws, we, hs, he, flipped, uvs) => {
                if (!flipped) {
                    uvs.push(ws, he, uv, ws, hs, uv, we, hs, uv, we, he, uv);
                }
                else {
                    uvs.push(we, he, uv, ws, he, uv, ws, hs, uv, we, hs, uv);
                }
            },
            45: (uv, ws, we, hs, he, flipped, uvs) => {
                if (!flipped) {
                    uvs.push(0.5, 1, uv, 1, 0.5, uv, 0.5, 0, uv, 0, 0.5, uv);
                }
                else {
                    uvs.push(0, 0.5, uv, 0.5, 1, uv, 1, 0.5, uv, 0.5, 0, uv);
                }
            },
            //-45
            315: (uv, ws, we, hs, he, flipped, uvs) => {
                if (!flipped) {
                    uvs.push(1, 0.5, uv, 0.5, 0, uv, 0, 0.5, uv, 0.5, 1, uv);
                }
                else {
                    uvs.push(0.5, 1, uv, 1, 0.5, uv, 0.5, 0, uv, 0, 0.5, uv);
                }
            },
            90: (uv, ws, we, hs, he, flipped, uvs) => {
                if (!flipped) {
                    uvs.push(we, he, uv, ws, he, uv, ws, hs, uv, we, hs, uv);
                }
                else {
                    uvs.push(we, hs, uv, we, he, uv, ws, he, uv, ws, hs, uv);
                }
            },
            180: (uv, ws, we, hs, he, flipped, uvs) => {
                if (!flipped) {
                    uvs.push(we, hs, uv, we, he, uv, ws, he, uv, ws, hs, uv);
                }
                else {
                    uvs.push(ws, hs, uv, we, hs, uv, we, he, uv, ws, he, uv);
                }
            },
            270: (uv, ws, we, hs, he, flipped, uvs) => {
                if (!flipped) {
                    uvs.push(ws, hs, uv, we, hs, uv, we, he, uv, ws, he, uv);
                }
                else {
                    uvs.push(ws, he, uv, ws, hs, uv, we, hs, uv, we, he, uv);
                }
            },
            360: (uv, ws, we, hs, he, flipped, uvs) => {
                if (!flipped) {
                    uvs.push(he, we, uv, he, ws, uv, hs, ws, uv, hs, we, uv);
                }
                else {
                    uvs.push(hs, we, uv, he, we, uv, he, ws, uv, hs, ws, uv);
                }
            },
        },
        bottom: {
            0: (uv, ws, we, hs, he, flipped, uvs) => {
                if (!flipped) {
                    uvs.push(ws, hs, uv, we, hs, uv, we, he, uv, ws, he, uv);
                }
                else {
                    uvs.push(ws, he, uv, ws, hs, uv, we, hs, uv, we, he, uv);
                }
            },
            90: (uv, ws, we, hs, he, flipped, uvs) => {
                if (!flipped) {
                    uvs.push(ws, he, uv, ws, hs, uv, we, hs, uv, we, he, uv);
                }
                else {
                    uvs.push(we, he, uv, ws, he, uv, ws, hs, uv, we, hs, uv);
                }
            },
            45: (uv, ws, we, hs, he, flipped, uvs) => {
                if (!flipped) {
                    uvs.push(0.5, 1, uv, 1, 0.5, uv, 0.5, 0, uv, 0, 0.5, uv);
                }
                else {
                    uvs.push(0.5, 1, uv, 1, 0.5, uv, 0.5, 0, uv, 0, 0.5, uv);
                }
            },
            //-45
            315: (uv, ws, we, hs, he, flipped, uvs) => {
                if (!flipped) {
                    uvs.push(1, 0.5, uv, 0.5, 0, uv, 0, 0.5, uv, 0.5, 1, uv);
                }
                else {
                    uvs.push(1, 0.5, uv, 0.5, 0, uv, 0, 0.5, uv, 0.5, 1, uv);
                }
            },
            180: (uv, ws, we, hs, he, flipped, uvs) => {
                if (!flipped) {
                    uvs.push(we, he, uv, ws, he, uv, ws, hs, uv, we, hs, uv);
                }
                else {
                    uvs.push(we, hs, uv, we, he, uv, ws, he, uv, ws, hs, uv);
                }
            },
            270: (uv, ws, we, hs, he, flipped, uvs) => {
                if (!flipped) {
                    uvs.push(we, hs, uv, we, he, uv, ws, he, uv, ws, hs, uv);
                }
                else {
                    uvs.push(ws, hs, uv, we, hs, uv, we, he, uv, ws, he, uv);
                }
            },
            360: (uv, ws, we, hs, he, flipped, uvs) => {
                if (!flipped) {
                    uvs.push(he, ws, uv, hs, hs, uv, hs, we, uv, he, we, uv);
                }
                else {
                    uvs.push(he, we, uv, he, ws, uv, hs, ws, uv, hs, we, uv);
                }
            },
        },
        side: {
            0: (uv, ws, we, hs, he, flipped, uvs) => {
                if (!flipped) {
                    uvs.push(ws, hs, uv, we, hs, uv, we, he, uv, ws, he, uv);
                }
                else {
                    uvs.push(ws, he, uv, ws, hs, uv, we, hs, uv, we, he, uv);
                }
            },
            90: (uv, ws, we, hs, he, flipped, uvs) => {
                if (!flipped) {
                    uvs.push(ws, he, uv, ws, hs, uv, we, hs, uv, we, he, uv);
                }
                else {
                    uvs.push(we, he, uv, ws, he, uv, ws, hs, uv, we, hs, uv);
                }
            },
            45: (uv, ws, we, hs, he, flipped, uvs) => {
                if (!flipped) {
                    uvs.push(0.5, 1, uv, 1, 0.5, uv, 0.5, 0, uv, 0, 0.5, uv);
                }
                else {
                    uvs.push(0.5, 1, uv, 1, 0.5, uv, 0.5, 0, uv, 0, 0.5, uv);
                }
            },
            //-45
            315: (uv, ws, we, hs, he, flipped, uvs) => {
                if (!flipped) {
                    uvs.push(1, 0.5, uv, 0.5, 0, uv, 0, 0.5, uv, 0.5, 1, uv);
                }
                else {
                    uvs.push(1, 0.5, uv, 0.5, 0, uv, 0, 0.5, uv, 0.5, 1, uv);
                }
            },
            180: (uv, ws, we, hs, he, flipped, uvs) => {
                if (!flipped) {
                    uvs.push(we, he, uv, ws, he, uv, ws, hs, uv, we, hs, uv);
                }
                else {
                    uvs.push(we, hs, uv, we, he, uv, ws, he, uv, ws, hs, uv);
                }
            },
            270: (uv, ws, we, hs, he, flipped, uvs) => {
                if (!flipped) {
                    uvs.push(we, hs, uv, we, he, uv, ws, he, uv, ws, hs, uv);
                }
                else {
                    uvs.push(ws, hs, uv, we, hs, uv, we, he, uv, ws, he, uv);
                }
            },
            360: (uv, ws, we, hs, he, flipped, uvs) => {
                if (!flipped) {
                    uvs.push(he, ws, uv, hs, ws, uv, hs, we, uv, he, we, uv);
                }
                else {
                    uvs.push(he, we, uv, he, ws, uv, hs, ws, uv, hs, we, uv);
                }
            },
        },
    },
    advancedUVs: {
        top: (uv, data, uvs, flipped = false) => {
            if (!flipped) {
                uvs.push(data.ws1, data.he1, uv, data.ws2, data.hs1, uv, data.we1, data.hs2, uv, data.we2, data.he2, uv);
            }
            else {
                uvs.push(data.ws1, data.he1, uv, data.ws2, data.hs1, uv, data.we1, data.hs2, uv, data.we2, data.he2, uv);
            }
        },
        side: (uv, data, uvs, flipped = false) => {
            if (!flipped) {
                uvs.push(data.ws1, data.hs1, uv, data.we1, data.hs2, uv, data.we2, data.he1, uv, data.ws2, data.he2, uv);
                return;
            }
            else {
                uvs.push(data.ws2, data.he2, uv, data.ws1, data.hs1, uv, data.we1, data.hs2, uv, data.we2, data.he1, uv);
            }
        },
    },
    uvFunctions: {
        top: (data) => {
            QuadUVs.uvRotations.top[data.rotoate](data.uv, data.width.start, data.width.end, data.height.start, data.height.end, data.flipped, data.uvs);
        },
        bottom: (data) => {
            QuadUVs.uvRotations.bottom[data.rotoate](data.uv, data.width.start, data.width.end, data.height.start, data.height.end, data.flipped, data.uvs);
        },
        north: (data) => {
            QuadUVs.uvRotations.side[data.rotoate](data.uv, data.width.start, data.width.end, data.height.start, data.height.end, data.flipped, data.uvs);
        },
        south: (data) => {
            QuadUVs.uvRotations.side[data.rotoate](data.uv, data.width.start, data.width.end, data.height.start, data.height.end, data.flipped, data.uvs);
        },
        east: (data) => {
            QuadUVs.uvRotations.side[data.rotoate](data.uv, data.width.start, data.width.end, data.height.start, data.height.end, data.flipped, data.uvs);
        },
        west: (data) => {
            QuadUVs.uvRotations.side[data.rotoate](data.uv, data.width.start, data.width.end, data.height.start, data.height.end, data.flipped, data.uvs);
        },
    },
    addUVs(data) {
        this.uvFunctions[data.direction](data);
    },
    addAdvancedUVs(direction, uv, uvs, data, flipped) {
        let d = "top";
        if (direction != "top") {
            d = "side";
        }
        this.advancedUVs[d](uv, data, uvs, flipped);
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Nodes/Builders/TextureBuilder.js":
/*!************************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Nodes/Builders/TextureBuilder.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TextureBuilder": () => (/* binding */ TextureBuilder)
/* harmony export */ });
/* harmony import */ var _Tools_MeshBuilderTool_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Tools/MeshBuilderTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Tools/MeshBuilderTool.js");
/* harmony import */ var _Tools_MesherDataTools_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Tools/MesherDataTools.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Tools/MesherDataTools.js");
/* harmony import */ var _Classes_NodeBuilder_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Classes/NodeBuilder.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Nodes/Classes/NodeBuilder.js");



const POSFunction = {
    top: (face) => {
        const yStart = Math.abs(face.yEnd - (TextureProcessor.height - 1));
        let y = (yStart + 1) / TextureProcessor.height;
        let x = (face.xStart + (face.xEnd - face.xStart + 1) / 2) / TextureProcessor.width;
        return [x, y, 0];
    },
    bottom: (face) => {
        const yStart = Math.abs(face.yEnd - (TextureProcessor.height - 1));
        let y = yStart / TextureProcessor.height;
        let x = (face.xStart + (face.xEnd - face.xStart + 1) / 2) / TextureProcessor.width;
        return [x, y, 0];
    },
    east: (face) => {
        const yStart = Math.abs(face.yEnd - (TextureProcessor.height - 1));
        let y = (yStart + (face.yEnd - face.yStart + 1) / 2) / TextureProcessor.height;
        let x = (face.xStart + 1) / TextureProcessor.width;
        return [x, y, 0];
    },
    west: (face) => {
        const yStart = Math.abs(face.yEnd - (TextureProcessor.height - 1));
        let y = (yStart + (face.yEnd - face.yStart + 1) / 2) / TextureProcessor.height;
        let x = face.xEnd / TextureProcessor.width;
        return [x, y, 0];
    },
};
const DIMFunction = {
    top: (face) => {
        const width = (face.xEnd + 1 - face.xStart) / TextureProcessor.width;
        return [width, TextureProcessor.depth];
    },
    bottom: (face) => {
        const width = (face.xEnd + 1 - face.xStart) / TextureProcessor.width;
        return [width, TextureProcessor.depth];
    },
    east: (face) => {
        const height = (face.yEnd - face.yStart + 1) / TextureProcessor.height;
        return [TextureProcessor.depth, height];
    },
    west: (face) => {
        const height = (face.yEnd - face.yStart + 1) / TextureProcessor.height;
        return [TextureProcessor.depth, height];
    },
};
const mesher = new _Tools_MeshBuilderTool_js__WEBPACK_IMPORTED_MODULE_0__.MeshBuilderTool();
const mesherData = new _Tools_MesherDataTools_js__WEBPACK_IMPORTED_MODULE_1__.MesherDataTool();
mesherData.attributes.add([["cuv3", [[], 3, "32f"]]]);
mesherData.vars.add([["texture", 0]]);
mesher.setMesherTool(mesherData);
const TextureProcessor = {
    visitedMap: {
        top: {},
        bottom: {},
        east: {},
        west: {},
    },
    _resetVisitedMap() {
        this.visitedMap = {
            top: {},
            bottom: {},
            east: {},
            west: {},
        };
    },
    faceMap: {
        top: 0,
        bottom: 1,
        east: 2,
        west: 3,
        south: 4,
        north: 5,
    },
    height: 16,
    width: 16,
    depth: 1 / 16,
    getPosition: POSFunction,
    getDimensions: DIMFunction,
    getTruePosition(face) {
        return {
            xStart: face.xStart / (this.width - 1),
            xEnd: face.xEnd / (this.width - 1),
            yStart: Math.abs(face.yEnd - (this.height - 1)) / (this.height - 1),
            yEnd: Math.abs(face.yStart - (this.height - 1)) / (this.height - 1),
        };
    },
    processTexture(buildTask) {
        const [location, type, data] = buildTask;
        const textureId = data.textureId;
        const textureData = data.textureData;
        mesherData.setVar("texture", textureId);
        const processed = [];
        this.width = Math.sqrt(textureData.length / 4);
        this.height = Math.sqrt(textureData.length / 4);
        let x = 0;
        let y = 0;
        for (let i = 0; i < textureData.length; i += 4) {
            if (!processed[y]) {
                processed[y] = [];
            }
            if (textureData[i + 3]) {
                processed[y].push(1);
            }
            else {
                processed[y].push(0);
            }
            x++;
            if (x == this.width) {
                y++;
                x = 0;
            }
        }
        mesher.quad
            .setDirection("south")
            .setDimensions(1, 1)
            .setPosition(0.5, 0.5, -this.depth / 2)
            .uvs.setWidth(0, 1)
            .setHeight(0, 1)
            .add(mesherData.getVar("texture"))
            .create()
            .setDirection("north")
            .setPosition(0.5, 0.5, this.depth / 2)
            .uvs.add(mesherData.getVar("texture"))
            .create();
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (!processed[y][x])
                    continue;
                const result = this._process(processed, x, y);
                if (result.t && !this.visited(x, y, "top")) {
                    this.visit(x, y, "top");
                    mesher.quad.setDirection("top");
                    this.buildFace(this.getTopFace(processed, x, y));
                }
                if (result.b && !this.visited(x, y, "bottom")) {
                    this.visit(x, y, "bottom");
                    mesher.quad.setDirection("bottom");
                    this.buildFace(this.getBottomFace(processed, x, y));
                }
                if (result.w && !this.visited(x, y, "west")) {
                    this.visit(x, y, "west");
                    mesher.quad.setDirection("west");
                    this.buildFace(this.getWestFace(processed, x, y));
                }
                if (result.e && !this.visited(x, y, "east")) {
                    this.visit(x, y, "east");
                    mesher.quad.setDirection("east");
                    this.buildFace(this.getEastFace(processed, x, y));
                }
            }
        }
        this._resetVisitedMap();
        const [attributes, transfers] = mesherData.getAllAttributes();
        mesher.quad.clear();
        mesherData.resetAll();
        return [[location, attributes], transfers];
    },
    _process(data, x, y) {
        let addwest = false;
        let addeast = false;
        let addbottom = false;
        let addtop = false;
        if (!data[y - 1]) {
            addtop = true;
        }
        if (data[y - 1]) {
            if (!data[y - 1][x]) {
                addtop = true;
            }
        }
        if (!data[y + 1]) {
            addbottom = true;
        }
        if (data[y + 1]) {
            if (!data[y + 1][x]) {
                addbottom = true;
            }
        }
        if (!data[y][x - 1]) {
            addwest = true;
        }
        if (!data[y][x + 1]) {
            addeast = true;
        }
        return {
            w: addwest,
            e: addeast,
            t: addtop,
            b: addbottom,
        };
    },
    getTopFace(data, sx, y) {
        const face = this.getBlankFace(sx, y, "top");
        let endX = sx;
        for (let x = sx; x < this.width; x++) {
            const result = this._process(data, x, y);
            this.visit(x, y, "top");
            if (!result.t || !data[y][x] || x == this.width - 1) {
                if (x == this.width - 1) {
                    endX = x;
                }
                else {
                    endX = x - 1;
                }
                break;
            }
        }
        face.xEnd = endX;
        return face;
    },
    getBottomFace(data, sx, y) {
        const face = this.getBlankFace(sx, y, "bottom");
        let endX = sx;
        for (let x = sx; x < this.width; x++) {
            const result = this._process(data, x, y);
            this.visit(x, y, "bottom");
            if (!result.b || !data[y][x] || x == this.width - 1) {
                if (x == this.width - 1) {
                    endX = x;
                }
                else {
                    endX = x - 1;
                }
                break;
            }
        }
        face.xEnd = endX;
        return face;
    },
    getWestFace(data, x, sy) {
        const face = this.getBlankFace(x, sy, "west");
        let endY = sy;
        for (let y = sy; y < this.height; y++) {
            const result = this._process(data, x, y);
            this.visit(x, y, "west");
            if (!result.w || !data[y][x] || y == this.height - 1) {
                if (y == this.height - 1) {
                    endY = y;
                }
                else {
                    endY = y - 1;
                }
                break;
            }
        }
        face.yEnd = endY;
        return face;
    },
    getEastFace(data, x, sy) {
        const face = this.getBlankFace(x, sy, "east");
        let endY = sy;
        for (let y = sy; y < this.height; y++) {
            const result = this._process(data, x, y);
            this.visit(x, y, "east");
            if (!result.e || !data[y][x] || y == this.height - 1) {
                if (y == this.height - 1) {
                    endY = y;
                }
                else {
                    endY = y - 1;
                }
                break;
            }
        }
        face.yEnd = endY;
        return face;
    },
    getBlankFace(x, y, face) {
        return {
            xStart: x,
            xEnd: x,
            yStart: y,
            yEnd: y,
            type: face,
        };
    },
    visit(x, y, face) {
        this.visitedMap[face][`${x}-${y}`] = true;
    },
    visited(x, y, face) {
        return this.visitedMap[face][`${x}-${y}`];
    },
    calculateUV(face) {
        const ws = face.xStart / this.width;
        const we = (face.xEnd + 1) / this.width;
        const hs = face.yStart / this.height;
        const he = (face.yEnd + 1) / this.height;
        return [ws, we, hs, he];
    },
    buildFace(face) {
        const uv = this.calculateUV(face);
        const dim = this.getDimensions[face.type](face);
        const pos = this.getPosition[face.type](face);
        mesher.quad
            .setDimensions(dim[0], dim[1])
            .setPosition(pos[0], pos[1], pos[2])
            .uvs.setWidth(uv[0], uv[1])
            .setHeight(uv[2], uv[3])
            .add(mesherData.getVar("texture"))
            .create();
    },
};
class TXTBuilderBase extends _Classes_NodeBuilder_js__WEBPACK_IMPORTED_MODULE_2__.NodeBuilder {
    build(data) {
        return TextureProcessor.processTexture(data);
    }
}
const TextureBuilder = new TXTBuilderBase("#dve_node_texture");


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Nodes/Builders/VoxelBuilder.js":
/*!**********************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Nodes/Builders/VoxelBuilder.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VoxelBuilder": () => (/* binding */ VoxelBuilder)
/* harmony export */ });
/* harmony import */ var _Classes_NodeBuilder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Classes/NodeBuilder.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Nodes/Classes/NodeBuilder.js");
/* harmony import */ var _Tools_BuilderDataTool_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Tools/BuilderDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Tools/BuilderDataTool.js");
/* harmony import */ var _Rules_RenderedSubstances_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Rules/RenderedSubstances.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Rules/RenderedSubstances.js");
/* harmony import */ var _Shapes_ShapeTool_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Shapes/ShapeTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/ShapeTool.js");




class VoxelBuilderBase extends _Classes_NodeBuilder_js__WEBPACK_IMPORTED_MODULE_0__.NodeBuilder {
    id;
    dataTool = new _Tools_BuilderDataTool_js__WEBPACK_IMPORTED_MODULE_1__.BuilderDataTool();
    constructor(id) {
        super(id);
        this.id = id;
        this.dataTool.setMode(_Tools_BuilderDataTool_js__WEBPACK_IMPORTED_MODULE_1__.BuilderDataTool.VOXEL_DATA_MODE);
    }
    build([location, type, rawVoxelData]) {
        if (!this.dataTool.loadInRaw(rawVoxelData).isRenderable())
            return false;
        const constructor = this.dataTool.getConstructor();
        const mesher = _Rules_RenderedSubstances_js__WEBPACK_IMPORTED_MODULE_2__.RenderedSubstances.meshers.get(this.dataTool.getSubstnaceData().getRendered());
        if (!mesher || !constructor)
            return false;
        mesher.voxel.loadInRaw(rawVoxelData).setMode(_Tools_BuilderDataTool_js__WEBPACK_IMPORTED_MODULE_1__.BuilderDataTool.VOXEL_DATA_MODE);
        mesher.nVoxel
            .loadInRaw(rawVoxelData)
            .setMode(_Tools_BuilderDataTool_js__WEBPACK_IMPORTED_MODULE_1__.BuilderDataTool.VOXEL_DATA_MODE);
        _Shapes_ShapeTool_js__WEBPACK_IMPORTED_MODULE_3__.ShapeTool.setMesher(mesher);
        _Shapes_ShapeTool_js__WEBPACK_IMPORTED_MODULE_3__.ShapeTool.builder.quad.clear().setPosition(0, 0, 0);
        constructor.process(mesher);
        mesher.resetSegments();
        mesher.resetVars();
        const [attributes, buffers] = mesher.getAllAttributes();
        mesher.voxel.loadInRaw(rawVoxelData).setMode(_Tools_BuilderDataTool_js__WEBPACK_IMPORTED_MODULE_1__.BuilderDataTool.WORLD_DATA_MODE);
        mesher.nVoxel
            .loadInRaw(rawVoxelData)
            .setMode(_Tools_BuilderDataTool_js__WEBPACK_IMPORTED_MODULE_1__.BuilderDataTool.WORLD_DATA_MODE);
        return [[location, attributes], buffers];
    }
}
const VoxelBuilder = new VoxelBuilderBase("#dve_node_voxel");


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Nodes/Classes/NodeBuilder.js":
/*!********************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Nodes/Classes/NodeBuilder.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NodeBuilder": () => (/* binding */ NodeBuilder)
/* harmony export */ });
class NodeBuilder {
    id;
    constructor(id) {
        this.id = id;
    }
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Nodes/NodeBuilderManager.js":
/*!*******************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Nodes/NodeBuilderManager.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NodeBuilderManager": () => (/* binding */ NodeBuilderManager)
/* harmony export */ });
/* harmony import */ var _Builders_TextureBuilder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Builders/TextureBuilder.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Nodes/Builders/TextureBuilder.js");
/* harmony import */ var _Builders_VoxelBuilder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Builders/VoxelBuilder.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Nodes/Builders/VoxelBuilder.js");


const NodeBuilderManager = {
    builders: new Map(),
    registerBuilder(builder) {
        this.builders.set(builder.id, builder);
    },
    buildNode(data) {
        const builder = this.builders.get(data[1]);
        if (!builder)
            return false;
        return builder.build(data);
    },
};
NodeBuilderManager.registerBuilder(_Builders_TextureBuilder_js__WEBPACK_IMPORTED_MODULE_0__.TextureBuilder);
NodeBuilderManager.registerBuilder(_Builders_VoxelBuilder_js__WEBPACK_IMPORTED_MODULE_1__.VoxelBuilder);


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Processors/ChunkProcessor.js":
/*!********************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Processors/ChunkProcessor.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChunkProcessor": () => (/* binding */ ChunkProcessor)
/* harmony export */ });
/* harmony import */ var _Rules_RenderedSubstances_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Rules/RenderedSubstances.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Rules/RenderedSubstances.js");
/* harmony import */ var _DivineVoxelEngineConstructor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../DivineVoxelEngineConstructor.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/DivineVoxelEngineConstructor.js");
/* harmony import */ var _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Data/World/WorldSpaces.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldSpaces.js");
/* harmony import */ var _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Data/World/WorldRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldRegister.js");
/* harmony import */ var _Tools_Data_WorldData_HeightMapTool_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../Tools/Data/WorldData/HeightMapTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/WorldData/HeightMapTool.js");
/* harmony import */ var _Tools_BuilderDataTool_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Tools/BuilderDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Tools/BuilderDataTool.js");
/* harmony import */ var _Shapes_ShapeTool_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Shapes/ShapeTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/ShapeTool.js");


//data


//tools



const mDataTool = new _Tools_BuilderDataTool_js__WEBPACK_IMPORTED_MODULE_5__.BuilderDataTool();
const heightMapTool = new _Tools_Data_WorldData_HeightMapTool_js__WEBPACK_IMPORTED_MODULE_4__.HeightMapTool();
const ChunkProcessor = {
    relative: { x: 0, y: 0, z: 0 },
    nLocation: ["main", 0, 0, 0],
    _states: {
        foundVoxel: false,
    },
    _process(doSecondCheck = false) {
        if (!mDataTool.loadInAtLocation(this.nLocation))
            return;
        if (!mDataTool.isRenderable())
            return;
        this._states.foundVoxel = true;
        if (!doSecondCheck) {
            if (mDataTool.hasSecondaryVoxel()) {
                this._process(true);
            }
        }
        const constructor = mDataTool.getConstructor();
        const mesher = _Rules_RenderedSubstances_js__WEBPACK_IMPORTED_MODULE_0__.RenderedSubstances.meshers.get(mDataTool.getSubstnaceData().getRendered());
        if (!mesher || !constructor)
            return;
        const voxelPOS = _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_2__.WorldSpaces.voxel.setLocation(this.nLocation).getPosition();
        mesher.voxel.loadInAtLocation(this.nLocation);
        mesher.nVoxel.loadInAtLocation(this.nLocation);
        _Shapes_ShapeTool_js__WEBPACK_IMPORTED_MODULE_6__.ShapeTool.setMesher(mesher);
        _Shapes_ShapeTool_js__WEBPACK_IMPORTED_MODULE_6__.ShapeTool.builder.quad.clear()
            .setPosition(voxelPOS.x, voxelPOS.y, voxelPOS.z);
        constructor.process(mesher);
        mesher.resetSegments();
        mesher.resetVars();
    },
    build(location) {
        _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_3__.WorldRegister.cache.enable();
        heightMapTool.chunk.loadInAtLocation(location);
        mDataTool.setDimension(location[0]);
        const [dimension, cx, cy, cz] = location;
        this.nLocation[0] = dimension;
        let index = 0;
        let lastY = -Infinity;
        const maxIndex = _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_2__.WorldSpaces.chunk.getVolume();
        while (index < maxIndex) {
            const { x, y, z } = _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_2__.WorldSpaces.voxel.getIndexToXYZ(index);
            if (y != lastY) {
                this._states.foundVoxel = false;
                heightMapTool.chunk.setY(y);
                if (!heightMapTool.chunk.hasVoxels() && !heightMapTool.chunk.isDirty()) {
                    index += _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_2__.WorldSpaces.chunk.getIndexXYZ(0, 1, 0);
                    lastY = y;
                    continue;
                }
            }
            this.nLocation[1] = x + cx;
            this.nLocation[2] = y + cy;
            this.nLocation[3] = z + cz;
            this._process();
            if (y != lastY) {
                if (heightMapTool.chunk.isDirty()) {
                    heightMapTool.chunk.setHasVoxels(this._states.foundVoxel);
                    heightMapTool.chunk.setDirty(false);
                }
            }
            lastY = y;
            index++;
        }
        _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_3__.WorldRegister.cache.disable();
        const chunks = [location, []];
        const trasnfers = [];
        for (const [substance, mesher] of _Rules_RenderedSubstances_js__WEBPACK_IMPORTED_MODULE_0__.RenderedSubstances.meshers._map) {
            if (mesher.getAttribute("position").length == 0) {
                chunks[1].push([substance, false]);
                mesher.resetAll();
                continue;
            }
            const [attributes, buffers] = mesher.getAllAttributes();
            trasnfers.push(...buffers);
            chunks[1].push([substance, [location, attributes]]);
            mesher.resetAll();
        }
        _DivineVoxelEngineConstructor_js__WEBPACK_IMPORTED_MODULE_1__.DVEC.parentComm.runTasks("set-chunk", chunks, trasnfers);
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Rules/Overrides/OverridesManager.js":
/*!***************************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Rules/Overrides/OverridesManager.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OverrideManager": () => (/* binding */ OverrideManager)
/* harmony export */ });
const OverrideManager = {
    overrides: {
        AO: new Map(),
        AOFlipFace: new Map(),
        CullFace: new Map(),
        FlipFace: new Map(),
        DarkenFaceUnderneath: new Map(),
    },
    registerOverride(type, subjectId, neighborShapeId, run) {
        let map = this.overrides[type].get(subjectId);
        if (!map) {
            map = new Map();
            this.overrides[type].set(subjectId, map);
        }
        map.set(neighborShapeId, run);
    },
    hasOverride(type, shapeId, neighborShapeId) {
        let map = this.overrides[type].get(shapeId);
        if (!map)
            return false;
        return map.has(neighborShapeId);
    },
    runOverride(type, firstId, secondOverride, data) {
        let map = this.overrides[type].get(firstId);
        if (!map)
            return data.default;
        const run = map.get(secondOverride);
        if (!run)
            return data.default;
        return run(data);
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Rules/RenderedSubstances.js":
/*!*******************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Rules/RenderedSubstances.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RenderedSubstances": () => (/* binding */ RenderedSubstances)
/* harmony export */ });
/* harmony import */ var _Global_Util_UtilMap_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Global/Util/UtilMap.js */ "../../DSLIBS/divineVoxelEngine/dist/Global/Util/UtilMap.js");
/* harmony import */ var _Tools_VoxelMesherDataTool_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Tools/VoxelMesherDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Tools/VoxelMesherDataTool.js");


const RenderedSubstances = {
    meshers: new _Global_Util_UtilMap_js__WEBPACK_IMPORTED_MODULE_0__.UtilMap(),
    add(id) {
        this.meshers.set(id, new _Tools_VoxelMesherDataTool_js__WEBPACK_IMPORTED_MODULE_1__.VoxelMesherDataTool());
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Rules/SubstanceRules.js":
/*!***************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Rules/SubstanceRules.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SubstanceRules": () => (/* binding */ SubstanceRules)
/* harmony export */ });
/* harmony import */ var _Data_Register_MappedDataRegister_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Data/Register/MappedDataRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Register/MappedDataRegister.js");
/* harmony import */ var _Tools_Data_SubstanceDataTool_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Tools/Data/SubstanceDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/SubstanceDataTool.js");
/* harmony import */ var _RenderedSubstances_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RenderedSubstances.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Rules/RenderedSubstances.js");
//types



const SubstanceRules = {
    rules: new Map(),
    parents: new Map(),
    registerSubstance(id, substanceCulls, parentId) {
        const map = new Map();
        this.rules.set(id, map);
        if (substanceCulls) {
            for (const culls of substanceCulls) {
                map.set(culls, true);
            }
        }
        if (parentId) {
            this.parents.set(id, parentId);
            return;
        }
        this.parents.set(id, id);
    },
    $BuildRules() {
        const substanceTool = new _Tools_Data_SubstanceDataTool_js__WEBPACK_IMPORTED_MODULE_1__.SubstanceDataTool();
        const allSubstances = _Data_Register_MappedDataRegister_js__WEBPACK_IMPORTED_MODULE_0__.MappedDataRegister.stringMaps.segments.get("voxel")
            .get("#dve_substance");
        for (const substnace of allSubstances) {
            substanceTool.setSubstance(substnace);
            const parent = substanceTool.getParent();
            const rendered = substanceTool.getRendered();
            const culled = substanceTool.getCulled();
            SubstanceRules.registerSubstance(substnace, culled, parent);
            if (!_RenderedSubstances_js__WEBPACK_IMPORTED_MODULE_2__.RenderedSubstances.meshers.has(rendered)) {
                _RenderedSubstances_js__WEBPACK_IMPORTED_MODULE_2__.RenderedSubstances.add(rendered);
            }
        }
    },
    exposedCheck(subject, neightborVoxel) {
        const rules = this.rules.get(subject);
        if (!rules)
            return true;
        if (rules.has(neightborVoxel))
            return false;
        return true;
    },
    getSubstanceParent(id) {
        return this.parents.get(id);
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/Builder/ShapeBuilder.js":
/*!**********************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/Builder/ShapeBuilder.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ShapeBuilder": () => (/* binding */ ShapeBuilder)
/* harmony export */ });
/* harmony import */ var _Classes_VertexData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Classes/VertexData.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Classes/VertexData.js");
/* harmony import */ var _Data_Light_LightByte_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../Data/Light/LightByte.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Light/LightByte.js");
/* harmony import */ var _ShapeTool_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ShapeTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/ShapeTool.js");



const LightValue = new _Classes_VertexData_js__WEBPACK_IMPORTED_MODULE_0__.QuadVertexData();
const AOValue = new _Classes_VertexData_js__WEBPACK_IMPORTED_MODULE_0__.QuadVertexData();
const getIndex = (v) => {
    return Math.abs(v);
};
const ShapeBuilder = {
    build(quads) {
        const aoData = _ShapeTool_js__WEBPACK_IMPORTED_MODULE_2__.ShapeTool.data.getWorldAO();
        const lightData = _ShapeTool_js__WEBPACK_IMPORTED_MODULE_2__.ShapeTool.data.getWorldLight();
        for (const quad of quads) {
            if (quad[6] >= 0) {
                _ShapeTool_js__WEBPACK_IMPORTED_MODULE_2__.ShapeTool.builder.quad.setFlipped(quad[6] == 1);
            }
            _ShapeTool_js__WEBPACK_IMPORTED_MODULE_2__.ShapeTool.builder.quad.setDimensions(quad[1][0], quad[1][1])
                .setDirection(quad[0])
                .updatePosition(quad[2][0], quad[2][1], quad[2][2])
                .textures.setRoation(quad[5][0])
                .setWidth(quad[5][1], quad[5][2])
                .setHeight(quad[5][3], quad[5][4])
                .add(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_2__.ShapeTool.data.getTexture())
                .overlayTexture.add(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_2__.ShapeTool.data.getOverlayTextures());
            AOValue.setAll(0);
            AOValue.set(quad[3][0] < 0 ? aoData.vetexes[getIndex(quad[3][0])] : quad[3][0], quad[3][1] < 0 ? aoData.vetexes[getIndex(quad[3][1])] : quad[3][1], quad[3][2] < 0 ? aoData.vetexes[getIndex(quad[3][2])] : quad[3][2], quad[3][3] < 0 ? aoData.vetexes[getIndex(quad[3][3])] : quad[3][3]);
            _ShapeTool_js__WEBPACK_IMPORTED_MODULE_2__.ShapeTool.builder.quad.AO.add(AOValue);
            LightValue.setAll(0);
            if (quad[4][0] == -5) {
                this._getBrightestLight(lightData);
            }
            else {
                LightValue.set(quad[4][0] < 0 ? lightData.vetexes[getIndex(quad[4][0])] : quad[4][0], quad[4][1] < 0 ? lightData.vetexes[getIndex(quad[4][1])] : quad[4][1], quad[4][2] < 0 ? lightData.vetexes[getIndex(quad[4][2])] : quad[4][2], quad[4][3] < 0 ? lightData.vetexes[getIndex(quad[4][3])] : quad[4][3]);
            }
            _ShapeTool_js__WEBPACK_IMPORTED_MODULE_2__.ShapeTool.builder.quad.light.add(LightValue);
            _ShapeTool_js__WEBPACK_IMPORTED_MODULE_2__.ShapeTool.builder.quad.create().textures.clear().clearTransform();
        }
    },
    _getBrightestLight(data) {
        let s = 0;
        let r = 0;
        let g = 0;
        let b = 0;
        data.forEach((v, nl) => {
            const sl = _Data_Light_LightByte_js__WEBPACK_IMPORTED_MODULE_1__.LightData.getS(nl);
            if (sl > s) {
                s = sl;
            }
            const rl = _Data_Light_LightByte_js__WEBPACK_IMPORTED_MODULE_1__.LightData.getR(nl);
            if (rl > r) {
                r = rl;
            }
            const gl = _Data_Light_LightByte_js__WEBPACK_IMPORTED_MODULE_1__.LightData.getG(nl);
            if (gl > g) {
                g = gl;
            }
            const bl = _Data_Light_LightByte_js__WEBPACK_IMPORTED_MODULE_1__.LightData.getB(nl);
            if (bl > b) {
                b = bl;
            }
        });
        let rl = _Data_Light_LightByte_js__WEBPACK_IMPORTED_MODULE_1__.LightData.setS(s, 0);
        rl = _Data_Light_LightByte_js__WEBPACK_IMPORTED_MODULE_1__.LightData.setR(r, rl);
        rl = _Data_Light_LightByte_js__WEBPACK_IMPORTED_MODULE_1__.LightData.setG(g, rl);
        rl = _Data_Light_LightByte_js__WEBPACK_IMPORTED_MODULE_1__.LightData.setB(b, rl);
        LightValue.setAll(rl);
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/ShapeTool.js":
/*!***********************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/ShapeTool.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ShapeTool": () => (/* binding */ ShapeTool),
/* harmony export */   "ShapeToolType": () => (/* binding */ ShapeToolType)
/* harmony export */ });
/* harmony import */ var _Tools_VoxelShapeTool_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Tools/VoxelShapeTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Tools/VoxelShapeTool.js");

class ShapeToolType {
    data = {};
    builder = new _Tools_VoxelShapeTool_js__WEBPACK_IMPORTED_MODULE_0__.VoxelShapeTool();
    setMesher(dataTool) {
        this.data = dataTool;
        this.builder.quad.setMesherTool(dataTool);
    }
}
const ShapeTool = new ShapeToolType();


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/default/Box/Box.voxel.shape.js":
/*!*****************************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/default/Box/Box.voxel.shape.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BoxVoxelShape": () => (/* binding */ BoxVoxelShape)
/* harmony export */ });
/* harmony import */ var _Rules_Overrides_OverridesManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Rules/Overrides/OverridesManager.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Rules/Overrides/OverridesManager.js");
/* harmony import */ var _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ShapeTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/ShapeTool.js");
/* harmony import */ var _Classes_VertexData_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Classes/VertexData.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Classes/VertexData.js");



const animationState = new _Classes_VertexData_js__WEBPACK_IMPORTED_MODULE_2__.QuadVertexData();
const BoxVoxelShape = {
    _createFace() {
        animationState.setAll(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.data.voxel.getSubstance() == "#dve_flora" ? 3 : 0);
        _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.setDimensions(1, 1)
            .setFlipped(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.data.isFaceFlipped())
            .AO.add(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.data.getWorldAO())
            .light.add(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.data.getWorldLight())
            .textures.add(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.data.getTexture())
            .overlayTexture.add(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.data.getOverlayTextures())
            .animationState.add(animationState)
            .create();
    },
    add: {
        top() {
            _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.setDirection("top").updatePosition(0.5, 1, 0.5);
            BoxVoxelShape._createFace();
        },
        bottom() {
            _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.setDirection("bottom").updatePosition(0.5, 0, 0.5);
            BoxVoxelShape._createFace();
        },
        north() {
            _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.setDirection("north").updatePosition(0.5, 0.5, 1);
            BoxVoxelShape._createFace();
        },
        south() {
            _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.setDirection("south").updatePosition(0.5, 0.5, 0);
            BoxVoxelShape._createFace();
        },
        east() {
            _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.setDirection("east").updatePosition(1, 0.5, 0.5);
            BoxVoxelShape._createFace();
        },
        west() {
            _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.setDirection("west").updatePosition(0, 0.5, 0.5);
            BoxVoxelShape._createFace();
        },
    },
};
//cullface
_Rules_Overrides_OverridesManager_js__WEBPACK_IMPORTED_MODULE_0__.OverrideManager.registerOverride("CullFace", "#dve_box", "#dve_box", (data) => {
    return BoxCullFunctions[data.face](data);
});
_Rules_Overrides_OverridesManager_js__WEBPACK_IMPORTED_MODULE_0__.OverrideManager.registerOverride("CullFace", "#dve_box", "Panel", (data) => {
    return true;
});
_Rules_Overrides_OverridesManager_js__WEBPACK_IMPORTED_MODULE_0__.OverrideManager.registerOverride("DarkenFaceUnderneath", "#dve_box", "All", (data) => {
    return true;
});
_Rules_Overrides_OverridesManager_js__WEBPACK_IMPORTED_MODULE_0__.OverrideManager.registerOverride("CullFace", "#dve_box", "#dve_halfbox", (data) => {
    if (data.face == "top") {
        if (data.neighborVoxel.getShapeState() == 0) {
            return true;
        }
        return false;
    }
    return true;
});
_Rules_Overrides_OverridesManager_js__WEBPACK_IMPORTED_MODULE_0__.OverrideManager.registerOverride("CullFace", "#dve_box", "#dve_stair", (data) => {
    StairCullFunctions[data.face](data);
    return true;
});
//ao
_Rules_Overrides_OverridesManager_js__WEBPACK_IMPORTED_MODULE_0__.OverrideManager.registerOverride("AO", "#dve_box", "Panel", (data) => {
    return false;
});
_Rules_Overrides_OverridesManager_js__WEBPACK_IMPORTED_MODULE_0__.OverrideManager.registerOverride("AO", "#dve_box", "#dve_half_box", (data) => {
    if (data.face == "top") {
        if (data.neighborVoxel.getShapeState() == 0) {
            return true;
        }
        return false;
    }
    return true;
});
const StairCullFunctions = {
    top: (data) => {
        const nVoxelShapeState = data.neighborVoxel.getShapeState();
        if ((nVoxelShapeState >= 0 && nVoxelShapeState <= 3) ||
            (nVoxelShapeState >= 8 && nVoxelShapeState <= 11)) {
            return false;
        }
        return true;
    },
    bottom: (data) => {
        const nVoxelShapeState = data.neighborVoxel.getShapeState();
        if ((nVoxelShapeState >= 4 && nVoxelShapeState <= 7) ||
            (nVoxelShapeState >= 12 && nVoxelShapeState <= 15)) {
            return false;
        }
        return true;
    },
    east: (data) => {
        const nVoxelShapeState = data.neighborVoxel.getShapeState();
        if (nVoxelShapeState == 1 || nVoxelShapeState == 5)
            return false;
        return true;
    },
    west: (data) => {
        const nVoxelShapeState = data.neighborVoxel.getShapeState();
        if (nVoxelShapeState == 3 || nVoxelShapeState == 7)
            return false;
        return true;
    },
    north: (data) => {
        const nVoxelShapeState = data.neighborVoxel.getShapeState();
        if (nVoxelShapeState == 0 || nVoxelShapeState == 4)
            return false;
        return true;
    },
    south: (data) => {
        const nVoxelShapeState = data.neighborVoxel.getShapeState();
        if (nVoxelShapeState == 2 || nVoxelShapeState == 6)
            return false;
        return true;
    },
};
//cull leaf faces
const BoxCullFunctions = {
    top: (data) => {
        if (data.currentVoxel.getSubstance() == "#dve_flora" &&
            data.currentVoxel.isSameVoxel(data.currentVoxel.location[1], data.currentVoxel.location[2] + 1, data.currentVoxel.location[3]) &&
            data.currentVoxel.isSameVoxel(data.currentVoxel.location[1], data.currentVoxel.location[2] + 2, data.currentVoxel.location[3])) {
            return false;
        }
        return data.default;
    },
    bottom: (data) => {
        if (data.currentVoxel.getSubstance() == "#dve_flora" &&
            data.currentVoxel.isSameVoxel(data.currentVoxel.location[1], data.currentVoxel.location[2] - 1, data.currentVoxel.location[3]) &&
            data.currentVoxel.isSameVoxel(data.currentVoxel.location[1], data.currentVoxel.location[2] - 2, data.currentVoxel.location[3])) {
            return false;
        }
        return data.default;
    },
    east: (data) => {
        if (data.currentVoxel.getSubstance() == "#dve_flora" &&
            data.currentVoxel.isSameVoxel(data.currentVoxel.location[1] + 1, data.currentVoxel.location[2], data.currentVoxel.location[3]) &&
            data.currentVoxel.isSameVoxel(data.currentVoxel.location[1] + 2, data.currentVoxel.location[2], data.currentVoxel.location[3])) {
            return false;
        }
        return data.default;
    },
    west: (data) => {
        if (data.currentVoxel.getSubstance() == "#dve_flora" &&
            data.currentVoxel.isSameVoxel(data.currentVoxel.location[1] - 1, data.currentVoxel.location[2], data.currentVoxel.location[3]) &&
            data.currentVoxel.isSameVoxel(data.currentVoxel.location[1] - 2, data.currentVoxel.location[2], data.currentVoxel.location[3])) {
            return false;
        }
        return data.default;
    },
    north: (data) => {
        if (data.currentVoxel.getSubstance() == "#dve_flora" &&
            data.currentVoxel.isSameVoxel(data.currentVoxel.location[1], data.currentVoxel.location[2], data.currentVoxel.location[3] + 1) &&
            data.currentVoxel.isSameVoxel(data.currentVoxel.location[1], data.currentVoxel.location[2], data.currentVoxel.location[3] + 2)) {
            return false;
        }
        return data.default;
    },
    south: (data) => {
        if (data.currentVoxel.getSubstance() == "#dve_flora" &&
            data.currentVoxel.isSameVoxel(data.currentVoxel.location[1], data.currentVoxel.location[2], data.currentVoxel.location[3] - 1) &&
            data.currentVoxel.isSameVoxel(data.currentVoxel.location[1], data.currentVoxel.location[2], data.currentVoxel.location[3] - 2)) {
            return false;
        }
        return data.default;
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/default/Box/HalfBox.voxel.shape.js":
/*!*********************************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/default/Box/HalfBox.voxel.shape.js ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HalfBoxVoxelShape": () => (/* binding */ HalfBoxVoxelShape)
/* harmony export */ });
/* harmony import */ var _Rules_Overrides_OverridesManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Rules/Overrides/OverridesManager.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Rules/Overrides/OverridesManager.js");
/* harmony import */ var _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ShapeTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/ShapeTool.js");
/* harmony import */ var _Classes_VertexData_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Classes/VertexData.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Classes/VertexData.js");



const animationState = new _Classes_VertexData_js__WEBPACK_IMPORTED_MODULE_2__.QuadVertexData();
const HalfBoxVoxelShape = {
    _createFace() {
        animationState.setAll(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.data.voxel.getSubstance() == "#dve_flora" ? 3 : 0);
        _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.setFlipped(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.data.isFaceFlipped())
            .AO.add(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.data.getWorldAO())
            .light.add(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.data.getWorldLight())
            .textures.add(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.data.getTexture())
            .overlayTexture.add(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.data.getOverlayTextures())
            .animationState.add(animationState)
            .create()
            .clear();
    },
    add: {
        top() {
            _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.setDirection("top")
                .setDimensions(1, 1)
                .updatePosition(0.5, _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.data.voxel.getState() == 0 ? 0.5 : 1, 0.5);
            HalfBoxVoxelShape._createFace();
        },
        bottom() {
            _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.setDirection("bottom")
                .setDimensions(1, 1)
                .updatePosition(0.5, _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.data.voxel.getState() == 0 ? 0 : 0.5, 0.5);
            HalfBoxVoxelShape._createFace();
        },
        north() {
            _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.setDirection("north")
                .setDimensions(1, 0.5)
                .textures.setHeight(0.5, 1)
                .quad.updatePosition(0.5, _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.data.voxel.getState() == 0 ? 0.5 : 0.75, 1);
            HalfBoxVoxelShape._createFace();
        },
        south() {
            _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.setDirection("south")
                .setDimensions(1, 0.5)
                .textures.setHeight(0.5, 1)
                .quad.updatePosition(0.5, _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.data.voxel.getState() == 0 ? 0.5 : 0.75, 0);
            HalfBoxVoxelShape._createFace();
        },
        east() {
            _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.setDirection("east")
                .setDimensions(1, 0.5)
                .textures.setHeight(0.5, 1)
                .quad.updatePosition(1, _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.data.voxel.getState() == 0 ? 0.5 : 0.75, 0.5);
            HalfBoxVoxelShape._createFace();
        },
        west() {
            _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.setDirection("west")
                .setDimensions(1, 0.5)
                .textures.setHeight(0.5, 1)
                .quad.updatePosition(0, _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.data.voxel.getState() == 0 ? 0.5 : 0.75, 0.5);
            HalfBoxVoxelShape._createFace();
        },
    },
};
//cullface
_Rules_Overrides_OverridesManager_js__WEBPACK_IMPORTED_MODULE_0__.OverrideManager.registerOverride("CullFace", "#dve_half_box", "#dve_panel", (data) => {
    return false;
});
_Rules_Overrides_OverridesManager_js__WEBPACK_IMPORTED_MODULE_0__.OverrideManager.registerOverride("CullFace", "#dve_half_box", "#dve_box", (data) => {
    if (data.face == "bottom") {
        if (data.currentVoxel.getShapeState() == 0) {
            return false;
        }
    }
    if (data.face == "top") {
        if (data.currentVoxel.getShapeState() == 1) {
            return false;
        }
    }
    return true;
});
_Rules_Overrides_OverridesManager_js__WEBPACK_IMPORTED_MODULE_0__.OverrideManager.registerOverride("CullFace", "#dve_half_box", "#dve_stair", (data) => {
    return data.default;
});
//AO
_Rules_Overrides_OverridesManager_js__WEBPACK_IMPORTED_MODULE_0__.OverrideManager.registerOverride("AO", "#dve_half_box", "#dve_panel", (data) => {
    return false;
});
_Rules_Overrides_OverridesManager_js__WEBPACK_IMPORTED_MODULE_0__.OverrideManager.registerOverride("AO", "#dve_half_box", "#dve_box", (data) => {
    const shapeState = data.currentVoxel.getShapeState();
    if (shapeState == 1) {
        if (data.face == "top") {
            if (data.neighborVoxel.location[2] > data.currentVoxel.location[2]) {
                return true;
            }
        }
        if (data.neighborVoxel.location[2] == data.currentVoxel.location[2]) {
            return true;
        }
        return false;
    }
    return data.default;
});


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/default/Liquid/Liquid.voxel.shape.js":
/*!***********************************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/default/Liquid/Liquid.voxel.shape.js ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LiquidVoxelShape": () => (/* binding */ LiquidVoxelShape)
/* harmony export */ });
/* harmony import */ var _Rules_Overrides_OverridesManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Rules/Overrides/OverridesManager.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Rules/Overrides/OverridesManager.js");
/* harmony import */ var _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ShapeTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/ShapeTool.js");
/* harmony import */ var _Classes_VertexData_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Classes/VertexData.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Classes/VertexData.js");



//objects
const addData = (face) => {
    return _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.setDirection(face)
        .setFlipped(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.data.isFaceFlipped())
        .light.add(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.data.getWorldLight())
        .textures.add(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.data.getTexture())
        .overlayTexture.add(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.data.getOverlayTextures())
        .animationState.add(flowAnimationState);
};
const flowAnimationState = new _Classes_VertexData_js__WEBPACK_IMPORTED_MODULE_2__.QuadVertexData();
const vertexValue = new _Classes_VertexData_js__WEBPACK_IMPORTED_MODULE_2__.QuadVertexData();
const vertexLevel = new _Classes_VertexData_js__WEBPACK_IMPORTED_MODULE_2__.QuadVertexData();
let topFaceExposed = false;
const LiquidVoxelShape = {
    id: "#dve_liquid",
    start() {
        topFaceExposed = false;
        _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.setDimensions(1, 1).textures.setRoation(0);
        flowAnimationState.setAll(0);
        vertexLevel.setAll(15);
        vertexValue.setAll(0);
    },
    add: {
        top() {
            topFaceExposed = true;
            _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.data.calculateFlow();
            vertexLevel.setFromQuadData(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.data.getWorldLevel());
            vertexValue.set(vertexLevel.vetexes[1] / 15 - 1, vertexLevel.vetexes[2] / 15 - 1, vertexLevel.vetexes[3] / 15 - 1, vertexLevel.vetexes[4] / 15 - 1);
            _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.setTransform(1, 0, vertexValue.vetexes[1], 0)
                .setTransform(2, 0, vertexValue.vetexes[2], 0)
                .setTransform(3, 0, vertexValue.vetexes[3], 0)
                .setTransform(4, 0, vertexValue.vetexes[4], 0)
                .textures.setRoation(getAngle());
            addData("top")
                .updatePosition(0.5, 1, 0.5)
                .create()
                .clearTransform()
                .textures.clear();
        },
        bottom() {
            flowAnimationState.setAll(0);
            addData("bottom")
                .updatePosition(0.5, 0, 0.5)
                .create()
                .clearTransform()
                .textures.clear();
        },
        north() {
            flowAnimationState.setAll(1);
            _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.setDirection("north")
                .updatePosition(0.5, 0.5, 1)
                .setTransform(1, 0, vertexValue.vetexes[3], 0)
                .setTransform(2, 0, vertexValue.vetexes[2], 0)
                .light.add(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.data.getWorldLight())
                .overlayTexture.add(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.data.getOverlayTextures())
                .animationState.add(flowAnimationState);
            if (topFaceExposed) {
                _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.textures.advancedUVs.hs1 = Math.abs(vertexValue.vetexes[3]);
                _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.textures.advancedUVs.hs2 = Math.abs(vertexValue.vetexes[2]);
                _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.textures.addAdvancedUVs(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.data.getTexture());
            }
            else {
                _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.textures.add(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.data.getTexture());
            }
            _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.create().clearTransform().textures.clear();
        },
        south() {
            flowAnimationState.setAll(1);
            _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.setDirection("south")
                .updatePosition(0.5, 0.5, 0)
                .setTransform(1, 0, vertexValue.vetexes[1], 0)
                .setTransform(2, 0, vertexValue.vetexes[4], 0)
                .light.add(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.data.getWorldLight())
                .overlayTexture.add(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.data.getOverlayTextures())
                .animationState.add(flowAnimationState);
            if (topFaceExposed) {
                _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.textures.advancedUVs.hs1 = Math.abs(vertexValue.vetexes[1]);
                _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.textures.advancedUVs.hs2 = Math.abs(vertexValue.vetexes[4]);
                _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.textures.addAdvancedUVs(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.data.getTexture());
            }
            else {
                _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.textures.add(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.data.getTexture());
            }
            _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.create().clearTransform().textures.clear();
        },
        east() {
            flowAnimationState.setAll(1);
            _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.setDirection("east")
                .updatePosition(1, 0.5, 0.5)
                .setTransform(1, 0, vertexValue.vetexes[4], 0)
                .setTransform(2, 0, vertexValue.vetexes[3], 0)
                .light.add(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.data.getWorldLight())
                .overlayTexture.add(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.data.getOverlayTextures())
                .animationState.add(flowAnimationState);
            if (topFaceExposed) {
                _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.textures.advancedUVs.hs1 = Math.abs(vertexValue.vetexes[4]);
                _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.textures.advancedUVs.hs2 = Math.abs(vertexValue.vetexes[3]);
                _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.textures.addAdvancedUVs(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.data.getTexture());
            }
            else {
                _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.textures.add(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.data.getTexture());
            }
            _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.create().clearTransform().textures.clear();
        },
        west() {
            flowAnimationState.setAll(1);
            _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.setDirection("west")
                .updatePosition(0, 0.5, 0.5)
                .setTransform(1, 0, vertexValue.vetexes[2], 0)
                .setTransform(2, 0, vertexValue.vetexes[1], 0)
                .light.add(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.data.getWorldLight())
                .overlayTexture.add(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.data.getOverlayTextures())
                .animationState.add(flowAnimationState);
            if (topFaceExposed) {
                _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.textures.advancedUVs.hs1 = Math.abs(vertexValue.vetexes[2]);
                _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.textures.advancedUVs.hs2 = Math.abs(vertexValue.vetexes[1]);
                _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.textures.addAdvancedUVs(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.data.getTexture());
            }
            else {
                _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.textures.add(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.data.getTexture());
            }
            _ShapeTool_js__WEBPACK_IMPORTED_MODULE_1__.ShapeTool.builder.quad.create().clearTransform().textures.clear();
        },
    },
};
_Rules_Overrides_OverridesManager_js__WEBPACK_IMPORTED_MODULE_0__.OverrideManager.registerOverride("CullFace", "#dve_liquid", "Any", (data) => {
    if (data.face == "top" &&
        data.neighborVoxel.getSubstnaceData().isLiquid() &&
        data.currentVoxel.getStringId() != data.neighborVoxel.getStringId()) {
        return true;
    }
    return data.default;
});
const getAngle = () => {
    if (vertexLevel.isAllEqualTo(15)) {
        flowAnimationState.setAll(0);
        return 0;
    }
    const v1 = vertexLevel.vetexes[1];
    const v2 = vertexLevel.vetexes[2];
    const v3 = vertexLevel.vetexes[3];
    const v4 = vertexLevel.vetexes[4];
    if (v1 == v2 && v3 == v4 && v1 == v4 && v2 == v3) {
        flowAnimationState.setAll(0);
        return 0;
    }
    if (v2 == v3 && v1 == v4 && v2 > v1) {
        //flowing south
        flowAnimationState.setAll(1);
        return 0;
    }
    if (v2 == v3 && v1 == v4 && v2 < v1) {
        //flowing north
        flowAnimationState.setAll(2);
        return 0;
    }
    if (v2 == v1 && v3 == v4 && v1 > v4) {
        //flowing east
        flowAnimationState.setAll(2);
        return 90;
    }
    if (v3 == v4 && v2 == v1 && v4 > v1) {
        //flowing west
        flowAnimationState.setAll(1);
        return 90;
    }
    if (v2 < v4) {
        //flowing north west
        flowAnimationState.setAll(2);
        return 315;
    }
    if (v2 > v4) {
        //flowing south east
        flowAnimationState.setAll(1);
        return 315;
    }
    if (v1 > v3) {
        //flowing north east
        flowAnimationState.setAll(2);
        return 45;
    }
    if (v1 < v3) {
        //flowing south west
        flowAnimationState.setAll(1);
        return 45;
    }
    return 0;
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/default/Panel/CrossedPanels.voxel.shape.js":
/*!*****************************************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/default/Panel/CrossedPanels.voxel.shape.js ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CrossedPanels": () => (/* binding */ CrossedPanels)
/* harmony export */ });
/* harmony import */ var _ShapeTool_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ShapeTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/ShapeTool.js");
/* harmony import */ var _Classes_VertexData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Classes/VertexData.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Classes/VertexData.js");


const animationState = new _Classes_VertexData_js__WEBPACK_IMPORTED_MODULE_1__.QuadVertexData();
const addData = () => {
    return _ShapeTool_js__WEBPACK_IMPORTED_MODULE_0__.ShapeTool.builder.quad.light.add(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_0__.ShapeTool.data.getWorldLight())
        .AO.add(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_0__.ShapeTool.data.getWorldAO())
        .textures.add(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_0__.ShapeTool.data.getTexture())
        .overlayTexture.add(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_0__.ShapeTool.data.getOverlayTextures());
};
const CrossedPanels = {
    id: "#dve_crossed_panels",
    build() {
        let topANIM = 0;
        let bottomANIM = 0;
        if (_ShapeTool_js__WEBPACK_IMPORTED_MODULE_0__.ShapeTool.data.voxel.getSubstance() == "#dve_flora") {
            if (_ShapeTool_js__WEBPACK_IMPORTED_MODULE_0__.ShapeTool.data.voxel.isSameVoxel(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_0__.ShapeTool.data.voxel.x, _ShapeTool_js__WEBPACK_IMPORTED_MODULE_0__.ShapeTool.data.voxel.y + 1, _ShapeTool_js__WEBPACK_IMPORTED_MODULE_0__.ShapeTool.data.voxel.z)) {
                topANIM = 3;
                bottomANIM = 3;
            }
            else {
                topANIM = 1;
            }
        }
        animationState.set(topANIM, topANIM, bottomANIM, bottomANIM);
        _ShapeTool_js__WEBPACK_IMPORTED_MODULE_0__.ShapeTool.builder.quad.setDimensions(1, 1);
        addData()
            .setDirection("north")
            .setFlipped(false)
            .animationState.add(animationState)
            .updatePosition(0.5, 0.5, 1)
            .setTransform(1, 0, 0, -1)
            .setTransform(4, 0, 0, -1)
            .create()
            .clearTransform();
        addData()
            .setDirection("north")
            .setFlipped(false)
            .animationState.add(animationState)
            .updatePosition(0.5, 0.5, 0)
            .setTransform(1, 0, 0, 1)
            .setTransform(4, 0, 0, 1)
            .create()
            .clearTransform();
        addData()
            .setDirection("south")
            .setFlipped(false)
            .animationState.add(animationState)
            .updatePosition(0.5, 0.5, 0)
            .setTransform(1, 0, 0, 1)
            .setTransform(4, 0, 0, 1)
            .create()
            .clearTransform();
        addData()
            .setDirection("south")
            .setFlipped(false)
            .animationState.add(animationState)
            .updatePosition(0.5, 0.5, 1)
            .setTransform(1, 0, 0, -1)
            .setTransform(4, 0, 0, -1)
            .create()
            .clearTransform();
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/default/Panel/Panel.voxel.shape.js":
/*!*********************************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/default/Panel/Panel.voxel.shape.js ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PanelVoxelShape": () => (/* binding */ PanelVoxelShape)
/* harmony export */ });
/* harmony import */ var _Classes_VertexData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Classes/VertexData.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Classes/VertexData.js");
/* harmony import */ var _Rules_Overrides_OverridesManager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Rules/Overrides/OverridesManager.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Rules/Overrides/OverridesManager.js");
/* harmony import */ var _ShapeTool_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ShapeTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/ShapeTool.js");



const animationState = new _Classes_VertexData_js__WEBPACK_IMPORTED_MODULE_0__.QuadVertexData();
const addData = () => {
    return _ShapeTool_js__WEBPACK_IMPORTED_MODULE_2__.ShapeTool.builder.quad.setDimensions(1, 1)
        .animationState.add(animationState)
        .light.add(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_2__.ShapeTool.data.getWorldLight())
        .AO.add(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_2__.ShapeTool.data.getWorldAO())
        .textures.add(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_2__.ShapeTool.data.getTexture())
        .overlayTexture.add(_ShapeTool_js__WEBPACK_IMPORTED_MODULE_2__.ShapeTool.data.getOverlayTextures());
};
const shapeStates = {
    0: () => {
        addData().updatePosition(0.5, 0.5, 0.05).setDirection("south").create();
        addData().setDirection("north").create().clear();
    },
    1: () => {
        addData().updatePosition(0.5, 0.5, 0.95).setDirection("north").create();
        addData().setDirection("south").create().clear();
    },
    2: () => {
        addData().updatePosition(0.95, 0.5, 0.5).setDirection("east").create();
        addData().setDirection("west").create().clear();
    },
    3: () => {
        addData().updatePosition(0.05, 0.5, 0.5).setDirection("west").create();
        addData().setDirection("east").create().clear();
    },
    4: () => {
        addData().updatePosition(0.5, 0.05, 0.5).setDirection("top").create();
        addData().setDirection("bottom").create().clear();
    },
    5: () => {
        addData().updatePosition(0.5, 0.95, 0.5).setDirection("top").create();
        addData().setDirection("bottom").create().clear();
    },
};
const PanelVoxelShape = {
    id: "#dve_panel",
    build() {
        animationState.setAll(0);
        if (_ShapeTool_js__WEBPACK_IMPORTED_MODULE_2__.ShapeTool.data.voxel.getSubstance() == "#dve_flora") {
            animationState.setAll(2);
        }
        shapeStates[_ShapeTool_js__WEBPACK_IMPORTED_MODULE_2__.ShapeTool.data.voxel.getShapeState()]();
    },
};
_Rules_Overrides_OverridesManager_js__WEBPACK_IMPORTED_MODULE_1__.OverrideManager.registerOverride("CullFace", "Panel", "Any", (data) => {
    if (data.currentVoxel.getSubstance() == "#dve_flora") {
        return false;
    }
    return data.default;
});
_Rules_Overrides_OverridesManager_js__WEBPACK_IMPORTED_MODULE_1__.OverrideManager.registerOverride("CullFace", "Panel", "Any", (data) => {
    if (data.currentVoxel.getSubstance() == "#dve_flora") {
        return false;
    }
    return data.default;
});


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/default/Stairs/Stair.overrides.js":
/*!********************************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/default/Stairs/Stair.overrides.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SetUpStairOverrides": () => (/* binding */ SetUpStairOverrides),
/* harmony export */   "StairCullFace": () => (/* binding */ StairCullFace)
/* harmony export */ });
/* harmony import */ var _Rules_Overrides_OverridesManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Rules/Overrides/OverridesManager.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Rules/Overrides/OverridesManager.js");
/* harmony import */ var _Data_Shapes_StairStates_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../Data/Shapes/StairStates.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Shapes/StairStates.js");
/* harmony import */ var _Math_Constants_Faces_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../Math/Constants/Faces.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Constants/Faces.js");



/*
 "top",
 "bottom",
 "east",
 "west",
 "south",
 "north",
*/
const stairCulls = {};
stairCulls[_Data_Shapes_StairStates_js__WEBPACK_IMPORTED_MODULE_1__.StairStates.normal.bottom.north] = {
    faces: [0, 1, 3, 0, 3, 1, 0, 1],
    stateCulls: [
        [_Data_Shapes_StairStates_js__WEBPACK_IMPORTED_MODULE_1__.StairStates.normal.bottom.north],
        [_Data_Shapes_StairStates_js__WEBPACK_IMPORTED_MODULE_1__.StairStates.normal.bottom.north],
    ],
};
const halfBoxCull = (Data) => {
    return true;
};
const stairCull = (data) => {
    const shapeState = data.currentVoxel.getShapeState();
    const stairData = stairCulls[shapeState];
    if (!stairData)
        return false;
    const neighborShapeState = data.neighborVoxel.getShapeState();
    let finalResult = false;
    const faces = stairData.faces;
    const type = faces[_Math_Constants_Faces_js__WEBPACK_IMPORTED_MODULE_2__.FaceRecord[data.face]];
    if (type == 2 || type == 3) {
        const i = faces[_Math_Constants_Faces_js__WEBPACK_IMPORTED_MODULE_2__.FaceRecord[data.face] + 1];
        const override = stairData.stateCulls[i];
        finalResult = !override.includes(neighborShapeState);
    }
    return finalResult;
};
const boxCull = (data) => {
    const shapeState = data.currentVoxel.getShapeState();
    const stairData = stairCulls[shapeState];
    if (!stairData)
        return false;
    let finalResult = false;
    const faces = stairData.faces;
    const type = faces[_Math_Constants_Faces_js__WEBPACK_IMPORTED_MODULE_2__.FaceRecord[data.face]];
    if (type == 1 || type == 3) {
        finalResult = false;
    }
    return finalResult;
};
const StairCullFace = (data) => {
    const id = data.neighborVoxel.getShapeId();
    if (id == "#dve_box") {
        return boxCull(data);
    }
    if (id == "#dve_half_box") {
        return halfBoxCull(data);
    }
    if (id == "#dve_stair") {
        return stairCull(data);
    }
    return true;
};
function SetUpStairOverrides() {
    _Rules_Overrides_OverridesManager_js__WEBPACK_IMPORTED_MODULE_0__.OverrideManager.registerOverride("CullFace", "#dve_stair", "Any", (data) => {
        return StairCullFace(data);
    });
    _Rules_Overrides_OverridesManager_js__WEBPACK_IMPORTED_MODULE_0__.OverrideManager.registerOverride("AOFlipFace", "#dve_stair", "Any", (data) => {
        if (data.face == "top" || data.face == "bottom")
            return true;
        return false;
    });
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/default/Stairs/Stair.voxel.shape.js":
/*!**********************************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/default/Stairs/Stair.voxel.shape.js ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StairBuilderData": () => (/* binding */ StairBuilderData),
/* harmony export */   "StairVoxelShape": () => (/* binding */ StairVoxelShape)
/* harmony export */ });
/* harmony import */ var _Stair_overrides_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Stair.overrides.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/default/Stairs/Stair.overrides.js");
/* harmony import */ var _Data_Shapes_StairStates_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../Data/Shapes/StairStates.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Shapes/StairStates.js");
/* harmony import */ var _Builder_ShapeBuilder_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Builder/ShapeBuilder.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/Builder/ShapeBuilder.js");
/* harmony import */ var _ShapeTool_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../ShapeTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/ShapeTool.js");
/* harmony import */ var _Math_Constants_Faces_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../Math/Constants/Faces.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Constants/Faces.js");
//functions

//data




const StairVoxelShape = {
    id: "#dve_stair",
    add: {
        top() {
            _Builder_ShapeBuilder_js__WEBPACK_IMPORTED_MODULE_2__.ShapeBuilder.build(StairBuilderData[_ShapeTool_js__WEBPACK_IMPORTED_MODULE_3__.ShapeTool.data.voxel.getShapeState()][_Math_Constants_Faces_js__WEBPACK_IMPORTED_MODULE_4__.FaceRecord.top]);
        },
        bottom() {
            _Builder_ShapeBuilder_js__WEBPACK_IMPORTED_MODULE_2__.ShapeBuilder.build(StairBuilderData[_ShapeTool_js__WEBPACK_IMPORTED_MODULE_3__.ShapeTool.data.voxel.getShapeState()][_Math_Constants_Faces_js__WEBPACK_IMPORTED_MODULE_4__.FaceRecord.bottom]);
        },
        north() {
            _Builder_ShapeBuilder_js__WEBPACK_IMPORTED_MODULE_2__.ShapeBuilder.build(StairBuilderData[_ShapeTool_js__WEBPACK_IMPORTED_MODULE_3__.ShapeTool.data.voxel.getShapeState()][_Math_Constants_Faces_js__WEBPACK_IMPORTED_MODULE_4__.FaceRecord.north]);
        },
        south() {
            _Builder_ShapeBuilder_js__WEBPACK_IMPORTED_MODULE_2__.ShapeBuilder.build(StairBuilderData[_ShapeTool_js__WEBPACK_IMPORTED_MODULE_3__.ShapeTool.data.voxel.getShapeState()][_Math_Constants_Faces_js__WEBPACK_IMPORTED_MODULE_4__.FaceRecord.south]);
        },
        east() {
            _Builder_ShapeBuilder_js__WEBPACK_IMPORTED_MODULE_2__.ShapeBuilder.build(StairBuilderData[_ShapeTool_js__WEBPACK_IMPORTED_MODULE_3__.ShapeTool.data.voxel.getShapeState()][_Math_Constants_Faces_js__WEBPACK_IMPORTED_MODULE_4__.FaceRecord.east]);
        },
        west() {
            _Builder_ShapeBuilder_js__WEBPACK_IMPORTED_MODULE_2__.ShapeBuilder.build(StairBuilderData[_ShapeTool_js__WEBPACK_IMPORTED_MODULE_3__.ShapeTool.data.voxel.getShapeState()][_Math_Constants_Faces_js__WEBPACK_IMPORTED_MODULE_4__.FaceRecord.west]);
        },
    },
};
(0,_Stair_overrides_js__WEBPACK_IMPORTED_MODULE_0__.SetUpStairOverrides)();
const halfHeightQuad = (direction, position, AO, uvs) => {
    const mewQuad = quad(direction, position);
    mewQuad[1][1] = 0.5;
    mewQuad[3] = AO;
    mewQuad[4] = [-5, -5, -5, -5];
    mewQuad[5] = [0, 0, 1, uvs[0], uvs[1]];
    return mewQuad;
};
const halfWidthQuad = (direction, position, AO, uvs) => {
    const quad = halfHeightQuad(direction, position, AO, uvs);
    quad[1][0] = 0.5;
    quad[1][1] = 1;
    quad[4] = [-5, -5, -5, -5];
    quad[5] = [0, uvs[0], uvs[1], 0, 1];
    return quad;
};
const quaterQuad = (direction, position, AO, uvs) => {
    const mewQuad = quad(direction, position);
    mewQuad[1][0] = 0.5;
    mewQuad[1][1] = 0.5;
    mewQuad[3] = AO;
    mewQuad[4] = [-5, -5, -5, -5];
    mewQuad[5] = uvs;
    return mewQuad;
};
const quad = (direction, position, AO = [-1, -2, -3, -4], flip = -1 | 0 | 1) => {
    return [
        direction,
        [1, 1],
        position,
        AO,
        [-1, -2, -3, -4],
        [0, 0, 1, 0, 1],
        flip,
    ];
};
const fullQuads = {
    top: quad("top", [0.5, 1, 0.5]),
    bottom: quad("bottom", [0.5, 0, 0.5]),
    east: quad("east", [1, 0.5, 0.5]),
    west: quad("west", [0, 0.5, 0.5]),
    south: quad("south", [0.5, 0.5, 0]),
    north: quad("north", [0.5, 0.5, 1]),
};
const a = 3;
const StairBuilderData = {};
//bottom
StairBuilderData[_Data_Shapes_StairStates_js__WEBPACK_IMPORTED_MODULE_1__.StairStates.normal.bottom.north] = [
    [
        halfHeightQuad("top", [0.5, 1, 0.75], [1, -2, -3, 1], [0, 0.5]),
        halfHeightQuad("top", [0.5, 0.5, 0.25], [1, a, a, 1], [0.5, 1]),
    ],
    [fullQuads.bottom],
    [
        quaterQuad("east", [1, 0.75, 0.75], [-1, -2, 1, 1], [0, 0.5, 1, 0, 0.5]),
        halfHeightQuad("east", [1, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        quaterQuad("west", [0, 0.75, 0.75], [-1, -2, 1, 1], [0, 0, 0.5, 0, 0.5]),
        halfHeightQuad("west", [0, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        halfHeightQuad("south", [0.5, 0.25, 0], [1, 1, -3, -4], [0.5, 1]),
        halfHeightQuad("south", [0.5, 0.75, 0.5], [-1, -2, a, a], [0, 0.5]),
    ],
    [fullQuads.north],
];
StairBuilderData[_Data_Shapes_StairStates_js__WEBPACK_IMPORTED_MODULE_1__.StairStates.normal.bottom.south] = [
    [
        halfHeightQuad("top", [0.5, 0.5, 0.75], [a, 1, 1, a], [0, 0.5]),
        halfHeightQuad("top", [0.5, 1, 0.25], [-1, 1, 1, -4], [0.5, 1]),
    ],
    [fullQuads.bottom],
    [
        quaterQuad("east", [1, 0.75, 0.25], [-1, -2, 1, 1], [0, 0, 0.5, 0, 0.5]),
        halfHeightQuad("east", [1, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        quaterQuad("west", [0, 0.75, 0.25], [-1, -2, 1, 1], [0, 0.5, 1, 0, 0.5]),
        halfHeightQuad("west", [0, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
    ],
    [fullQuads.south],
    [
        halfHeightQuad("north", [0.5, 0.25, 1], [1, 1, -3, -4], [0.5, 1]),
        halfHeightQuad("north", [0.5, 0.75, 0.5], [-1, -2, a, a], [0, 0.5]),
    ],
];
StairBuilderData[_Data_Shapes_StairStates_js__WEBPACK_IMPORTED_MODULE_1__.StairStates.normal.bottom.east] = [
    [
        halfWidthQuad("top", [0.75, 1, 0.5], [1, 1, -3, -5], [0.5, 1]),
        halfWidthQuad("top", [0.25, 0.5, 0.5], [1, 1, a, a], [0, 0.5]),
    ],
    [fullQuads.bottom],
    [fullQuads.east],
    [
        halfHeightQuad("west", [0, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
        halfHeightQuad("west", [0.5, 0.75, 0.5], [-1, -2, a, a], [0, 0.5]),
    ],
    [
        quaterQuad("south", [0.75, 0.75, 0], [-1, -2, 1, 1], [0, 0.5, 1, 0, 0.5]),
        halfHeightQuad("south", [0.5, 0.25, 0], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        quaterQuad("north", [0.75, 0.75, 1], [-1, -2, 1, 1], [0, 0, 0.5, 0, 0.5]),
        halfHeightQuad("north", [0.5, 0.25, 1], [1, 1, -3, -4], [0.5, 1]),
    ],
];
StairBuilderData[_Data_Shapes_StairStates_js__WEBPACK_IMPORTED_MODULE_1__.StairStates.normal.bottom.west] = [
    [
        halfWidthQuad("top", [0.75, 0.5, 0.5], [a, a, 1, 1], [0.5, 1]),
        halfWidthQuad("top", [0.25, 1, 0.5], [-1, -2, 1, 1], [0, 0.5]),
    ],
    [fullQuads.bottom],
    [
        halfHeightQuad("east", [1, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
        halfHeightQuad("east", [0.5, 0.75, 0.5], [-1, -2, a, a], [0, 0.5]),
    ],
    [fullQuads.west],
    [
        quaterQuad("south", [0.25, 0.75, 0], [-1, -2, 1, 1], [0, 0, 0.5, 0, 0.5]),
        halfHeightQuad("south", [0.5, 0.25, 0], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        quaterQuad("north", [0.25, 0.75, 1], [-1, -2, 1, 1], [0, 0.5, 1, 0, 0.5]),
        halfHeightQuad("north", [0.5, 0.25, 1], [1, 1, -3, -4], [0.5, 1]),
    ],
];
//top
StairBuilderData[_Data_Shapes_StairStates_js__WEBPACK_IMPORTED_MODULE_1__.StairStates.normal.top.north] = [
    [fullQuads.top],
    [
        halfHeightQuad("bottom", [0.5, 0, 0.75], [1, 1, -3, -4], [0, 0.5]),
        halfHeightQuad("bottom", [0.5, 0.5, 0.25], [1, 1, a, a], [0.5, 1]),
    ],
    [
        quaterQuad("east", [1, 0.25, 0.75], [-1, -2, 1, 1], [0, 0.5, 1, 0.5, 1]),
        halfHeightQuad("east", [1, 0.75, 0.5], [1, 1, -3, -4], [0, 0.5]),
    ],
    [
        quaterQuad("west", [0, 0.25, 0.75], [-1, -2, 1, 1], [0, 0, 0.5, 0.5, 1]),
        halfHeightQuad("west", [0, 0.75, 0.5], [1, 1, -3, -4], [0, 0.5]),
    ],
    [
        halfHeightQuad("south", [0.5, 0.25, 0.5], [a, a, 1, 1], [0.5, 1]),
        halfHeightQuad("south", [0.5, 0.75, 0], [-1, -2, 1, 1], [0, 0.5]),
    ],
    [fullQuads.north],
];
StairBuilderData[_Data_Shapes_StairStates_js__WEBPACK_IMPORTED_MODULE_1__.StairStates.normal.top.south] = [
    [fullQuads.top],
    [
        halfHeightQuad("bottom", [0.5, 0, 0.25], [-1, -2, 1, 1], [0, 0.5]),
        halfHeightQuad("bottom", [0.5, 0.5, 0.75], [a, a, 1, 1], [0.5, 1]),
    ],
    [
        quaterQuad("east", [1, 0.25, 0.25], [-1, -2, 1, 1], [0, 0, 0.5, 0.5, 1]),
        halfHeightQuad("east", [1, 0.75, 0.5], [1, 1, -3, -4], [0, 0.5]),
    ],
    [
        quaterQuad("west", [0, 0.25, 0.25], [-1, -2, 1, 1], [0, 0.5, 1, 0.5, 1]),
        halfHeightQuad("west", [0, 0.75, 0.5], [1, 1, -3, -4], [0, 0.5]),
    ],
    [fullQuads.south],
    [
        halfHeightQuad("north", [0.5, 0.25, 0.5], [a, a, 1, 1], [0.5, 1]),
        halfHeightQuad("north", [0.5, 0.75, 1], [-1, -2, 1, 1], [0, 0.5]),
    ],
];
StairBuilderData[_Data_Shapes_StairStates_js__WEBPACK_IMPORTED_MODULE_1__.StairStates.normal.top.east] = [
    [fullQuads.top],
    [
        halfWidthQuad("bottom", [0.75, 0, 0.5], [1, -2, -3, 1], [0.5, 1]),
        halfWidthQuad("bottom", [0.25, 0.5, 0.5], [1, a, a, 1], [0, 0.5]),
    ],
    [fullQuads.east],
    [
        halfHeightQuad("west", [0.5, 0.25, 0.5], [a, a, 1, 1], [0.5, 1]),
        halfHeightQuad("west", [0, 0.75, 0.5], [-1, -2, 1, 1], [0, 0.5]),
    ],
    [
        quaterQuad("south", [0.75, 0.25, 0], [-1, -2, 1, 1], [0, 0.5, 1, 0.5, 1]),
        halfHeightQuad("south", [0.5, 0.75, 0], [1, 1, -3, -4], [0, 0.5]),
    ],
    [
        quaterQuad("north", [0.75, 0.25, 1], [-1, -2, 1, 1], [0, 0, 0.5, 0.5, 1]),
        halfHeightQuad("north", [0.5, 0.75, 1], [1, 1, -3, -4], [0, 0.5]),
    ],
];
StairBuilderData[_Data_Shapes_StairStates_js__WEBPACK_IMPORTED_MODULE_1__.StairStates.normal.top.west] = [
    [fullQuads.top],
    [
        halfWidthQuad("bottom", [0.75, 0.5, 0.5], [a, 1, 1, a], [0.5, 1]),
        halfWidthQuad("bottom", [0.25, 0, 0.5], [-1, 1, 1, -4], [0, 0.5]),
    ],
    [
        halfHeightQuad("east", [0.5, 0.25, 0.5], [a, a, 1, 1], [0.5, 1]),
        halfHeightQuad("east", [1, 0.75, 0.5], [-1, -2, 1, 1], [0, 0.5]),
    ],
    [fullQuads.west],
    [
        quaterQuad("south", [0.25, 0.25, 0], [-1, -2, 1, 1], [0, 0, 0.5, 0.5, 1]),
        halfHeightQuad("south", [0.5, 0.75, 0], [1, 1, -3, -4], [0, 0.5]),
    ],
    [
        quaterQuad("north", [0.25, 0.25, 1], [-1, -2, 1, 1], [0, 0.5, 1, 0.5, 1]),
        halfHeightQuad("north", [0.5, 0.75, 1], [1, 1, -3, -4], [0, 0.5]),
    ],
];
//connected states
//bottom
StairBuilderData[_Data_Shapes_StairStates_js__WEBPACK_IMPORTED_MODULE_1__.StairStates.connected.bottom.northEast] = [
    [
        quaterQuad("top", [0.75, 1, 0.75], [1, -2, -3, 1], [0, 0, 0.5, 0.5, 1]),
        quad("top", [0.5, 0.5, 0.5], [1, 1, a, 1]),
    ],
    [fullQuads.bottom],
    [
        quaterQuad("east", [1, 0.75, 0.75], [-1, -2, 1, 1], [0, 0.5, 1, 0, 0.5]),
        halfHeightQuad("east", [1, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        quaterQuad("west", [0.5, 0.75, 0.75], [-1, -2, a, a], [0, 0, 0.5, 0, 0.5]),
        halfHeightQuad("west", [0, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        quaterQuad("south", [0.75, 0.75, 0.5], [-1, -2, a, a], [0, 0.5, 1, 0, 0.5]),
        halfHeightQuad("south", [0.5, 0.25, 0], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        quaterQuad("north", [0.75, 0.75, 1], [-1, -2, 1, 1], [0, 0, 0.5, 0, 0.5]),
        halfHeightQuad("north", [0.5, 0.25, 1], [1, 1, -3, -4], [0.5, 1]),
    ],
];
StairBuilderData[_Data_Shapes_StairStates_js__WEBPACK_IMPORTED_MODULE_1__.StairStates.connected.bottom.northWest] = [
    [
        quaterQuad("top", [0.25, 1, 0.75], [1, -2, -3, 1], [0, 0, 0.5, 0.5, 1]),
        quad("top", [0.5, 0.5, 0.5], [1, 1, a, 1], 1),
    ],
    [fullQuads.bottom],
    [
        quaterQuad("east", [0.5, 0.75, 0.75], [-1, -2, a, a], [0, 0.5, 1, 0, 0.5]),
        halfHeightQuad("east", [1, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        quaterQuad("west", [0, 0.75, 0.75], [-1, -2, 1, 1], [0, 0, 0.5, 0, 0.5]),
        halfHeightQuad("west", [0, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        quaterQuad("south", [0.25, 0.75, 0.5], [-1, -2, a, a], [0, 0, 0.5, 0, 0.5]),
        halfHeightQuad("south", [0.5, 0.25, 0], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        quaterQuad("north", [0.25, 0.75, 1], [-1, -2, 1, 1], [0, 0.5, 1, 0, 0.5]),
        halfHeightQuad("north", [0.5, 0.25, 1], [1, 1, -3, -4], [0.5, 1]),
    ],
];
StairBuilderData[_Data_Shapes_StairStates_js__WEBPACK_IMPORTED_MODULE_1__.StairStates.connected.bottom.southEast] = [
    [
        quaterQuad("top", [0.75, 1, 0.25], [1, -2, -3, 1], [0, 0, 0.5, 0.5, 1]),
        quad("top", [0.5, 0.5, 0.5], [a, 1, 1, 1], 1),
    ],
    [fullQuads.bottom],
    [
        quaterQuad("east", [1, 0.75, 0.25], [-1, -2, 1, 1], [0, 0, 0.5, 0, 0.5]),
        halfHeightQuad("east", [1, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        quaterQuad("west", [0.5, 0.75, 0.25], [-1, -2, a, a], [0, 0.5, 1, 0, 0.5]),
        halfHeightQuad("west", [0, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        quaterQuad("south", [0.75, 0.75, 0], [-1, -2, 1, 1], [0, 0.5, 1, 0, 0.5]),
        halfHeightQuad("south", [0.5, 0.25, 0], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        quaterQuad("north", [0.75, 0.75, 0.5], [-1, -2, a, a], [0, 0, 0.5, 0, 0.5]),
        halfHeightQuad("north", [0.5, 0.25, 1], [1, 1, -3, -4], [0.5, 1]),
    ],
];
StairBuilderData[_Data_Shapes_StairStates_js__WEBPACK_IMPORTED_MODULE_1__.StairStates.connected.bottom.southWest] = [
    [
        quaterQuad("top", [0.25, 1, 0.25], [1, -2, -3, 1], [0, 0, 0.5, 0.5, 1]),
        quad("top", [0.5, 0.5, 0.5], [a, 1, 1, 1]),
    ],
    [fullQuads.bottom],
    [
        quaterQuad("east", [0.5, 0.75, 0.25], [-1, -2, a, a], [0, 0, 0.5, 0, 0.5]),
        halfHeightQuad("east", [1, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        quaterQuad("west", [0, 0.75, 0.25], [-1, -2, 1, 1], [0, 0.5, 1, 0, 0.5]),
        halfHeightQuad("west", [0, 0.25, 0.5], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        quaterQuad("south", [0.25, 0.75, 0], [-1, -2, 1, 1], [0, 0, 0.5, 0, 0.5]),
        halfHeightQuad("south", [0.5, 0.25, 0], [1, 1, -3, -4], [0.5, 1]),
    ],
    [
        quaterQuad("north", [0.25, 0.75, 0.5], [-1, -2, a, a], [0, 0.5, 1, 0, 0.5]),
        halfHeightQuad("north", [0.5, 0.25, 1], [1, 1, -3, -4], [0.5, 1]),
    ],
];
//top
StairBuilderData[_Data_Shapes_StairStates_js__WEBPACK_IMPORTED_MODULE_1__.StairStates.connected.top.northEast] = [
    [fullQuads.top],
    [
        quaterQuad("bottom", [0.75, 0, 0.75], [1, -2, -3, 1], [0, 0.5, 1, 0.5, 1]),
        quad("bottom", [0.5, 0.5, 0.5], [1, 1, a, 1]),
    ],
    [
        halfHeightQuad("east", [1, 0.75, 0.5], [-1, -2, 1, 1], [0, 0.5]),
        quaterQuad("east", [1, 0.25, 0.75], [1, 1, -3, -4], [0, 0.5, 1, 0.5, 1]),
    ],
    [
        halfHeightQuad("west", [0, 0.75, 0.5], [-1, -2, 1, 1], [0, 0.5]),
        quaterQuad("west", [0.5, 0.25, 0.75], [a, a, -3, -4], [0, 0, 0.5, 0.5, 1]),
    ],
    [
        halfHeightQuad("south", [0.5, 0.75, 0], [-1, -2, 1, 1], [0, 0.5]),
        quaterQuad("south", [0.75, 0.25, 0.5], [a, a, -3, -4], [0, 0.5, 1, 0.5, 1]),
    ],
    [
        halfHeightQuad("north", [0.5, 0.75, 1], [-1, -2, 1, 1], [0, 0.5]),
        quaterQuad("north", [0.75, 0.25, 1], [1, 1, -3, -4], [0, 0, 0.5, 0.5, 1]),
    ],
];
StairBuilderData[_Data_Shapes_StairStates_js__WEBPACK_IMPORTED_MODULE_1__.StairStates.connected.top.northWest] = [
    [fullQuads.top],
    [
        quaterQuad("bottom", [0.25, 0, 0.75], [1, -2, -3, 1], [0, 0, 0.5, 0.5, 1]),
        quad("bottom", [0.5, 0.5, 0.5], [a, 1, 1, 1], 1),
    ],
    [
        halfHeightQuad("east", [1, 0.75, 0.5], [-1, -2, 1, 1], [0, 0.5]),
        quaterQuad("east", [0.5, 0.25, 0.75], [a, a, -3, -4], [0, 0.5, 1, 0.5, 1]),
    ],
    [
        halfHeightQuad("west", [0, 0.75, 0.5], [-1, -2, 1, 1], [0, 0.5]),
        quaterQuad("west", [0, 0.25, 0.75], [1, 1, -3, -4], [0, 0, 0.5, 0.5, 1]),
    ],
    [
        halfHeightQuad("south", [0.5, 0.75, 0], [-1, -2, 1, 1], [0, 0.5]),
        quaterQuad("south", [0.25, 0.25, 0.5], [a, a, -3, -4], [0, 0, 0.5, 0.5, 1]),
    ],
    [
        halfHeightQuad("north", [0.5, 0.75, 1], [-1, -2, 1, 1], [0, 0.5]),
        quaterQuad("north", [0.25, 0.25, 1], [1, 1, -3, -4], [0, 0.5, 1, 0.5, 1]),
    ],
];
StairBuilderData[_Data_Shapes_StairStates_js__WEBPACK_IMPORTED_MODULE_1__.StairStates.connected.top.southEast] = [
    [fullQuads.top],
    [
        quaterQuad("bottom", [0.75, 0, 0.25], [1, -2, -3, 1], [0, 0.5, 1, 0, 0.5]),
        quad("bottom", [0.5, 0.5, 0.5], [1, 1, a, 1], 1),
    ],
    [
        halfHeightQuad("east", [1, 0.75, 0.5], [-1, -2, 1, 1], [0, 0.5]),
        quaterQuad("east", [1, 0.25, 0.25], [1, 1, -3, -4], [0, 0, 0.5, 0.5, 1]),
    ],
    [
        halfHeightQuad("west", [0, 0.75, 0.5], [-1, -2, 1, 1], [0, 0.5]),
        quaterQuad("west", [0.5, 0.25, 0.25], [a, a, -3, -4], [0, 0.5, 1, 0.5, 1]),
    ],
    [
        halfHeightQuad("south", [0.5, 0.75, 0], [-1, -2, 1, 1], [0, 0.5]),
        quaterQuad("south", [0.75, 0.25, 0], [1, 1, -3, -4], [0, 0.5, 1, 0.5, 1]),
    ],
    [
        halfHeightQuad("north", [0.5, 0.75, 1], [-1, -2, 1, 1], [0, 0.5]),
        quaterQuad("north", [0.75, 0.25, 0.5], [a, a, -3, -4], [0, 0, 0.5, 0.5, 1]),
    ],
];
StairBuilderData[_Data_Shapes_StairStates_js__WEBPACK_IMPORTED_MODULE_1__.StairStates.connected.top.southWest] = [
    [fullQuads.top],
    [
        quaterQuad("bottom", [0.25, 0, 0.25], [1, -2, -3, 1], [0, 0, 0.5, 0, 0.5]),
        quad("bottom", [0.5, 0.5, 0.5], [a, 1, 1, 1]),
    ],
    [
        halfHeightQuad("east", [1, 0.75, 0.5], [-1, -2, 1, 1], [0, 0.5]),
        quaterQuad("east", [0.5, 0.25, 0.25], [a, a, -3, -4], [0, 0, 0.5, 0.5, 1]),
    ],
    [
        halfHeightQuad("west", [0, 0.75, 0.5], [-1, -2, 1, 1], [0, 0.5]),
        quaterQuad("west", [0, 0.25, 0.25], [1, 1, -3, -4], [0, 0.5, 1, 0.5, 1]),
    ],
    [
        halfHeightQuad("south", [0.5, 0.75, 0], [-1, -2, 1, 1], [0, 0.5]),
        quaterQuad("south", [0.25, 0.25, 0], [1, 1, -3, -4], [0, 0, 0.5, 0.5, 1]),
    ],
    [
        halfHeightQuad("north", [0.5, 0.75, 1], [-1, -2, 1, 1], [0, 0.5]),
        quaterQuad("north", [0.25, 0.25, 0.5], [a, a, -3, -4], [0, 0.5, 1, 0.5, 1]),
    ],
];


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/default/index.js":
/*!***************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/default/index.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BoxVoxelShape": () => (/* reexport safe */ _Box_Box_voxel_shape_js__WEBPACK_IMPORTED_MODULE_1__.BoxVoxelShape),
/* harmony export */   "CrossedPanels": () => (/* reexport safe */ _Panel_CrossedPanels_voxel_shape_js__WEBPACK_IMPORTED_MODULE_4__.CrossedPanels),
/* harmony export */   "HalfBoxVoxelShape": () => (/* reexport safe */ _Box_HalfBox_voxel_shape_js__WEBPACK_IMPORTED_MODULE_2__.HalfBoxVoxelShape),
/* harmony export */   "LiquidVoxelShape": () => (/* reexport safe */ _Liquid_Liquid_voxel_shape_js__WEBPACK_IMPORTED_MODULE_3__.LiquidVoxelShape),
/* harmony export */   "PanelVoxelShape": () => (/* reexport safe */ _Panel_Panel_voxel_shape_js__WEBPACK_IMPORTED_MODULE_5__.PanelVoxelShape),
/* harmony export */   "StairBuilderData": () => (/* reexport safe */ _Stairs_Stair_voxel_shape_js__WEBPACK_IMPORTED_MODULE_0__.StairBuilderData),
/* harmony export */   "StairVoxelShape": () => (/* reexport safe */ _Stairs_Stair_voxel_shape_js__WEBPACK_IMPORTED_MODULE_0__.StairVoxelShape)
/* harmony export */ });
/* harmony import */ var _Stairs_Stair_voxel_shape_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Stairs/Stair.voxel.shape.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/default/Stairs/Stair.voxel.shape.js");
/* harmony import */ var _Box_Box_voxel_shape_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Box/Box.voxel.shape.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/default/Box/Box.voxel.shape.js");
/* harmony import */ var _Box_HalfBox_voxel_shape_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Box/HalfBox.voxel.shape.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/default/Box/HalfBox.voxel.shape.js");
/* harmony import */ var _Liquid_Liquid_voxel_shape_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Liquid/Liquid.voxel.shape.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/default/Liquid/Liquid.voxel.shape.js");
/* harmony import */ var _Panel_CrossedPanels_voxel_shape_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Panel/CrossedPanels.voxel.shape.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/default/Panel/CrossedPanels.voxel.shape.js");
/* harmony import */ var _Panel_Panel_voxel_shape_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Panel/Panel.voxel.shape.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/default/Panel/Panel.voxel.shape.js");








/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Textures/TextureManager.js":
/*!******************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Textures/TextureManager.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TextureManager": () => (/* binding */ TextureManager)
/* harmony export */ });
const TextureManager = {
    textureDataHasBeenSet: false,
    data: {},
    getTextureUV(data, overlay = false) {
        const [textureType, textureId, varation] = data;
        let id = textureId;
        if (varation) {
            id = `${textureId}:${varation}`;
        }
        let uv = -1;
        if (!overlay) {
            uv = this.data[textureType]["main"][id];
        }
        else {
            uv = this.data[textureType]["overlay"][id];
        }
        if (uv == -1) {
            throw new Error(`Texture with id: ${id} does not exists. Overlay : ${overlay}`);
        }
        return uv;
    },
    setTextureIndex(data) {
        this.textureDataHasBeenSet = true;
        this.data = data;
    },
    releaseTextureData() {
        this.data = null;
        delete this["data"];
    },
    isReady() {
        return this.textureDataHasBeenSet;
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Tools/BuilderDataTool.js":
/*!****************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Tools/BuilderDataTool.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BuilderDataTool": () => (/* binding */ BuilderDataTool)
/* harmony export */ });
/* harmony import */ var _Tools_Data_DataTool_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Tools/Data/DataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/DataTool.js");
/* harmony import */ var _Builder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Builder.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Builder.js");


class BuilderDataTool extends _Tools_Data_DataTool_js__WEBPACK_IMPORTED_MODULE_0__.DataTool {
    getConstructor() {
        return _Builder_js__WEBPACK_IMPORTED_MODULE_1__.Builder.constructors.get(this.getStringId());
    }
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Tools/MeshBuilderTool.js":
/*!****************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Tools/MeshBuilderTool.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MeshBuilderTool": () => (/* binding */ MeshBuilderTool),
/* harmony export */   "QuadBuilderTool": () => (/* binding */ QuadBuilderTool),
/* harmony export */   "QuadUVTool": () => (/* binding */ QuadUVTool)
/* harmony export */ });
/* harmony import */ var _Geometry_QuadBuilder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Geometry/QuadBuilder.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Geometry/QuadBuilder.js");
/* harmony import */ var _Geometry_QuadUVs_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Geometry/QuadUVs.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Geometry/QuadUVs.js");


class MeshBuilderTool {
    direction = "top";
    tool;
    constructor() { }
    setMesherTool(tool) {
        this.tool = tool;
        this.quad.setMesherTool(tool);
        return this;
    }
    quad = new QuadBuilderTool();
}
class QuadBuilderTool {
    tool;
    builder = _Geometry_QuadBuilder_js__WEBPACK_IMPORTED_MODULE_0__.QuadBuilder;
    uvs = new QuadUVTool(this, "cuv3");
    setMesherTool(tool) {
        this.tool = tool;
        return this;
    }
    _fliped = false;
    _direction = "top";
    _position = { x: 0, y: 0, z: 0 };
    _cachedPosition = { x: 0, y: 0, z: 0 };
    _dimension = { height: 0, width: 0 };
    _transform = {
        1: { x: 0, y: 0, z: 0 },
        2: { x: 0, y: 0, z: 0 },
        3: { x: 0, y: 0, z: 0 },
        4: { x: 0, y: 0, z: 0 },
    };
    setDimensions(width, height) {
        this._dimension.width = width;
        this._dimension.height = height;
        return this;
    }
    setPosition(x = 0, y = 0, z = 0) {
        this._position.x = x;
        this._position.y = y;
        this._position.z = z;
        this._cachedPosition.x = x;
        this._cachedPosition.y = y;
        this._cachedPosition.z = z;
        return this;
    }
    updatePosition(x = 0, y = 0, z = 0) {
        this._position.x = this._cachedPosition.x + x;
        this._position.y = this._cachedPosition.y + y;
        this._position.z = this._cachedPosition.z + z;
        return this;
    }
    updatePositionInPlace(x = 0, y = 0, z = 0) {
        this._position.x += x;
        this._position.y += y;
        this._position.z += z;
        return this;
    }
    setTransform(vertex, x = 0, y = 0, z = 0) {
        const t = this._transform[vertex];
        t.x = x;
        t.y = y;
        t.z = z;
        return this;
    }
    clearTransform() {
        this.setTransform(1);
        this.setTransform(2);
        this.setTransform(3);
        this.setTransform(4);
        return this;
    }
    setFlipped(flipped) {
        this._fliped = flipped;
        return this;
    }
    setDirection(direction) {
        this._direction = direction;
        return this;
    }
    create() {
        this.builder.create(this.tool, this._direction, this._position, this._dimension, this._fliped, this._transform);
        return this;
    }
    clear() {
        this._cachedPosition.x = 0;
        this._cachedPosition.y = 0;
        this._cachedPosition.z = 0;
        this._fliped = false;
        this._dimension.width = 1;
        this._dimension.height = 1;
        for (let i = 1; i < 5; i++) {
            this._transform[i].x = 0;
            this._transform[i].y = 0;
            this._transform[i].z = 0;
        }
        return this;
    }
}
class QuadUVTool {
    quad;
    attributeId;
    uvs = _Geometry_QuadUVs_js__WEBPACK_IMPORTED_MODULE_1__.QuadUVs;
    _data = {
        width: [0, 1],
        height: [0, 1],
    };
    _fliped = false;
    advancedUVs = {
        hs1: 0,
        hs2: 0,
        he1: 1,
        he2: 1,
        ws1: 0,
        ws2: 0,
        we1: 1,
        we2: 1,
    };
    _rotation = 0;
    constructor(quad, attributeId) {
        this.quad = quad;
        this.attributeId = attributeId;
    }
    resetAdvancedUVs() {
        this.advancedUVs.hs1 = 0;
        this.advancedUVs.hs2 = 0;
        this.advancedUVs.he1 = 1;
        this.advancedUVs.he2 = 1;
        this.advancedUVs.ws1 = 0;
        this.advancedUVs.ws2 = 0;
        this.advancedUVs.we1 = 1;
        this.advancedUVs.we2 = 1;
        return this;
    }
    setFlipped(flipped) {
        this._fliped = flipped;
        return this;
    }
    setWidth(start, end) {
        this._data.width[0] = start;
        this._data.width[1] = end;
        return this;
    }
    setHeight(start, end) {
        this._data.height[0] = start;
        this._data.height[1] = end;
        return this;
    }
    setRoation(rotation) {
        this._rotation = rotation;
        return this;
    }
    addAdvancedUVs(textureId) {
        this.uvs.addAdvancedUVs(this.quad._direction, textureId, this.quad.tool.getAttribute(this.attributeId), this.advancedUVs, this._fliped);
        return this;
    }
    add(textureId) {
        this.uvs.addUVs({
            direction: this.quad._direction,
            uvs: this.quad.tool.getAttribute(this.attributeId),
            uv: textureId,
            width: { start: this._data.width[0], end: this._data.width[1] },
            height: { start: this._data.height[0], end: this._data.height[1] },
            flipped: this._fliped,
            rotoate: this._rotation,
        });
        return this.quad;
    }
    clear() {
        this._data.width[0] = 0;
        this._data.width[1] = 1;
        this._data.height[0] = 0;
        this._data.height[1] = 1;
        this._fliped = false;
        this._rotation = 0;
        this.resetAdvancedUVs();
        return this.quad;
    }
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Tools/MesherDataTools.js":
/*!****************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Tools/MesherDataTools.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MesherDataTool": () => (/* binding */ MesherDataTool)
/* harmony export */ });
/* harmony import */ var _Global_Util_UtilMap_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Global/Util/UtilMap.js */ "../../DSLIBS/divineVoxelEngine/dist/Global/Util/UtilMap.js");
/* harmony import */ var divine_binary_object_Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! divine-binary-object/Constants/ByteData.js */ "../../DSLIBS/divineBinaryObject/dist/Constants/ByteData.js");


class MesherDataTool {
    indicieIndex = 0;
    vars = new _Global_Util_UtilMap_js__WEBPACK_IMPORTED_MODULE_0__.UtilMap();
    segments = new _Global_Util_UtilMap_js__WEBPACK_IMPORTED_MODULE_0__.UtilMap();
    quadVertexData = new _Global_Util_UtilMap_js__WEBPACK_IMPORTED_MODULE_0__.UtilMap();
    attributes = new _Global_Util_UtilMap_js__WEBPACK_IMPORTED_MODULE_0__.UtilMap([
        ["position", [[], 3, "32f"]],
        ["normal", [[], 3, "32f"]],
        ["indices", [[], 1, "16ui"]],
    ]);
    addPositions(...positions) {
        this.attributes.get("position")[0].push(...positions);
        return this;
    }
    addNormals(...normals) {
        this.attributes.get("normal")[0].push(...normals);
        return this;
    }
    addIndices(...indices) {
        this.attributes.get("indices")[0].push(...indices);
        return this;
    }
    addToAttribute(id, ...data) {
        const attribute = this.attributes.get(id);
        if (!attribute)
            return this;
        attribute[0].push(...data);
        return this;
    }
    getAttribute(id) {
        return this.attributes.get(id)[0];
    }
    addToSegment(id, ...normals) {
        const segment = this.segments.get(id);
        if (!segment)
            return this;
        segment.push(...normals);
        return this;
    }
    setVar(id, value) {
        if (this.vars.has(id)) {
            this.vars.set(id, value);
        }
        return this;
    }
    getVar(id) {
        return this.vars.get(id);
    }
    resetAll() {
        this.resetSegments();
        this.resetAttributes();
        this.resetVars();
        return this;
    }
    resetSegments() {
        for (const [key, v] of this.segments._map) {
            this.segments._map.set(key, []);
        }
        return this;
    }
    resetAttributes() {
        for (const [key, v] of this.attributes._map) {
            this.attributes._map.set(key, [[], v[1], v[2]]);
        }
        this.indicieIndex = 0;
        return this;
    }
    resetVars() {
        for (const key of this.vars._map.keys()) {
            this.vars.set(key, 0);
        }
        return this;
    }
    getMeshData() {
        const arrays = [];
        const strides = [];
        const trasnfers = [];
        for (const [key, [value, stride, type]] of this.attributes._map) {
            //@ts-ignore
            const newArray = divine_binary_object_Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.TypedArrayMap[type].from(value);
            arrays.push(newArray);
            strides.push(stride);
            trasnfers.push(newArray.buffer);
        }
        return [arrays, trasnfers, strides];
    }
    getAllAttributes() {
        const data = [];
        const trasnfers = [];
        for (const [key, [value, stride, type]] of this.attributes._map) {
            //@ts-ignore
            const newArray = divine_binary_object_Constants_ByteData_js__WEBPACK_IMPORTED_MODULE_1__.TypedArrayMap[type].from(value);
            trasnfers.push(newArray.buffer);
            data.push([key, newArray, stride]);
        }
        return [data, trasnfers];
    }
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Tools/OutlinedVoxelTool.js":
/*!******************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Tools/OutlinedVoxelTool.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OutlinedVoxelTool": () => (/* binding */ OutlinedVoxelTool)
/* harmony export */ });
/* harmony import */ var _DivineVoxelEngineConstructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../DivineVoxelEngineConstructor.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/DivineVoxelEngineConstructor.js");

const checkSets = {
    north: [
        [0, 0, 1],
        [1, 0, 1],
        [-1, 0, 1],
    ],
    south: [
        [0, 0, -1],
        [1, 0, -1],
        [-1, 0, -1],
    ],
    east: [[1, 0, 0]],
    west: [[-1, 0, 0]],
    top: [
        [0, 1, 0],
        [-1, 1, -1],
        [1, 1, 1],
    ],
    bottom: [
        [0, -1, 0],
        [-1, -1, -1],
        [1, -1, 1],
    ],
    right: [[-1, 0, 0]],
    left: [[1, 0, 0]],
};
const DirectionNormals = {
    top: [0, 1, 0],
    bottom: [0, -1, 0],
    east: [1, 0, 0],
    west: [-1, 0, 0],
    north: [0, 0, 1],
    south: [0, 0, -1],
};
const uvsSets = {
    north: {
        0b0: 0,
        0b101: 1,
        0b011: 2,
        0b001: 3,
    },
    south: {
        0b0: 4,
        0b101: 5,
        0b011: 6,
        0b001: 7,
    },
    east: {
        0b0: 8,
    },
    west: {
        0b0: 9,
    },
    top: {
        0b0: 0,
        0b101: 1,
        0b011: 2,
        0b001: 3,
    },
    bottom: {
        0b0: 4,
        0b101: 5,
        0b011: 6,
        0b001: 7,
    },
    right: {
        0b0: 8,
    },
    left: {
        0b0: 9,
    },
};
const OutlinedVoxelTool = {
    _currentTexts: [],
    setCurrentTextures(textures) {
        this._currentTexts = textures;
    },
    addTo: {
        top(tool) {
            tool
                .getOverlayTextures()
                .set(OutlinedVoxelTool.getTexture("north", "top", tool), OutlinedVoxelTool.getTexture("south", "top", tool), OutlinedVoxelTool.getTexture("east", "top", tool), OutlinedVoxelTool.getTexture("west", "top", tool));
        },
        bottom(tool) {
            tool
                .getOverlayTextures()
                .set(OutlinedVoxelTool.getTexture("north", "bottom", tool), OutlinedVoxelTool.getTexture("south", "bottom", tool), OutlinedVoxelTool.getTexture("east", "bottom", tool), OutlinedVoxelTool.getTexture("west", "bottom", tool));
        },
        north(tool) {
            tool
                .getOverlayTextures()
                .set(OutlinedVoxelTool.getTexture("top", "north", tool), OutlinedVoxelTool.getTexture("bottom", "north", tool), OutlinedVoxelTool.getTexture("right", "north", tool), OutlinedVoxelTool.getTexture("left", "north", tool));
        },
        south(tool) {
            tool
                .getOverlayTextures()
                .set(OutlinedVoxelTool.getTexture("top", "south", tool), OutlinedVoxelTool.getTexture("bottom", "south", tool), OutlinedVoxelTool.getTexture("right", "south", tool), OutlinedVoxelTool.getTexture("left", "south", tool));
        },
        east(tool) {
            tool
                .getOverlayTextures()
                .set(OutlinedVoxelTool.getTexture("top", "east", tool), OutlinedVoxelTool.getTexture("bottom", "east", tool), OutlinedVoxelTool.getTexture("right", "east", tool), OutlinedVoxelTool.getTexture("left", "east", tool));
        },
        west(tool) {
            tool
                .getOverlayTextures()
                .set(OutlinedVoxelTool.getTexture("top", "west", tool), OutlinedVoxelTool.getTexture("bottom", "west", tool), OutlinedVoxelTool.getTexture("right", "west", tool), OutlinedVoxelTool.getTexture("left", "west", tool));
        },
    },
    getOutlineUVs(texture, onRegister) {
        const overlayTextures = [];
        _DivineVoxelEngineConstructor_js__WEBPACK_IMPORTED_MODULE_0__.DVEC.hooks.texturesRegistered.addToRun((textureManager) => {
            const type = texture[0];
            const id = texture[1];
            overlayTextures.push(textureManager.getTextureUV([type, id, "top"], true) /** */, textureManager.getTextureUV([type, id, "corner-top-right"], true), textureManager.getTextureUV([type, id, "corner-top-left"], true), textureManager.getTextureUV([type, id, "corner-top-left-top-right"], true), textureManager.getTextureUV([type, id, "bottom"], true), textureManager.getTextureUV([type, id, "corner-bottom-right"], true), textureManager.getTextureUV([type, id, "corner-bottom-left"], true), textureManager.getTextureUV([type, id, "corner-bottom-left-bottom-right"], true), textureManager.getTextureUV([type, id, "right"], true), textureManager.getTextureUV([type, id, "left"], true));
            onRegister(overlayTextures);
        });
    },
    getTexture(direction, face, tool) {
        const { x, y, z } = tool.voxel;
        let key = 0b0;
        const sets = checkSets[direction];
        const sl = sets.length;
        for (let i = 0; i < sets.length; i++) {
            const set = sets[i];
            let cx = x;
            let cy = y;
            let cz = z;
            switch (face) {
                case "top":
                    cx += set[0];
                    cz += set[2];
                    break;
                case "bottom":
                    cx += set[0];
                    cz += set[2] * -1;
                    break;
                case "north":
                    if (sl == 0) {
                        cx += set[0];
                    }
                    else {
                        cx += set[0];
                        cy += set[1];
                    }
                    break;
                case "south":
                    if (sl == 0) {
                        cx += set[0] * -1;
                    }
                    else {
                        cx += set[0] * -1;
                        cy += set[1];
                    }
                    break;
                case "west":
                    if (sl == 0) {
                        cz += set[0];
                    }
                    else {
                        cz += set[0];
                        cy += set[1];
                    }
                    break;
                case "east":
                    if (sl == 0) {
                        cz += set[0] * -1;
                    }
                    else {
                        cz += set[0] * -1;
                        cy += set[1];
                    }
                    break;
            }
            const normal = DirectionNormals[face];
            const sameLevelCheck = tool.voxel.isSameVoxel(cx, cy, cz);
            let normalCheck = true;
            if (tool.nVoxel.loadInAt(cx + normal[0], cy + normal[1], cz + normal[2])) {
                if (tool.nVoxel.isOpaque()) {
                    normalCheck = false;
                }
            }
            if (sameLevelCheck && normalCheck) {
                key |= 0b1 << i;
            }
            else {
                key |= 0b0 << i;
                if (i == 0)
                    break;
            }
        }
        if (uvsSets[direction][key] == undefined)
            return 0;
        const index = uvsSets[direction][key];
        return this._currentTexts[index];
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Tools/VoxelMesherDataTool.js":
/*!********************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Tools/VoxelMesherDataTool.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VoxelMesherDataTool": () => (/* binding */ VoxelMesherDataTool)
/* harmony export */ });
/* harmony import */ var _Calc_Light_LightGradient_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Calc/Light/LightGradient.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Calc/Light/LightGradient.js");
/* harmony import */ var _Calc_Flow_FlowGradient_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Calc/Flow/FlowGradient.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Calc/Flow/FlowGradient.js");
/* harmony import */ var _Rules_Overrides_OverridesManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Rules/Overrides/OverridesManager.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Rules/Overrides/OverridesManager.js");
/* harmony import */ var _Rules_SubstanceRules_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Rules/SubstanceRules.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Rules/SubstanceRules.js");
/* harmony import */ var _BuilderDataTool_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BuilderDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Tools/BuilderDataTool.js");
/* harmony import */ var _MesherDataTools_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./MesherDataTools.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Tools/MesherDataTools.js");
/* harmony import */ var _Math_Constants_Faces_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../Math/Constants/Faces.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Constants/Faces.js");
/* harmony import */ var _Classes_VertexData_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Classes/VertexData.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Classes/VertexData.js");
//objects




//tools


//data


class VoxelMesherDataTool extends _MesherDataTools_js__WEBPACK_IMPORTED_MODULE_5__.MesherDataTool {
    voxel = new _BuilderDataTool_js__WEBPACK_IMPORTED_MODULE_4__.BuilderDataTool();
    nVoxel = new _BuilderDataTool_js__WEBPACK_IMPORTED_MODULE_4__.BuilderDataTool();
    faceDataOverride = {
        face: "south",
        default: false,
        currentVoxel: {},
        neighborVoxel: {},
    };
    constructor() {
        super();
        this.faceDataOverride.currentVoxel = this.voxel;
        this.faceDataOverride.neighborVoxel = this.nVoxel;
        this.attributes.add([
            ["voxelData", [[], 1, "32f"]],
            ["cuv3", [[], 3, "32f"]],
            ["ocuv3", [[], 4, "32f"]],
            ["colors", [[], 3, "32f"]],
        ]);
        this.segments.add([
            ["uvs", []],
            ["overlay-uvs", []],
        ]);
        this.quadVertexData.add([
            ["light", new _Classes_VertexData_js__WEBPACK_IMPORTED_MODULE_7__.QuadVertexData()],
            ["ao", new _Classes_VertexData_js__WEBPACK_IMPORTED_MODULE_7__.QuadVertexData()],
            ["level", new _Classes_VertexData_js__WEBPACK_IMPORTED_MODULE_7__.QuadVertexData()],
            ["overlay-uvs", new _Classes_VertexData_js__WEBPACK_IMPORTED_MODULE_7__.QuadVertexData()],
        ]);
        this.vars.add([
            ["face-flipped", 0],
            ["texture-index", 0],
        ]);
    }
    calculateLight(direction, ignoreAO = false) {
        _Calc_Light_LightGradient_js__WEBPACK_IMPORTED_MODULE_0__.LightGradient.calculate(direction, this, ignoreAO);
    }
    calculateFlow() {
        _Calc_Flow_FlowGradient_js__WEBPACK_IMPORTED_MODULE_1__.FlowGradient.calculate(this);
    }
    getWorldLight() {
        return this.quadVertexData.get("light");
    }
    getWorldAO() {
        return this.quadVertexData.get("ao");
    }
    getWorldLevel() {
        return this.quadVertexData.get("level");
    }
    getOverlayTextures() {
        return this.quadVertexData.get("overlay-uvs");
    }
    setTexture(uv) {
        this.vars.set("texture-index", uv);
        return this;
    }
    getTexture() {
        return this.vars.get("texture-index");
    }
    setFaceFlipped(value) {
        this.vars.set("face-flipped", value ? 1 : 0);
        return this;
    }
    isFaceFlipped() {
        return this.vars.get("face-flipped") == 1;
    }
    isFaceExposed(face) {
        const voxelExists = this.nVoxel.loadInAt(_Math_Constants_Faces_js__WEBPACK_IMPORTED_MODULE_6__.FaceNormals[face][0] + this.voxel.x, _Math_Constants_Faces_js__WEBPACK_IMPORTED_MODULE_6__.FaceNormals[face][1] + this.voxel.y, _Math_Constants_Faces_js__WEBPACK_IMPORTED_MODULE_6__.FaceNormals[face][2] + this.voxel.z);
        if (!voxelExists || !this.nVoxel.isRenderable())
            return true;
        let finalResult = false;
        let substanceRuleResult = _Rules_SubstanceRules_js__WEBPACK_IMPORTED_MODULE_3__.SubstanceRules.exposedCheck(this.voxel.getSubstance(), this.nVoxel.getSubstance());
        this.faceDataOverride.face = face;
        this.faceDataOverride.default = substanceRuleResult;
        finalResult = substanceRuleResult;
        this.faceDataOverride.default = finalResult;
        finalResult = _Rules_Overrides_OverridesManager_js__WEBPACK_IMPORTED_MODULE_2__.OverrideManager.runOverride("CullFace", this.voxel.getShapeId(), "Any", this.faceDataOverride);
        this.faceDataOverride.default = finalResult;
        finalResult = _Rules_Overrides_OverridesManager_js__WEBPACK_IMPORTED_MODULE_2__.OverrideManager.runOverride("CullFace", this.voxel.getShapeId(), this.nVoxel.getShapeId(), this.faceDataOverride);
        this.faceDataOverride.default = finalResult;
        finalResult = _Rules_Overrides_OverridesManager_js__WEBPACK_IMPORTED_MODULE_2__.OverrideManager.runOverride("CullFace", this.voxel.getStringId(), this.nVoxel.getShapeId(), this.faceDataOverride);
        return finalResult;
    }
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Tools/VoxelShapeTool.js":
/*!***************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Tools/VoxelShapeTool.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VoxelShapeTool": () => (/* binding */ VoxelShapeTool)
/* harmony export */ });
/* harmony import */ var _MeshBuilderTool_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MeshBuilderTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Tools/MeshBuilderTool.js");
/* harmony import */ var _Classes_VertexData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Classes/VertexData.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Classes/VertexData.js");
/* harmony import */ var _Tools_Shaders_VoxelShaderData_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Tools/Shaders/VoxelShaderData.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Shaders/VoxelShaderData.js");



const faceData = new _Tools_Shaders_VoxelShaderData_js__WEBPACK_IMPORTED_MODULE_2__.VoxelShaderDataTool();
class VoxelQuadBulder extends _MeshBuilderTool_js__WEBPACK_IMPORTED_MODULE_0__.QuadBuilderTool {
    constructor() {
        super();
        this.light._s = this;
        this.AO._s = this;
        this.overlayTexture._s = this;
        this.animationState._s = this;
    }
    _lightData = new _Classes_VertexData_js__WEBPACK_IMPORTED_MODULE_1__.QuadVertexData();
    _AOData = new _Classes_VertexData_js__WEBPACK_IMPORTED_MODULE_1__.QuadVertexData();
    _animationData = new _Classes_VertexData_js__WEBPACK_IMPORTED_MODULE_1__.QuadVertexData();
    clear() {
        this._cachedPosition.x = 0;
        this._cachedPosition.y = 0;
        this._cachedPosition.z = 0;
        this._fliped = false;
        this._dimension.width = 1;
        this._dimension.height = 1;
        this.textures.clear();
        for (let i = 1; i < 5; i++) {
            this._transform[i].x = 0;
            this._transform[i].y = 0;
            this._transform[i].z = 0;
        }
        return this;
    }
    create() {
        this.builder.create(this.tool, this._direction, this._position, this._dimension, this._fliped, this._transform);
        const attribute = this.tool.getAttribute("voxelData");
        attribute.push(faceData
            .setLight(this._lightData.getVertex(1))
            .setAO(this._AOData.getVertex(1))
            .setAnimation(this._animationData.getVertex(1))
            .getValue(), faceData
            .setLight(this._lightData.getVertex(2))
            .setAO(this._AOData.getVertex(2))
            .setAnimation(this._animationData.getVertex(2))
            .getValue(), faceData
            .setLight(this._lightData.getVertex(3))
            .setAO(this._AOData.getVertex(3))
            .setAnimation(this._animationData.getVertex(3))
            .getValue(), faceData
            .setLight(this._lightData.getVertex(4))
            .setAO(this._AOData.getVertex(4))
            .setAnimation(this._animationData.getVertex(4))
            .getValue());
        return this;
    }
    setFlipped(flipped) {
        this._fliped = flipped;
        this.textures.setFlipped(flipped);
        return this;
    }
    animationState = {
        _s: {},
        add(data) {
            this._s._animationData.setFromQuadData(data);
            return this._s;
        },
    };
    light = {
        _s: {},
        add(data) {
            this._s._lightData.setFromQuadData(data);
            return this._s;
        },
    };
    AO = {
        _s: {},
        add(data) {
            this._s._AOData.setFromQuadData(data);
            return this._s;
        },
    };
    textures = new _MeshBuilderTool_js__WEBPACK_IMPORTED_MODULE_0__.QuadUVTool(this, "cuv3");
    overlayTexture = {
        _s: {},
        add(data) {
            let i = 4;
            const attribute = this._s.tool.getAttribute("ocuv3");
            while (i--) {
                attribute.push(data.vetexes[1], data.vetexes[2], data.vetexes[3], data.vetexes[4]);
            }
            return this._s;
        },
    };
}
class VoxelShapeTool {
    quad = new VoxelQuadBulder();
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Types/Geometry.types.js":
/*!***************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Types/Geometry.types.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Types/Override.types.js":
/*!***************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Types/Override.types.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Types/ShapeBuilder.types.js":
/*!*******************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Types/ShapeBuilder.types.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Types/index.js":
/*!******************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Types/index.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Geometry_types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Geometry.types.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Types/Geometry.types.js");
/* harmony import */ var _Override_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Override.types.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Types/Override.types.js");
/* harmony import */ var _ShapeBuilder_types_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ShapeBuilder.types.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Types/ShapeBuilder.types.js");





/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/DivineVoxelEngineConstructor.js":
/*!***************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/DivineVoxelEngineConstructor.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DVEC": () => (/* binding */ DVEC)
/* harmony export */ });
/* harmony import */ var _Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Data/Settings/EngineSettings.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Settings/EngineSettings.js");
/* harmony import */ var _Global_Util_helper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Global/Util.helper.js */ "../../DSLIBS/divineVoxelEngine/dist/Global/Util.helper.js");
/* harmony import */ var _Builder_Builder_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Builder/Builder.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Builder.js");
/* harmony import */ var _Propagation_Propagation_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Propagation/Propagation.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Propagation.js");
/* harmony import */ var _WorldGeneration_WorldGeneration_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./WorldGeneration/WorldGeneration.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/WorldGeneration/WorldGeneration.js");
/* harmony import */ var _Analyzer_Analyzer_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Analyzer/Analyzer.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Analyzer/Analyzer.js");
/* harmony import */ var _Data_DataManager_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Data/DataManager.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/DataManager.js");
/* harmony import */ var _Data_DataSyncNode_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Data/DataSyncNode.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/DataSyncNode.js");
/* harmony import */ var _Builder_Constructors_Voxel_VoxelConstructors_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Builder/Constructors/Voxel/VoxelConstructors.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Constructors/Voxel/VoxelConstructors.js");
/* harmony import */ var threadcomm__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! threadcomm */ "../../DSLIBS/threadComm/dist/index.js");
/* harmony import */ var _Threads_ConstrcutorTheads_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Threads/ConstrcutorTheads.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Threads/ConstrcutorTheads.js");
/* harmony import */ var _Tasks_ConstructorTasks_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Tasks/ConstructorTasks.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Tasks/ConstructorTasks.js");
/* harmony import */ var _Init_InitWorker_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Init/InitWorker.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Init/InitWorker.js");
/* harmony import */ var _Hooks_ConstructorHooks_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Hooks/ConstructorHooks.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Hooks/ConstructorHooks.js");
/* harmony import */ var _Tools_Data_RichDataTool_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../Tools/Data/RichDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/RichDataTool.js");
/* harmony import */ var _Tasks_TasksRequest_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Tasks/TasksRequest.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Tasks/TasksRequest.js");
/* harmony import */ var _Tools_Data_DataTool_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../Tools/Data/DataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/DataTool.js");
//objects






//data



//threadcomm



//functions





const DVEC = {
    environment: "browser",
    UTIL: _Global_Util_helper_js__WEBPACK_IMPORTED_MODULE_1__.Util,
    settings: _Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_0__.EngineSettings,
    propagation: _Propagation_Propagation_js__WEBPACK_IMPORTED_MODULE_3__.Propagation,
    worldGen: _WorldGeneration_WorldGeneration_js__WEBPACK_IMPORTED_MODULE_4__.WorldGeneration,
    builder: _Builder_Builder_js__WEBPACK_IMPORTED_MODULE_2__.Builder,
    analyzer: _Analyzer_Analyzer_js__WEBPACK_IMPORTED_MODULE_5__.Analyzer,
    dataSyncNode: _Data_DataSyncNode_js__WEBPACK_IMPORTED_MODULE_7__.DataSyncNode,
    data: _Data_DataManager_js__WEBPACK_IMPORTED_MODULE_6__.DataManager,
    voxelManager: _Builder_Constructors_Voxel_VoxelConstructors_js__WEBPACK_IMPORTED_MODULE_8__.VoxelConstructors,
    TC: threadcomm__WEBPACK_IMPORTED_MODULE_9__.ThreadComm,
    parentComm: _Threads_ConstrcutorTheads_js__WEBPACK_IMPORTED_MODULE_10__.ParentComm,
    worldComm: _Threads_ConstrcutorTheads_js__WEBPACK_IMPORTED_MODULE_10__.WorldComm,
    tasks: _Tasks_ConstructorTasks_js__WEBPACK_IMPORTED_MODULE_11__.Tasks,
    hooks: _Hooks_ConstructorHooks_js__WEBPACK_IMPORTED_MODULE_13__.ConstructorHooks,
    requests: _Tasks_TasksRequest_js__WEBPACK_IMPORTED_MODULE_15__.TasksRequest,
    async $INIT() {
        await (0,_Init_InitWorker_js__WEBPACK_IMPORTED_MODULE_12__.InitWorker)(this);
    },
    getDataTool() {
        return new _Tools_Data_DataTool_js__WEBPACK_IMPORTED_MODULE_16__.DataTool();
    },
    getRichDataTool() {
        return new _Tools_Data_RichDataTool_js__WEBPACK_IMPORTED_MODULE_14__.RichDataTool();
    },
};
DVEC.environment = _Global_Util_helper_js__WEBPACK_IMPORTED_MODULE_1__.Util.getEnviorment();


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Hooks/ConstructorHooks.js":
/*!*********************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Hooks/ConstructorHooks.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConstructorHooks": () => (/* binding */ ConstructorHooks)
/* harmony export */ });
/* harmony import */ var divine_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! divine-hooks */ "../../DSLIBS/divineHooks/dist/index.js");

const ConstructorHooks = {
    texturesRegistered: divine_hooks__WEBPACK_IMPORTED_MODULE_0__.Hooks.getSyncHook(),
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Init/InitWorker.js":
/*!**************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Init/InitWorker.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InitWorker": () => (/* binding */ InitWorker)
/* harmony export */ });
/* harmony import */ var _Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Data/Settings/EngineSettings.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Settings/EngineSettings.js");
/* harmony import */ var _Threads_ConstructorThreadState_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Threads/ConstructorThreadState.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Threads/ConstructorThreadState.js");
/* harmony import */ var threadcomm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! threadcomm */ "../../DSLIBS/threadComm/dist/index.js");
/* harmony import */ var _Data_DataHooks_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Data/DataHooks.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/DataHooks.js");
/* harmony import */ var _Builder_Rules_SubstanceRules_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Builder/Rules/SubstanceRules.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Rules/SubstanceRules.js");





async function InitWorker(DVEC) {
    let parent = "render";
    if (DVEC.environment == "node") {
        parent = "server";
    }
    await threadcomm__WEBPACK_IMPORTED_MODULE_2__.ThreadComm.$INIT("constructor", parent);
    DVEC.builder.$INIT();
    threadcomm__WEBPACK_IMPORTED_MODULE_2__.ThreadComm.registerTasks("sync-settings", (settings) => {
        _Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_0__.EngineSettings.syncSettings(settings);
        _Threads_ConstructorThreadState_js__WEBPACK_IMPORTED_MODULE_1__.ConstructorThreadState._settingsSynced = true;
        _Data_DataHooks_js__WEBPACK_IMPORTED_MODULE_3__.DataHooks.settingsSynced.run(settings);
    });
    await DVEC.UTIL.createPromiseCheck({
        check: () => {
            return _Threads_ConstructorThreadState_js__WEBPACK_IMPORTED_MODULE_1__.ConstructorThreadState.isReady();
        },
        onReady() { },
        checkInterval: 1,
    });
    threadcomm__WEBPACK_IMPORTED_MODULE_2__.ThreadComm.registerTasks("ready", () => {
        _Builder_Rules_SubstanceRules_js__WEBPACK_IMPORTED_MODULE_4__.SubstanceRules.$BuildRules();
    });
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Explosion/ExplosionManager.js":
/*!*************************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Explosion/ExplosionManager.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExplosionManager": () => (/* binding */ ExplosionManager)
/* harmony export */ });
/* harmony import */ var _Math_Constants_CardinalNeighbors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Math/Constants/CardinalNeighbors.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Constants/CardinalNeighbors.js");
/* harmony import */ var _Tools_Data_DataTool_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Tools/Data/DataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/DataTool.js");
/* harmony import */ var _Data_Light_LightByte_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Data/Light/LightByte.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Light/LightByte.js");
/* harmony import */ var _Math_Functions_Distance3d_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Math/Functions/Distance3d.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Functions/Distance3d.js");
/* harmony import */ var _Illumanation_Functions_RGBUpdate_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Illumanation/Functions/RGBUpdate.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Illumanation/Functions/RGBUpdate.js");
/* harmony import */ var _Illumanation_Functions_SunUpdate_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Illumanation/Functions/SunUpdate.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Illumanation/Functions/SunUpdate.js");
/* harmony import */ var _Flow_FlowManager_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Flow/FlowManager.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Flow/FlowManager.js");
//data

//objects


//functions




const dataTool = new _Tools_Data_DataTool_js__WEBPACK_IMPORTED_MODULE_1__.DataTool();
const nDataTool = new _Tools_Data_DataTool_js__WEBPACK_IMPORTED_MODULE_1__.DataTool();
const ExplosionManager = {
    runExplosion(tasks) {
        tasks.start();
        const [dimension, sx, sy, sz] = tasks.origin;
        _Flow_FlowManager_js__WEBPACK_IMPORTED_MODULE_6__.FlowManager.setDimension(dimension);
        tasks.setPriority(0);
        const queue = tasks.queues.queue;
        const map = tasks.queues.map;
        queue.push([sx, sy, sz]);
        dataTool.setDimension(dimension);
        nDataTool.setDimension(dimension);
        const radius = tasks.getData();
        while (queue.length) {
            const node = queue.shift();
            if (!node)
                break;
            const x = node[0];
            const y = node[1];
            const z = node[2];
            if (!map.inMap(x + 1, y, z)) {
                if (dataTool.loadInAt(x + 1, y, z)) {
                    const d = (0,_Math_Functions_Distance3d_js__WEBPACK_IMPORTED_MODULE_3__.Distance3D)(sx, sy, sz, x + 1, y, z);
                    if (d <= radius) {
                        queue.push([x + 1, y, z]);
                    }
                    map.add(x + 1, y, z);
                }
            }
            if (!map.inMap(x - 1, y, z)) {
                if (dataTool.loadInAt(x - 1, y, z)) {
                    const d = (0,_Math_Functions_Distance3d_js__WEBPACK_IMPORTED_MODULE_3__.Distance3D)(sx, sy, sz, x - 1, y, z);
                    if (d <= radius) {
                        queue.push([x - 1, y, z]);
                    }
                }
                map.add(x - 1, y, z);
            }
            if (!map.inMap(x, y, z + 1)) {
                if (dataTool.loadInAt(x, y, z + 1)) {
                    const d = (0,_Math_Functions_Distance3d_js__WEBPACK_IMPORTED_MODULE_3__.Distance3D)(sx, sy, sz, x, y, z + 1);
                    if (d <= radius) {
                        queue.push([x, y, z + 1]);
                    }
                }
                map.add(x, y, z + 1);
            }
            if (!map.inMap(x, y, z - 1)) {
                if (dataTool.loadInAt(x, y, z - 1)) {
                    const d = (0,_Math_Functions_Distance3d_js__WEBPACK_IMPORTED_MODULE_3__.Distance3D)(sx, sy, sz, x, y, z - 1);
                    if (d <= radius) {
                        queue.push([x, y, z - 1]);
                    }
                }
                map.add(x, y, z - 1);
            }
            if (!map.inMap(x, y + 1, z)) {
                if (dataTool.loadInAt(x, y + 1, z)) {
                    const d = (0,_Math_Functions_Distance3d_js__WEBPACK_IMPORTED_MODULE_3__.Distance3D)(sx, sy, sz, x, y + 1, z);
                    if (d <= radius) {
                        queue.push([x, y + 1, z]);
                    }
                }
                map.add(x, y + 1, z);
            }
            if (!map.inMap(x, y - 1, z)) {
                if (dataTool.loadInAt(x, y - 1, z)) {
                    const d = (0,_Math_Functions_Distance3d_js__WEBPACK_IMPORTED_MODULE_3__.Distance3D)(sx, sy, sz, x, y - 1, z);
                    if (d <= radius) {
                        queue.push([x, y - 1, z]);
                    }
                }
                map.add(x, y - 1, z);
            }
            if (dataTool.loadInAt(x, y, z)) {
                if (dataTool.isRenderable()) {
                    for (const n of _Math_Constants_CardinalNeighbors_js__WEBPACK_IMPORTED_MODULE_0__.$3dCardinalNeighbors) {
                        const nx = x + n[0];
                        const ny = y + n[1];
                        const nz = z + n[2];
                        if (nDataTool.loadInAt(nx, ny, nz)) {
                            const l = nDataTool.getLight();
                            if (l > 0) {
                                if (_Data_Light_LightByte_js__WEBPACK_IMPORTED_MODULE_2__.LightData.getS(l) > 0) {
                                    tasks.queues.sun.remove.push(nx, ny, nz);
                                }
                                if (_Data_Light_LightByte_js__WEBPACK_IMPORTED_MODULE_2__.LightData.hasRGBLight(l)) {
                                    tasks.queues.rgb.remove.push(nx, ny, nz);
                                }
                            }
                        }
                    }
                    tasks.addNeighborsToRebuildQueue(x, y, z);
                    if (dataTool.getHardness() > 10_000 ||
                        dataTool.getSubstnaceData().isLiquid()) {
                        continue;
                    }
                    dataTool.setAir().commit(2);
                }
            }
        }
        (0,_Illumanation_Functions_RGBUpdate_js__WEBPACK_IMPORTED_MODULE_4__.RGBRemove)(tasks);
        (0,_Illumanation_Functions_SunUpdate_js__WEBPACK_IMPORTED_MODULE_5__.SunRemove)(tasks);
        (0,_Illumanation_Functions_RGBUpdate_js__WEBPACK_IMPORTED_MODULE_4__.RGBUpdate)(tasks);
        (0,_Illumanation_Functions_SunUpdate_js__WEBPACK_IMPORTED_MODULE_5__.SunUpdate)(tasks);
        tasks.runRebuildQueue();
        tasks.stop();
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Flow/FlowManager.js":
/*!***************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Flow/FlowManager.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FlowManager": () => (/* binding */ FlowManager)
/* harmony export */ });
/* harmony import */ var _Math_Constants_CardinalNeighbors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Math/Constants/CardinalNeighbors.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Constants/CardinalNeighbors.js");
/* harmony import */ var _Data_Light_LightByte_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Data/Light/LightByte.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Light/LightByte.js");
/* harmony import */ var _Tools_Data_DataTool_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Tools/Data/DataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/DataTool.js");
/* harmony import */ var _Tools_Brush_Brush_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Tools/Brush/Brush.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Brush/Brush.js");
/* harmony import */ var _Illumanation_Functions_SunUpdate_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Illumanation/Functions/SunUpdate.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Illumanation/Functions/SunUpdate.js");
/* harmony import */ var _Illumanation_Functions_RGBUpdate_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Illumanation/Functions/RGBUpdate.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Illumanation/Functions/RGBUpdate.js");
/* harmony import */ var _Illumanation_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Illumanation/IlluminationManager.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Illumanation/IlluminationManager.js");
/* harmony import */ var _Tools_Data_SubstanceDataTool_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../Tools/Data/SubstanceDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/SubstanceDataTool.js");








const FlowManager = {
    lightData: _Data_Light_LightByte_js__WEBPACK_IMPORTED_MODULE_1__.LightData,
    _brush: new _Tools_Brush_Brush_js__WEBPACK_IMPORTED_MODULE_3__.BrushTool(),
    _sDataTool: new _Tools_Data_DataTool_js__WEBPACK_IMPORTED_MODULE_2__.DataTool(),
    _nDataTool: new _Tools_Data_DataTool_js__WEBPACK_IMPORTED_MODULE_2__.DataTool(),
    _substanceTool: new _Tools_Data_SubstanceDataTool_js__WEBPACK_IMPORTED_MODULE_7__.SubstanceDataTool(),
    setVoxel(tasks, vox, level, levelState, x, y, z) {
        this.sunCheck(tasks, x, y, z);
        (0,_Illumanation_Functions_SunUpdate_js__WEBPACK_IMPORTED_MODULE_4__.SunRemove)(tasks);
        this._brush.setId(vox).setXYZ(x, y, z).paint();
        this._sDataTool.loadInAt(x, y, z);
        this._sDataTool
            .setLevel(level)
            .setLevelState(levelState)
            .setLight(this.getAbsorbLight(x, y, z))
            .commit();
        (0,_Illumanation_Functions_SunUpdate_js__WEBPACK_IMPORTED_MODULE_4__.SunUpdate)(tasks);
    },
    setDimension(dimension) {
        this._sDataTool.setDimension(dimension);
        this._nDataTool.setDimension(dimension);
        this._brush.setDimension(dimension);
        _Illumanation_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_6__.IlluminationManager.setDimension(dimension);
    },
    removeVoxel(tasks, x, y, z) {
        for (const n of _Math_Constants_CardinalNeighbors_js__WEBPACK_IMPORTED_MODULE_0__.$3dCardinalNeighbors) {
            const nx = x + n[0];
            const ny = y + n[1];
            const nz = z + n[2];
            if (!this._nDataTool.loadInAt(nx, ny, nz))
                continue;
            const l = this._nDataTool.getLight();
            if (l <= 0)
                continue;
            if (this.lightData.getS(l) > 0) {
                tasks.queues.sun.update.push(nx, ny, nz);
            }
            if (this.lightData.hasRGBLight(l)) {
                tasks.queues.rgb.update.push(nx, ny, nz);
            }
        }
        this._nDataTool.loadInAt(x, y, z);
        const currentLight = this._nDataTool.getLight();
        this._brush.setXYZ(x, y, z).erase();
        this._nDataTool.clear().loadInAt(x, y, z);
        this._nDataTool.setLight(currentLight).commit();
        tasks.queues.rgb.remove.push(x, y, z);
        (0,_Illumanation_Functions_RGBUpdate_js__WEBPACK_IMPORTED_MODULE_5__.RGBRemove)(tasks);
        (0,_Illumanation_Functions_SunUpdate_js__WEBPACK_IMPORTED_MODULE_4__.SunUpdate)(tasks);
        (0,_Illumanation_Functions_RGBUpdate_js__WEBPACK_IMPORTED_MODULE_5__.RGBUpdate)(tasks);
    },
    getFlowRate(substance) {
        this._substanceTool.setSubstance(substance);
        return this._substanceTool.getFlowRate();
    },
    getVoxel(x, y, z) {
        if (!this._sDataTool.loadInAt(x, y, z))
            return false;
        if (!this._sDataTool.isRenderable())
            return false;
        const substance = this._sDataTool.getSubstnaceData();
        if (!substance.isLiquid())
            return false;
        return this._sDataTool;
    },
    setLevel(level, x, y, z) {
        this._nDataTool.loadInAt(x, y, z);
        this._nDataTool.setLevel(level).commit();
    },
    getLevel(vox, x, y, z) {
        if (!this._nDataTool.loadInAt(x, y, z))
            return -2;
        const voxel = this._nDataTool.getStringId();
        if (this._nDataTool.isAir()) {
            return 0;
        }
        if (voxel == vox) {
            return this._nDataTool.getLevel();
        }
        return -1;
    },
    getLevelState(vox, x, y, z) {
        if (!this._nDataTool.loadInAt(x, y, z))
            return -2;
        const voxel = this._nDataTool.getStringId();
        if (voxel == vox) {
            return this._nDataTool.getLevelState();
        }
        if (this._nDataTool.isAir()) {
            return -1;
        }
        return -3;
    },
    canFlowOutwardTest(vox, x, y, z) {
        const level = this.getLevel(vox, x, y - 1, z);
        if (level == -1) {
            return true;
        }
        return false;
    },
    flowDownTest(vox, x, y, z) {
        const level = this.getLevel(vox, x, y - 1, z);
        if (level >= 0) {
            return true;
        }
        return false;
    },
    wait(ms) {
        return new Promise((resolve, reject) => setTimeout(resolve, ms));
    },
    _lightValues: [0, 0, 0, 0],
    getAbsorbLight(x, y, z) {
        for (const n of _Math_Constants_CardinalNeighbors_js__WEBPACK_IMPORTED_MODULE_0__.$3dCardinalNeighbors) {
            if (!n[0] && !n[1] && !n[2])
                continue;
            if (!this._nDataTool.loadInAt(x + n[0], y + n[1], z + n[2]))
                continue;
            let l = this._nDataTool.getLight();
            if (l <= 0)
                continue;
            const v = this.lightData.getLightValues(l);
            for (let i = 0; i < 4; i++) {
                if (this._lightValues[i] < v[i]) {
                    this._lightValues[i] = v[i];
                }
            }
        }
        let brightest = this.lightData.setLightValues(this._lightValues);
        for (let i = 0; i < 4; i++) {
            this._lightValues[i] = 0;
        }
        return this.lightData.minusOneForAll(brightest);
    },
    sunCheck(tasks, x, y, z) {
        if (!this._nDataTool.loadInAt(x, y - 1, z))
            return;
        if (!this._nDataTool.isAir())
            return;
        const l = this._nDataTool.getLight();
        if (this.lightData.getS(l) == 0xf) {
            tasks.queues.sun.remove.push(x, y - 1, z);
        }
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Flow/Functions/FlowRemove.js":
/*!************************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Flow/Functions/FlowRemove.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FlowRemove": () => (/* binding */ FlowRemove)
/* harmony export */ });
/* harmony import */ var _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../FlowManager.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Flow/FlowManager.js");
/* harmony import */ var _FlowUpdate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FlowUpdate.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Flow/Functions/FlowUpdate.js");
/* harmony import */ var _Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../Data/Settings/EngineSettings.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Settings/EngineSettings.js");



function RunRemoveCheck(tasks, vox) {
    const [dimension, x, y, z] = tasks.origin;
    const queue = tasks.queues.flow.remove.queue;
    const cl = _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.getLevel(vox, x, y, z);
    queue.push([x, y, z]);
    const n1 = _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.getLevel(vox, x + 1, y, z);
    const n1s = _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.getLevelState(vox, x + 1, y, z);
    if ((n1 > -1 && n1 < cl) || n1s == 1) {
        queue.push([x + 1, y, z]);
    }
    const n2 = _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.getLevel(vox, x - 1, y, z);
    const n2s = _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.getLevelState(vox, x - 1, y, z);
    if ((n2 > 0 && n2 < cl) || n2s == 1) {
        queue.push([x - 1, y, z]);
    }
    const n3 = _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.getLevel(vox, x, y, z + 1);
    const n3s = _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.getLevelState(vox, x, y, z + 1);
    if ((n3 > 0 && n3 < cl) || n3s == 1) {
        queue.push([x, y, z + 1]);
    }
    const n4 = _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.getLevel(vox, x, y, z - 1);
    const n4s = _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.getLevelState(vox, x, y, z - 1);
    if ((n4 > 0 && n4 < cl) || n4s == 1) {
        queue.push([x, y, z - 1]);
    }
}
async function FlowRemove(tasks) {
    const [dimension, x, y, z] = tasks.origin;
    const vox = _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.getVoxel(x, y, z);
    if (!vox)
        return;
    const voxId = vox.getStringId();
    const flowRate = vox.getSubstnaceData().getFlowRate();
    RunRemoveCheck(tasks, voxId);
    const noRemoveMap = tasks.queues.flow.remove.noRemoveMap;
    while (tasks.queues.flow.remove.queue.length != 0) {
        _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.setDimension(dimension);
        RunRemovePropagation(tasks, voxId);
        RunFlowReduce(tasks, voxId);
        await (0,_FlowUpdate_js__WEBPACK_IMPORTED_MODULE_1__.FlowUpdate)(tasks, false);
        noRemoveMap.clear();
        tasks.runRebuildQueue();
        await _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.wait(_Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_2__.EngineSettings.settings.flow.baseFlowLimit * flowRate);
    }
}
function RunRemovePropagation(tasks, vox) {
    const removeQ = tasks.queues.flow.remove.queue;
    const updateQ = tasks.queues.flow.update.queue;
    const map = tasks.queues.flow.update.map;
    const noRemoveMap = tasks.queues.flow.remove.noRemoveMap;
    for (let i = 0; i < removeQ.length; i++) {
        const node = removeQ[i];
        const x = node[0];
        const y = node[1];
        const z = node[2];
        const l = _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.getLevel(vox, x, y, z);
        const s = _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.getLevelState(vox, x, y, z);
        map.add(x, y, z);
        if (noRemoveMap.inMap(x, y, z))
            continue;
        n1t: if (!map.inMap(x + 1, y, z)) {
            const n1 = _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.getLevel(vox, x + 1, y, z);
            const n1s = _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.getLevelState(vox, x + 1, y, z);
            if (n1 <= 0 || n1s == 1)
                break n1t;
            if (n1 < l && l > 0 && n1 > 0) {
                removeQ.push([x + 1, y, z]);
            }
            if (n1 > l) {
                updateQ.push([x + 1, y, z]);
            }
        }
        n2t: if (!map.inMap(x - 1, y, z)) {
            const n2 = _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.getLevel(vox, x - 1, y, z);
            const n2s = _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.getLevelState(vox, x - 1, y, z);
            if (n2 <= 0 || n2s == 1)
                break n2t;
            if (n2 < l && l > 0 && n2 > 0) {
                removeQ.push([x - 1, y, z]);
            }
            if (n2 > l) {
                updateQ.push([x - 1, y, z]);
            }
        }
        n3t: if (!map.inMap(x, y, z + 1)) {
            const n3 = _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.getLevel(vox, x, y, z + 1);
            const n3s = _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.getLevelState(vox, x, y, z + 1);
            if (n3 <= 0 || n3s == 1)
                break n3t;
            if (n3 < l && l > 0 && n3 > 0) {
                removeQ.push([x, y, z + 1]);
            }
            if (n3 > l) {
                updateQ.push([x, y, z + 1]);
            }
        }
        n4t: if (!map.inMap(x, y, z - 1)) {
            const n4 = _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.getLevel(vox, x, y, z - 1);
            const n4s = _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.getLevelState(vox, x, y, z - 1);
            if (n4 <= 0 || n4s == 1)
                break n4t;
            if (n4 < l && l > 0 && n4 > 0) {
                removeQ.push([x, y, z - 1]);
            }
            if (n4 > l) {
                updateQ.push([x, y, z - 1]);
            }
        }
        if (!map.inMap(x, y - 1, z)) {
            const n5 = _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.getLevel(vox, x, y - 1, z);
            if (n5 < 0)
                continue;
            const n5s = _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.getLevelState(vox, x, y - 1, z);
            let add = false;
            if (s == 1 && n5s == 1) {
                if (l < 2) {
                    add = true;
                }
            }
            if (s == 0 && l < 2) {
                add = true;
            }
            if (add) {
                removeQ.push([x, y - 1, z]);
            }
        }
    }
    map.clear();
}
function RunFlowReduce(tasks, vox) {
    const queue = tasks.queues.flow.remove.queue;
    const map = tasks.queues.flow.remove.map;
    const reque = [];
    while (queue.length != 0) {
        const node = queue.shift();
        if (!node) {
            break;
        }
        const x = node[0];
        const y = node[1];
        const z = node[2];
        if (map.inMap(x, y, z))
            continue;
        map.add(x, y, z);
        const l = _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.getLevel(vox, x, y, z);
        const state = _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.getLevelState(vox, x, y, z);
        let syncRebuild = false;
        if (l <= 1) {
            _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.removeVoxel(tasks, x, y, z);
            if (state == 1)
                syncRebuild = true;
        }
        else {
            _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.setLevel(l - 1, x, y, z);
            reque.push([x, y, z]);
        }
        tasks.setBuldMode(syncRebuild ? "sync" : "async").addToRebuildQueue(x, y, z);
    }
    tasks.queues.flow.remove.queue = reque;
    map.clear();
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Flow/Functions/FlowUpdate.js":
/*!************************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Flow/Functions/FlowUpdate.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FlowUpdate": () => (/* binding */ FlowUpdate)
/* harmony export */ });
/* harmony import */ var _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../FlowManager.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Flow/FlowManager.js");
/* harmony import */ var _Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../Data/Settings/EngineSettings.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Settings/EngineSettings.js");


async function FlowUpdate(tasks, rebuild = true) {
    const [dimension, x, y, z] = tasks.origin;
    const vox = _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.getVoxel(x, y, z);
    if (!vox)
        return;
    const flowRate = vox.getSubstnaceData().getFlowRate();
    const level = _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.getLevel(vox.getStringId(), x, y, z);
    if (level < 0)
        return;
    const levelState = _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.getLevelState(vox.getStringId(), x, y, z);
    tasks.queues.flow.update.queue.push([x, y, z, level, levelState]);
    while (tasks.queues.flow.update.queue.length != 0) {
        _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.setDimension(dimension);
        RunFlowPropagation(tasks, vox.getStringId());
        RunFlowIncrease(tasks, vox.getStringId());
        if (rebuild) {
            tasks.runRebuildQueue();
            await _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.wait(_Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_1__.EngineSettings.settings.flow.baseFlowLimit * flowRate);
        }
    }
}
function RunFlowPropagation(tasks, vox) {
    const que = tasks.queues.flow.update.queue;
    const noRemoveMap = tasks.queues.flow.remove.noRemoveMap;
    for (let i = 0; i < que.length; i++) {
        const node = que[i];
        const x = node[0];
        const y = node[1];
        const z = node[2];
        const l = _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.getLevel(vox, x, y, z);
        const s = _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.getLevelState(vox, x, y, z);
        noRemoveMap.add(x, y, z);
        if (_FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.canFlowOutwardTest(vox, x, y, z)) {
            const n1 = _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.getLevel(vox, x + 1, y, z);
            if (n1 + 2 < l && n1 >= 0) {
                let n1l = l - 2;
                que.push([x + 1, y, z, n1l, 0]);
            }
            const n2 = _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.getLevel(vox, x - 1, y, z);
            if (n2 + 2 < l && n2 >= 0) {
                let n2l = l - 2;
                que.push([x - 1, y, z, n2l, 0]);
            }
            const n3 = _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.getLevel(vox, x, y, z + 1);
            if (n3 + 2 < l && n3 >= 0) {
                let n3l = l - 2;
                que.push([x, y, z + 1, n3l, 0]);
            }
            const n4 = _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.getLevel(vox, x, y, z - 1);
            if (n4 + 2 < l && n4 >= 0) {
                let n4l = l - 2;
                que.push([x, y, z - 1, n4l, 0]);
            }
        }
        const n5 = _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.getLevel(vox, x, y - 1, z);
        if (n5 <= l && n5 >= 0) {
            let state = 1;
            let level = 15;
            if (l <= 0 && s != 1) {
                state = 0;
                level = l - 2;
            }
            que.push([x, y - 1, z, level, state]);
        }
    }
}
function RunFlowIncrease(tasks, vox) {
    const que = tasks.queues.flow.update.queue;
    const map = tasks.queues.flow.update.map;
    const reque = [];
    while (que.length != 0) {
        const node = que.shift();
        if (!node) {
            break;
        }
        const x = node[0];
        const y = node[1];
        const z = node[2];
        const level = node[3];
        const levelState = node[4];
        if (map.inMap(x, y, z))
            continue;
        map.add(x, y, z);
        if (level > -1) {
            _FlowManager_js__WEBPACK_IMPORTED_MODULE_0__.FlowManager.setVoxel(tasks, vox, level, levelState, x, y, z);
            reque.push([x, y, z, -1]);
        }
        tasks.addToRebuildQueue(x, y, z);
    }
    //@ts-ignore
    tasks.queues.flow.update.queue = reque;
    map.clear();
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Illumanation/Functions/RGBUpdate.js":
/*!*******************************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Illumanation/Functions/RGBUpdate.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RGBRemove": () => (/* binding */ RGBRemove),
/* harmony export */   "RGBUpdate": () => (/* binding */ RGBUpdate)
/* harmony export */ });
/* harmony import */ var _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../IlluminationManager.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Illumanation/IlluminationManager.js");

function RGBUpdate(tasks) {
    _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.setDimension(tasks.origin[0]);
    const queue = tasks.queues.rgb.update;
    while (queue.length != 0) {
        const x = queue.shift();
        const y = queue.shift();
        const z = queue.shift();
        if (!_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._sDataTool.loadInAt(x, y, z))
            continue;
        if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._sDataTool.isBarrier())
            continue;
        const sl = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._sDataTool.getLight();
        if (sl <= 0)
            continue;
        if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.loadInAt(x - 1, y, z)) {
            const nl = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.getLight();
            if (nl > -1 && _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.isLessThanForRGBAdd(nl, sl)) {
                queue.push(x - 1, y, z);
                _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.setLight(_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.getMinusOneForRGB(sl, nl)).commit();
            }
        }
        if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.loadInAt(x + 1, y, z)) {
            const nl = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.getLight();
            if (nl > -1 && _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.isLessThanForRGBAdd(nl, sl)) {
                queue.push(x + 1, y, z);
                _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.setLight(_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.getMinusOneForRGB(sl, nl)).commit();
            }
        }
        if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.loadInAt(x, y, z - 1)) {
            const nl = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.getLight();
            if (nl > -1 && _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.isLessThanForRGBAdd(nl, sl)) {
                queue.push(x, y, z - 1);
                _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.setLight(_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.getMinusOneForRGB(sl, nl)).commit();
            }
        }
        if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.loadInAt(x, y, z + 1)) {
            const nl = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.getLight();
            if (nl > -1 && _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.isLessThanForRGBAdd(nl, sl)) {
                queue.push(x, y, z + 1);
                _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.setLight(_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.getMinusOneForRGB(sl, nl)).commit();
            }
        }
        if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.loadInAt(x, y - 1, z)) {
            const nl = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.getLight();
            if (nl > -1 && _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.isLessThanForRGBAdd(nl, sl)) {
                queue.push(x, y - 1, z);
                _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.setLight(_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.getMinusOneForRGB(sl, nl)).commit();
            }
        }
        if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.loadInAt(x, y + 1, z)) {
            const nl = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.getLight();
            if (nl > -1 && _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.isLessThanForRGBAdd(nl, sl)) {
                queue.push(x, y + 1, z);
                _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.setLight(_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.getMinusOneForRGB(sl, nl)).commit();
            }
        }
        tasks.addNeighborsToRebuildQueue(x, y, z);
    }
}
function RGBRemove(tasks) {
    _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.setDimension(tasks.origin[0]);
    const remove = tasks.queues.rgb.remove;
    const update = tasks.queues.rgb.update;
    const map = tasks.queues.rgb.map;
    while (remove.length != 0) {
        const x = remove.shift();
        const y = remove.shift();
        const z = remove.shift();
        if (map.inMap(x, y, z))
            continue;
        map.add(x, y, z);
        if (!_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._sDataTool.loadInAt(x, y, z))
            continue;
        const sl = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._sDataTool.getLight();
        if (sl <= 0)
            continue;
        if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.loadInAt(x - 1, y, z)) {
            const nl = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.getLight();
            const n1HasRGB = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.hasRGBLight(nl);
            if (n1HasRGB && _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.isLessThanForRGBRemove(nl, sl)) {
                remove.push(x - 1, y, z);
                if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.isLightSource()) {
                    update.push(x - 1, y, z);
                }
            }
            else {
                if (n1HasRGB && _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.isGreaterOrEqualThanForRGBRemove(nl, sl)) {
                    update.push(x - 1, y, z);
                }
            }
        }
        if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.loadInAt(x + 1, y, z)) {
            const nl = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.getLight();
            const n1HasRGB = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.hasRGBLight(nl);
            if (n1HasRGB && _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.isLessThanForRGBRemove(nl, sl)) {
                remove.push(x + 1, y, z);
                if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.isLightSource()) {
                    update.push(x + 1, y, z);
                }
            }
            else {
                if (n1HasRGB && _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.isGreaterOrEqualThanForRGBRemove(nl, sl)) {
                    update.push(x + 1, y, z);
                }
            }
        }
        if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.loadInAt(x, y, z - 1)) {
            const nl = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.getLight();
            const n1HasRGB = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.hasRGBLight(nl);
            if (n1HasRGB && _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.isLessThanForRGBRemove(nl, sl)) {
                remove.push(x, y, z - 1);
            }
            else {
                if (n1HasRGB && _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.isGreaterOrEqualThanForRGBRemove(nl, sl)) {
                    update.push(x, y, z - 1);
                }
            }
        }
        if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.loadInAt(x, y, z + 1)) {
            const nl = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.getLight();
            const n1HasRGB = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.hasRGBLight(nl);
            if (n1HasRGB && _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.isLessThanForRGBRemove(nl, sl)) {
                remove.push(x, y, z + 1);
                if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.isLightSource()) {
                    update.push(x, y, z + 1);
                }
            }
            else {
                if (n1HasRGB && _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.isGreaterOrEqualThanForRGBRemove(nl, sl)) {
                    update.push(x, y, z + 1);
                }
            }
        }
        if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.loadInAt(x, y - 1, z)) {
            const nl = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.getLight();
            const n1HasRGB = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.hasRGBLight(nl);
            if (n1HasRGB && _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.isLessThanForRGBRemove(nl, sl)) {
                remove.push(x, y - 1, z);
                if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.isLightSource()) {
                    update.push(x, y - 1, z);
                }
            }
            else {
                if (n1HasRGB && _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.isGreaterOrEqualThanForRGBRemove(nl, sl)) {
                    update.push(x, y - 1, z);
                }
            }
        }
        if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.loadInAt(x, y + 1, z)) {
            const nl = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.getLight();
            const n1HasRGB = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.hasRGBLight(nl);
            if (n1HasRGB && _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.isLessThanForRGBRemove(nl, sl)) {
                remove.push(x, y + 1, z);
                if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.isLightSource()) {
                    update.push(x, y + 1, z);
                }
            }
            else {
                if (n1HasRGB && _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.isGreaterOrEqualThanForRGBRemove(nl, sl)) {
                    update.push(x, y + 1, z);
                }
            }
        }
        tasks.addNeighborsToRebuildQueue(x, y, z);
        _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._sDataTool.setLight(_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.removeRGBLight(sl)).commit();
    }
    map.clear();
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Illumanation/Functions/SunUpdate.js":
/*!*******************************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Illumanation/Functions/SunUpdate.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SunRemove": () => (/* binding */ SunRemove),
/* harmony export */   "SunUpdate": () => (/* binding */ SunUpdate)
/* harmony export */ });
/* harmony import */ var _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../IlluminationManager.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Illumanation/IlluminationManager.js");

function SunUpdate(tasks) {
    const update = tasks.queues.sun.update;
    while (update.length > 0) {
        const x = update.shift();
        const y = update.shift();
        const z = update.shift();
        if (!_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._sDataTool.loadInAt(x, y, z))
            continue;
        const sl = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._sDataTool.getLight();
        if (sl <= 0)
            continue;
        if (!_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.getS(sl))
            continue;
        if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.loadInAt(x - 1, y, z)) {
            const nl = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.getLight();
            if (nl > -1 && _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.isLessThanForSunAdd(nl, sl)) {
                update.push(x - 1, y, z);
                _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.setLight(_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.getMinusOneForSun(sl, nl)).commit();
            }
        }
        if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.loadInAt(x + 1, y, z)) {
            const nl = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.getLight();
            if (nl > -1 && _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.isLessThanForSunAdd(nl, sl)) {
                update.push(x + 1, y, z);
                _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.setLight(_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.getMinusOneForSun(sl, nl)).commit();
            }
        }
        if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.loadInAt(x, y, z - 1)) {
            const nl = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.getLight();
            if (nl > -1 && _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.isLessThanForSunAdd(nl, sl)) {
                update.push(x, y, z - 1);
                _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.setLight(_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.getMinusOneForSun(sl, nl)).commit();
            }
        }
        if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.loadInAt(x, y, z + 1)) {
            const nl = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.getLight();
            if (nl > -1 && _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.isLessThanForSunAdd(nl, sl)) {
                update.push(x, y, z + 1);
                _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.setLight(_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.getMinusOneForSun(sl, nl)).commit();
            }
        }
        if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.loadInAt(x, y - 1, z)) {
            const nl = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.getLight();
            if (nl > -1 && _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.isLessThanForSunAddDown(nl, sl)) {
                if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.isAir()) {
                    update.push(x, y - 1, z);
                    _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.setLight(_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.getSunLightForUnderVoxel(sl, nl))
                        .commit();
                }
                else {
                    const substance = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.getSubstance();
                    if (substance != "#dve_magma" && substance != "#dve_solid") {
                        update.push(x, y - 1, z);
                        _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.setLight(_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.getMinusOneForSun(sl, nl)).commit();
                    }
                }
            }
        }
        if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.loadInAt(x, y + 1, z)) {
            const nl = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.getLight();
            if (nl > -1 && _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.isLessThanForSunAdd(nl, sl)) {
                update.push(x, y + 1, z);
                _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.setLight(_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.getMinusOneForSun(sl, nl)).commit();
            }
        }
        tasks.addNeighborsToRebuildQueue(x, y, z);
    }
}
function SunRemove(tasks, clearUpdateMap = true) {
    const remove = tasks.queues.sun.remove;
    const update = tasks.queues.sun.update;
    const removeMap = tasks.queues.sun.remvoeMap;
    const updateMap = tasks.queues.sun.updateMap;
    while (remove.length != 0) {
        const x = remove.shift();
        const y = remove.shift();
        const z = remove.shift();
        if (removeMap.inMap(x, y, z))
            continue;
        removeMap.add(x, y, z);
        if (!_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._sDataTool.loadInAt(x, y, z))
            continue;
        const sl = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._sDataTool.getLight();
        if (sl <= 0)
            continue;
        if (!_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.getS(sl))
            continue;
        if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.loadInAt(x - 1, y, z)) {
            const nl = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.getLight();
            if (nl > 0) {
                if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.isLessThanForSunRemove(nl, sl)) {
                    remove.push(x - 1, y, z);
                }
                else {
                    if (!updateMap.inMap(x - 1, y, z) &&
                        _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.isGreaterOrEqualThanForSunRemove(nl, sl)) {
                        update.push(x - 1, y, z);
                        updateMap.add(x - 1, y, z);
                    }
                }
            }
        }
        if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.loadInAt(x + 1, y, z)) {
            const nl = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.getLight();
            if (nl > 0) {
                if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.isLessThanForSunRemove(nl, sl)) {
                    remove.push(x + 1, y, z);
                }
                else {
                    if (!updateMap.inMap(x + 1, y, z) &&
                        _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.isGreaterOrEqualThanForSunRemove(nl, sl)) {
                        update.push(x + 1, y, z);
                        updateMap.add(x + 1, y, z);
                    }
                }
            }
        }
        if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.loadInAt(x, y, z - 1)) {
            const nl = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.getLight();
            if (nl > 0) {
                if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.isLessThanForSunRemove(nl, sl)) {
                    remove.push(x, y, z - 1);
                }
                else {
                    if (!updateMap.inMap(x, y, z - 1) &&
                        _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.isGreaterOrEqualThanForSunRemove(nl, sl)) {
                        update.push(x, y, z - 1);
                        updateMap.add(x, y, z - 1);
                    }
                }
            }
        }
        if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.loadInAt(x, y, z + 1)) {
            const nl = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.getLight();
            if (nl > 0) {
                if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.isLessThanForSunRemove(nl, sl)) {
                    remove.push(x, y, z + 1);
                }
                else {
                    if (!updateMap.inMap(x, y, z + 1) &&
                        _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.isGreaterOrEqualThanForSunRemove(nl, sl)) {
                        update.push(x, y, z + 1);
                        updateMap.add(x, y, z + 1);
                    }
                }
            }
        }
        if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.loadInAt(x, y - 1, z)) {
            const nl = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.getLight();
            if (nl > 0) {
                if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.sunLightCompareForDownSunRemove(nl, sl)) {
                    remove.push(x, y - 1, z);
                }
                else {
                    if (!updateMap.inMap(x, y - 1, z) &&
                        _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.isGreaterOrEqualThanForSunRemove(nl, sl)) {
                        update.push(x, y - 1, z);
                        updateMap.add(x, y - 1, z);
                    }
                }
            }
        }
        if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.loadInAt(x, y + 1, z)) {
            const n6 = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._nDataTool.getLight();
            if (n6 > 0) {
                if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.isLessThanForSunRemove(n6, sl)) {
                    remove.push(x, y + 1, z);
                }
                else {
                    if (!updateMap.inMap(x, y - 1, z) &&
                        _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.isGreaterOrEqualThanForSunRemove(n6, sl)) {
                        update.push(x, y + 1, z);
                        updateMap.add(x, y + 1, z);
                    }
                }
            }
        }
        tasks.addNeighborsToRebuildQueue(x, y, z);
        _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager._sDataTool.setLight(_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_0__.IlluminationManager.lightData.removeSunLight(sl)).commit();
    }
    if (clearUpdateMap)
        updateMap.clear();
    removeMap.clear();
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Illumanation/Functions/WorldSun.js":
/*!******************************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Illumanation/Functions/WorldSun.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RunWorldSun": () => (/* binding */ RunWorldSun)
/* harmony export */ });
/* harmony import */ var _Data_World_WorldBounds_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../Data/World/WorldBounds.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldBounds.js");
/* harmony import */ var _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../Data/World/WorldRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldRegister.js");
/* harmony import */ var _Math_Constants_CardinalNeighbors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../Math/Constants/CardinalNeighbors.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Constants/CardinalNeighbors.js");
/* harmony import */ var _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../Data/World/WorldSpaces.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldSpaces.js");
/* harmony import */ var _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../IlluminationManager.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Illumanation/IlluminationManager.js");
/* harmony import */ var _Tools_Data_WorldData_HeightMapTool_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../Tools/Data/WorldData/HeightMapTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/WorldData/HeightMapTool.js");
//data






const inColumnBounds = (cx, cz, x, z) => {
    if (x >= cx &&
        x <= cx + _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_3__.WorldSpaces.chunk._bounds.x &&
        z >= cz &&
        z <= cz + _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_3__.WorldSpaces.chunk._bounds.z)
        return true;
    return false;
};
const heightMapTool = new _Tools_Data_WorldData_HeightMapTool_js__WEBPACK_IMPORTED_MODULE_5__.HeightMapTool();
function RunWorldSun(tasks) {
    _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager.setDimension(tasks.origin[0]);
    tasks.start();
    if (!_Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_1__.WorldRegister.column.get(tasks.origin))
        return false;
    const [dimension, cx, cy, cz] = tasks.origin;
    const queue = tasks.queues.sun;
    _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager._sDataTool.setDimension(dimension);
    const RmaxY = heightMapTool.column.getRelative(tasks.origin);
    const AmaxY = heightMapTool.column.getAbsolute(tasks.origin);
    //fill
    for (let iy = AmaxY; iy < _Data_World_WorldBounds_js__WEBPACK_IMPORTED_MODULE_0__.WorldBounds.bounds.MaxY; iy++) {
        for (let iz = cz; iz < cz + _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_3__.WorldSpaces.chunk._bounds.z; iz++) {
            for (let ix = cx; ix < cx + _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_3__.WorldSpaces.chunk._bounds.x; ix++) {
                if (!_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager._sDataTool.loadInAt(ix, iy, iz))
                    continue;
                const l = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager._sDataTool.getLight();
                if (l < 0)
                    continue;
                _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager._sDataTool.setLight(_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager.lightData.setS(0xf, l)).commit();
            }
        }
    }
    //accumulate
    for (let iy = AmaxY; iy <= RmaxY; iy++) {
        for (let iz = cz; iz < cz + _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_3__.WorldSpaces.chunk._bounds.z; iz++) {
            for (let ix = cx; ix < cx + _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_3__.WorldSpaces.chunk._bounds.x; ix++) {
                if (!_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager._sDataTool.loadInAt(ix, iy, iz))
                    continue;
                const l = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager._sDataTool.getLight();
                if (l < 0 && _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager.lightData.getS(l) != 0xf)
                    continue;
                let add = false;
                for (const n of _Math_Constants_CardinalNeighbors_js__WEBPACK_IMPORTED_MODULE_2__.$3dCardinalNeighbors) {
                    const nx = ix + n[0];
                    const ny = iy + n[1];
                    const nz = iz + n[2];
                    if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager._nDataTool.loadInAt(nx, ny, nz)) {
                        const nl = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager._nDataTool.getLight();
                        if (nl >= 0 && _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager.lightData.getS(nl) < 0xf) {
                            add = true;
                            break;
                        }
                    }
                }
                if (add) {
                    queue.push(ix, iy, iz);
                }
            }
        }
    }
    //flood
    while (queue.length) {
        const x = queue.shift();
        const y = queue.shift();
        const z = queue.shift();
        if (!_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager._sDataTool.loadInAt(x, y, z))
            continue;
        const sl = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager._sDataTool.getLight();
        if (sl <= 0)
            continue;
        const sunL = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager.lightData.getS(sl);
        if (sunL >= 0xf && !inColumnBounds(cx, cz, x, z))
            continue;
        if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager._nDataTool.loadInAt(x - 1, y, z)) {
            const nl = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager._nDataTool.getLight();
            if (nl > -1 && _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager.lightData.isLessThanForSunAdd(nl, sl)) {
                queue.push(x - 1, y, z);
                _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager._nDataTool.setLight(_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager.lightData.getMinusOneForSun(sl, nl)).commit();
            }
        }
        if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager._nDataTool.loadInAt(x + 1, y, z)) {
            const nl = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager._nDataTool.getLight();
            if (nl > -1 && _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager.lightData.isLessThanForSunAdd(nl, sl)) {
                queue.push(x + 1, y, z);
                _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager._nDataTool.setLight(_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager.lightData.getMinusOneForSun(sl, nl)).commit();
            }
        }
        if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager._nDataTool.loadInAt(x, y, z - 1)) {
            const nl = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager._nDataTool.getLight();
            if (nl > -1 && _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager.lightData.isLessThanForSunAdd(nl, sl)) {
                queue.push(x, y, z - 1);
                _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager._nDataTool.setLight(_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager.lightData.getMinusOneForSun(sl, nl)).commit();
            }
        }
        if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager._nDataTool.loadInAt(x, y, z + 1)) {
            const nl = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager._nDataTool.getLight();
            if (nl > -1 && _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager.lightData.isLessThanForSunAdd(nl, sl)) {
                queue.push(x, y, z + 1);
                _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager._nDataTool.setLight(_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager.lightData.getMinusOneForSun(sl, nl)).commit();
            }
        }
        if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager._nDataTool.loadInAt(x, y - 1, z)) {
            const nl = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager._nDataTool.getLight();
            if (nl > -1 && _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager.lightData.isLessThanForSunAddDown(nl, sl)) {
                if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager._nDataTool.isAir()) {
                    queue.push(x, y - 1, z);
                    _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager._nDataTool.setLight(_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager.lightData.getSunLightForUnderVoxel(sl, nl))
                        .commit();
                }
                else {
                    const substance = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager._nDataTool.getSubstance();
                    if (substance != "#dve_magma" && substance != "#dve_solid") {
                        queue.push(x, y - 1, z);
                        _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager._nDataTool.setLight(_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager.lightData.getMinusOneForSun(sl, nl)).commit();
                    }
                }
            }
        }
        if (_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager._nDataTool.loadInAt(x, y + 1, z)) {
            const nl = _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager._nDataTool.getLight();
            if (nl > -1 && _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager.lightData.isLessThanForSunAdd(nl, sl)) {
                queue.push(x, y + 1, z);
                _IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager._nDataTool.setLight(_IlluminationManager_js__WEBPACK_IMPORTED_MODULE_4__.IlluminationManager.lightData.getMinusOneForSun(sl, nl)).commit();
            }
        }
    }
    tasks.stop();
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Illumanation/IlluminationManager.js":
/*!*******************************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Illumanation/IlluminationManager.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IlluminationManager": () => (/* binding */ IlluminationManager)
/* harmony export */ });
/* harmony import */ var _Tools_Data_DataTool_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Tools/Data/DataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/DataTool.js");
/* harmony import */ var _Data_Light_LightByte_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Data/Light/LightByte.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Light/LightByte.js");
//functions


const IlluminationManager = {
    lightData: _Data_Light_LightByte_js__WEBPACK_IMPORTED_MODULE_1__.LightData,
    //tools
    _sDataTool: new _Tools_Data_DataTool_js__WEBPACK_IMPORTED_MODULE_0__.DataTool(),
    _nDataTool: new _Tools_Data_DataTool_js__WEBPACK_IMPORTED_MODULE_0__.DataTool(),
    setDimension(dimension) {
        this._sDataTool.setDimension(dimension);
        this._nDataTool.setDimension(dimension);
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Propagation.js":
/*!**********************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Propagation.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Propagation": () => (/* binding */ Propagation)
/* harmony export */ });
/* harmony import */ var _Illumanation_Functions_RGBUpdate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Illumanation/Functions/RGBUpdate.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Illumanation/Functions/RGBUpdate.js");
/* harmony import */ var _Illumanation_Functions_SunUpdate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Illumanation/Functions/SunUpdate.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Illumanation/Functions/SunUpdate.js");
/* harmony import */ var _Illumanation_Functions_WorldSun_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Illumanation/Functions/WorldSun.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Illumanation/Functions/WorldSun.js");
/* harmony import */ var _Flow_Functions_FlowUpdate_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Flow/Functions/FlowUpdate.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Flow/Functions/FlowUpdate.js");
/* harmony import */ var _Flow_Functions_FlowRemove_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Flow/Functions/FlowRemove.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Flow/Functions/FlowRemove.js");
/* harmony import */ var _Explosion_ExplosionManager_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Explosion/ExplosionManager.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Explosion/ExplosionManager.js");






const Propagation = {
    expolosion: {
        run(tasks) {
            _Explosion_ExplosionManager_js__WEBPACK_IMPORTED_MODULE_5__.ExplosionManager.runExplosion(tasks);
        },
    },
    flow: {
        async update(tasks) {
            await (0,_Flow_Functions_FlowUpdate_js__WEBPACK_IMPORTED_MODULE_3__.FlowUpdate)(tasks);
        },
        async remove(tasks) {
            await (0,_Flow_Functions_FlowRemove_js__WEBPACK_IMPORTED_MODULE_4__.FlowRemove)(tasks);
        },
    },
    worldSun: {
        run(tasks) {
            (0,_Illumanation_Functions_WorldSun_js__WEBPACK_IMPORTED_MODULE_2__.RunWorldSun)(tasks);
        },
    },
    rgb: {
        update(tasks) {
            (0,_Illumanation_Functions_RGBUpdate_js__WEBPACK_IMPORTED_MODULE_0__.RGBUpdate)(tasks);
        },
        remove(tasks) {
            (0,_Illumanation_Functions_RGBUpdate_js__WEBPACK_IMPORTED_MODULE_0__.RGBRemove)(tasks);
        },
    },
    sun: {
        update(tasks) {
            (0,_Illumanation_Functions_SunUpdate_js__WEBPACK_IMPORTED_MODULE_1__.SunUpdate)(tasks);
        },
        remove(tasks) {
            (0,_Illumanation_Functions_SunUpdate_js__WEBPACK_IMPORTED_MODULE_1__.SunRemove)(tasks);
        },
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Tasks/ConstructorTasks.js":
/*!*********************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Tasks/ConstructorTasks.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Tasks": () => (/* binding */ Tasks)
/* harmony export */ });
/* harmony import */ var _Common_Threads_Contracts_ConstructorTasks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Common/Threads/Contracts/ConstructorTasks.js */ "../../DSLIBS/divineVoxelEngine/dist/Common/Threads/Contracts/ConstructorTasks.js");
/* harmony import */ var _DivineVoxelEngineConstructor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DivineVoxelEngineConstructor.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/DivineVoxelEngineConstructor.js");
/* harmony import */ var threadcomm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! threadcomm */ "../../DSLIBS/threadComm/dist/index.js");
/* harmony import */ var _Functions_VoxelUpdate_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Functions/VoxelUpdate.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Tasks/Functions/VoxelUpdate.js");
/* harmony import */ var _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Data/World/WorldRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldRegister.js");
/* harmony import */ var _Tools_Data_WorldData_ChunkDataTool_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Tools/Data/WorldData/ChunkDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/WorldData/ChunkDataTool.js");
/* harmony import */ var _TasksRequest_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./TasksRequest.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Tasks/TasksRequest.js");







const chunkTool = new _Tools_Data_WorldData_ChunkDataTool_js__WEBPACK_IMPORTED_MODULE_5__.ChunkDataTool();
const Tasks = {
    data: {
        syncTextures: threadcomm__WEBPACK_IMPORTED_MODULE_2__.ThreadComm.registerTasks("sync-texuture-index", (data) => {
            _DivineVoxelEngineConstructor_js__WEBPACK_IMPORTED_MODULE_1__.DVEC.builder.textureManager.setTextureIndex(data);
            _DivineVoxelEngineConstructor_js__WEBPACK_IMPORTED_MODULE_1__.DVEC.hooks.texturesRegistered.run(_DivineVoxelEngineConstructor_js__WEBPACK_IMPORTED_MODULE_1__.DVEC.builder.textureManager);
        }),
    },
    build: {
        nodeMesh: threadcomm__WEBPACK_IMPORTED_MODULE_2__.ThreadComm.registerTasks("build-node-mesh", (data, onDone) => {
            const nodeData = _DivineVoxelEngineConstructor_js__WEBPACK_IMPORTED_MODULE_1__.DVEC.builder.nodes.buildNode(data);
            if (!nodeData)
                return onDone ? onDone(false) : 0;
            onDone ? onDone(nodeData[0], nodeData[1]) : 0;
        }, "deferred"),
        chunk: {
            tasks: threadcomm__WEBPACK_IMPORTED_MODULE_2__.ThreadComm.registerTasks(_Common_Threads_Contracts_ConstructorTasks_js__WEBPACK_IMPORTED_MODULE_0__.ConstructorTasks.buildChunk, async (buildData, onDone) => {
                const location = buildData.data[0];
                await _DivineVoxelEngineConstructor_js__WEBPACK_IMPORTED_MODULE_1__.DVEC.builder.buildChunk(location, buildData.data[1]);
                if (onDone)
                    onDone();
            }),
        },
        column: threadcomm__WEBPACK_IMPORTED_MODULE_2__.ThreadComm.registerTasks(_Common_Threads_Contracts_ConstructorTasks_js__WEBPACK_IMPORTED_MODULE_0__.ConstructorTasks.buildColumn, async (data, onDone) => {
            const column = _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_4__.WorldRegister.column.get(data[0]);
            if (!column)
                return false;
            if (column.chunks.size == 0)
                return false;
            let totalChunks = 0;
            const location = data[0];
            for (const [key, chunk] of column.chunks) {
                chunkTool.setChunk(chunk);
                const chunkPOS = chunkTool.getPositionData();
                location[1] = chunkPOS.x;
                location[2] = chunkPOS.y;
                location[3] = chunkPOS.z;
                totalChunks++;
                _DivineVoxelEngineConstructor_js__WEBPACK_IMPORTED_MODULE_1__.DVEC.builder.buildChunk([...location]);
            }
            if (onDone)
                onDone();
        }, "deferred"),
    },
    voxelUpdate: {
        update: threadcomm__WEBPACK_IMPORTED_MODULE_2__.ThreadComm.registerTasks(_Common_Threads_Contracts_ConstructorTasks_js__WEBPACK_IMPORTED_MODULE_0__.ConstructorTasks.voxelUpdate, async (data, onDone) => {
            await (0,_Functions_VoxelUpdate_js__WEBPACK_IMPORTED_MODULE_3__.VoxelUpdate)(data);
            if (onDone)
                onDone();
        }, "deferred"),
        erase: threadcomm__WEBPACK_IMPORTED_MODULE_2__.ThreadComm.registerTasks(_Common_Threads_Contracts_ConstructorTasks_js__WEBPACK_IMPORTED_MODULE_0__.ConstructorTasks.voxelErease, async (data, onDone) => {
            await (0,_Functions_VoxelUpdate_js__WEBPACK_IMPORTED_MODULE_3__.EreaseAndUpdate)(data);
            if (onDone)
                onDone();
        }, "deferred"),
        paint: threadcomm__WEBPACK_IMPORTED_MODULE_2__.ThreadComm.registerTasks(_Common_Threads_Contracts_ConstructorTasks_js__WEBPACK_IMPORTED_MODULE_0__.ConstructorTasks.voxelPaint, async (data, onDone) => {
            await (0,_Functions_VoxelUpdate_js__WEBPACK_IMPORTED_MODULE_3__.PaintAndUpdate)(data);
            if (onDone)
                onDone();
        }, "deferred"),
    },
    explosion: threadcomm__WEBPACK_IMPORTED_MODULE_2__.ThreadComm.registerTasks(_Common_Threads_Contracts_ConstructorTasks_js__WEBPACK_IMPORTED_MODULE_0__.ConstructorTasks.explosion, async (data) => {
        await _DivineVoxelEngineConstructor_js__WEBPACK_IMPORTED_MODULE_1__.DVEC.propagation.expolosion.run(_TasksRequest_js__WEBPACK_IMPORTED_MODULE_6__.TasksRequest.getExplosionRequests(data[0], data[1], data[2], data[3]));
    }),
    worldSun: threadcomm__WEBPACK_IMPORTED_MODULE_2__.ThreadComm.registerTasks(_Common_Threads_Contracts_ConstructorTasks_js__WEBPACK_IMPORTED_MODULE_0__.ConstructorTasks.worldSun, (data, onDone) => {
        _DivineVoxelEngineConstructor_js__WEBPACK_IMPORTED_MODULE_1__.DVEC.propagation.worldSun.run(_TasksRequest_js__WEBPACK_IMPORTED_MODULE_6__.TasksRequest.getWorldSunRequests(data[0], data[1]));
        if (onDone)
            onDone();
    }, "deferred"),
    worldGen: {
        generate: threadcomm__WEBPACK_IMPORTED_MODULE_2__.ThreadComm.registerTasks(_Common_Threads_Contracts_ConstructorTasks_js__WEBPACK_IMPORTED_MODULE_0__.ConstructorTasks.generate, (data, onDone) => {
            if (!onDone)
                return;
            _DivineVoxelEngineConstructor_js__WEBPACK_IMPORTED_MODULE_1__.DVEC.worldGen.generate(data, "generate", onDone);
        }, "deferred"),
        decorate: threadcomm__WEBPACK_IMPORTED_MODULE_2__.ThreadComm.registerTasks(_Common_Threads_Contracts_ConstructorTasks_js__WEBPACK_IMPORTED_MODULE_0__.ConstructorTasks.decorate, (data, onDone) => {
            if (!onDone)
                return;
            _DivineVoxelEngineConstructor_js__WEBPACK_IMPORTED_MODULE_1__.DVEC.worldGen.generate(data, "decorate", onDone);
        }, "deferred"),
    },
    anaylzer: {
        propagation: threadcomm__WEBPACK_IMPORTED_MODULE_2__.ThreadComm.registerTasks(_Common_Threads_Contracts_ConstructorTasks_js__WEBPACK_IMPORTED_MODULE_0__.ConstructorTasks.analyzerPropagation, async (data, onDone) => {
            await _DivineVoxelEngineConstructor_js__WEBPACK_IMPORTED_MODULE_1__.DVEC.analyzer.runPropagation(data);
            if (onDone)
                onDone();
        }, "deferred"),
        update: threadcomm__WEBPACK_IMPORTED_MODULE_2__.ThreadComm.registerTasks(_Common_Threads_Contracts_ConstructorTasks_js__WEBPACK_IMPORTED_MODULE_0__.ConstructorTasks.analyzerUpdate, async (data, onDone) => {
            await _DivineVoxelEngineConstructor_js__WEBPACK_IMPORTED_MODULE_1__.DVEC.analyzer.runUpdate(data);
            if (onDone)
                onDone();
        }, "deferred"),
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Tasks/Functions/VoxelUpdate.js":
/*!**************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Tasks/Functions/VoxelUpdate.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EreaseAndUpdate": () => (/* binding */ EreaseAndUpdate),
/* harmony export */   "PaintAndUpdate": () => (/* binding */ PaintAndUpdate),
/* harmony export */   "VoxelUpdate": () => (/* binding */ VoxelUpdate)
/* harmony export */ });
/* harmony import */ var _Propagation_Propagation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Propagation/Propagation.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Propagation.js");
/* harmony import */ var _Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Data/Settings/EngineSettings.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Settings/EngineSettings.js");
/* harmony import */ var _Tools_Data_DataTool_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Tools/Data/DataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/DataTool.js");
/* harmony import */ var _Math_Constants_CardinalNeighbors_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Math/Constants/CardinalNeighbors.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Constants/CardinalNeighbors.js");
/* harmony import */ var _Tools_Brush_Brush_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../Tools/Brush/Brush.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Brush/Brush.js");
/* harmony import */ var _TasksRequest_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../TasksRequest.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Tasks/TasksRequest.js");






const dataTool = new _Tools_Data_DataTool_js__WEBPACK_IMPORTED_MODULE_2__.DataTool();
const nDataTool = new _Tools_Data_DataTool_js__WEBPACK_IMPORTED_MODULE_2__.DataTool();
const brushTool = new _Tools_Brush_Brush_js__WEBPACK_IMPORTED_MODULE_4__.BrushTool();
brushTool._update = false;
const updateLightTask = (tasks) => {
    let doRGB = _Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_1__.EngineSettings.doRGBPropagation();
    let doSun = _Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_1__.EngineSettings.doSunPropagation();
    const [dimension, x, y, z] = tasks.origin;
    nDataTool.setDimension(dimension);
    for (const n of _Math_Constants_CardinalNeighbors_js__WEBPACK_IMPORTED_MODULE_3__.$3dCardinalNeighbors) {
        const nx = n[0] + x;
        const ny = n[1] + y;
        const nz = n[2] + z;
        if (!nDataTool.loadInAt(nx, ny, nz))
            continue;
        if (doRGB) {
            if (nDataTool.hasRGBLight()) {
                tasks.queues.rgb.update.push(nx, ny, nz);
            }
        }
        if (doSun) {
            if (nDataTool.hasSunLight()) {
                tasks.queues.sun.update.push(nx, ny, nz);
            }
        }
    }
};
async function EreaseAndUpdate(data) {
    if (!dataTool.setLocation(data[0]).loadIn())
        return false;
    const [dimension, x, y, z] = data[0];
    const tasks = _TasksRequest_js__WEBPACK_IMPORTED_MODULE_5__.TasksRequest.getVoxelUpdateRequests(data[0], data[1], data[2]);
    tasks.setPriority(0).start().setBuldMode("sync").addToRebuildQueue(x, y, z);
    tasks.setBuldMode("async").addNeighborsToRebuildQueue(x, y, z);
    if (_Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_1__.EngineSettings.doFlow()) {
        if (dataTool.getSubstnaceData().isLiquid()) {
            await _Propagation_Propagation_js__WEBPACK_IMPORTED_MODULE_0__.Propagation.flow.remove(tasks);
            tasks.stop();
            return true;
        }
    }
    const light = dataTool.getLight();
    const isLightSource = dataTool.isLightSource();
    dataTool
        .setLight(light > 0 ? light : 0)
        .setAir()
        .commit(2);
    if (_Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_1__.EngineSettings.doLight()) {
        if (_Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_1__.EngineSettings.doRGBPropagation() && isLightSource) {
            tasks.queues.rgb.remove.push(x, y, z);
            _Propagation_Propagation_js__WEBPACK_IMPORTED_MODULE_0__.Propagation.rgb.remove(tasks);
        }
        updateLightTask(tasks);
        if (_Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_1__.EngineSettings.doRGBPropagation()) {
            _Propagation_Propagation_js__WEBPACK_IMPORTED_MODULE_0__.Propagation.rgb.update(tasks);
        }
        if (_Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_1__.EngineSettings.doSunPropagation()) {
            _Propagation_Propagation_js__WEBPACK_IMPORTED_MODULE_0__.Propagation.sun.update(tasks);
        }
    }
    // LocationDataDistanceSort(tasks.origin, tasks.syncQueue);
    tasks.runRebuildQueue();
    tasks.stop();
    return true;
}
async function PaintAndUpdate(data) {
    if (!dataTool.setLocation(data[0]).loadIn())
        return false;
    const [dimension, x, y, z] = data[0];
    const raw = data[1];
    const tasks = _TasksRequest_js__WEBPACK_IMPORTED_MODULE_5__.TasksRequest.getVoxelUpdateRequests(data[0], data[2], data[3]);
    tasks.start().setPriority(0).setBuldMode("sync").addToRebuildQueue(x, y, z);
    tasks.setBuldMode("async").addNeighborsToRebuildQueue(x, y, z);
    brushTool.setLocation(data[0]).setRaw(raw);
    nDataTool.loadInRaw(raw);
    const substanceData = nDataTool.getSubstnaceData();
    const isOpaque = nDataTool.isOpaque();
    let doRGB = _Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_1__.EngineSettings.doRGBPropagation();
    let doSun = _Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_1__.EngineSettings.doSunPropagation();
    lighttest: if (_Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_1__.EngineSettings.doLight()) {
        const light = dataTool.getLight();
        if (light <= 0)
            break lighttest;
        if (doSun) {
            if (dataTool.hasSunLight()) {
                tasks.queues.sun.remove.push(x, y, z);
                _Propagation_Propagation_js__WEBPACK_IMPORTED_MODULE_0__.Propagation.sun.remove(tasks);
            }
        }
        if (doRGB) {
            if (dataTool.hasRGBLight() && isOpaque) {
                tasks.queues.rgb.remove.push(x, y, z);
                _Propagation_Propagation_js__WEBPACK_IMPORTED_MODULE_0__.Propagation.rgb.remove(tasks);
            }
        }
    }
    brushTool.paint();
    if (_Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_1__.EngineSettings.doLight()) {
        updateLightTask(tasks);
        if (doRGB) {
            tasks.queues.rgb.update.push(x, y, z);
            _Propagation_Propagation_js__WEBPACK_IMPORTED_MODULE_0__.Propagation.rgb.update(tasks);
        }
        if (doSun) {
            _Propagation_Propagation_js__WEBPACK_IMPORTED_MODULE_0__.Propagation.sun.update(tasks);
        }
    }
    if (_Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_1__.EngineSettings.doFlow()) {
        if (substanceData.isLiquid()) {
            _Propagation_Propagation_js__WEBPACK_IMPORTED_MODULE_0__.Propagation.flow.update(tasks);
        }
    }
    tasks.runRebuildQueue();
    tasks.stop();
    return;
}
async function VoxelUpdate(data) {
    if (!dataTool.setLocation(data[0]).loadIn())
        return false;
    const [dimension, x, y, z] = data[0];
    const tasks = _TasksRequest_js__WEBPACK_IMPORTED_MODULE_5__.TasksRequest.getVoxelUpdateRequests(data[0], data[2], data[3]);
    tasks.setPriority(0).start().setBuldMode("sync").addToRebuildQueue(x, y, z);
    tasks.setBuldMode("async").addNeighborsToRebuildQueue(x, y, z);
    dataTool.loadInRaw(data[1]);
    dataTool.commit();
    let doRGB = _Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_1__.EngineSettings.doRGBPropagation();
    let doSun = _Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_1__.EngineSettings.doSunPropagation();
    if (_Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_1__.EngineSettings.doLight()) {
        updateLightTask(tasks);
        if (doRGB) {
            tasks.queues.rgb.update.push(x, y, z);
            _Propagation_Propagation_js__WEBPACK_IMPORTED_MODULE_0__.Propagation.rgb.update(tasks);
        }
        if (doSun) {
            _Propagation_Propagation_js__WEBPACK_IMPORTED_MODULE_0__.Propagation.sun.update(tasks);
        }
    }
    if (_Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_1__.EngineSettings.doFlow()) {
        if (dataTool.getSubstnaceData().isLiquid()) {
            _Propagation_Propagation_js__WEBPACK_IMPORTED_MODULE_0__.Propagation.flow.update(tasks);
        }
    }
    tasks.runRebuildQueue();
    tasks.stop();
    return;
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Tasks/TasksRequest.js":
/*!*****************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Tasks/TasksRequest.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TasksRequest": () => (/* binding */ TasksRequest)
/* harmony export */ });
/* harmony import */ var _Common_Threads_Contracts_ConstructorRemoteThreadTasks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Common/Threads/Contracts/ConstructorRemoteThreadTasks.js */ "../../DSLIBS/divineVoxelEngine/dist/Common/Threads/Contracts/ConstructorRemoteThreadTasks.js");
/* harmony import */ var _Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Data/Settings/EngineSettings.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Settings/EngineSettings.js");
/* harmony import */ var threadcomm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! threadcomm */ "../../DSLIBS/threadComm/dist/index.js");
/* harmony import */ var _Math_Constants_CardinalNeighbors_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Math/Constants/CardinalNeighbors.js */ "../../DSLIBS/divineVoxelEngine/dist/Math/Constants/CardinalNeighbors.js");
/* harmony import */ var _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Data/World/WorldSpaces.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldSpaces.js");
/* harmony import */ var _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Data/World/WorldRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldRegister.js");
/* harmony import */ var _Constructor_Builder_Builder_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Constructor/Builder/Builder.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Builder.js");
/* harmony import */ var _Tools_Data_WorldData_ChunkDataTool_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../Tools/Data/WorldData/ChunkDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/WorldData/ChunkDataTool.js");
/* harmony import */ var _Global_Util_VisistedMap_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../Global/Util/VisistedMap.js */ "../../DSLIBS/divineVoxelEngine/dist/Global/Util/VisistedMap.js");









const chunkTool = new _Tools_Data_WorldData_ChunkDataTool_js__WEBPACK_IMPORTED_MODULE_7__.ChunkDataTool();
class Request {
    tasksType;
    origin;
    data;
    buildQueue;
    originThread;
    queues;
    rebuildQueMap = new Map();
    comm;
    priority = 2;
    LOD = 0;
    syncQueue = [];
    aSyncQueue = [];
    buildMode = "sync";
    buildTasks = {
        data: [["main", 0, 0, 0], 1],
        priority: 0,
    };
    rebuildTasks;
    constructor(tasksType, origin, data, buildQueue = "none", originThread = "self", queues) {
        this.tasksType = tasksType;
        this.origin = origin;
        this.data = data;
        this.buildQueue = buildQueue;
        this.originThread = originThread;
        this.queues = queues;
        if (originThread != "self") {
            this.comm = threadcomm__WEBPACK_IMPORTED_MODULE_2__.ThreadComm.getComm(originThread);
        }
        this.rebuildTasks = [this.origin, this.buildQueue, this.priority];
        return this;
    }
    start() {
        _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_5__.WorldRegister.cache.enable();
        return this;
    }
    stop() {
        _Data_World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_5__.WorldRegister.cache.disable();
        return this;
    }
    setPriority(priority) {
        this.priority = priority;
        return this;
    }
    getData() {
        return this.data;
    }
    getOriginThread() {
        return this.origin;
    }
    getBuildQueue() {
        return this.buildQueue;
    }
    getOrigin() {
        return this.origin;
    }
    needsRebuild() {
        return this.buildQueue != "none";
    }
    needsToUpdateOriginThread() {
        return this.originThread != "self";
    }
    setBuldMode(mode) {
        this.buildMode = mode;
        return this;
    }
    addToRebuildQueue(x, y, z) {
        if (_Data_Settings_EngineSettings_js__WEBPACK_IMPORTED_MODULE_1__.EngineSettings.isServer())
            return false;
        if (!this.needsRebuild())
            return false;
        if (!chunkTool.setDimension(this.origin[0]).loadInAt(x, y, z))
            return false;
        const chunkKey = _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_4__.WorldSpaces.chunk.getKeyLocation(chunkTool.location);
        if (this.rebuildQueMap.has(chunkKey))
            return false;
        this.rebuildQueMap.set(chunkKey, true);
        if (this.buildMode == "async") {
            this.aSyncQueue.push([...chunkTool.location]);
            return true;
        }
        this.syncQueue.push([...chunkTool.location]);
        return true;
    }
    addNeighborsToRebuildQueue(x, y, z) {
        if (!this.needsRebuild())
            return false;
        const voxelPOS = _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_4__.WorldSpaces.voxel.getPositionXYZ(x, y, z);
        if (voxelPOS.x == 0 ||
            voxelPOS.x == _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_4__.WorldSpaces.chunk._bounds.x - 1 ||
            voxelPOS.y == 0 ||
            voxelPOS.y == _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_4__.WorldSpaces.chunk._bounds.y - 1 ||
            voxelPOS.z == 0 ||
            voxelPOS.z == _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_4__.WorldSpaces.chunk._bounds.z - 1) {
            let i = _Math_Constants_CardinalNeighbors_js__WEBPACK_IMPORTED_MODULE_3__.$3dMooreNeighborhood.length;
            while (i--) {
                this.addToRebuildQueue(x + _Math_Constants_CardinalNeighbors_js__WEBPACK_IMPORTED_MODULE_3__.$3dMooreNeighborhood[i][0], y + _Math_Constants_CardinalNeighbors_js__WEBPACK_IMPORTED_MODULE_3__.$3dMooreNeighborhood[i][1], z + _Math_Constants_CardinalNeighbors_js__WEBPACK_IMPORTED_MODULE_3__.$3dMooreNeighborhood[i][2]);
            }
            return;
        }
        this.addToRebuildQueue(x, y, z);
        return this;
    }
    runRebuildQueue() {
        while (this.aSyncQueue.length !== 0) {
            const node = this.aSyncQueue.shift();
            this.buildTasks.priority = this.priority;
            if (!node)
                break;
            this.buildTasks.data[0] = node;
            this.comm.runTasks(_Common_Threads_Contracts_ConstructorRemoteThreadTasks_js__WEBPACK_IMPORTED_MODULE_0__.ConstructorRemoteThreadTasks.buildChunk, this.buildTasks);
        }
        while (this.syncQueue.length !== 0) {
            const node = this.syncQueue.shift();
            if (!node)
                break;
            _Constructor_Builder_Builder_js__WEBPACK_IMPORTED_MODULE_6__.Builder.buildChunk(node);
        }
        this.rebuildQueMap.clear();
        return this;
    }
    clear() {
        this.buildTasks.priority = 0;
        this.syncQueue = [];
        this.aSyncQueue = [];
        this.rebuildQueMap.clear();
        this.buildMode = "sync";
    }
}
const getLightQueues = () => {
    return {
        rgb: {
            update: [],
            remove: [],
            map: new _Global_Util_VisistedMap_js__WEBPACK_IMPORTED_MODULE_8__.VisitedMap(),
        },
        sun: {
            update: [],
            remove: [],
            updateMap: new _Global_Util_VisistedMap_js__WEBPACK_IMPORTED_MODULE_8__.VisitedMap(),
            remvoeMap: new _Global_Util_VisistedMap_js__WEBPACK_IMPORTED_MODULE_8__.VisitedMap(),
        },
    };
};
const getFlowQueues = () => {
    return {
        update: {
            queue: [],
            map: new _Global_Util_VisistedMap_js__WEBPACK_IMPORTED_MODULE_8__.VisitedMap(),
        },
        remove: {
            queue: [],
            map: new _Global_Util_VisistedMap_js__WEBPACK_IMPORTED_MODULE_8__.VisitedMap(),
            noRemoveMap: new _Global_Util_VisistedMap_js__WEBPACK_IMPORTED_MODULE_8__.VisitedMap(),
        },
    };
};
const getVoxelUpdateQueueData = () => {
    return { ...getLightQueues(), flow: getFlowQueues() };
};
const getExplosionQueuesData = () => {
    return {
        queue: [],
        map: new _Global_Util_VisistedMap_js__WEBPACK_IMPORTED_MODULE_8__.VisitedMap(),
        ...getLightQueues(),
        flow: getFlowQueues(),
    };
};
const TasksRequest = {
    getLightUpdateRequest(origin, buildQueue = "none", originThread = "self") {
        return new Request("light-update", origin, null, buildQueue, originThread, getLightQueues());
    },
    getFlowUpdateRequest(origin, buildQueue = "none", originThread = "self") {
        return new Request("flow-update", origin, null, buildQueue, originThread, getVoxelUpdateQueueData());
    },
    getVoxelUpdateRequests(origin, buildQueue = "none", originThread = "self") {
        return new Request("voxel-update", origin, null, buildQueue, originThread, getVoxelUpdateQueueData());
    },
    getWorldSunRequests(origin, buildQueue = "none", originThread = "self") {
        return new Request("world-sun", origin, null, buildQueue, originThread, {
            sun: [],
        });
    },
    getExplosionRequests(origin, radius, buildQueue = "none", originThread = "self") {
        return new Request("voxel-update", origin, radius, buildQueue, originThread, getExplosionQueuesData());
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Threads/ConstrcutorTheads.js":
/*!************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Threads/ConstrcutorTheads.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ParentComm": () => (/* binding */ ParentComm),
/* harmony export */   "RichWorldComm": () => (/* binding */ RichWorldComm),
/* harmony export */   "WorldComm": () => (/* binding */ WorldComm)
/* harmony export */ });
/* harmony import */ var threadcomm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! threadcomm */ "../../DSLIBS/threadComm/dist/index.js");

const ParentComm = threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.parent;
const RichWorldComm = threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.createComm("rich-world");
const WorldComm = threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.createComm("world");


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Threads/ConstructorThreadState.js":
/*!*****************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Threads/ConstructorThreadState.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConstructorThreadState": () => (/* binding */ ConstructorThreadState)
/* harmony export */ });
/* harmony import */ var _Global_Util_helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Global/Util.helper.js */ "../../DSLIBS/divineVoxelEngine/dist/Global/Util.helper.js");
/* harmony import */ var _ConstrcutorTheads_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ConstrcutorTheads.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Threads/ConstrcutorTheads.js");


const ConstructorThreadState = {
    _settingsSynced: false,
    environment: _Global_Util_helper_js__WEBPACK_IMPORTED_MODULE_0__.Util.getEnviorment(),
    isReady() {
        if (this.environment == "node") {
            return _ConstrcutorTheads_js__WEBPACK_IMPORTED_MODULE_1__.WorldComm.isPortSet() && this._settingsSynced;
        }
        else {
            return (_ConstrcutorTheads_js__WEBPACK_IMPORTED_MODULE_1__.WorldComm.isPortSet() &&
                this._settingsSynced);
        }
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Tools/WorldGenBrush.js":
/*!******************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/Tools/WorldGenBrush.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WorldGenBrush": () => (/* binding */ WorldGenBrush)
/* harmony export */ });
/* harmony import */ var _WorldGeneration_Register_WorldGenRegister_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../WorldGeneration/Register/WorldGenRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/WorldGeneration/Register/WorldGenRegister.js");
/* harmony import */ var _Tools_Brush_Brush_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Tools/Brush/Brush.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Brush/Brush.js");
/* harmony import */ var _Data_World_WorldPainter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Data/World/WorldPainter.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldPainter.js");
/* harmony import */ var _Tasks_TasksRequest_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Tasks/TasksRequest.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Tasks/TasksRequest.js");
/* harmony import */ var _Data_Light_LightByte_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Data/Light/LightByte.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Light/LightByte.js");
/* harmony import */ var _Propagation_Propagation_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Propagation/Propagation.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Propagation.js");
/* harmony import */ var _Threads_ConstrcutorTheads_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Threads/ConstrcutorTheads.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Threads/ConstrcutorTheads.js");
/* harmony import */ var _Tools_Data_RichDataTool_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../Tools/Data/RichDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/RichDataTool.js");
/* harmony import */ var _Propagation_Illumanation_Functions_SunUpdate_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Propagation/Illumanation/Functions/SunUpdate.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Propagation/Illumanation/Functions/SunUpdate.js");









class WorldGenBrush extends _Tools_Brush_Brush_js__WEBPACK_IMPORTED_MODULE_1__.BrushTool {
    constructor() {
        super();
    }
    requestsId;
    tasks = _Tasks_TasksRequest_js__WEBPACK_IMPORTED_MODULE_3__.TasksRequest.getVoxelUpdateRequests(this.location);
    richData = new _Tools_Data_RichDataTool_js__WEBPACK_IMPORTED_MODULE_7__.RichDataTool();
    paint() {
        if (!this._dt.loadInAtLocation(this.location) && this.requestsId != "") {
            _WorldGeneration_Register_WorldGenRegister_js__WEBPACK_IMPORTED_MODULE_0__.WorldGenRegister.addToRequest(this.requestsId, this.location, [
                ...this.getRaw(),
            ]);
            return this;
        }
        const sl = this._dt.getLight();
        if (_Data_Light_LightByte_js__WEBPACK_IMPORTED_MODULE_4__.LightData.hasRGBLight(sl)) {
            this.tasks.queues.rgb.remove.push(this.x, this.y, this.z);
            _Propagation_Propagation_js__WEBPACK_IMPORTED_MODULE_5__.Propagation.rgb.remove(this.tasks);
        }
        if (_Data_Light_LightByte_js__WEBPACK_IMPORTED_MODULE_4__.LightData.hasSunLight(sl)) {
            this.tasks.queues.sun.remove.push(this.x, this.y, this.z);
            (0,_Propagation_Illumanation_Functions_SunUpdate_js__WEBPACK_IMPORTED_MODULE_8__.SunRemove)(this.tasks, false);
        }
        _Data_World_WorldPainter_js__WEBPACK_IMPORTED_MODULE_2__.WorldPainter.paint.voxel(this.location, this.data);
        return this;
    }
    erease() {
        const sl = this._dt.getLight();
        this._dt
            .setAir()
            .setLight(sl > 0 ? sl : 0)
            .commit(2);
        if (_Data_Light_LightByte_js__WEBPACK_IMPORTED_MODULE_4__.LightData.hasRGBLight(sl)) {
            this.tasks.queues.rgb.remove.push(this.x, this.y, this.z);
            _Propagation_Propagation_js__WEBPACK_IMPORTED_MODULE_5__.Propagation.rgb.remove(this.tasks);
        }
        if (_Data_Light_LightByte_js__WEBPACK_IMPORTED_MODULE_4__.LightData.hasSunLight(sl)) {
            this.tasks.queues.sun.remove.push(this.x, this.y, this.z);
            (0,_Propagation_Illumanation_Functions_SunUpdate_js__WEBPACK_IMPORTED_MODULE_8__.SunRemove)(this.tasks, false);
        }
        _Data_World_WorldPainter_js__WEBPACK_IMPORTED_MODULE_2__.WorldPainter.paint.erase(this.location);
    }
    runUpdates() {
        _Propagation_Propagation_js__WEBPACK_IMPORTED_MODULE_5__.Propagation.rgb.update(this.tasks);
        (0,_Propagation_Illumanation_Functions_SunUpdate_js__WEBPACK_IMPORTED_MODULE_8__.SunUpdate)(this.tasks);
        this.tasks.queues.sun.updateMap.clear();
    }
    worldAlloc(start, end) {
        return new Promise((resolve) => {
            _Threads_ConstrcutorTheads_js__WEBPACK_IMPORTED_MODULE_6__.WorldComm.runPromiseTasks("world-alloc", [this.dimension, start, end], [], () => {
                resolve(true);
            });
        });
    }
    worldDealloc(start, end) {
        return new Promise((resolve) => {
            _Threads_ConstrcutorTheads_js__WEBPACK_IMPORTED_MODULE_6__.WorldComm.runPromiseTasks("world-dealloc", [this.dimension, start, end], [], () => {
                resolve(true);
            });
        });
    }
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/WorldGeneration/Register/WorldGenRegister.js":
/*!****************************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/WorldGeneration/Register/WorldGenRegister.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WorldGenRegister": () => (/* binding */ WorldGenRegister)
/* harmony export */ });
/* harmony import */ var _Tools_Brush_Brush_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Tools/Brush/Brush.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Brush/Brush.js");
/* harmony import */ var _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Data/World/WorldSpaces.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldSpaces.js");
/* harmony import */ var _Tools_Data_WorldData_ChunkDataTool_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Tools/Data/WorldData/ChunkDataTool.js */ "../../DSLIBS/divineVoxelEngine/dist/Tools/Data/WorldData/ChunkDataTool.js");
/* harmony import */ var _Threads_ConstrcutorTheads_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Threads/ConstrcutorTheads.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Threads/ConstrcutorTheads.js");




const brush = new _Tools_Brush_Brush_js__WEBPACK_IMPORTED_MODULE_0__.BrushTool();
const dataTool = brush._dt;
const chunkTool = new _Tools_Data_WorldData_ChunkDataTool_js__WEBPACK_IMPORTED_MODULE_2__.ChunkDataTool();
const WorldGenRegister = {
    MAX_ATTEMPTS: 100,
    _requests: new Map(),
    registerRequest(location) {
        const id = location.toString();
        this._requests.set(id, {
            attempts: 0,
            chunks: new Map(),
            dimension: location[0],
            voxels: [],
        });
        return id;
    },
    addToRequest(registerId, location, rawData) {
        const requests = this._requests.get(registerId);
        if (!requests)
            return;
        const chunkPOS = _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_1__.WorldSpaces.chunk.getPositionLocation(location);
        const chunkKey = _Data_World_WorldSpaces_js__WEBPACK_IMPORTED_MODULE_1__.WorldSpaces.chunk.getKeyLocation(location);
        if (!chunkTool.loadInAtLocation(location)) {
            if (!requests.chunks.has(chunkKey)) {
                _Threads_ConstrcutorTheads_js__WEBPACK_IMPORTED_MODULE_3__.WorldComm.runTasks("add-chunk", [
                    requests.dimension,
                    chunkPOS.x,
                    chunkPOS.y,
                    chunkPOS.z,
                ]);
                requests.chunks.set(chunkKey, [chunkPOS.x, chunkPOS.y, chunkPOS.z]);
            }
        }
        const [dim, x, y, z] = location;
        requests.voxels.push([x, y, z, rawData]);
    },
    attemptRequestFullFill(registerId) {
        const requests = this._requests.get(registerId);
        if (!requests || !requests.voxels.length)
            return true;
        chunkTool.setDimension(requests.dimension);
        let done = true;
        for (const [key, pos] of requests.chunks) {
            if (!chunkTool.loadInAt(pos[0], pos[1], pos[2])) {
                done = false;
                _Threads_ConstrcutorTheads_js__WEBPACK_IMPORTED_MODULE_3__.WorldComm.runTasks("add-chunk", [
                    requests.dimension,
                    pos[0],
                    pos[1],
                    pos[2],
                ]);
            }
        }
        if (!done) {
            requests.attempts++;
            if (requests.attempts >= this.MAX_ATTEMPTS) {
                console.error(`World gen requests cancled after max attempts`, requests);
                this._requests.delete(registerId);
                return true;
            }
            return false;
        }
        brush.setDimension(requests.dimension);
        dataTool.setDimension(requests.dimension);
        const voxels = requests.voxels;
        brush.start();
        while (voxels.length) {
            const data = voxels.shift();
            if (!data)
                break;
            dataTool.loadInAt(data[0], data[1], data[2]);
            brush.setXYZ(data[0], data[1], data[2]).setRaw(data[3]).paint();
        }
        brush.stop();
        this._requests.delete(registerId);
        return true;
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/WorldGeneration/WorldGeneration.js":
/*!******************************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/WorldGeneration/WorldGeneration.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WorldGeneration": () => (/* binding */ WorldGeneration)
/* harmony export */ });
/* harmony import */ var _Data_World_WorldBounds_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Data/World/WorldBounds.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldBounds.js");
/* harmony import */ var _Register_WorldGenRegister_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Register/WorldGenRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/WorldGeneration/Register/WorldGenRegister.js");
/* harmony import */ var _Tools_WorldGenBrush_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Tools/WorldGenBrush.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Tools/WorldGenBrush.js");
/* harmony import */ var _Global_Util_SafeInterval_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Global/Util/SafeInterval.js */ "../../DSLIBS/divineVoxelEngine/dist/Global/Util/SafeInterval.js");
//objects


//tools


const WorldGeneration = {
    worldGen: null,
    register: _Register_WorldGenRegister_js__WEBPACK_IMPORTED_MODULE_1__.WorldGenRegister,
    worldBounds: _Data_World_WorldBounds_js__WEBPACK_IMPORTED_MODULE_0__.WorldBounds,
    _brushes: [],
    setWorldGen(worldGen) {
        this.worldGen = worldGen;
    },
    async generate(data, mode, onDone) {
        if (!this.worldGen) {
            throw new Error(`A World Generator must be set.`);
        }
        const requestsId = _Register_WorldGenRegister_js__WEBPACK_IMPORTED_MODULE_1__.WorldGenRegister.registerRequest(data[0]);
        for (const brush of this._brushes) {
            brush.requestsId = requestsId;
        }
        if (mode == "generate") {
            await this.worldGen.generate(data);
        }
        if (mode == "decorate") {
            await this.worldGen.decorate(data);
        }
        const inte = new _Global_Util_SafeInterval_js__WEBPACK_IMPORTED_MODULE_3__.SafeInterval().setInterval(100).setOnRun(() => {
            if (_Register_WorldGenRegister_js__WEBPACK_IMPORTED_MODULE_1__.WorldGenRegister.attemptRequestFullFill(requestsId)) {
                onDone();
                inte.stop();
            }
        });
        inte.start();
    },
    getBrush() {
        const brush = new _Tools_WorldGenBrush_js__WEBPACK_IMPORTED_MODULE_2__.WorldGenBrush();
        this._brushes.push(brush);
        return brush;
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Constructor/index.js":
/*!****************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Constructor/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Analyzer": () => (/* reexport safe */ _Analyzer_Analyzer_js__WEBPACK_IMPORTED_MODULE_1__.Analyzer),
/* harmony export */   "BoxVoxelShape": () => (/* reexport safe */ _Builder_Shapes_default_index_js__WEBPACK_IMPORTED_MODULE_5__.BoxVoxelShape),
/* harmony export */   "CrossedPanels": () => (/* reexport safe */ _Builder_Shapes_default_index_js__WEBPACK_IMPORTED_MODULE_5__.CrossedPanels),
/* harmony export */   "DVEC": () => (/* reexport safe */ _DivineVoxelEngineConstructor_js__WEBPACK_IMPORTED_MODULE_0__.DVEC),
/* harmony export */   "HalfBoxVoxelShape": () => (/* reexport safe */ _Builder_Shapes_default_index_js__WEBPACK_IMPORTED_MODULE_5__.HalfBoxVoxelShape),
/* harmony export */   "LiquidVoxelShape": () => (/* reexport safe */ _Builder_Shapes_default_index_js__WEBPACK_IMPORTED_MODULE_5__.LiquidVoxelShape),
/* harmony export */   "PanelVoxelShape": () => (/* reexport safe */ _Builder_Shapes_default_index_js__WEBPACK_IMPORTED_MODULE_5__.PanelVoxelShape),
/* harmony export */   "StairBuilderData": () => (/* reexport safe */ _Builder_Shapes_default_index_js__WEBPACK_IMPORTED_MODULE_5__.StairBuilderData),
/* harmony export */   "StairVoxelShape": () => (/* reexport safe */ _Builder_Shapes_default_index_js__WEBPACK_IMPORTED_MODULE_5__.StairVoxelShape),
/* harmony export */   "VoxelConstructor": () => (/* reexport safe */ _Builder_Constructors_Voxel_Classes_VoxelConstructor_js__WEBPACK_IMPORTED_MODULE_6__.VoxelConstructor),
/* harmony export */   "WorldGenBrush": () => (/* reexport safe */ _Tools_WorldGenBrush_js__WEBPACK_IMPORTED_MODULE_3__.WorldGenBrush),
/* harmony export */   "WorldGeneration": () => (/* reexport safe */ _WorldGeneration_WorldGeneration_js__WEBPACK_IMPORTED_MODULE_2__.WorldGeneration)
/* harmony export */ });
/* harmony import */ var _DivineVoxelEngineConstructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DivineVoxelEngineConstructor.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/DivineVoxelEngineConstructor.js");
/* harmony import */ var _Analyzer_Analyzer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Analyzer/Analyzer.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Analyzer/Analyzer.js");
/* harmony import */ var _WorldGeneration_WorldGeneration_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WorldGeneration/WorldGeneration.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/WorldGeneration/WorldGeneration.js");
/* harmony import */ var _Tools_WorldGenBrush_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Tools/WorldGenBrush.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Tools/WorldGenBrush.js");
/* harmony import */ var _Builder_Types_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Builder/Types/index.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Types/index.js");
/* harmony import */ var _Builder_Shapes_default_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Builder/Shapes/default/index.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Shapes/default/index.js");
/* harmony import */ var _Builder_Constructors_Voxel_Classes_VoxelConstructor_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Builder/Constructors/Voxel/Classes/VoxelConstructor.js */ "../../DSLIBS/divineVoxelEngine/dist/Constructor/Builder/Constructors/Voxel/Classes/VoxelConstructor.js");









/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Data/DataSyncNode.js":
/*!****************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Data/DataSyncNode.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataSyncNode": () => (/* binding */ DataSyncNode)
/* harmony export */ });
/* harmony import */ var threadcomm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! threadcomm */ "../../DSLIBS/threadComm/dist/index.js");
/* harmony import */ var _World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./World/WorldRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/WorldRegister.js");
/* harmony import */ var _Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Common/Threads/Contracts/DataSyncIds.js */ "../../DSLIBS/divineVoxelEngine/dist/Common/Threads/Contracts/DataSyncIds.js");
/* harmony import */ var _Voxel_VoxelPalette_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Voxel/VoxelPalette.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Voxel/VoxelPalette.js");
/* harmony import */ var _World_Dimensions_DimensionsRegister_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./World/Dimensions/DimensionsRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/Dimensions/DimensionsRegister.js");
/* harmony import */ var _World_Chunk_ChunkTags_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./World/Chunk/ChunkTags.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/Chunk/ChunkTags.js");
/* harmony import */ var _World_Region_RegionTags_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./World/Region/RegionTags.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/Region/RegionTags.js");
/* harmony import */ var _World_Column_ColumnTags_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./World/Column/ColumnTags.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/Column/ColumnTags.js");
/* harmony import */ var _Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Voxel/VoxelTags.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Voxel/VoxelTags.js");
/* harmony import */ var _Register_MappedDataRegister_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Register/MappedDataRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Register/MappedDataRegister.js");
/* harmony import */ var _World_Region_RegionHeaderRegister_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./World/Region/RegionHeaderRegister.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/World/Region/RegionHeaderRegister.js");
/* harmony import */ var _Substance_SubstancePalette_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Substance/SubstancePalette.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Substance/SubstancePalette.js");
/* harmony import */ var _Substance_SubstanceTags_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Substance/SubstanceTags.js */ "../../DSLIBS/divineVoxelEngine/dist/Data/Substance/SubstanceTags.js");
//objects













const DataSyncNode = {
    maps: {
        strings: threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.onDataSync(_Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.registerStringMap, (data) => {
            _Register_MappedDataRegister_js__WEBPACK_IMPORTED_MODULE_9__.MappedDataRegister.stringMaps.sync(data);
        }),
        objects: threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.onDataSync(_Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.registerObjectMap, (data) => {
            _Register_MappedDataRegister_js__WEBPACK_IMPORTED_MODULE_9__.MappedDataRegister.objectMaps.sync(data);
        }),
    },
    palettes: {
        voxel: threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.onDataSync(_Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.voxelPalette, ([palette, map]) => {
            _Voxel_VoxelPalette_js__WEBPACK_IMPORTED_MODULE_3__.VoxelPaletteReader.setVoxelPalette(palette, map);
        }),
        substance: threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.onDataSync(_Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.substancePalette, ([palette, map]) => {
            _Substance_SubstancePalette_js__WEBPACK_IMPORTED_MODULE_11__.SubstancePaletteReader.setPalette(palette, map);
        }),
    },
    worldData: {
        dimension: threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.onDataSync(_Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.dimesnion, (data) => {
            _World_Dimensions_DimensionsRegister_js__WEBPACK_IMPORTED_MODULE_4__.DimensionsRegister.registerDimension(data.id, data.options);
        }),
        chunk: threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.onDataSync(_Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.chunk, (data) => {
            _World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_1__.WorldRegister.chunk.add(data[0], data[1]);
        }, (data) => {
            _World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_1__.WorldRegister.chunk.remove(data);
        }),
        column: threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.onDataSync(_Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.column, (data) => {
            _World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_1__.WorldRegister.column.add(data[0], data[1]);
        }, (data) => {
            _World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_1__.WorldRegister.column.remove(data);
        }),
        region: threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.onDataSync(_Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.region, (data) => {
            _World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_1__.WorldRegister.region.add(data[0], data[1]);
        }, (data) => {
            _World_WorldRegister_js__WEBPACK_IMPORTED_MODULE_1__.WorldRegister.region.remove(data);
        }),
        regionHeader: threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.onDataSync(_Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.regionHeader, (data) => {
            _World_Region_RegionHeaderRegister_js__WEBPACK_IMPORTED_MODULE_10__.RegionHeaderRegister.add(data[0], data[1]);
        }, (data) => {
            _World_Region_RegionHeaderRegister_js__WEBPACK_IMPORTED_MODULE_10__.RegionHeaderRegister.remove(data);
        }),
    },
    tags: {
        voxel: threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.onDataSync(_Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.voxelTags, (data) => {
            _Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_8__.VoxelTags.$INIT(data[0]);
            _Voxel_VoxelTags_js__WEBPACK_IMPORTED_MODULE_8__.VoxelTags.sync(new Uint16Array(data[1]));
        }),
        substance: threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.onDataSync(_Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.substanceTags, (data) => {
            _Substance_SubstanceTags_js__WEBPACK_IMPORTED_MODULE_12__.SubstanceTags.$INIT(data);
        }),
        chunk: threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.onDataSync(_Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.chunkTags, (data) => {
            _World_Chunk_ChunkTags_js__WEBPACK_IMPORTED_MODULE_5__.ChunkTags.$INIT(data);
        }),
        column: threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.onDataSync(_Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.columnTags, (data) => {
            _World_Column_ColumnTags_js__WEBPACK_IMPORTED_MODULE_7__.ColumnTags.$INIT(data);
        }),
        region: threadcomm__WEBPACK_IMPORTED_MODULE_0__.ThreadComm.onDataSync(_Common_Threads_Contracts_DataSyncIds_js__WEBPACK_IMPORTED_MODULE_2__.DataSyncIds.regionTags, (data) => {
            _World_Region_RegionTags_js__WEBPACK_IMPORTED_MODULE_6__.RegionTags.$INIT(data[0]);
            _World_Region_RegionTags_js__WEBPACK_IMPORTED_MODULE_6__.RegionHeaderTags.$INIT(data[1]);
        }),
    },
};


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Data/Shapes/StairStates.js":
/*!**********************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Data/Shapes/StairStates.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StairStates": () => (/* binding */ StairStates)
/* harmony export */ });
const StairStates = {
    normal: {
        bottom: {
            north: 0,
            south: 1,
            east: 2,
            west: 3,
        },
        top: {
            north: 4,
            south: 5,
            east: 6,
            west: 7,
        },
    },
    connected: {
        bottom: {
            northEast: 8,
            northWest: 9,
            southEast: 10,
            southWest: 11,
        },
        top: {
            northEast: 12,
            northWest: 13,
            southEast: 14,
            southWest: 15,
        },
    },
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

/***/ "../../DSLIBS/divineVoxelEngine/dist/Global/Util/VisistedMap.js":
/*!**********************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Global/Util/VisistedMap.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VisitedMap": () => (/* binding */ VisitedMap)
/* harmony export */ });
class VisitedMap {
    _map = new Map();
    get size() {
        return this._map.size;
    }
    _getKey(x, y, z) {
        return `${x}_${y}_${z}`;
    }
    inMap(x, y, z) {
        return this._map.has(this._getKey(x, y, z));
    }
    add(x, y, z) {
        this._map.set(this._getKey(x, y, z), true);
    }
    remove(x, y, z) {
        this._map.delete(this._getKey(x, y, z));
    }
    removeDiffernce(map) {
        for (const [key] of map._map) {
            if (this._map.has(key)) {
                this._map.delete(key);
            }
        }
        return map;
    }
    clear() {
        this._map.clear();
    }
}


/***/ }),

/***/ "../../DSLIBS/divineVoxelEngine/dist/Math/Constants/Faces.js":
/*!*******************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Math/Constants/Faces.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FaceMap": () => (/* binding */ FaceMap),
/* harmony export */   "FaceNormals": () => (/* binding */ FaceNormals),
/* harmony export */   "FaceRecord": () => (/* binding */ FaceRecord)
/* harmony export */ });
const FaceMap = [
    "top",
    "bottom",
    "east",
    "west",
    "south",
    "north",
];
const FaceRecord = {
    top: 0,
    bottom: 1,
    east: 2,
    west: 3,
    south: 4,
    north: 5,
};
const FaceNormals = {
    top: [0, 1, 0],
    bottom: [0, -1, 0],
    east: [1, 0, 0],
    west: [-1, 0, 0],
    north: [0, 0, 1],
    south: [0, 0, -1],
    "north-east": [1, 0, 1],
    "north-west": [-1, 0, 1],
    "south-east": [1, 0, -1],
    "south-west": [-1, 0, -1],
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

/***/ "../../DSLIBS/divineVoxelEngine/dist/Tools/Shaders/VoxelShaderData.js":
/*!****************************************************************************!*\
  !*** ../../DSLIBS/divineVoxelEngine/dist/Tools/Shaders/VoxelShaderData.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VoxelShaderDataTool": () => (/* binding */ VoxelShaderDataTool)
/* harmony export */ });
class VoxelShaderDataTool {
    _v = 0;
    _lightMask = 0xffff;
    _aoMask = 0b11;
    _animationMask = 0b1111_1111_1111_11;
    _setLight(index, value) {
        return ((this._v & ~(this._lightMask << index)) |
            ((value & this._lightMask) << index));
    }
    _setAO(value) {
        const index = 16;
        return ((this._v & ~(this._aoMask << index)) | ((value & this._aoMask) << index));
    }
    _setAnimation(value) {
        const index = 18;
        return ((this._v & ~(this._animationMask << index)) |
            ((value & this._animationMask) << index));
    }
    setLight(values) {
        this._v = 0;
        this._v = this._setLight(0, values);
        return this;
    }
    setAO(value) {
        this._v = this._setAO(value);
        return this;
    }
    setAnimation(value) {
        this._v = this._setAnimation(value);
        return this;
    }
    getValue() {
        return this._v;
    }
}


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
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, ["DSLIBS_divineBinaryObject_dist_index_js-DSLIBS_divineVoxelEngine_dist_Common_Threads_Contract-5324f4","DSLIBS_divineVoxelEngine_dist_Math_index_js-DSLIBS_divineVoxelEngine_dist_Tools_Data_RichData-f07748"], () => (__webpack_require__("./compiled/client/Constructor/constructor.js")))
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
/******/ 			"compiled_client_Constructor_constructor_js": 1
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
/******/ 			return Promise.all([
/******/ 				__webpack_require__.e("DSLIBS_divineBinaryObject_dist_index_js-DSLIBS_divineVoxelEngine_dist_Common_Threads_Contract-5324f4"),
/******/ 				__webpack_require__.e("DSLIBS_divineVoxelEngine_dist_Math_index_js-DSLIBS_divineVoxelEngine_dist_Tools_Data_RichData-f07748")
/******/ 			]).then(next);
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
//# sourceMappingURL=compiled_client_Constructor_constructor_js.DVE.js.map