import { DVEN } from "../../../out/index.js";
const start = () => { };
await DVEN.$INIT({
    onReady: start,
    onMessage: (message, data) => { },
});
