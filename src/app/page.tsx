'use client';

import { useState, useMemo } from 'react';
import DialectMap from '@/components/DialectMap';
import DialectInfoPanel from '@/components/DialectInfoPanel';
import SearchFilter from '@/components/SearchFilter';
import Legend from '@/components/Legend';
import { dialects } from '@/data/dialects';
import { Dialect } from '@/types/dialect';

export default function Home() {
  const [selectedDialect, setSelectedDialect] = useState<Dialect | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredDialects = useMemo(() => {
    return dialects.filter((dialect) => {
      const matchesSearch =
        dialect.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dialect.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dialect.regions.some((r) => r.includes(searchQuery));

      const matchesCategory =
        !selectedCategory || dialect.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleDialectSelect = (dialect: Dialect) => {
    setSelectedDialect(dialect);
  };

  return (
    <main className="relative w-full h-screen overflow-hidden">
      <DialectMap
        dialects={selectedCategory || searchQuery ? filteredDialects : dialects}
        selectedDialect={selectedDialect}
        onDialectSelect={handleDialectSelect}
      />

      <SearchFilter
        dialects={dialects}
        filteredDialects={filteredDialects}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        onSearchChange={setSearchQuery}
        onCategoryChange={setSelectedCategory}
        onDialectSelect={handleDialectSelect}
      />

      <Legend />

      <DialectInfoPanel
        dialect={selectedDialect}
        onClose={() => setSelectedDialect(null)}
      />

      <div className="absolute bottom-4 right-4 z-[1000] text-xs text-gray-500 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg">
        <p>中国方言地图 · Chinese Dialect Map</p>
        <p className="text-gray-400">
          {dialects.length} dialects · {new Date().getFullYear()}
        </p>
      </div>
    </main>
  );
}
