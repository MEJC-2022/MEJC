import {
  Box,
  Image,
  Text,
  createStyles,
  useMantineTheme
} from '@mantine/core';
import { useEffect, useState } from 'react';

const images = [
  {
    fileName: 'recycling',
    textAbove: 'Recyclable',
    textBelow: 'Parts',
  },
  {
    fileName: 'sustainability',
    textAbove: 'Sustainable',
    textBelow: 'Transport',
  },
  {
    fileName: 'eustars',
    textAbove: 'Free Shipping',
    textBelow: 'Within EU',
  },
  {
    fileName: 'wallet',
    textAbove: 'Price',
    textBelow: 'Guarantee',
  },
  {
    fileName: 'return',
    textAbove: 'Free Returns',
    textBelow: 'Within 30 Days',
  },
];

const useStyles = createStyles((theme) => ({
  responsiveImg: {
    filter:
      'brightness(0) saturate(100%) invert(52%) sepia(96%) saturate(5788%) hue-rotate(206deg) brightness(88%) contrast(98%)',
    [theme.fn.smallerThan('sm')]: {
    },
  },
  textSize: {
    fontSize: 14,
    [theme.fn.smallerThan('sm')]: {
      fontSize: 10,
    },
  }
}));


export function SVGBanner() {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const [imageSize, setImageSize] = useState('40px');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setImageSize('20px'); 
      } else {
        setImageSize('40px'); 
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
      <Box
        sx={{
          width: '100%',
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.blue[0],
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: '0rem',
          padding: '.3rem',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          border: theme.colorScheme === 'light' ? '1px #EEEEEE solid' : 'none',
        }}
      >
        {images.map(({ fileName, textAbove, textBelow }) => (
          <div
            key={fileName}
            style={{
              marginBottom: '0px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text align="center" fw={400} className={classes.textSize} mb={3}>
              {textAbove}
            </Text>
            <Image
              src={`assets/${fileName}.svg`}
              alt={`Image ${fileName}`}
              width= {imageSize}
              height= {imageSize}
              className={classes.responsiveImg}
              mb={3}
            />
            <Text align="center" fw={400} className={classes.textSize}>
              {textBelow}
            </Text>
          </div>
        ))}
      </Box>
  );
}
