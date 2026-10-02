import type { DialectCategory, DialectCategoryInfo } from '@/types/dialect';
import { dialectCategories } from '@/data/dialectCategories';

/**
 * 检查字符串是否是有效的方言类别 ID
 */
export function isValidCategoryId(id: string): id is DialectCategory {
  return dialectCategories.some((c) => c.id === id);
}

/**
 * 根据 ID 获取方言类别信息
 */
export function getCategoryById(id: DialectCategory): DialectCategoryInfo | undefined {
  return dialectCategories.find((c) => c.id === id);
}

/**
 * 安全地根据字符串 ID 获取方言类别信息
 */
export function getCategoryByStringId(id: string): DialectCategoryInfo | undefined {
  if (!isValidCategoryId(id)) return undefined;
  return getCategoryById(id);
}

/**
 * 获取方言类别的颜色
 */
export function getCategoryColor(id: DialectCategory): string {
  return getCategoryById(id)?.color || '#666';
}

/**
 * 获取方言类别的名称
 */
export function getCategoryName(id: DialectCategory): string {
  return getCategoryById(id)?.name || id;
}

/**
 * 获取方言类别的简称（去掉"方言"后缀）
 */
export function getCategoryShortName(id: DialectCategory): string {
  const name = getCategoryName(id);
  return name.split('方')[0];
}
