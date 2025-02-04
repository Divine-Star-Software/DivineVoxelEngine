export class CompiledTextureAnimation {
  _frames: number[] = [];
  _times: number[] = [];
  _currentTime = 0;
  _frameIndex = 0;
  _current: number = Infinity;
  _animatedTextureIndex = -1;
  constructor(public textureIndex: number) {}

  tick(delta: number) {
    if (this._current == Infinity) this._current = this._times[0];
    this._current -= delta;
    if (this._current <= 0) {
      this._frameIndex++;
      this._frameIndex %= this._frames.length;
      this._current = this._times[this._frameIndex];
      return true;
    }
    return false;
  }

  getIndex() {
    return this._frames[this._frameIndex] + this.textureIndex;
  }
}
