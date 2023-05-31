import { Box, MediaQuery, useMantineTheme } from "@mantine/core";

export function SVGBanner() {
    const theme = useMantineTheme();
    
    return (
        <MediaQuery
        query="(max-width: 650px)"
        styles={{
          img: {
            width: '3.6rem',
            height: '3.6rem',
          },
        }}
      >
        <Box
          sx={{
            width: '100%',
            background:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[0]
                : theme.colors.blue[0],
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: '1.5rem',
            marginTop: '0rem',
            padding: '.3rem',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            border:
              theme.colorScheme === 'light' ? '1px #EEEEEE solid' : 'none',
          }}
        >
          <img src="/assets/recycable-parts.svg" alt="recycable parts icon" />
          <img
            src="./assets/sustainable-transports.svg"
            alt="sustainable transports icon"
          />
          <img src="/assets/free-deliveries.svg" alt="free deliveries icon" />
          <img src="/assets/price-guarantee.svg" alt="price guarantee icon" />
          <img src="/assets/free-returns.svg" alt="free returns icon" />
        </Box>
      </MediaQuery>
    )
}