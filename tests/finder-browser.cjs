// Browser checks use the real finder form and script with isolated product fixtures.
// Requires Playwright and Chromium; no Shopify store or network requests are used.
const { chromium } = require('playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const root = require('node:path').resolve(__dirname, '..') + '/';
const ui = JSON.parse(fs.readFileSync(root + 'locales/en.default.json')).ui;
const liquid = fs.readFileSync(root + 'sections/finder.liquid', 'utf8');
const form = liquid.match(/<form[\s\S]*?<\/form>/)[0]
  .replace(/{% if recommendation_count == 0 %} disabled{% endif %}/g, '')
  .replace(/{%[\s\S]*?%}/g, '')
  .replace(/{{ 'ui\.([^']+)' \| t }}/g, (_, key) => ui[key])
  .replace(/{{ localization.country.currency.iso_code }}/g, 'AUD');
const rows = [
  { id: 'fits', price: 25000 },
  { id: 'too-expensive', price: 25001 },
  { id: 'advanced', skill: 2 },
  { id: 'sold-out', available: 'false' },
  { id: 'wrong-category', category: 'car' },
  { id: 'wrong-space', space: 'water' },
  { id: 'wrong-goal', goal: 'speed' },
  { id: 'no-price', price: 0 },
  { id: 'fraction', price: 29 },
];
const cards = rows.map(row => {
 const data = { category: 'plane', skill: 0, space: 'field', goal: 'learn', available: 'true', price: 10000, ...row };
 return `<article id="${row.id}" data-finder-item ${Object.entries(data).filter(([k])=>k!=='id').map(([k,v])=>`data-${k}="${v}"`).join(' ')}>Test fixture: ${row.id}</article>`;
}).join('');
(async () => {
 const browser = await chromium.launch({headless: true, executablePath: process.env.CHROMIUM_EXECUTABLE_PATH || '/usr/bin/chromium'});
 try {
  const page = await browser.newPage();
  const errors=[]; page.on('pageerror', e=>errors.push(e.message));
  await page.setContent(`<style>${fs.readFileSync(root+'assets/theme.css','utf8')}</style><section class="wrap section">${form}<p data-finder-status data-prompt="Choose preferences" data-match="Matches:" data-empty="No matches"></p>${cards}</section>`);
  await page.addScriptTag({path:root+'assets/theme.js'});
  const visible = () => page.locator('[data-finder-item]').evaluateAll(items=>items.filter(x=>!x.hidden).map(x=>x.id));
  assert.deepEqual(await visible(), []);
  assert.equal(await page.locator('[data-finder-status]').textContent(), 'Choose preferences');
  await page.getByRole('button', {name:'Show my matches'}).click();
  assert.deepEqual(await visible(), ['fits','fraction']);
  assert.equal(await page.locator('[data-finder-status]').textContent(), 'Matches: 2');
  await page.evaluate(()=>{document.querySelector('#fraction').dataset.price='113';});
  await page.locator('[name=budget]').fill('1.13');
  await page.getByRole('button', {name:'Show my matches'}).click();
  assert.deepEqual(await visible(), ['fraction']);
  await page.locator('[name=budget]').fill('1.12');
  await page.getByRole('button', {name:'Show my matches'}).click();
  assert.deepEqual(await visible(), []);
  assert.equal(await page.locator('[data-finder-status]').textContent(), 'No matches');
  await page.locator('[name=budget]').fill('250');
  await page.locator('[name=skill]').selectOption('2');
  await page.getByRole('button', {name:'Show my matches'}).click();
  assert.deepEqual(await visible(), ['fits','advanced','fraction']);
  await page.evaluate(()=>document.dispatchEvent(new CustomEvent('shopify:section:load',{bubbles:true})));
  assert.deepEqual(await visible(), ['fits','advanced','fraction']);
  const availableSpaces = () => page.locator('[name=space] option').evaluateAll(options => options.filter(option => !option.hidden && !option.disabled).map(option => option.value));
  assert.deepEqual(await availableSpaces(), ['field', 'hall']);
  await page.locator('[name=category]').selectOption('boat');
  assert.deepEqual(await availableSpaces(), ['water']);
  assert.equal(await page.locator('[name=space]').inputValue(), 'water');
  assert.deepEqual(await visible(), []);
  assert.equal(await page.locator('[data-finder-status]').textContent(), 'Choose preferences');
  await page.locator('[name=category]').selectOption('car');
  assert.deepEqual(await availableSpaces(), ['ground', 'hall']);
  assert.equal(await page.locator('[name=space]').inputValue(), 'ground');
  await page.locator('[name=space]').selectOption('hall');
  await page.locator('[name=category]').selectOption('plane');
  assert.deepEqual(await availableSpaces(), ['field', 'hall']);
  assert.equal(await page.locator('[name=space]').inputValue(), 'hall');
  await page.locator('[name=category]').selectOption('helicopter');
  assert.deepEqual(await availableSpaces(), ['field', 'hall']);
  assert.equal(await page.locator('[name=space]').inputValue(), 'hall');
  await page.locator('[name=category]').selectOption('boat');
  assert.equal(await page.locator('[name=space]').inputValue(), 'water');
  await page.locator('[name=category]').selectOption('plane');
  assert.equal(await page.locator('[name=space]').inputValue(), 'field');
  await page.getByRole('button', {name:'Show my matches'}).click();
  assert.deepEqual(await visible(), ['fits','advanced','fraction']);
  await page.locator('[name=budget]').fill('100');
  assert.deepEqual(await visible(), []);
  assert.equal(await page.locator('[data-finder-status]').textContent(), 'Choose preferences');
  await page.setViewportSize({width:375,height:812});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth), true);
  assert.deepEqual(errors, []);
  console.log('PASS: interest-dependent spaces; compatible selections; stale results cleared; initial state; all five matching constraints; availability; exact budget; decimal boundary; no matches; experience tiers; editor reload; mobile layout; no browser errors.');
 } finally { await browser.close(); }
})().catch(e=>{console.error(e); process.exitCode=1;});
