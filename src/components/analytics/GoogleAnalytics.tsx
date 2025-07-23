"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  initializeGA,
  trackPageView,
  trackScrollDepth,
  trackTimeOnPage,
  trackCoreWebVitals,
  GA_MEASUREMENT_ID
} from '@/lib/analytics/google-analytics';

export function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Only initialize if GA_MEASUREMENT_ID is available
    if (GA_MEASUREMENT_ID) {
      initializeGA();
      trackCoreWebVitals();
      
      // Set up scroll depth tracking
      const cleanupScrollTracking = trackScrollDepth();
      
      // Set up time on page tracking
      const cleanupTimeTracking = trackTimeOnPage();
      
      return () => {
        cleanupScrollTracking?.();
        cleanupTimeTracking?.();
      };
    }
  }, []);

  useEffect(() => {
    // Track page views on route changes
    if (GA_MEASUREMENT_ID && pathname) {
      trackPageView(window.location.href, document.title);
    }
  }, [pathname]);

  // Don't render anything if no GA ID
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      {/* Google Analytics Script */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `,
        }}
      />
    </>
  );
}

// Hook for tracking events in components
export function useAnalytics() {
  return {
    trackEvent: (action: string, category: string, label?: string, value?: number) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action, {
          event_category: category,
          event_label: label,
          value: value,
        });
      }
    },
    trackConversion: (eventName: string, parameters?: any) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, {
          event_category: 'conversion',
          ...parameters,
        });
      }
    },
  };
}