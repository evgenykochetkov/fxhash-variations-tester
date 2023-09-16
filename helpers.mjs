export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const waitForFxPreviewCall = (page) =>
  new Promise((resolve, reject) => {
    page.on("console", function consoleListener(msg) {
      try {
        console.log(msg.text());

        if (msg.text() === "FXPREVIEW") {
          page.off("console", consoleListener);
          resolve();
        }
      } catch (err) {
        reject(err);
      }
    });
  });
