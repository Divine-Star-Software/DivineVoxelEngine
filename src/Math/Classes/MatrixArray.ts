import { MatrixConstants } from "../../Math/Constants/ConstantMartrix.js";

export class MatrixProperty {
 constructor(
  public data: {
   getX(): number;
   getY(): number;
   getZ(): number;
   getW(): number;
   setX(value: number): void;
   setY(value: number): void;
   setZ(value: number): void;
   setW(value: number): void;
  }
 ) {}

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
 set x(value: number) {
  this.data.setX(value);
 }
 set y(value: number) {
  this.data.setY(value);
 }
 set z(value: number) {
  this.data.setZ(value);
 }
 set w(value: number) {
  this.data.setZ(value);
 }
 set(x: number, y: number, z: number) {
  this.x = x;
  this.y = y;
  this.z = z;
 }
 setAll(value: number) {
  this.x = value;
  this.y = value;
  this.z = value;
 }
}
export class MatrixArray {
 static readonly MATRIX_INDEXES = {
  POSITION_X: 12,
  POSITION_Y: 13,
  POSITION_Z: 14,

  SCALE_X: 0,
  SCALE_Y: 5,
  SCALE_Z: 10,
  SCALE_W: 15,
 };
 static buildProperties(matrix: MatrixArray) {
  const matricies = matrix.matricies;

  (matrix as any).rows = [];
  (matrix as any).cols = [];

  let i = -1;
  let rows = 15;
  while (i < rows) {
   matrix.rows.push(
    new MatrixProperty({
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
     setX: (value: number) => {
      matricies[i + 1 + matrix.trueIndex] = value;
     },
     setY: (value: number) => {
      matricies[i + 2 + matrix.trueIndex] = value;
     },
     setZ: (value: number) => {
      matricies[i + 3 + matrix.trueIndex] = value;
     },
     setW: (value: number) => {
      matricies[i + 4 + matrix.trueIndex] = value;
     },
    })
   );
   i += 4;
  }
  i = 0;
  while (i < 4) {
   matrix.cols.push(
    new MatrixProperty({
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
     setX: (value: number) => {
      matricies[i + matrix.trueIndex] = value;
     },
     setY: (value: number) => {
      matricies[i + 1 * 4 + matrix.trueIndex] = value;
     },
     setZ: (value: number) => {
      matricies[i + 2 * 4 + matrix.trueIndex] = value;
     },
     setW: (value: number) => {
      matricies[i + 3 * 4 + matrix.trueIndex] = value;
     },
    })
   );
   i++;
  }
  Object.freeze(matrix.rows);
  Object.freeze(matrix.cols);
 }

 trueIndex = 0;
 matricies: Float32Array;
 constructor(startData: number | MatrixArray, public index: number = 0) {
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
  setX: (value: number) => {
   this.matricies[MatrixArray.MATRIX_INDEXES.SCALE_X + this.trueIndex] = value;
  },
  setY: (value: number) => {
   this.matricies[MatrixArray.MATRIX_INDEXES.SCALE_Y + this.trueIndex] = value;
  },
  setZ: (value: number) => {
   this.matricies[MatrixArray.MATRIX_INDEXES.SCALE_Z + this.trueIndex] = value;
  },
  setW: (value: number) => {
   this.matricies[MatrixArray.MATRIX_INDEXES.SCALE_W + this.trueIndex] = value;
  },
 });
 position = new MatrixProperty({
  getX: () => {
   return this.matricies[
    MatrixArray.MATRIX_INDEXES.POSITION_X + this.trueIndex
   ];
  },
  getY: () => {
   return this.matricies[
    MatrixArray.MATRIX_INDEXES.POSITION_Y + this.trueIndex
   ];
  },
  getZ: () => {
   return this.matricies[
    MatrixArray.MATRIX_INDEXES.POSITION_Z + this.trueIndex
   ];
  },
  getW: () => {
   return 0;
  },
  setX: (value: number) => {
   this.matricies[MatrixArray.MATRIX_INDEXES.POSITION_X + this.trueIndex] =
    value;
  },
  setY: (value: number) => {
   this.matricies[MatrixArray.MATRIX_INDEXES.POSITION_Y + this.trueIndex] =
    value;
  },
  setZ: (value: number) => {
   this.matricies[MatrixArray.MATRIX_INDEXES.POSITION_Z + this.trueIndex] =
    value;
  },
  setW: (value: number) => {},
 });
 setMatriciesIndex(index: number) {
  this.index = index;
  this.trueIndex = index * 16;
  return this;
 }
}
