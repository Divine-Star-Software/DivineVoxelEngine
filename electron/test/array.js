let x = 15;
let y = 255;
let z = 15;
let max_x = 16;
let max_y = 256;
let max_z = 16;
let i = x + y * max_x + z * max_x * max_y;

let dx = (i % max_x) >> 0
let dy = (( i / max_x ) % max_y) >> 0
let dz = (i / ( max_x * max_y )) >> 0

console.log(16*256*16);
console.log(i);
console.log(dx,dy,dz);