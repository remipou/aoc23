import getData from "./data";

const [_ts, _file, date, test] = process.argv;

type Line = number[];
type History = Line[];

const data: History = getData(date, test)
  .split("\n")
  .map((e) => e.split(" ").map(Number));

console.time("part 1");

const getDiff = (arr: Line): Line =>
  arr.map((e, i, a) => a[i + 1] - e).filter((e) => !isNaN(e));

const isDone = (arr: Line): boolean => arr.every((e) => e === 0);

const extrapolate = (history: History): number => {
  for (let i = history.length - 1; i >= 0; i--) {
    const line = history[i];
    line.push(
      i === history.length - 1
        ? 0
        : (history[i + 1].slice().pop() || 0) + (history[i].slice().pop() || 0)
    );
  }
  return history[0].slice().pop() || 0;
};

const processHistory = (arr: Line): number => {
  let history: History = [arr.slice()];
  let i = 0;
  do {
    history[i + 1] = getDiff(history[i]);
    i++;
  } while (!isDone(history[i]));
  return extrapolate(history);
};

console.log(
  "part 1",
  data.map((e) => processHistory(e)).reduce((prev, curr) => curr + prev, 0)
);
console.timeEnd("part 1");

console.time("part 2");

const testHistory = data[2];

const extrapolateBackwards = (history: History): number => {
  for (let i = history.length - 1; i >= 0; i--) {
    const line = history[i];
    line.unshift(
      i === history.length - 1 ? 0 : history[i][0] - history[i + 1][0]
    );
  }
  return history[0][0];
};

const processHistoryBackwards = (arr: Line): number => {
  let history: History = [arr.slice()];
  let i = 0;
  do {
    history[i + 1] = getDiff(history[i]);
    i++;
  } while (!isDone(history[i]));
  return extrapolateBackwards(history);
};

console.log(
  "part 1",
  data
    .map((e) => processHistoryBackwards(e))
    .reduce((prev, curr) => curr + prev, 0)
);

console.timeEnd("part 2");
