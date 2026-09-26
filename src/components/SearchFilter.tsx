'use client';

import type { Dialect } from '@/types/dialect';
import { dialectCategories } from '@/data/dialectCategories';

interface SearchFilterProps {
  filteredDialects: Dialect[];
  searchQuery: string;
  selectedCategory: string;
  selectedDialect: Dialect | null;
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onDialectSelect: (dialect: Dialect) => void;
  onReset: () => void;
}

export default function SearchFilter({ filteredDialects, searchQuery, selectedCategory,
  selectedDialect, onSearchChange, onCategoryChange, onDialectSelect, onReset }: SearchFilterProps) {
  const category = dialectCategories.find((item) => item.id === selectedCategory);
  return (
    <section aria-label="搜索与浏览方言" className="absolute top-3 left-3 z-[1000] w-[calc(100%_-_6rem)] max-w-80 sm:top-4 sm:left-4">
      <div className="rounded-xl bg-white p-4 shadow-xl">
        <h1 className="text-xl font-bold text-gray-800">中国方言地图</h1>
        <p className="mb-3 text-xs text-gray-500">Chinese Dialect Map · 探索地方语言</p>
        <label htmlFor="dialect-search" className="sr-only">搜索方言名称、地区或语言特点</label>
        <input id="dialect-search" type="search" placeholder="名称、地区、语言特点…" value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          className="mb-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <div aria-label="按方言类别筛选" className="flex flex-wrap gap-1.5">
          <button type="button" aria-pressed={!selectedCategory} onClick={() => onCategoryChange('')}
            className={`rounded-full px-2 py-1 text-xs ${!selectedCategory ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700'}`}>全部</button>
          {dialectCategories.map((item) => (
            <button type="button" key={item.id} aria-pressed={selectedCategory === item.id}
              onClick={() => onCategoryChange(item.id)}
              className={`rounded-full border px-2 py-1 text-xs text-gray-800 ${selectedCategory === item.id ? 'border-gray-700 font-bold' : 'border-transparent'}`}
              style={{ backgroundColor: `${item.color}${selectedCategory === item.id ? '90' : '30'}` }}>
              {item.name.split('方')[0]}
            </button>
          ))}
        </div>
        {category && <p className="mt-2 text-xs leading-relaxed text-gray-600">{category.description}</p>}
        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <p role="status" aria-live="polite">找到 {filteredDialects.length} 个代表地点</p>
          {(searchQuery || selectedCategory) && <button type="button" onClick={onReset} className="text-blue-700">清除筛选</button>}
        </div>
      </div>
      <div className={`mt-2 max-h-[30dvh] overflow-y-auto rounded-xl bg-white p-2 shadow-xl sm:max-h-[calc(100dvh-24rem)] ${selectedDialect ? 'hidden sm:block' : ''}`}>
        {filteredDialects.length === 0 ? (
          <div className="p-3 text-center text-sm text-gray-600">
            <p>没有找到匹配的方言</p>
            <p className="mt-1 text-xs">试试其他名称或地区，或清除筛选。</p>
            <button type="button" onClick={onReset} className="mt-3 text-blue-700">显示全部方言</button>
          </div>
        ) : filteredDialects.map((dialect) => {
          const item = dialectCategories.find((c) => c.id === dialect.category);
          return (
            <button type="button" key={dialect.id} onClick={() => onDialectSelect(dialect)}
              aria-pressed={selectedDialect?.id === dialect.id}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left hover:bg-gray-100 ${selectedDialect?.id === dialect.id ? 'bg-blue-50' : ''}`}>
              <span aria-hidden="true" className="h-3 w-3 flex-shrink-0 rounded-full" style={{ backgroundColor: item?.color }} />
              <span className="min-w-0 flex-1"><span className="block text-sm text-gray-800">{dialect.name}</span>
                <span className="block truncate text-xs text-gray-500">{dialect.regions.join('、')}</span></span>
              <span className="text-xs text-gray-600">{item?.name.split('方')[0]}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
