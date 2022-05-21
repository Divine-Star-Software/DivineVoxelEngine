export type DVEWGInitData = {
    onReady: ()=>void,
    onMessage?:(event : any)=>void,
    onRestart?: ()=>void
};
