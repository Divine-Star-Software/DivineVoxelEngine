export class ShapeManager {
    shapes = {};
    registerShape(id, shapeObject) {
        this.shapes[id] = shapeObject;
    }
}
