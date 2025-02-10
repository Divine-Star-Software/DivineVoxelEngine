import { Vector3Like } from "@amodx/math";
import { Circle } from "@amodx/math/Shapes";
import { WorldSpaces } from "../../../World/WorldSpaces";
import { TickQueue } from "./TickQueue";
import { TaskTool } from "../../../Tools/Tasks/TasksTool";
import { BuildQueue } from "./Queues/BuildQueue";
import { LogicQueue } from "./Queues/LogiccQueue";

export interface GeneratorData {
  dimension: number;
  building?: boolean;
  culling?: boolean;
  position: Vector3Like;
  renderRadius: number;
  generationRadius: number;
  maxRadius: number;
}

export class Generator {
  position: Vector3Like;
  _dimension = 0;
  _building = true;
  _positonChanged = false;
  _waitingForCull = false;
  _cullTime = 0;
  _culling = true;
  _cachedPosition = Vector3Like.Create();
  _sectorPosition = Vector3Like.Create();
  _genCircle = new Circle({ x: 0, y: 0 }, 0);
  _renderCircle = new Circle({ x: 0, y: 0 }, 0);
  _maxCircle = new Circle({ x: 0, y: 0 }, 10);
  buildQueue : BuildQueue;
  logicQueue: LogicQueue;
  constructor(public taskTool: TaskTool, data: GeneratorData) {
    this._dimension = data.dimension;
    this.position = data.position;
    this._building =
      typeof data.building !== "undefined" ? data.building : true;
    this._culling = typeof data.culling !== "undefined" ? data.culling : true;
    this._renderCircle.radius = data.renderRadius;
    this._genCircle.radius = data.generationRadius;
    this._maxCircle.radius = data.maxRadius;
    this.buildQueue = new BuildQueue(taskTool);
    this.logicQueue = new LogicQueue(taskTool);
  }

  update() {
    this._positonChanged = false;

    WorldSpaces.section.getPosition(
      this.position.x,
      0,
      this.position.z,
      this._sectorPosition
    );

    if (!Vector3Like.Equals(this._sectorPosition, this._cachedPosition)) {
      this._positonChanged = true;
      Vector3Like.Copy(this._cachedPosition, this._sectorPosition);
    }

    this._renderCircle.center.x = this._sectorPosition.x;
    this._renderCircle.center.y = this._sectorPosition.z;

    this._genCircle.center.x = this._sectorPosition.x;
    this._genCircle.center.y = this._sectorPosition.z;

    this._maxCircle.center.x = this._sectorPosition.x;
    this._maxCircle.center.y = this._sectorPosition.z;
  }

  tick() {
    if (this._building) {
      this.buildQueue.sort(this.position.x, this.position.y, this.position.z);
      this.buildQueue.run(125);
    }
    this.logicQueue.sort(this.position.x, this.position.y, this.position.z);
    this.logicQueue.run();
  }
}
