const { performance } = require("perf_hooks");
const runTimes = 16384;
const normalTest = () => {
 const t1 = performance.now();
 let i = runTimes;
 while (i--) {
  4294967296 >> 32;
  4294967296 >> 32;
  4294967296 >> 32;
  4294967296 >> 32;
  4294967296 >> 32;
  4294967296 >> 32;
  4294967296 >> 32;
  4294967296 >> 32;
 }
 const t2 = performance.now();
 console.log(t2 - t1);
};

const bigIntTest = () => {
 const t1 = performance.now();
 let i = runTimes;
 while (i--) {
  18446744073709552000n >> 64n;
  18446744073709552000n >> 64n;
  18446744073709552000n >> 64n;
  18446744073709552000n >> 64n;
  18446744073709552000n >> 64n;
  18446744073709552000n >> 64n;
  18446744073709552000n >> 64n;
  18446744073709552000n >> 64n;
 }
 const t2 = performance.now();
 console.log(t2 - t1);
};

normalTest();

bigIntTest();
