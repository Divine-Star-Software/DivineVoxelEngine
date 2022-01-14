export class ShapeManager {
    shapes = {};
    shapeMap = {};
    shapeCount = 0;
    registerShape(shapeObject) {
        this.shapes[this.shapeCount] = shapeObject;
        this.shapeMap[shapeObject.id] = this.shapeCount;
        this.shapeCount++;
    }
    getShape(shapeId) {
        if (!this.shapes[shapeId]) {
            console.log(`%sfuck ${shapeId}`, "font-size:20px; color: red;");
        }
        return this.shapes[shapeId];
    }
    getShapeMap() {
        return this.shapeMap;
    }
}
