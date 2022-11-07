const { ipcRenderer } = require('electron');



window.goToWolrd = (world)=> {
  ipcRenderer.send("world", world);
}