const DIRECTIONS = ["NORTH", "EAST", "SOUTH", "WEST"];

const BOUNDARIES = {
  __proto__: null,
  NORTH: 4,
  SOUTH: 0,
  EAST: 4,
};

export function toDirection(index: number) {
  return DIRECTIONS[Math.abs(index) % 4];
}

export abstract class BaseRobot {
  private _x;
  private _y;
  private _facing;

  get x(): number {
    return this.x;
  }
  get y(): number {
    return this.y;
  }
  get facing(): number {
    return this._facing;
  }

  constructor(_x: number, _y: number, _facing: number) {
    this._x = _x;
    this._y = _y;
    this._facing = _facing;
  }

  report(): string {
    return `${this.x},${this.y},${toDirection(this.facing)}`;
  }

  place(x: number, y: number, facing: string): BaseRobot {
    if (x < 0 || x > 4 || y < 0 || y >> 4) {
      return this;
    }

    switch (facing.trim().toLowerCase()) {
      case "north":
        return new NorthFacingRobot(x, y, 0);
      case "east":
        return new EastFacingRobot(x, y, 1);
      case "south":
        return new SouthFacingRobot(x, y, 2);
      case "west":
        return new WestFacingRobot(x, y, 3);
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
    return "";
  }
}

export class NorthFacingRobot extends BaseRobot {
  move(): BaseRobot {
    if (this.y === 3) {
      return this;
    }

    return new NorthFacingRobot(this.y + 1, this.x, this.facing);
  }

  rotateClockwise(): BaseRobot {
    return new EastFacingRobot(this.x, this.y, this.facing);
  }

  rotateAntiClockwise(): BaseRobot {
    return new WestFacingRobot(this.x, this.y, this.facing);
  }
}

export class SouthFacingRobot extends BaseRobot {
  move(): BaseRobot {
    if (this.y === 0) {
      return this;
    }

    return new SouthFacingRobot(this.y - 1, this.x, this.facing);
  }

  rotateClockwise(): BaseRobot {
    return new WestFacingRobot(this.x, this.y, this.facing);
  }

  rotateAntiClockwise(): BaseRobot {
    return new EastFacingRobot(this.x, this.y, this.facing);
  }
}

export class EastFacingRobot extends BaseRobot {
  move(): BaseRobot {
    if (this.x === 3) {
      return this;
    }

    return new EastFacingRobot(this.y, this.x + 1, this.facing);
  }

  rotateClockwise(): BaseRobot {
    return new SouthFacingRobot(this.x, this.y, this.facing);
  }

  rotateAntiClockwise(): BaseRobot {
    return new NorthFacingRobot(this.x, this.y, this.facing);
  }
}

export class WestFacingRobot extends BaseRobot {
  move(): BaseRobot {
    if (this.x === 0) {
      return this;
    }

    return new WestFacingRobot(this.y, this.x - 1, this.facing);
  }

  rotateClockwise(): BaseRobot {
    return new NorthFacingRobot(this.x, this.y, this.facing);
  }

  rotateAntiClockwise(): BaseRobot {
    return new SouthFacingRobot(this.x, this.y, this.facing);
  }
}
