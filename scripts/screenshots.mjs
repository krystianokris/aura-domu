// Takes README screenshots from the demo page with headless Chrome.
// Usage: serve the repo root on http://127.0.0.1:8788, then: node scripts/screenshots.mjs "<path to chrome.exe>"
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const chrome = process.argv[2];
const out = path.resolve('docs/screenshots');
fs.mkdirSync(out, {recursive: true});
const shots = [
  ['home', 'light', '', [1300, 1000]], ['home-dark', 'dark', '', [1300, 1000]],
  ['rooms', 'light', 'pokoje', [1300, 760]], ['room', 'light', 'pokoje/salon', [1300, 1000]],
  ['climate', 'light', 'klimat', [1300, 900]], ['heating', 'light', 'ogrzewanie', [1300, 1050]],
  ['weather', 'light', 'pogoda', [1300, 1000]], ['weather-dark', 'dark', 'pogoda', [1300, 1000]],
  ['energy', 'light', 'energia', [1300, 760]], ['security', 'dark', 'ochrona', [1300, 1000]],
  ['bins', 'light', 'kosze', [1300, 900]], ['f1', 'light', 'f1', [1300, 1000]],
  ['settings', 'light', 'ustawienia', [1300, 1000]], ['mobile', 'light', '', [500, 920], 'phone.html'], ['mobile-room', 'dark', 'pokoje/kuchnia', [500, 920], 'phone.html'],
];
const only = process.argv.slice(3);
for (const [name, theme, hash, [w, h], page = ''] of shots) {
  if (only.length && !only.includes(name)) continue;
  const file = path.join(out, `${name}.png`);
  const url = `http://127.0.0.1:8788/demo/${page}?theme=${theme}${hash ? `#${hash}` : ''}`;
  execFileSync(chrome, ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--user-data-dir=${path.join(out, '.profile-' + name)}`,
    `--window-size=${w},${h}`, '--virtual-time-budget=7000', '--force-device-scale-factor=1', `--screenshot=${file}`, url], {stdio: 'ignore'});
  fs.rmSync(path.join(out, '.profile-' + name), {recursive: true, force: true});
  console.log(name, fs.statSync(file).size);
}
