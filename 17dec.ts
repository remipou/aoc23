import getData from "./data";

const [_ts, _file, date, test] = process.argv;
const data: number[][] = getData(date, test)
  .split("\n")
  .map((e) => e.split("").map(Number));

/*
  https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
  
  function Dijkstra(Graph, source):
      
      for each vertex v in Graph.Vertices:
          dist[v] ← INFINITY
          prev[v] ← UNDEFINED
          add v to Q
      dist[source] ← 0
      
      while Q is not empty:
          u ← vertex in Q with min dist[u]
          remove u from Q
          
          for each neighbor v of u still in Q:
              alt ← dist[u] + Graph.Edges(u, v)
              if alt < dist[v]:
                  dist[v] ← alt
                  prev[v] ← u

      return dist[], prev[]
*/

type VERTEX = {
  heatLoss: number;
  col: number;
  row: number;
  dirCol: number;
  dirRow: number;
  length: number;
};

const source = {
  heatLoss: 0,
  col: 0,
  row: 0,
  dirCol: 0,
  dirRow: 0,
  length: 0,
};
const queue: VERTEX[] = [];
const dist = new Map<string, number>();
const prev = new Map<string, number | undefined>();

for (let row = 0; row < data.length; row++) {
  for (let col = 0; col < data[row].length; col++) {
    queue.push({
      heatLoss: data[row][col],
      col,
      row,
      dirCol: 0,
      dirRow: 0,
      length: 0,
    });
    dist.set(`${row}_${col}`, Infinity);
    prev.set(`${row}_${col}`, undefined);
  }
}

while (queue.length) {
  const u: VERTEX = queue.sort((a, b) => a.heatLoss - b.heatLoss).pop()!;
}

console.time("part 1");
console.timeEnd("part 1");
// console.log(part1);

console.time("part 2");
console.timeEnd("part 2");
// console.log(part2);
