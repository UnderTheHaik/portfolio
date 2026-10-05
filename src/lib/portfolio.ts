import secondStory from '../assets/portfolio/captures/second-story--home--laptop.jpg';
import nisma from '../assets/portfolio/nisma.jpg';
import haya from '../assets/portfolio/haya2.jpg';
import bakery from '../assets/portfolio/sift-and-saffron.jpg';
import poetry from '../assets/portfolio/les-mots-dun-montagnard.jpg';
import journal from '../assets/portfolio/underthehaik.jpg';
import perfume from '../assets/portfolio/personalized-perfume.jpg';
import cafe from '../assets/portfolio/crumb-and-cup.jpg';

// Leave these blank until the owner supplies verified contact details.
export const contact = { whatsapp: '', email: '' };
export const projects = [
  {
    slug: 'nisma', name: 'Nisma', type: 'E-commerce concept', category: 'Lifestyle / E-commerce', image: nisma, color: 'sage',
    summary: 'A considered storefront for everyday essentials.',
    stack: ['WordPress', 'WooCommerce', 'PHP', 'CSS', 'JavaScript'],
    sections: [
      ['Context', 'A self-initiated concept for a fictional UAE lifestyle store, bringing scarves, stationery, prayer essentials and gifts into one catalogue. This is a portfolio project, not a client business.'],
      ['Problem', 'A varied catalogue needs a clear route from discovering a collection to choosing a product, without losing the quiet character of the brand.'],
      ['Approach', 'Organise products into four collections, use consistent product cards and place prices, variations and delivery information close to the purchase decision.'],
      ['Design', 'Soft olive, warm neutral backgrounds and generous spacing support an unhurried browsing experience. System sans-serif and Georgia keep typography readable without external font requests. Product photography provides the visual focus.'],
      ['Development', 'A custom WordPress theme wraps WooCommerce catalogue, cart and account templates. PHP handles catalogue filters and product information; JavaScript adds saved-product controls. Optimised WebP photographs are served locally.'],
      ['Challenges', 'Product variations, stock, shipping and discounts need consistent behaviour across the shopping journey. The local demo uses WooCommerce calculations rather than recreating commerce logic in the browser.'],
      ['Result', 'A responsive storefront with collections, product details and a local test checkout. The public GitHub Pages site is a static design preview: checkout, accounts and server filtering require the local runtime. No real payments or sales are claimed.'],
      ['What I learned', 'A polished shop also depends on the less visible details: variation states, delivery thresholds and clear explanations of what a demo can actually do.'],
    ],
  },
  {
    slug: 'sift-and-saffron', name: 'Sift & Saffron', type: 'Business website concept', category: 'Food / Small business', image: bakery, color: 'sand',
    summary: 'A warm bakery website with a clear enquiry journey.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Sharp'],
    sections: [
      ['Context', 'A self-initiated website for a fictional Dubai home bakery. The brand, menu, prices and ordering policies are illustrative; this is not a real bakery or client.'],
      ['Problem', 'Visitors need to understand the menu, compare serving sizes and share the details of a custom cake without a complicated ordering flow.'],
      ['Approach', 'Connect a visual homepage to a filterable menu, individual product pages and a custom enquiry form. Include delivery and lead-time information before visitors start an enquiry.'],
      ['Design', 'Warm cream, cocoa and muted pink colours complement the supplied photography. Serif display headings and a simple sans-serif body create a friendly, readable small-business identity.'],
      ['Development', 'Semantic HTML, mobile-first CSS and vanilla JavaScript are generated with Node.js. Sharp produces responsive WebP images. The interface includes menu filtering, a native dialog and local enquiry validation.'],
      ['Challenges', 'The enquiry flow validates dates, guest counts and inspiration images while staying honest about its limits. Selected images remain local, and WhatsApp cannot attach files through a click-to-chat link.'],
      ['Result', 'A multi-page business website with menu details, FAQs and a message preview. No enquiry is sent, no live ordering service is connected and no conversion results are claimed.'],
      ['What I learned', 'Useful business websites answer practical questions early. A clear lead time or delivery explanation can be more helpful than another decorative section.'],
    ],
  },
  {
    slug: 'haya2', name: 'Haya 2', type: 'E-commerce concept', category: 'Fashion / E-commerce', image: haya, color: 'rose',
    summary: 'An abaya boutique built around silhouette and detail.',
    stack: ['WordPress', 'WooCommerce', 'PHP', 'CSS', 'JavaScript'],
    sections: [
      ['Context', 'A portfolio boutique concept showcasing abayas through sample products, AED prices and UAE delivery settings. It is not presented as a paying client or a live retail operation.'],
      ['Problem', 'Fashion imagery needs room to breathe, while customers still need practical information about size, stock and delivery.'],
      ['Approach', 'Separate everyday, occasion, signature and light-tone collections. Connect editorial imagery to the catalogue, then use product pages and a size guide to support selection.'],
      ['Design', 'Burgundy, ivory and dark text create a restrained fashion identity. Large serif headings contrast with practical navigation and product labels; tall photography emphasises the garments.'],
      ['Development', 'A custom WordPress/WooCommerce storefront includes variable products, catalogue filters, coupon settings and UAE shipping. The local demo supports guest checkout and simulated payment outcomes.'],
      ['Challenges', 'Per-size stock, unavailable variations and shipping thresholds after discounts need clear states. Product images also need consistent proportions without cropping away important garment details.'],
      ['Result', 'A responsive boutique interface and a working local commerce demo. The public site showcases the design and catalogue; account and checkout services are not available on the static preview. Products and policies are illustrative.'],
      ['What I learned', 'Editorial presentation and shopping clarity have to work together. Size availability and order details deserve as much attention as the homepage.'],
    ],
  },
  {
    slug: 'les-mots-dun-montagnard', name: 'Les mots d’un montagnard', type: 'Family publishing project', category: 'Poetry / Editorial', image: poetry, color: 'blue',
    summary: 'A reading space for the poetry of Djamel Metref.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Static publishing'],
    sections: [
      ['Context', 'A family project giving Djamel Metref’s poetry a home online. The public site identifies the collection as created by his daughter. This is a publishing project, not a claimed commercial client engagement.'],
      ['Problem', 'A growing collection needs to be easy to explore while preserving the rhythm, line breaks and atmosphere of each poem.'],
      ['Approach', 'Give poems individual pages and organise the archive by theme, date and location. Keep news in its own section so that updates do not interrupt the collection.'],
      ['Design', 'A book-like desktop layout, quiet serif typography and landscape photography establish a literary setting. On smaller screens, the reading layout adapts to the available space.'],
      ['Development', 'Static HTML pages, shared CSS and JavaScript support the archive and its filters. Individual URLs make poems directly shareable and readable without an application shell.'],
      ['Challenges', 'Poetry has different layout needs from ordinary paragraphs. Line lengths, image contrast and small-screen reading must be considered together. Archive metadata also needs to stay consistent as the collection grows.'],
      ['Result', 'A published French-language poetry collection with individual reading pages, an organised archive and a separate news section. The site presents the author’s actual writing; no audience metrics are claimed.'],
      ['What I learned', 'The content should determine the interface. For poetry, preserving a comfortable reading rhythm matters more than adding visual effects.'],
    ],
  },
  {
    slug: 'underthehaik', name: 'Under the Haik', type: 'Personal publishing project', category: 'Journal / Bilingual', image: journal, color: 'cream',
    summary: 'An independent journal in English and French.',
    stack: ['Astro', 'TypeScript', 'Markdown', 'CSS', 'Sharp'],
    sections: [
      ['Context', 'My personal writing space for essays on faith, heritage, society, technology and everyday life. This is an independent personal project.'],
      ['Problem', 'Long-form essays need a comfortable reading experience, a clear subject structure and a way to navigate between English and French versions.'],
      ['Approach', 'Use content collections for articles, individual essay pages, subject archives and language-aware navigation. Separate the writing content from the shared presentation.'],
      ['Design', 'An editorial masthead, restrained palette and generous reading width put the words first. Article images support the subject, with captions and credits where applicable. A dark reading mode is available.'],
      ['Development', 'Astro generates static pages from typed Markdown content. Responsive WebP images, RSS, sitemap generation and page metadata support publishing and discovery. TypeScript helps keep content and route handling consistent.'],
      ['Challenges', 'Translations, article metadata and image sources need to remain aligned as the journal grows. Reading layouts must also work with long titles and different image proportions.'],
      ['Result', 'A published bilingual journal with essay and category pages, responsive imagery and a repeatable content workflow. Some editorial illustrations are AI-generated and identified in the journal documentation.'],
      ['What I learned', 'A content website needs a maintainable publishing workflow as much as a strong homepage. Shared layouts and structured metadata make future updates more reliable.'],
    ],
  },
  {
    slug: 'personalized-perfume', name: 'Personalized Perfume', type: 'Storefront concept', category: 'Fragrance / Customisation', image: perfume, color: 'sand',
    summary: 'A fragrance storefront with a personal scent-building journey.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    sections: [
      ['Context', 'A portfolio showcase for a bespoke fragrance studio concept set in Bur Dubai. The collection, prices and studio story are illustrative; this is not presented as a commercial client engagement.'],
      ['Problem', 'Visitors need to explore signature fragrances and understand how to personalise a scent, with a clear distinction between ready-made products and custom choices.'],
      ['Approach', 'Separate the collection, personalisation, story and visit information into dedicated routes. Product cards pair scent notes with bottle sizes, while a separate journey introduces composing a personal fragrance.'],
      ['Design', 'Warm ivory, dark brown and muted gold create a restrained fragrance identity. Italiana headings contrast with DM Sans interface text; bottle photography and generous spacing keep the products prominent.'],
      ['Development', 'Static HTML routes share CSS and vanilla JavaScript. The script renders product cards, filters fragrance families, updates AED prices for bottle sizes and stages selections in a preview shopping bag.'],
      ['Challenges', 'Size-dependent prices and product selections need to stay consistent between catalogue cards and the bag. Customisation also needs understandable choices and a clear boundary between a preview and a real order.'],
      ['Result', 'A published multi-page fragrance showcase with a signature collection, personalisation route and shopping-bag preview. Interactions do not submit orders or process payments; no business performance is claimed.'],
      ['What I learned', 'Personalisation needs a clear structure. Separating signature products from custom choices makes the journey easier to understand and the interface easier to maintain.'],
    ],
  },
  {
    slug: 'crumb-and-cup', name: 'Crumb & Cup', type: 'Café website concept', category: 'Hospitality / Small business', image: cafe, color: 'cream',
    summary: 'A neighbourhood café website centred on the menu and the visit.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    sections: [
      ['Context', 'A portfolio concept imagining a neighbourhood café and bakery in Dubai DMCC. The menu, prices and café story are illustrative, not evidence of a client business or operating venue.'],
      ['Problem', 'A café website should make it simple to browse food and drinks, understand the atmosphere and find visit information without a complicated interface.'],
      ['Approach', 'Use a single-page structure connecting the menu, café story and visit section. Divide the menu into pastries, coffee and breakfast so visitors can quickly explore the offering.'],
      ['Design', 'Cream, cocoa and rust colours support the warm café photography. Playfair Display-style serif headings and DM Sans body text establish an approachable identity, with large images and readable menu descriptions.'],
      ['Development', 'Semantic HTML and responsive CSS provide the page structure. Vanilla JavaScript updates a shared menu panel from structured records. Menu tabs expose selected states and support arrow keys, Home and End for keyboard navigation.'],
      ['Challenges', 'Changing menu categories must keep the selected tab, keyboard focus and panel label aligned. The layout also needs to balance atmospheric photography with practical descriptions and AED prices on small screens.'],
      ['Result', 'A published café showcase with three menu categories, a story section and a neighbourhood map link. The map points to the DMCC area rather than a verified café address. No ordering or payment service is connected.'],
      ['What I learned', 'A small hospitality site benefits from a focused structure. Accessible category controls and useful visit information make the visual identity easier to put to use.'],
    ],
  },
  {
    slug: 'second-story', name: 'Second Story', type: 'Thrift store website concept', category: 'Fashion / Secondhand', image: secondStory, color: 'rose',
    summary: 'A photo-led thrift store website that connects buying, selling and responsible shopping.',
    demoPath: 'demos/second-story/',
    stack: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Sharp'],
    sections: [
      ['Context', 'A portfolio concept for a store that buys and sells secondhand clothes, shoes and jewellery. Second Story is a suggested brand name; no operating business or client engagement is claimed.'],
      ['Problem', 'Visitors need to understand both sides of the store: discovering secondhand finds and selling pieces they no longer wear. Larger wardrobe clear-outs also need a clear explanation of home valuations.'],
      ['Approach', 'Connect five pages: the homepage, collections, store story, responsible shopping and selling items. The selling page explains preparation, assessment and the decision to accept an offer, with a dedicated home valuation section.'],
      ['Design', 'Deep burgundy, warm paper tones and serif headings give the store an editorial identity. Supplied Unsplash photography shows denim, shoes, jewellery and thrift store interiors; the responsive layout puts these images alongside practical information.'],
      ['Development', 'Static HTML pages share responsive CSS and a small navigation script. Sharp converts the supplied photographs into local WebP assets. Semantic details elements provide accessible FAQs on the selling page.'],
      ['Challenges', 'The buying and selling journeys need equal clarity without suggesting live stock or a connected booking service. The collection imagery is illustrative, and home visits are described as arranged in advance rather than automatically booked.'],
      ['Result', 'A complete responsive five-page showcase, including clothes, shoes and jewellery collections, responsible shopping guidance and home valuation information. The public demo lets visitors explore the design; no payments, booking or enquiries are submitted.'],
      ['What I learned', 'A resale business website needs to explain how pieces enter the store as clearly as how shoppers discover them. Practical valuation information gives the brand message a useful next step.'],
    ],
  },
];
