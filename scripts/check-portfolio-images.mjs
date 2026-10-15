import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import sharp from 'sharp';

const root=path.resolve(process.env.BUILD_DIR||'dist');
const pages=[path.join(root,'index.html')];
for(const entry of await readdir(path.join(root,'work'),{withFileTypes:true}))
  if(entry.isDirectory())pages.push(path.join(root,'work',entry.name,'index.html'));
const images=new Set();
for(const page of pages){
  const html=await readFile(page,'utf8');
  for(const match of html.matchAll(/(?:src|srcset|href)="([^"]+)"/g))
    for(const candidate of match[1].split(',')){
      const url=candidate.trim().split(/\s+/)[0].split('?')[0];
      if(url.startsWith('/')&&/\.(?:png|jpe?g|webp)$/.test(url))images.add(decodeURIComponent(url));
    }
}
const failures=[];
for(const image of images)try{await sharp(path.join(root,image)).stats();}catch(error){failures.push(`${image}: ${error.message}`);}
assert.equal(failures.length,0,`Undecodable portfolio images:\n${failures.join('\n')}`);
console.log(`Decoded ${images.size} portfolio images across ${pages.length} pages, including every responsive variant.`);
