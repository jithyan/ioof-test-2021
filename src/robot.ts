const PLACED_ROBOT_FACTORIES = {
  north: (x: number, y: number) => new NorthFacingRobot(x, y),
  east: (x: number, y: number) => new EastFacingRobot(x, y),
  south: (x: number, y: number) => new SouthFacingRobot(x, y),
  west: (x: number, y: number) => new WestFacingRobot(x, y),
};

const ORDERED_FACTORIES = [
  PLACED_ROBOT_FACTORIES.north,
  PLACED_ROBOT_FACTORIES.east,
  PLACED_ROBOT_FACTORIES.south,
  PLACED_ROBOT_FACTORIES.west,
];

export interface IRobot {
  report: () => string;
  move: () => IRobot;
  right: () => IRobot;
  left: () => IRobot;
  place: (x: number, y: number, facing: string) => IRobot;
}

abstract class BaseRobot implements IRobot {
  private _x;
  private _y;
  private _orderedFactoryIndex;

  protected get x(): number {
    return this._x;
  }
  protected get y(): number {
    return this._y;
  }
  protected get facing() {
    return "";
  }

  constructor(_x: number, _y: number, _orderedFactoryIndex: number) {
    this._x = _x;
    this._y = _y;
    this._orderedFactoryIndex = _orderedFactoryIndex;
  }

  report(): string {
    return `${this.x},${this.y},${this.facing}`;
  }

  place(x: number, y: number, facing: string): BaseRobot {
    const facingParsed = facing
      .trim()
      .toLowerCase() as keyof typeof PLACED_ROBOT_FACTORIES;
    const factory = PLACED_ROBOT_FACTORIES[facingParsed];

    if (x < 0 || x > 4 || y < 0 || y > 4 || !Boolean(factory)) {
      return this;
    }
    return factory(x, y);
  }

  move(): BaseRobot {
    return this;
  }

  right(): BaseRobot {
    const nextIndex = (this._orderedFactoryIndex + 1) % 4;
    return this._orderedFactoryIndex >= 0
      ? ORDERED_FACTORIES[nextIndex](this._x, this._y)
      : this;
  }

  left(): BaseRobot {
    const nextIndex = (3 + this._orderedFactoryIndex) % 4;
    return this._orderedFactoryIndex >= 0
      ? ORDERED_FACTORIES[nextIndex](this._x, this._y)
      : this;
  }
}

class NewRobot extends BaseRobot {
  constructor(x: number, y: number) {
    super(x, y, -1);
  }

  report(): string {
    return "NOT YET PLACED";
  }
}

class NorthFacingRobot extends BaseRobot {
  constructor(x: number, y: number) {
    super(x, y, 0);
  }

  get facing() {
    return "NORTH";
  }

  move(): BaseRobot {
    return this.place(this.x, this.y + 1, this.facing);
  }
}

class EastFacingRobot extends BaseRobot {
  constructor(x: number, y: number) {
    super(x, y, 1);
  }

  get facing() {
    return "EAST";
  }
  move(): BaseRobot {
    return this.place(this.x + 1, this.y, this.facing);
  }
}

class SouthFacingRobot extends BaseRobot {
  constructor(x: number, y: number) {
    super(x, y, 2);
  }

  get facing() {
    return "SOUTH";
  }
  move(): BaseRobot {
    return this.place(this.x, this.y - 1, this.facing);
  }
}

class WestFacingRobot extends BaseRobot {
  constructor(x: number, y: number) {
    super(x, y, 3);
  }

  get facing() {
    return "WEST";
  }
  move(): BaseRobot {
    return this.place(this.x - 1, this.y, this.facing);
  }
}

export function Robot() {
  return new NewRobot(0, 0);
}
