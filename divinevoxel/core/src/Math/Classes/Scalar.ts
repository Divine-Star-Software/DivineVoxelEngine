export class Scalar {
 static Between(value: number, min: number, max: number) {
  return value >= min && value <= max;
 }
 constructor(public value = 0) {}
}
