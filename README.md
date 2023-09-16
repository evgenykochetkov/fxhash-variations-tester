# fx(hash) variations tester

A script to generate a bunch of variations of your locally running fx(hash) project.

Basically, it

- opens your project in a headless browser
- waits for `fxpreview` call
- saves a screenshot to a specified location
- repeats all the above a bunch of times

## Usage

- clone this repo
- run `npm install` to install [Puppeteer](https://pptr.dev). It may be a bit slow:

  > When you install Puppeteer, it automatically downloads a recent version of Chrome for Testing (~170MB macOS, ~282MB Linux, ~280MB Windows) that is guaranteed to work with Puppeteer. The browser is downloaded to the $HOME/.cache/puppeteer folder by default (starting with Puppeteer v19.0.0).

- edit the constants at the beginning of `index.mjs`
- make sure that your fx(hash) project is running
- run `npm start`
