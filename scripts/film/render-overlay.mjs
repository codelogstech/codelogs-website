// Render a film's overlay (scripts/film/overlay.html) to a transparent PNG per
// frame, for scripts/build-film.sh to lay over the footage.
//
//   node scripts/film/render-overlay.mjs <out dir> <fade> <len,len,…> [fps] [film] [loop]
//
// Needs Playwright. The site doesn't depend on it, so point PLAYWRIGHT_MODULE at
// an install (build-film.sh defaults to the global one).
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");

const [outDir, fade, lens, fps = "25", film = "home", loop = "1"] = process.argv.slice(2);
if (!outDir || !fade || !lens) {
  console.error("usage: render-overlay.mjs <out dir> <fade> <len,len,…> [fps] [film] [loop]");
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });

const url = pathToFileURL(join(dirname(fileURLToPath(import.meta.url)), "overlay.html"));
url.search = new URLSearchParams({ lens, fade, film, loop }).toString();

const L = lens.split(",").map(Number);
const total = L.reduce((a, l) => a + l, 0) - Number(fade) * (L.length - 1);
const frames = Math.round(total * Number(fps));
const WORKERS = 6;

const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || "chrome" });
let done = 0;
await Promise.all(
  Array.from({ length: WORKERS }, async (_, w) => {
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
    page.on("pageerror", (e) => { console.error(`overlay.html: ${e.message}`); process.exit(1); });
    await page.goto(url.href);
    await page.evaluate(() => document.fonts.ready);
    for (let f = w; f < frames; f += WORKERS) {
      await page.evaluate((t) => window.renderAt(t), f / Number(fps));
      await page.screenshot({ path: join(outDir, `${String(f).padStart(5, "0")}.png`), omitBackground: true });
      if (++done % 100 === 0) process.stdout.write(`  ${done}/${frames} frames\n`);
    }
  }),
);
await browser.close();
console.log(`Overlay: ${frames} frames (${total.toFixed(2)} s)`);
