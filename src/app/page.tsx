'use client';

import { useState, useMemo, useCallback } from 'react';
import DialectMap from '@/components/DialectMap';
import DialectInfoPanel from '@/components/DialectInfoPanel';
import SearchFilter from '@/components/SearchFilter';
import Legend from '@/components/Legend';
import { dialects } from '@/data/dialects';
import type { Dialect } from '@/types/dialect';
import { filterDialects } from '@/lib/filterDialects';

export default function Home() {
  const [selectedDialect, setSelectedDialect] = useState<Dialect | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [resetView, setResetView] = useState(0);
  const filteredDialects = useMemo(
    () => filterDialects(dialects, searchQuery, selectedCategory),
    [searchQuery, selectedCategory]
  );
  const handleDialectSelect = useCallback((dialect: Dialect) => setSelectedDialect(dialect), []);
  const handleClose = useCallback(() => setSelectedDialect(null), []);
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedDialect(null);
  };

  return (
    <main className="relative w-full h-[100dvh] overflow-hidden">
      <DialectMap dialects={filteredDialects} selectedDialect={selectedDialect}
        onDialectSelect={handleDialectSelect} resetView={resetView} />
      <SearchFilter filteredDialects={filteredDialects} searchQuery={searchQuery}
        selectedCategory={selectedCategory} selectedDialect={selectedDialect}
        onSearchChange={(query) => { setSearchQuery(query); setSelectedDialect(null); }}
        onCategoryChange={(category) => { setSelectedCategory(category); setSelectedDialect(null); }}
        onDialectSelect={handleDialectSelect} onReset={resetFilters} />
      <Legend />
      <button type="button" className="absolute right-3 top-24 z-[1000] rounded-lg bg-white px-2 py-2 text-xs shadow-lg sm:right-4 sm:px-3 sm:text-sm"
        onClick={() => { setSelectedDialect(null); setResetView((value) => value + 1); }}>
        地图复位
      </button>
      <DialectInfoPanel dialect={selectedDialect} onClose={handleClose} />
      <div className="absolute bottom-7 right-4 z-[999] hidden rounded-lg bg-white/90 px-3 py-2 text-xs text-gray-600 lg:block">
        <p>{dialects.length} 个代表地点 · {new Date().getFullYear()}</p>
        <p>标记为代表地点，不表示方言分布边界</p>
      </div>
    </main>
  );
}
