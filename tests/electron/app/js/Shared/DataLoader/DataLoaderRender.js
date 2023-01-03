export const $INITDataLoader = (DVER) => {
    let worldName = localStorage.getItem("current-world");
    worldName = !worldName ? "unkown" : worldName;
    DVER.dataComm.runTasks("set-path", [worldName]);
};
