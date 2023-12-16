import getData from "./data";

const [_ts, _file, date, test] = process.argv;

type T = string[][];
type E = number[][];
type POS = { col: number; row: number };
type MOVE = { col: number; row: number };

const data: T = getData(date, test)
  .split("\n")
  .map((l) => l.split(""));

const MAX_ROWS = data.length;
const MAX_COLS = data[0].length;

const visualize = (d: T | E): void =>
  console.log(d.map((e: number[] | string[]) => e.join("")).join("\n") + "\n");

const energy: E = data.map((row: string[]) => row.slice().map(() => 0));
energy[0][0] = 1;

// visualize(data);

const splitsUsed: POS[] = [];
const isSplitAlreadyUsed = (position: POS): boolean =>
  Boolean(
    splitsUsed.find(
      (s: POS) => s.col === position.col && s.row === position.row
    )
  );

const move = async (currentPosition: POS, direction: MOVE): Promise<void> => {
  if (direction.col === -1 && currentPosition.col === 0) {
    return;
  }
  if (direction.col === 1 && currentPosition.col === MAX_COLS - 1) {
    return;
  }
  if (direction.row === -1 && currentPosition.row === 0) {
    return;
  }
  if (direction.row === 1 && currentPosition.row === MAX_ROWS - 1) {
    return;
  }

  const row: number = direction.row + currentPosition.row;
  const col: number = direction.col + currentPosition.col;
  const position = { col, row };
  energy[row][col] = 1;
  const next = data[row][col];

  if (
    next === "." ||
    (next === "|" && direction.row !== 0) ||
    (next === "-" && direction.col !== 0)
  ) {
    await move(position, direction);
    return;
  }

  if (next === "/") {
    await move(position, { col: -direction.row, row: -direction.col });
    return;
  }

  if (next === "\\") {
    await move(position, { col: direction.row, row: direction.col });
    return;
  }

  if (next === "|" && !isSplitAlreadyUsed(position)) {
    splitsUsed.push(position);
    await move(position, { col: 0, row: -1 });
    await move(position, { col: 0, row: 1 });
    return;
  }

  if (next === "-" && !isSplitAlreadyUsed(position)) {
    splitsUsed.push(position);
    await move(position, { col: -1, row: 0 });
    await move(position, { col: 1, row: 0 });
    return;
  }
};

const calculateEnergy = (): number =>
  energy
    .map((r) => r.reduce((prev, curr) => prev + curr, 0))
    .reduce((prev, curr) => prev + curr, 0);

const testMove = async (start: POS, direction: MOVE): Promise<number> => {
  await move(start, direction);
  return calculateEnergy();
};

const resetEnergy = async (): Promise<void> => {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
      energy[i][j] = 0;
    }
  }
};

const runPart1 = async () => {
  console.time("part 1");
  const res = await testMove({ col: -1, row: 0 }, { col: 1, row: 0 });
  console.timeEnd("part 1");
  console.log("part 1", res);
};
runPart1();

const allEnergies: number[] = [];

const runPart2 = async () => {
  console.time("part 2");

  for (let col = 0; col < MAX_COLS; col++) {
    await resetEnergy();
    const test = await testMove({ col, row: -1 }, { col: 0, row: 1 });
    allEnergies.push(test);

    await resetEnergy();
    const test2 = await testMove({ col, row: MAX_ROWS }, { col: 0, row: -1 });
    allEnergies.push(test2);
  }

  for (let row = 0; row < MAX_ROWS; row++) {
    await resetEnergy();
    const test = await testMove({ col: -1, row }, { col: 1, row: 0 });

    allEnergies.push(test);

    await resetEnergy();
    const test2 = await testMove({ col: MAX_COLS, row }, { col: -1, row: 0 });
    allEnergies.push(test2);
  }
  console.timeEnd("part 2");
  console.log("part 2", Math.max(...allEnergies));
};
runPart2();
