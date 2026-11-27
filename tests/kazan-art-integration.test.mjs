import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const calendarFile = new URL('../src/lib/kazan-art-calendar.ts', import.meta.url);
const { outputText } = ts.transpileModule(readFileSync(calendarFile, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
});
const calendar = {};
vm.runInNewContext(outputText, { exports: calendar, Intl });

test('Kazan scenes switch at local midnight, including New Year and leap day', () => {
  for (const [utc, season] of [
    ['2026-11-30T20:59:59Z', 'standard'], ['2026-11-30T21:00:00Z', 'winter'],
    ['2026-12-09T20:59:59Z', 'winter'], ['2026-12-09T21:00:00Z', 'newyear'],
    ['2026-12-31T21:00:00Z', 'newyear'], ['2027-01-13T20:59:59Z', 'newyear'],
    ['2027-01-13T21:00:00Z', 'winter'], ['2027-02-28T20:59:59Z', 'winter'],
    ['2027-02-28T21:00:00Z', 'standard'], ['2028-02-29T20:59:59Z', 'winter'],
    ['2028-02-29T21:00:00Z', 'standard'],
  ]) {
    assert.equal(calendar.kazanArtSeason(new Date(utc)), season, utc);
  }
});

test('each Kazan route pair has an optimized winter and New Year WebP', () => {
  for (const city of ['yoshkar-ola', 'ulyanovsk', 'tolyatti', 'saransk']) {
    for (const season of ['winter', 'newyear']) {
      const url = new URL(`../public/images/journeys/kzn-${city}-transfer-${season}-v1.webp`, import.meta.url);
      const bytes = readFileSync(url);
      assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
      assert.ok(bytes.length <= 460 * 1024, url.pathname);
    }
  }
});
