import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface CarouselImage {
  src: string;
  alt: string;
}

interface HomepageCarouselProps {
  images: CarouselImage[];
}

export default function HomepageCarousel({ images }: HomepageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 6000);

    return () => window.clearInterval(intervalId);
  }, [images.length]);

  if (images.length === 0) {
    return null;
  }

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? images.length - 1 : current - 1,
    );
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % images.length);
  };

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-slate-950/70 shadow-2xl shadow-slate-950/25">
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/10 z-10" />
      <div className="relative aspect-[4/3] md:aspect-[5/4]">
        {images.map((image, index) => (
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            loading={index === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-4 bg-gradient-to-t from-black/75 via-black/45 to-transparent px-4 pb-4 pt-12 md:px-5 md:pb-5 md:pt-14">
        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-white/60">
            MPS Lab in Action
          </p>
          <p className="mt-1 text-sm font-medium text-white/90 md:text-base">
            Research meetings, community moments, and lab events.
          </p>
        </div>

        {images.length > 1 && (
          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={goToPrevious}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white transition-colors hover:bg-black/50"
              aria-label="Show previous homepage image"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white transition-colors hover:bg-black/50"
              aria-label="Show next homepage image"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="absolute left-4 top-4 z-20 flex gap-2 md:left-5 md:top-5">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === activeIndex ? "w-8 bg-white" : "w-2.5 bg-white/45"
              }`}
              aria-label={`Show homepage image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
