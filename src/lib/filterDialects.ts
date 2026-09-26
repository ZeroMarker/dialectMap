import type { Dialect } from '../types/dialect';

/** Match all search terms, allowing mixed names, regions and language features. */
export function filterDialects(dialects: Dialect[], query: string, category: string) {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return dialects.filter((dialect) => {
    if (category && dialect.category !== category) return false;
    const text = [dialect.name, dialect.nameEn, ...dialect.regions, ...dialect.features]
      .join(' ').toLocaleLowerCase();
    return terms.every((term) => text.includes(term));
  });
}
