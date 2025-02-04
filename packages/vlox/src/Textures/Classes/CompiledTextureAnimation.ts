export class CompiledTextureAnimation {
  frames: number[] = [];
  times: number[] = [];
  _currentTime = 0;
  _frameIndex = 0;
  _lastDelta = -1;
  constructor(public textureIndex: number) {}

  tick(delta: number) {
    if (this._lastDelta == -1) {
      this._lastDelta = delta;
      return false;
    }
    const d = delta - this._lastDelta;
    if (d > this.times[this._frameIndex]) {
      this._frameIndex++;
      this._frameIndex %= this.frames.length;
      return true;
    }
  }

  getIndex() {
    return this.frames[this._frameIndex] + this.textureIndex;
  }
}
