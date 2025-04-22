import { GenMap } from "./GenMap";
import { EntityInstance } from "../../../Tools/EntityInstance";
import { Sector } from "@divinevoxel/vlox/World";
import { Vec3Array } from "@amodx/math";
import { WorldRegister } from "@divinevoxel/vlox/World/WorldRegister";
export class GenMapTile {
  static Tiles: GenMapTile[] = [];
  static Pool: GenMapTile[] = [];

  _instance: EntityInstance;
  _dispoed = false;

  _sector: Sector | null = null;
  dimensonId: number = 0;
  public position: Vec3Array = [0, 0, 0];

  constructor(public worldMap: GenMap) {}

  set(dimensonId: number, x: number, y: number, z: number) {
    const instance = this.worldMap._instanceTool.getInstance();
    if (!instance) {
      console.warn(`Could not load tile instance for ${location}`);
    } else {
      this._instance = instance;
    }
    this.dimensonId = dimensonId;

    this.position[0] = x;
    this.position[1] = y;
    this.position[2] = z;

    GenMapTile.Tiles.push(this);
    this._instance.setPosition(...this.position);
    this.setColor(0.0, 0.0, 0.0, 1.0);
    this.update();
  }

  update() {
    if (this._dispoed) {
      this.setColor(1.0, 0.0, 0.0, 1.0);
      return;
    }
    if (!this._sector) {
      const sector = WorldRegister.sectors.get(
        this.dimensonId,
        ...this.position
      );
      if (!sector) {
        this.setColor(0.0, 0.0, 0.0, 1.0);
        return;
      }
      this._sector = sector;
    }

    if (this._sector) {
      this.setColor(1.0, 1.0, 1.0, 1.0);
    }

    if (this._sector.isCheckedOut()) {
      this.setColor(1, 0, 0, 1.0);
      return;
    }

    const sector = this._sector;
    if (sector.isReleased()) {
      this.setColor(1.0, 1.0, 0.0, 1.0); // Green
      return;
    }
    if (sector.isDisplayDirty()) {
      this.setColor(0.0, 0.0, 1.0, 1.0); // Blue
      return;
    }
    if (
      sector.getBitFlag(Sector.FlagIds.isWorldGenDone) &&
      sector.getBitFlag(Sector.FlagIds.isWorldDecorDone) &&
      sector.getBitFlag(Sector.FlagIds.isWorldSunDone) &&
      sector.getBitFlag(Sector.FlagIds.isWorldPropagationDone)
    ) {
      this.setColor(0.0, 1.0, 0.0, 1.0); // Green
      return;
    }
    if (sector.getBitFlag(Sector.FlagIds.isWorldSunDone)) {
      this.setColor(1.0, 1.0, 0.0, 1.0); // Yellow
      return;
    }
    if (sector.getBitFlag(Sector.FlagIds.isWorldPropagationDone)) {
      this.setColor(0.5, 0.0, 0.5, 1.0); // Purple
      return;
    }

    if (sector.getBitFlag(Sector.FlagIds.isWorldDecorDone)) {
      this.setColor(0.0, 0.0, 1.0, 1.0); // Blue
      return;
    }
    if (sector.getBitFlag(Sector.FlagIds.isWorldGenDone)) {
      this.setColor(0.0, 1.0, 1.0, 1.0); // Cyan
      return;
    }
    this.setColor(1.0, 1.0, 1.0, 1.0);
  }

  setColor(r: number, g: number, b: number, a = 1) {
    let index = this._instance.index * 4;
    this.worldMap._colorBuffer[index] = r;
    this.worldMap._colorBuffer[index + 1] = g;
    this.worldMap._colorBuffer[index + 2] = b;
    this.worldMap._colorBuffer[index + 3] = a;
  }
  dispose() {
    this._sector = null;
    this._dispoed = true;
    GenMapTile.Pool.push(this);
    this._instance.destroy();
  }
}
