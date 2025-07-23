/**
 * Google Analytics 4 integration for SEO tracking
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

// Initialize Google Analytics
export function initializeGA() {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID) {
    // Load gtag script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
}

// Track page views
export function trackPageView(url: string, title: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_title: title,
      page_location: url,
    });
  }
}

// Track custom events
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

// Track conversion events
export function trackConversion(eventName: string, parameters?: any) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'conversion',
      ...parameters,
    });
  }
}

// Track form submissions
export function trackFormSubmission(formName: string, success: boolean) {
  trackEvent(
    success ? 'form_submit_success' : 'form_submit_error',
    'form_interaction',
    formName
  );
}

// Track button clicks
export function trackButtonClick(buttonName: string, location: string) {
  trackEvent('click', 'button_interaction', `${buttonName}_${location}`);
}

// Track scroll depth
export function trackScrollDepth() {
  if (typeof window !== 'undefined') {
    let maxScroll = 0;
    const thresholds = [25, 50, 75, 90, 100];
    
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        thresholds.forEach(threshold => {
          if (scrollPercent >= threshold && maxScroll < threshold + 5) {
            trackEvent('scroll_depth', 'engagement', `${threshold}%`);
          }
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }
}

// Track time on page
export function trackTimeOnPage() {
  if (typeof window !== 'undefined') {
    const startTime = Date.now();
    
    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      
      // Track time in buckets
      let timeBucket = '0-30s';
      if (timeSpent > 300) timeBucket = '5m+';
      else if (timeSpent > 180) timeBucket = '3-5m';
      else if (timeSpent > 60) timeBucket = '1-3m';
      else if (timeSpent > 30) timeBucket = '30s-1m';
      
      trackEvent('time_on_page', 'engagement', timeBucket, timeSpent);
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }
}

// Track Core Web Vitals for SEO
export function trackCoreWebVitals() {
  if (typeof window !== 'undefined') {
    // Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      trackEvent('core_web_vitals', 'performance', 'LCP', Math.round(lastEntry.startTime));
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay (FID)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry: any) => {
        const fid = entry.processingStart - entry.startTime;
        trackEvent('core_web_vitals', 'performance', 'FID', Math.round(fid));
      });
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      
      trackEvent('core_web_vitals', 'performance', 'CLS', Math.round(clsValue * 1000));
    }).observe({ entryTypes: ['layout-shift'] });
  }
}

// Track search queries (if implementing search)
export function trackSearch(query: string, results: number) {
  trackEvent('search', 'site_search', query, results);
}

// Track downloads
export function trackDownload(fileName: string, fileType: string) {
  trackEvent('download', 'file_interaction', `${fileName}.${fileType}`);
}

// Track external link clicks
export function trackExternalLink(url: string) {
  trackEvent('click', 'external_link', url);
}

// Enhanced ecommerce tracking (for future use)
export function trackPurchase(transactionId: string, value: number, currency: string = 'USD') {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: currency,
    });
  }
}

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}