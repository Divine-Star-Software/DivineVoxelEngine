import { Vec3Array } from "@amodx/math";
import { Quad } from "../Primitives";

type BoxPoints = [Vec3Array, Vec3Array];
type BoxQuads = [
  up: Quad,
  down: Quad,
  north: Quad,
  south: Quad,
  east: Quad,
  west: Quad,
];
export class Box {
  static Create(
    points: BoxPoints = [
      [0, 0, 0],
      [1, 1, 1],
    ]
  ) {
    return new Box({
      points,
    });
  }

  quads: BoxQuads = [
    Quad.Create(),
    Quad.Create(),
    Quad.Create(),
    Quad.Create(),
    Quad.Create(),
    Quad.Create(),
  ];

  constructor(data: { points?: BoxPoints }) {
    if (data.points) this.setPoints(data.points);
  }

  setPoints(points: BoxPoints) {
    const [startX, startY, startZ] = points[0];
    const [endX, endY, endZ] = points[1];

    //top
    this.quads[0].setPositions([
      [endX, endY, endZ],
      [startX, endY, endZ],
      [startX, endY, startZ],
      [endX, endY, startZ],
    ]);
    //bottom
    this.quads[1].setPositions([
      [startX, startY, endZ],
      [endX, startY, endZ],
      [endX, startY, startZ],
      [startX, startY, startZ],
    ]);
    //north
    this.quads[2].setPositions([
      [startX, endY, endZ],
      [endX, endY, endZ],
      [endX, startY, endZ],
      [startX, startY, endZ],
    ]);
    //south
    this.quads[3].setPositions([
      [endX, endY, startZ],
      [startX, endY, startZ],
      [startX, startY, startZ],
      [endX, startY, startZ],
    ]);
    //east
    this.quads[4].setPositions([
      [endX, endY, endZ],
      [endX, endY, startZ],
      [endX, startY, startZ],
      [endX, startY, endZ],
    ]);
    //west
    this.quads[5].setPositions([
      [startX, endY, startZ],
      [startX, endY, endZ],
      [startX, startY, endZ],
      [startX, startY, startZ],
    ]);
  }
}
