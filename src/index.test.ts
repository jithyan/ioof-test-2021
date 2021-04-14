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
});
