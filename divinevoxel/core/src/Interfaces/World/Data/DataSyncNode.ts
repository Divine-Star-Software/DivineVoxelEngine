import { DataSync } from "./DataSync";

export type CommSyncOptions = {
  worldData: boolean;
  worldDataTags: boolean;
  voxelPalette: boolean;
  voxelTags: boolean;
  materials: boolean;
  colliders: boolean;
};
export class DataSyncNode<SyncInput, SyncOutput, UnSyncInput, UnSyncOutput> {
  constructor(
    public data: {
      dataSyncType: number | string;
      commCheck: (options: CommSyncOptions, threadId?: string) => boolean;
      getSyncData: (data: SyncInput, threadId?: string) => SyncOutput | false;
      getUnSyncData: (
        data: UnSyncInput,
        threadId?: string
      ) => UnSyncOutput | false;
    },
    public dataSync: DataSync
  ) {}
  unSync(input: UnSyncInput) {
    const output = this.data.getUnSyncData(input);
    if (!output) return false;
    this.dataSync.loopThroughComms((comm, options) => {
      if (options && !this.data.commCheck(options)) return false;
      comm.unSyncData(this.data.dataSyncType, output);
    });
  }
  unSyncInThread(commName: string, input: UnSyncInput) {
    const comm = this.dataSync.commMap.get(commName);
    if (!comm) {
      console.warn("Could not find thread when trying to sync data", commName);
      return;
    }
    const output = this.data.getUnSyncData(input);
    if (!output) return false;
    if (!this.data.commCheck(this.dataSync.commOptions.get(comm)!))
      return false;
    comm.unSyncData(this.data.dataSyncType, output);
  }
  sync(input: SyncInput) {
    const output = this.data.getSyncData(input);

    if (!output) return false;
    this.dataSync.loopThroughComms((comm, options) => {
   
      if (!this.data.commCheck(options)) return false;
      comm.syncData(this.data.dataSyncType, output);
    });
  }
  syncInThread(commName: string, input: SyncInput) {
    const comm = this.dataSync.commMap.get(commName);

    if (!comm) {
      console.warn("Could not find thread when trying to sync data", commName);
      return;
    }
    const output = this.data.getSyncData(input);

    if (!output) return false;
    if (!this.data.commCheck(this.dataSync.commOptions.get(comm)!))
      return false;
    comm.syncData(this.data.dataSyncType, output);
  }
}
