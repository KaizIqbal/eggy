import " source-map-support/register ";
import { Handler } from "aws-lambda";
import * as chromium from "chrome-aws-lambda";

export const render: Handler = async (_event, _context) => {
  let result: any;
  let browser: any;

  try {
    // The binary installed by chrome-aws-lambda doesn't work on Windows
    // When running locally, substitute Chrome which is normally installed
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      ignoreDefaultArgs: process.env.IS_LOCAL ? [" --single-process "] : [],
      defaultViewport: chromium.defaultViewport,
      executablePath: process.env.IS_LOCAL
        ? "/usr/bin/google-chrome-stable"
        : await chromium.executablePath,
      headless: false // If you set this to false, the Chrome window will be displayed, so if it does not work during development it is better to change it
    });

    const page = await browser.newPage();

    await page.goto("https://example.com");

    result = await page.title();
    console.log(result);
  } finally {
    if (browser) {
      await browser.close();
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Title: $ { result } `
      },
      null,
      2
    )
  };
};
