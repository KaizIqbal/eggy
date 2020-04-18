import * as chromium from "chrome-aws-lambda";

export async function render(
  srcSvg: string,
  frames: number,
  filePrefix: string
) {
  // Browser & HTML Template instance
  let browser: any;
  let template: string;

  // render Image Config
  let renderImages = {};
  const sizes = [24, 28, 32, 40, 48, 56, 64, 72, 80, 88, 96];

  try {
    // injecting svg file in HTML Template
    template = template.replace("<svginjection>", srcSvg);

    // -------------------------------------------- SETUP BROWSER

    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      ignoreDefaultArgs: process.env.IS_LOCAL ? [" --single-process "] : [],
      defaultViewport: chromium.defaultViewport,
      executablePath: process.env.IS_LOCAL
        ? "/usr/bin/google-chrome-stable"
        : await chromium.executablePath,
      headless: chromium.headless // If you set this to false, the Chrome window will be displayed, so change it if it does not work during development.
    });

    const page = await browser.newPage();
    await page.setContent(template, { waitUntil: "networkidle0" });

    const svgImage = await page.$("svg");

    // -------------------------------------------- RENDER FRAMES

    const images = [];
    for (let index = 1; index <= frames; index++) {
      const image = {};

      // generate filename & rendered image as base64 encoding
      const fileName = `${filePrefix}-${index}.png`;

      const b64string = await svgImage.screenshot({
        omitBackground: true,
        encoding: "base64"
      });
      const Body = Buffer.from(b64string, "base64");

      // setup object
      image["fileName"] = fileName;
      image["mimeType"] = "image/png";
      image["encoding"] = "base64";
      image["Body"] = Body;

      // push details to Object
      images.push(image);

      // Display rendered frame log
      console.log(`Rendered Frame ${index}/${frames}`);
    }

    // save raw images
    renderImages["raw"] = images;

    sizes.forEach(size => {
      let renderSize = renderImages.raw.filter(async image => {
        image.Body = await sharp(image.Body)
          .resize({ height: size, width: size })
          .setEncoding("base64")
          .toBuffer();
        return image;
      });

      renderImages[`${size}x${size}`] = renderSize;
    });

    console.log(renderImages);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
