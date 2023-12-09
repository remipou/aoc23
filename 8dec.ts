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

const allSteps: number[] = [];

function lcm(a: number, b: number): number {
  return (a / gcd(a, b)) * b;
}

function gcd(a: number, b: number): number {
  var t = 0;
  a < b && ((t = b), (b = a), (a = t));
  t = a % b;
  return t ? gcd(b, t) : b;
}

// const lcm = (arr: number[]) => {
//   // Return the Smallest Common Multiple for pair of Input Numbers.

//   const [min, max] = arr.sort((a, b) => a - b);
//   // Sorting Input Array to give min and max values for the range

//   const range = Array(max - min + 1)
//     .fill(0)
//     .map((_, i) => i + min);
//   // Initialize the Array

//   let prodAll = range.reduce((product, number) => product * number);
//   // Finding the product of all numbers which is a gauranteed multiple of the range

//   let res = Array(prodAll / max)
//     .fill(0)
//     .map((_, i) => (i + 1) * max) // Initialize an Array of all the multiples of the 'max' number upto 'prodAll'
//     .find((mulp) => range.every((val) => mulp % val === 0)); // check if any number meets the divisiblable criteria sooner then 'prodAll'

//   return res;
// };

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
    if (positions[i][2] !== "Z") {
      move(i);
    }
    if (positions[i][2] === "Z" /*&& !allSteps.includes(step + 1)*/) {
      allSteps.push(step + 1);
    }
  }
  step++;
}

console.timeEnd("part 2");
console.log(
  "part2",
  allSteps.reduce((acc, cur) => lcm(acc, cur), 1)
);
