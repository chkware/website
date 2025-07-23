"use client";

import { useEffect } from 'react';
import {
  preloadCriticalResources,
  measureCoreWebVitals,
  prefetchImportantPages,
  addResourceHints,
  registerServiceWorker
} from '@/lib/performance/optimization';

export function PerformanceOptimizer() {
  useEffect(() => {
    // Initialize performance optimizations
    preloadCriticalResources();
    addResourceHints();
    measureCoreWebVitals();
    
    // Prefetch important pages after initial load
    const timer = setTimeout(() => {
      prefetchImportantPages();
    }, 2000);

    // Register service worker for caching
    registerServiceWorker();

    return () => clearTimeout(timer);
  }, []);

  return null; // This component doesn't render anything
}

// Critical CSS component for above-the-fold content
export function CriticalCSS() {
  return (
    <style jsx>{`
      /* Critical CSS for above-the-fold content */
      .hero-section {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .hero-title {
        font-size: clamp(2rem, 5vw, 4rem);
        font-weight: 800;
        line-height: 1.1;
        margin-bottom: 1.5rem;
      }
      
      .hero-description {
        font-size: 1.25rem;
        line-height: 1.6;
        margin-bottom: 2rem;
        max-width: 600px;
      }
      
      .cta-button {
        display: inline-flex;
        align-items: center;
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        font-weight: 600;
        border-radius: 0.5rem;
        transition: all 0.2s ease;
      }
      
      /* Prevent layout shift */
      .image-placeholder {
        background-color: #f3f4f6;
        border-radius: 0.5rem;
        width: 100%;
        height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      /* Loading states */
      .skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
      }
      
      @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `}</style>
  );
}