import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { calculateQuote } from '../public/trip-constructor/pricing.mjs';
import { initialState, quoteFor, updateState } from '../public/trip-constructor/trip-engine.mjs';

const registry = JSON.parse(fs.readFileSync(new URL('../src/lib/route-registry.json', import.meta.url)));
const browser = {window: {}};
vm.runInNewContext(fs.readFileSync(new URL('../public/trip-constructor/trip-data.js', import.meta.url), 'utf8'), browser);
const routes = browser.window.ZM_TRIP.routes;

test('Kazan airport transfers use the measured direction and the same Comfort quote in the iframe', () => {
  for (const [city, slug, outbound, inbound] of [
    ['Йошкар-Ола', 'yoshkar-ola', 12000, 12000],
    ['Ульяновск', 'ulyanovsk', 13500, 13000],
    ['Тольятти', 'tolyatti', 19000, 19000],
    ['Саранск', 'saransk', 24000, 24500],
  ]) {
    const airport = 'Аэропорт Казань';
    for (const [path, from, to, price] of [
      ['/airport/kzn/' + slug, airport, city, outbound],
      ['/routes/' + slug + '-aeroport-kazan', city, airport, inbound],
    ]) {
      const matchingRoutes = routes.filter(r => r.from === from && r.to === to);
      assert.equal(matchingRoutes.length, 1, path);
      const [route] = matchingRoutes;
      const row = registry.byPath[path];
      assert.equal(route.id, path);
      assert.equal(row.rawDistanceM, route.pricingDistanceM);
      assert.equal(calculateQuote(row.rawDistanceM).price, price);
      const quote = quoteFor(updateState(initialState(), {from, to}), routes);
      assert.equal(quote.amount, price);
      assert.equal(quote.km, row.km);
    }
  }
});
