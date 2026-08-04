#!/usr/bin/env node
/**
 * patch-next-devtools.js
 *
 * Permanently patches Next.js 15 to prevent RSC Client Manifest crash
 * caused by the SegmentViewNode 'use client' component being serialized
 * in the server-side RSC payload during development mode.
 *
 * Root cause: entry-base.js (server) loads SegmentViewNode from
 * segment-explorer-node.js which is marked 'use client'. The RSC
 * serializer tries to embed a client reference for it, but fails to
 * find it in the compiled client manifest → crash → CSS not served.
 *
 * Fix: Patch entry-base.js to keep SegmentViewNode as a no-op ()=>null,
 * never loading the devtools client module on the server.
 *
 * Run automatically via "postinstall" in package.json.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '../node_modules/next/dist');

function patchEntryBase(filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn('[patch] Not found, skipping:', filePath);
    return;
  }
  const src = fs.readFileSync(filePath, 'utf8');
  if (src.includes('PATCHED: no-op SegmentViewNode')) {
    console.log('[patch] Already patched:', filePath);
    return;
  }
  if (!src.includes('segment-explorer-node')) {
    console.log('[patch] segment-explorer-node not referenced, skipping:', filePath);
    return;
  }

  // Back up original
  const bak = filePath + '.bak';
  if (!fs.existsSync(bak)) fs.writeFileSync(bak, src);

  // Replace the block that dynamically loads SegmentViewNode in dev mode
  const patched = src.replace(
    /let SegmentViewNode\s*=\s*\(\s*\)\s*=>\s*null;\s*\nlet SegmentViewStateNode\s*=\s*\(\s*\)\s*=>\s*null;\s*\nif\s*\(\s*process\.env\.NODE_ENV\s*===\s*['"]development['"]\s*\)\s*\{[\s\S]*?segment-explorer-node[\s\S]*?\}/m,
    '// PATCHED: no-op SegmentViewNode — prevents RSC Client Manifest crash in Next.js 15 dev\nlet SegmentViewNode = ()=>null;\nlet SegmentViewStateNode = ()=>null;'
  );

  if (patched === src) {
    console.warn('[patch] Pattern not matched in:', filePath, '— manual inspection needed');
    return;
  }

  fs.writeFileSync(filePath, patched);
  console.log('[patch] ✓ Patched:', filePath);
}

patchEntryBase(path.join(BASE, 'server/app-render/entry-base.js'));
patchEntryBase(path.join(BASE, 'esm/server/app-render/entry-base.js'));

console.log('[patch-next-devtools] Done. CSS will no longer break in dev mode.');
