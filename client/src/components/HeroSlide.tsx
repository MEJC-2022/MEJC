import { Box } from '@mantine/core';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/swiper.min.css';
import '../../public/assets/summerimages/sommar1.jpg';
import HeroSlideItem from './HeroSlideItem';

const summerImages = [
  {
    _id: "1",
    image: "../../public/assets/summerimages/sommar1.jpg",
  },
  {
    _id: "2",
    image: "../../public/assets/summerimages/sommar2.jpg",
  },
  {
    _id: "3",
    image: "../../public/assets/summerimages/sommar3.jpg",
  },
  {
    _id: "4",
    image: "../../public/assets/summerimages/sommar4.jpg",
  },
];

function HeroSlide() {
  //const { products } = useContext(ProductContext);
  const images = summerImages;  

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
        speed={2000}
        navigation
        pagination={{ clickable: true }}
      >
        {/* {products.slice(0, 4).map((product) => (
          <SwiperSlide style={{ height: '26rem' }} key={product._id}>
            <HeroSlideItem imageSrc={product.image} />
          </SwiperSlide>
        ))} */}
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
