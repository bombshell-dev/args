import { parseArgs } from "node:util";
import minimist from "minimist";
import mri from "mri";
import { test } from "vitest";
import yargs from "yargs-parser";
import { parse } from "../dist/index.js";

const args = [
  "--a=1",
  "-b",
  "--bool",
  "--no-boop",
  "--multi=foo",
  "--multi=baz",
  "-xyz",
];

test("compare argument parsers", async ({ bench }) => {
  await bench.compare(
    bench("@bomb.sh/args", () => parse(args)),
    bench("minimist", () => minimist(args)),
    bench("mri", () => mri(args)),
    bench("node:util", () =>
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
    ),
    bench("yargs-parser", () => yargs(args)),
  );
});
