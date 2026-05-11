import { compile } from "@mdx-js/mdx";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

const fixture = [
  "| Step | Formula | Meaning |",
  "| --- | --- | --- |",
  "| derivative | $x^2$ | rendered inline math inside a table cell |",
  "| vector | `v_1=w_1` | inline code survives table parsing |",
  "",
].join("\n");

const compiled = String(
  await compile(fixture, {
    jsx: true,
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [rehypeKatex],
  }),
);

const checks = [
  ["GFM table parsed", compiled.includes("_components.table")],
  ["table header parsed", compiled.includes("_components.thead")],
  ["table body parsed", compiled.includes("_components.tbody")],
  ["math inside table rendered", compiled.includes('className="katex"')],
  ["inline code inside table preserved", compiled.includes("_components.code")],
];

const failed = checks.filter(([, passed]) => !passed);

if (failed.length > 0) {
  console.error("MDX table rendering regression detected:");
  for (const [name] of failed) {
    console.error(`- ${name}`);
  }
  process.exit(1);
}

console.log("MDX table rendering check passed.");
