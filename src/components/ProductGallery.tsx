"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import ProductVisual from "@/components/ProductVisual";

type GalleryImage = { src: string; alt: string };

export default function ProductGallery({ p, extraImages }: {
  p: Pick<Product, "kind" | "name" | "image_url">;
  extraImages: GalleryImage[];
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const images = [{ src: p.image_url ?? "", alt: p.name }, ...extraImages];

  return (
    <div>
      <div className="h-[26rem] overflow-hidden rounded-2xl border border-navy-line">
        {selectedIndex === 0 ? (
          <ProductVisual p={p} size="lg" />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_50%_55%,#5a3f28,#2b1d14)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images[selectedIndex].src} alt={images[selectedIndex].alt} loading="lazy" className="h-full w-full object-contain p-4" />
          </div>
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
              onClick={() => setSelectedIndex(index)}
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
