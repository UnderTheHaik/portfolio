import {readFile,readdir,access} from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import sharp from 'sharp';
const root=path.resolve(process.env.BUILD_DIR||'dist');
const base=(process.env.BASE_PATH||'').replace(/\/$/,'');
async function walk(dir){const entries=await readdir(dir,{withFileTypes:true});return (await Promise.all(entries.map(e=>e.isDirectory()?walk(path.join(dir,e.name)):path.join(dir,e.name)))).flat();}
const files=await walk(root);const html=files.filter(f=>f.endsWith('.html'));
for(const f of html){const text=await readFile(f,'utf8');assert.match(text,/<title>.+<\/title>/);assert.match(text,/name="description"/);assert.match(text,/rel="canonical"/);for(const [,href] of text.matchAll(/(?:href|src)="([^"#]+)"/g)){if(!href.startsWith('/'))continue;assert.ok(!base||href.startsWith(base+'/'),`Missing base path: ${href}`);const local=decodeURIComponent(href.slice(base.length).split(/[?#]/)[0]);const target=path.join(root,local.endsWith('/')?`${local}index.html`:local);await access(target).catch(()=>{throw Error(`Broken local link in ${f}: ${href}`);});}}
for(const name of ['rss.xml','sitemap-index.xml','robots.txt'])await access(path.join(root,name));
const home=await readFile(path.join(root,'index.html'),'utf8');assert.ok(home.includes('Ready to begin'));assert.ok(home.includes('1,000'));assert.ok(!home.includes('senior developer'));assert.ok(!home.includes('Transforming ideas into digital experiences'));
for(const slug of ['her-circle','nisma','haya2','sift-and-saffron','les-mots-dun-montagnard','underthehaik','personalized-perfume','crumb-and-cup','second-story','noura-beauty-house']){
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
const projectOrder=[...home.matchAll(/aria-label="Read ([^"]+) case study"/g)].map(match=>match[1]);
assert.deepEqual(projectOrder.slice(0,3),['Sift &amp; Saffron','Noura Beauty House','Crumb &amp; Cup']);
assert.ok(home.includes('Business email coming soon.'));assert.ok(!home.includes('href="https://wa.me/"'));
console.log(`Checked ${html.length} HTML pages: metadata, local links/assets, base paths, homepage copy, RSS, sitemap, and robots file.`);
for(const page of ['index.html','essays/index.html','categories/index.html','about/index.html','contact/index.html','privacy/index.html','essays/who-owns-the-book/index.html']){const content=await readFile(path.join(root,'fr',page),'utf8');assert.match(content,/<html lang="fr"/);assert.ok(content.includes('Mode sombre'));assert.ok(content.includes('Accueil'));}
console.log('French page language and translated navigation verified.');
const example=await readFile(path.join(root,'essays/who-owns-the-book/index.html'),'utf8');
assert.match(example,/srcset="/);assert.match(example,/\.webp/);
for(const [,attrs] of example.matchAll(/<img\s+([^>]+)>/g)){if(attrs.includes('class="brand-logo"'))continue;assert.match(attrs,/alt="[^"]{10,}"/);assert.match(attrs,/width="\d+"/);assert.match(attrs,/height="\d+"/);}
console.log('Article cover, responsive sources, alt text and intrinsic dimensions verified.');

