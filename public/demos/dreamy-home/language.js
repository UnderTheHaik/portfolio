(() => {
  const supported=['fr','en','ar'];
  const currentURL=new URL(location.href);
  let saved;
  try { saved=localStorage.getItem('dreamy-home-language'); } catch {}
  const requested=currentURL.searchParams.get('lang');
  const language=supported.includes(requested)?requested:supported.includes(saved)?saved:'fr';
  window.DreamyLanguage=language;
  try { localStorage.setItem('dreamy-home-language',language); } catch {}
  document.documentElement.lang=language;
  document.documentElement.dir=language==='ar'?'rtl':'ltr';
  const file=location.pathname.split('/').pop()||'index.html';
  const titles={fr:{'index.html':'Dreamy Home | Votre petit monde de douceur','products.html':'La collection | Dreamy Home','about.html':'À propos | Dreamy Home','product.html':'Nos modèles | Dreamy Home'},en:{'index.html':'Dreamy Home | Your little world of comfort','products.html':'The collection | Dreamy Home','about.html':'About | Dreamy Home','product.html':'Our designs | Dreamy Home'},ar:{'index.html':'دريمي هوم | عالمكِ الصغير من النعومة','products.html':'المجموعة | دريمي هوم','about.html':'من نحن | دريمي هوم','product.html':'تصاميمنا | دريمي هوم'}};
  document.title=titles[language][file]||titles[language]['index.html'];
  const descriptions={fr:'Découvrez les collections Dreamy Home : linge de lit, veilleuses, pyjamas et décoration. Commandez sur Instagram.',en:'Discover Dreamy Home bedding, bedside lamps, sleepwear and décor. Order through Instagram.',ar:'اكتشفي مفروشات دريمي هوم ومصابيحها الليلية وملابس النوم والديكور. للطلب عبر إنستغرام.'};
  document.querySelector('meta[name="description"]').content=descriptions[language];
  const localLinks=()=>{document.querySelectorAll('.language-switcher a').forEach(link=>{const url=new URL(location.href);url.searchParams.set('lang',link.lang);link.href=url.href;});document.querySelectorAll('a[href]').forEach(link=>{
    const raw=link.getAttribute('href');
    if(!raw||raw.startsWith('#')||link.closest('.language-switcher'))return;
    const url=new URL(raw,location.href);
    if(url.origin!==location.origin||!url.pathname.endsWith('.html'))return;
    url.searchParams.set('lang',language);
    link.href=url.href;
  });};
  const script=document.createElement('script');
  script.src=language==='fr'?'app.js':'app.'+language+'.js';
  script.onload=()=>{
    const switcher=document.createElement('div');
    switcher.className='language-switcher';
    switcher.setAttribute('role','navigation');
    switcher.setAttribute('aria-label',language==='ar'?'اختيار اللغة':language==='en'?'Choose language':'Choisir la langue');
    for(const [code,label] of [['fr','FR'],['en','EN'],['ar','العربية']]) {
      const link=document.createElement('a');const url=new URL(location.href);
      url.searchParams.set('lang',code);link.href=url.href;link.lang=code;link.hreflang=code;link.dir=code==='ar'?'rtl':'ltr';link.textContent=label;
      if(code===language)link.setAttribute('aria-current','true');
      switcher.append(link);
    }
    document.querySelector('#header header').append(switcher);
    localLinks();
    new MutationObserver(localLinks).observe(document.querySelector('#main'),{childList:true,subtree:true});
  };
  document.head.append(script);
})();
