import { Box } from '@mantine/core';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/swiper.min.css';

function HeroSlide() {
  return (
    <Box
      sx={{
        paddingTop: '1rem',
        paddingBottom: '1rem',
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
        navigation
        pagination={{ clickable: true }}
      >
        {/* DISABLED FOR NOW */}
        {/* {Product.slice(0, 4).map((product) => (
          <SwiperSlide style={{ height: '22rem' }} key={product.id}>
            <HeroSlideItem imageSrc={product.image} />
          </SwiperSlide>
        ))} */}
      </Swiper>
    </Box>
  );
}

export default HeroSlide;
