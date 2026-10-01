import {url} from './content';
export const categoryFr:Record<string,string>={Faith:'Foi',Heritage:'Patrimoine',Society:'Société',Technology:'Technologie',Motherhood:'Maternité','Personal Essays':'Essais personnels'};
export const frUrl=(path='')=>url(`fr/${path}`);
export function routeContext(pathname:string){const base=import.meta.env.BASE_URL.replace(/\/$/,'');const relative=pathname.slice(base.length).replace(/^\//,'');const french=relative==='fr/'||relative.startsWith('fr/');const path=french?relative.slice(3):relative;const missing=path==='404/'||path==='404.html';const journalHome=path==='journal/'||(french&&path==='');return {french,path,english:url(missing?'404.html':journalHome?'journal/':path),fr:frUrl(missing?'404/':journalHome?'':path)};}
