import { Box } from '@mantine/core';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/swiper.min.css';
import HeroSlideItem from './HeroSlideItem';

const summerImages = [
  {
    _id: '1',
    image: '../../assets/summerimages/sommar1.jpg',
  },
  {
    _id: '2',
    image: '../../assets/summerimages/sommar2.jpg',
  },
  {
    _id: '3',
    image: '../../assets/summerimages/sommar3.jpg',
  },
  {
    _id: '4',
    image: '../../assets/summerimages/sommar4.jpg',
  },
];

function HeroSlide() {
  const images = summerImages;

  return (
    <Box
      sx={{
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
        speed={2000}
        navigation
        pagination={{ clickable: true }}
      >
        {images.map((image) => (
          <SwiperSlide style={{ height: '30rem' }} key={image._id}>
            <HeroSlideItem imageSrc={image.image} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

export default HeroSlide;
