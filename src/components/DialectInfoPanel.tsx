'use client';

import { Dialect } from '@/types/dialect';
import { dialectCategories } from '@/data/dialectCategories';

interface DialectInfoPanelProps {
  dialect: Dialect | null;
  onClose: () => void;
}

export default function DialectInfoPanel({ dialect, onClose }: DialectInfoPanelProps) {
  if (!dialect) return null;

  const category = dialectCategories.find((c) => c.id === dialect.category);

  return (
    <div className="absolute top-4 right-4 w-96 max-h-[80vh] bg-white rounded-xl shadow-2xl overflow-hidden z-[1000] animate-fade-in">
      <div
        className="p-4 text-white"
        style={{ backgroundColor: category?.color || '#666' }}
      >
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{dialect.name}</h2>
            <p className="text-sm opacity-90">{dialect.nameEn}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors p-1"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="mt-2 text-sm opacity-80">{category?.name}</div>
      </div>

      <div className="p-4 overflow-y-auto max-h-[calc(80vh-120px)]">
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">简介</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {dialect.description}
          </p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">使用人数</h3>
          <p className="text-gray-600 text-sm">{dialect.speakers}</p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">分布地区</h3>
          <div className="flex flex-wrap gap-2">
            {dialect.regions.map((region) => (
              <span
                key={region}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {region}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">语言特点</h3>
          <ul className="space-y-1">
            {dialect.features.map((feature, index) => (
              <li key={index} className="text-gray-600 text-sm flex items-center">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-2">常用语示例</h3>
          <div className="space-y-2">
            {dialect.examples.map((example, index) => (
              <div
                key={index}
                className="p-2 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800">{example.text}</span>
                  <span className="text-xs text-gray-500">{example.meaning}</span>
                </div>
                <div className="text-sm text-gray-600 mt-1 font-mono">
                  {example.pronunciation}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
