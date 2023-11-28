import { expect, test } from 'vitest';
import { formatNumber } from '../utils';

test('formatNumber: 100 should be 100', () => {
  expect(formatNumber(100)).toBe('100');
});

test('formatNumber: 1000 should be 1K', () => {
  expect(formatNumber(1000)).toBe('1K');
});

test('formatNumber: 100000 should be 100K', () => {
  expect(formatNumber(100000)).toBe('100K');
});

test('formatNumber: 1000000 should be 1M', () => {
  expect(formatNumber(1000000)).toBe('1M');
});

test('formatNumber: 1000000000 should be 1M', () => {
  expect(formatNumber(1000000000)).toBe('1B');
});
