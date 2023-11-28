import { expect, test } from 'vitest';

import { formatLocation } from '../utils';

test('formatLocation: null parameters should be null', () => {
  expect(formatLocation(null)).toBe(null);
});

test('formatLocation: New York City, null, null should be New York City', () => {
  expect(formatLocation('New York City', null, null)).toBe('New York City');
});

test('formatLocation: New York City, NY, null should be New York City, NY', () => {
  expect(formatLocation('New York City', 'NY', null)).toBe('New York City, NY');
});

test('formatLocation: New York City, null, US should be New York City, US', () => {
  expect(formatLocation('New York City', null, 'US')).toBe('New York City, US');
});

test('formatLocation: null, NY, US should be NY, US', () => {
  expect(formatLocation(null, 'NY', 'US')).toBe('NY, US');
});

test('formatLocation: null, NY, null should be NY', () => {
  expect(formatLocation(null, 'NY', null)).toBe('NY');
});

test('formatLocation: null, null, US should be US', () => {
  expect(formatLocation(null, null, 'US')).toBe('US');
});
