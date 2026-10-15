import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  type?: 'website' | 'product' | 'article';
  image?: string;
  jsonLd?: Record<string, any>;
}

const DEFAULT_TITLE = 'Decent School Furniture - Quality Furniture. Better Learning.';
const DEFAULT_DESCRIPTION =
  'Premium school, college, and educational institutional furniture in Pakistan. Durable student desks, chairs, classroom benches, teacher tables, lab workstations, and bulk quotation orders.';

export const SEO: React.FC<SEOProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '',
  type = 'website',
  image = 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80',
  jsonLd,
}) => {
  const fullTitle = title
    ? title.includes('Decent School Furniture')
      ? title
      : `${title} | Decent School Furniture`
    : DEFAULT_TITLE;

  const currentUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}${path ? (path.startsWith('/') ? path : '/' + path) : ''}`
    : 'https://decentschoolfurniture.com';

  // Direct DOM synchronization guarantee alongside Helmet
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = fullTitle;

      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);

      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', fullTitle);

      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', description);

      let twitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (twitterTitle) twitterTitle.setAttribute('content', fullTitle);

      let twitterDesc = document.querySelector('meta[name="twitter:description"]');
      if (twitterDesc) twitterDesc.setAttribute('content', description);
    }
  }, [fullTitle, description]);

  return (
    <Helmet>
      {/* Standard HTML Title & Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={currentUrl} />

      {/* OpenGraph Tags */}
      <meta property="og:site_name" content="Decent School Furniture" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {/* Schema.org Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};
