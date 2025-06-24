import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noIndex?: boolean;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "MediCare Companion - Smart Medication Management & Adherence Tracking",
  description = "Comprehensive medication management app for patients and caregivers. Track medication adherence, set reminders, monitor health progress with real-time analytics and caretaker support.",
  keywords = "medication management, pill reminder, medication adherence, healthcare app, patient care, caretaker dashboard, medication tracking, health monitoring, prescription management, elderly care",
  image = "https://medicare-companion.com/images/og-image.png",
  url = "https://medicare-companion.com/",
  type = "website",
  noIndex = false
}) => {
  const fullTitle = title.includes('MediCare Companion') ? title : `${title} | MediCare Companion`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEOHead;