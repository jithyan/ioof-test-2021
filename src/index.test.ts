import { Robot } from ".";

describe("tests", () => {
  it("test case 1", () => {
    const actual = Robot().place(0, 0, "north").move().report();
    expect(actual).toEqual("0,1,NORTH");
  });

  it("test case 2", () => {
    const actual = Robot().place(0, 0, "NORTH").rotateAntiClockwise().report();
    expect(actual).toEqual("0,0,WEST");
  });

  it("test case 3", () => {
    const actual = Robot()
      .place(1, 2, "east")
      .move()
      .move()
      .rotateAntiClockwise()
      .move()
      .report();
    expect(actual).toEqual("3,3,NORTH");
  });

  describe("initial placement tests", () => {
    it("should ignore all commands until placed", () => {
      const robots = [
        Robot().move(),
        Robot().rotateAntiClockwise(),
        Robot().rotateClockwise(),
        Robot().move().rotateAntiClockwise().rotateClockwise(),
      ];

      expect(
        robots
          .map((r) => r.report())
          .every((report) => report === "NOT YET PLACED")
      ).toEqual(true);
    });
  });

  it("should ignore all bad placement commands", () => {
    const robots = [
      Robot().place(-1, 0, "north"),
      Robot().place(0, -1, "south"),
      Robot().place(5, 0, "north"),
      Robot().place(0, 5, "south"),
      Robot().place(0, 0, ""),
    ];

    expect(
      robots
        .map((r) => r.report())
        .every((report) => report === "NOT YET PLACED")
    ).toEqual(true);
  });

  describe("rotation tests", () => {
    it("when rotating clockwise, it goes from north to east, south, west, north", () => {
      const placedRobot = Robot().place(2, 2, "north");
      const actual = [
        placedRobot.rotateClockwise(),
        placedRobot.rotateClockwise().rotateClockwise(),
        placedRobot.rotateClockwise().rotateClockwise().rotateClockwise(),
        placedRobot
          .rotateClockwise()
          .rotateClockwise()
          .rotateClockwise()
          .rotateClockwise(),
      ];

      const expected = ["2,2,EAST", "2,2,SOUTH", "2,2,WEST", "2,2,NORTH"];

      expect(actual.map((r) => r.report())).toEqual(expected);
    });

    it("when rotating anti-clockwise, it goes from north to west, south, east, north", () => {
      const placedRobot = Robot().place(2, 2, "north");
      const actual = [
        placedRobot.rotateAntiClockwise(),
        placedRobot.rotateAntiClockwise().rotateAntiClockwise(),
        placedRobot
          .rotateAntiClockwise()
          .rotateAntiClockwise()
          .rotateAntiClockwise(),
        placedRobot
          .rotateAntiClockwise()
          .rotateAntiClockwise()
          .rotateAntiClockwise()
          .rotateAntiClockwise(),
      ];

      const expected = ["2,2,WEST", "2,2,SOUTH", "2,2,EAST", "2,2,NORTH"];

      expect(actual.map((r) => r.report())).toEqual(expected);
    });
  });

  describe("movement tests", () => {
    it("should decrement x when moving west", () => {
      const actual = Robot().place(2, 2, "north").rotateAntiClockwise().move();
      expect(actual.report()).toEqual("1,2,WEST");
    });

    it("should decrement y when moving south", () => {
      const actual = Robot()
        .place(2, 2, "north")
        .rotateAntiClockwise()
        .rotateAntiClockwise()
        .move();
      expect(actual.report()).toEqual("2,1,SOUTH");
    });

    it("should increment y when moving north", () => {
      const actual = Robot()
        .place(2, 2, "south")
        .rotateClockwise()
        .rotateClockwise()
        .move();
      expect(actual.report()).toEqual("2,3,NORTH");
    });

    it("should increment x when moving east", () => {
      const actual = Robot().place(2, 2, "north").rotateClockwise().move();
      expect(actual.report()).toEqual("3,2,EAST");
    });

    it("should not fall off table southwards", () => {
      let currentRobot = Robot().place(0, 4, "south");
      new Array(10).fill(0).forEach(() => {
        currentRobot = currentRobot.move();
      });

      expect(currentRobot.move().report()).toEqual("0,0,SOUTH");
    });

    it("should not fall off table eastwards", () => {
      let currentRobot = Robot().place(0, 0, "east");
      new Array(10).fill(0).forEach(() => {
        currentRobot = currentRobot.move();
      });
      expect(currentRobot.move().report()).toEqual("4,0,EAST");
    });

    it("should not fall off table westwards", () => {
      let currentRobot = Robot().place(3, 2, "west");
      new Array(10).fill(0).forEach(() => {
        currentRobot = currentRobot.move();
      });
      expect(currentRobot.move().report()).toEqual("0,2,WEST");
    });
  });
});
