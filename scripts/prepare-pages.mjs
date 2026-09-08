import { existsSync } from 'node:fs';
import { access, cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { startProdServer } from 'vinext/server/prod-server';

const root = new URL('../', import.meta.url);
const output = new URL('dist/client/', root);
const destination = new URL('docs/', root);
const entry = new URL('index.html', output);

// Vinext 1.0.0-beta.5 prerenders '/' without the configured basePath and
// silently skips it after a 404. Export this single-page site's real route
// through the built production server, preserving React's bootstrap payload.
if (!existsSync(entry)) {
  const manifest = JSON.parse(
    await readFile(new URL('dist/server/vinext-prerender.json', root), 'utf8'),
  );
  const homepage = manifest.routes.find((route) => route.route === '/');
  if (homepage?.status !== 'skipped' || homepage.reason !== 'dynamic') {
    throw new Error(
      'Static export is missing the homepage for an unexpected reason.',
    );
  }
  const { server, port } = await startProdServer({
    port: 0,
    host: '127.0.0.1',
    outDir: fileURLToPath(new URL('dist/', root)),
    noCompression: true,
    silent: true,
  });
  try {
    const address = `http://127.0.0.1:${port}/Persona-Hate/`;
    const response = await fetch(address);
    if (!response.ok)
      throw new Error(`Homepage export failed: ${response.status}`);
    const html = await response.text();
    if (!html.includes('id="overview"') || !html.includes('ACM CCS 2026')) {
      throw new Error(
        'Homepage export did not contain the expected paper content.',
      );
    }
    const rsc = await fetch(address, {
      headers: { RSC: '1', Accept: 'text/x-component' },
    });
    if (
      !rsc.ok ||
      !rsc.headers.get('content-type')?.includes('text/x-component')
    ) {
      throw new Error(`React payload export failed: ${rsc.status}`);
    }
    await writeFile(
      new URL('index.rsc', output),
      new Uint8Array(await rsc.arrayBuffer()),
    );
    await writeFile(entry, html);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
      server.closeAllConnections();
    });
  }
}

// Only replace the generated Pages directory after a successful export.
await access(entry);
await rm(destination, { recursive: true, force: true });
await mkdir(destination, { recursive: true });
await cp(output, destination, { recursive: true });
// Vite's build manifest is server-only and may contain local source paths.
await rm(new URL('.vite/', destination), { recursive: true, force: true });
// GitHub must serve _next/ assets without applying Jekyll's underscore rules.
await writeFile(new URL('.nojekyll', destination), '');
console.log('GitHub Pages files are ready in docs/.');
