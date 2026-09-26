'use client';

import { useEffect, useRef } from 'react';
import type { Dialect } from '@/types/dialect';
import { dialectCategories } from '@/data/dialectCategories';

interface DialectInfoPanelProps {
  dialect: Dialect | null;
  onClose: () => void;
}

export default function DialectInfoPanel({ dialect, onClose }: DialectInfoPanelProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!dialect) return;
    const previousFocus = document.activeElement;
    closeRef.current?.focus({ preventScroll: true });
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [dialect, onClose]);
  if (!dialect) return null;

  const category = dialectCategories.find((c) => c.id === dialect.category);

  return (
    <section aria-labelledby="dialect-title" className="absolute bottom-7 left-3 right-3 max-h-[45dvh] bg-white rounded-xl shadow-2xl overflow-hidden z-[1001] animate-fade-in sm:bottom-auto sm:left-auto sm:top-4 sm:right-16 sm:w-96 sm:max-h-[80dvh] flex flex-col">
      <div
        className="p-4 text-gray-900 shrink-0"
        style={{ backgroundColor: category ? `${category.color}60` : '#e5e7eb' }}
      >
        <div className="flex justify-between items-start">
          <div>
            <h2 id="dialect-title" className="text-2xl font-bold">{dialect.name}</h2>
            <p className="text-sm opacity-90">{dialect.nameEn}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            aria-label="关闭方言详情"
            onClick={onClose}
            className="text-gray-800 hover:text-black transition-colors p-1"
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

      <div className="p-4 overflow-y-auto min-h-0">
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">简介</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {dialect.description}
          </p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-gray-800 mb-2">使用人数（原始资料估算）</h3>
          <p className="text-gray-600 text-sm">{dialect.speakers}</p>
          <p className="mt-1 text-xs text-gray-500">统计年份与口径未标注，可能包含更大方言群体，仅供参考。</p>
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
    </section>
  );
}
