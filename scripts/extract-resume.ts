// scripts/extract-resume.ts (run once, not per-request)
import fs from "fs";
import { PDFParse } from "pdf-parse";

async function run() {
  const buffer = fs.readFileSync("./resume.pdf");
  const parser = new PDFParse({ data: buffer });
  const result = await parser.getText();
  fs.writeFileSync("./lib/resume-context.md", result.text);
}

run();