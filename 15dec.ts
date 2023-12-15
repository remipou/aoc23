import getData from "./data";
import { Stack, prettyLog } from "./helpers";

const [_ts, _file, date, test] = process.argv;
const data: string[] = getData(date, test).split(",");

const hashChar = (start: number, char: string): number =>
  ((start + char.charCodeAt(0)) * 17) % 256;

const hashWord = (word: string): number => {
  let start: number = 0;
  for (let i = 0; i < word.length; i++) {
    start = hashChar(start, word[i]);
  }
  return start;
};

const getLength = (string: string): number => Number(string.split("=")[1]);

const getLabel = (string: string): string => string.split(/=|-/)[0];

console.time("part 1");
console.timeEnd("part 1");
console.log(
  "part 1",
  data.reduce((prev, curr) => prev + hashWord(curr), 0)
);

console.time("part 2");

interface Lens {
  label: string;
  length: number;
}
type OP = "add" | "remove";

const boxes: Array<Stack<Lens>> = [];

const processLens = (string: string): void => {
  const operation: OP = string.indexOf("=") > -1 ? "add" : "remove";
  const label = getLabel(string);
  const length = getLength(string);
  const boxIndex = hashWord(label);

  if (!boxes[boxIndex]) {
    boxes[boxIndex] = new Stack<Lens>();
  }

  if (operation === "add") {
    const item = { label, length };
    const index = boxes[boxIndex].data.findIndex((e) => e.label === label);
    if (index > -1) {
      boxes[boxIndex].data[index] = item;
    } else {
      boxes[boxIndex].push(item);
    }
  } else if (operation === "remove") {
    const index = boxes[boxIndex].data.findIndex(
      (e: Lens) => e.label === label
    );
    if (index > -1) {
      const tmp = boxes[boxIndex].popMultiple(
        boxes[boxIndex].data.length - 1 - index
      );
      if (tmp) {
        boxes[boxIndex].pop();
        for (let i = 0; i < tmp.length; i++) {
          boxes[boxIndex].push(tmp[i]);
        }
      }
    }
  }
};

const focusingPower = (lens: Lens, boxIndex: number): number => {
  const lensIndex = boxes[boxIndex].data.findIndex(
    (e) => e.label === lens.label
  );
  const length = boxes[boxIndex].data[lensIndex].length;
  return (1 + boxIndex) * (1 + lensIndex) * length;
};

for (let i = 0; i < data.length; i++) {
  processLens(data[i]);
}

const focusingPowers: number[] = [];

for (let i = 0; i < boxes.length; i++) {
  for (let j = 0; j < (boxes[i]?.data.length || 0); j++) {
    focusingPowers.push(focusingPower(boxes[i].data[j], i));
  }
}

console.timeEnd("part 2");
console.log(
  "part 2",
  focusingPowers.reduce((prev, curr) => prev + curr, 0)
);
