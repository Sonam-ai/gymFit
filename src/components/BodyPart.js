import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography, useTheme } from '@mui/material';

import { getBodyPartImage } from '../utils/bodyPartImages';

const BodyPart = ({ item, bodyPart, setBodyPart, imageUrl }) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [imgSrc, setImgSrc] = useState(imageUrl || getBodyPartImage(item));
  const isSelected = bodyPart === item;
  const showIndicator = isSelected || isHovered;

  useEffect(() => {
    setImgSrc(imageUrl || getBodyPartImage(item));
  }, [imageUrl, item]);

  const handleImageError = () => {
    setImgSrc(getBodyPartImage(item));
  };

  return (
    <Stack
      sx={{ position: 'relative', flexShrink: 0, pt: '20px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 90,
          height: 8,
          bgcolor: 'primary.main',
          borderRadius: '10px',
          opacity: showIndicator ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
          boxShadow: showIndicator ? `0 0 12px ${theme.palette.primary.main}66` : 'none',
        }}
      />

      <Stack
        onClick={() => {
          setBodyPart(item);
          document.getElementById('exercises')?.scrollIntoView({ behavior: 'smooth' });
        }}
        sx={{
          minWidth: 220,
          maxWidth: 250,
          flex: '0 0 220px',
          height: 260,
          borderRadius: 3,
          bgcolor: 'background.paper',
          alignItems: 'center',
          justifyContent: 'flex-start',
          cursor: 'pointer',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
          border: 2,
          borderColor: isSelected ? 'primary.main' : 'divider',
          boxShadow: isSelected
            ? `0 12px 32px ${theme.palette.mode === 'light' ? 'rgba(255,38,37,0.15)' : 'rgba(255,38,37,0.25)'}`
            : theme.palette.mode === 'light'
              ? '0 4px 20px rgba(26, 29, 46, 0.08)'
              : '0 4px 20px rgba(0, 0, 0, 0.35)',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-6px)',
            borderColor: 'primary.light',
          },
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: 165,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            bgcolor: theme.palette.mode === 'light' ? '#F0F2F8' : '#252532',
          }}
        >
          <Box
            component="img"
            src={imgSrc}
            alt={`${item} exercises`}
            loading="lazy"
            onError={handleImageError}
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>

        <Typography
          sx={{
            mt: 2,
            px: 2,
            fontSize: '18px',
            fontWeight: 600,
            color: 'text.primary',
            textTransform: 'capitalize',
            textAlign: 'center',
          }}
        >
          {item}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default BodyPart;
