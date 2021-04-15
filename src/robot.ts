const PLACED_ROBOTS_FACTORIES = {
  north: (x: number, y: number) => new NorthFacingRobot(x, y, 0),
  east: (x: number, y: number) => new EastFacingRobot(x, y, 1),
  south: (x: number, y: number) => new SouthFacingRobot(x, y, 2),
  west: (x: number, y: number) => new WestFacingRobot(x, y, 3),
};

const ORDERED_FACTORIES = [
  PLACED_ROBOTS_FACTORIES.north,
  PLACED_ROBOTS_FACTORIES.east,
  PLACED_ROBOTS_FACTORIES.south,
  PLACED_ROBOTS_FACTORIES.west,
];

export interface IRobot {
  report: () => string;
  move: () => IRobot;
  rotateClockwise: () => IRobot;
  rotateAntiClockwise: () => IRobot;
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

  constructor(_x: number, _y: number, _orderedFactoryIndex = -1) {
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
      .toLowerCase() as keyof typeof PLACED_ROBOTS_FACTORIES;
    const factory = PLACED_ROBOTS_FACTORIES[facingParsed];

    if (x < 0 || x > 4 || y < 0 || y > 4 || !Boolean(factory)) {
      return this;
    }
    return factory(x, y);
  }

  move(): BaseRobot {
    return this;
  }

  rotateClockwise(): BaseRobot {
    const nextIndex = (this._orderedFactoryIndex + 1) % 4;
    return this._orderedFactoryIndex >= 0
      ? ORDERED_FACTORIES[nextIndex](this._x, this._y)
      : this;
  }

  rotateAntiClockwise(): BaseRobot {
    const nextIndex = (3 + this._orderedFactoryIndex) % 4;
    return this._orderedFactoryIndex >= 0
      ? ORDERED_FACTORIES[nextIndex](this._x, this._y)
      : this;
  }
}

class NewRobot extends BaseRobot {
  report(): string {
    return "NOT YET PLACED";
  }
}

class NorthFacingRobot extends BaseRobot {
  get facing() {
    return "NORTH";
  }

  move(): BaseRobot {
    if (this.y === 4) {
      return this;
    }

    return PLACED_ROBOTS_FACTORIES.north(this.x, this.y + 1);
  }
}

class SouthFacingRobot extends BaseRobot {
  get facing() {
    return "SOUTH";
  }
  move(): BaseRobot {
    if (this.y === 0) {
      return this;
    }

    return PLACED_ROBOTS_FACTORIES.south(this.x, this.y - 1);
  }
}

class EastFacingRobot extends BaseRobot {
  get facing() {
    return "EAST";
  }
  move(): BaseRobot {
    if (this.x === 4) {
      return this;
    }

    return PLACED_ROBOTS_FACTORIES.east(this.x + 1, this.y);
  }
}

class WestFacingRobot extends BaseRobot {
  get facing() {
    return "WEST";
  }
  move(): BaseRobot {
    if (this.x === 0) {
      return this;
    }

    return PLACED_ROBOTS_FACTORIES.west(this.x - 1, this.y);
  }
}

export function Robot() {
  return new NewRobot(0, 0);
}
