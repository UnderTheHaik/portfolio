import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import crypto from 'node:crypto';
const root=path.resolve(process.env.BUILD_DIR||'dist');
const origin='https://underthehaik.com';
const sitemap=await fs.readFile(path.join(root,'thiziri/sitemap.xml'),'utf8');
const urls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
assert.equal(new Set(urls).size,urls.length);
const library=JSON.parse(await fs.readFile(path.join(root,'thiziri/read/data/index.json'),'utf8'));
assert.equal(urls.length,6+3*(library.collectionCount+1));
let entriesChecked=0;
for(const url of urls){
 const relative=new URL(url).pathname;
 const html=await fs.readFile(path.join(root,relative,'index.html'),'utf8');
 const body=html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/g,'');
 assert.equal((body.match(/<h1\b/g)||[]).length,1,`${relative}: H1`);
 assert.ok(html.includes(`rel="canonical" href="${url}"`));
 assert.match(html,/<meta name="description" content="[^"]+"/);
 assert.match(html,/property="og:image"/);
 assert.ok(!html.includes('content="noindex'));
 for(const [,href] of html.matchAll(/(?:href|src)="([^"#]+)"/g)){
  if(!href.startsWith('/'))continue;
  const local=decodeURIComponent(href.replaceAll('&amp;','&').split(/[?#]/)[0]);
  await fs.access(path.join(root,local.endsWith('/')?local+'index.html':local)).catch(()=>{throw Error(`${relative}: broken ${href}`)});
 }
 const lang=relative.match(/^\/thiziri\/(en|fr|ar)\//)?.[1];
 if(lang&&relative!==`/thiziri/${lang}/`){
  for(const other of ['en','fr','ar'])assert.ok(html.includes(`hreflang="${other}" href="${origin+relative.replace('/'+lang+'/', '/'+other+'/')}"`));
  const id=relative.split('/')[3];
  if(id!=='sources'){
   const c=JSON.parse(await fs.readFile(path.join(root,'thiziri/read/data',id+'.json'),'utf8'));
   assert.equal((body.match(/class="reading"/g)||[]).length,c.entries.length);
   const decode=value=>value.replaceAll('&amp;','&').replaceAll('&lt;','<').replaceAll('&gt;','>').replaceAll('&quot;','"').replaceAll('&#39;',"'");
   for(const entry of c.entries){assert.ok(body.includes(`id="${entry.id}"`));assert.ok(decode(body).includes(entry.arabic));const meaning=lang==='en'?entry.englishMeaning:lang==='fr'?entry.frenchMeaning:null;if(meaning)assert.ok(decode(body).includes(meaning));entriesChecked++;}
  }
 }
}
const reader=await fs.readFile(path.join(root,'thiziri/read/index.html'),'utf8');
for(const [,script] of reader.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)){
 new vm.Script(script);
 const hash=crypto.createHash('sha256').update(script).digest('base64');
 assert.ok(reader.includes(`'sha256-${hash}'`));
}
assert.ok((await fs.readFile(path.join(root,'robots.txt'),'utf8')).includes('/thiziri/sitemap.xml'));
assert.ok((await fs.readFile(path.join(root,'sitemap-index.xml'),'utf8')).includes('/thiziri/sitemap.xml'));
assert.equal(entriesChecked,library.entryCount*3);
console.log(`Verified ${urls.length} sitemap pages, ${entriesChecked} preserved reading/translation instances, reciprocal language links, assets, metadata and reader CSP hashes.`);
