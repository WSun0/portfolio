import { after, before, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { createRequire } from 'node:module';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { JSDOM } from 'jsdom';

// HTTP checks use a dedicated production server, never the developer's port 3000.
const require = createRequire(import.meta.url);
const port = 3107;
const baseURL = `http://127.0.0.1:${port}`;
let server;
let output = '';
const pages = new Map();
async function discoverPages(directory, route = '') {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) result.push(...await discoverPages(path.join(directory, entry.name), `${route}/${entry.name}`));
    else if (entry.name === 'page.tsx') result.push(route || '/');
  }
  return result;
}
const routes = (await discoverPages('src/app')).filter(route => !route.startsWith('/blog')).sort();

before(async () => {
  server = spawn(process.execPath, [require.resolve('next/dist/bin/next'), 'start', '--hostname', '127.0.0.1', '--port', String(port)], { stdio: ['ignore', 'pipe', 'pipe'] });
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error(`Server did not start:\n${output}`)), 30000);
    const collect = chunk => {
      output = (output + chunk.toString()).slice(-12000);
      if (/Ready in/.test(output)) { clearTimeout(timeout); resolve(); }
    };
    server.stdout.on('data', collect);
    server.stderr.on('data', collect);
    server.once('error', error => { clearTimeout(timeout); reject(error); });
    server.once('exit', code => { clearTimeout(timeout); reject(new Error(`Server exited (${code}):\n${output}`)); });
  });
}, { timeout: 35000 });
after(async () => {
  if (server && server.exitCode === null) {
    const stopped = once(server, 'exit');
    server.kill('SIGTERM');
    await stopped;
  }
});

async function documentAt(route) {
  if (!pages.has(route)) {
    const response = await fetch(new URL(route, baseURL), { signal: AbortSignal.timeout(10000) });
    assert.equal(response.status, 200, `${route} must load`);
    pages.set(route, new JSDOM(await response.text()).window.document);
  }
  return pages.get(route);
}

describe('production routes', () => {
  for (const route of routes) it(`${route} serves its document and notebook navigation`, async () => {
    const document = await documentAt(route);
    assert.equal(document.querySelectorAll('main h1').length, 1, 'one main heading');
    assert.ok(document.querySelector('main h1').textContent.trim());
    assert.ok(document.querySelector('nav[aria-label="Files and folders"]'));
    assert.ok(document.querySelector('[aria-keyshortcuts="Meta+b Control+b"]'));
    assert.ok(document.title.includes('William Sun'));
  });
  for (const [from, to] of [
    ['/blog', '/writing'],
    ['/blog/small-changes-for-health-improvements', '/writing/small-changes-for-health-improvements'],
    ['/blog/detoxifying-life', '/writing/detoxifying-life'],
  ]) it(`preserves incoming links to ${from}`, async () => {
    const response = await fetch(baseURL + from, { redirect: 'manual' });
    assert.equal(response.status, 308);
    assert.equal(new URL(response.headers.get('location'), baseURL).pathname, to);
    await documentAt(to);
  });
  it('returns a real 404 for an unknown page', async () => {
    const response = await fetch(baseURL + '/this-page-does-not-exist');
    assert.equal(response.status, 404);
  });
  it('has no broken internal links or missing local images', async () => {
    const targets = new Set();
    for (const route of routes) {
      const document = await documentAt(route);
      for (const element of document.querySelectorAll('a[href], img[src]')) {
        const value = element.getAttribute('href') ?? element.getAttribute('src');
        if (!value.startsWith('/') || value.startsWith('//')) continue;
        const url = new URL(value, baseURL);
        // Verify the underlying photo without depending on the image optimizer cache.
        const target = url.pathname === '/_next/image' ? url.searchParams.get('url') : url.pathname;
        if (target?.startsWith('/')) targets.add(target);
        if (element.tagName === 'IMG') assert.ok(element.getAttribute('alt')?.trim(), `Image needs alt text: ${value}`);
      }
    }
    assert.ok(targets.size > routes.length, 'includes article photos as well as page links');
    for (const target of targets) {
      const response = await fetch(new URL(target, baseURL), { signal: AbortSignal.timeout(10000) });
      assert.equal(response.status, 200, `Broken target: ${target}`);
      await response.arrayBuffer();
    }
  });
});
