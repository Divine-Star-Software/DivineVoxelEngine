import { DVEB } from "../../../DivineVoxelEngineBuilder.js";
const shapeDimensions1 = {
    width: 0.5,
    depth: 0.5,
    height: 0.5,
};
const shapeDimensions2 = {
    width: 0.5,
    depth: 0.5,
    height: 0.5,
};
let topFaceExposed = false;
let currentDimensions = shapeDimensions1;
const transform = {
    v1: { x: 0, y: 0, z: 0 },
    v2: { x: 0, y: 0, z: 0 },
    v3: { x: 0, y: 0, z: 0 },
    v4: { x: 0, y: 0, z: 0 },
};
const yTransform = {
    y1: 0,
    y2: 0,
    y3: 0,
    y4: 0,
};
const vertexLevels = {
    v1l: 0,
    v2l: 0,
    v3l: 0,
    v4l: 0,
    v1v: 0,
    v2v: 0,
    v3v: 0,
    v4v: 0,
};
const sourceBlockTest = (data) => {
    if (data.flowTemplate && data.flowTemplateIndex != undefined) {
        if (data.flowTemplate[data.flowTemplateIndex + 1] == 15 &&
            data.flowTemplate[data.flowTemplateIndex + 2] == 15 &&
            data.flowTemplate[data.flowTemplateIndex + 3] == 15 &&
            data.flowTemplate[data.flowTemplateIndex + 4] == 15) {
            yTransform.y1 = 0;
            yTransform.y2 = 0;
            yTransform.y3 = 0;
            yTransform.y4 = 0;
            return true;
        }
    }
    return false;
};
const flowState = { state: 0 };
const getAngle = (data) => {
    if (sourceBlockTest(data)) {
        flowState.state = 0;
        return 0;
    }
    const v1 = vertexLevels.v1l;
    const v2 = vertexLevels.v2l;
    const v3 = vertexLevels.v3l;
    const v4 = vertexLevels.v4l;
    if (v1 == v2 && v3 == v4 && v1 == v4 && v2 == v3) {
        flowState.state = 0;
        return 0;
    }
    if (v2 == v3 && v1 == v4 && v2 > v1) {
        //flowing south
        flowState.state = 1;
        return 0;
    }
    if (v2 == v3 && v1 == v4 && v2 < v1) {
        //flowing north
        flowState.state = 2;
        return 0;
    }
    if (v2 == v1 && v3 == v4 && v1 > v4) {
        //flowing east
        flowState.state = 2;
        return 90;
    }
    if (v3 == v4 && v2 == v1 && v4 > v1) {
        //flowing west
        flowState.state = 1;
        return 90;
    }
    if (v2 < v4) {
        //flowing north west
        flowState.state = 2;
        return -45;
    }
    if (v2 > v4) {
        //flowing south east
        flowState.state = 1;
        return -45;
    }
    if (v1 > v3) {
        //flowing north east
        flowState.state = 2;
        return 45;
    }
    if (v1 < v3) {
        //flowing south west
        flowState.state = 1;
        return 45;
    }
    return 0;
};
const calculateVertexLevels = (data) => {
    if (data.flowTemplate && data.flowTemplateIndex != undefined) {
        vertexLevels.v1l = data.flowTemplate[data.flowTemplateIndex + 1];
        vertexLevels.v2l = data.flowTemplate[data.flowTemplateIndex + 2];
        vertexLevels.v3l = data.flowTemplate[data.flowTemplateIndex + 3];
        vertexLevels.v4l = data.flowTemplate[data.flowTemplateIndex + 4];
        vertexLevels.v1v = vertexLevels.v1l / 15 - 1;
        vertexLevels.v2v = vertexLevels.v2l / 15 - 1;
        vertexLevels.v3v = vertexLevels.v3l / 15 - 1;
        vertexLevels.v4v = vertexLevels.v4l / 15 - 1;
    }
};
const resetVertexLevels = () => {
    vertexLevels.v1l = 0;
    vertexLevels.v2l = 0;
    vertexLevels.v3l = 0;
    vertexLevels.v4l = 0;
    vertexLevels.v1v = 0;
    vertexLevels.v2v = 0;
    vertexLevels.v3v = 0;
    vertexLevels.v4v = 0;
};
const resetTransform = () => {
    transform.v1.y = 0;
    transform.v2.y = 0;
    transform.v3.y = 0;
    transform.v4.y = 0;
};
const processDefaultFaceData = (face, data, offset1 = 0, offset2 = 1, override = false, angle = 0) => {
    const flip = DVEB.shapeHelper.shouldFaceFlip(data.face, face);
    DVEB.shapeBuilder.addFace(face, data.position, currentDimensions, data, flip, transform);
    const uv = data.unTemplate[data.uvTemplateIndex];
    if (!override && (angle == 90 || angle == 0)) {
        DVEB.uvHelper.addUVs(face, {
            uvs: data.uvs,
            uv: uv,
            width: { start: 0, end: 1 },
            height: { start: 0, end: 1 },
            flipped: flip,
            rotoate: angle,
        });
    }
    if (override && angle == 0) {
        let hs1 = offset1;
        let hs2 = offset2;
        let he1 = 1;
        let he2 = 1;
        let ws1 = 0;
        let ws2 = 0;
        let we1 = 1;
        let we2 = 1;
        data.uvs.push(
        //v1
        ws1, hs1, uv, 
        //v2
        we1, hs2, uv, 
        //v3
        we2, he2, uv, 
        //v4
        ws2, he1, uv);
    }
    if (angle == 45) {
        //flowing +x +z || -x -z
        data.uvs.push(0.5, 1, uv, 1, 0.5, uv, 0.5, 0, uv, 0, 0.5, uv);
    }
    if (angle == -45) {
        //flowing -x +z || +x -z
        // data.uvs.push(0.5,0,uv,0,0.5,uv,0.5,1,uv,1,0.5,uv,);
        data.uvs.push(1, 0.5, uv, 0.5, 0, uv, 0, 0.5, uv, 0.5, 1, uv);
    }
    let animData = DVEB.shapeHelper.meshFaceData.setAnimationType(flowState.state, 0);
    DVEB.shapeHelper.addFaceData(animData, data.faceData);
    DVEB.uvHelper.processOverlayUVs(data);
    DVEB.shapeHelper.calculateLightColor(data.RGBLightColors, data.sunLightColors, data.lightTemplate, data.lightIndex);
    data.uvTemplateIndex += 1;
    data.overylayUVTemplateIndex += 4;
    data.lightIndex += 4;
    data.colorIndex += 4;
    data.aoIndex += 4;
};
const faceFunctions = {
    //add top face
    0: (data) => {
        calculateVertexLevels(data);
        transform.v1.y = vertexLevels.v1v + yTransform.y1;
        transform.v2.y = vertexLevels.v2v + yTransform.y1;
        transform.v3.y = vertexLevels.v3v + yTransform.y1;
        transform.v4.y = vertexLevels.v4v + yTransform.y1;
        const angle = getAngle(data);
        processDefaultFaceData("top", data, 0, 1, false, angle);
        resetTransform();
    },
    //add bottom face
    1: (data) => {
        processDefaultFaceData("bottom", data);
    },
    //add east face
    2: (data) => {
        //set();
        transform.v1.y = vertexLevels.v4v;
        transform.v2.y = vertexLevels.v3v;
        flowState.state = 1;
        processDefaultFaceData("east", data, Math.abs(vertexLevels.v4v), Math.abs(vertexLevels.v3v), topFaceExposed);
        resetTransform();
    },
    //add weest face
    3: (data) => {
        transform.v1.y = vertexLevels.v2v;
        transform.v2.y = vertexLevels.v1v;
        flowState.state = 1;
        processDefaultFaceData("west", data, Math.abs(vertexLevels.v2v), Math.abs(vertexLevels.v1v), topFaceExposed);
        resetTransform();
    },
    //add south face
    4: (data) => {
        transform.v1.y = vertexLevels.v1v;
        transform.v2.y = vertexLevels.v4v;
        flowState.state = 1;
        processDefaultFaceData("south", data, Math.abs(vertexLevels.v1v), Math.abs(vertexLevels.v4v), topFaceExposed);
        resetTransform();
    },
    //add north face
    5: (data) => {
        transform.v1.y = vertexLevels.v3v;
        transform.v2.y = vertexLevels.v2v;
        flowState.state = 1;
        processDefaultFaceData("north", data, Math.abs(vertexLevels.v3v), Math.abs(vertexLevels.v2v), topFaceExposed);
        resetTransform();
    },
};
export const FluidSourceBlockVoxelShape = {
    cullFaceOverrideFunctions: {},
    aoAddOverrideFunctions: {},
    aoFlipOverrideFunctions: {},
    registerShapeForCullFaceOverride(shapeId, func) {
        this.cullFaceOverrideFunctions[shapeId] = func;
    },
    registerShapeAOAddOverride(shapeId, func) {
        this.aoAddOverrideFunctions[shapeId] = func;
    },
    cullFaceOverride(data) {
        if (this.cullFaceOverrideFunctions[data.neighborVoxelShape.id]) {
            return this.cullFaceOverrideFunctions[data.neighborVoxelShape.id](data);
        }
        if (data.face == "top" &&
            data.neighborVoxelSubstance != "fluid" &&
            data.voxelId != data.neighborVoxelId) {
            return true;
        }
        return data.substanceResult;
    },
    aoAddOverride(data) {
        if (this.aoAddOverrideFunctions[data.neighborVoxelShape.id]) {
            return this.aoAddOverrideFunctions[data.neighborVoxelShape.id](data);
        }
        return data.substanceResult;
    },
    registerShapeAOFlipOverride(shapeId, func) {
        this.aoAddOverrideFunctions[shapeId] = func;
    },
    aoFlipOverride(data) {
        return false;
    },
    id: "FluidSourceBlock",
    addToChunkMesh(data) {
        if (sourceBlockTest(data)) {
        }
        if (DVEB.shapeHelper.isFaceExposexd(data.face, "top")) {
            data.position.x += shapeDimensions1.width;
            data.position.z += shapeDimensions1.depth;
            data.position.y += shapeDimensions1.height;
            currentDimensions = shapeDimensions1;
        }
        else {
            //make it a full 1x1x1
            data.position.x += shapeDimensions2.width;
            data.position.z += shapeDimensions2.depth;
            data.position.y += shapeDimensions2.height;
            currentDimensions = shapeDimensions2;
        }
        if (DVEB.shapeHelper.isFaceExposexd(data.face, "top")) {
            topFaceExposed = true;
            faceFunctions[0](data);
        }
        else {
            topFaceExposed = false;
        }
        if (DVEB.shapeHelper.isFaceExposexd(data.face, "bottom")) {
            faceFunctions[1](data);
        }
        if (DVEB.shapeHelper.isFaceExposexd(data.face, "east")) {
            faceFunctions[2](data);
        }
        if (DVEB.shapeHelper.isFaceExposexd(data.face, "west")) {
            faceFunctions[3](data);
        }
        if (DVEB.shapeHelper.isFaceExposexd(data.face, "south")) {
            faceFunctions[4](data);
        }
        if (DVEB.shapeHelper.isFaceExposexd(data.face, "north")) {
            faceFunctions[5](data);
        }
        resetVertexLevels();
        resetTransform();
        if (DVEB.shapeHelper.isFaceExposexd(data.face, "top")) {
            if (data.flowTemplateIndex !== undefined) {
                data.flowTemplateIndex += 5;
            }
        }
        return DVEB.shapeHelper.produceShapeReturnData(data);
    },
};
