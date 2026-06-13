import { chromium } from 'playwright';

async function scrape() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    await page.goto('https://jobs.apple.com/en-us/details/200659093/computer-vision-research-engineer-apple-maps-3d-vision-team', { waitUntil: 'networkidle' });
    const title = await page.title();
    const content = await page.textContent('body');
    const html = await page.content();
    console.log(JSON.stringify({ title, content, html }));
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

scrape();
