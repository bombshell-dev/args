import { parseArgs } from "node:util";
import benchmark from "benchmark";
import minimist from "minimist";
import mri from "mri";
import yargs from "yargs-parser";
import { parse as arg } from "../dist/index.js";

const bench = new benchmark.Suite();
const args = [
  "--a=1",
  "-b",
  "--bool",
  "--no-boop",
  "--multi=foo",
  "--multi=baz",
  "-xyz",
];

bench
  .add("args        ", () => arg(args))
  .add("minimist    ", () => minimist(args))
  .add("mri         ", () => mri(args))
  .add("node:util   ", () =>
    parseArgs({
      args,
      strict: false,
      allowNegative: true,
      options: {
        bool: { type: "boolean", short: "b" },
        boop: { type: "boolean" },
        multi: { type: "string" },
      },
    }),
  )
  .add("yargs-parser", () => yargs(args))
  .on("cycle", (e) => console.log(String(e.target)))
  .run();
