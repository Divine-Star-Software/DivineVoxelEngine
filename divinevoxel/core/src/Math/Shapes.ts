import { Vector2Like } from "./Vectors";

export class Circle {
  static Create(
    center: Vector2Like = Vector2Like.Create(),
    radius: number = 1
  ) {
    return new Circle(center, radius);
  }

  static IsPointInsideCircle(point: Vector2Like, circle: Circle): boolean {
    const dx = point.x - circle.center.x;
    const dy = point.y - circle.center.y;
    const distanceSquared = dx * dx + dy * dy;
    return distanceSquared <= circle.radius * circle.radius;
  }

  static IsSquareInsideCircle(square: Square, circle: Circle): boolean {
    const halfSide = square.sideLength / 2;

    const topLeft: Vector2Like = {
      x: square.center.x - halfSide,
      y: square.center.y - halfSide,
    };
    const topRight: Vector2Like = {
      x: square.center.x + halfSide,
      y: square.center.y - halfSide,
    };
    const bottomLeft: Vector2Like = {
      x: square.center.x - halfSide,
      y: square.center.y + halfSide,
    };
    const bottomRight: Vector2Like = {
      x: square.center.x + halfSide,
      y: square.center.y + halfSide,
    };

    return (
      this.IsPointInsideCircle(topLeft, circle) &&
      this.IsPointInsideCircle(topRight, circle) &&
      this.IsPointInsideCircle(bottomLeft, circle) &&
      this.IsPointInsideCircle(bottomRight, circle)
    );
  }
  static IsSquareInsideOrTouchingCircle(
    square: Square,
    circle: Circle
  ): boolean {
    const halfSide = square.sideLength / 2;

    const topLeft: Vector2Like = {
      x: square.center.x - halfSide,
      y: square.center.y - halfSide,
    };
    const topRight: Vector2Like = {
      x: square.center.x + halfSide,
      y: square.center.y - halfSide,
    };
    const bottomLeft: Vector2Like = {
      x: square.center.x - halfSide,
      y: square.center.y + halfSide,
    };
    const bottomRight: Vector2Like = {
      x: square.center.x + halfSide,
      y: square.center.y + halfSide,
    };

    return (
      this.IsPointInsideCircle(topLeft, circle) ||
      this.IsPointInsideCircle(topRight, circle) ||
      this.IsPointInsideCircle(bottomLeft, circle) ||
      this.IsPointInsideCircle(bottomRight, circle)
    );
  }
  constructor(
    public center: Vector2Like = Vector2Like.Create(),
    public radius: number = 1
  ) {}
}

export class Square {
  static Create(
    center: Vector2Like = Vector2Like.Create(),
    sideLength: number = 1
  ) {
    return new Square(center, sideLength);
  }

  constructor(
    public center: Vector2Like = Vector2Like.Create(),
    public sideLength: number = 1
  ) {}
}
