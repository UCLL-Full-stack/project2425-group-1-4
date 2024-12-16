import React from 'react';
import { StaticImageData } from 'next/image';

interface ImageGalleryProps {
    topImage: string | StaticImageData;
    bottomImages: (string | StaticImageData)[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ topImage, bottomImages }) => {
    return (
        <div className="image-gallery flex flex-col items-center gap-4">
            {/* Top Image */}
            <div className="top-image-container">
                <img
                    src={typeof topImage === 'string' ? topImage : topImage.src}
                    alt="Top view"
                    className="top-image w-full max-w-md rounded shadow-md"
                />
            </div>

            {/* Bottom Images */}
            <div className="bottom-images-container flex justify-center gap-4">
                {bottomImages.slice(0, 3).map((image, index) => (
                    <div key={index} className="bottom-image-wrapper">
                        <img
                            src={typeof image === 'string' ? image : image.src}
                            alt={`Bottom image ${index + 1}`}
                            className="bottom-image w-24 h-24 rounded shadow-md"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
