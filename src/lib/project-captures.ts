import type { ImageMetadata } from 'astro';

const images = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/portfolio/captures/*.jpg', { eager: true },
);

const pages: Record<string, [string, string][]> = {
 'loom-and-kiln': [['home','Homepage'], ['collection','Artisan collection'], ['makers','Maker studios']],
 'brightpath-academy': [['home','Homepage'], ['programs','Tutoring programs'], ['contact','Lesson enquiry']],
 'her-circle': [['home','Homepage'], ['gatherings','Community gatherings'], ['join','Joining and guidelines']],
  'noura-beauty-house': [['home', 'Homepage'], ['services', 'Service catalogue'], ['book', 'Appointment planner']],
  'second-story': [['home', 'Homepage'], ['collection', 'The collection'], ['sell', 'Selling and home valuations']],
  nisma: [['home', 'Homepage'], ['shop', 'Shop catalogue'], ['collections', 'Collections']],
  haya2: [['home', 'Homepage'], ['shop', 'Abaya catalogue'], ['sizing', 'Size guide']],
  'sift-and-saffron': [['home', 'Homepage'], ['menu', 'Bakery menu'], ['enquiry', 'Custom cake enquiry']],
  'les-mots-dun-montagnard': [['home', 'Homepage'], ['archive', 'Poetry archive'], ['poem', 'Individual poem']],
  underthehaik: [['home', 'Homepage'], ['archive', 'Essay archive'], ['essay', 'Individual essay']],
  'personalized-perfume': [['home', 'Homepage'], ['collection', 'Fragrance collection'], ['personalize', 'Create your scent']],
  'crumb-and-cup': [['home', 'Homepage'], ['menu', 'Menu section'], ['story', 'Story section']],
};

export function getProjectCaptures(slug: string) {
  return (pages[slug] || []).map(([page, label]) => {
    const shot = (device: string) => {
      const image = images[`../assets/portfolio/captures/${slug}--${page}--${device}.jpg`]?.default;
      if (!image) throw new Error(`Missing ${device} screenshot for ${slug}/${page}`);
      return image;
    };
    return { page, label, laptop: shot('laptop'), phone: shot('phone') };
  });
}
