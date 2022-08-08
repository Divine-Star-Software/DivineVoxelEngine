export const MatrixMap = {
    shapeMap: {},
    __shapeMapSet: false,
    isReady() {
        return this.__shapeMapSet;
    },
    setShapeMap(shapeMap) {
        this.shapeMap = shapeMap;
        console.log(shapeMap);
        this.__shapeMapSet = true;
    },
    flush() {
        this.shapeMap = null;
    },
};
