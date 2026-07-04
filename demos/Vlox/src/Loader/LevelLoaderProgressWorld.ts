import { Flat2DIndex, Vec2Array, Vec3Array } from "@amodx/math";
export enum SectorState {
  Empty,
  Loaded,
  WorldGenComplete,
  WorldDecorationComplete,
  WorldPropagationComplete,
  WorldSunComplete,
  Meshed,
  Locked,
}

const colors: Record<SectorState, string> = {
  [SectorState.Empty]: "#000000",
  [SectorState.Loaded]: "#1a97b6",
  [SectorState.WorldGenComplete]: "#00ff15",
  [SectorState.WorldDecorationComplete]: "#0400ff",
  [SectorState.WorldPropagationComplete]: "#ae00ff",
  [SectorState.WorldSunComplete]: "#fbff00",
  [SectorState.Meshed]: "#00fff2",
  [SectorState.Locked]: "#ff8800",
};

export class LevelLoaderProgressWorld {
  STATES = SectorState;

  context: OffscreenCanvasRenderingContext2D;

  index = Flat2DIndex.GetXYOrder();
  start: Vec3Array;

  cellSize = 12;

  private _states: Uint8Array = new Uint8Array(0);
  private _width = 0;
  private _height = 0;

  private sectorSizeX = 16;
  private sectorSizeZ = 16;
  private _startSectorX = 0;
  private _startSectorZ = 0;
  constructor(public canvas: OffscreenCanvas) {
    this.context = this.canvas.getContext("2d")!;
  }

  setUp(start: Vec3Array, size: Vec2Array) {
    this.start = start;
    const originX = start[0] - size[0] / 2;
    const originZ = start[2] - size[1] / 2;
    this._startSectorX = Math.floor(originX / this.sectorSizeX);
    this._startSectorZ = Math.floor(originZ / this.sectorSizeZ);
    this._width = Math.ceil(size[0] / this.sectorSizeX);
    this._height = Math.ceil(size[1] / this.sectorSizeZ);

    this.index.setBounds(this._width, this._height);

    const total = this._width * this._height;
    this._states = new Uint8Array(total);

    const stepX = Math.floor(200 / this._width);
    const stepY = Math.floor(200 / this._height);
    const step = Math.max(1, Math.min(stepX, stepY));

    this.cellSize = step;

    this.drawAll();
  }
  getIndex(location: Vec3Array) {
    const cx = Math.floor(location[0] / this.sectorSizeX) - this._startSectorX;
    const cz = Math.floor(location[2] / this.sectorSizeZ) - this._startSectorZ;
    return this.index.getIndexXY(cx, cz);
  }

  setState(location: Vec3Array, state: SectorState) {
    const i = this.getIndex(location);
    if (i < 0 || i >= this._states.length) return;
    this._states[i] = state;
  }

  reset() {
    this._states.fill(SectorState.Empty);
    this.drawAll();
  }

  private _cellCoords(i: number): [x: number, y: number] {
    const cx = i % this._width;
    const cy = Math.floor(i / this._width);
    return [cx * this.cellSize, cy * this.cellSize];
  }

  private _drawCell(i: number) {
    const ctx = this.context;
    const [x, y] = this._cellCoords(i);
    const s = this.cellSize;
    const state = this._states[i] as SectorState;

    ctx.fillStyle = colors[state];
    ctx.fillRect(x, y, s, s);
  }

  drawAll() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < this._states.length; i++) {
      this._drawCell(i);
    }
  }
}
