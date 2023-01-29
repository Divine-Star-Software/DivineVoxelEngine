export const ShapeManager = {
    shapes: new Map(),
    shapeCount: 0,
    registerShape(shapeObject) {
        this.shapes.set(shapeObject.id, shapeObject);
    },
    getShape(shapeId) {
        const shape = this.shapes.get(shapeId);
        if (!shape) {
            throw new Error(`%${shapeId} does not exists.`);
        }
        return shape;
    },
};
