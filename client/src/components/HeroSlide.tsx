import { Box } from '@mantine/core';
import { useContext } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/swiper.min.css';
import { ProductContext } from '../contexts/ProductContext';
import HeroSlideItem from './HeroSlideItem';

function HeroSlide() {
  const { products } = useContext(ProductContext);

  return (
    <Box
      sx={{
        paddingTop: '1rem',
        paddingBottom: '0.8rem',
        width: '100%',
        margin: '0 auto',
      }}
    >
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        grabCursor={true}
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        speed={4000}
        navigation
        pagination={{ clickable: true }}
      >
        {products.slice(0, 4).map((product) => (
          <SwiperSlide style={{ height: '22rem' }} key={product._id}>
            <HeroSlideItem imageSrc={product.image} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

export default HeroSlide;
