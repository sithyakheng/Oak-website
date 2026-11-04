"use client";

import { useRef, useState } from "react";
import type { Product } from "@/lib/products";
import ProductVisual from "@/components/ProductVisual";

type GalleryImage = { src: string; alt: string };

export default function ProductGallery({ p, extraImages }: {
  p: Pick<Product, "kind" | "name" | "image_url">;
  extraImages: GalleryImage[];
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const images = [{ src: p.image_url ?? "", alt: p.name }, ...extraImages];
  const showControls = images.length > 1;
  const showImage = (index: number) => {
    setSelectedIndex((index + images.length) % images.length);
  };

  return (
    <div>
      <div
        className="relative h-[26rem] overflow-hidden rounded-2xl border border-navy-line"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            showImage(selectedIndex - 1);
          } else if (event.key === "ArrowRight") {
            event.preventDefault();
            showImage(selectedIndex + 1);
          }
        }}
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          const startX = touchStartX.current;
          const endX = event.changedTouches[0]?.clientX;
          touchStartX.current = null;
          if (startX === null || endX === undefined) return;
          const distance = endX - startX;
          if (distance <= -40) showImage(selectedIndex + 1);
          else if (distance >= 40) showImage(selectedIndex - 1);
        }}
      >
        {selectedIndex === 0 ? (
          <ProductVisual p={p} size="lg" />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_50%_55%,#5a3f28,#2b1d14)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images[selectedIndex].src} alt={images[selectedIndex].alt} loading="lazy" className="h-full w-full object-contain p-4" />
          </div>
        )}
        {showControls && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => showImage(selectedIndex - 1)}
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-navy-line bg-navy/70 text-cream transition-colors hover:bg-oak hover:text-navy"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                <path d="m15 18-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => showImage(selectedIndex + 1)}
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-navy-line bg-navy/70 text-cream transition-colors hover:bg-oak hover:text-navy"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="absolute bottom-3 right-3 rounded-full bg-navy/80 px-2.5 py-1 text-xs text-cream">
              {selectedIndex + 1} / {images.length}
            </span>
          </>
        )}
      </div>
      {extraImages.length > 0 && (
        <div className="mt-3 flex gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              aria-label={`View ${image.alt}`}
              aria-pressed={selectedIndex === index}
              onClick={() => showImage(index)}
              className={`h-20 w-20 overflow-hidden rounded-lg border ${selectedIndex === index ? "border-oak" : "border-navy-line"}`}
            >
              {index === 0 ? (
                <ProductVisual p={p} />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image.src} alt={image.alt} loading="lazy" className="h-full w-full bg-[radial-gradient(circle_at_50%_55%,#5a3f28,#2b1d14)] object-contain p-1" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
