import { MatrixConstants } from "../../Math/Constants/ConstantMartrix.js";
export class MatrixProperty {
    data;
    constructor(data) {
        this.data = data;
    }
    get x() {
        return this.data.getX();
    }
    get y() {
        return this.data.getY();
    }
    get z() {
        return this.data.getZ();
    }
    get w() {
        return this.data.getW();
    }
    set x(value) {
        this.data.setX(value);
    }
    set y(value) {
        this.data.setY(value);
    }
    set z(value) {
        this.data.setZ(value);
    }
    set w(value) {
        this.data.setZ(value);
    }
    set(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    setAll(value) {
        this.x = value;
        this.y = value;
        this.z = value;
    }
}
class MatrixArray {
    index;
    static MATRIX_INDEXES = {
        POSITION_X: 12,
        POSITION_Y: 13,
        POSITION_Z: 14,
        SCALE_X: 0,
        SCALE_Y: 5,
        SCALE_Z: 10,
        SCALE_W: 15,
    };
    static buildProperties(matrix) {
        const matricies = matrix.matricies;
        matrix.rows = [];
        matrix.cols = [];
        let i = -1;
        let rows = 15;
        while (i < rows) {
            matrix.rows.push(new MatrixProperty({
                getX: () => {
                    return matricies[i + 1 + matrix.trueIndex];
                },
                getY: () => {
                    return matricies[i + 2 + matrix.trueIndex];
                },
                getZ: () => {
                    return matricies[i + 3 + matrix.trueIndex];
                },
                getW: () => {
                    return matricies[i + 4 + matrix.trueIndex];
                },
                setX: (value) => {
                    matricies[i + 1 + matrix.trueIndex] = value;
                },
                setY: (value) => {
                    matricies[i + 2 + matrix.trueIndex] = value;
                },
                setZ: (value) => {
                    matricies[i + 3 + matrix.trueIndex] = value;
                },
                setW: (value) => {
                    matricies[i + 4 + matrix.trueIndex] = value;
                },
            }));
            i += 4;
        }
        i = 0;
        while (i < 4) {
            matrix.cols.push(new MatrixProperty({
                getX: () => {
                    return matricies[i + matrix.trueIndex];
                },
                getY: () => {
                    return matricies[i + 1 * 4 + matrix.trueIndex];
                },
                getZ: () => {
                    return matricies[i + 2 * 4 + matrix.trueIndex];
                },
                getW: () => {
                    return matricies[i + 3 * 4 + matrix.trueIndex];
                },
                setX: (value) => {
                    matricies[i + matrix.trueIndex] = value;
                },
                setY: (value) => {
                    matricies[i + 1 * 4 + matrix.trueIndex] = value;
                },
                setZ: (value) => {
                    matricies[i + 2 * 4 + matrix.trueIndex] = value;
                },
                setW: (value) => {
                    matricies[i + 3 * 4 + matrix.trueIndex] = value;
                },
            }));
            i++;
        }
        Object.freeze(matrix.rows);
        Object.freeze(matrix.cols);
    }
    trueIndex = 0;
    matricies;
    constructor(startData, index = 0) {
        this.index = index;
        this.setMatriciesIndex(index);
        MatrixArray.buildProperties(this);
        if (startData instanceof MatrixArray) {
            this.matricies = startData.matricies;
            this.rows = startData.rows;
            this.cols = startData.cols;
            return;
        }
        this.matricies = new Float32Array(startData * 16);
        let i = 0;
        let k = 0;
        while (k < startData) {
            for (const row of MatrixConstants.IDENTIY_MATRIX) {
                for (const col of row) {
                    this.matricies[i] = col;
                    i++;
                }
            }
            k++;
        }
    }
    rows;
    cols;
    scale = new MatrixProperty({
        getX: () => {
            return this.matricies[MatrixArray.MATRIX_INDEXES.SCALE_X + this.trueIndex];
        },
        getY: () => {
            return this.matricies[MatrixArray.MATRIX_INDEXES.SCALE_Y + this.trueIndex];
        },
        getZ: () => {
            return this.matricies[MatrixArray.MATRIX_INDEXES.SCALE_Z + this.trueIndex];
        },
        getW: () => {
            return this.matricies[MatrixArray.MATRIX_INDEXES.SCALE_W + this.trueIndex];
        },
        setX: (value) => {
            this.matricies[MatrixArray.MATRIX_INDEXES.SCALE_X + this.trueIndex] = value;
        },
        setY: (value) => {
            this.matricies[MatrixArray.MATRIX_INDEXES.SCALE_Y + this.trueIndex] = value;
        },
        setZ: (value) => {
            this.matricies[MatrixArray.MATRIX_INDEXES.SCALE_Z + this.trueIndex] = value;
        },
        setW: (value) => {
            this.matricies[MatrixArray.MATRIX_INDEXES.SCALE_W + this.trueIndex] = value;
        },
    });
    position = new MatrixProperty({
        getX: () => {
            return this.matricies[MatrixArray.MATRIX_INDEXES.POSITION_X + this.trueIndex];
        },
        getY: () => {
            return this.matricies[MatrixArray.MATRIX_INDEXES.POSITION_Y + this.trueIndex];
        },
        getZ: () => {
            return this.matricies[MatrixArray.MATRIX_INDEXES.POSITION_Z + this.trueIndex];
        },
        getW: () => {
            return 0;
        },
        setX: (value) => {
            this.matricies[MatrixArray.MATRIX_INDEXES.POSITION_X + this.trueIndex] =
                value;
        },
        setY: (value) => {
            this.matricies[MatrixArray.MATRIX_INDEXES.POSITION_Y + this.trueIndex] =
                value;
        },
        setZ: (value) => {
            this.matricies[MatrixArray.MATRIX_INDEXES.POSITION_Z + this.trueIndex] =
                value;
        },
        setW: (value) => { },
    });
    setMatriciesIndex(index) {
        this.index = index;
        this.trueIndex = index * 16;
        return this;
    }
}
export { MatrixArray };
