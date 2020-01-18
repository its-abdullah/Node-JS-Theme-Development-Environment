const puppeteer = require('puppeteer'); // v 1.1.0
const { URL } = require('url');
const fse = require('fs-extra'); // v 5.0.0
const path = require('path');

async function start(urlToFetch) {
    /* 1 */
    const browser = await puppeteer.launch({
      ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();
  
    /* 2 */
    page.on('response', async (response) => {
      const url = new URL(response.url());
      let fixedPath = url.pathname.replaceAll(':','_');
      let filePath = path.resolve(`./output${fixedPath}`);
      if (path.extname(url.pathname).trim() === '') {
        filePath = `${filePath}/index.html`;
      }
      await fse.outputFile(filePath, await response.buffer());
    });
  
    /* 3 */
    await page.goto(urlToFetch, {
      waitUntil: 'networkidle2'
    });
  
    /* 4 */
    setTimeout(async () => {
      await browser.close();
    }, 60000 * 4);
  }
  
  start('http://https://newtest9.saudi.gov.sa');

  String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};