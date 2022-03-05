

const values = [];
const xStep = 1 / 15;
for(let i = 1; i < 16; i++) {
    values.push(Math.pow(i * xStep,2) + .1) ;
}
let i = values.length;
while(i--) {
    console.log(values[i]);
}