export function Distance3D(
 x1: number,
 y1: number,
 z1: number,
 x2: number,
 y2: number,
 z2: number
) {
 return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
}
