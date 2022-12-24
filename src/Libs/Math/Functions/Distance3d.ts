export function Distance3D(
 x1: number,
 y1: number,
 z1: number,
 x2: number,
 y2: number,
 z2: number
) {
 const a = x2 - x1;
 const b = y2 - y1;
 const c = z2 - z1;

 return Math.sqrt(a * a + b * b + c * c);
}
