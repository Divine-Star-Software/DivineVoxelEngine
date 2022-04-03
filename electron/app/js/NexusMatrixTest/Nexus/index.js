import { DVEN } from "../../../out/index.js";
console.log("HELLO FROM NEXUS");
const start = () => {
    setTimeout(() => {
        DVEN.matrixHub.requestChunkSync(0, 0, 0);
    }, 5000);
};
await DVEN.$INIT({
    onReady: start,
    onMessage: (message, data) => { },
});
