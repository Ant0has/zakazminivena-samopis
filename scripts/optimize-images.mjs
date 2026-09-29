import { mkdir, readdir, rename, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const profiles = {
  hero: { quality: 82, maxBytes: 460 * 1024, width: 1536, height: 1024 },
  constructor: { quality: 92, maxBytes: 250 * 1024 },
};

async function walk(folder) {
  const files = [];
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    const full = path.join(folder, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else if (entry.isFile()) files.push(full);
  }
  return files;
}

async function check() {
  const groups = [
    { folder: 'public/images/heroes', limit: profiles.hero.maxBytes },
    { folder: 'public/images/journeys', limit: profiles.hero.maxBytes },
    { folder: 'public/trip-constructor', limit: 400 * 1024 },
  ];
  const errors = [];
  let count = 0;
  for (const group of groups) {
    for (const file of await walk(path.join(root, group.folder))) {
      if (!/\.(?:png|jpe?g|webp|avif)$/i.test(file)) continue;
      const bytes = (await stat(file)).size;
      const relative = path.relative(root, file);
      const limit = group.folder.endsWith('trip-constructor') && file.endsWith('.webp')
        ? profiles.constructor.maxBytes : group.limit;
      count++;
      if (bytes > limit) errors.push(`${relative}: ${bytes} B > ${limit} B`);
    }
  }
  if (errors.length) throw new Error(`Oversized images:\n${errors.join('\n')}`);
  console.log(`Image budget OK: ${count} files; heroes ≤460 KiB, constructor WebP ≤250 KiB, fleet JPEG ≤400 KiB.`);
}

async function optimize(profileName, input, output) {
  const profile = profiles[profileName];
  if (!profile) throw new Error('Profile must be hero or constructor.');
  if (!input || !output || !/\.webp$/i.test(output)) {
    throw new Error('Usage: node scripts/optimize-images.mjs <hero|constructor> <source.png|jpg> <output.webp>');
  }
  const source = path.resolve(input);
  const target = path.resolve(output);
  if (source === target) throw new Error('Input and output must differ.');
  if (!/\.(?:png|jpe?g)$/i.test(source)) throw new Error('Source must be PNG or JPEG.');
  try { await stat(target); throw new Error(`Output already exists: ${target}`); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }

  const before = await sharp(source).metadata();
  const originalBytes = (await stat(source)).size;
  await mkdir(path.dirname(target), { recursive: true });
  const temporary = `${target}.tmp-${process.pid}`;
  try {
    let pipeline = sharp(source).rotate();
    if (profile.width) pipeline = pipeline.resize(profile.width, profile.height, { fit: 'inside', withoutEnlargement: true });
    await pipeline.webp({ quality: profile.quality, alphaQuality: 100, effort: 6 }).toFile(temporary);
    const after = await sharp(temporary).metadata();
    const bytes = (await stat(temporary)).size;
    if (bytes > profile.maxBytes) throw new Error(`Result ${bytes} B exceeds ${profile.maxBytes} B; review crop/size rather than silently lowering quality.`);
    if (profileName === 'constructor' && (before.width !== after.width || before.height !== after.height || Boolean(before.hasAlpha) !== Boolean(after.hasAlpha))) {
      throw new Error('Constructor layer dimensions or transparency changed.');
    }
    await rename(temporary, target);
    console.log(`${path.relative(root, source)} → ${path.relative(root, target)}: ${originalBytes} → ${bytes} B (${Math.round((1 - bytes / originalBytes) * 100)}% smaller)`);
  } finally {
    await rm(temporary, { force: true });
  }
}

const args = process.argv.slice(2);
try {
  if (args.length === 1 && args[0] === '--check') await check();
  else if (args.length === 3) await optimize(...args);
  else throw new Error('Usage: node scripts/optimize-images.mjs --check | <hero|constructor> <source.png|jpg> <output.webp>');
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
