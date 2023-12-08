import getData from "./data";

const [_ts, _file, date, test] = process.argv;
const raw: Array<any> = getData(date, test).split("\n\n");
const instructions = raw[0];

type P = string;
type I = {
  left: string;
  right: string;
};
const map = new Map<P, I>();
raw[1].split("\n").map((line: string) => {
  const matches = /^([A-Z0-9]{3}) = \(([A-Z0-9]{3}), ([A-Z0-9]{3})\)$/g.exec(
    line
  );
  if (matches) {
    const [_, elt, left, right] = matches;
    map.set(elt, { left, right });
  }
});

console.time("part 1");

const getDirection = (index: number): string =>
  instructions[index % instructions.length];

const runPart1 = () => {
  let position = "AAA";
  let step = 0;
  while (position !== "ZZZ") {
    const next = map.get(position);
    if (getDirection(step) === "L") {
      position = next!.left;
    } else {
      position = next!.right;
    }
    step++;
  }

  console.timeEnd("part 1");
  console.log("part 1", step);
};
// runPart1();

console.time("part 2");

const positions: string[] = [...map]
  .filter(([k, v]) => k[2] === "A")
  .map((e) => e[0]);
let step = 0;

const allPositionsOk = () => positions.every((e) => e[2] === "Z");

const move = (index: number): void => {
  const next = map.get(positions[index]);
  let position: string = "";
  if (getDirection(step) === "L") {
    position = next!.left;
  } else {
    position = next!.right;
  }
  positions[index] = position;
};

while (!allPositionsOk()) {
  for (let i = 0; i < positions.length; i++) {
    move(i);
  }
  step++;
}

console.timeEnd("part 2");
console.log("part2", step);
