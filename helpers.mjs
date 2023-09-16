export const waitForFxPreviewCall = (page) =>
  Promise.race([
    // in `fxhash-boilerplate` and `fxhash-simple-boilerplate`, `fxpreview` function does a simple console.log:
    // https://github.com/fxhash/fxhash-boilerplate/blob/1198391d5f33fe8da3a46e0d89fdabc8ed85f6a8/lib/files/snippet.js#L41-L45
    // https://github.com/fxhash/fxhash-simple-boilerplate/blob/2003f7dae8ea64f38dc575864fcdbedd03a05925/index.html#L35-L39
    new Promise((resolve, reject) => {
      page.on("console", function consoleListener(msg) {
        try {
          if (msg.text() === "FXPREVIEW") {
            page.off("console", consoleListener);
            resolve();
          }
        } catch (err) {
          reject(err);
        }
      });
    }),
    // in `params-boilerplate`, it fires an event
    // https://github.com/fxhash/params-boilerplate/blob/a3574ca667e3edcdb9811d27f160b0efb84a377c/project/public/index.html#L32-L35
    page.evaluate(
      () =>
        new Promise((resolve) => {
          window.addEventListener("fxhash-preview", () => {
            resolve();
          });
        })
    ),
  ]);
