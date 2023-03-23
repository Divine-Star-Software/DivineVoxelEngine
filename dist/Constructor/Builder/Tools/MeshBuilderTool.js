import { QuadBuilder } from "../Geometry/QuadBuilder.js";
import { QuadUVs } from "../Geometry/QuadUVs.js";
export class MeshBuilderTool {
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
export class QuadBuilderTool {
    tool;
    builder = QuadBuilder;
    uvs = QuadUVs;
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
