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

  abstract move(): BaseRobot;
  abstract place(x: number, y: number, facing: string): BaseRobot;
  abstract rotateClockwise(): BaseRobot;
  abstract rotateAntiClockwise(): BaseRobot;
}

export class NewRobot extends BaseRobot {
  report(): string {
    return "";
  }
  move(): BaseRobot {
    return this;
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
  rotateClockwise(): BaseRobot {
    return this;
  }
  rotateAntiClockwise(): BaseRobot {
    return this;
  }
}

export class NorthFacingRobot extends BaseRobot {
  move(): BaseRobot {
    throw new Error("Method not implemented.");
  }
  place(x: number, y: number, facing: string): BaseRobot {
    throw new Error("Method not implemented.");
  }
  rotateClockwise(): BaseRobot {
    throw new Error("Method not implemented.");
  }
  rotateAntiClockwise(): BaseRobot {
    throw new Error("Method not implemented.");
  }
}

export class SouthFacingRobot extends BaseRobot {
  move(): BaseRobot {
    throw new Error("Method not implemented.");
  }
  place(x: number, y: number, facing: string): BaseRobot {
    throw new Error("Method not implemented.");
  }
  rotateClockwise(): BaseRobot {
    throw new Error("Method not implemented.");
  }
  rotateAntiClockwise(): BaseRobot {
    throw new Error("Method not implemented.");
  }
}

export class EastFacingRobot extends BaseRobot {
  move(): BaseRobot {
    throw new Error("Method not implemented.");
  }
  place(x: number, y: number, facing: string): BaseRobot {
    throw new Error("Method not implemented.");
  }
  rotateClockwise(): BaseRobot {
    throw new Error("Method not implemented.");
  }
  rotateAntiClockwise(): BaseRobot {
    throw new Error("Method not implemented.");
  }
}

export class WestFacingRobot extends BaseRobot {
  move(): BaseRobot {
    throw new Error("Method not implemented.");
  }
  place(x: number, y: number, facing: string): BaseRobot {
    throw new Error("Method not implemented.");
  }
  rotateClockwise(): BaseRobot {
    throw new Error("Method not implemented.");
  }
  rotateAntiClockwise(): BaseRobot {
    throw new Error("Method not implemented.");
  }
}
