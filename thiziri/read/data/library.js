/* Bundled collection adapter. All content loads from local files. */
window.THIZIRI_LIBRARY = {
 categories: window.THIZIRI_COLLECTIONS.map(c=>({id:c.id,title:c.title,ar:c.arabicTitle,fr:c.frenchTitle,symbol:c.symbol,section:c.section||'adhkar',desc:c.entryCount+' readings'})),
 entries: window.THIZIRI_COLLECTIONS.flatMap(c=>c.entries.map(d=>({id:d.id,title:d.title,ar:d.arabic,meaning:d.frenchMeaning||'',meaningEn:d.englishMeaning||'',repeat:d.repetitions||1,displayedCount:d.repetitions,reading:d.readingOnly,references:d.reference||'',ordinal:d.order,contextAr:d.contextArabic||null,contextFr:d.contextFrench||null,contextEn:d.contextEnglish||null,review:d.review,countBasis:d.countBasis,cats:[c.id]})))
};
