import React from 'react';
import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  type: 'WebPage' | 'MedicalWebPage' | 'SoftwareApplication' | 'Organization';
  data: Record<string, any>;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

// Predefined structured data components
export const MedicationAppStructuredData: React.FC = () => (
  <StructuredData
    type="SoftwareApplication"
    data={{
      name: "MediCare Companion",
      description: "Comprehensive medication management application for patients and caregivers with real-time adherence tracking and monitoring.",
      url: "https://medicare-companion.com",
      applicationCategory: "HealthApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD"
      },
      featureList: [
        "Medication tracking and reminders",
        "Adherence monitoring and analytics", 
        "Caretaker dashboard and notifications",
        "Photo proof of medication intake",
        "Real-time health progress tracking",
        "Secure patient data management"
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "150"
      }
    }}
  />
);

export const OrganizationStructuredData: React.FC = () => (
  <StructuredData
    type="Organization"
    data={{
      name: "MediCare Companion",
      url: "https://medicare-companion.com",
      logo: "https://medicare-companion.com/images/logo.png",
      description: "Leading medication management platform helping patients and caregivers improve medication adherence and health outcomes.",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-800-MEDICARE",
        contactType: "customer service",
        availableLanguage: ["English", "Spanish"]
      },
      sameAs: [
        "https://twitter.com/medicare_companion",
        "https://facebook.com/medicarecompanion", 
        "https://linkedin.com/company/medicare-companion"
      ]
    }}
  />
);

export const MedicalWebPageStructuredData: React.FC<{ pageName: string; pageDescription: string }> = ({ 
  pageName, 
  pageDescription 
}) => (
  <StructuredData
    type="MedicalWebPage"
    data={{
      name: pageName,
      description: pageDescription,
      medicalAudience: [
        {
          "@type": "MedicalAudience",
          audienceType: "Patient"
        },
        {
          "@type": "MedicalAudience",
          audienceType: "Caregiver"
        }
      ],
      about: {
        "@type": "MedicalCondition",
        name: "Medication Adherence"
      }
    }}
  />
);

export default StructuredData;