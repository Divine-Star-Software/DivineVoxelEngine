console.log('test');
const chunkWidth = 16;
const chunkHeight = 256;
function to1D(  x,  y,  z ) {
    return (z * chunkWidth * chunkHeight) + (y * chunkWidth) + x;
}
const {
    performance
  } = require('perf_hooks');
let t1 = performance.now();
const voxels = [];
for(let x =0; x < 16; x++) {
    for(let z=0; z <16; z++) {
        for(let y = 0; y <256; y++){
            if(!voxels[x]) {
                voxels[x] = [];
            }
            if(!voxels[x][z]) {
                voxels[x][z] = [];
            }
            voxels[x][z][y] = 0;
        }
    }
}
let t2 = performance.now();
console.log(t2 - t1);



t1 = performance.now();
const voxels2 = [];
let i = 0;
let k = 16*16*256;


while(i < k) {
    voxels2[i] = 0;
    const cord = chunkWidth * i + chunkWidth * i + chunkWidth * i;
    i++;
}
t2 = performance.now();
console.log(t2 - t1);

t1 = performance.now();
const voxels3 = [];
for(let x =0; x < 16; x++) {
    for(let z=0; z <16; z++) {
        for(let y = 0; y <256; y++){
            const idx = (z * chunkWidth * chunkHeight) + (y * chunkWidth) + x;
            voxels3[idx] = 0;
        }
    }
}
t2 = performance.now();
console.log(t2 - t1);

t1 = performance.now();
const voxels4 = [];
 i = 0;
while(i < k) {
    let idx = i;
    voxels4[idx] = 0;

    let z = idx / (chunkWidth * chunkHeight);
    idx -= (z * chunkWidth * chunkHeight);
    let y = idx / chunkWidth;
    let x = idx % chunkWidth;
    i++;
}
t2 = performance.now();
console.log(t2 - t1);

function getSize(data) {
    const nd = JSON.stringify(data);
    return new Blob([nd]).size;
   }
   
console.log(getSize(voxels));
console.log(getSize(voxels2));

let j = 5
while(j--){
t1 = performance.now();
JSON.parse(JSON.stringify(voxels))
t2 = performance.now();
console.log(t2 - t1);
t1 = performance.now();
JSON.parse(JSON.stringify(voxels2));
t2 = performance.now();
console.log(t2 - t1);
}