// (this.byteValue >>> index) & 1
const faceMasks = {
    top: 0b11111,
    bottom: 0b11111_00000,
    north: 0b11111_00000_00000,
    south: 0b11111_00000_00000_00000,
    east: 0b11111_00000_00000_00000_00000,
    west: 0b11111_00000_00000_00000_00000_00000,
};
export const FaceByte = {
    _rotationMap: {
        0: 0,
        90: 1,
        180: 2,
        270: 3,
    },
    _rotationReverseMap: {
        0: 0,
        1: 90,
        2: 180,
        3: 270,
    },
    _setFaceTextureState: {
        top: (state, faceBit) => {
            faceBit = (faceBit & (0b00 << 3)) | faceBit;
            return faceBit | (state << 3);
        },
        bottom: (state, faceBit) => {
            faceBit = (faceBit & (0b00 << 8)) | faceBit;
            return faceBit | (state << 8);
        },
        north: (state, faceBit) => {
            faceBit = (faceBit & (0b00 << 13)) | faceBit;
            return faceBit | (state << 13);
        },
        south: (state, faceBit) => {
            faceBit = (faceBit & (0b00 << 18)) | faceBit;
            return faceBit | (state << 18);
        },
        east: (state, faceBit) => {
            faceBit = (faceBit & (0b00 << 23)) | faceBit;
            return faceBit | (state << 23);
        },
        west: (state, faceBit) => {
            faceBit = (faceBit & (0b00 << 28)) | faceBit;
            return faceBit | (state << 28);
        },
    },
    _getFaceTextureState: {
        top: (faceBit) => {
            let newBit = faceMasks.top & faceBit;
            return (newBit >>> 3) & 0b11;
        },
        bottom: (faceBit) => {
            let newBit = faceMasks.bottom & faceBit;
            return (newBit >>> 8) & 0b11;
        },
        north: (faceBit) => {
            let newBit = faceMasks.north & faceBit;
            return (newBit >>> 13) & 0b11;
        },
        south: (faceBit) => {
            let newBit = faceMasks.south & faceBit;
            return (newBit >>> 18) & 0b11;
        },
        east: (faceBit) => {
            let newBit = faceMasks.east & faceBit;
            return (newBit >>> 23) & 0b11;
        },
        west: (faceBit) => {
            let newBit = faceMasks.west & faceBit;
            return (newBit >>> 28) & 0b11;
        },
    },
    _setFaceRotateState: {
        top: (state, faceBit) => {
            faceBit = (faceBit & (0b00 << 1)) | faceBit;
            return faceBit | (state << 1);
        },
        bottom: (state, faceBit) => {
            faceBit = (faceBit & (0b00 << 6)) | faceBit;
            return faceBit | (state << 6);
        },
        north: (state, faceBit) => {
            faceBit = (faceBit & (0b00 << 11)) | faceBit;
            return faceBit | (state << 11);
        },
        south: (state, faceBit) => {
            faceBit = (faceBit & (0b00 << 16)) | faceBit;
            return faceBit | (state << 16);
        },
        east: (state, faceBit) => {
            faceBit = (faceBit & (0b00 << 21)) | faceBit;
            return faceBit | (state << 21);
        },
        west: (state, faceBit) => {
            faceBit = (faceBit & (0b00 << 26)) | faceBit;
            return faceBit | (state << 26);
        },
    },
    _getFaceRotateState: {
        top: (faceBit) => {
            let newBit = faceMasks.top & faceBit;
            return (newBit >>> 1) & 0b11;
        },
        bottom: (faceBit) => {
            let newBit = faceMasks.bottom & faceBit;
            return (newBit >>> 6) & 0b11;
        },
        north: (faceBit) => {
            let newBit = faceMasks.north & faceBit;
            return (newBit >>> 11) & 0b11;
        },
        south: (faceBit) => {
            let newBit = faceMasks.south & faceBit;
            return (newBit >>> 16) & 0b11;
        },
        east: (faceBit) => {
            let newBit = faceMasks.east & faceBit;
            return (newBit >>> 21) & 0b11;
        },
        west: (faceBit) => {
            let newBit = faceMasks.west & faceBit;
            return (newBit >>> 26) & 0b11;
        },
    },
    _markExposedFace: {
        top: (faceBit) => {
            return faceBit | (1 << 0);
        },
        bottom: (faceBit) => {
            return faceBit | (1 << 5);
        },
        north: (faceBit) => {
            return faceBit | (1 << 10);
        },
        south: (faceBit) => {
            return faceBit | (1 << 15);
        },
        east: (faceBit) => {
            return faceBit | (1 << 20);
        },
        west: (faceBit) => {
            return faceBit | (1 << 25);
        },
    },
    _checkExposedFace: {
        top: (faceBit) => {
            return ((faceBit >>> 0) & 1) == 1;
        },
        bottom: (faceBit) => {
            return ((faceBit >>> 5) & 1) == 1;
        },
        north: (faceBit) => {
            return ((faceBit >>> 10) & 1) == 1;
        },
        south: (faceBit) => {
            return ((faceBit >>> 15) & 1) == 1;
        },
        east: (faceBit) => {
            return ((faceBit >>> 20) & 1) == 1;
        },
        west: (faceBit) => {
            return ((faceBit >>> 25) & 1) == 1;
        },
    },
    markFaceAsExposed(direction, rawData) {
        return this._markExposedFace[direction](rawData);
    },
    isFaceExposed(direction, rawData) {
        return this._checkExposedFace[direction](rawData);
    },
    setFaceRotateState(direction, state, rawData) {
        return this._setFaceRotateState[direction](state, rawData);
    },
    getFaceRotateState(direction, rawData) {
        return this._getFaceRotateState[direction](rawData);
    },
    setFaceTextureState(direction, rotation, rawData) {
        const state = this._rotationMap[rotation];
        return this._setFaceTextureState[direction](state, rawData);
    },
    getFaceTextureState(direction, rawData) {
        const state = this._getFaceTextureState[direction](rawData);
        return this._rotationReverseMap[state];
    },
};
