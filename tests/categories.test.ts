import assert from 'node:assert/strict';
import test from 'node:test';
import { getCategoryById, getCategoryColor, getCategoryName } from '../src/lib/categories';
import { dialectCategories } from '../src/data/dialectCategories';

test('getCategoryById returns correct category', () => {
  const mandarin = getCategoryById('mandarin');
  assert.equal(mandarin?.name, '官话方言');
  assert.equal(mandarin?.color, '#FF6B6B');
});

test('getCategoryById returns undefined for invalid id', () => {
  const invalid = getCategoryById('invalid' as any);
  assert.equal(invalid, undefined);
});

test('getCategoryColor returns correct color', () => {
  assert.equal(getCategoryColor('mandarin'), '#FF6B6B');
  assert.equal(getCategoryColor('wu'), '#4ECDC4');
});

test('getCategoryColor returns default for invalid id', () => {
  assert.equal(getCategoryColor('invalid' as any), '#666');
});

test('getCategoryName returns correct name', () => {
  assert.equal(getCategoryName('mandarin'), '官话方言');
  assert.equal(getCategoryName('yue'), '粤方言');
});

test('getCategoryName returns id for invalid category', () => {
  assert.equal(getCategoryName('invalid' as any), 'invalid');
});

test('all categories have unique ids', () => {
  const ids = dialectCategories.map((c) => c.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('all categories have valid colors', () => {
  for (const category of dialectCategories) {
    assert.match(category.color, /^#[0-9A-Fa-f]{6}$/);
  }
});
