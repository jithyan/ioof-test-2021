import { IRobot, Robot } from "./robot";
import { createInterface } from "readline";

let robot: IRobot = Robot();

const unrecognized = (command: string) => {
  console.error("Unrecognized or invalid command");
  return robot;
};
const move = (command: string) => robot.move();
const left = (command: string) => robot.rotateAntiClockwise();
const right = (command: string) => robot.rotateClockwise();
const place = (command: string) => {
  const { x, y, facing } = parsePlaceCommand(command);
  return (!Boolean(x) && x !== 0) ||
    (!Boolean(y) && y !== 0) ||
    !Boolean(facing)
    ? unrecognized(command)
    : robot.place(x, y, facing);
};
const report = (command: string) => {
  console.log(robot.report());
  return robot;
};

var rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on("line", function (line) {
  const cleanedLine = line?.trim().toLowerCase() ?? "";

  if (cleanedLine.startsWith("move")) {
    robot = move(cleanedLine);
  } else if (cleanedLine.startsWith("left")) {
    robot = left(cleanedLine);
  } else if (cleanedLine.startsWith("right")) {
    robot = right(cleanedLine);
  } else if (cleanedLine.startsWith("report")) {
    robot = report(cleanedLine);
  } else if (cleanedLine.startsWith("place")) {
    robot = place(cleanedLine);
  } else {
    robot = unrecognized(cleanedLine);
  }
});

console.log("Ready to start");

function parsePlaceCommand(command: string) {
  const a = /^place (?<x>\d)(?<y>,\d)(?<facing>,(north|south|west|east))/gi.exec(
    command
  );
  const { x = "", y = "", facing = "" } = a?.groups ?? {};
  const xNum = parseInt(x.replace(",", "").trim());
  const yNum = parseInt(y.replace(",", "").trim());
  const cleanedFacing = facing.replace(",", "").trim();

  return { x: xNum, y: yNum, facing: cleanedFacing };
}
