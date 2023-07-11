export declare class MatrixProperty {
    data: {
        getX(): number;
        getY(): number;
        getZ(): number;
        getW(): number;
        setX(value: number): void;
        setY(value: number): void;
        setZ(value: number): void;
        setW(value: number): void;
    };
    constructor(data: {
        getX(): number;
        getY(): number;
        getZ(): number;
        getW(): number;
        setX(value: number): void;
        setY(value: number): void;
        setZ(value: number): void;
        setW(value: number): void;
    });
    get x(): number;
    get y(): number;
    get z(): number;
    get w(): number;
    set x(value: number);
    set y(value: number);
    set z(value: number);
    set w(value: number);
    set(x: number, y: number, z: number): void;
    setAll(value: number): void;
}
export declare class MatrixArray {
    index: number;
    static readonly MATRIX_INDEXES: {
        POSITION_X: number;
        POSITION_Y: number;
        POSITION_Z: number;
        SCALE_X: number;
        SCALE_Y: number;
        SCALE_Z: number;
        SCALE_W: number;
    };
    static buildProperties(matrix: MatrixArray): void;
    trueIndex: number;
    matricies: Float32Array;
    constructor(startData: number | MatrixArray, index?: number);
    rows: [
        row1: MatrixProperty,
        row2: MatrixProperty,
        row3: MatrixProperty,
        row4: MatrixProperty
    ];
    cols: [
        col1: MatrixProperty,
        col2: MatrixProperty,
        col3: MatrixProperty,
        col4: MatrixProperty
    ];
    scale: MatrixProperty;
    position: MatrixProperty;
    setMatriciesIndex(index: number): this;
    copy(matrix: MatrixArray): void;
    copyIndex(): number[];
    multiply(matirx: MatrixArray): void;
}
