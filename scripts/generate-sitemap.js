import fs from 'fs';
import path from 'path';

// Configuration
const DOMAIN = 'https://medicare-companion.com';
const OUTPUT_PATH = 'public/sitemap.xml';

// Define your routes with their properties
const routes = [
  {
    path: '/',
    changefreq: 'weekly',
    priority: '1.0',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/auth',
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/features/patient-dashboard',
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/features/caretaker-dashboard',
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/features/medication-tracking',
    changefreq: 'monthly',
    priority: '0.6',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/features/adherence-monitoring',
    changefreq: 'monthly',
    priority: '0.6',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/about',
    changefreq: 'monthly',
    priority: '0.5',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/contact',
    changefreq: 'monthly',
    priority: '0.4',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/help',
    changefreq: 'weekly',
    priority: '0.5',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/help/getting-started',
    changefreq: 'monthly',
    priority: '0.4',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/help/medication-management',
    changefreq: 'monthly',
    priority: '0.4',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/privacy',
    changefreq: 'yearly',
    priority: '0.3',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/terms',
    changefreq: 'yearly',
    priority: '0.3',
    lastmod: new Date().toISOString().split('T')[0]
  }
];

function generateSitemap() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${routes.map(route => `  <url>
    <loc>${DOMAIN}${route.path}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Ensure the public directory exists
  const publicDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Write the sitemap
  fs.writeFileSync(OUTPUT_PATH, sitemap);
  console.log(`✅ Sitemap generated successfully at ${OUTPUT_PATH}`);
  console.log(`📊 Generated ${routes.length} URLs`);
}

// Run the generator
generateSitemap();