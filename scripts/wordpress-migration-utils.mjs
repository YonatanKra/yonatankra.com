const SITE = 'https://yonatankra.com';

function normalizedBasePath() {
  const raw = (process.env.PUBLIC_BASE_PATH || '').trim();
  if (!raw || raw === '/') return '';
  return `/${raw.replace(/^\/+|\/+$/g, '')}`;
}

export async function fetchWordPress(url, { attempts = 4, timeout = 30000, userAgent = 'Mozilla/5.0 yonatankra.com Astro migration' } = {}) {
  let lastResponse;
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const res = await fetch(url, {
        signal: AbortSignal.timeout(timeout),
        headers: { 'user-agent': userAgent, accept: 'application/json' },
      });
      lastResponse = res;
      const type = res.headers.get('content-type') || '';
      if (res.ok && type.includes('json')) return res;
      if (attempt === attempts || (res.status < 500 && res.status !== 403 && res.status !== 429)) return res;
    } catch (error) {
      lastError = error;
      if (attempt === attempts) throw error;
    }
    const delayMs = [1000, 3000, 8000][attempt - 1] ?? 8000;
    console.warn(`WordPress request retry ${attempt}/${attempts - 1} after ${lastResponse ? `${lastResponse.status} ${lastResponse.statusText}` : lastError}`);
    await new Promise(resolve => setTimeout(resolve, delayMs));
  }
  if (lastResponse) return lastResponse;
  throw lastError ?? new Error(`WordPress request failed: ${url}`);
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
