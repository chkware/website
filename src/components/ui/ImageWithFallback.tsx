"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
}

export function ImageWithFallback({
  src,
  alt,
  fallbackSrc = "/images/placeholder.jpg",
  ...rest
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  return (
    <>
      <Image
        {...rest}
        src={imgSrc}
        alt={alt}
        onError={handleError}
      />
      {/* Add a background color as an additional fallback */}
      <div
        className="absolute inset-0 bg-gray-200 dark:bg-gray-800 -z-10"
        aria-hidden="true"
      />
    </>
  );
}
