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

console.time("part 2"); // from https://topaz.github.io/paste/#XQAAAQDvAwAAAAAAAAAyngpEyqrozfNdQRbrzFE3RH6xB9G5bS3TJqaPjFLD0lQQF9p/r5TBc28zT3NatwnWoOPTxqjGP48VrlMVLx/uwxBDcbNQ0yltqymAELLWzlPwyOesWiTawgiG158Lue4YxNraPZgYyqVmAh6VE1MY+8yozdTqqxtbelprkOQpI4Ke3cZoGe/w3NQ8Dz+BKyEwG8ms4UxkypmRxHemOT//rtPGZZe+T4QEBk9vTcnXKnaZsF3WQvSJ/qGdJwSWyxmAebD0C40s9laT2NBawjLxaMVhJNvGMDH8H0G7ZSKMD78/P5jxc1hMJPYZcU2cbRcoRqrYDrsTMvilcPmmsigBfF1k7LY0QTUcbd8vLc7wGgp/CZm9E3XSZWKp+bU0kSwULRCKxtOeFmCt4Nn/ykhZRCGquAmSZatzXKLUCKTCbdbPXfgnXPyf8o0DfbJsobMgeAhsJDgyCDFC0UChj489QSteRKcS9a49m+STA5h9WkzueOwXDO98GCg4Eyrp8FNHqDGZlAOXjmuvsD5J5QItQFRtQOarwBQ3SO//ZJBpo4VrFrsJ4PJ0O7AZKQ72MsCwEQ5B5471U3cocuZXI/8VjLK/f1Q55ea0iNvOvjrfjg7dM3xmUkAutUruSe59p0/tQgLb8sFG4bE0d1lwQPxXX9eRgEhvrSB7H6YdbalfwvZ6v1c09nyf3Bn19md6TP+vmPt+

const part2 = (input: string): number => {
  const lines = input.split("\n");
  const nodes: Record<string, { L: string; R: string }> = {};

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    nodes[line.substring(0, 3)] = {
      L: line.substring(7, 10),
      R: line.substring(12, 15),
    };
  }

  const instructions = lines[0].split("") as Array<"R" | "L">;
  const starts: string[] = [];
  for (const key in nodes) {
    if (Object.prototype.hasOwnProperty.call(nodes, key) && key[2] === "A") {
      starts.push(key);
    }
  }

  const lengths = starts.map((start) => {
    let steps = 0;
    let curr = start;
    for (let i = 0; curr[2] !== "Z"; i = (i + 1) % instructions.length) {
      steps++;
      curr = nodes[curr][instructions[i]];
    }
    return steps;
  });

  const gcd = (a: number, b: number) => {
    while (b > 0) [a, b] = [b, a % b];
    return a;
  };
  const lcm = (a: number, b: number) => (a * b) / gcd(a, b);
  return lengths.reduce((n, x) => lcm(x, n), 1);
};

console.timeEnd("part 2");
console.log("part2", part2(getData(date, test)));
