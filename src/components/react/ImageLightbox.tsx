import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';

interface ImageLightboxProps {
    images: string[];
    initialIndex?: number;
    isOpen: boolean;
    onClose: () => void;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({ images, initialIndex = 0, isOpen, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isZoomed, setIsZoomed] = useState(false);

    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setIsZoomed(false);
    }, [images.length]);

    const handlePrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        setIsZoomed(false);
    }, [images.length]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
    }, [onClose, handleNext, handlePrev]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, handleKeyDown]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 transition-opacity duration-300">
            <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[110]"
                aria-label="Close lightbox"
            >
                <X className="w-8 h-8" />
            </button>

            <div className="absolute top-6 left-6 text-white/50 text-sm font-medium z-[110]">
                {currentIndex + 1} / {images.length}
            </div>

            <button
                onClick={handlePrev}
                className="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors z-[110]"
                aria-label="Previous image"
            >
                <ChevronLeft className="w-10 h-10" />
            </button>

            <button
                onClick={handleNext}
                className="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors z-[110]"
                aria-label="Next image"
            >
                <ChevronRight className="w-10 h-10" />
            </button>

            <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12 overflow-hidden">
                <img
                    src={images[currentIndex]}
                    alt={`Gallery image ${currentIndex + 1}`}
                    className={`max-w-full max-h-full object-contain transition-transform duration-300 cursor-pointer ${isZoomed ? 'scale-150' : 'scale-100'}`}
                    onClick={() => setIsZoomed(!isZoomed)}
                />
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full z-[110]">
                <button onClick={() => setIsZoomed(false)} className="text-white/70 hover:text-white transition-colors">
                    <ZoomOut className="w-5 h-5" />
                </button>
                <button onClick={() => setIsZoomed(true)} className="text-white/70 hover:text-white transition-colors">
                    <ZoomIn className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default ImageLightbox;
