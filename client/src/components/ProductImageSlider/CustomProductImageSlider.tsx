import React from 'react';
import { Carousel } from 'react-responsive-carousel';

interface ProductImageSliderProps {
  images: string[];
}

const CustomProductImageSlider: React.FC<ProductImageSliderProps> = ({ images }) => {
  return (
    <Carousel
      showStatus={false}
      showIndicators={images.length > 1}
      showThumbs={false}
      infiniteLoop={true}
      autoPlay={false}
      interval={3000}
      stopOnHover={true}
      swipeable={true}
      emulateTouch={true}
      dynamicHeight={true}
      className="max-w-full"
    >
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`Product Image ${index + 1}`} className="mx-auto max-h-80 object-contain" />
        </div>
      ))}
    </Carousel>
  );
};

export default CustomProductImageSlider;
