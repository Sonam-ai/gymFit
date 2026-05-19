import React from 'react';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import HeroBannerImage from '../assets/images/banner.png';

const HeroBanner = () => {
  const theme = useTheme();

  return (
    <Box
      position="relative"
      sx={{
        mt: { lg: 8, xs: 4 },
        mb: { lg: 4, xs: 2 },
        p: { xs: 2, sm: 3, lg: 4 },
        borderRadius: 4,
        overflow: 'hidden',
        background: theme.palette.mode === 'light'
          ? 'linear-gradient(135deg, #FFFFFF 0%, #EEF7F4 52%, #F5F8F6 100%)'
          : 'linear-gradient(135deg, #171F22 0%, #112322 52%, #0D1416 100%)',
        border: 1,
        borderColor: 'divider',
      }}
    >
      <Stack sx={{ position: 'relative', zIndex: 2, maxWidth: { lg: '55%' } }}>
        <Typography
          sx={{
            color: 'primary.main',
            fontWeight: 700,
            fontSize: { xs: '14px', sm: '16px' },
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            mb: 1,
          }}
        >
          Fitness Buddy
        </Typography>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: { lg: '52px', md: '44px', xs: '36px' },
            lineHeight: 1.15,
            color: 'text.primary',
          }}
        >
          Move, Breathe
          <br />
          and Feel Better
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '16px', lg: '20px' },
            lineHeight: 1.6,
            color: 'text.secondary',
            my: 3,
            maxWidth: 480,
          }}
        >
          Check out the most effective exercises personalized to you
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            href="#fitness-calculator"
            sx={{
              width: 'fit-content',
              px: 4,
              py: 1.5,
              fontSize: '18px',
            }}
          >
            BMI & Calories
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            href="#exercises"
            sx={{
              width: 'fit-content',
              px: 4,
              py: 1.5,
              fontSize: '18px',
            }}
          >
            Explore Exercises
          </Button>
        </Stack>
      </Stack>

      <Typography
        aria-hidden
        sx={{
          position: 'absolute',
          right: { lg: 40, xs: 10 },
          top: { lg: 20, xs: 'auto' },
          bottom: { xs: -20, lg: 'auto' },
          fontWeight: 700,
          color: 'primary.main',
          opacity: theme.palette.mode === 'light' ? 0.08 : 0.12,
          display: { xs: 'none', md: 'block' },
          fontSize: { lg: '280px', md: '180px' },
          lineHeight: 1,
          userSelect: 'none',
          zIndex: 0,
        }}
      >
        Fit
      </Typography>

      <Box
        component="img"
        src={HeroBannerImage}
        alt="hero-banner"
        sx={{
          position: 'absolute',
          top: { lg: '50%', xs: 'auto' },
          bottom: { xs: 0, lg: 'auto' },
          right: { lg: 24, xs: 0 },
          transform: { lg: 'translateY(-50%)', xs: 'none' },
          width: { lg: '48%', md: '42%', xs: '70%' },
          maxWidth: 520,
          height: 'auto',
          zIndex: 1,
          objectFit: 'contain',
          opacity: theme.palette.mode === 'dark' ? 0.92 : 1,
          filter: theme.palette.mode === 'dark' ? 'brightness(0.95)' : 'none',
        }}
      />
    </Box>
  );
};

export default HeroBanner;
