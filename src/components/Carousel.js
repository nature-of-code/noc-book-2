import React, { Children } from 'react';
import { Navigation, Autoplay, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import 'swiper/css';
import 'swiper/css/navigation';

const Carousel = ({ children }) => {
  return (
    <Swiper
      modules={[Navigation, Autoplay, A11y]}
      navigation={{
        nextEl: '.swiper-button-next-custom',
        prevEl: '.swiper-button-prev-custom',
      }}
      loop={true}
      autoplay={{
        delay: 3000,
      }}
      a11y={{
        containerMessage:
          'This is a swiper containing multiple images and videos about the book',
      }}
      spaceBetween={50}
      slidesPerView={1}
    >
      {Children.toArray(children).map((child) => (
        <SwiperSlide key={child.key}>{child}</SwiperSlide>
      ))}

      {/* Custom Navigation Buttons */}
      <div className="swiper-button-prev-custom absolute left-0 top-1/2 z-10 mx-2 -translate-y-1/2 p-2 text-noc-400">
        <FiChevronLeft className="h-8 w-8" />
      </div>
      <div className="swiper-button-next-custom absolute right-0 top-1/2 z-10 mx-2 -translate-y-1/2 p-2 text-noc-400">
        <FiChevronRight className="h-8 w-8" />
      </div>
    </Swiper>
  );
};

export default Carousel;
