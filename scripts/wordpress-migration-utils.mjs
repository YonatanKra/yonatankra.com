const SITE = 'https://yonatankra.com';

function normalizedBasePath() {
  const raw = (process.env.PUBLIC_BASE_PATH || '').trim();
  if (!raw || raw === '/') return '';
  return `/${raw.replace(/^\/+|\/+$/g, '')}`;
}

export function decodeHtml(s = '') {
  return s.replace(/<[^>]+>/g, '')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"').replaceAll('&#039;', "'").replaceAll('&nbsp;', ' ').trim();
}

export function uploadPath(url) {
  if (!url) return undefined;
  try {
    const u = new URL(url.startsWith('//') ? `https:${url}` : url, SITE);
    const marker = '/wp-content/uploads/';
    const i = u.pathname.indexOf(marker);
    return i >= 0 ? decodeURIComponent(u.pathname.slice(i)) : undefined;
  } catch {
    return undefined;
  }
}

export function publicPath(pathname) {
  if (!pathname) return pathname;
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${normalizedBasePath()}${path}` || '/';
}

export function categoryPath(term) {
  try {
    return new URL(term.link).pathname.match(/\/category\/(.+?)\/?$/)?.[1] || term.slug;
  } catch {
    return term.slug;
  }
}

export function normalizeMediaUrl(rawUrl) {
  if (!rawUrl) return rawUrl;
  return rawUrl.startsWith('/') ? `${SITE}${rawUrl}` : rawUrl.startsWith('//') ? `https:${rawUrl}` : rawUrl;
}

export function mediaUrlsFromHtml(html = '') {
  const found = new Set();
  for (const m of html.matchAll(/(?:https?:)?\/\/[^"'\s<>,]+|\/wp-content\/uploads\/[^"'\s<>,]+/g)) {
    const raw = m[0].replaceAll('&amp;', '&');
    if (uploadPath(raw)) found.add(normalizeMediaUrl(raw));
  }
  return found;
}

export function rewriteImportedHtml(html = '') {
  return html.replace(/(?:https?:)?\/\/[^"'\s<>,]+|\/wp-content\/uploads\/[^"'\s<>,]+/g, (raw) => {
    const decoded = raw.replaceAll('&amp;', '&');
    const dest = uploadPath(decoded);
    return dest ? publicPath(dest) : raw;
  });
}

export const WORDPRESS_SITE = SITE;
