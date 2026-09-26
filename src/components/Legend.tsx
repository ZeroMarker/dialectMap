'use client';

import { dialectCategories } from '@/data/dialectCategories';

export default function Legend() {
  return (
    <details className="absolute bottom-7 left-4 z-[1000] hidden lg:block bg-white rounded-xl shadow-xl p-3">
      <summary className="cursor-pointer font-semibold text-gray-800 text-sm">方言分类图例</summary>
      <div className="mt-3 space-y-2">
        {dialectCategories.map((category) => (
          <div key={category.id} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: category.color }}
            />
            <span className="text-xs text-gray-700">{category.name}</span>
            <span className="text-xs text-gray-400 ml-auto">
              {category.nameEn}
            </span>
          </div>
        ))}
      </div>
    </details>
  );
}
