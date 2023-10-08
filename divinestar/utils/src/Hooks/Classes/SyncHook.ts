export class SyncHook<T, K> {
    _onRun: ((data: T) => K | false)[] = [];
    run(data: T): K | false {
     let returnData: any = false;
     for (const run of this._onRun) {
      returnData = run(data);
     }
     return returnData;
    }
    addToRun(run: (data: T) => K | false) {
     this._onRun.push(run);
    }
   }
   