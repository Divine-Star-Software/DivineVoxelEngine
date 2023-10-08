export function Distance2D(x1: number, x2: number, y1: number, y2: number) {
 var dx = x2 - x1;
 var dy = y2 - y1;
 return Math.sqrt(dx * dx + dy * dy);
}
