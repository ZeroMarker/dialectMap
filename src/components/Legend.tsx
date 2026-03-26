'use client';

import { dialectCategories } from '@/data/dialectCategories';

export default function Legend() {
  return (
    <div className="absolute bottom-4 left-4 z-[1000] bg-white rounded-xl shadow-2xl p-4">
      <h3 className="font-semibold text-gray-800 mb-3 text-sm">方言分类</h3>
      <div className="space-y-2">
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
    </div>
  );
}
