import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import styles from './ImageSlider.module.css';

const ImageSlider = ({ images }) => {
    return (
        <Swiper
            className={styles['swiper-container']}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
        >
            {images.map((image, index) => (
                <SwiperSlide key={index} className={styles['swiper-slide']}>
                    <img src={image} alt={`Slide ${index}`} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default ImageSlider;