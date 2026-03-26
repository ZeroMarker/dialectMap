'use client';

import { Dialect } from '@/types/dialect';
import { dialectCategories } from '@/data/dialectCategories';

interface SearchFilterProps {
  dialects: Dialect[];
  filteredDialects: Dialect[];
  searchQuery: string;
  selectedCategory: string;
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onDialectSelect: (dialect: Dialect) => void;
}

export default function SearchFilter({
  dialects,
  filteredDialects,
  searchQuery,
  selectedCategory,
  onSearchChange,
  onCategoryChange,
  onDialectSelect,
}: SearchFilterProps) {
  return (
    <div className="absolute top-4 left-4 z-[1000] w-80">
      <div className="bg-white rounded-xl shadow-2xl p-4">
        <h1 className="text-xl font-bold text-gray-800 mb-1">中国方言地图</h1>
        <p className="text-xs text-gray-500 mb-4">Chinese Dialect Map</p>

        <div className="relative mb-3">
          <input
            type="text"
            placeholder="搜索方言..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => onCategoryChange('')}
            className={`px-2 py-1 text-xs rounded-full transition-colors ${
              selectedCategory === ''
                ? 'bg-gray-800 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            全部
          </button>
          {dialectCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className="px-2 py-1 text-xs rounded-full transition-colors"
              style={{
                backgroundColor:
                  selectedCategory === category.id
                    ? category.color
                    : `${category.color}30`,
                color: selectedCategory === category.id ? '#fff' : category.color,
              }}
            >
              {category.name.split('方')[0]}
            </button>
          ))}
        </div>
      </div>

      {filteredDialects.length > 0 && searchQuery && (
        <div className="mt-2 bg-white rounded-xl shadow-2xl p-2 max-h-64 overflow-y-auto">
          {filteredDialects.map((dialect) => {
            const category = dialectCategories.find(
              (c) => c.id === dialect.category
            );
            return (
              <button
                key={dialect.id}
                onClick={() => onDialectSelect(dialect)}
                className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
              >
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: category?.color }}
                />
                <span className="text-sm text-gray-800">{dialect.name}</span>
                <span className="text-xs text-gray-500 ml-auto">
                  {category?.name.split('方')[0]}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
