export function Distance3D(x1, y1, z1, x2, y2, z2) {
    const a = x2 - x1;
    const b = y2 - y1;
    const c = z2 - z1;
    return Math.sqrt(a * a + b * b + c * c);
}
