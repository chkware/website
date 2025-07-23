/**
 * Google Search Console verification and integration
 */

export function SearchConsoleVerification() {
  const verificationCode = process.env.NEXT_PUBLIC_SEARCH_CONSOLE_VERIFICATION;
  
  if (!verificationCode) {
    return null;
  }

  return (
    <meta 
      name="google-site-verification" 
      content={verificationCode} 
    />
  );
}

// Component to add Search Console meta tags
export function SearchConsoleMeta() {
  return (
    <>
      <SearchConsoleVerification />
      {/* Additional meta tags for better indexing */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
    </>
  );
}