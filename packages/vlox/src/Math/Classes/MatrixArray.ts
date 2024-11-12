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
  this.data.setW(value);
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

  let i = 0;
  let rows = 16;
  while (i < rows) {
   const row = i;

   matrix.rows.push(
    new MatrixProperty({
     getX: () => {
      return matricies[row + matrix.trueIndex];
     },
     getY: () => {
      return matricies[row + 1 + matrix.trueIndex];
     },
     getZ: () => {
      return matricies[row + 2 + matrix.trueIndex];
     },
     getW: () => {
      return matricies[row + 3 + matrix.trueIndex];
     },
     setX: (value: number) => {
      matricies[row + matrix.trueIndex] = value;
     },
     setY: (value: number) => {
      matricies[row + 1 + matrix.trueIndex] = value;
     },
     setZ: (value: number) => {
      matricies[row + 2 + matrix.trueIndex] = value;
     },
     setW: (value: number) => {
      matricies[row + 3 + matrix.trueIndex] = value;
     },
    })
   );
   i += 4;
  }
  i = 0;
  while (i < 4) {
   const col = i;
   matrix.cols.push(
    new MatrixProperty({
     getX: () => {
      return matricies[col + matrix.trueIndex];
     },
     getY: () => {
      return matricies[col + 1 * 4 + matrix.trueIndex];
     },
     getZ: () => {
      return matricies[col + 2 * 4 + matrix.trueIndex];
     },
     getW: () => {
      return matricies[col + 3 * 4 + matrix.trueIndex];
     },
     setX: (value: number) => {
      matricies[i + matrix.trueIndex] = value;
     },
     setY: (value: number) => {
      matricies[col + 1 * 4 + matrix.trueIndex] = value;
     },
     setZ: (value: number) => {
      matricies[col + 2 * 4 + matrix.trueIndex] = value;
     },
     setW: (value: number) => {
      matricies[col + 3 * 4 + matrix.trueIndex] = value;
     },
    })
   );
   i++;
  }
 }

 trueIndex = 0;
 matricies: Float32Array;
 constructor(startData: number | MatrixArray, public index: number = 0) {
  this.setMatriciesIndex(index);

  if (startData instanceof MatrixArray) {
   this.matricies = startData.matricies;
   MatrixArray.buildProperties(this);
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
  MatrixArray.buildProperties(this);
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

 copy(matrix: MatrixArray) {
  for (let i = 0; i < 16; i++) {
   this.matricies[i + this.trueIndex] = matrix.matricies[i + matrix.trueIndex];
  }
 }
 copyIndex() {
  const index : number[]  = [];
  for (let i = 0; i < 16; i++) {
    index.push(
    this.matricies[  i + this.trueIndex]
    )
   }
   return index;
 }
 multiply(matirx: MatrixArray) {
  for (let r = 0; r < 4; r++) {
   tempMatrix.rows[r].x =
    this.rows[r].x * matirx.cols[0].x +
    this.rows[r].y * matirx.cols[0].y +
    this.rows[r].z * matirx.cols[0].z +
    this.rows[r].w * matirx.cols[0].w;

   tempMatrix.rows[r].y =
    this.rows[r].x * matirx.cols[1].x +
    this.rows[r].y * matirx.cols[1].y +
    this.rows[r].z * matirx.cols[1].z +
    this.rows[r].w * matirx.cols[1].w;

   tempMatrix.rows[r].z =
    this.rows[r].x * matirx.cols[2].x +
    this.rows[r].y * matirx.cols[2].y +
    this.rows[r].z * matirx.cols[2].z +
    this.rows[r].w * matirx.cols[2].w;

   tempMatrix.rows[r].w =
    this.rows[r].x * matirx.cols[3].x +
    this.rows[r].y * matirx.cols[3].y +
    this.rows[r].z * matirx.cols[3].z +
    this.rows[r].w * matirx.cols[3].w;
  }


  this.copy(tempMatrix);

 }
}
const tempMatrix = new MatrixArray(1, 0);
