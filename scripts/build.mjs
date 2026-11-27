// Copies src/aura-domu.js to dist/ after checking that the version in the header matches package/CHANGELOG.
// Usage: node scripts/build.mjs
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

const src = fs.readFileSync('src/aura-domu.js', 'utf8');
const version = (src.match(/· v(\d+\.\d+\.\d+)/) || [])[1];
if (!version) throw new Error('No version in the src header');
if (!fs.readFileSync('CHANGELOG.md', 'utf8').includes(`## ${version}`)) throw new Error(`CHANGELOG.md has no entry for ${version}`);
execFileSync(process.execPath, ['--check', 'src/aura-domu.js'], {stdio: 'inherit'});
fs.mkdirSync('dist', {recursive: true});
fs.writeFileSync('dist/aura-domu.js', src);
console.log(`dist/aura-domu.js · v${version} · ${src.length} B`);
