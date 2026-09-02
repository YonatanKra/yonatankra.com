#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

const SITE = 'https://yonatankra.com';
const API = `${SITE}/wp-json/wp/v2`;
const postDir = path.resolve('src/content/posts');
const pageDir = path.resolve('src/content/pages');
fs.mkdirSync(postDir, { recursive: true }); fs.mkdirSync(pageDir, { recursive: true });

async function request(url, optional = false) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(20000), headers: { 'user-agent': 'Mozilla/5.0 yonatankra.com Astro migration', accept: 'application/json' } });
    const type = res.headers.get('content-type') || '';
    if (!res.ok || !type.includes('json')) throw new Error(`${res.status} ${res.statusText}, content-type=${type}`);
    return res;
  } catch (e) {
    if (optional) { console.warn(`WARN ${url}: ${e}`); return null; }
    throw e;
  }
}
async function all(resource, params = {}, optional = false) {
  const out = [];
  for (let page = 1; ; page++) {
    const q = new URLSearchParams({ per_page: resource === 'posts' ? '10' : '20', page: String(page), ...params });
    const res = await request(`${API}/${resource}?${q}`, optional); if (!res) return out;
    const rows = await res.json(); out.push(...rows);
    const pages = Number(res.headers.get('x-wp-totalpages') || 1);
    console.log(`${resource}: ${page}/${pages} (${out.length})`); if (page >= pages) break;
  }
  return out;
}
async function one(resource, id) { const r = await request(`${API}/${resource}/${id}`, true); return r ? r.json() : null; }
function decode(s='') { return s.replace(/<[^>]+>/g,'').replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(+n)).replace(/&#x([\da-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16))).replaceAll('&amp;','&').replaceAll('&lt;','<').replaceAll('&gt;','>').replaceAll('&quot;','"').replaceAll('&#039;',"'").replaceAll('&nbsp;',' ').trim(); }
function uploadPath(url) { try { const u=new URL(url?.startsWith('//')?`https:${url}`:url,SITE), m='/wp-content/uploads/', i=u.pathname.indexOf(m); return i>=0?decodeURIComponent(u.pathname.slice(i)):undefined; } catch{return undefined;} }
function categoryPath(t) { try{return new URL(t.link).pathname.match(/\/category\/(.+?)\/?$/)?.[1]||t.slug;}catch{return t.slug;} }
function htmlMedia(html='') { const s=new Set(); for(const m of html.matchAll(/(?:https?:)?\/\/[^"'\s<>]+|\/wp-content\/uploads\/[^"'\s<>]+/g)){const r=m[0].replaceAll('&amp;','&');if(uploadPath(r))s.add(r.startsWith('/')?`${SITE}${r}`:r.startsWith('//')?`https:${r}`:r);} return s; }

const fields='id,slug,date,modified,link,title,excerpt,content,categories,tags,featured_media';
const [posts,pages,comments]=await Promise.all([
  all('posts',{status:'publish',_fields:fields}), all('pages',{status:'publish',_fields:'id,slug,title,excerpt,content'}), all('comments',{status:'approve'},true)
]);
const catIds=[...new Set(posts.flatMap(p=>p.categories||[]))], tagIds=[...new Set(posts.flatMap(p=>p.tags||[]))], mediaIds=[...new Set(posts.map(p=>p.featured_media).filter(Boolean))];
const [cats,tags,featured]=await Promise.all([Promise.all(catIds.map(id=>one('categories',id))),Promise.all(tagIds.map(id=>one('tags',id))),Promise.all(mediaIds.map(id=>one('media',id)))]);
const catMap=new Map(cats.filter(Boolean).map(x=>[x.id,x])), tagMap=new Map(tags.filter(Boolean).map(x=>[x.id,x])), mediaMapById=new Map(featured.filter(Boolean).map(x=>[x.id,x]));
const commentsByPost=new Map(); for(const c of comments){if(!commentsByPost.has(c.post))commentsByPost.set(c.post,[]);commentsByPost.get(c.post).push({author:c.author_name||'Anonymous',date:c.date,content:c.content?.rendered||''});}
const mediaMap=new Map(); const reg=url=>{const dest=uploadPath(url);if(dest)mediaMap.set(dest,url.startsWith('/')?`${SITE}${url}`:url);};
for(const p of posts){
  const f=mediaMapById.get(p.featured_media); const cats=(p.categories||[]).map(id=>catMap.get(id)).filter(Boolean).filter(c=>c.slug!=='uncategorized'); const ts=(p.tags||[]).map(id=>tagMap.get(id)).filter(Boolean);
  const fm={title:decode(p.title?.rendered),slug:p.slug,published:p.date,updated:p.modified,author:'Yonatan Kra',description:decode(p.excerpt?.rendered),categories:cats.map(c=>({name:decode(c.name),slug:c.slug,path:categoryPath(c)})),tags:ts.map(t=>decode(t.name)),...(uploadPath(f?.source_url)?{featuredImage:uploadPath(f.source_url)}:{}),canonical:`${SITE}/${p.slug}/`,comments:(commentsByPost.get(p.id)||[]).sort((a,b)=>a.date.localeCompare(b.date))};
  const body=p.content?.rendered||''; fs.writeFileSync(path.join(postDir,`${p.slug}.md`),`---\n${YAML.stringify(fm,{lineWidth:0}).trim()}\n---\n\n${body}\n`); for(const u of htmlMedia(body))reg(u); if(f){reg(f.source_url);for(const s of Object.values(f.media_details?.sizes||{}))reg(s.source_url);}
}
const keep=new Set(['about-me','privacy-policy','hacktoberfest-2020']); for(const p of pages.filter(p=>keep.has(p.slug))){const fm={title:decode(p.title?.rendered),slug:p.slug,description:decode(p.excerpt?.rendered),canonical:`${SITE}/${p.slug}/`},body=p.content?.rendered||'';fs.writeFileSync(path.join(pageDir,`${p.slug}.md`),`---\n${YAML.stringify(fm,{lineWidth:0}).trim()}\n---\n\n${body}\n`);for(const u of htmlMedia(body))reg(u);}
fs.mkdirSync('migration',{recursive:true});fs.writeFileSync('migration/legacy-posts.json',JSON.stringify(posts.map(p=>({id:p.id,url:`/${p.slug}/`,title:decode(p.title?.rendered)})),null,2)+'\n');fs.writeFileSync('migration/media-urls.json',JSON.stringify([...mediaMap].map(([dest,url])=>({dest,url})),null,2)+'\n');
console.log(`Imported ${posts.length} posts, ${comments.length} approved comments, ${mediaMap.size} referenced media URLs; resolved ${catMap.size} categories, ${tagMap.size} tags, ${mediaMapById.size} featured media.`); if(posts.length!==85)throw new Error(`Expected 85 published posts, got ${posts.length}`);
