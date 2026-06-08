import React, { useState } from 'react';
import ImageLightbox from './ImageLightbox';

interface GalleryGridProps {
    images: string[];
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ images }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const openLightbox = (index: number) => {
        setSelectedIndex(index);
        setIsOpen(true);
    };

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="group relative aspect-square overflow-hidden rounded-2xl bg-bg-alt border border-border cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10"
                        onClick={() => openLightbox(index)}
                    >
                        <img
                            src={image}
                            alt={`Gallery photo ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="bg-white/20 backdrop-blur-md text-white p-3 rounded-full transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                </svg>
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <ImageLightbox
                images={images}
                initialIndex={selectedIndex}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </div>
    );
};

export default GalleryGrid;
