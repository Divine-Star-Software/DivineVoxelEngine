const { performance } = require("perf_hooks");
let t1, t2;

const voxels = [];
let i = 65000;
while (i--) {
 voxels[i] = 0;
}

let a = 100;
while(a--){
    console.log(`test: ${a}`);
t1 = performance.now();
let k = 18 * 2;
while (k--) {
 const array =  voxels.map(()=>{});
}
t2 = performance.now();
console.log("1: ",t2 - t1);

t1 = performance.now();
let j = 18 * 2;
while (j--) {
 const array2 = new SharedArrayBuffer(voxels);
}
t2 = performance.now();
console.log("2: ",t2 - t1);
}
