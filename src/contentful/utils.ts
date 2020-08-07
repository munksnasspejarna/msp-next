export function getOGImageUrl(url: string) {
  return url + '?fit=fill&w=1200&h=630';
}

export function getFullSlug(slug: string | string[]) {
  return Array.isArray(slug) ? slug.join('/') : slug;
}

export function getRootSlug(slug: string | string[]) {
  return Array.isArray(slug) ? slug[0] : slug;
}
