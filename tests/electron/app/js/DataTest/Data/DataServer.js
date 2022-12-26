"use strict";
/* const ready = { ready: false };
const socket = new WebSocket("ws://127.0.0.1:8080");
socket.binaryType = "arraybuffer";
socket.addEventListener("open", (event) => {
 ready.ready = true;
});
export const DataServer = {
 socket: socket,
 messageFunction: <Function[]>[],

 loadedRegion: new Uint32Array(),
 awaitRegion: false,

 awaitRegionLoad(x: number, y: number, z: number): Promise<Uint32Array> {
  const messsage = new Uint32Array(7);
  messsage[0] = 1;
  if (x < 0) messsage[1] = 1;
  messsage[2] = x;
  if (y < 0) messsage[3] = 1;
  messsage[4] = y;
  if (z < 0) messsage[5] = 1;
  messsage[6] = z;
  this.socket.send(messsage);
  const self = this;
  self.awaitRegion = true;
  return new Promise((resolve) => {
   const inte = setInterval(() => {
    if (!self.awaitRegion) {
     clearInterval(inte);
     resolve(self.loadedRegion);
    }
   }, 1);
  });
 },

 flush() {
  this.loadedRegion = new Uint32Array();
 },

 $INIT() {
  const self = this;
  this.socket.addEventListener("message", (event) => {
   const array = new Uint32Array(event.data);
   if (array[0] == 0) {
    self.awaitRegion = false;
    self.loadedRegion = array;
   }
   return;
  });
  return new Promise((resolve) => {
   const inte = setInterval(() => {
    if (ready.ready) {
     clearInterval(inte);
     resolve(true);
    }
   }, 1);
  });
 },

 addToOnMessage(func: Function) {
  this.messageFunction.push(func);
 },

 sendMessage(data: any) {
  this.socket.send(data);
 },
};
 */ 
