import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

// Static aliases preserve addresses used by the previous Jekyll website.
const aliases = {
  'about/index.html': '/',
  'about.html': '/',
  'selected_projects/index.html': '/projects/',
  'teaching/index.html': '/experience/',
  'resume.html': '/cv/',
  'resume/index.html': '/cv/',
};
for (const [filename, destination] of Object.entries(aliases)) {
  const target = path.join('out', filename);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, `<!doctype html><html lang="en"><meta charset="utf-8"><title>Kaiwen Zuo</title><link rel="canonical" href="https://Cuberkk.github.io${destination}"><meta http-equiv="refresh" content="0;url=${destination}"><p>This page has moved. <a href="${destination}">Continue to the page</a>.</p></html>`);
}
await writeFile('out/.nojekyll', '');
