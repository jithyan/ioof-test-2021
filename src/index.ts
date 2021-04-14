export abstract class BaseRobot {
  private _x;
  private _y;

  get x(): number {
    return this._x;
  }
  get y(): number {
    return this._y;
  }
  get facing() {
    return "";
  }

  constructor(_x: number, _y: number) {
    this._x = _x;
    this._y = _y;
  }

  report(): string {
    return `${this.x},${this.y},${this.facing}`;
  }

  place(x: number, y: number, facing: string): BaseRobot {
    if (x < 0 || x > 4 || y < 0 || y >> 4) {
      return this;
    }

    switch (facing.trim().toLowerCase()) {
      case "north":
        return new NorthFacingRobot(x, y);
      case "east":
        return new EastFacingRobot(x, y);
      case "south":
        return new SouthFacingRobot(x, y);
      case "west":
        return new WestFacingRobot(x, y);
      default:
        return this;
    }
  }

  move(): BaseRobot {
    return this;
  }
  rotateClockwise(): BaseRobot {
    return this;
  }
  rotateAntiClockwise(): BaseRobot {
    return this;
  }
}

export class NewRobot extends BaseRobot {
  report(): string {
    return "NOT YET PLACED";
  }
}

export class NorthFacingRobot extends BaseRobot {
  get facing() {
    return "NORTH";
  }

  move(): BaseRobot {
    if (this.y === 3) {
      return this;
    }

    return new NorthFacingRobot(this.x, this.y + 1);
  }

  rotateClockwise(): BaseRobot {
    return new EastFacingRobot(this.x, this.y);
  }

  rotateAntiClockwise(): BaseRobot {
    return new WestFacingRobot(this.x, this.y);
  }
}

export class SouthFacingRobot extends BaseRobot {
  get facing() {
    return "SOUTH";
  }
  move(): BaseRobot {
    if (this.y === 0) {
      return this;
    }

    return new SouthFacingRobot(this.x, this.y - 1);
  }

  rotateClockwise(): BaseRobot {
    return new WestFacingRobot(this.x, this.y);
  }

  rotateAntiClockwise(): BaseRobot {
    return new EastFacingRobot(this.x, this.y);
  }
}

export class EastFacingRobot extends BaseRobot {
  get facing() {
    return "EAST";
  }
  move(): BaseRobot {
    if (this.x === 3) {
      return this;
    }

    return new EastFacingRobot(this.x + 1, this.y);
  }

  rotateClockwise(): BaseRobot {
    return new SouthFacingRobot(this.x, this.y);
  }

  rotateAntiClockwise(): BaseRobot {
    return new NorthFacingRobot(this.x, this.y);
  }
}

export class WestFacingRobot extends BaseRobot {
  get facing() {
    return "WEST";
  }
  move(): BaseRobot {
    if (this.x === 0) {
      return this;
    }

    return new WestFacingRobot(this.x - 1, this.y);
  }

  rotateClockwise(): BaseRobot {
    return new NorthFacingRobot(this.x, this.y);
  }

  rotateAntiClockwise(): BaseRobot {
    return new SouthFacingRobot(this.x, this.y);
  }
}

export function Robot() {
  return new NewRobot(0, 0);
}
