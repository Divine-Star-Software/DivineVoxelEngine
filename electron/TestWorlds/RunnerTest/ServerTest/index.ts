//length of 3
const arrayTest = new Float32Array(3*4);
arrayTest[0] = 10;
arrayTest[1] = 20;
arrayTest[2] = 30;
console.log(arrayTest[0]);

// Create WebSocket connection.
const socket2 = new WebSocket("ws://localhost:8080");

socket2.binaryType = "arraybuffer";

// Connection opened
socket2.addEventListener("open", function (event) {
 //  socket1.send('Hello from socket 2!');
 socket2.send(new Uint8Array(arrayTest.buffer));
});

// Listen for messages
socket2.addEventListener("message", function (event) {
        const test = new Float32Array(event.data);
        console.log(test);
});
