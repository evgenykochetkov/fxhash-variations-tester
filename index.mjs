import path from "path";
import puppeteer from "puppeteer";
import { waitForFxPreviewCall } from "./helpers.mjs";

// make sure to keep `preview=1` param when editing the URL
// if you call `fxpreview` only is `isFxpreview` is true
const PROJECT_URL = "http://localhost:5173?preview=1";
const ITERATIONS_COUNT = 16;
const WINDOW_WIDTH = 1024;
const WINDOW_HEIGHT = 1024;
const RESULTS_PATH = "./results";

const browser = await puppeteer.launch({
  headless: "new",
  args: [`--window-size=${WINDOW_WIDTH},${WINDOW_HEIGHT}`],
  defaultViewport: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
  },
});

const page = await browser.newPage();

for (let i = 0; i < ITERATIONS_COUNT; i++) {
  await page.goto(PROJECT_URL);

  await waitForFxPreviewCall(page);

  const seed = await page.evaluate(() => window.fxhash);

  const filename = `${Date.now()}_${seed}.png`;

  await page.screenshot({
    path: path.join(RESULTS_PATH, filename),
  });

  console.log(
    `[${i}/${ITERATIONS_COUNT}] saved ${filename} to ${RESULTS_PATH}`
  );
}

await browser.close();
