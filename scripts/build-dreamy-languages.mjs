import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('public/demos/dreamy-home');
const source=await readFile(path.join(root,'app.js'),'utf8');
const dictionary=JSON.parse(await readFile(path.join(root,'translations.json'),'utf8'));
for(const language of ['en','ar']) {
  let result=source;
  // Replace complete phrases in one pass, without translating product IDs or URLs.
  const keys=Object.keys(dictionary).sort((a,b)=>b.length-a.length);
  const pattern=new RegExp(keys.map(key=>key.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|'),'g');
  result=result.replace(pattern,key=>dictionary[key][language]);
  result=result.replaceAll("toLocaleLowerCase('fr')",`toLocaleLowerCase('${language}')`);
  result=result.replace('${group.length} modèle${group.length>1?\'s\':\'\'}',language==='en'?'${group.length} design${group.length>1?\'s\':\'\'}':'التصاميم: ${group.length}');
  result=result.replace('Voir les ${group.length} modèles',language==='en'?'View all ${group.length} designs':'عرض كل التصاميم (${group.length})');
  result=result.replace('${list.length} modèle${list.length>1?\'s\':\'\'} dans ${new Set(list.map(p=>p.cat)).size} collection${new Set(list.map(p=>p.cat)).size>1?\'s\':\'\'}',language==='en'?'${list.length} design${list.length>1?\'s\':\'\'} in ${new Set(list.map(p=>p.cat)).size} collection${new Set(list.map(p=>p.cat)).size>1?\'s\':\'\'}':'التصاميم: ${list.length} · الأقسام: ${new Set(list.map(p=>p.cat)).size}');
  result=result.replace('Voir la photo ${i+1} de ${p.name}',language==='en'?'View photo ${i+1} of ${p.name}':'عرض الصورة ${i+1} من ${p.name}');
  result=result.replace('Vue ${i+1}',language==='en'?'View ${i+1}':'الصورة ${i+1}');
  await writeFile(path.join(root,`app.${language}.js`),result);
}
console.log('Built English and Arabic Dreamy Home pages from the French source.');
