export declare const CollisionsHanlder: {
    sweepAABB(ax: number, ay: number, az: number, ahx: number, ahy: number, ahz: number, bx: number, by: number, bz: number, bhx: number, bhy: number, bhz: number, dx: number, dy: number, dz: number): {
        h: number;
        nx: number;
        ny: number;
        nz: number;
    };
    lineToPlane(px: number, py: number, pz: number, ux: number, uy: number, uz: number, vx: number, vy: number, vz: number, nx: number, ny: number, nz: number): number;
    between(x: number, a: number, b: number): boolean;
};
