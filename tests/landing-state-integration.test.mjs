import test from 'node:test';
import assert from 'node:assert/strict';
import { landingState, quoteFor } from '../public/trip-constructor/trip-engine.mjs';
test('Thematic pages select cargo and leave route empty', () => {
  for (const scenario of ['family','luggage','ski']) {
    const s = landingState(new URLSearchParams({ scenario, empty: '1' }));
    assert.equal(s.passengers, 4); assert.equal(s.foldedSeats, 3);
    assert.equal(s.from, ''); assert.equal(s.to, '');
    assert.equal(quoteFor(s, []).amount, null);
    if (scenario === 'family') { assert.equal(s.children, 2); assert.equal(s.stroller, true); }
    if (scenario === 'luggage') assert.equal(s.bags, 6);
    if (scenario === 'ski') assert.equal(s.skiPairs, 4);
  }
});
test('Capacity pages preselect 5/6/7 and fold only unused rear seats', () => {
  for (const passengers of [5,6,7]) { const s = landingState(new URLSearchParams({ passengers: String(passengers) })); assert.equal(s.passengers, passengers); assert.equal(s.foldedSeats, 7-passengers); }
});
test('Unknown and malformed query values cannot override validated state', () => {
  for (const scenario of ['__proto__','constructor','nope','<script>']) assert.equal(landingState(new URLSearchParams({ scenario })).passengers, 4);
  for (const passengers of ['8','-1','7.5','999','5abc']) assert.equal(landingState(new URLSearchParams({ passengers })).passengers, 4);
});
