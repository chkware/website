import Script from 'next/script';
import { 
  generateSoftwareStructuredData, 
  generateOrganizationStructuredData,
  generateBreadcrumbStructuredData 
} from '@/lib/seo/metadata';

interface StructuredDataProps {
  type: 'software' | 'organization' | 'breadcrumb';
  data?: any;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  let structuredData;
  
  switch (type) {
    case 'software':
      structuredData = generateSoftwareStructuredData();
      break;
    case 'organization':
      structuredData = generateOrganizationStructuredData();
      break;
    case 'breadcrumb':
      structuredData = data ? generateBreadcrumbStructuredData(data) : null;
      break;
    default:
      structuredData = null;
  }
  
  if (!structuredData) return null;
  
  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  );
}

// Combined structured data for home page
export function HomePageStructuredData() {
  return (
    <>
      <StructuredData type="software" />
      <StructuredData type="organization" />
    </>
  );
}