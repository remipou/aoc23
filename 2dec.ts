import fs from "fs";

// const data: string = fs.readFileSync("./data/2dec.txt", "utf8");
const data: string = fs.readFileSync("./samples/2dec.txt", "utf8");

const game: Array<Array<string>> = data.split("\n").map((r) => r.split(" "));
console.log(game);
