type ProgressUpdateFunction = (completed: number, status: string) => void;
type ProgressTaskFunction = (task: string) => void;
export class WorkItemProgress {
  private _currentStatus = "";
  private _compltedWorkItems = 0;
  private _workItems = 0;
  private _onUpdate: ProgressUpdateFunction[] = [];
  private _startTask: ProgressTaskFunction[] = [];
  private _endTask: ProgressTaskFunction[] = [];

  private _currentTask: string = "";
  private _dispatchUpdate() {
    for (const update of this._onUpdate) {
      update(this._compltedWorkItems / this._workItems, this._currentStatus);
    }
  }

  get compltedWorkItems(){
    return this._compltedWorkItems;
  }

  onStartTask(run: ProgressTaskFunction) {
    this._startTask.push(run);
  }

  onEndTask(run: ProgressTaskFunction) {
    this._endTask.push(run);
  }

  startTask(id: string) {
    this._currentTask = id;
    for (const run of this._startTask) {
      run(id);
    }
  }
  endTask() {
    for (const run of this._endTask) {
      run(this._currentTask);
    }
  }

  setWorkLoad(amount: number) {
    this._workItems = amount;
    this._compltedWorkItems = 0;
  }

  onUpdate(run: ProgressUpdateFunction) {
    this._onUpdate.push(run);
  }

  completeWorkItems(amount: number) {
    this._compltedWorkItems += amount;
    this._dispatchUpdate();
  }

  setStatus(status: string) {
    this._currentStatus = status;
    this._dispatchUpdate();
  }

  wait(time: number) {
    return new Promise((resolve) => setTimeout(() => resolve(true), time));
  }
}
