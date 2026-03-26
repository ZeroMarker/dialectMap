export interface Dialect {
  id: string;
  name: string;
  nameEn: string;
  category: DialectCategory;
  description: string;
  speakers: string;
  regions: string[];
  features: string[];
  examples: { text: string; pronunciation: string; meaning: string }[];
  coordinates: [number, number]; // [lat, lng]
}

export type DialectCategory = 
  | 'mandarin'
  | 'wu'
  | 'yue'
  | 'min'
  | 'hakka'
  | 'xiang'
  | 'gan'
  | 'hui'
  | 'pinghua';

export interface DialectCategoryInfo {
  id: DialectCategory;
  name: string;
  nameEn: string;
  color: string;
  description: string;
}
