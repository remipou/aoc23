export type StackItem = number | string;

class Stack {
  data: StackItem[];
  top: number;

  constructor() {
    this.data = [];
    this.top = 0;
  }

  push(element: StackItem): void {
    this.data[this.top] = element;
    this.top = this.top + 1;
  }

  length(): number {
    return this.top;
  }

  peek(): StackItem {
    return this.data[this.top - 1];
  }

  isEmpty(): boolean {
    return this.top === 0;
  }

  pop(): StackItem | undefined {
    if (this.isEmpty() === false) {
      this.top = this.top - 1;
      return this.data.pop();
    }
  }

  popMultiple(n: number): StackItem[] | undefined {
    if (this.top >= n) {
      this.top -= n;
      return this.data.splice(-n, n);
    }
  }

  print() {
    console.log(this.data.reverse());
  }
}

export default Stack;
