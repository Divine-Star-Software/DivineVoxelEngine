export const RunInit = (init : Function) => {
const readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {
     clearInterval(readyStateCheckInterval);
     init();
    }
   }, 10);
}