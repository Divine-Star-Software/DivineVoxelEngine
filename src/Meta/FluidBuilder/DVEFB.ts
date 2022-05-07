
export type DVEFBInitData = {
    onReady: ()=>void,
    onMessage?:(event : any)=>void,
    onRestart?: ()=>void
};
