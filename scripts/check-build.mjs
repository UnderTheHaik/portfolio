import {readFile,readdir,access} from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import sharp from 'sharp';
const root=path.resolve(process.env.BUILD_DIR||'dist');
const base=(process.env.BASE_PATH||'').replace(/\/$/,'');
async function walk(dir){const entries=await readdir(dir,{withFileTypes:true});return (await Promise.all(entries.map(e=>e.isDirectory()?walk(path.join(dir,e.name)):path.join(dir,e.name)))).flat();}
const files=await walk(root);const html=files.filter(f=>f.endsWith('.html'));
for(const f of html){const text=await readFile(f,'utf8');assert.match(text,/<title>.+<\/title>/);assert.match(text,/name="description"/);assert.match(text,/rel="canonical"/);for(const [,href] of text.matchAll(/(?:href|src)="([^"#]+)"/g)){if(!href.startsWith('/'))continue;assert.ok(!base||href.startsWith(base+'/'),`Missing base path: ${href}`);const local=decodeURIComponent(href.slice(base.length).split(/[?#]/)[0]);const target=path.join(root,local.endsWith('/')?`${local}index.html`:local);await access(target).catch(()=>{throw Error(`Broken local link in ${f}: ${href}`);});}}
for(const name of ['sitemap-index.xml','robots.txt'])await access(path.join(root,name));
const home=await readFile(path.join(root,'index.html'),'utf8');assert.ok(home.includes('Ready to begin'));assert.ok(home.includes('1,700'));assert.ok(!home.includes('senior developer'));assert.ok(!home.includes('Transforming ideas into digital experiences'));
for(const slug of ['her-circle','nisma','haya2','sift-and-saffron','les-mots-dun-montagnard','personalized-perfume','crumb-and-cup','second-story','noura-beauty-house']){
 const study=await readFile(path.join(root,'work',slug,'index.html'),'utf8');
 assert.ok(study.includes('id="branding"'), `${slug}: missing branding section`);
 assert.ok(!study.includes('<h2>Challenges</h2>'), `${slug}: old case-study narrative remains`);
 assert.match(study,/srcset="/);
 assert.equal((study.match(/class="capture-pair"/g)||[]).length,3,`${slug}: expected three screenshot pairs`);
 const labels=[...study.matchAll(/<figcaption><span>(Laptop|Phone)<\/span><span>(\d+) × (\d+)<\/span><\/figcaption>\s*<a[^>]*href="([^"]+)"/g)];
 assert.equal(labels.length,6,`${slug}: expected six dimension labels`);
 for(const [,device,width,height,href] of labels){
  const image=path.join(root,decodeURIComponent(href.slice(base.length)));
  const metadata=await sharp(image).metadata();
  assert.equal(Number(width),metadata.width,`${slug} ${device}: incorrect width label`);
  assert.equal(Number(height),metadata.height,`${slug} ${device}: incorrect height label`);
 }
}
assert.ok(home.includes('Hi, I’m ken.lou'));
const projectOrder=[...home.matchAll(/aria-label="Visit ([^"]+) website"/g)].map(match=>match[1]);
assert.deepEqual(projectOrder.slice(0,3),['Sift &amp; Saffron','Noura Beauty House','Crumb &amp; Cup']);
assert.ok(!home.includes('href="https://wa.me/"'));
console.log(`Checked ${html.length} HTML pages: metadata, local links/assets, base paths, homepage copy, sitemap, and robots file.`);

const sitemap = await readFile(path.join(root,'sitemap-0.xml'),'utf8');
assert.ok(!/\/(?:essays|journal|fr|tags|categories|demos)(?:\/|<)/.test(sitemap), 'Removed content must not be in sitemap');
assert.ok(!sitemap.includes('/404/'), 'Error pages must not be in sitemap');
for (const removed of ['essays','journal','fr','tags','categories','rss.xml','work/underthehaik']) {
 assert.ok(!files.some(file => { const relative=path.relative(root,file).replaceAll('\\','/'); return relative===removed || relative.startsWith(removed+'/'); }), `Removed output remains: ${removed}`);
}
for (const slug of ['web-design-dubai','one-page-website-dubai','visual-identity-dubai','website-branding-package-dubai','website-care-uae']) {
 const route=`services/${slug}/`;
 const content=await readFile(path.join(root,route,'index.html'),'utf8');
 assert.equal((content.match(/<h1[ >]/g)||[]).length,1);
 assert.ok(sitemap.includes(route));
 assert.ok(home.includes(`href="${base}/${route}"`));
}
for (const file of html.filter(file => file.includes(path.join('demos',path.sep)))) {
 if(file.includes('serenas-sanctuary'))continue;
 assert.match(await readFile(file,'utf8'), /name="robots" content="noindex, follow"/);
}
assert.ok(!home.includes('350 AED') && !home.includes('1,000 AED'), 'Stale metadata prices');
for (const slug of ['sift-and-saffron','noura-beauty-house','crumb-and-cup']) assert.ok(home.includes(`href="${base}/work/${slug}/"`));
assert.match(await readFile(path.join(root,'404.html'),'utf8'),/name="robots" content="noindex, follow"/);
console.log('SEO regression checks passed: journal removal, service discovery, demo noindex, metadata and error page.');
