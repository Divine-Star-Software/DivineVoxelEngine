export const CreateGUI = () => {
 let divFps = document.getElementById("fps");
 let position = document.getElementById("position");

 return (engine  : BABYLON.Engine,positionWatch : BABYLON.FreeCamera | BABYLON.Mesh) => {

    //@ts-ignore
  divFps.innerHTML = engine.getFps().toFixed() + " fps";
  //@ts-ignore
  position.innerHTML = `${positionWatch.position.x.toFixed(
   2 )
} ${positionWatch.position.y.toFixed(2)} ${positionWatch.position.z.toFixed(2)}`;
 };
};