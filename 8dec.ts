import getData from "./data";

const [_ts, _file, date, test] = process.argv;
const data: number[][] = getData(date, test)
  .split("\n")
  .map((l) => l.split("").map((s) => Number(s)));

const columns: number = data[0].length;
const rows: number = data.length;

interface Coordinates {
  col: number;
  row: number;
}

class Tree {
  coords: Coordinates;
  visible?: boolean;
  score: number;
  height: number;

  constructor(coords: Coordinates, height: number) {
    this.coords = coords;
    this.height = height;
    this.setVisibility();
    this.score = this.calculateScenicScore();
  }

  isEdge(): boolean {
    return (
      this.coords.col === 0 ||
      this.coords.row === 0 ||
      this.coords.col === columns - 1 ||
      this.coords.row === rows - 1
    );
  }

  isVisibleFromLeft(): boolean {
    for (let x = 0; x < this.coords.col; x++) {
      if (data[this.coords.row][x] >= this.height) {
        return false;
      }
    }
    return true;
  }

  isVisibleFromRight(): boolean {
    for (let x = columns - 1; x > this.coords.col; x--) {
      if (data[this.coords.row][x] >= this.height) {
        return false;
      }
    }
    return true;
  }

  isVisibleFromTop(): boolean {
    for (let y = 0; y < this.coords.row; y++) {
      if (data[y][this.coords.col] >= this.height) {
        return false;
      }
    }
    return true;
  }

  isVisibleFromBottom(): boolean {
    for (let y = rows - 1; y > this.coords.row; y--) {
      if (data[y][this.coords.col] >= this.height) {
        return false;
      }
    }
    return true;
  }

  isVisible(): boolean {
    if (this.isEdge()) return true;
    return (
      this.isVisibleFromBottom() ||
      this.isVisibleFromTop() ||
      this.isVisibleFromLeft() ||
      this.isVisibleFromRight()
    );
  }

  setVisibility(): void {
    this.visible = this.isVisible();
  }

  lookUp(): number {
    let trees: number = 0;
    for (let y = this.coords.row - 1; y >= 0; y--) {
      trees++;
      if (data[y][this.coords.col] >= this.height) {
        return trees;
      }
    }
    return trees;
  }

  lookDown(): number {
    let trees: number = 0;
    for (let y = this.coords.row + 1; y < rows; y++) {
      trees++;
      if (data[y][this.coords.col] >= this.height) {
        return trees;
      }
    }
    return trees;
  }

  lookLeft(): number {
    let trees: number = 0;
    for (let x = this.coords.col - 1; x >= 0; x--) {
      trees++;
      if (data[this.coords.row][x] >= this.height) {
        return trees;
      }
    }
    return trees;
  }

  lookRight(): number {
    let trees: number = 0;
    for (let x = this.coords.col + 1; x < columns; x++) {
      trees++;
      if (data[this.coords.row][x] >= this.height) {
        return trees;
      }
    }
    return trees;
  }

  calculateScenicScore(): number {
    return this.lookUp() * this.lookDown() * this.lookRight() * this.lookLeft();
  }
}

console.time("both parts");

let part1 = 0;
const scores: number[] = [];
for (let y = 0; y < rows; y++) {
  for (let x = 0; x < columns; x++) {
    const t = new Tree({ col: x, row: y }, data[y][x]);
    if (t.isVisible()) {
      part1++;
    }
    scores.push(t.score);
  }
}
const part2 = Math.max(...scores);

console.timeEnd("both parts");
console.log("part 1", part1);

console.log("part 2", part2);
