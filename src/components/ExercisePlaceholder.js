import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';

// We accept 'gifUrl' along with the destructured props
const ExercisePlaceholder = ({ name, gifUrl, height = 400 }) => {
  const theme = useTheme();
  const [imageError, setImageError] = useState(false);

  // Reset the error fallback state if the user navigates to a different exercise detail page
  useEffect(() => {
    setImageError(false);
  }, [gifUrl]);

  // If there is a valid gifUrl and it hasn't failed to load, render the actual exercise photo!
  if (gifUrl && !imageError) {
    return (
      <Box
        sx={{
          width: '100%',
          height,
          borderRadius: 3,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: theme.palette.mode === 'light' ? '#F8F9FC' : '#1A1A24',
          border: 1,
          borderColor: 'divider',
        }}
      >
        <img
          src={gifUrl}
          alt={name || 'Exercise demonstration'}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain', // Keeps the image aspects perfect without stretching
          }}
          onError={() => setImageError(true)} // Safely falls back to the design icon if image doesn't exist on disk
        />
      </Box>
    );
  }

  // FALLBACK DESIGN: If there is no image or the link breaks, display your beautiful placeholder icon asset
  return (
    <Box
      sx={{
        width: '100%',
        height,
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.5,
        border: 1,
        borderColor: 'divider',
        background: theme.palette.mode === 'light'
          ? 'linear-gradient(145deg, #F0F2F8 0%, #E8ECF4 100%)'
          : 'linear-gradient(145deg, #252532 0%, #1a1a24 100%)',
      }}
    >
      <Box
        sx={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: theme.palette.mode === 'light' ? '#fff' : '#2a2a38',
          boxShadow: theme.palette.mode === 'light'
            ? '0 8px 24px rgba(26,29,46,0.1)'
            : '0 8px 24px rgba(0,0,0,0.35)',
        }}
      >
        <FitnessCenterOutlinedIcon sx={{ fontSize: 36, color: 'primary.main' }} />
      </Box>
      {name && (
        <Typography
          variant="subtitle1"
          fontWeight={600}
          color="text.secondary"
          textTransform="capitalize"
          textAlign="center"
          px={2}
        >
          {name} (No Preview Available)
        </Typography>
      )}
    </Box>
  );
};

export default ExercisePlaceholder;