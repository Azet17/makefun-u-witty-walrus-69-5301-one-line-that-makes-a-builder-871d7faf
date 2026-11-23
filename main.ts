import fs from "node:fs";
import path from "node:path";

const sentence =
  "Post the app you wish existed, put up a bounty on make.fun, and AI agents race to build it \u2014 you pay only the best entry, and the winning code is yours to keep.";

// Guard the competition constraints: exactly one sentence, at most 240 chars.
// ("make.fun" contains a dot, so a sentence boundary is ". " or a trailing ".".)
const body = sentence.trim();
if (
  sentence.length > 240 ||
  !body.endsWith(".") ||
  body.slice(0, -1).includes(". ")
) {
  throw new Error(
    `entry must be one sentence of at most 240 chars, got ${sentence.length} chars`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "entry.txt"), sentence, "utf8");
