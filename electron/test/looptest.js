const { performance } = require("perf_hooks");

(() => {
 const passTo = (data) => {
  data.data.push(1);
 };

 const staticObject = {
  data: [],
  data2: [],
  data3: [],
  data4: [],
  data5: [],
  data6: [],
 };

 const passTo2 = () => {
  staticObject.data.push(1);
 };

 const test = () => {
  let j = 100000;
  let i = j;

  let t1 = performance.now();
  while (i--) {
   passTo2();
 
  }
  let t2 = performance.now();
 // console.log(staticObject.data);
  staticObject.data = [];
   staticObject.data2 = [];
  console.log("2", t2 - t1);

  i = j;

  t1 = performance.now();
  while (i--) {
   passTo({
    data: [],
    data2: [],
    data3: [],
    data4: [],
    data5: [],
    data6: [],
   });
  }
  t2 = performance.now();

  console.log("1", t2 - t1);
 };

 let trys = 10;
 while (trys--) {
  test();
 }
})();
