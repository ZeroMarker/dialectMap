import assert from 'node:assert/strict';
import test from 'node:test';
import { dialects } from '../src/data/dialects';
import { dialectCategories } from '../src/data/dialectCategories';
import { filterDialects } from '../src/lib/filterDialects';

test('blank searches preserve all entries and category filters work', () => {
  assert.deepEqual(filterDialects(dialects, '  ', ''), dialects);
  for (const category of dialectCategories) {
    assert.deepEqual(filterDialects(dialects, '', category.id), dialects.filter((d) => d.category === category.id));
  }
});

test('matches Chinese, English, regions and features', () => {
  for (const query of ['北京', 'BEIJING', '河北', '儿化']) {
    assert.ok(filterDialects(dialects, query, '').some((d) => d.id === 'beijing'));
  }
});

test('trims whitespace and combines search terms with the category', () => {
  assert.deepEqual(filterDialects(dialects, '  BEIJING  河北  ', 'mandarin').map((d) => d.id), ['beijing']);
  assert.equal(filterDialects(dialects, '北京', 'wu').length, 0);
  assert.equal(filterDialects(dialects, '不存在的方言', '').length, 0);
});

test('map entries have unique ids, known categories and valid coordinates', () => {
  assert.equal(new Set(dialects.map((d) => d.id)).size, dialects.length);
  for (const dialect of dialects) {
    assert.ok(dialectCategories.some((c) => c.id === dialect.category));
    assert.ok(Number.isFinite(dialect.coordinates[0]) && Math.abs(dialect.coordinates[0]) <= 90);
    assert.ok(Number.isFinite(dialect.coordinates[1]) && Math.abs(dialect.coordinates[1]) <= 180);
  }
});
