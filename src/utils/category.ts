export type CategoryLike = string | { name: string; path?: string; slug?: string };

export function normalizeCategory(category: CategoryLike) {
  if (typeof category === 'string') {
    const path = category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return { name: category, path };
  }

  const path = category.path || category.slug || category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return { name: category.name, path };
}
