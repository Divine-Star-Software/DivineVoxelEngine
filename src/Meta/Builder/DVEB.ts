
export type DVEBInitData = {
    onReady: ()=>void,
    onMessage?:(event : any)=>void,
    onRestart?: ()=>void
};
